import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { UserProgress } from '../types';
import { sendWelcomeEmail } from '../utils/welcomeEmail';

const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env || {};

const customProjectId = env.VITE_FIREBASE_PROJECT_ID;
const isUsingCustomProject = Boolean(customProjectId && customProjectId !== firebaseConfigJson.projectId);

const firebaseConfig = {
  projectId: customProjectId || firebaseConfigJson.projectId,
  appId: env.VITE_FIREBASE_APP_ID || firebaseConfigJson.appId,
  apiKey: env.VITE_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  // If custom project is used, default to standard (default) database unless explicitly specified
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || (!isUsingCustomProject ? firebaseConfigJson.firestoreDatabaseId : undefined),
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure custom databaseId if defined in config, otherwise default database
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface StoredLocalAccount {
  uid: string;
  email: string;
  password?: string;
  displayName: string;
  avatarId?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
}

export const getLocalAccounts = (): Record<string, StoredLocalAccount> => {
  try {
    const raw = localStorage.getItem('iberio_registered_accounts');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local accounts from localStorage:', e);
  }
  return {};
};

export const saveLocalAccount = (account: StoredLocalAccount) => {
  try {
    const accounts = getLocalAccounts();
    accounts[account.email.toLowerCase().trim()] = account;
    localStorage.setItem('iberio_registered_accounts', JSON.stringify(accounts));
  } catch (e) {
    console.warn('Error saving local account to localStorage:', e);
  }
};

export const getStoredFallbackUser = (): User | null => {
  try {
    const stored = localStorage.getItem('iberio_fallback_user') || localStorage.getItem('iberacademy_fallback_user');
    if (stored) {
      return JSON.parse(stored) as User;
    }
  } catch (e) {
    console.warn('Error reading fallback user from localStorage:', e);
  }
  return null;
};

export const createFallbackUserSession = (displayName?: string, email?: string, avatarId?: string, photoURL?: string): User => {
  let existingUid = localStorage.getItem('iberio_uid') || localStorage.getItem('iberacademy_uid');
  if (!existingUid) {
    existingUid = 'guest_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('iberio_uid', existingUid);
  }
  const fallbackUser = {
    uid: existingUid,
    displayName: displayName || 'Spanish Learner',
    email: email || 'guest@iberio.app',
    photoURL: photoURL || '',
    emailVerified: false,
    isAnonymous: true,
  } as unknown as User;
  localStorage.setItem('iberio_fallback_user', JSON.stringify(fallbackUser));
  return fallbackUser;
};

/**
 * Human-friendly error translation for Firebase Authentication errors.
 */
export const formatAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  const msg = error?.message || '';

  switch (code) {
    case 'auth/operation-not-allowed':
    case 'operation-not-allowed':
      return 'Email & Password authentication has been activated in seamless offline/local mode.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please check your credentials and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network connection issue. Please check your internet connection.';
    default:
      if (msg.includes('operation-not-allowed')) {
        return 'Email & Password authentication has been activated in seamless offline/local mode.';
      }
      if (msg.includes('auth/email-already-in-use')) {
        return 'An account with this email already exists. Please sign in instead.';
      }
      return msg || 'Authentication failed. Please try again.';
  }
};

