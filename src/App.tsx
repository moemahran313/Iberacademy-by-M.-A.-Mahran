import React, { Suspense, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Flame, X } from 'lucide-react';
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
import { DashboardSkeleton, StoriesSkeleton } from './components/Skeletons';

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

function AppContent() {
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
          />

          {/* Main Tab Content - Virtualized Viewport Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-24 sm:pb-12 overflow-y-auto no-scrollbar scroll-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="w-full h-full min-h-[500px]"
              >
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

                <Suspense fallback={<DashboardSkeleton />}>
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
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 px-5 py-3.5 rounded-3xl shadow-2xl border-2 border-amber-300 flex items-center gap-3.5 max-w-md w-[92vw]"
          >
            <TactileFeedback variant="success" triggerKey={dailyGoalToast}>
              <div className="p-2.5 bg-stone-950 text-amber-400 rounded-2xl shrink-0 shadow-inner">
                <Flame className="w-6 h-6 fill-amber-400 animate-bounce" />
              </div>
            </TactileFeedback>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-950 font-header">
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

            <TactileFeedback variant="subtle">
              <button
                onClick={() => setDailyGoalToast(null)}
                className="p-1 text-stone-900/80 hover:text-stone-950 transition cursor-pointer flex items-center justify-center"
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
