import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Flame,
  CheckCircle2,
  Zap,
  BarChart2,
  Trophy,
  Compass,
  ArrowRight,
  Layers,
  Heart,
  Plus
} from 'lucide-react';
import { UserProgress, ImportedContent, CEFRLevel } from '../types';
import { RecommendedReadingModule } from './RecommendedReadingModule';
import { ReadingProgressTracker } from './ReadingProgressTracker';
import { StreakCounterWidget } from './StreakCounterWidget';
import { GlobalLeague } from './GlobalLeague';
import { soundEffects } from '../utils/audio';

interface ReadingDashboardProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenStory: (content: ImportedContent) => void;
  onOpenPlacementTest?: () => void;
  onSwitchToPath?: () => void;
}

export const ReadingDashboard: React.FC<ReadingDashboardProps> = ({
  userProgress,
  setUserProgress,
  onOpenStory,
  onOpenPlacementTest,
  onSwitchToPath
}) => {
  const currentLevel = userProgress.currentLevel || 'A1';
  const totalWordsRead = userProgress.totalWordsRead || 0;
  const totalReadingTimeSec = userProgress.totalReadingTimeSec || 0;
  const knownWordsCount = (userProgress.knownWords || []).length + (userProgress.masteredWordIds || []).length;
  const lingqsCount = Object.keys(userProgress.lingqs || {}).length;

  // Lexicon level goals (Krashen vocabulary target by CEFR)
  const levelTargets: Record<CEFRLevel, number> = {
    A1: 500,
    A2: 1200,
    B1: 2500,
    B2: 4000
  };

  const targetVocab = levelTargets[currentLevel] || 1000;
  const vocabGrowthPct = Math.min(100, Math.round((knownWordsCount / targetVocab) * 100));

  // Format reading time (hours & minutes)
  const formatReadingTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} min`;
  };

  const readingSpeedWPM = totalReadingTimeSec > 30
    ? Math.round((totalWordsRead / (totalReadingTimeSec / 60)))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8 pb-20 md:pb-12"
    >
      {/* Mobile-Optimized Minimalist Header (Prunes all redundancy & anims) */}
      <div className="sm:hidden flex items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800/60">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-black text-amber-600 dark:text-amber-500">
            Immersion Center
          </span>
          <h2 className="text-lg font-black text-stone-900 dark:text-white">
            Reading & Progress
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {onSwitchToPath && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onSwitchToPath();
              }}
              className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 shadow-xs"
              title="Linear Path"
            >
              <Layers className="w-4 h-4 text-amber-500" />
            </button>
          )}
          {onOpenPlacementTest && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenPlacementTest();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-black flex items-center gap-1 shadow-sm"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{currentLevel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Top Banner - Rendered on Tablet and Desktop Only */}
      <div className="hidden sm:flex relative overflow-hidden bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800/80 rounded-3xl p-8 text-white shadow-2xl flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 sm:shadow-md">
              Primary Immersion Engine
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900 text-amber-300 border border-stone-700">
              Krashen Input Method
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1.5 font-arabic">
            <Compass className="w-6 h-6 text-amber-500" />
            <span>Reading & Input Dashboard</span>
          </h1>

          <p className="text-xs text-stone-300 leading-relaxed font-arabic">
            Acquire Spanish implicitly through rich comprehensible input. Track word count volume, reading statistics, and visual vocabulary growth.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto shrink-0 relative z-10">
          {onSwitchToPath && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onSwitchToPath();
              }}
              className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer font-arabic shadow-xs shrink-0"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Linear Path</span>
            </button>
          )}

          {onOpenPlacementTest && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenPlacementTest();
              }}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer font-arabic shadow-md shadow-amber-500/10 shrink-0"
            >
              <Award className="w-3.5 h-3.5 text-stone-950" />
              <span>CEFR Assessment ({currentLevel})</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Duolingo-Style Streak Counter Widget */}
      <StreakCounterWidget
        userProgress={userProgress}
        onOpenLesson={() => {
          if (onSwitchToPath) onSwitchToPath();
        }}
      />

      {/* Visual Progress Bar of Vocabulary Growth & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vocabulary Growth Visual Progress Bar (Large Card) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-stone-900 dark:text-white font-arabic">
                  Vocabulary Growth ({currentLevel} Target)
                </h3>
              </div>
              <span className="px-3 py-1 bg-amber-500 text-stone-950 rounded-xl text-xs font-black">
                {knownWordsCount} / {targetVocab} Words
              </span>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic">
              Zero-lookup word recognition required for effortless CEFR {currentLevel} fluency.
            </p>

            {/* Visual Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-extrabold text-stone-600 dark:text-stone-300">
                <span>Progress: {vocabGrowthPct}%</span>
                <span>Goal: {targetVocab} Words</span>
              </div>

              <div className="w-full bg-stone-100 dark:bg-stone-800 h-4 rounded-2xl p-0.5 overflow-hidden border border-stone-200 dark:border-stone-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vocabGrowthPct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full rounded-xl shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Lexicon Sub-stats breakdown */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-center">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Known Words</span>
              <div className="text-xl font-black text-sky-400">{knownWordsCount}</div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Active LingQs</span>
              <div className="text-xl font-black text-amber-400">{lingqsCount}</div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Cloze Mined</span>
              <div className="text-xl font-black text-emerald-400">{(userProgress.minedSentences || []).length}</div>
            </div>
          </div>
        </motion.div>

        {/* Word Count & Reading Time Metrics */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1"
          >
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Total Word Count Read</span>
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-500">
              {totalWordsRead.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-400 font-mono">
              Cumulative comprehensible input volume
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1"
          >
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Reading Time Statistics</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-emerald-500">
              {formatReadingTime(totalReadingTimeSec)}
            </div>
            <p className="text-[11px] text-stone-400 font-mono">
              {readingSpeedWPM > 0 ? `Avg Speed: ${readingSpeedWPM} WPM` : 'Active read-along session duration'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Recommended Reading Module */}
      <RecommendedReadingModule
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onOpenStory={onOpenStory}
      />

      {/* Global Community Competition & Reading Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <GlobalLeague userProgress={userProgress} />
        </div>
        <div className="lg:col-span-5">
          <ReadingProgressTracker userProgress={userProgress} />
        </div>
      </div>
    </motion.div>
  );
};

