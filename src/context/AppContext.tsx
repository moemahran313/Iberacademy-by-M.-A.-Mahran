import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { UserProgress } from '../types';
import { loadUserProgress, saveUserProgress, createZeroUserProgress } from '../utils/storage';
import {
  auth,
  signUpWithEmail,
  signInWithEmail,
  logoutUser,
  syncUserDataToFirestore,
  loadUserDataFromFirestore,
  getStoredFallbackUser,
  createFallbackUserSession,
  updateUserProfileData
} from '../lib/firebase';

interface AppContextType {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  isPlacementTestOpen: boolean;
  setIsPlacementTestOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  isWelcomeVerificationOpen: boolean;
  setIsWelcomeVerificationOpen: (open: boolean) => void;
  verificationGate: { open: boolean; featureName: string; onPassed?: () => void } | null;
  requireEmailVerification: (featureName: string, onPassed?: () => void) => boolean;
  closeVerificationGate: () => void;
  dailyGoalToast: {
    show: boolean;
    streak: number;
    message: string;
  } | null;
  setDailyGoalToast: (toast: { show: boolean; streak: number; message: string; } | null) => void;
  handleEmailSignIn: (email: string, password: string) => Promise<User>;
  handleEmailSignUp: (email: string, password: string, displayName?: string, avatarId?: string, photoURL?: string, chosenLevel?: 'A1' | 'A2' | 'B1' | 'B2') => Promise<User>;
  handleGuestSignIn: (displayName?: string, email?: string, avatarId?: string, photoURL?: string, chosenLevel?: 'A1' | 'A2' | 'B1' | 'B2') => void;
  handleUpdateProfile: (updates: { displayName?: string; photoURL?: string; avatarId?: string; targetDialect?: string }) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleLessonCompleted: (lessonId: string) => void;
  grammarPracticeTopic: { id: string; title_es: string; title_en: string; formula?: string } | null;
  setGrammarPracticeTopic: (topic: { id: string; title_es: string; title_en: string; formula?: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ACTIVE_TAB_KEY = 'iberio_active_tab';
const OLD_ACTIVE_TAB_KEY = 'iberacademy_active_tab';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Restore activeTab from localStorage or default to 'dashboard'
  const [activeTab, setActiveTabState] = useState<string>(() => {
    try {
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY) || localStorage.getItem(OLD_ACTIVE_TAB_KEY);
      return savedTab || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    try {
      if (tab !== 'landing') {
        localStorage.setItem(ACTIVE_TAB_KEY, tab);
      }
    } catch (e) {
      console.warn('Failed to save activeTab to localStorage:', e);
    }
  };

  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isWelcomeVerificationOpen, setIsWelcomeVerificationOpen] = useState<boolean>(false);
  const [verificationGate, setVerificationGate] = useState<{
    open: boolean;
    featureName: string;
    onPassed?: () => void;
  } | null>(null);

  const [authUser, setAuthUser] = useState<User | null>(getStoredFallbackUser());
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(!getStoredFallbackUser());
  const [dailyGoalToast, setDailyGoalToast] = useState<{
    show: boolean;
    streak: number;
    message: string;
  } | null>(null);

  const [grammarPracticeTopic, setGrammarPracticeTopic] = useState<{ id: string; title_es: string; title_en: string; formula?: string } | null>(null);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const requireEmailVerification = (featureName: string, onPassed?: () => void): boolean => {
    if (!authUser) {
      openAuthModal('signin');
      return false;
    }
    const isVerified = Boolean(authUser.emailVerified) || localStorage.getItem('iberio_verified_' + authUser.uid) === 'true';
    if (!isVerified) {
      setVerificationGate({
        open: true,
        featureName,
        onPassed
      });
      return false;
    }
    return true;
  };

  const closeVerificationGate = () => {
    setVerificationGate(null);
  };

  const handleLessonCompleted = (_lessonId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const countToday = (userProgress.dailyLessonsCompleted?.[today] || 0) + 1;
    const currentStreak = Math.max(1, userProgress.streakDays || 1);

    setDailyGoalToast({
      show: true,
      streak: currentStreak,
      message: countToday === 1
        ? 'First lesson completed today! Streak extended 🔥'
        : `Lesson completed! ${countToday} completed today 🎉`
    });

    setTimeout(() => {
      setDailyGoalToast(null);
    }, 4500);
  };

  // Sync Firebase Auth State & Listen for changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        setIsAuthLoading(false);
        const cloudData = await loadUserDataFromFirestore(user);
        if (cloudData && cloudData.progress) {
          setUserProgress((prev) => ({
            ...prev,
            ...cloudData.progress,
            avatarId: cloudData.avatarId || cloudData.progress.avatarId || prev.avatarId || 'sun',
            photoURL: cloudData.photoURL || cloudData.progress.photoURL || user.photoURL || prev.photoURL,
            targetDialect: cloudData.targetDialect || cloudData.progress.targetDialect || prev.targetDialect || 'castilian'
          }));
        } else {
          syncUserDataToFirestore(user, userProgress);
        }
        // If current tab is landing or non-existent, navigate to saved/dashboard tab
        const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
        if (!savedTab || savedTab === 'landing') {
          setActiveTab('dashboard');
        }
      } else {
        const fallback = getStoredFallbackUser();
        if (fallback) {
          setAuthUser(fallback);
          setIsAuthLoading(false);
          const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
          if (!savedTab || savedTab === 'landing') {
            setActiveTab('dashboard');
          }
        } else {
          setAuthUser(null);
          setIsAuthLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync dark class on document element
  useEffect(() => {
    if (userProgress.settings?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userProgress.settings?.theme]);

  // Sync user progress to local storage & Firestore
  useEffect(() => {
    saveUserProgress(userProgress);
    if (authUser) {
      syncUserDataToFirestore(authUser, userProgress);
    }
  }, [userProgress, authUser]);

  const handleEmailSignUp = async (
    email: string,
    password: string,
    displayName?: string,
    avatarId: string = 'sun',
    photoURL?: string,
    chosenLevel: 'A1' | 'A2' | 'B1' | 'B2' = 'A1'
  ): Promise<User> => {
    setIsAuthLoading(true);
    try {
      const user = await signUpWithEmail(email, password, displayName, avatarId, photoURL);
      setAuthUser(user);
      setIsOnboardingOpen(false);
      setIsAuthModalOpen(false);

      // Initialize brand new account strictly at 0 XP, fresh start
      const freshZeroProgress = createZeroUserProgress(
        chosenLevel,
        avatarId || 'sun',
        photoURL || user.photoURL || '',
        'castilian'
      );
      setUserProgress(freshZeroProgress);
      saveUserProgress(freshZeroProgress);
      await syncUserDataToFirestore(user, freshZeroProgress);

      // Open welcome verification lifecycle notice in non-intrusive mode
      setIsWelcomeVerificationOpen(false);

      localStorage.setItem(ACTIVE_TAB_KEY, 'dashboard');
      setActiveTab('dashboard');
      return user;
    } finally {
      setIsAuthLoading(false);
      setIsOnboardingOpen(false);
      setIsAuthModalOpen(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string): Promise<User> => {
    setIsAuthLoading(true);
    try {
      const user = await signInWithEmail(email, password);
      setAuthUser(user);
      setIsOnboardingOpen(false);
      setIsAuthModalOpen(false);

      const cloudData = await loadUserDataFromFirestore(user);
      if (cloudData && cloudData.progress) {
        setUserProgress({
          ...cloudData.progress,
          avatarId: cloudData.avatarId || cloudData.progress.avatarId || 'sun',
          photoURL: cloudData.photoURL || cloudData.progress.photoURL || user.photoURL || '',
          targetDialect: cloudData.targetDialect || cloudData.progress.targetDialect || 'castilian'
        });
      } else {
        await syncUserDataToFirestore(user, userProgress);
      }
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
      setActiveTab(savedTab && savedTab !== 'landing' ? savedTab : 'dashboard');
      return user;
    } finally {
      setIsAuthLoading(false);
      setIsOnboardingOpen(false);
      setIsAuthModalOpen(false);
    }
  };

  const handleGuestSignIn = (
    displayName?: string,
    email?: string,
    avatarId?: string,
    photoURL?: string,
    chosenLevel: 'A1' | 'A2' | 'B1' | 'B2' = 'A1'
  ) => {
    const fallback = createFallbackUserSession(displayName, email, avatarId, photoURL);
    setAuthUser(fallback);
    const zeroProgress = createZeroUserProgress(
      chosenLevel,
      avatarId || 'sun',
      photoURL || '',
      'castilian'
    );
    setUserProgress(zeroProgress);
    saveUserProgress(zeroProgress);
    setIsOnboardingOpen(false);
    setIsAuthModalOpen(false);
    const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
    setActiveTab(savedTab && savedTab !== 'landing' ? savedTab : 'dashboard');
  };

  const handleUpdateProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
    avatarId?: string;
    targetDialect?: string;
  }) => {
    if (!authUser) return;

    // Update local state immediately for snappy UI
    setUserProgress(prev => ({
      ...prev,
      avatarId: updates.avatarId !== undefined ? updates.avatarId : prev.avatarId,
      photoURL: updates.photoURL !== undefined ? updates.photoURL : prev.photoURL,
      targetDialect: updates.targetDialect !== undefined ? updates.targetDialect : prev.targetDialect,
    }));

    if (updates.displayName !== undefined || updates.photoURL !== undefined) {
      setAuthUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          displayName: updates.displayName !== undefined ? updates.displayName : prev.displayName,
          photoURL: updates.photoURL !== undefined ? updates.photoURL : prev.photoURL
        } as unknown as User;
      });
    }

    await updateUserProfileData(authUser, updates);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem(ACTIVE_TAB_KEY);
      await logoutUser();
      setAuthUser(null);
      setActiveTabState('landing');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthLoading,
        activeTab,
        setActiveTab,
        userProgress,
        setUserProgress,
        isPlacementTestOpen,
        setIsPlacementTestOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        dailyGoalToast,
        setDailyGoalToast,
        handleEmailSignIn,
        handleEmailSignUp,
        handleGuestSignIn,
        handleUpdateProfile,
        handleLogout,
        handleLessonCompleted,
        grammarPracticeTopic,
        setGrammarPracticeTopic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

