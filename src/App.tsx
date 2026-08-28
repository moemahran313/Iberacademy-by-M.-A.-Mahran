import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LearningPathView } from './components/LearningPathView';
import { ReadingDashboard } from './components/ReadingDashboard';
import { VocabularyLibrary } from './components/VocabularyLibrary';
import { VerbConjugator } from './components/VerbConjugator';
import { ComprehensibleInputView } from './components/ComprehensibleInputView';
import { GrammarEncyclopediaView } from './components/GrammarEncyclopediaView';
import { AITutorChat } from './components/AITutorChat';
import { VideoCoursesView } from './components/VideoCoursesView';
import { PlacementTestModal } from './components/PlacementTestModal';
import { LingLooperGame } from './components/LingLooperGame';
import { ProfileView } from './components/ProfileView';
import { LandingPage } from './components/LandingPage';
import { OnboardingModal } from './components/OnboardingModal';
import { UserProgress, ImportedContent } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { User } from 'firebase/auth';
import { auth, signInWithGoogle, logoutUser, syncUserDataToFirestore, loadUserDataFromFirestore, getRedirectResult, getStoredFallbackUser, createFallbackUserSession } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
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

  const handleLessonCompleted = (lessonId: string) => {
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
    // Process any redirect sign in result from Firebase
    getRedirectResult(auth).catch((err) => {
      console.warn('Redirect result check:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        setIsAuthLoading(false);
        // Load cloud progress from Firestore if available
        const cloudProgress = await loadUserDataFromFirestore(user);
        if (cloudProgress) {
          setUserProgress(cloudProgress);
        } else {
          // First time sign-in: push current progress to cloud
          syncUserDataToFirestore(user, userProgress);
        }
        // Redirect directly to main platform app dashboard on sign-in
        setActiveTab('dashboard');
      } else {
        const fallback = getStoredFallbackUser();
        if (fallback) {
          setAuthUser(fallback);
          setIsAuthLoading(false);
          setActiveTab('dashboard');
        } else {
          setAuthUser(null);
          setIsAuthLoading(false);
          setActiveTab('landing');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Enforce landing page redirection if unauthenticated
  useEffect(() => {
    if (!isAuthLoading && !authUser && activeTab !== 'landing') {
      setActiveTab('landing');
    }
  }, [authUser, isAuthLoading, activeTab]);

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
      setActiveTab('dashboard');
    } catch (err) {
      console.warn('Sign in handled:', err);
      const fallback = createFallbackUserSession();
      setAuthUser(fallback);
      setActiveTab('dashboard');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // If on landing tab, render the standalone Landing Page layout without internal app header
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen max-w-full overflow-x-hidden bg-stone-950 font-sans selection:bg-amber-500 selection:text-stone-950">
        <LandingPage
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onGoogleSignIn={handleGoogleSignIn}
          onExploreDemo={() => {
            if (authUser) {
              setActiveTab('dashboard');
            } else {
              handleGoogleSignIn();
            }
          }}
        />

        {/* Placement Test Modal */}
        {isPlacementTestOpen && (
          <PlacementTestModal
            onClose={() => setIsPlacementTestOpen(false)}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {/* Goal Setup Onboarding Modal */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onGoogleSignIn={handleGoogleSignIn}
          onCompleteGuest={(goalData) => {
            setUserProgress(prev => ({
              ...prev,
              currentLevel: (goalData.level as any) || prev.currentLevel,
              dailyGoalMinutes: goalData.dailyMinutes || prev.dailyGoalMinutes
            }));
            if (authUser) {
              setActiveTab('dashboard');
            } else {
              handleGoogleSignIn();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950 transition-colors duration-200">
      {/* World-Class Header with Duolingo Stats & Firebase Auth */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onOpenPlacementTest={() => setIsPlacementTestOpen(true)}
        authUser={authUser}
        onGoogleSignIn={handleGoogleSignIn}
        onLogout={handleLogout}
        isAuthLoading={isAuthLoading}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <ReadingDashboard
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onOpenStory={(story: ImportedContent) => {
              setActiveTab('stories');
            }}
            onOpenPlacementTest={() => setIsPlacementTestOpen(true)}
            onSwitchToPath={() => setActiveTab('path')}
          />
        )}

        {activeTab === 'path' && (
          <LearningPathView
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onOpenPlacementTest={() => setIsPlacementTestOpen(true)}
            onOpenStory={() => {
              setActiveTab('stories');
            }}
            onLessonCompleted={handleLessonCompleted}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyLibrary
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === 'verbs' && (
          <VerbConjugator />
        )}

        {activeTab === 'stories' && (
          <ComprehensibleInputView
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarEncyclopediaView
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === 'tutor' && (
          <AITutorChat
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === 'linglooper' && (
          <LingLooperGame
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === 'videos' && (
          <VideoCoursesView />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            authUser={authUser}
            onGoogleSignIn={handleGoogleSignIn}
            onLogout={handleLogout}
            onOpenPlacementTest={() => setIsPlacementTestOpen(true)}
            isAuthLoading={isAuthLoading}
          />
        )}
      </main>

      {/* Placement Test Modal */}
      {isPlacementTestOpen && (
        <PlacementTestModal
          onClose={() => setIsPlacementTestOpen(false)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      )}

      {/* Goal Setup Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onCompleteGuest={(goalData) => {
          setUserProgress(prev => ({
            ...prev,
            currentLevel: (goalData.level as any) || prev.currentLevel,
            dailyGoalMinutes: goalData.dailyMinutes || prev.dailyGoalMinutes
          }));
          setActiveTab('dashboard');
        }}
      />

      {/* Daily Goal Met Toast Notification */}
      <AnimatePresence>
        {dailyGoalToast && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 px-5 py-3.5 rounded-3xl shadow-2xl border-2 border-amber-300 flex items-center gap-3.5 max-w-md w-[92vw]"
          >
            <div className="p-2.5 bg-stone-950 text-amber-400 rounded-2xl shrink-0 shadow-inner">
              <Flame className="w-6 h-6 fill-amber-400 animate-bounce" />
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-950 font-arabic">
                  🎉 Daily Goal Met!
                </h4>
                <span className="text-[10px] font-mono font-black bg-stone-950 text-amber-400 px-2 py-0.5 rounded-full">
                  +75 XP
                </span>
              </div>
              <p className="text-xs font-extrabold text-stone-900 leading-snug font-arabic">
                {dailyGoalToast.message}
              </p>
            </div>

            <button
              onClick={() => setDailyGoalToast(null)}
              className="p-1 text-stone-900/80 hover:text-stone-950 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* World-Class Footer */}
      <Footer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLevel={userProgress.currentLevel}
        userEmail={authUser?.email}
        userName={authUser?.displayName}
      />
    </div>
  );
}