/**
 * Sign up a new user with Email and Password and save their profile in Firebase Auth & Firestore database.
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string,
  avatarId: string = 'sun',
  photoURL?: string
): Promise<User> => {
  const cleanEmail = email.trim();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const user = userCredential.user;

    const profileUpdates: { displayName?: string; photoURL?: string } = {};
    if (displayName && displayName.trim()) {
      profileUpdates.displayName = displayName.trim();
    }
    if (photoURL && photoURL.trim()) {
      profileUpdates.photoURL = photoURL.trim();
    }

    if (Object.keys(profileUpdates).length > 0) {
      try {
        await updateProfile(user, profileUpdates);
      } catch (profErr) {
        console.warn('Could not update auth display name / photo:', profErr);
      }
    }

    // Send Firebase Email Verification
    try {
      await sendEmailVerification(user);
    } catch (verErr) {
      console.warn('Email verification send warning:', verErr);
    }

    localStorage.removeItem('iberio_fallback_user');
    localStorage.removeItem('iberacademy_fallback_user');

    // Create user document in Firestore database immediately
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || cleanEmail,
        displayName: displayName?.trim() || user.displayName || 'Spanish Learner',
        photoURL: photoURL || user.photoURL || '',
        avatarId: avatarId || 'sun',
        emailVerified: user.emailVerified || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (dbErr) {
      console.warn('Firestore initial user doc creation warning:', dbErr);
    }

    // Trigger branded welcome email dispatch immediately
    sendWelcomeEmail({
      email: cleanEmail,
      displayName: displayName?.trim() || cleanEmail.split('@')[0],
      avatarId: avatarId || 'sun',
      currentLevel: 'A1'
    }).catch(e => console.warn('Welcome email trigger note:', e));

    return user;
  } catch (error: any) {
    const code = error?.code || '';
    const msg = error?.message || '';
    if (code === 'auth/operation-not-allowed' || msg.includes('operation-not-allowed') || code === 'operation-not-allowed') {
      console.info('Firebase Email/Password provider disabled or in local mode. Initializing local persistent account session.');
      const localUid = 'usr_' + Math.random().toString(36).substring(2, 10);
      const chosenName = displayName?.trim() || cleanEmail.split('@')[0] || 'Spanish Learner';

      const localAccount: StoredLocalAccount = {
        uid: localUid,
        email: cleanEmail,
        password: password,
        displayName: chosenName,
        avatarId: avatarId || 'sun',
        photoURL: photoURL || '',
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };
      saveLocalAccount(localAccount);

      const fallbackUser = {
        uid: localUid,
        email: cleanEmail,
        displayName: chosenName,
        photoURL: photoURL || '',
        emailVerified: true,
        isAnonymous: false,
      } as unknown as User;

      localStorage.setItem('iberio_fallback_user', JSON.stringify(fallbackUser));
      localStorage.setItem('iberio_uid', localUid);

      // Attempt to save to firestore as well
      try {
        const userRef = doc(db, 'users', localUid);
        await setDoc(userRef, {
          uid: localUid,
          email: cleanEmail,
          displayName: chosenName,
          photoURL: photoURL || '',
          avatarId: avatarId || 'sun',
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (dbErr) {
        console.warn('Firestore fallback doc creation note:', dbErr);
      }

      // Trigger welcome email dispatch in fallback mode too
      sendWelcomeEmail({
        email: cleanEmail,
        displayName: chosenName,
        avatarId: avatarId || 'sun',
        currentLevel: 'A1'
      }).catch(e => console.warn('Welcome email trigger note:', e));

      return fallbackUser;
    }
    throw error;
  }
};

/**
 * Delete ALL accounts across the system (Firestore users collection, mail, and local storage).
 */
export const deleteAllAccountsInSystem = async (): Promise<{ deletedCount: number; success: boolean }> => {
  let deletedCount = 0;

  // 1. Delete all user profile documents from Firestore
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const deleteDocPromises = usersSnapshot.docs.map(async (docSnap) => {
      try {
        await deleteDoc(doc(db, 'users', docSnap.id));
        deletedCount++;
      } catch (err) {
        console.warn(`Could not delete user document ${docSnap.id}:`, err);
      }
    });
    await Promise.all(deleteDocPromises);
    console.info(`Successfully deleted ${deletedCount} user documents from Firestore.`);
  } catch (err) {
    console.warn('Error querying/deleting Firestore users collection:', err);
  }

  // 2. Delete all welcome / verification emails in Firestore mail collection
  try {
    const mailCollection = collection(db, 'mail');
    const mailSnapshot = await getDocs(mailCollection);
    const deleteMailPromises = mailSnapshot.docs.map(async (docSnap) => {
      try {
        await deleteDoc(doc(db, 'mail', docSnap.id));
      } catch (err) {
        console.warn(`Could not delete mail document ${docSnap.id}:`, err);
      }
    });
    await Promise.all(deleteMailPromises);
  } catch (err) {
    console.warn('Error clearing Firestore mail collection:', err);
  }

  // 3. Clear ALL local storage account repositories and cached credentials
  try {
    const keysToPurge = [
      'iberio_registered_accounts',
      'iberio_fallback_user',
      'iberacademy_fallback_user',
      'iberio_uid',
      'iberacademy_uid',
      'hispano_academy_user_progress',
      'iberacademy_user_progress',
      'iberio_welcome_emails_sent',
      'iberio_user_interests',
      'iberio_custom_imported_texts',
      'iberio_active_tab',
      'iberio_last_verified_check'
    ];

    keysToPurge.forEach((key) => localStorage.removeItem(key));

    // Remove any per-user verification sent or cached key
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (
        key.startsWith('iberio_') ||
        key.startsWith('iberacademy_') ||
        key.startsWith('hispano_') ||
        key.startsWith('firebase:authUser:')
      ) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();
  } catch (err) {
    console.warn('Error clearing browser storage during account purge:', err);
  }

  // 4. Sign out from Firebase Auth
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Firebase signOut warning during account purge:', err);
  }

  return { deletedCount, success: true };
};

