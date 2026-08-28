import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { UserProgress } from '../types';

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigJson.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfigJson.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure custom databaseId if defined in config
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

let pendingSignInPromise: Promise<User | null> | null = null;

export const getStoredFallbackUser = (): User | null => {
  try {
    const stored = localStorage.getItem('iberacademy_fallback_user');
    if (stored) {
      return JSON.parse(stored) as User;
    }
  } catch (e) {
    console.warn('Error reading fallback user from localStorage:', e);
  }
  return null;
};

export const createFallbackUserSession = (): User => {
  let existingUid = localStorage.getItem('iberacademy_uid');
  if (!existingUid) {
    existingUid = 'user_ver_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('iberacademy_uid', existingUid);
  }
  const fallbackUser = {
    uid: existingUid,
    displayName: 'Learner',
    email: 'learner@iberacademy.app',
    photoURL: '',
    emailVerified: true,
    isAnonymous: true,
  } as unknown as User;
  localStorage.setItem('iberacademy_fallback_user', JSON.stringify(fallbackUser));
  return fallbackUser;
};

export const signInWithGoogle = async (): Promise<User | null> => {
  if (pendingSignInPromise) {
    return pendingSignInPromise;
  }

  pendingSignInPromise = (async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      const errorCode = error?.code || '';

      if (
        errorCode === 'auth/popup-blocked' ||
        errorCode === 'auth/cancelled-popup-request'
      ) {
        console.warn('Popup blocked, attempting redirect sign-in...', errorCode);
        try {
          await signInWithRedirect(auth, googleProvider);
          return null;
        } catch (redirectError: any) {
          console.error('Redirect Sign-In Error:', redirectError);
          throw redirectError;
        }
      }

      if (errorCode === 'auth/popup-closed-by-user') {
        console.info('Sign-in popup closed by user.');
        return null;
      }

      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      pendingSignInPromise = null;
    }
  })();

  return pendingSignInPromise;
};

export { getRedirectResult };

export const logoutUser = async () => {
  try {
    localStorage.removeItem('iberacademy_fallback_user');
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out Error:', error);
  }
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const syncUserDataToFirestore = async (user: User, progress: UserProgress) => {
  if (!user || user.uid.startsWith('user_ver_')) return;
  const userRef = doc(db, 'users', user.uid);
  const payload = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Learner',
    photoURL: user.photoURL || '',
    currentLevel: progress.currentLevel,
    streakDays: progress.streakDays,
    xp: progress.xp,
    lastActiveDate: progress.lastActiveDate,
    updatedAt: new Date().toISOString(),
    progressData: JSON.stringify(progress),
  };
  try {
    await setDoc(userRef, payload, { merge: true });
  } catch (error) {
    console.warn('Firestore sync skipped or unavailable:', error);
  }
};

export const loadUserDataFromFirestore = async (user: User): Promise<UserProgress | null> => {
  if (!user || user.uid.startsWith('user_ver_')) return null;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data.progressData) {
        try {
          return JSON.parse(data.progressData) as UserProgress;
        } catch (e) {
          console.error('Error parsing progressData:', e);
        }
      }
    }
  } catch (error) {
    console.warn('Firestore load skipped or unavailable:', error);
  }
  return null;
};
