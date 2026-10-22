import { UserProgress } from '../types';

const STORAGE_KEY = 'hispano_academy_user_progress';

export const DEFAULT_USER_PROGRESS: UserProgress = {
  currentLevel: 'A1',
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 0,
  completedLessonIds: [],
  passedUnitQuizIds: [],
  quizScores: {},
  unlockedLevels: ['A1'],
  passedLevelExamIds: [],
  levelExamScores: {},
  levelCertificates: {},
  savedWordIds: [],
  masteredWordIds: [],
  srsData: {},
  // LingQ & Comprehensible Input Acquisition Engine
  knownWords: [],
  lingqs: {},
  minedSentences: [],
  totalWordsRead: 0,
  dailyWordsRead: {},
  customImportedTexts: [],
  settings: {
    nativeLanguage: 'bilingual',
    audioSpeed: 0.9,
    theme: 'light',
    dailyGoalMinutes: 15,
    dailyWordsGoal: 250,
    reminderSettings: {
      enabled: false,
      channel: 'push',
      preferredTime: '18:00',
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      emailAddress: '',
      focusArea: 'vocabulary',
      customMessage: '¡Hora de practicar español! Maintain your streak and practice today.'
    }
  }
};

export function createZeroUserProgress(
  level: 'A1' | 'A2' | 'B1' | 'B2' = 'A1',
  avatarId: string = 'sun',
  photoURL: string = '',
  targetDialect: string = 'castilian'
): UserProgress {
  return {
    currentLevel: level,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    xp: 0,
    avatarId,
    photoURL,
    targetDialect,
    completedLessonIds: [],
    passedUnitQuizIds: [],
    quizScores: {},
    unlockedLevels: [level],
    passedLevelExamIds: [],
    levelExamScores: {},
    levelCertificates: {},
    savedWordIds: [],
    masteredWordIds: [],
    srsData: {},
    knownWords: [],
    lingqs: {},
    minedSentences: [],
    totalWordsRead: 0,
    totalReadingTimeSec: 0,
    dailyWordsRead: {},
    dailyLessonsCompleted: {},
    dailyGoalMetDates: {},
    readingSessions: [],
    userInterests: [],
    customImportedTexts: [],
    settings: {
      nativeLanguage: 'bilingual',
      audioSpeed: 0.9,
      theme: 'light',
      dailyGoalMinutes: 20,
      dailyWordsGoal: 250,
      reminderSettings: {
        enabled: false,
        channel: 'email',
        preferredTime: '18:00',
        daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        emailAddress: '',
        focusArea: 'vocabulary',
        customMessage: '¡Hora de practicar español! Maintain your streak and practice today.'
      }
    }
  };
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_USER_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_USER_PROGRESS;
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_USER_PROGRESS,
      ...parsed,
      unlockedLevels: parsed.unlockedLevels || ['A1'],
      knownWords: parsed.knownWords || [],
      lingqs: parsed.lingqs || {},
      minedSentences: parsed.minedSentences || [],
      totalWordsRead: parsed.totalWordsRead ?? 0,
      dailyWordsRead: parsed.dailyWordsRead || {},
      dailyLessonsCompleted: parsed.dailyLessonsCompleted || {},
      dailyGoalMetDates: parsed.dailyGoalMetDates || {},
      customImportedTexts: parsed.customImportedTexts || []
    };
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
}

export function purgeLocalStorageUserData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('iberio_fallback_user');
    localStorage.removeItem('iberacademy_fallback_user');
    localStorage.removeItem('iberio_registered_accounts');
    localStorage.removeItem('iberio_active_tab');
    localStorage.removeItem('iberacademy_active_tab');
  } catch (e) {
    console.warn('Failed to purge local storage data:', e);
  }
}

/**
 * Merges guest/offline progress with cloud progress without overwriting existing cloud history.
 * Unions sets (completed lessons, saved words, mined sentences) and preserves highest XP/streaks/scores.
 */