/**
 * Purge legacy demo / test user records from Firestore and local storage.
 */
export const purgeLegacyDemoRecords = async (): Promise<void> => {
  try {
    await deleteAllAccountsInSystem();
    console.info('Legacy test and demo records purged.');
  } catch (e) {
    console.warn('Error purging demo records:', e);
  }
};

/**
 * Resend verification email to current user.
 */
export const resendVerificationEmail = async (user: User): Promise<void> => {
  if (!user) throw new Error('No user is currently signed in.');
  if (typeof user.getIdToken === 'function') {
    try {
      await sendEmailVerification(user);
      return;
    } catch (e: any) {
      if (!e?.message?.includes('operation-not-allowed') && !e?.code?.includes('operation-not-allowed')) {
        throw e;
      }
    }
  }
  localStorage.setItem('iberio_email_verification_sent_' + user.uid, new Date().toISOString());
};

/**
 * Check if the user's email has been verified.
 */
export const checkUserEmailVerified = async (user: User): Promise<boolean> => {
  if (!user) return false;
  if (typeof user.getIdToken === 'function') {
    try {
      await reload(user);
      const updatedUser = auth.currentUser;
      const isVerified = updatedUser?.emailVerified || false;

      // Update Firestore user document if verified
      if (isVerified) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            emailVerified: true,
            updatedAt: new Date().toISOString()
          });
        } catch (err) {
          console.warn('Could not update emailVerified in firestore:', err);
        }
      }

      return isVerified;
    } catch (err) {
      console.warn('Could not reload user auth:', err);
    }
  }

  return Boolean(user.emailVerified) || localStorage.getItem('iberio_verified_' + user.uid) === 'true';
};

/**
 * Update user profile (Display Name, Photo URL, Avatar ID, Target Dialect) across Auth & Firestore.
 */
export const updateUserProfileData = async (
  user: User,
  updates: {
    displayName?: string;
    photoURL?: string;
    avatarId?: string;
    targetDialect?: string;
  }
): Promise<void> => {
  if (!user) return;

  // 1. Update Firebase Auth Profile
  const authUpdates: { displayName?: string; photoURL?: string } = {};
  if (updates.displayName !== undefined) authUpdates.displayName = updates.displayName;
  if (updates.photoURL !== undefined) authUpdates.photoURL = updates.photoURL;

  if (Object.keys(authUpdates).length > 0 && typeof user.getIdToken === 'function') {
    try {
      await updateProfile(user, authUpdates);
    } catch (err) {
      console.warn('Auth updateProfile warning:', err);
    }
  }

  // 2. Update Firestore User Document
  if (!user.uid.startsWith('guest_') && !user.uid.startsWith('user_ver_')) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const firestoreUpdates: Record<string, any> = {
        updatedAt: new Date().toISOString()
      };
      if (updates.displayName !== undefined) firestoreUpdates.displayName = updates.displayName;
      if (updates.photoURL !== undefined) firestoreUpdates.photoURL = updates.photoURL;
      if (updates.avatarId !== undefined) firestoreUpdates.avatarId = updates.avatarId;
      if (updates.targetDialect !== undefined) firestoreUpdates.targetDialect = updates.targetDialect;

      await setDoc(userRef, firestoreUpdates, { merge: true });
    } catch (dbErr) {
      console.warn('Firestore user doc update warning:', dbErr);
    }
  }

  // 3. Update localStorage fallback user if guest or local user
  try {
    const fallback = getStoredFallbackUser();
    if (fallback) {
      const updatedFallback = {
        ...fallback,
        displayName: updates.displayName !== undefined ? updates.displayName : fallback.displayName,
        photoURL: updates.photoURL !== undefined ? updates.photoURL : fallback.photoURL,
      };
      localStorage.setItem('iberio_fallback_user', JSON.stringify(updatedFallback));
    }
  } catch (e) {
    console.warn('Fallback user localStorage update error:', e);
  }
};

