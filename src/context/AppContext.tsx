import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { UserProgress } from '../types';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import {
  auth,
  signInWithGoogle,
  logoutUser,
  syncUserDataToFirestore,
  loadUserDataFromFirestore,
  getRedirectResult,
  getStoredFallbackUser,
  createFallbackUserSession
} from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
  dailyGoalToast: {
    show: boolean;
    streak: number;
    message: string;
  } | null;
  setDailyGoalToast: (toast: { show: boolean; streak: number; message: string; } | null) => void;
  handleGoogleSignIn: () => Promise<void>;
  handleLogout: () => Promise<void>;
  handleLessonCompleted: (lessonId: string) => void;
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
  const [authUser, setAuthUser] = useState<User | null>(getStoredFallbackUser());
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(!getStoredFallbackUser());
  const [dailyGoalToast, setDailyGoalToast] = useState<{
    show: boolean;
    streak: number;
    message: string;
  } | null>(null);

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

  // Sync Firebase Auth State & Protect Platform Access
  useEffect(() => {
    getRedirectResult(auth).catch((err) => {
      console.warn('Redirect result check:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        setIsAuthLoading(false);
        const cloudProgress = await loadUserDataFromFirestore(user);
        if (cloudProgress) {
          setUserProgress(cloudProgress);
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

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthLoading(true);
      let user = await signInWithGoogle();
      if (!user) {
        user = createFallbackUserSession();
      }
      setAuthUser(user);
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
      setActiveTab(savedTab && savedTab !== 'landing' ? savedTab : 'dashboard');
    } catch (err) {
      console.warn('Sign in handled:', err);
      const fallback = createFallbackUserSession();
      setAuthUser(fallback);
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
      setActiveTab(savedTab && savedTab !== 'landing' ? savedTab : 'dashboard');
    } finally {
      setIsAuthLoading(false);
    }
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
        dailyGoalToast,
        setDailyGoalToast,
        handleGoogleSignIn,
        handleLogout,
        handleLessonCompleted,
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
