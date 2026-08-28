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
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProgress } from '../types';

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
        console.warn('Popup blocked or request cancelled, attempting redirect sign-in...', errorCode);
        try {
          await signInWithRedirect(auth, googleProvider);
          return null;
        } catch (redirectError: any) {
          console.error('Redirect Sign-In Error:', redirectError);
          return null;
        }
      }

      if (errorCode === 'auth/popup-closed-by-user') {
        console.info('Sign-in popup closed by user.');
        return null;
      }

      console.error('Google Sign-In Error:', error);
      return null;
    } finally {
      pendingSignInPromise = null;
    }
  })();

  return pendingSignInPromise;
};

export { getRedirectResult };

export const logoutUser = async () => {
  try {
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
  if (!user) return;
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
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
};

export const loadUserDataFromFirestore = async (user: User): Promise<UserProgress | null> => {
  if (!user) return null;
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
  return null;
};