export function mergeUserProgress(
  cloud: Partial<UserProgress> | null | undefined,
  local: UserProgress
): UserProgress {
  if (!cloud) {
    return local;
  }

  // Combine unlocked levels (preserve order A1, A2, B1, B2)
  const allLevelsOrder: ('A1' | 'A2' | 'B1' | 'B2')[] = ['A1', 'A2', 'B1', 'B2'];
  const unlockedSet = new Set([...(cloud.unlockedLevels || ['A1']), ...(local.unlockedLevels || ['A1'])]);
  const mergedUnlocked = allLevelsOrder.filter(lvl => unlockedSet.has(lvl));

  // Highest level reached
  const cloudLvlIdx = allLevelsOrder.indexOf(cloud.currentLevel || 'A1');
  const localLvlIdx = allLevelsOrder.indexOf(local.currentLevel || 'A1');
  const currentLevel = allLevelsOrder[Math.max(cloudLvlIdx, localLvlIdx)] || 'A1';

  // Union arrays with deduplication
  const completedLessonIds = Array.from(
    new Set([...(cloud.completedLessonIds || []), ...(local.completedLessonIds || [])])
  );
  const passedUnitQuizIds = Array.from(
    new Set([...(cloud.passedUnitQuizIds || []), ...(local.passedUnitQuizIds || [])])
  );
  const passedLevelExamIds = Array.from(
    new Set([...(cloud.passedLevelExamIds || []), ...(local.passedLevelExamIds || [])])
  );
  const savedWordIds = Array.from(
    new Set([...(cloud.savedWordIds || []), ...(local.savedWordIds || [])])
  );
  const masteredWordIds = Array.from(
    new Set([...(cloud.masteredWordIds || []), ...(local.masteredWordIds || [])])
  );
  const knownWords = Array.from(
    new Set([...(cloud.knownWords || []), ...(local.knownWords || [])])
  );

  // Merge quiz scores (take highest score)
  const quizScores: Record<string, number> = { ...(cloud.quizScores || {}) };
  if (local.quizScores) {
    Object.entries(local.quizScores).forEach(([k, v]) => {
      quizScores[k] = Math.max(quizScores[k] || 0, v);
    });
  }

  // Merge level exam scores
  const levelExamScores: Record<string, number> = { ...(cloud.levelExamScores || {}) };
  if (local.levelExamScores) {
    Object.entries(local.levelExamScores).forEach(([k, v]) => {
      levelExamScores[k] = Math.max(levelExamScores[k] || 0, v);
    });
  }

  // Merge SRS Data: take the record with higher repetitions or latest review
  const srsData = { ...(cloud.srsData || {}) };
  if (local.srsData) {
    Object.entries(local.srsData).forEach(([wordId, localItem]) => {
      const cloudItem = srsData[wordId];
      if (!cloudItem) {
        srsData[wordId] = localItem;
      } else {
        if (localItem.repetitions > cloudItem.repetitions || (localItem.nextReviewDate > cloudItem.nextReviewDate)) {
          srsData[wordId] = {
            ...cloudItem,
            ...localItem,
            successCount: Math.max(cloudItem.successCount || 0, localItem.successCount || 0),
            repetitions: Math.max(cloudItem.repetitions || 0, localItem.repetitions || 0),
            streak: Math.max(cloudItem.streak || 0, localItem.streak || 0)
          };
        }
      }
    });
  }

  // Merge LingQs (take highest status)
  const lingqs = { ...(cloud.lingqs || {}) };
  if (local.lingqs) {
    Object.entries(local.lingqs).forEach(([word, localLingq]) => {
      const cloudLingq = lingqs[word];
      if (!cloudLingq) {
        lingqs[word] = localLingq;
      } else {
        lingqs[word] = {
          ...cloudLingq,
          ...localLingq,
          status: Math.max(cloudLingq.status || 1, localLingq.status || 1) as 1 | 2 | 3 | 4,
          lastReviewed: localLingq.lastReviewed || cloudLingq.lastReviewed
        };
      }
    });
  }

  // Merge Mined Sentences (deduplicate by targetWord + sentence_es)
  const minedKey = (m: { targetWord?: string; sentence_es?: string }) =>
    `${(m.targetWord || '').toLowerCase().trim()}:::${(m.sentence_es || '').trim()}`;
  const minedMap = new Map<string, any>();
  (cloud.minedSentences || []).forEach(m => minedMap.set(minedKey(m), m));
  (local.minedSentences || []).forEach(m => {
    const key = minedKey(m);
    if (!minedMap.has(key)) {
      minedMap.set(key, m);
    }
  });
  const minedSentences = Array.from(minedMap.values());

  // Daily lessons & words maps
  const dailyLessonsCompleted: Record<string, number> = { ...(cloud.dailyLessonsCompleted || {}) };
  if (local.dailyLessonsCompleted) {
    Object.entries(local.dailyLessonsCompleted).forEach(([date, count]) => {
      dailyLessonsCompleted[date] = Math.max(dailyLessonsCompleted[date] || 0, count);
    });
  }

  const dailyWordsRead: Record<string, number> = { ...(cloud.dailyWordsRead || {}) };
  if (local.dailyWordsRead) {
    Object.entries(local.dailyWordsRead).forEach(([date, count]) => {
      dailyWordsRead[date] = Math.max(dailyWordsRead[date] || 0, count);
    });
  }

  const dailyGoalMetDates: Record<string, boolean> = { ...(cloud.dailyGoalMetDates || {}), ...(local.dailyGoalMetDates || {}) };

  // Calculate merged XP: ensure cloud progress is preserved while local guest achievements are added
  const xp = Math.max(cloud.xp || 0, local.xp || 0);
  const streakDays = Math.max(cloud.streakDays || 0, local.streakDays || 0);
  const totalWordsRead = Math.max(cloud.totalWordsRead || 0, local.totalWordsRead || 0);
  const totalReadingTimeSec = Math.max(cloud.totalReadingTimeSec || 0, local.totalReadingTimeSec || 0);

  const lastActiveDate = (cloud.lastActiveDate && cloud.lastActiveDate > local.lastActiveDate)
    ? cloud.lastActiveDate
    : local.lastActiveDate;

  return {
    ...DEFAULT_USER_PROGRESS,
    ...cloud,
    ...local,
    currentLevel,
    streakDays,
    lastActiveDate,
    xp,
    avatarId: cloud.avatarId || local.avatarId || 'sun',
    photoURL: cloud.photoURL || local.photoURL || '',
    targetDialect: cloud.targetDialect || local.targetDialect || 'castilian',
    completedLessonIds,
    passedUnitQuizIds,
    quizScores,
    unlockedLevels: mergedUnlocked.length > 0 ? mergedUnlocked : ['A1'],
    passedLevelExamIds,
    levelExamScores,
    levelCertificates: { ...(cloud.levelCertificates || {}), ...(local.levelCertificates || {}) },
    savedWordIds,
    masteredWordIds,
    srsData,
    knownWords,
    lingqs,
    minedSentences,
    totalWordsRead,
    totalReadingTimeSec,
    dailyWordsRead,
    dailyLessonsCompleted,
    dailyGoalMetDates,
    readingSessions: [
      ...(cloud.readingSessions || []),
      ...(local.readingSessions || []).filter(ls => !(cloud.readingSessions || []).some(cs => cs.id === ls.id))
    ],
    userInterests: Array.from(new Set([...(cloud.userInterests || []), ...(local.userInterests || [])])),
    customImportedTexts: [
      ...(cloud.customImportedTexts || []),
      ...(local.customImportedTexts || []).filter(lt => !(cloud.customImportedTexts || []).some(ct => ct.id === lt.id))
    ],
    settings: {
      ...DEFAULT_USER_PROGRESS.settings,
      ...(cloud.settings || {}),
      ...(local.settings || {})
    }
  };
}
