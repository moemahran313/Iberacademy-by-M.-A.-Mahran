import React, { Suspense, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Flame, X, Compass, Sparkles, GraduationCap, Layers, User as UserIcon } from 'lucide-react';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LearningPathView } from './components/LearningPathView';
import { ReadingDashboard } from './components/ReadingDashboard';
import { VocabularyLibrary } from './components/VocabularyLibrary';
import { ComprehensibleInputView } from './components/ComprehensibleInputView';
import { PlacementTestModal } from './components/PlacementTestModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { WelcomeVerificationModal } from './components/WelcomeVerificationModal';
import { EmailVerificationEnforcementModal } from './components/EmailVerificationEnforcementModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { AppProvider, useApp } from './context/AppContext';
import { ImportedContent } from './types';
import { TactileFeedback } from './components/TactileFeedback';
import { LazyViewWrapper } from './components/LazyViewWrapper';
import { VirtualizedList } from './components/VirtualizedList';
import { TabLoadingSkeleton } from './components/Skeletons';

// Code-split non-critical feature views to reduce initial JS payload size
const VerbConjugator = React.lazy(() => import('./components/VerbConjugator').then(m => ({ default: m.VerbConjugator })));
const GrammarEncyclopediaView = React.lazy(() => import('./components/GrammarEncyclopediaView').then(m => ({ default: m.GrammarEncyclopediaView })));
const AITutorChat = React.lazy(() => import('./components/AITutorChat').then(m => ({ default: m.AITutorChat })));
const VideoCoursesView = React.lazy(() => import('./components/VideoCoursesView').then(m => ({ default: m.VideoCoursesView })));
const LingLooperGame = React.lazy(() => import('./components/LingLooperGame').then(m => ({ default: m.LingLooperGame })));
const ProfileView = React.lazy(() => import('./components/ProfileView').then(m => ({ default: m.ProfileView })));
const CurriculumPlannerView = React.lazy(() => import('./components/CurriculumPlannerView').then(m => ({ default: m.CurriculumPlannerView })));
const A0BeginnerFoundationView = React.lazy(() => import('./components/A0BeginnerFoundationView').then(m => ({ default: m.A0BeginnerFoundationView })));
const OralShadowingDrill = React.lazy(() => import('./components/OralShadowingDrill').then(m => ({ default: m.OralShadowingDrill })));
const SkillWorkshopView = React.lazy(() => import('./components/SkillWorkshopView').then(m => ({ default: m.SkillWorkshopView })));

export interface AppContentNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isArabic?: boolean;
}

