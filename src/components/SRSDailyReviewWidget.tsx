import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Zap,
  Volume2,
  RotateCw,
  CheckCircle2,
  Sparkles,
  Clock,
  Flame,
  ArrowRight,
  BookOpen,
  Star,
  Check,
  Award,
  Layers,
  HelpCircle,
  TrendingUp,
  X,
  Shuffle
} from 'lucide-react';
import { UserProgress, VocabularyItem, SRSGrade, SRSItem } from '../types';
import { ALL_VOCABULARY } from '../data';
import { speakSpanish, soundEffects } from '../utils/audio';
import {
  calculateNextSRS,
  getIntervalPreview,
  categorizeSRSWords,
  getSRSStats,
  getDailyReviewPrompt,
  calculateMemoryRetention,
  getTodayDateString
} from '../utils/srs';

interface SRSDailyReviewWidgetProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenVocabularyLibrary?: () => void;
}

export const SRSDailyReviewWidget: React.FC<SRSDailyReviewWidgetProps> = ({
  userProgress,
  setUserProgress,
  onOpenVocabularyLibrary
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    reviewedCount: 0,
    againCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0,
    xpGained: 0
  });

  const isArabic = userProgress.settings?.nativeLanguage === 'ar';

  // Overall SRS Stats
  const stats = useMemo(() => {
    return getSRSStats(ALL_VOCABULARY, userProgress.srsData || {});
  }, [userProgress.srsData]);

  // Categorized SRS words
  const srsCategorized = useMemo(() => {
    return categorizeSRSWords(ALL_VOCABULARY, userProgress.srsData || {}, userProgress.savedWordIds || []);
  }, [userProgress.srsData, userProgress.savedWordIds]);

  // Daily SRS review prompt
  const dailyPrompt = useMemo(() => {
    return getDailyReviewPrompt(userProgress.srsData || {}, ALL_VOCABULARY);
  }, [userProgress.srsData]);

  // Queue of words due for review today
  const reviewQueue = useMemo(() => {
    let queue = [...srsCategorized.dueWords];
    if (queue.length === 0 && userProgress.savedWordIds.length > 0) {
      // If no strictly due words, pick up saved words
      queue = ALL_VOCABULARY.filter(w => userProgress.savedWordIds.includes(w.id));
    }
    return queue;
  }, [srsCategorized.dueWords, userProgress.savedWordIds]);

  const currentWord: VocabularyItem | undefined = reviewQueue[currentIndex];
  const currentSRSItem: SRSItem | undefined = currentWord ? userProgress.srsData?.[currentWord.id] : undefined;
  const currentRetention = currentSRSItem ? calculateMemoryRetention(currentSRSItem) : 100;

  // Reset review index when queue changes or when starting fresh
  useEffect(() => {
    if (currentIndex >= reviewQueue.length && reviewQueue.length > 0) {
      setCurrentIndex(0);
      setSessionCompleted(false);
    }
  }, [reviewQueue.length]);

  // Auto-play Spanish pronunciation on card reveal or change
  const handlePlayAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentWord) {
      speakSpanish(currentWord.spanish || currentWord.word || '');
    }
  };

  // Handle grade submission (SM-2 SRS algorithm step)
  const handleGradeCard = (grade: SRSGrade, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentWord) return;

    const updatedSRS = calculateNextSRS(currentSRSItem, currentWord.id, grade);
    const xpReward = grade >= 3 ? 10 : 3;

    if (grade >= 3) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    // Update User Progress state
    setUserProgress(prev => {
      const newSRSData = {
        ...(prev.srsData || {}),
        [currentWord.id]: updatedSRS
      };

      // Auto-master if interval reaches 21+ days
      let newMastered = [...prev.masteredWordIds];
      if (updatedSRS.interval >= 21 && !newMastered.includes(currentWord.id)) {
        newMastered.push(currentWord.id);
      }

      return {
        ...prev,
        srsData: newSRSData,
        masteredWordIds: newMastered,
        xp: prev.xp + xpReward
      };
    });

    // Track session metrics
    setSessionStats(prev => ({
      ...prev,
      reviewedCount: prev.reviewedCount + 1,
      againCount: prev.againCount + (grade === 1 ? 1 : 0),
      hardCount: prev.hardCount + (grade === 2 ? 1 : 0),
      goodCount: prev.goodCount + (grade === 3 ? 1 : 0),
      easyCount: prev.easyCount + (grade === 4 ? 1 : 0),
      xpGained: prev.xpGained + xpReward
    }));

    // Advance to next card or complete session
    setIsFlipped(false);
    if (currentIndex + 1 < reviewQueue.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
      soundEffects.playLevelUp();
    }
  };

  // Quick enroll new CEFR words into SRS
  const handleEnrollLevelWords = () => {
    soundEffects.playPop();
    const currentLevel = userProgress.currentLevel || 'A1';
    const unreviewedLevelWords = ALL_VOCABULARY.filter(
      w => w.cefr === currentLevel && !userProgress.srsData?.[w.id]
    ).slice(0, 10);

    if (unreviewedLevelWords.length === 0) return;

    const today = getTodayDateString();
    setUserProgress(prev => {
      const updatedSRS = { ...(prev.srsData || {}) };
      unreviewedLevelWords.forEach(w => {
        updatedSRS[w.id] = {
          wordId: w.id,
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReviewDate: today, // set due today
          streak: 0,
          successCount: 0,
          failCount: 0,
          history: []
        };
      });
      return {
        ...prev,
        srsData: updatedSRS
      };
    });
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Widget Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 rounded-2xl shadow-md shrink-0">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400">
                Spaced Repetition (SuperMemo SM-2)
              </span>
              <span className="text-[10px] font-bold text-stone-400 font-mono">
                Memory: {stats.retentionRate}%
              </span>
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white font-header flex items-center gap-2 mt-0.5">
              <span>{isArabic ? 'مراجعة الملاحظات المفردات اليومية' : 'Daily SRS Vocabulary Deck'}</span>
            </h3>
          </div>
        </div>

        {/* Header Action Button */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {onOpenVocabularyLibrary && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenVocabularyLibrary();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer font-arabic"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>{isArabic ? 'المكتبة الشاملة' : 'Full Library'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Review Body */}
      {sessionCompleted ? (
        /* Session Summary Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-4 bg-gradient-to-br from-amber-500/10 via-stone-50 dark:via-stone-800/40 to-stone-100 dark:to-stone-900 rounded-2xl border border-amber-500/20 space-y-4"
        >
          <div className="w-14 h-14 mx-auto bg-amber-500 text-stone-950 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-stone-900 dark:text-white font-header">
              {isArabic ? 'اكتملت مراجعة اليوم بنجاح! 🎉' : 'Daily Review Complete! 🎉'}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto font-arabic">
              {isArabic
                ? `لقد راجعت ${sessionStats.reviewedCount} كلمة وحصلت على +${sessionStats.xpGained} XP. تم تحديث ثبات الذاكرة وفقاً لمنحنى النسيان.`
                : `You reviewed ${sessionStats.reviewedCount} words today and earned +${sessionStats.xpGained} XP. Your Ebbinghaus memory stability has been updated.`}
            </p>
          </div>

          {/* Session Breakdown Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              🟢 Good/Easy: {sessionStats.goodCount + sessionStats.easyCount}
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              🟧 Hard: {sessionStats.hardCount}
            </span>
            <span className="px-3 py-1 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              🔴 Again: {sessionStats.againCount}
            </span>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setSessionCompleted(false);
                setCurrentIndex(0);
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isArabic ? 'إعادة المراجعة' : 'Review Again'}</span>
            </button>
            {onOpenVocabularyLibrary && (
              <button
                onClick={onOpenVocabularyLibrary}
                className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-black hover:bg-amber-400 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>{isArabic ? 'تصفح المزيد من الكلمات' : 'Explore Vocabulary Vault'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      ) : reviewQueue.length > 0 && currentWord ? (
        /* Active Card Review Deck */
        <div className="space-y-4">
          {/* Card Header Info & Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
                Card {currentIndex + 1} / {reviewQueue.length}
              </span>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                Retention: {currentRetention}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-extrabold text-[10px]">
                {currentWord.cefr}
              </span>
              <span className="text-[10px] text-stone-400 capitalize">
                {currentWord.category}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / reviewQueue.length) * 100}%` }}
            />
          </div>

          {/* Interactive Flip Flashcard */}
          <div
            onClick={() => {
              setIsFlipped(prev => !prev);
              soundEffects.playFlip();
            }}
            className="relative min-h-[220px] sm:min-h-[240px] bg-gradient-to-b from-stone-50 to-stone-100/80 dark:from-stone-850 dark:to-stone-900 border-2 border-stone-200/80 dark:border-stone-750 hover:border-amber-500/50 dark:hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all shadow-xs group select-none"
          >
            {/* Audio Button */}
            <button
              onClick={handlePlayAudio}
              className="absolute top-4 right-4 p-2.5 bg-amber-500/15 hover:bg-amber-500 text-amber-700 dark:text-amber-400 hover:text-stone-950 rounded-xl transition cursor-pointer z-10 shadow-xs"
              title="Pronounce Spanish"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Front of Card (Spanish Target Word) */}
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="my-auto space-y-3 text-center"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-bold">
                    <span>{currentWord.gender || currentWord.partOfSpeech || 'palabra'}</span>
                    {currentWord.phonetic && <span className="font-mono text-amber-600 dark:text-amber-400">/{currentWord.phonetic}/</span>}
                  </div>

                  <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 dark:text-white font-header tracking-tight">
                    {currentWord.spanish || currentWord.word}
                  </h2>

                  <p className="text-xs text-stone-400 font-mono italic">
                    Tap anywhere or spacebar to reveal answer & translations
                  </p>
                </motion.div>
              ) : (
                /* Back of Card (Translations & Context) */
                <motion.div
                  key="back"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="my-auto space-y-3 text-center"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-header">
                      {currentWord.spanish || currentWord.word}
                    </h2>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-lg font-black text-stone-900 dark:text-white">
                      {currentWord.english || currentWord.translation_en}
                    </p>
                    {currentWord.arabic && (
                      <p className="text-base font-black text-emerald-600 dark:text-emerald-400 font-arabic">
                        {currentWord.arabic}
                      </p>
                    )}
                  </div>

                  {/* Context Example Sentence */}
                  {(currentWord.examples?.[0] || currentWord.exampleSentences?.[0]) && (
                    <div className="p-3 bg-stone-100 dark:bg-stone-800/60 rounded-xl text-left text-xs space-y-1 border border-stone-200/60 dark:border-stone-700/60">
                      <p className="font-bold text-stone-800 dark:text-stone-200 italic">
                        "{currentWord.examples?.[0]?.es || currentWord.exampleSentences?.[0]?.es}"
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {currentWord.examples?.[0]?.en || currentWord.exampleSentences?.[0]?.en}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SuperMemo 4-Rating Grade Buttons */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 dark:text-stone-400">
              <span>{isArabic ? 'كيف كانت صعوبة التذكر؟' : 'How well did you recall this term?'}</span>
              <span>SM-2 Grade</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* 1. AGAIN */}
              <button
                onClick={(e) => handleGradeCard(1, e)}
                className="py-2.5 px-2 bg-rose-500/10 hover:bg-rose-500 text-rose-700 dark:text-rose-400 hover:text-white rounded-xl font-black transition cursor-pointer flex flex-col items-center justify-center border border-rose-500/20 shadow-2xs group"
              >
                <span className="text-xs">🔴 Again</span>
                <span className="text-[9px] opacity-80 group-hover:text-white font-mono mt-0.5">
                  {getIntervalPreview(currentSRSItem, 1)}
                </span>
              </button>

              {/* 2. HARD */}
              <button
                onClick={(e) => handleGradeCard(2, e)}
                className="py-2.5 px-2 bg-amber-500/10 hover:bg-amber-500 text-amber-700 dark:text-amber-400 hover:text-stone-950 rounded-xl font-black transition cursor-pointer flex flex-col items-center justify-center border border-amber-500/20 shadow-2xs group"
              >
                <span className="text-xs">🟧 Hard</span>
                <span className="text-[9px] opacity-80 group-hover:text-stone-950 font-mono mt-0.5">
                  {getIntervalPreview(currentSRSItem, 2)}
                </span>
              </button>

              {/* 3. GOOD */}
              <button
                onClick={(e) => handleGradeCard(3, e)}
                className="py-2.5 px-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-400 hover:text-white rounded-xl font-black transition cursor-pointer flex flex-col items-center justify-center border border-emerald-500/20 shadow-2xs group"
              >
                <span className="text-xs">🟩 Good</span>
                <span className="text-[9px] opacity-80 group-hover:text-white font-mono mt-0.5">
                  {getIntervalPreview(currentSRSItem, 3)}
                </span>
              </button>

              {/* 4. EASY */}
              <button
                onClick={(e) => handleGradeCard(4, e)}
                className="py-2.5 px-2 bg-sky-500/10 hover:bg-sky-500 text-sky-700 dark:text-sky-400 hover:text-white rounded-xl font-black transition cursor-pointer flex flex-col items-center justify-center border border-sky-500/20 shadow-2xs group"
              >
                <span className="text-xs">🟦 Easy</span>
                <span className="text-[9px] opacity-80 group-hover:text-white font-mono mt-0.5">
                  {getIntervalPreview(currentSRSItem, 4)}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Catch-Up SRS State */
        <div className="text-center py-6 px-4 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
          <div className="w-12 h-12 mx-auto bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-black text-stone-900 dark:text-white font-header">
              {isArabic ? 'لا توجد كلمات مستحقة للمراجعة الآن' : 'No Vocabulary Cards Due Right Now'}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto font-arabic">
              {isArabic
                ? `نسبة الاستبقاء النشط في ذاكرتك ممتازة (${stats.retentionRate}%). يمكنك إضافة مفردات مستوى ${userProgress.currentLevel} الجديدة إلى جدول المراجعة.`
                : `Your active Spanish memory retention is currently at ${stats.retentionRate}%. You can enroll new ${userProgress.currentLevel} vocabulary into your SRS pipeline.`}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <button
              onClick={handleEnrollLevelWords}
              className="px-3.5 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-black hover:bg-amber-400 transition cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>
                {isArabic
                  ? `إضافة مفردات جديدة (${userProgress.currentLevel})`
                  : `Enroll ${userProgress.currentLevel} Words into SRS`}
              </span>
            </button>
            {onOpenVocabularyLibrary && (
              <button
                onClick={onOpenVocabularyLibrary}
                className="px-3.5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-300 dark:hover:bg-stone-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>{isArabic ? 'فتح المكتبة الشاملة' : 'Browse Vault'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
