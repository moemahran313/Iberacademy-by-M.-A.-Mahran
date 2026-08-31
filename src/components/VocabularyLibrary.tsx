import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Volume2,
  Star,
  CheckCircle,
  RotateCw,
  Filter,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Brain,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle
} from 'lucide-react';
import { VocabularyItem, CEFRLevel, UserProgress, SRSGrade, SRSItem } from '../types';
import { ALL_VOCABULARY } from '../data';
import { speakSpanish, soundEffects } from '../utils/audio';
import {
  calculateNextSRS,
  getIntervalPreview,
  categorizeSRSWords,
  getSRSStats,
  getDailyReviewPrompt,
  getTodayDateString
} from '../utils/srs';

interface VocabularyLibraryProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const VocabularyLibrary: React.FC<VocabularyLibraryProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcards' | 'srs'>('grid');

  // Standard flashcard state
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Audio Challenge Mode states
  const [isAudioChallenge, setIsAudioChallenge] = useState(false);
  const [audioChallengeInput, setAudioChallengeInput] = useState('');
  const [audioChallengeFeedback, setAudioChallengeFeedback] = useState('');
  const [audioChallengeStatus, setAudioChallengeStatus] = useState<'idle' | 'correct' | 'incorrect' | 'accent-mismatch'>('idle');

  // Text normalization to compare typed response and Spanish word fairly
  const normalizeTextForComparison = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // strip accents
  };

  // Check pronunciation input spelling accuracy
  const handleCheckAudioChallenge = () => {
    if (!currentFlashcard || !audioChallengeInput) return;
    
    const typedClean = audioChallengeInput.trim().toLowerCase();
    const correctClean = currentFlashcard.spanish.trim().toLowerCase();
    
    if (typedClean === correctClean) {
      setAudioChallengeFeedback("Perfect spelling! 🎉 (+2 XP)");
      setAudioChallengeStatus('correct');
      soundEffects.playCorrect();
      setIsCardFlipped(true); // reveal translation card
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 2
      }));
    } else {
      const typedNormalized = normalizeTextForComparison(typedClean);
      const correctNormalized = normalizeTextForComparison(correctClean);
      
      if (typedNormalized === correctNormalized) {
        setAudioChallengeFeedback(`Almost! Correct letters, but check your accents: "${currentFlashcard.spanish}". (+1 XP)`);
        setAudioChallengeStatus('accent-mismatch');
        soundEffects.playCorrect();
        setIsCardFlipped(true); // reveal translation card
        setUserProgress(prev => ({
          ...prev,
          xp: prev.xp + 1
        }));
      } else {
        setAudioChallengeFeedback("Not quite! Listen carefully and try again, or click 'Skip' to see the translation.");
        setAudioChallengeStatus('incorrect');
        soundEffects.playIncorrect();
      }
    }
  };

  // SRS Review session state
  const [srsDeckLevel, setSrsDeckLevel] = useState<string>('all');
  const [srsQueue, setSrsQueue] = useState<VocabularyItem[]>([]);
  const [srsIndex, setSrsIndex] = useState(0);
  const [srsCardFlipped, setSrsCardFlipped] = useState(false);
  const [srsSessionActive, setSrsSessionActive] = useState(false);
  const [srsSessionCompleted, setSrsSessionCompleted] = useState(false);
  const [srsSessionStats, setSrsSessionStats] = useState({
    reviewedCount: 0,
    againCount: 0,
    hardCount: 0,
    goodCount: 0,
    easyCount: 0,
    xpGained: 0
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    ALL_VOCABULARY.forEach(w => set.add(w.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered vocabulary for Grid & Simple Flashcard
  const filteredWords = useMemo(() => {
    return ALL_VOCABULARY.filter(item => {
      const matchesSearch =
        searchTerm === '' ||
        (item.spanish || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.english || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.arabic || '').includes(searchTerm);

      const matchesLevel = selectedLevel === 'all' || item.cefr === selectedLevel;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchTerm, selectedLevel, selectedCategory]);

  // Overall SRS Stats
  const srsStats = useMemo(() => {
    return getSRSStats(ALL_VOCABULARY, userProgress.srsData || {});
  }, [userProgress.srsData]);

  // Daily SRS Review Prompt based on the Ebbinghaus forgetting curve
  const dailyPrompt = useMemo(() => {
    return getDailyReviewPrompt(userProgress.srsData || {}, ALL_VOCABULARY);
  }, [userProgress.srsData]);

  // Categorized SRS words
  const srsCategorized = useMemo(() => {
    return categorizeSRSWords(ALL_VOCABULARY, userProgress.srsData || {}, userProgress.savedWordIds || []);
  }, [userProgress.srsData, userProgress.savedWordIds]);

  const toggleSaveWord = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserProgress(prev => {
      const isSaved = prev.savedWordIds.includes(id);
      const today = getTodayDateString();
      const updatedSrs = { ...(prev.srsData || {}) };

      if (!isSaved && !updatedSrs[id]) {
        updatedSrs[id] = {
          wordId: id,
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReviewDate: today,
          streak: 0,
          successCount: 0,
          failCount: 0,
          history: []
        };
      }

      return {
        ...prev,
        savedWordIds: isSaved
          ? prev.savedWordIds.filter(wId => wId !== id)
          : [...prev.savedWordIds, id],
        srsData: updatedSrs
      };
    });
  };

  const toggleMasterWord = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEffects.playCorrect();
    setUserProgress(prev => {
      const isMastered = prev.masteredWordIds.includes(id);
      const newMastered = isMastered
        ? prev.masteredWordIds.filter(wId => wId !== id)
        : [...prev.masteredWordIds, id];

      const today = getTodayDateString();
      const updatedSrs = { ...(prev.srsData || {}) };

      if (!isMastered) {
        // Set mature SRS parameters for mastered word
        const nextDateObj = new Date();
        nextDateObj.setDate(nextDateObj.getDate() + 21);
        updatedSrs[id] = {
          wordId: id,
          interval: 21,
          repetitions: 4,
          easeFactor: 2.6,
          nextReviewDate: nextDateObj.toISOString().split('T')[0],
          lastReviewedDate: today,
          streak: 4,
          successCount: (updatedSrs[id]?.successCount || 0) + 1,
          failCount: updatedSrs[id]?.failCount || 0,
          history: [...(updatedSrs[id]?.history || []), { date: today, grade: 4 as SRSGrade }]
        };
      }

      return {
        ...prev,
        masteredWordIds: newMastered,
        srsData: updatedSrs,
        xp: prev.xp + (isMastered ? -5 : 10)
      };
    });
  };

  // Standard Flashcards Navigation
  const currentFlashcard = filteredWords[flashcardIdx] || filteredWords[0];

  const handleNextFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIdx(prev => (prev + 1) % (filteredWords.length || 1));
    soundEffects.playFlip();
    setAudioChallengeInput('');
    setAudioChallengeFeedback('');
    setAudioChallengeStatus('idle');
  };

  const handlePrevFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIdx(prev => (prev - 1 + filteredWords.length) % (filteredWords.length || 1));
    soundEffects.playFlip();
    setAudioChallengeInput('');
    setAudioChallengeFeedback('');
    setAudioChallengeStatus('idle');
  };

  // Auto-play word in Audio Challenge Mode when card or mode changes
  useEffect(() => {
    if (viewMode === 'flashcards' && isAudioChallenge && currentFlashcard) {
      const timer = setTimeout(() => {
        speakSpanish(currentFlashcard.spanish);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [flashcardIdx, isAudioChallenge, viewMode, currentFlashcard]);

  // ================= SRS REVIEW LOGIC =================

  // Start an SRS session
  const startSRSSession = (filterType: 'due' | 'level' | 'saved' | 'deck', levelVal = 'all') => {
    let queue: VocabularyItem[] = [];

    if (filterType === 'due') {
      queue = [...srsCategorized.dueWords];
      if (queue.length === 0) {
        // If nothing due, pull 10 unreviewed or learning words
        queue = ALL_VOCABULARY.slice(0, 15);
      }
    } else if (filterType === 'saved') {
      queue = ALL_VOCABULARY.filter(w => userProgress.savedWordIds.includes(w.id));
      if (queue.length === 0) queue = ALL_VOCABULARY.slice(0, 10);
    } else if (filterType === 'level') {
      queue = ALL_VOCABULARY.filter(w => levelVal === 'all' || w.cefr === levelVal).slice(0, 20);
    } else {
      queue = ALL_VOCABULARY.slice(0, 20);
    }

    // Shuffle queue slightly for variety
    queue = [...queue].sort(() => Math.random() - 0.5);

    setSrsQueue(queue);
    setSrsIndex(0);
    setSrsCardFlipped(false);
    setSrsSessionActive(true);
    setSrsSessionCompleted(false);
    setSrsSessionStats({
      reviewedCount: 0,
      againCount: 0,
      hardCount: 0,
      goodCount: 0,
      easyCount: 0,
      xpGained: 0
    });
    soundEffects.playFlip();
  };

  const currentSRSWord = srsQueue[srsIndex];
  const currentSRSItem = currentSRSWord ? userProgress.srsData?.[currentSRSWord.id] : undefined;

  // Handle User Response to SRS Card (Again = 1, Hard = 2, Good = 3, Easy = 4)
  const handleSRSGrade = (grade: SRSGrade) => {
    if (!currentSRSWord) return;

    const updatedSRS = calculateNextSRS(currentSRSItem, currentSRSWord.id, grade);
    const xpReward = grade >= 3 ? 15 : 5;

    if (grade >= 3) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    // Update User Progress state
    setUserProgress(prev => {
      const newSRSData = {
        ...(prev.srsData || {}),
        [currentSRSWord.id]: updatedSRS
      };

      // If interval >= 21 days, auto-add to mastered words
      let newMastered = [...prev.masteredWordIds];
      if (updatedSRS.interval >= 21 && !newMastered.includes(currentSRSWord.id)) {
        newMastered.push(currentSRSWord.id);
      }

      return {
        ...prev,
        srsData: newSRSData,
        masteredWordIds: newMastered,
        xp: prev.xp + xpReward
      };
    });

    // Update Session Stats
    setSrsSessionStats(prev => ({
      ...prev,
      reviewedCount: prev.reviewedCount + 1,
      againCount: prev.againCount + (grade === 1 ? 1 : 0),
      hardCount: prev.hardCount + (grade === 2 ? 1 : 0),
      goodCount: prev.goodCount + (grade === 3 ? 1 : 0),
      easyCount: prev.easyCount + (grade === 4 ? 1 : 0),
      xpGained: prev.xpGained + xpReward
    }));

    // If "Again", re-insert into end of current queue so learner reinforces it
    if (grade === 1) {
      setSrsQueue(prev => [...prev, currentSRSWord]);
    }

    // Move to next card or finish
    if (srsIndex + 1 < srsQueue.length) {
      setSrsCardFlipped(false);
      setSrsIndex(prev => prev + 1);
    } else {
      setSrsSessionCompleted(true);
      soundEffects.playLevelUp();
    }
  };

  // Keyboard navigation for SRS review
  useEffect(() => {
    if (viewMode !== 'srs' || !srsSessionActive || srsSessionCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setSrsCardFlipped(prev => !prev);
      } else if (srsCardFlipped) {
        if (e.key === '1') handleSRSGrade(1);
        if (e.key === '2') handleSRSGrade(2);
        if (e.key === '3') handleSRSGrade(3);
        if (e.key === '4') handleSRSGrade(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, srsSessionActive, srsSessionCompleted, srsCardFlipped, currentSRSWord, currentSRSItem]);

  const isCurrentMastered = currentFlashcard && userProgress.masteredWordIds.includes(currentFlashcard.id);
  const isCurrentSaved = currentFlashcard && userProgress.savedWordIds.includes(currentFlashcard.id);

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm text-stone-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                1000+ Core Spanish Frequency Lexicon
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Brain className="w-3 h-3 text-emerald-400" />
                SM-2 Spaced Repetition (SRS)
              </span>
              <span className="text-xs text-stone-400">
                {ALL_VOCABULARY.length} words loaded
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Spanish Vocabulary Mastery Vault
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl">
              Spaced repetition intervals schedule your reviews right when memory decay begins. Complete with native IPA phonetics, Arabic & English translations, and high-frequency example sentences.
            </p>
          </div>

          {/* Mastered Progress Bar & SRS Due Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[220px]">
            <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-3">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-400">Total Mastery</span>
                <span className="text-amber-400">
                  {userProgress.masteredWordIds.length} / {ALL_VOCABULARY.length} ({Math.round((userProgress.masteredWordIds.length / ALL_VOCABULARY.length) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (userProgress.masteredWordIds.length / ALL_VOCABULARY.length) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setViewMode('srs');
                startSRSSession('due');
              }}
              className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition shadow-xs group"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Due for SRS Review:</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-xs group-hover:scale-105 transition">
                {srsCategorized.dueWords.length > 0 ? srsCategorized.dueWords.length : 15}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Spaced Repetition (SRS) Prompt Banner */}
      <div className={`rounded-2xl p-4 sm:p-5 border shadow-sm transition-all duration-300 ${
        dailyPrompt.hasDue
          ? 'bg-gradient-to-r from-amber-50 via-amber-100/40 to-stone-50 dark:from-amber-950/40 dark:via-stone-900 dark:to-stone-900 border-amber-300 dark:border-amber-700/60'
          : 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              dailyPrompt.hasDue ? 'bg-amber-500 text-stone-950' : 'bg-emerald-500 text-white'
            }`}>
              <Brain className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-extrabold text-stone-900 dark:text-white">
                  {dailyPrompt.title}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {srsStats.retentionRate}% Memory Health
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                {dailyPrompt.message}
              </p>
              <p className="text-xs text-amber-900/80 dark:text-amber-300/80 font-arabic" dir="rtl">
                {dailyPrompt.message_ar}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                setViewMode('srs');
                startSRSSession('due');
              }}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>{dailyPrompt.hasDue ? 'Start Daily SRS Review' : 'Practice Memory Recall'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar (Search, Level Filter, View Mode) */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search in Spanish, English, or Arabic (e.g. tiempo, time, وقت)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Grid View
            </button>
            <button
              onClick={() => {
                setViewMode('flashcards');
                setFlashcardIdx(0);
                setIsCardFlipped(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                viewMode === 'flashcards'
                  ? 'bg-white dark:bg-stone-700 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              Flashcards
            </button>
            <button
              onClick={() => {
                setViewMode('srs');
                if (!srsSessionActive) startSRSSession('due');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                viewMode === 'srs'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>SRS Review</span>
              {srsCategorized.dueWords.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-900 text-amber-300 font-extrabold">
                  {srsCategorized.dueWords.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Level Filters & Category Chips (Shown in Grid & Flashcard modes) */}
        {viewMode !== 'srs' && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1">CEFR:</span>
              {['all', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                    selectedLevel === lvl
                      ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {lvl.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1">Topic:</span>
              {categories.slice(0, 8).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap capitalize transition ${
                    selectedCategory === cat
                      ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= VIEW 1: SRS REVIEW MODE ================= */}
      {viewMode === 'srs' && (
        <div className="space-y-6">
          {/* SRS Dashboard Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Due Today</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {srsStats.dueCount}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">Ready for retention check</p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>In Learning</span>
                <Brain className="w-4 h-4 text-sky-500" />
              </div>
              <p className="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1">
                {srsStats.learningCount}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">Interval &lt; 21 days</p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Mature & Mastered</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {srsStats.matureCount}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">Interval ≥ 21 days</p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Retention Rate</span>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
                {srsStats.retentionRate}%
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">{srsStats.totalReviews} total reviews</p>
            </div>
          </div>

          {/* SRS Active Session / Complete View */}
          {srsSessionCompleted ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 text-center shadow-lg space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                  SRS Review Session Complete!
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                  You reviewed {srsSessionStats.reviewedCount} cards and earned <span className="font-bold text-amber-500">+{srsSessionStats.xpGained} XP</span>!
                </p>
              </div>

              {/* Session breakdown */}
              <div className="grid grid-cols-4 gap-2 bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl text-xs font-semibold">
                <div>
                  <span className="text-rose-500 block text-lg font-black">{srsSessionStats.againCount}</span>
                  <span className="text-stone-400">Again</span>
                </div>
                <div>
                  <span className="text-amber-500 block text-lg font-black">{srsSessionStats.hardCount}</span>
                  <span className="text-stone-400">Hard</span>
                </div>
                <div>
                  <span className="text-emerald-500 block text-lg font-black">{srsSessionStats.goodCount}</span>
                  <span className="text-stone-400">Good</span>
                </div>
                <div>
                  <span className="text-sky-500 block text-lg font-black">{srsSessionStats.easyCount}</span>
                  <span className="text-stone-400">Easy</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => startSRSSession('due')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Review Another Batch
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-sm transition"
                >
                  Browse Lexicon
                </button>
              </div>
            </div>
          ) : srsSessionActive && currentSRSWord ? (
            <div className="max-w-xl mx-auto space-y-4">
              {/* Header Queue Info */}
              <div className="flex justify-between items-center text-xs font-semibold text-stone-500 dark:text-stone-400 px-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Card {srsIndex + 1} of {srsQueue.length}
                  </span>
                  {currentSRSItem?.interval ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      Interval: {currentSRSItem.interval}d (rep #{currentSRSItem.repetitions})
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">New Card</span>
                  )}
                </div>

                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                  Level {currentSRSWord.cefr}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((srsIndex) / (srsQueue.length || 1)) * 100}%` }}
                />
              </div>

              {/* Interactive SRS Card */}
              <div
                onClick={() => {
                  setSrsCardFlipped(prev => !prev);
                  soundEffects.playFlip();
                }}
                className="cursor-pointer bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-7 min-h-[310px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              >
                {/* Card Top Metadata */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    {currentSRSWord.category} • {currentSRSWord.partOfSpeech}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleSaveWord(currentSRSWord.id, e)}
                      className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition"
                      title="Bookmark word"
                    >
                      <Star className={`w-5 h-5 ${userProgress.savedWordIds.includes(currentSRSWord.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(currentSRSWord.spanish);
                      }}
                      className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="my-auto text-center py-6">
                  {!srsCardFlipped ? (
                    <div>
                      <h2 className="text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                        {currentSRSWord.gender ? <span className="text-2xl font-light text-stone-400 mr-2">{currentSRSWord.gender}</span> : null}
                        {currentSRSWord.spanish}
                      </h2>
                      {currentSRSWord.phonetic && (
                        <p className="text-sm font-mono text-stone-400 dark:text-stone-500 mt-2">
                          /{currentSRSWord.phonetic}/
                        </p>
                      )}
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-4">
                        Click card or press Space to reveal answer
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <div>
                        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500">ENGLISH</p>
                        <p className="text-2xl font-bold text-stone-900 dark:text-white">{currentSRSWord.english}</p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500">ARABIC (المعنى)</p>
                        <p className="text-2xl font-bold text-amber-800 dark:text-amber-300 font-arabic" dir="rtl">
                          {currentSRSWord.arabic}
                        </p>
                      </div>
                      {currentSRSWord.examples?.[0] && (
                        <div className="bg-stone-50 dark:bg-stone-800/80 rounded-lg p-3 text-left border border-stone-200 dark:border-stone-700/60 mt-3">
                          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                            🇪🇸 {currentSRSWord.examples[0].es}
                          </p>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                            🇬🇧 {currentSRSWord.examples[0].en}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer prompt */}
                <div className="text-center text-xs text-stone-400 dark:text-stone-500 font-medium">
                  {srsCardFlipped ? 'Choose your recall accuracy below' : 'Tap to show translation'}
                </div>
              </div>

              {/* 4 SRS Recall Grading Buttons (Visible when flipped) */}
              {srsCardFlipped ? (
                <div className="grid grid-cols-4 gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  {/* Again (1) */}
                  <button
                    onClick={() => handleSRSGrade(1)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 transition shadow-xs group"
                  >
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">1</span>
                      Again
                    </span>
                    <span className="text-[10px] text-rose-600/80 dark:text-rose-400 mt-0.5 font-medium">
                      {getIntervalPreview(currentSRSItem, 1)}
                    </span>
                  </button>

                  {/* Hard (2) */}
                  <button
                    onClick={() => handleSRSGrade(2)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 transition shadow-xs group"
                  >
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px]">2</span>
                      Hard
                    </span>
                    <span className="text-[10px] text-amber-700/80 dark:text-amber-400 mt-0.5 font-medium">
                      {getIntervalPreview(currentSRSItem, 2)}
                    </span>
                  </button>

                  {/* Good (3) */}
                  <button
                    onClick={() => handleSRSGrade(3)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 transition shadow-xs group"
                  >
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">3</span>
                      Good
                    </span>
                    <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400 mt-0.5 font-medium">
                      {getIntervalPreview(currentSRSItem, 3)}
                    </span>
                  </button>

                  {/* Easy (4) */}
                  <button
                    onClick={() => handleSRSGrade(4)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 transition shadow-xs group"
                  >
                    <span className="text-xs font-black uppercase flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">4</span>
                      Easy
                    </span>
                    <span className="text-[10px] text-sky-700/80 dark:text-sky-400 mt-0.5 font-medium">
                      {getIntervalPreview(currentSRSItem, 4)}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSrsCardFlipped(true);
                      soundEffects.playFlip();
                    }}
                    className="w-full py-3 rounded-xl bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-600 text-white dark:text-stone-950 font-bold text-sm shadow-md transition"
                  >
                    Show Answer (Space)
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Choose Deck to Review */
            <div className="max-w-xl mx-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-500" />
                Select SRS Review Deck
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => startSRSSession('due')}
                  className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/50 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase">Recommended</span>
                  <p className="font-extrabold text-stone-900 dark:text-white text-sm">Today's Due Words</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{srsCategorized.dueWords.length || 15} cards scheduled</p>
                </button>

                <button
                  onClick={() => startSRSSession('level', 'A1')}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-stone-50/50 dark:bg-stone-800/40 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">A1 Beginner</span>
                  <p className="font-extrabold text-stone-900 dark:text-white text-sm">A1 Core Vocabulary Deck</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">20 high-frequency words</p>
                </button>

                <button
                  onClick={() => startSRSSession('level', 'A2')}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-stone-50/50 dark:bg-stone-800/40 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">A2 Elementary</span>
                  <p className="font-extrabold text-stone-900 dark:text-white text-sm">A2 Travel & Daily Routine</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">20 elementary cards</p>
                </button>

                <button
                  onClick={() => startSRSSession('saved')}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 bg-stone-50/50 dark:bg-stone-800/40 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Custom</span>
                  <p className="font-extrabold text-stone-900 dark:text-white text-sm">Bookmarked Vocabulary</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{userProgress.savedWordIds.length} saved words</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW 2: STANDARD FLASHCARD MODE ================= */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-5">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6">
              <p className="text-stone-500 dark:text-stone-400 font-medium">No words match your current filters.</p>
            </div>
          ) : (
            <>
              {/* Audio Challenge Toggle Panel */}
              <div className="flex justify-between items-center bg-stone-100 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isAudioChallenge ? 'bg-amber-500 text-stone-950 scale-105' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}>
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wider">Audio Challenge Mode</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400">Listen, spell the Spanish word, and earn bonus XP.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAudioChallenge(!isAudioChallenge);
                    setIsCardFlipped(false);
                    setAudioChallengeInput('');
                    setAudioChallengeFeedback('');
                    setAudioChallengeStatus('idle');
                    soundEffects.playPop();
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAudioChallenge ? 'bg-amber-500' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                  aria-label="Toggle Audio Challenge Mode"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      isAudioChallenge ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold text-stone-500 dark:text-stone-400 px-1">
                <span>Card {flashcardIdx + 1} of {filteredWords.length}</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                  Level {currentFlashcard.cefr}
                </span>
              </div>

              {/* The Interactive Card */}
              <div
                onClick={() => {
                  if (isAudioChallenge && !isCardFlipped) {
                    speakSpanish(currentFlashcard.spanish);
                    return;
                  }
                  setIsCardFlipped(!isCardFlipped);
                  soundEffects.playFlip();
                }}
                className="cursor-pointer bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-2xl p-8 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              >
                {/* Header buttons */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    {currentFlashcard.category} • {currentFlashcard.partOfSpeech}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleSaveWord(currentFlashcard.id, e)}
                      className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition"
                      title="Save word"
                    >
                      <Star className={`w-5 h-5 ${isCurrentSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(currentFlashcard.spanish);
                      }}
                      className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="my-auto text-center py-6">
                  {!isCardFlipped ? (
                    // Front of Card
                    !isAudioChallenge ? (
                      // Standard mode front
                      <div>
                        <h2 className="text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                          {currentFlashcard.gender ? `${currentFlashcard.gender} ` : ''}{currentFlashcard.spanish}
                        </h2>
                        {currentFlashcard.phonetic && (
                          <p className="text-sm font-mono text-stone-400 dark:text-stone-500 mt-2">
                            /{currentFlashcard.phonetic}/
                          </p>
                        )}
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-4">
                          Click card or press Space to reveal translation
                        </p>
                      </div>
                    ) : (
                      // Audio Challenge mode front
                      <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center justify-center space-y-3">
                          {/* Audio Wave Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              speakSpanish(currentFlashcard.spanish);
                              soundEffects.playPop();
                            }}
                            className="w-20 h-20 bg-amber-500/10 hover:bg-amber-500/20 border-2 border-amber-500 text-amber-500 rounded-full flex items-center justify-center relative group/listen cursor-pointer"
                          >
                            <Volume2 className="w-8 h-8 group-hover/listen:scale-110 transition duration-200" />
                            <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping opacity-60 group-hover/listen:opacity-100 duration-1000" />
                          </motion.button>
                          
                          <div className="text-center space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono">
                              🎧 AUDIO CHALLENGE
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
                              Listen to the word spoken by the AI and type the correct spelling.
                            </p>
                          </div>
                        </div>

                        {/* Spelling Input */}
                        <div className="max-w-xs mx-auto space-y-3">
                          <input
                            type="text"
                            placeholder="Type Spanish word..."
                            value={audioChallengeInput}
                            onChange={(e) => setAudioChallengeInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCheckAudioChallenge();
                              }
                            }}
                            className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border text-center font-bold text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                              audioChallengeStatus === 'correct' || audioChallengeStatus === 'accent-mismatch'
                                ? 'border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                : audioChallengeStatus === 'incorrect'
                                ? 'border-rose-500 ring-2 ring-rose-500/20 text-rose-600 dark:text-rose-400'
                                : 'border-stone-200 dark:border-stone-700/80 text-stone-900 dark:text-white font-sans'
                            }`}
                            autoFocus
                          />

                          <div className="flex gap-2">
                            <button
                              onClick={handleCheckAudioChallenge}
                              disabled={!audioChallengeInput.trim()}
                              className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-sm transition disabled:opacity-40"
                            >
                              Check Spelling
                            </button>
                            <button
                              onClick={() => {
                                setIsCardFlipped(true);
                                soundEffects.playFlip();
                              }}
                              className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 font-bold text-xs uppercase transition"
                            >
                              Reveal
                            </button>
                          </div>

                          {audioChallengeFeedback && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`text-xs font-bold text-center mt-1.5 ${
                                audioChallengeStatus === 'correct' || audioChallengeStatus === 'accent-mismatch'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {audioChallengeFeedback}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    )
                  ) : (
                    // Back of Card (Always reveals details)
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      {/* Spanish word revealed on back if in audio mode */}
                      {isAudioChallenge && (
                        <div className="pb-3 border-b border-stone-100 dark:border-stone-800 text-center">
                          <p className="text-[10px] font-semibold text-stone-400 dark:text-stone-500">SPANISH</p>
                          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                            {currentFlashcard.gender ? <span className="text-lg font-light text-stone-400 mr-1">{currentFlashcard.gender}</span> : ''}
                            {currentFlashcard.spanish}
                          </p>
                          {currentFlashcard.phonetic && (
                            <p className="text-xs font-mono text-stone-400 dark:text-stone-500 mt-1">
                              /{currentFlashcard.phonetic}/
                            </p>
                          )}
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500">ENGLISH</p>
                        <p className="text-2xl font-bold text-stone-900 dark:text-white">{currentFlashcard.english}</p>
                      </div>
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                        <p className="text-xs font-semibold text-stone-400 dark:text-stone-500">ARABIC (المعنى)</p>
                        <p className="text-2xl font-bold text-amber-800 dark:text-amber-300 font-arabic" dir="rtl">
                          {currentFlashcard.arabic}
                        </p>
                      </div>
                      {currentFlashcard.examples?.[0] && (
                        <div className="bg-stone-50 dark:bg-stone-800/80 rounded-lg p-3 text-left border border-stone-200 dark:border-stone-700 mt-3">
                          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                            🇪🇸 {currentFlashcard.examples[0].es}
                          </p>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                            🇬🇧 {currentFlashcard.examples[0].en}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="text-center text-xs text-stone-400 dark:text-stone-500 font-medium">
                  {isCardFlipped ? 'Tap to flip back' : isAudioChallenge ? 'Use spelling input above to check your spelling' : 'Tap to show answer'}
                </div>
              </div>

              {/* Navigation & Mastery controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrevFlashcard}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold text-sm transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => toggleMasterWord(currentFlashcard.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition ${
                    isCurrentMastered
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-600 text-white dark:text-stone-950 shadow-md'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${isCurrentMastered ? 'text-emerald-600' : ''}`} />
                  {isCurrentMastered ? 'Mastered (+10 XP)' : 'Mark as Mastered'}
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= VIEW 3: GRID / LEXICON VIEW ================= */}
      {viewMode === 'grid' && (
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-stone-500 dark:text-stone-400 mb-3 px-1">
            <span>Showing {filteredWords.length} words</span>
            <span>Click any card to play native audio</span>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredWords.map((item) => {
              const isMastered = userProgress.masteredWordIds.includes(item.id);
              const isSaved = userProgress.savedWordIds.includes(item.id);
              const srsRecord = userProgress.srsData?.[item.id];

              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] 
                      } 
                    }
                  }}
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  onClick={() => speakSpanish(item.spanish)}
                  className={`group relative bg-white dark:bg-stone-900 border rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer ${
                    isMastered
                      ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500'
                  }`}
                >
                  {/* Word Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                          {item.gender ? <span className="text-xs font-medium text-stone-400 mr-1">{item.gender}</span> : null}
                          {item.spanish}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
                          {item.cefr}
                        </span>
                      </div>
                      {item.phonetic && (
                        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                          /{item.phonetic}/
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(item.spanish);
                        }}
                        className="p-1 rounded-md text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => toggleSaveWord(item.id, e)}
                        className="p-1 rounded-md text-stone-400 hover:text-amber-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        title="Bookmark"
                      >
                        <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => toggleMasterWord(item.id, e)}
                        className="p-1 rounded-md text-stone-400 hover:text-emerald-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        title="Mastered"
                      >
                        <CheckCircle className={`w-4 h-4 ${isMastered ? 'fill-emerald-500 text-white' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Translations */}
                  <div className="mt-2.5 space-y-1">
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {item.english}
                    </p>
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 font-arabic" dir="rtl">
                      {item.arabic}
                    </p>
                  </div>

                  {/* Example Sentence */}
                  {item.examples?.[0] && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-xs">
                      <p className="font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
                        "{item.examples[0].es}"
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                        {item.examples[0].en}
                      </p>
                    </div>
                  )}

                  {/* Frequency rank & category tag + SRS interval */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                    <span className="capitalize">{item.category} • {item.partOfSpeech}</span>
                    <div className="flex items-center gap-1.5">
                      {srsRecord && (
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          SRS: {srsRecord.interval}d
                        </span>
                      )}
                      <span>Rank #{item.frequencyRank}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
};