export const AppContentNavigation: React.FC<AppContentNavigationProps> = ({
  activeTab,
  setActiveTab,
  isArabic = false
}) => {
  const navTabs = [
    {
      id: 'dashboard',
      label_en: 'Today',
      label_ar: 'الرئيسية',
      icon: Compass,
      isActive: activeTab === 'dashboard'
    },
    {
      id: 'stories',
      label_en: 'Immersion',
      label_ar: 'القصص',
      icon: Sparkles,
      isActive: activeTab === 'stories' || activeTab === 'videos'
    },
    {
      id: 'workshop',
      label_en: 'Workshop',
      label_ar: 'الورشة',
      icon: GraduationCap,
      isActive: [
        'workshop',
        'vocabulary',
        'verbs',
        'grammar',
        'tutor',
        'shadowing',
        'linglooper',
        'a0_foundation'
      ].includes(activeTab)
    },
    {
      id: 'path',
      label_en: 'Roadmap',
      label_ar: 'المسار',
      icon: Layers,
      isActive: activeTab === 'path' || activeTab === 'planner'
    },
    {
      id: 'profile',
      label_en: 'Profile',
      label_ar: 'الملف',
      icon: UserIcon,
      isActive: activeTab === 'profile'
    }
  ];

  return (
    <nav
      id="appcontent-navigation"
      aria-label="AppContent navigation"
      className="hidden md:flex items-center space-x-1"
    >
      {navTabs.map(tab => {
        const Icon = tab.icon;
        const isActive = tab.isActive;
        return (
          <motion.button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 450, damping: 26 }}
            onClick={() => {
              soundEffects.playPop();
              setActiveTab(tab.id);
              window.scrollTo(0, 0);
            }}
            className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer rounded-xl select-none ${
              isActive
                ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {/* Soft background glow on hover */}
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-500/15 to-amber-500/5 dark:from-amber-400/15 dark:to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_18px_rgba(245,158,11,0.2)] border border-amber-500/20 dark:border-amber-400/20"
            />

            <Icon className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:scale-110" />
            <span className={`relative z-10 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? tab.label_ar : tab.label_en}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-amber-500 dark:bg-amber-400 rounded-full shadow-[0_1px_8px_rgba(245,158,11,0.45)] z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
};

export function AppContent() {
  const {
    activeTab,
    setActiveTab,
    userProgress,
    setUserProgress,
    isPlacementTestOpen,
    setIsPlacementTestOpen,
    isOnboardingOpen,
    setIsOnboardingOpen,
    authUser,
    openAuthModal,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    handleLogout,
    isAuthLoading,
    handleLessonCompleted,
    dailyGoalToast,
    setDailyGoalToast,
    isWelcomeVerificationOpen,
    setIsWelcomeVerificationOpen,
    verificationGate,
    closeVerificationGate,
  } = useApp();

  const handleOpenPlacementTest = useCallback(() => setIsPlacementTestOpen(true), [setIsPlacementTestOpen]);
  const handleOpenStories = useCallback(() => setActiveTab('stories'), [setActiveTab]);
  const handleOpenPath = useCallback(() => setActiveTab('path'), [setActiveTab]);
  const handleOpenVocabulary = useCallback(() => setActiveTab('vocabulary'), [setActiveTab]);
  const handleOpenDashboard = useCallback(() => setActiveTab('dashboard'), [setActiveTab]);
  const handleAddXp = useCallback((amount: number) => {
    setUserProgress(prev => ({ ...prev, xp: prev.xp + amount }));
  }, [setUserProgress]);

  React.useEffect(() => {
    if (dailyGoalToast && dailyGoalToast.show) {
      import('./utils/confetti').then(({ triggerConfettiBurst }) => {
        triggerConfettiBurst();
      });
    }
  }, [dailyGoalToast]);

  return (
    <>
      <ProtectedRoute>
        <div className="min-h-screen w-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950 transition-colors duration-200">
          {/* World-Class Header with Duolingo Stats & Firebase Database Auth */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onOpenPlacementTest={handleOpenPlacementTest}
            authUser={authUser}
            onOpenAuthModal={openAuthModal}
            onLogout={handleLogout}
            isAuthLoading={isAuthLoading}
            navigation={
              <AppContentNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isArabic={userProgress.settings?.nativeLanguage === 'ar'}
              />
            }
          />

          {/* Main Tab Content - Virtualized Viewport Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-24 sm:pb-12 overflow-y-auto no-scrollbar scroll-container">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-full h-full min-h-[500px]"
              >
                <Suspense fallback={<TabLoadingSkeleton tab={activeTab} />}>
                  {activeTab === 'dashboard' && (
                    <ReadingDashboard
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      onOpenStory={handleOpenStories}
                      onOpenPlacementTest={handleOpenPlacementTest}
                      onSwitchToPath={handleOpenPath}
                      onOpenVocabulary={handleOpenVocabulary}
                    />
                  )}

                  {activeTab === 'a0_foundation' && (
                    <A0BeginnerFoundationView
                      onAddXp={handleAddXp}
                      onBackToDashboard={handleOpenDashboard}
                    />
                  )}

                  {activeTab === 'planner' && (
                    <CurriculumPlannerView
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      setActiveTab={setActiveTab}
                    />
                  )}

                  {activeTab === 'path' && (
                    <LearningPathView
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      onOpenPlacementTest={handleOpenPlacementTest}
                      onOpenStory={handleOpenStories}
                      onLessonCompleted={handleLessonCompleted}
                    />
                  )}

                  {activeTab === 'workshop' && (
                    <SkillWorkshopView
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      setActiveTab={setActiveTab}
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

                  {activeTab === 'shadowing' && (
                    <OralShadowingDrill
                      userProgress={userProgress}
                      setUserProgress={setUserProgress}
                      onAddXp={handleAddXp}
                      onBackToDashboard={handleOpenDashboard}
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
                      onOpenAuthModal={openAuthModal}
                      onLogout={handleLogout}
                      onOpenPlacementTest={handleOpenPlacementTest}
                      isAuthLoading={isAuthLoading}
                    />
                  )}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* World-Class Footer */}
          <Footer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentLevel={userProgress.currentLevel}
            userEmail={authUser?.email}
            userName={authUser?.displayName}
          />

          {/* Floating Mobile PWA Install Banner */}
          <PWAInstallBanner />
        </div>
      </ProtectedRoute>

      {/* Global Placement Test Modal */}
      {isPlacementTestOpen && (
        <PlacementTestModal
          onClose={() => setIsPlacementTestOpen(false)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      )}

      {/* Global Goal Setup Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onOpenAuthModal={openAuthModal}
        onCompleteGuest={(goalData) => {
          setUserProgress(prev => ({
            ...prev,
            currentLevel: (goalData.level as any) || prev.currentLevel,
            dailyGoalMinutes: goalData.dailyMinutes || prev.dailyGoalMinutes
          }));
          setIsOnboardingOpen(false);
          setActiveTab('dashboard');
        }}
      />

      {/* Global Email/Password Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Post-Signup Branded Welcome & Email Verification Lifecycle Modal */}
      <WelcomeVerificationModal
        isOpen={isWelcomeVerificationOpen}
        onClose={() => setIsWelcomeVerificationOpen(false)}
        user={authUser}
      />

      {/* Email Verification Feature Gating Enforcement Modal */}
      <EmailVerificationEnforcementModal
        isOpen={Boolean(verificationGate?.open)}
        onClose={closeVerificationGate}
        user={authUser}
        featureName={verificationGate?.featureName || 'Cloud Feature'}
        onVerified={() => {
          const callback = verificationGate?.onPassed;
          closeVerificationGate();
          if (callback) callback();
        }}
      />

      {/* Daily Goal Met Toast Notification */}
      <AnimatePresence>
        {dailyGoalToast && (
          <motion.div
            initial={{ opacity: 0, y: -70, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 240 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 px-5 py-3.5 rounded-3xl shadow-2xl border-2 border-amber-300 flex items-center gap-3.5 max-w-md w-[92vw]"
          >
            <TactileFeedback variant="success" triggerKey={dailyGoalToast}>
              {/* Dynamic Icon Entrance Sequence: Spin & Pulsate */}
              <motion.div
                initial={{ scale: 0, rotate: -220 }}
                animate={{
                  scale: [0, 1.3, 0.95, 1],
                  rotate: [-220, 20, -10, 0]
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="p-2.5 bg-stone-950 text-amber-400 rounded-2xl shrink-0 shadow-inner relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    filter: [
                      'drop-shadow(0 0 0px rgba(245, 158, 11, 0))',
                      'drop-shadow(0 0 10px rgba(245, 158, 11, 0.9))',
                      'drop-shadow(0 0 0px rgba(245, 158, 11, 0))'
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: 'easeInOut'
                  }}
                >
                  <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
                </motion.div>
              </motion.div>
            </TactileFeedback>

            <div className="flex-1 space-y-0.5 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-950 font-header">
                  🎉 Daily Goal Met!
                </h4>
                <span className="text-[10px] font-mono font-black bg-stone-950 text-amber-400 px-2 py-0.5 rounded-full shadow-xs">
                  +75 XP
                </span>
              </div>
              <p
                className="text-xs font-extrabold text-stone-900 leading-snug font-arabic"
                dir={userProgress.settings?.nativeLanguage === 'ar' ? 'rtl' : 'auto'}
              >
                {dailyGoalToast.message}
              </p>
            </div>

            <TactileFeedback variant="subtle">
              <button
                onClick={() => setDailyGoalToast(null)}
                className="p-1.5 text-stone-900/80 hover:text-stone-950 transition cursor-pointer flex items-center justify-center rounded-xl hover:bg-black/10 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </TactileFeedback>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MotionConfig transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
        <AppContent />
      </MotionConfig>
    </AppProvider>
  );
}
