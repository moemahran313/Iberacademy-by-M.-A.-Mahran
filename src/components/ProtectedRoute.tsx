import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { LandingPage } from './LandingPage';
import { PlacementTestModal } from './PlacementTestModal';
import { OnboardingModal } from './OnboardingModal';
import { createFallbackUserSession } from '../lib/firebase';
import { IberacademyLogo } from './IberacademyLogo';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {
    authUser,
    isAuthLoading,
    activeTab,
    setActiveTab,
    setIsOnboardingOpen,
    handleGoogleSignIn,
    isPlacementTestOpen,
    setIsPlacementTestOpen,
    isOnboardingOpen,
    userProgress,
    setUserProgress,
    setAuthUser
  } = useApp();

  // Show a clean loading UI while verifying session
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 selection:bg-orange-500 selection:text-stone-950">
        <div className="flex flex-col items-center space-y-8 max-w-sm w-full text-center">
          
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.99, 1.01, 0.99],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IberacademyLogo variant="full" />
          </motion.div>

          {/* Luxury Custom Skeleton Screen mockup mimicking Iberio dashboards */}
          <div className="w-full bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-800/40 to-transparent"
              animate={{
                translateX: ["0%", "200%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-stone-800 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2 text-left">
                <div className="h-3.5 bg-stone-800 rounded w-2/3" />
                <div className="h-2.5 bg-stone-800 rounded w-1/2" />
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="h-2.5 bg-stone-800 rounded w-full" />
              <div className="h-2.5 bg-stone-800 rounded w-11/12" />
              <div className="h-2.5 bg-stone-800 rounded w-4/5" />
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="h-6.5 bg-stone-800 rounded-lg w-1/3" />
              <div className="h-6.5 bg-stone-800 rounded-lg w-1/4" />
            </div>
          </div>

          <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500 font-mono">
            Calibrating Iberio Language Engine...
          </p>
        </div>
      </div>
    );
  }

  // If user is unauthenticated or explicitly navigated to 'landing' tab
  if (!authUser || activeTab === 'landing') {
    return (
      <div className="min-h-screen max-w-full overflow-x-hidden bg-stone-950 font-sans selection:bg-amber-500 selection:text-stone-950">
        <LandingPage
          authUser={authUser}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onGoogleSignIn={handleGoogleSignIn}
          onExploreDemo={() => {
            if (!authUser) {
              const fallback = createFallbackUserSession();
              setAuthUser(fallback);
            }
            setActiveTab('dashboard');
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
            let user = authUser;
            if (!user) {
              user = createFallbackUserSession();
              setAuthUser(user);
            }
            setActiveTab('dashboard');
          }}
        />
      </div>
    );
  }

  // Authenticated user on a protected tab
  return <>{children}</>;
};