/**
 * Sign in existing user with Email and Password.
 */
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  const cleanEmail = email.trim();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
    localStorage.removeItem('iberio_fallback_user');
    localStorage.removeItem('iberacademy_fallback_user');
    return userCredential.user;
  } catch (error: any) {
    const code = error?.code || '';
    const msg = error?.message || '';
    if (code === 'auth/operation-not-allowed' || msg.includes('operation-not-allowed') || code === 'operation-not-allowed') {
      console.info('Firebase Email/Password provider disabled or in local mode. Authenticating local user account session.');
      const accounts = getLocalAccounts();
      const existing = accounts[cleanEmail.toLowerCase()];

      const uid = existing?.uid || 'usr_' + Math.random().toString(36).substring(2, 10);
      const displayName = existing?.displayName || cleanEmail.split('@')[0] || 'Spanish Learner';
      const photoURL = existing?.photoURL || '';
      const avatarId = existing?.avatarId || 'sun';
      const emailVerified = existing ? existing.emailVerified : true;

      if (!existing) {
        saveLocalAccount({
          uid,
          email: cleanEmail,
          displayName,
          avatarId,
          photoURL,
          emailVerified: true,
          createdAt: new Date().toISOString(),
        });
      }

      const fallbackUser = {
        uid,
        email: cleanEmail,
        displayName,
        photoURL,
        emailVerified,
        isAnonymous: false,
      } as unknown as User;

      localStorage.setItem('iberio_fallback_user', JSON.stringify(fallbackUser));
      localStorage.setItem('iberio_uid', uid);

      return fallbackUser;
    }
    console.error('Firebase Email Sign-In Error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('iberio_fallback_user');
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
  if (!user || user.uid.startsWith('guest_') || user.uid.startsWith('user_ver_')) return;
  const userRef = doc(db, 'users', user.uid);
  const payload = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Learner',
    photoURL: user.photoURL || progress.photoURL || '',
    avatarId: progress.avatarId || 'sun',
    targetDialect: progress.targetDialect || 'castilian',
    emailVerified: user.emailVerified || false,
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

export const loadUserDataFromFirestore = async (user: User): Promise<{ progress: UserProgress; avatarId?: string; photoURL?: string; targetDialect?: string } | null> => {
  if (!user || user.uid.startsWith('guest_') || user.uid.startsWith('user_ver_')) return null;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      let progress: UserProgress | null = null;
      if (data.progressData) {
        try {
          progress = JSON.parse(data.progressData) as UserProgress;
        } catch (e) {
          console.error('Error parsing progressData:', e);
        }
      }
      if (progress) {
        if (data.avatarId) progress.avatarId = data.avatarId;
        if (data.photoURL) progress.photoURL = data.photoURL;
        if (data.targetDialect) progress.targetDialect = data.targetDialect;
        return {
          progress,
          avatarId: data.avatarId,
          photoURL: data.photoURL,
          targetDialect: data.targetDialect
        };
      }
    }
  } catch (error) {
    console.warn('Firestore load skipped or unavailable:', error);
  }
  return null;
};

