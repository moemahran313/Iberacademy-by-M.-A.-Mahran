import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProgress } from '../types';

export type MutationType =
  | 'PROGRESS_SUMMARY_UPDATE'
  | 'VOCABULARY_ITEM_UPDATE'
  | 'LINGQ_STATUS_UPDATE'
  | 'XP_GAIN'
  | 'LESSON_COMPLETED';

export interface PendingMutation {
  id: string;
  userId: string;
  type: MutationType;
  timestamp: number; // ms ISO timestamp for Last-Write-Wins (LWW)
  docTarget: 'summary' | 'vocabulary';
  wordId?: string;
  data: Record<string, any>;
}

export const STORAGE_QUEUE_KEY = 'hispano_academy_sync_queue';
const DEBOUNCE_DELAY_MS = 4000;
const MAX_BATCH_SIZE = 500;

class FirestoreSyncService {
  private syncQueue: PendingMutation[] = [];
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private isFlushing = false;
  private retryCount = 0;

  constructor() {
    this.loadQueueFromStorage();
    this.setupListeners();
  }

  /**
   * Restores pending mutation buffer from local storage / IndexedDB cache on boot.
   */
  private loadQueueFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_QUEUE_KEY);
      if (stored) {
        this.syncQueue = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load sync queue from localStorage:', e);
      this.syncQueue = [];
    }
  }

  /**
   * Persists pending mutation buffer to local storage synchronously.
   */
  private saveQueueToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(this.syncQueue));
    } catch (e) {
      console.warn('Failed to save sync queue to localStorage:', e);
    }
  }

  /**
   * Binds auto-flush triggers for tab blur, view change, and network reconnect.
   */
  private setupListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      console.info('Network connection restored. Replaying pending Firestore sync queue...');
      this.flushQueueImmediately();
    });

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushQueueImmediately();
      }
    });

    window.addEventListener('beforeunload', () => {
      this.flushQueueImmediately();
    });
  }

  /**
   * Enqueues a mutation in the FIFO transaction buffer.
   */
  public enqueueMutation(
    userId: string,
    type: MutationType,
    docTarget: 'summary' | 'vocabulary',
    data: Record<string, any>,
    wordId?: string
  ) {
    if (!userId || userId.startsWith('guest_') || userId.startsWith('user_ver_')) {
      return;
    }

    const mutation: PendingMutation = {
      id: `mut_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      userId,
      type,
      timestamp: Date.now(),
      docTarget,
      wordId,
      data
    };

    this.syncQueue.push(mutation);
    this.saveQueueToStorage();
    this.scheduleDebouncedFlush();
  }

  /**
   * Helper to enqueue user progress summary updates (users/{userId}/progress/summary).
   */
  public enqueueSummaryUpdate(userId: string, progressPatch: Partial<UserProgress> & Record<string, any>) {
    this.enqueueMutation(userId, 'PROGRESS_SUMMARY_UPDATE', 'summary', {
      ...progressPatch,
      updatedAt: new Date().toISOString()
    });
  }

  /**
   * Helper to enqueue vocabulary/LingQ updates (users/{userId}/vocabulary/{wordId}).
   */
  public enqueueVocabularyUpdate(
    userId: string,
    word: string,
    status: number,
    additionalData?: Record<string, any>
  ) {
    const sanitizedWordId = encodeURIComponent(word.toLowerCase().trim().replace(/\//g, '_'));
    this.enqueueMutation(
      userId,
      'LINGQ_STATUS_UPDATE',
      'vocabulary',
      {
        word: word.trim(),
        status,
        lastReviewed: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...additionalData
      },
      sanitizedWordId
    );
  }

  private scheduleDebouncedFlush() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.flushQueueImmediately();
    }, DEBOUNCE_DELAY_MS);
  }

  /**
   * Atomically flushes pending mutations using Firestore writeBatch().
   * Performs Last-Write-Wins (LWW) conflict resolution and batching up to 500 ops.
   */
  public async flushQueueImmediately(): Promise<void> {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    if (this.syncQueue.length === 0 || this.isFlushing) {
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.info('Offline mode: preserving mutation buffer in localStorage until network reconnect.');
      return;
    }

    this.isFlushing = true;
    const itemsToProcess = [...this.syncQueue];

    try {
      // 1. Consolidate mutations by document path using Last-Write-Wins (LWW by timestamp)
      const summaryByUserId: Record<string, { data: Record<string, any>; latestTimestamp: number }> = {};
      const vocabByPath: Record<string, { docPath: string; data: Record<string, any>; latestTimestamp: number }> = {};

      for (const item of itemsToProcess) {
        if (item.docTarget === 'summary') {
          const current = summaryByUserId[item.userId];
          if (!current || item.timestamp >= current.latestTimestamp) {
            summaryByUserId[item.userId] = {
              data: {
                ...(current?.data || {}),
                ...item.data
              },
              latestTimestamp: item.timestamp
            };
          } else {
            summaryByUserId[item.userId].data = {
              ...item.data,
              ...current.data
            };
          }
        } else if (item.docTarget === 'vocabulary' && item.wordId) {
          const docPath = `users/${item.userId}/vocabulary/${item.wordId}`;
          const current = vocabByPath[docPath];
          if (!current || item.timestamp >= current.latestTimestamp) {
            vocabByPath[docPath] = {
              docPath,
              data: {
                ...(current?.data || {}),
                ...item.data
              },
              latestTimestamp: item.timestamp
            };
          } else {
            vocabByPath[docPath].data = {
              ...item.data,
              ...current.data
            };
          }
        }
      }

      // 2. Prepare Atomic Batch Operations
      type BatchOp = { docRef: any; data: Record<string, any> };
      const ops: BatchOp[] = [];

      // Add summary document operations: users/{userId}/progress/summary
      Object.entries(summaryByUserId).forEach(([userId, { data }]) => {
        const summaryRef = doc(db, 'users', userId, 'progress', 'summary');
        ops.push({ docRef: summaryRef, data });

        // Root user document update for backward compatibility
        const rootUserRef = doc(db, 'users', userId);
        ops.push({ docRef: rootUserRef, data });
      });

      // Add vocabulary document operations: users/{userId}/vocabulary/{wordId}
      Object.values(vocabByPath).forEach(({ docPath, data }) => {
        const parts = docPath.split('/');
        const vocabRef = doc(db, parts[0], parts[1], parts[2], parts[3]);
        ops.push({ docRef: vocabRef, data });
      });

      if (ops.length === 0) {
        this.syncQueue = [];
        this.saveQueueToStorage();
        this.isFlushing = false;
        return;
      }

      // Chunk operations into batches of up to MAX_BATCH_SIZE (500)
      for (let i = 0; i < ops.length; i += MAX_BATCH_SIZE) {
        const batchOps = ops.slice(i, i + MAX_BATCH_SIZE);
        const batch = writeBatch(db);

        batchOps.forEach(op => {
          batch.set(op.docRef, op.data, { merge: true });
        });

        await batch.commit();
      }

      // Remove processed items from FIFO queue
      const processedIds = new Set(itemsToProcess.map(m => m.id));
      this.syncQueue = this.syncQueue.filter(m => !processedIds.has(m.id));
      this.saveQueueToStorage();
      this.retryCount = 0;
    } catch (error) {
      console.warn('Firestore writeBatch execution error:', error);

      // Exponential Backoff Retry Strategy: 2s, 4s, 8s, 16s... max 30s
      this.retryCount++;
      const backoffMs = Math.min(1000 * Math.pow(2, this.retryCount), 30000);
      console.info(`Retrying Firestore batch commit in ${backoffMs}ms (attempt #${this.retryCount})...`);

      this.debounceTimer = setTimeout(() => {
        this.flushQueueImmediately();
      }, backoffMs);
    } finally {
      this.isFlushing = false;
    }
  }

  public getQueueLength(): number {
    return this.syncQueue.length;
  }

  public clearQueue() {
    this.syncQueue = [];
    this.saveQueueToStorage();
  }
}

export const firestoreSyncService = new FirestoreSyncService();
