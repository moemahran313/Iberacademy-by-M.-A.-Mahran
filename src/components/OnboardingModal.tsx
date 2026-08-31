import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
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
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';
import { formatAuthErrorMessage } from '../lib/firebase';
import { AvatarGallery } from './AvatarGallery';
import { AvatarDisplay } from './AvatarDisplay';
import { CULTURAL_AVATARS } from '../data/avatars';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onCompleteGuest?: (goalData: { level: string; goal: string; dailyMinutes: number }) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onOpenAuthModal,
  onCompleteGuest
}) => {
  const { handleEmailSignUp, handleGuestSignIn, openAuthModal, setActiveTab } = useApp();
  const [step, setStep] = useState<number>(1);
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [selectedGoal, setSelectedGoal] = useState<string>('travel');
  const [dailyMinutes, setDailyMinutes] = useState<number>(20);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('sun');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalSteps = 5;

  const levels = [
    {
      id: 'A1' as const,
      title: 'A1 • Complete Beginner',
      subtitle: 'New to Spanish or know a few basic phrases',
      desc: 'Learn high-frequency 500 words & core greetings',
      badge: 'Start Here'
    },
    {
      id: 'A2' as const,
      title: 'A2 • Elementary Learner',
      subtitle: 'Can handle basic daily tasks & simple dialogues',
      desc: 'Build 1,200 words & past tense confidence',
      badge: 'Popular'
    },
    {
      id: 'B1' as const,
      title: 'B1 • Intermediate Practitioner',
      subtitle: 'Can converse about familiar topics & stories',
      desc: 'Master 2,500 words & subjunctive triggers',
      badge: 'Fluency Path'
    },
    {
      id: 'B2' as const,
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
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    soundEffects.playPop();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDirectSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setAuthError('Please enter both email and password.');
      return;
    }
    if (cleanPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setIsSigningIn(true);
    try {
      await handleEmailSignUp(
        cleanEmail,
        cleanPassword,
        name.trim() || undefined,
        selectedAvatarId,
        photoURL.trim() || undefined,
        selectedLevel
      );
      soundEffects.playLevelUp();
      setActiveTab('dashboard');
      if (onCompleteGuest) {
        onCompleteGuest({
          level: selectedLevel,
          goal: selectedGoal,
          dailyMinutes: dailyMinutes
        });
      }
      onClose();
    } catch (err: any) {
      const formatted = formatAuthErrorMessage(err);
      setAuthError(formatted);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGuestComplete = () => {
    soundEffects.playLevelUp();
    handleGuestSignIn(
      name.trim() || 'Spanish Learner',
      undefined,
      selectedAvatarId,
      photoURL.trim() || undefined,
      selectedLevel
    );
    setActiveTab('dashboard');
    if (onCompleteGuest) {
      onCompleteGuest({
        level: selectedLevel,
        goal: selectedGoal,
        dailyMinutes: dailyMinutes
      });
    }
    onClose();
  };

  const currentAvatarMeta =
    CULTURAL_AVATARS.find((a) => a.id === selectedAvatarId) || CULTURAL_AVATARS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        {/* Header Progress Bar */}
        <div className="px-6 pt-5 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase text-amber-600 dark:text-amber-400">
                  Step {step} of {totalSteps}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === step
                          ? 'w-6 bg-amber-500'
                          : i < step
                          ? 'w-3 bg-amber-500/50'
                          : 'w-2 bg-stone-200 dark:bg-stone-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-white mt-0.5">
                {step === 1 && 'Select Your Starting Spanish Level'}
                {step === 2 && 'What is Your Primary Goal?'}
                {step === 3 && 'Choose Your Daily Immersion Target'}
                {step === 4 && 'Choose Your Cultural Avatar & Name'}
                {step === 5 && 'Create Your 0 XP Account'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Multi-step Content Area with Smooth Slide Transitions */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* STEP 1: LEVEL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  We calibrate reading stories, SRS vocabulary, and AI audio prompts to match your proficiency level.
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
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs ring-1 ring-amber-500/30'
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
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
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs ring-1 ring-amber-500/30'
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
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
                            ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-stone-900 dark:text-white shadow-xs ring-1 ring-amber-500/30'
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

            {/* STEP 4: MANDATORY AVATAR & NAME SELECTION */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Display Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Your Display Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mateo Alvarez"
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                </div>

                {/* Avatar Gallery */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Choose Cultural Avatar Badge</span>
                  </label>
                  <AvatarGallery
                    selectedAvatarId={selectedAvatarId}
                    photoURL={photoURL}
                    displayName={name || 'Spanish Learner'}
                    onSelectAvatar={(id) => setSelectedAvatarId(id)}
                    onUpdatePhotoURL={(url) => setPhotoURL(url)}
                    requireSelection={true}
                    compact={true}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUMMARY & ACCOUNT FINALIZATION */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Fresh 0 XP Plan Card */}
                <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AvatarDisplay
                        photoURL={photoURL}
                        avatarId={!photoURL ? selectedAvatarId : undefined}
                        name={name || 'Learner'}
                        size="sm"
                      />
                      <div>
                        <span className="text-xs font-black text-stone-900 dark:text-white">
                          {name || 'Spanish Learner'}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {currentAvatarMeta.name} • Level {selectedLevel}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500 text-stone-950 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>0 XP Fresh Start</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white/70 dark:bg-stone-800/70 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Streak</span>
                      <span className="font-black text-orange-500">Day 1 🔥</span>
                    </div>
                    <div className="p-2 bg-white/70 dark:bg-stone-800/70 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Target</span>
                      <span className="font-black text-amber-600 dark:text-amber-400">{dailyMinutes}m / day</span>
                    </div>
                    <div className="p-2 bg-white/70 dark:bg-stone-800/70 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
                      <span className="text-[10px] text-stone-400 block font-mono">Mastered</span>
                      <span className="font-black text-stone-900 dark:text-white">0 Words</span>
                    </div>
                  </div>
                </div>

                {/* Email / Password Account Setup Form */}
                <form onSubmit={handleDirectSignUp} className="space-y-3">
                  {authError && (
                    <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium space-y-1.5">
                      <p>{authError}</p>
                      {authError.includes('already exists') && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            openAuthModal('signin');
                          }}
                          className="font-black text-amber-600 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          Click here to Sign In with this email →
                        </button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-amber-500" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-500" />
                        <span>Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="•••••••• (min 6 chars)"
                          required
                          autoComplete="new-password"
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer p-0.5"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSigningIn}
                    className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <span>Initializing Fresh Student Profile...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Create Account & Launch Dashboard (0 XP)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openAuthModal('signin');
                      }}
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Already have an account? Sign In
                    </button>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <button
                      type="button"
                      onClick={handleGuestComplete}
                      className="font-medium text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 underline cursor-pointer"
                    >
                      ⚡ Explore with 1-Click Guest Mode
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between shrink-0">
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

          {step < totalSteps && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-stone-950 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{step === 4 ? 'Review & Launch' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
