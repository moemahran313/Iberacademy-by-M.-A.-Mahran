import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Target,
  Clock,
  Globe,
  Briefcase,
  Heart,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Zap,
  ShieldCheck,
  Star,
  UserCheck
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onCompleteGuest?: (goalData: { level: string; goal: string; dailyMinutes: number }) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
  onCompleteGuest
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [selectedGoal, setSelectedGoal] = useState<string>('travel');
  const [dailyMinutes, setDailyMinutes] = useState<number>(20);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  if (!isOpen) return null;

  const levels = [
    {
      id: 'A1',
      title: 'A1 • Complete Beginner',
      subtitle: 'New to Spanish or know a few basic phrases',
      desc: 'Learn high-frequency 500 words & core greetings',
      badge: 'Start Here'
    },
    {
      id: 'A2',
      title: 'A2 • Elementary Learner',
      subtitle: 'Can handle basic daily tasks & simple dialogues',
      desc: 'Build 1,200 words & past tense confidence',
      badge: 'Popular'
    },
    {
      id: 'B1',
      title: 'B1 • Intermediate Practitioner',
      subtitle: 'Can converse about familiar topics & stories',
      desc: 'Master 2,500 words & subjunctive triggers',
      badge: 'Fluency Path'
    },
    {
      id: 'B2',
      title: 'B2 • Upper Intermediate',
      subtitle: 'Understand complex text & native conversation speed',
      desc: 'Refine 5,000+ words & native colloquial idioms',
      badge: 'Mastery'
    }
  ];

  const goals = [
    {
      id: 'travel',
      icon: Globe,
      title: 'Travel & Immersion',
      desc: 'Navigate Spain & Latin America with confident street dialogues'
    },
    {
      id: 'career',
      icon: Briefcase,
      title: 'Career & Professional Growth',
      desc: 'Unlock new business opportunities in bilingual work environments'
    },
    {
      id: 'family',
      icon: Heart,
      title: 'Family, Friends & Heritage',
      desc: 'Connect deeply with relatives and native-speaking loved ones'
    },
    {
      id: 'culture',
      icon: BookOpen,
      title: 'Literature, Shows & Podcasts',
      desc: 'Enjoy authentic Spanish movies, music, and books without subtitles'
    },
    {
      id: 'brain',
      icon: Brain,
      title: 'Brain Agility & Learning',
      desc: 'Keep your cognitive skills sharp through daily comprehensible input'
    }
  ];

  const commitments = [
    {
      minutes: 10,
      title: '10 mins / day',
      desc: 'Casual immersion — ~150 words learned monthly',
      badge: 'Light'
    },
    {
      minutes: 20,
      title: '20 mins / day',
      desc: 'Recommended pace — ~400 words & B1 fluency in 6 months',
      badge: 'Optimal Pace'
    },
    {
      minutes: 30,
      title: '30 mins / day',
      desc: 'Intensive immersion — ~800 words & rapid conversational mastery',
      badge: 'Fast-Track'
    }
  ];

  const handleNext = () => {
    soundEffects.playPop();
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    soundEffects.playPop();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGoogleSubmit = async () => {
    soundEffects.playLevelUp();
    setIsSigningIn(true);
    try {
      await onGoogleSignIn();
      onClose();
    } catch (e) {
      console.error('Google Sign in error:', e);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Header Progress Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-amber-600 dark:text-amber-400">
                Personalized Setup • Step {step} of 4
              </span>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                {step === 1 && 'Select Your Starting Spanish Level'}
                {step === 2 && 'What is Your Primary Goal?'}
                {step === 3 && 'Choose Your Daily Immersion Target'}
                {step === 4 && 'Your Custom Learning Roadmap Ready!'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Multi-step Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: LEVEL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-3"
              >
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  We adapt reading texts, grammar glossaries, and AI audio prompts to match your proficiency level.
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {levels.map((lvl) => {
                    const isSelected = selectedLevel === lvl.id;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => {
                          soundEffects.playPop();
                          setSelectedLevel(lvl.id);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                            : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-amber-500/40 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-stone-900 dark:text-white">
                              {lvl.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                              {lvl.badge}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {lvl.subtitle}
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500 text-stone-950'
                              : 'border-stone-300 dark:border-stone-700'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-stone-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: GOAL */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-3"
              >
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Select what inspires you most to ensure your recommended reading stories match your interests.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {goals.map((g) => {
                    const Icon = g.icon;
                    const isSelected = selectedGoal === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => {
                          soundEffects.playPop();
                          setSelectedGoal(g.id);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                            : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-amber-500/40 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs text-stone-900 dark:text-white">
                            {g.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug mt-0.5">
                            {g.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: COMMITMENT */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-3"
              >
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Consistency is key for Stephen Krashen&apos;s natural acquisition theory. How long can you commit daily?
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {commitments.map((c) => {
                    const isSelected = dailyMinutes === c.minutes;
                    return (
                      <div
                        key={c.minutes}
                        onClick={() => {
                          soundEffects.playPop();
                          setDailyMinutes(c.minutes);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                            : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-amber-500/40 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-500 font-mono font-black text-sm shrink-0">
                            {c.minutes}m
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-stone-900 dark:text-white">
                                {c.title}
                              </span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                                {c.badge}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {c.desc}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500 text-stone-950'
                              : 'border-stone-300 dark:border-stone-700'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-stone-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUMMARY & GOOGLE AUTH */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-5"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                      Your Custom Learning Plan
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500 text-stone-950">
                      Ready to Unlock
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-white/60 dark:bg-stone-800/60 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Level</span>
                      <span className="text-sm font-black text-stone-900 dark:text-white">{selectedLevel}</span>
                    </div>
                    <div className="p-2 bg-white/60 dark:bg-stone-800/60 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Target</span>
                      <span className="text-sm font-black text-amber-600 dark:text-amber-400">{dailyMinutes} min/day</span>
                    </div>
                    <div className="p-2 bg-white/60 dark:bg-stone-800/60 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Goal</span>
                      <span className="text-xs font-black text-stone-900 dark:text-white capitalize truncate block">
                        {selectedGoal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* What platform does */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400 block">
                    What your Hispanohablante account unlocks:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>LingQ-Style Interactive Reader</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                      <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Real-time Global League Sync</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>SLA Grammar Encyclopedia & Mining</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                      <Star className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>AI Hispanohablante Tutor Conversations</span>
                    </div>
                  </div>
                </div>

                {/* Google Sign In CTA */}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleGoogleSubmit}
                    disabled={isSigningIn}
                    className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-950 font-black text-sm flex items-center justify-center gap-3 transition shadow-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{isSigningIn ? 'Connecting Google Account...' : 'Sign In with Google to Access Platform'}</span>
                  </button>
                  <p className="text-[11px] text-center text-stone-500 font-medium">
                    Google authentication is required to access your personalized Spanish learning workspace.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 text-stone-950 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
