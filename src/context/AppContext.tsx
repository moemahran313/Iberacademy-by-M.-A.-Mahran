import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { UserProgress } from '../types';
import { ComprehensibilityScore } from '../types/curriculum';
import { calculateComprehensibilityScore } from '../services/comprehensibleInputService';
import { loadUserProgress, saveUserProgress, createZeroUserProgress, mergeUserProgress } from '../utils/storage';
import {
  auth,
  signUpWithEmail,
  signInWithEmail,
  logoutUser,
  syncUserDataToFirestore,
  loadUserDataFromFirestore,
  getStoredFallbackUser,
  createFallbackUserSession,
  updateUserProfileData,
  deleteAllAccountsInSystem
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
  handleDeleteAllAccounts: () => Promise<{ deletedCount: number; success: boolean }>;
  handleLessonCompleted: (lessonId: string) => void;
  grammarPracticeTopic: { id: string; title_es: string; title_en: string; formula?: string } | null;
  setGrammarPracticeTopic: (topic: { id: string; title_es: string; title_en: string; formula?: string } | null) => void;
  userKnownLemmas: Set<string>;
  analyzeComprehensibleInput: (text: string) => ComprehensibilityScore;
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

  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());
  const [authUser, setAuthUser] = useState<User | null>(getStoredFallbackUser());

  // Refs for debounced cloud sync to avoid stale closures
  const userProgressRef = useRef<UserProgress>(userProgress);
  userProgressRef.current = userProgress;
  const authUserRef = useRef<User | null>(authUser);
  authUserRef.current = authUser;
  const cloudSyncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced cloud write flusher
  const flushCloudSync = useCallback(() => {
    if (cloudSyncTimeoutRef.current) {
      clearTimeout(cloudSyncTimeoutRef.current);
      cloudSyncTimeoutRef.current = null;
    }
    const user = authUserRef.current;
    const progress = userProgressRef.current;
    if (user && !user.isAnonymous && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_ver_')) {
      syncUserDataToFirestore(user, progress).catch(err => {
        console.warn('Debounced Firestore sync error:', err);
      });
    }
  }, []);

  const setActiveTab = (tab: string) => {
    // Flush pending cloud sync immediately upon view/tab change
    flushCloudSync();
    setActiveTabState(tab);
    try {
      if (tab !== 'landing') {
        localStorage.setItem(ACTIVE_TAB_KEY, tab);
      }
    } catch (e) {
      console.warn('Failed to save activeTab to localStorage:', e);
    }
  };
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

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(!getStoredFallbackUser());
  const [dailyGoalToast, setDailyGoalToast] = useState<{
    show: boolean;
    streak: number;
    message: string;
  } | null>(null);

  const [grammarPracticeTopic, setGrammarPracticeTopic] = useState<{ id: string; title_es: string; title_en: string; formula?: string } | null>(null);

  // Predictive pre-fetching logic: Fetch component bundles for adjacent tabs when user lingers on current tab
  useEffect(() => {
    const timer = setTimeout(() => {
      const prefetchMap: Record<string, (() => Promise<unknown>)[]> = {
        dashboard: [
          () => import('../components/ComprehensibleInputView'),
          () => import('../components/VocabularyLibrary'),
          () => import('../components/VerbConjugator')
        ],
        stories: [
          () => import('../components/VocabularyLibrary'),
          () => import('../components/VerbConjugator')
        ],
        vocabulary: [
          () => import('../components/VerbConjugator'),
          () => import('../components/GrammarEncyclopediaView')
        ],
        verbs: [
          () => import('../components/GrammarEncyclopediaView'),
          () => import('../components/OralShadowingDrill')
        ],
        grammar: [
          () => import('../components/A0BeginnerFoundationView'),
          () => import('../components/VerbConjugator')
        ],
        a0_foundation: [
          () => import('../components/GrammarEncyclopediaView'),
          () => import('../components/OralShadowingDrill')
        ],
        shadowing: [
          () => import('../components/AITutorChat'),
          () => import('../components/VerbConjugator')
        ],
        tutor: [
          () => import('../components/VideoCoursesView'),
          () => import('../components/OralShadowingDrill')
        ],
        videos: [
          () => import('../components/AITutorChat'),
          () => import('../components/CurriculumPlannerView')
        ],
        linglooper: [
          () => import('../components/AITutorChat'),
          () => import('../components/ProfileView')
        ],
        planner: [
          () => import('../components/ProfileView')
        ],
        profile: [
          () => import('../components/LearningPathView')
        ]
      };

      const loaders = prefetchMap[activeTab] || [];
      loaders.forEach(loader => {
        loader().catch(() => {});
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

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
        const currentLocal = loadUserProgress();

        // Automatically merge offline guest data into the user's Firestore document without overwriting existing cloud history
        const merged = mergeUserProgress(cloudData?.progress, currentLocal);
        setUserProgress(merged);
        saveUserProgress(merged);

        if (cloudData && cloudData.progress) {
          await syncUserDataToFirestore(user, merged);
        } else {
          await syncUserDataToFirestore(user, merged);
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

  // Sync Arabic language attribute and Cairo font class on document element
  useEffect(() => {
    if (userProgress.settings?.nativeLanguage === 'ar') {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.classList.add('lang-ar');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.classList.remove('lang-ar');
    }
  }, [userProgress.settings?.nativeLanguage]);

  // Immediate save to localStorage for guests & offline resilience;
  // debounced Firestore sync (5s batch) for cloud accounts to eliminate re-render cascades.
  useEffect(() => {
    saveUserProgress(userProgress);

    const user = authUser;
    if (user && !user.isAnonymous && !user.uid.startsWith('guest_') && !user.uid.startsWith('user_ver_')) {
      if (cloudSyncTimeoutRef.current) {
        clearTimeout(cloudSyncTimeoutRef.current);
      }
      cloudSyncTimeoutRef.current = setTimeout(() => {
        flushCloudSync();
      }, 5000);
    }
  }, [userProgress, authUser, flushCloudSync]);

  // Flush pending cloud sync on page unmount / unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushCloudSync();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      flushCloudSync();
    };
  }, [flushCloudSync]);

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

      // Preserve any guest work accumulated before creating this account
      const currentLocal = loadUserProgress();
      const hasGuestHistory =
        currentLocal.xp > 0 ||
        currentLocal.completedLessonIds.length > 0 ||
        (currentLocal.savedWordIds && currentLocal.savedWordIds.length > 0);

      const targetProgress: UserProgress = hasGuestHistory
        ? {
            ...currentLocal,
            avatarId: avatarId || currentLocal.avatarId || 'sun',
            photoURL: photoURL || user.photoURL || currentLocal.photoURL || '',
            targetDialect: currentLocal.targetDialect || 'castilian'
          }
        : createZeroUserProgress(
            chosenLevel,
            avatarId || 'sun',
            photoURL || user.photoURL || '',
            'castilian'
          );

      setUserProgress(targetProgress);
      saveUserProgress(targetProgress);
      await syncUserDataToFirestore(user, targetProgress);

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
      const currentLocal = loadUserProgress();

      // Automatically merge offline guest data into the user's Firestore document without overwriting existing cloud history
      const mergedProgress = mergeUserProgress(cloudData?.progress, currentLocal);

      setUserProgress(mergedProgress);
      saveUserProgress(mergedProgress);
      await syncUserDataToFirestore(user, mergedProgress);

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
    const currentLocal = loadUserProgress();
    // Only initialize zero progress if guest has zero prior practice
    if (currentLocal.xp === 0 && currentLocal.completedLessonIds.length === 0) {
      const zeroProgress = createZeroUserProgress(
        chosenLevel,
        avatarId || 'sun',
        photoURL || '',
        'castilian'
      );
      setUserProgress(zeroProgress);
      saveUserProgress(zeroProgress);
    }
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

  const handleDeleteAllAccounts = async (): Promise<{ deletedCount: number; success: boolean }> => {
    try {
      const result = await deleteAllAccountsInSystem();
      setAuthUser(null);
      const zeroProgress = createZeroUserProgress('A1', 'sun', '', 'castilian');
      setUserProgress(zeroProgress);
      saveUserProgress(zeroProgress);
      setActiveTabState('landing');
      localStorage.removeItem(ACTIVE_TAB_KEY);
      return result;
    } catch (err) {
      console.error('Delete all accounts error:', err);
      return { deletedCount: 0, success: false };
    }
  };

  // Run full system account deletion once to guarantee 0 accounts in database & storage
  useEffect(() => {
    const PURGE_FLAG = 'iberio_system_accounts_purged_v2';
    if (!localStorage.getItem(PURGE_FLAG)) {
      deleteAllAccountsInSystem().then(() => {
        localStorage.setItem(PURGE_FLAG, 'true');
        setAuthUser(null);
        setActiveTabState('landing');
      }).catch(e => console.warn('Purge all accounts initialization note:', e));
    }
  }, []);

  // Set of known words and lemmas based on Krashen SLA user progress
  const userKnownLemmas = useMemo(() => {
    const set = new Set<string>();
    (userProgress.knownWords || []).forEach(w => set.add(w.toLowerCase()));
    (userProgress.masteredWordIds || []).forEach(w => set.add(w.toLowerCase()));
    (userProgress.savedWordIds || []).forEach(w => set.add(w.toLowerCase()));
    if (userProgress.lingqs) {
      Object.keys(userProgress.lingqs).forEach(w => set.add(w.toLowerCase()));
    }
    return set;
  }, [userProgress.knownWords, userProgress.masteredWordIds, userProgress.savedWordIds, userProgress.lingqs]);

  // Dynamic SLA Comprehensible Input analyzer
  const analyzeComprehensibleInput = useCallback((text: string): ComprehensibilityScore => {
    return calculateComprehensibilityScore(text, userKnownLemmas);
  }, [userKnownLemmas]);

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
        handleDeleteAllAccounts,
        handleLessonCompleted,
        grammarPracticeTopic,
        setGrammarPracticeTopic,
        userKnownLemmas,
        analyzeComprehensibleInput,
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

