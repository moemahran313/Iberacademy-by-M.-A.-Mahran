import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Volume2,
  Brain,
  Sparkles,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Flame,
  Filter,
  Check,
  X,
  Plus,
  HelpCircle,
  Eye,
  Sliders,
  Bookmark
} from 'lucide-react';
import { UserProgress, VocabularyItem, SRSGrade } from '../types';
import { ALL_VOCABULARY } from '../data';
import { speakSpanish, soundEffects } from '../utils/audio';
import {
  getUnifiedMemoryCollection,
  scheduleUnifiedCard,
  UnifiedMemoryCard,
  UnifiedSRSStats,
  getIntervalPreview,
  getTodayDateString
} from '../utils/srs';
import { useDebounce } from '../hooks/useDebounce';
import { getCollocationsForWord } from '../services/collocationService';

interface VocabularyLibraryProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  initialView?: 'repaso_diario' | 'diccionario';
}

export const VocabularyLibrary: React.FC<VocabularyLibraryProps> = ({
  userProgress,
  setUserProgress,
  initialView = 'repaso_diario'
}) => {
  // Primary Tabs: View 1 (Repaso Diario) vs View 2 (Mi Diccionario Personal)
  const [activeView, setActiveView] = useState<'repaso_diario' | 'diccionario'>(initialView);

  // Review Queue State (View 1)
  const [currentReviewIdx, setCurrentReviewIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [sessionReviewedCount, setSessionReviewedCount] = useState<number>(0);
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);

  // Lexicon Search & Filter States (View 2)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearch = useDebounce(searchTerm, 200);
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  // Unified Memory Collection
  const { allCards, dueCards, stats } = useMemo(() => {
    return getUnifiedMemoryCollection(userProgress, ALL_VOCABULARY);
  }, [userProgress]);

  // Active card in review queue
  const currentCard: UnifiedMemoryCard | undefined = dueCards[currentReviewIdx];
  const cardCollocations = useMemo(() => currentCard ? getCollocationsForWord(currentCard.word) : [], [currentCard]);

  // Auto-play audio when front of card is first shown
  useEffect(() => {
    if (activeView === 'repaso_diario' && currentCard && !isCardFlipped) {
      speakSpanish(currentCard.word);
    }
  }, [currentReviewIdx, activeView, isCardFlipped]);

  // Flip card handler
  const handleFlipCard = useCallback(() => {
    soundEffects.playFlip();
    setIsCardFlipped(prev => !prev);
  }, []);

  // SM-2 Schedule Card Handler (1: Again, 2: Hard, 3: Good, 4: Easy)
  const handleGradeCard = useCallback((grade: SRSGrade) => {
    if (!currentCard) return;

    if (grade >= 3) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    const xpGained = grade === 1 ? 5 : grade === 2 ? 15 : grade === 3 ? 25 : 35;
    setSessionXpEarned(prev => prev + xpGained);
    setSessionReviewedCount(prev => prev + 1);

    // Apply SM-2 update to user progress
    setUserProgress(prev => scheduleUnifiedCard(currentCard, grade, prev));

    setIsCardFlipped(false);

    // Check if next card is available
    if (currentReviewIdx + 1 < dueCards.length) {
      setCurrentReviewIdx(prev => prev + 1);
    } else {
      setSessionCompleted(true);
      soundEffects.playLevelUp();
    }
  }, [currentCard, currentReviewIdx, dueCards.length, setUserProgress]);

  // Keyboard Shortcuts (Spacebar to flip, 1-4 to grade)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeView !== 'repaso_diario' || sessionCompleted || !currentCard) return;

      // Ignore when user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlipCard();
      } else if (isCardFlipped) {
        if (e.key === '1') {
          e.preventDefault();
          handleGradeCard(1);
        } else if (e.key === '2') {
          e.preventDefault();
          handleGradeCard(2);
        } else if (e.key === '3') {
          e.preventDefault();
          handleGradeCard(3);
        } else if (e.key === '4') {
          e.preventDefault();
          handleGradeCard(4);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, isCardFlipped, sessionCompleted, currentCard, handleFlipCard, handleGradeCard]);

  // Filtered Lexicon Cards (View 2)
  const filteredLexicon = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return allCards.filter(c => {
      const matchSearch =
        term === '' ||
        c.word.toLowerCase().includes(term) ||
        c.translation_en.toLowerCase().includes(term) ||
        c.translation_ar.includes(term) ||
        c.sentence_es.toLowerCase().includes(term);

      const matchStage = stageFilter === 'all' || c.stage.toString() === stageFilter;
      const matchSource = sourceFilter === 'all' || c.source === sourceFilter;

      return matchSearch && matchStage && matchSource;
    });
  }, [allCards, debouncedSearch, stageFilter, sourceFilter]);

  // Change LingQ Stage directly from Lexicon
  const handleChangeStage = (card: UnifiedMemoryCard, newStage: 1 | 2 | 3 | 4 | 5) => {
    soundEffects.playPop();
    const cleanWord = card.word.toLowerCase().trim();
    setUserProgress(prev => {
      const updatedLingqs = { ...(prev.lingqs || {}) };
      updatedLingqs[cleanWord] = {
        word: card.word,
        status: (newStage <= 4 ? newStage : 4) as 1 | 2 | 3 | 4,
        translation_en: card.translation_en,
        translation_ar: card.translation_ar,
        sentenceContext: card.sentence_es,
        createdAt: prev.lingqs?.[cleanWord]?.createdAt || getTodayDateString(),
        lastReviewed: getTodayDateString()
      };
      return {
        ...prev,
        lingqs: updatedLingqs
      };
    });
  };

  // LingQ Stage Badges
  const stageLabels: Record<1 | 2 | 3 | 4 | 5, { name: string; color: string; bg: string }> = {
    1: { name: 'Nueva', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
    2: { name: 'Reconocida', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
    3: { name: 'Familiar', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10' },
    4: { name: 'Aprendida', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
    5: { name: 'Dominada', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-5xl mx-auto">
      {/* 🏛️ Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
                Memoria Activa & Anki SM-2
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {stats.totalCount} palabras sincronizadas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 dark:text-stone-100">
              Centro de Vocabulario y Memoria
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{dueCards.length} debidas hoy</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>{stats.averageRetention}% retención</span>
            </div>
          </div>
        </div>

        {/* 2 Primary View Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setActiveView('repaso_diario');
              setIsCardFlipped(false);
            }}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeView === 'repaso_diario'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Repaso Diario (SRS Queue)</span>
            {dueCards.length > 0 && (
              <span className={`px-2 py-0.2 rounded-full text-xs font-black ${
                activeView === 'repaso_diario' ? 'bg-white text-[#C85A32]' : 'bg-[#C85A32] text-white'
              }`}>
                {dueCards.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setActiveView('diccionario');
            }}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeView === 'diccionario'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mi Diccionario Personal</span>
            <span className={`px-2 py-0.2 rounded-full text-xs font-black ${
              activeView === 'diccionario' ? 'bg-white text-[#C85A32]' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200'
            }`}>
              {stats.totalCount}
            </span>
          </button>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* VIEW 1: REPASO DIARIO (ANKI-GRADE SM-2 FLASHCARDS)       */}
      {/* ======================================================== */}
      {activeView === 'repaso_diario' && (
        <div className="space-y-6">
          {sessionCompleted || dueCards.length === 0 ? (
            /* Session Triumphant Completion Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 text-center space-y-6 shadow-2xs"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black font-serif text-stone-900 dark:text-white">
                  ¡Memoria al 100%!
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Has repasado todas las palabras programadas para hoy. Tu curva de olvido se ha reiniciado satisfactoriamente.
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-stone-600 dark:text-stone-300">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Tarjetas Repasadas</span>
                  <span className="text-base font-extrabold text-stone-900 dark:text-white">{sessionReviewedCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Puntos XP Ganados</span>
                  <span className="text-base font-extrabold text-[#C85A32] dark:text-[#E07A5F]">+{sessionXpEarned} XP</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Retención Estimada</span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{stats.averageRetention}%</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setActiveView('diccionario');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition cursor-pointer"
                >
                  Explorar Mi Diccionario
                </button>
                {allCards.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playPop();
                      setSessionCompleted(false);
                      setCurrentReviewIdx(0);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B44C27] text-white text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    Repasar de nuevo
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            /* Active Review Card Deck */
            currentCard && (
              <div className="space-y-4">
                {/* Progress Indicators */}
                <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                  <span>
                    Tarjeta <strong className="text-stone-800 dark:text-stone-200">{currentReviewIdx + 1}</strong> de {dueCards.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">Intervalo actual: {currentCard.interval}d</span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="text-stone-400">Atajo: [Espacio] voltear</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C85A32] transition-all duration-300"
                    style={{ width: `${((currentReviewIdx + 1) / dueCards.length) * 100}%` }}
                  />
                </div>

                {/* Ergonomic Minimalist Flashcard */}
                <div
                  onClick={handleFlipCard}
                  className="min-h-[340px] p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-sm transition-all cursor-pointer flex flex-col justify-between select-none relative group"
                >
                  {/* Card Header row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${stageLabels[currentCard.stage].bg} ${stageLabels[currentCard.stage].color}`}>
                        Etapa {currentCard.stage}: {stageLabels[currentCard.stage].name}
                      </span>
                      {currentCard.gender && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-500">
                          {currentCard.gender === 'masc' ? 'Masc ♂' : currentCard.gender === 'fem' ? 'Fem ♀' : currentCard.gender}
                        </span>
                      )}
                      <span className="text-stone-400 text-[11px] uppercase tracking-wider font-semibold">
                        {currentCard.source === 'reader' ? 'Lector' : currentCard.source === 'tutor' ? 'AI Tutor' : currentCard.source === 'mined' ? 'Frase Minada' : 'Vocabulario'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        speakSpanish(currentCard.word);
                      }}
                      className="p-2 rounded-xl bg-stone-50 dark:bg-stone-850 hover:bg-[#C85A32]/10 text-stone-500 hover:text-[#C85A32] transition"
                      title="Pronunciación del término"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Card Center: Front vs Back */}
                  <div className="py-6 text-center space-y-4">
                    {/* Spanish Target Word */}
                    <h2 className="text-4xl sm:text-5xl font-black font-serif text-stone-900 dark:text-stone-100 tracking-tight">
                      {currentCard.word}
                    </h2>

                    {/* Phonetic guide if available */}
                    {currentCard.phonetic && (
                      <p className="text-xs font-mono text-stone-400">
                        /{currentCard.phonetic}/
                      </p>
                    )}

                    {/* BACK CONTENT (Revealed on flip) */}
                    <AnimatePresence>
                      {isCardFlipped ? (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 pt-2"
                        >
                          {/* Translations */}
                          <div className="space-y-1">
                            <p className="text-xl sm:text-2xl font-bold text-[#C85A32] dark:text-[#E07A5F]">
                              {currentCard.translation_en}
                            </p>
                            {currentCard.translation_ar && (
                              <p className="text-lg font-arabic text-stone-600 dark:text-stone-300" dir="rtl">
                                {currentCard.translation_ar}
                              </p>
                            )}
                          </div>

                          {/* Authentic Context Sentence with Full Audio */}
                          {currentCard.sentence_es && (
                            <div className="p-4 rounded-2xl bg-[#FBF9F5] dark:bg-[#121110] border border-stone-200/80 dark:border-stone-800 text-left space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-stone-400">
                                <span>Frase Completa en Contexto:</span>
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    speakSpanish(currentCard.sentence_es);
                                  }}
                                  className="text-[#C85A32] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Escuchar Frase</span>
                                </button>
                              </div>
                              <p className="text-sm sm:text-base font-serif text-stone-800 dark:text-stone-200 font-medium">
                                "{currentCard.sentence_es}"
                              </p>
                              {currentCard.sentence_en && (
                                <p className="text-xs text-stone-500">
                                  {currentCard.sentence_en}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Authentic Collocations with Audio Pronunciation */}
                          {cardCollocations.length > 0 ? (
                            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left space-y-2">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>Colocaciones Auténticas en Español:</span>
                              </div>
                              <div className="space-y-1.5">
                                {cardCollocations.slice(0, 2).map((col, idx) => (
                                  <div
                                    key={idx}
                                    className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-xs gap-2"
                                  >
                                    <div className="min-w-0">
                                      <span className="font-black text-stone-900 dark:text-stone-100 block">
                                        {col.pairing_es}
                                      </span>
                                      <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                                        {col.translation_en}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakSpanish(col.pairing_es);
                                      }}
                                      className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-800 dark:text-amber-200 hover:text-stone-950 transition cursor-pointer shrink-0"
                                      title="Escuchar colocación"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : currentCard.collocation ? (
                            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Colocación: <strong>{currentCard.collocation}</strong></span>
                            </div>
                          ) : null}
                        </motion.div>
                      ) : (
                        /* FRONT CONTENT: Context Sentence preview */
                        currentCard.sentence_es && (
                          <div className="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-900/50 border border-stone-200/60 dark:border-stone-800 max-w-lg mx-auto text-center space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Contexto de uso:
                            </span>
                            <p className="text-sm sm:text-base font-serif text-stone-700 dark:text-stone-300 italic">
                              "{currentCard.sentence_es}"
                            </p>
                          </div>
                        )
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Footer Cue */}
                  <div className="text-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-xs text-stone-400 font-medium group-hover:text-stone-600 dark:group-hover:text-stone-300 transition">
                      {isCardFlipped ? 'Selecciona tu nivel de recuerdo abajo 👇' : 'Toca la tarjeta o pulsa [Espacio] para voltear'}
                    </span>
                  </div>
                </div>

                {/* 4 Clear SM-2 Rating Buttons (Shown after Flip) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {/* Grade 1: Otra vez (Again) */}
                  <button
                    type="button"
                    onClick={() => handleGradeCard(1)}
                    className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition cursor-pointer text-left space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                        1. Otra vez
                      </span>
                      <span className="text-[10px] font-mono text-rose-500 font-bold">
                        {getIntervalPreview(currentCard.srsItem, 1)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      No la recordé bien (<span className="font-mono">tecla 1</span>)
                    </p>
                  </button>

                  {/* Grade 2: Difícil (Hard) */}
                  <button
                    type="button"
                    onClick={() => handleGradeCard(2)}
                    className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 transition cursor-pointer text-left space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        2. Difícil
                      </span>
                      <span className="text-[10px] font-mono text-amber-500 font-bold">
                        {getIntervalPreview(currentCard.srsItem, 2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Con esfuerzo dudoso (<span className="font-mono">tecla 2</span>)
                    </p>
                  </button>

                  {/* Grade 3: Bien (Good) */}
                  <button
                    type="button"
                    onClick={() => handleGradeCard(3)}
                    className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-950/50 border border-sky-200 dark:border-sky-900/60 transition cursor-pointer text-left space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-700 dark:text-sky-400">
                        3. Bien
                      </span>
                      <span className="text-[10px] font-mono text-sky-500 font-bold">
                        {getIntervalPreview(currentCard.srsItem, 3)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Recuerdo natural (<span className="font-mono">tecla 3</span>)
                    </p>
                  </button>

                  {/* Grade 4: Fácil (Easy) */}
                  <button
                    type="button"
                    onClick={() => handleGradeCard(4)}
                    className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 transition cursor-pointer text-left space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        4. Fácil
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500 font-bold">
                        {getIntervalPreview(currentCard.srsItem, 4)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Instantáneo (+7d) (<span className="font-mono">tecla 4</span>)
                    </p>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: MI DICCIONARIO PERSONAL (FULL SEARCHABLE LEXICON)*/}
      {/* ======================================================== */}
      {activeView === 'diccionario' && (
        <div className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar en tu léxico (palabra, significado, frase)..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#C85A32]"
                />
              </div>

              {/* Stage Filter */}
              <select
                value={stageFilter}
                onChange={e => setStageFilter(e.target.value)}
                className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-hidden"
              >
                <option value="all">Todas las Etapas (1 - 5)</option>
                <option value="1">Etapa 1: Nuevas</option>
                <option value="2">Etapa 2: Reconocidas</option>
                <option value="3">Etapa 3: Familiares</option>
                <option value="4">Etapa 4: Aprendidas</option>
                <option value="5">Etapa 5: Dominadas</option>
              </select>

              {/* Source Filter */}
              <select
                value={sourceFilter}
                onChange={e => setSourceFilter(e.target.value)}
                className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 focus:outline-hidden"
              >
                <option value="all">Todas las Fuentes</option>
                <option value="reader">Lector LingQ</option>
                <option value="tutor">AI Tutor</option>
                <option value="mined">Frases Minadas</option>
                <option value="curriculum">Plan de Estudios</option>
              </select>
            </div>

            {/* Stage Counter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              {([1, 2, 3, 4, 5] as const).map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStageFilter(stageFilter === st.toString() ? 'all' : st.toString())}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer font-bold flex items-center gap-1.5 shrink-0 ${
                    stageFilter === st.toString()
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                      : `${stageLabels[st].bg} ${stageLabels[st].color}`
                  }`}
                >
                  <span>Etapa {st}: {stageLabels[st].name}</span>
                  <span className="font-mono text-[11px] opacity-75">({stats.stageCounts[st] || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lexicon Cards Feed */}
          <div className="space-y-3">
            {filteredLexicon.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400 space-y-2">
                <p>No se encontraron palabras con los filtros actuales.</p>
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setStageFilter('all'); setSourceFilter('all'); }}
                  className="text-[#C85A32] font-bold underline cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              filteredLexicon.map(card => (
                <div
                  key={card.id}
                  className="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-black font-serif text-stone-900 dark:text-stone-100">
                        {card.word}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakSpanish(card.word)}
                        className="p-1 rounded-md text-stone-400 hover:text-[#C85A32] transition"
                        title="Pronunciación"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {card.gender && (
                        <span className="text-[10px] font-bold text-stone-500 px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800">
                          {card.gender}
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                        {card.source}
                      </span>
                    </div>

                    {/* Change LingQ Stage Selector (1 - 5) */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-stone-400 mr-1 hidden sm:inline">Etapa:</span>
                      {([1, 2, 3, 4, 5] as const).map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleChangeStage(card, s)}
                          className={`w-6 h-6 rounded-md text-[10px] font-bold transition cursor-pointer flex items-center justify-center ${
                            card.stage === s
                              ? 'bg-[#C85A32] text-white'
                              : 'bg-white dark:bg-stone-800 text-stone-500 hover:bg-stone-200 border border-stone-200 dark:border-stone-700'
                          }`}
                          title={`Mover a Etapa ${s}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Translations */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <p className="font-bold text-stone-800 dark:text-stone-200">
                      🇬🇧 {card.translation_en}
                    </p>
                    {card.translation_ar && (
                      <p className="font-arabic text-stone-600 dark:text-stone-400 text-right" dir="rtl">
                        🇦🇪 {card.translation_ar}
                      </p>
                    )}
                  </div>

                  {/* Complete Sentence Context */}
                  {card.sentence_es && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 text-xs space-y-1">
                      <p className="font-serif italic text-stone-700 dark:text-stone-300">
                        "{card.sentence_es}"
                      </p>
                    </div>
                  )}

                  {/* SRS Scheduling Info */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-200/40 dark:border-stone-800/60">
                    <span>Próximo repaso: <strong>{card.nextReviewDate}</strong></span>
                    <span>Intervalo: <strong>{card.interval}d</strong> • Repeticiones: <strong>{card.repetitions}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyLibrary;
