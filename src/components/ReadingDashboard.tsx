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
import { SRSDailyReviewWidget } from './SRSDailyReviewWidget';
import { GlobalLeague } from './GlobalLeague';
import { soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';

interface ReadingDashboardProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenStory: (content: ImportedContent) => void;
  onOpenPlacementTest?: () => void;
  onSwitchToPath?: () => void;
  onOpenVocabulary?: () => void;
}

export const ReadingDashboard: React.FC<ReadingDashboardProps> = ({
  userProgress,
  setUserProgress,
  onOpenStory,
  onOpenPlacementTest,
  onSwitchToPath,
  onOpenVocabulary
}) => {
  const [mobileTab, setMobileTab] = React.useState<'reading' | 'stats'>('reading');
  const { setActiveTab } = useApp();

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

  // Staggered bento entries config with fluid cubic-bezier ease-out as requested
  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const bentoItemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Modern cubic-bezier ease-out [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      variants={bentoContainerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 sm:space-y-10 pb-24 md:pb-16 max-w-7xl mx-auto px-1 sm:px-0"
    >
      {/* Mobile-Optimized Minimalist Header (Prunes all redundancy & anims) */}
      <motion.div variants={bentoItemVariants} className="sm:hidden flex items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800/60">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-black text-amber-600 dark:text-amber-500">
            Immersion Center
          </span>
          <h2 className="text-lg font-black text-stone-900 dark:text-white">
            Reading & Progress
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {onSwitchToPath && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onSwitchToPath();
              }}
              className="p-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 shadow-xs"
              title="Linear Path"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
            </button>
          )}
          {onOpenPlacementTest && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenPlacementTest();
              }}
              className="px-2 py-1 rounded-xl bg-amber-500 text-stone-950 text-[10px] font-black flex items-center gap-0.5 shadow-sm"
            >
              <Award className="w-3 h-3" />
              <span>{currentLevel}</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Modern Compact Segment Tab Control for Mobile Devices only */}
      <motion.div variants={bentoItemVariants} className="sm:hidden flex p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800">
        <button
          onClick={() => {
            soundEffects.playPop();
            setMobileTab('reading');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
            mobileTab === 'reading'
              ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
              : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-400'
          }`}
        >
          📚 Active Path
        </button>
        <button
          onClick={() => {
            soundEffects.playPop();
            setMobileTab('stats');
          }}
          className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
            mobileTab === 'stats'
              ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
              : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-400'
          }`}
        >
          📊 Stats & Analytics
        </button>
      </motion.div>

      {/* Desktop Top Banner - Rendered on Tablet and Desktop Only */}
      <motion.div variants={bentoItemVariants} className="hidden sm:flex relative overflow-hidden bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800/80 rounded-3xl p-8 text-white shadow-2xl flex-col md:flex-row md:items-center justify-between gap-4">
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

          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1.5 font-header">
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
      </motion.div>

      {/* Content Area Rendering (Responsive Tab Splits) */}
      <div className="space-y-6 sm:space-y-10">
        
        {/* --- TAB 1: ACTIVE READING & PATHWAYS --- */}
        <div className={`${mobileTab === 'reading' ? 'block' : 'hidden'} sm:block space-y-6 sm:space-y-10`}>
          {/* Absolute Zero (A0) Beginner Foundation Banner */}
          <motion.div
            variants={bentoItemVariants}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 dark:border-amber-500/20 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold text-[11px]">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Zero Prior Spanish Required</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                Absolute Zero (A0) Beginner Foundation
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                25 micro-scaffolded units that eliminate cognitive friction, grammar jargon, and sudden jumps. Start from line 1 with micro-sound anchors, chunk ladders, and survival sentences.
              </p>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveTab('a0_foundation');
              }}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition shrink-0"
            >
              <span>Explore 25 A0 Units</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Daily Spaced Repetition (SRS) Review Cards Deck */}
          <motion.div variants={bentoItemVariants}>
            <SRSDailyReviewWidget
              userProgress={userProgress}
              setUserProgress={setUserProgress}
              onOpenVocabularyLibrary={onOpenVocabulary}
            />
          </motion.div>

          {/* Visual Duolingo-Style Streak Counter Widget */}
          <motion.div variants={bentoItemVariants}>
            <StreakCounterWidget
              userProgress={userProgress}
              onOpenLesson={() => {
                if (onSwitchToPath) onSwitchToPath();
              }}
            />
          </motion.div>

          {/* Recommended Reading Module */}
          <motion.div variants={bentoItemVariants}>
            <RecommendedReadingModule
              userProgress={userProgress}
              setUserProgress={setUserProgress}
              onOpenStory={onOpenStory}
            />
          </motion.div>
        </div>

        {/* --- TAB 2: ANALYTICS & LEAGUE PROGRESS --- */}
        <div className={`${mobileTab === 'stats' ? 'block' : 'hidden'} sm:block space-y-6 sm:space-y-10`}>
          {/* Visual Progress Bar of Vocabulary Growth & Key Metrics */}
          <motion.div variants={bentoItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Vocabulary Growth Visual Progress Bar (Large Card) */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-8 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                    <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white font-header">
                      Vocabulary Growth ({currentLevel} Target)
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-500 text-stone-950 rounded-lg text-xs font-black">
                    {knownWordsCount} / {targetVocab} Words
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-arabic">
                  Zero-lookup word recognition required for effortless CEFR {currentLevel} fluency.
                </p>

                {/* Visual Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] sm:text-xs font-extrabold text-stone-600 dark:text-stone-300">
                    <span>Progress: {vocabGrowthPct}%</span>
                    <span>Goal: {targetVocab} Words</span>
                  </div>

                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-3 sm:h-4 rounded-2xl p-0.5 overflow-hidden border border-stone-200 dark:border-stone-700">
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
              <div className="grid grid-cols-3 gap-2.5 pt-3 sm:pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
                <div className="p-2 sm:p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-stone-400 block truncate">Known Words</span>
                  <div className="text-base sm:text-xl font-black text-sky-400 mt-0.5 sm:mt-1">{knownWordsCount}</div>
                </div>

                <div className="p-2 sm:p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-stone-400 block truncate">Active LingQs</span>
                  <div className="text-base sm:text-xl font-black text-amber-400 mt-0.5 sm:mt-1">{lingqsCount}</div>
                </div>

                <div className="p-2 sm:p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl sm:rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-stone-400 block truncate">Cloze Mined</span>
                  <div className="text-base sm:text-xl font-black text-emerald-400 mt-0.5 sm:mt-1">{(userProgress.minedSentences || []).length}</div>
                </div>
              </div>
            </div>

            {/* Word Count & Reading Time Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-400 gap-1">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider block truncate">Words Read</span>
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                </div>
                <div className="text-2xl sm:text-3.5xl font-black text-amber-500 my-1.5 sm:my-3">
                  {totalWordsRead.toLocaleString()}
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400 font-mono">
                  Cumulative input volume
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-stone-400 gap-1">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider block truncate">Reading Time</span>
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                </div>
                <div className="text-2xl sm:text-3.5xl font-black text-emerald-500 my-1.5 sm:my-3">
                  {formatReadingTime(totalReadingTimeSec)}
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400 font-mono block truncate">
                  {readingSpeedWPM > 0 ? `Speed: ${readingSpeedWPM} WPM` : 'Active read-along duration'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Global Community Competition & Reading Analytics */}
          <motion.div variants={bentoItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-2">
            <div className="lg:col-span-7">
              <GlobalLeague userProgress={userProgress} />
            </div>
            <div className="lg:col-span-5">
              <ReadingProgressTracker userProgress={userProgress} />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

