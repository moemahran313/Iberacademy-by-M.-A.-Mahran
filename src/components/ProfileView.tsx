import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User as UserIcon,
  Flame,
  Zap,
  Award,
  BookOpen,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
  Volume2,
  LogOut,
  Sparkles,
  TrendingUp,
  Bookmark,
  Shield,
  CloudCheck,
  Edit3,
  Save,
  RotateCcw,
  Target,
  Clock,
  Heart
} from 'lucide-react';
import { UserProgress, CEFRLevel, ExplanationLanguage } from '../types';
import { User } from 'firebase/auth';
import { soundEffects } from '../utils/audio';

interface ProfileViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  authUser: User | null;
  onGoogleSignIn: () => void;
  onLogout: () => void;
  onOpenPlacementTest: () => void;
  isAuthLoading?: boolean;
}

const INTEREST_TOPICS = [
  'Daily Life & Dialogues',
  'Culture & History',
  'News & World Affairs',
  'Travel & Food',
  'Business & Tech',
  'Literature & Poetry',
  'Grammar & Syntax'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProgress,
  setUserProgress,
  authUser,
  onGoogleSignIn,
  onLogout,
  onOpenPlacementTest,
  isAuthLoading = false
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState(
    authUser?.displayName || userProgress.userInterests?.[0] || 'Spanish Learner'
  );
  const [customBio, setCustomBio] = useState(
    'Passionate about mastering Spanish naturally through comprehensible input and daily immersion.'
  );
  const [saveToast, setSaveToast] = useState(false);

  const knownWordsCount = (userProgress.knownWords?.length || 0) + (userProgress.masteredWordIds?.length || 0);
  const activeLingQsCount = Object.keys(userProgress.lingqs || {}).length;
  const minedCount = userProgress.minedSentences?.length || 0;
  const totalWordsRead = userProgress.totalWordsRead || 0;
  const dailyGoal = userProgress.settings.dailyWordsGoal || 250;
  const todayKey = new Date().toISOString().split('T')[0];
  const todayWordsRead = userProgress.dailyWordsRead?.[todayKey] || 0;

  const handleSaveSettings = (updates: Partial<UserProgress['settings']>) => {
    soundEffects.playPop();
    setUserProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updates
      }
    }));
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const toggleInterest = (topic: string) => {
    soundEffects.playPop();
    setUserProgress(prev => {
      const current = prev.userInterests || [];
      const updated = current.includes(topic)
        ? current.filter(t => t !== topic)
        : [...current, topic];
      return { ...prev, userInterests: updated };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile & Settings saved to Cloud!</span>
        </motion.div>
      )}

      {/* Account Card & Hero Header */}
      <div className="relative overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* User Photo & Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              {authUser?.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt={authUser.displayName || 'Profile Avatar'}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-500/40 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center font-black text-3xl shadow-md">
                  {authUser?.displayName?.[0] || 'U'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-stone-900" title="Firebase Cloud Connected">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {authUser?.displayName || customName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 font-mono">
                  {userProgress.currentLevel} Learner
                </span>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                {authUser?.email || 'Guest Local Account'}
              </p>

              {authUser ? (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Google Account Linked & Synced</span>
                </div>
              ) : (
                <button
                  onClick={onGoogleSignIn}
                  disabled={isAuthLoading}
                  className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 px-3 py-1 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Connect Google Account</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {authUser && (
              <button
                onClick={onLogout}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onOpenPlacementTest}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Award className="w-4 h-4 text-stone-950" />
              <span>CEFR Exam ({userProgress.currentLevel})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Duolingo-Style Stats & Progress Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-orange-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Streak</span>
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{userProgress.streakDays}</span>
            <span className="text-xs text-stone-500 font-bold">days</span>
          </div>
          <p className="text-[10px] text-stone-400">Daily practice active</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Total XP</span>
            <Zap className="w-5 h-5 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{userProgress.xp}</span>
            <span className="text-xs text-stone-500 font-bold">XP</span>
          </div>
          <p className="text-[10px] text-stone-400">Immersion experience</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-sky-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Known Words</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{knownWordsCount}</span>
            <span className="text-xs text-stone-500 font-bold">words</span>
          </div>
          <p className="text-[10px] text-stone-400">Zero lookup fatigue</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Total Read</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{totalWordsRead.toLocaleString()}</span>
            <span className="text-xs text-stone-500 font-bold">words</span>
          </div>
          <p className="text-[10px] text-stone-400">Input volume tracked</p>
        </div>
      </div>

      {/* Customizable Account Settings */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
          <Target className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-black text-stone-900 dark:text-white">
            Customizable Preferences & Daily Goals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Daily Words Goal */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Daily Reading Volume Goal</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map(words => (
                <button
                  key={words}
                  onClick={() => handleSaveSettings({ dailyWordsGoal: words })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.dailyWordsGoal === words || (words === 250 && !userProgress.settings.dailyWordsGoal)
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {words} w/d
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Set your target daily input volume in Spanish words per day.
            </p>
          </div>

          {/* Explanation / Native Language */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>Native Explanation Language</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'ar', label: 'العربية' },
                { id: 'bilingual', label: 'EN + AR' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleSaveSettings({ nativeLanguage: lang.id as ExplanationLanguage })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.nativeLanguage === lang.id
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Select your preferred language for grammar rules and translations.
            </p>
          </div>

          {/* Theme Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Visual Interface Theme</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSaveSettings({ theme: 'light' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                  userProgress.settings.theme === 'light'
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>

              <button
                onClick={() => handleSaveSettings({ theme: 'dark' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                  userProgress.settings.theme === 'dark'
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-stone-900 text-stone-200 border-stone-800'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Audio Playback Speed */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Audio Immersion Speed</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.75, 1.0, 1.25].map(speed => (
                <button
                  key={speed}
                  onClick={() => handleSaveSettings({ audioSpeed: speed })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.audioSpeed === speed
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {speed}x {speed === 1.0 ? '(Normal)' : ''}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Adjust audio listening speed in reader & pronunciation tools.
            </p>
          </div>
        </div>

        {/* Learning Topic Interests */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Learning Topic Focus Areas</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TOPICS.map(topic => {
              const isSelected = userProgress.userInterests?.includes(topic);
              return (
                <button
                  key={topic}
                  onClick={() => toggleInterest(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-2xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {topic} {isSelected ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
