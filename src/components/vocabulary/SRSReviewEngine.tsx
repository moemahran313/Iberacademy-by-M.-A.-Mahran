import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Brain,
  Layers,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { UserProgress, SRSGrade } from '../../types';
import { AcquisitionStage, STAGE_CONFIGS, SRSReviewQuality, CollocationPairing } from '../../types/vocabulary';
import { calculateSM2Review, determineStageFromInterval } from '../../utils/srsAlgorithm';
import { getCollocationsForWord } from '../../services/collocationService';
import { speakSpanish, soundEffects } from '../../utils/audio';
import { CollocationCard } from './CollocationCard';

interface SRSReviewItem {
  id: string;
  word: string;
  isMWE: boolean;
  translation_en: string;
  translation_ar?: string;
  phonetic?: string;
  partOfSpeech?: string;
  sentenceContext?: string;
  stage: AcquisitionStage;
  interval: number;
  repetitions: number;
  easinessFactor: number;
  nextReviewDate: string;
  collocations: CollocationPairing[];
}

interface SRSReviewEngineProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onBack?: () => void;
}

export const SRSReviewEngine: React.FC<SRSReviewEngineProps> = ({
  userProgress,
  setUserProgress,
  onBack
}) => {
  // Collect all SRS flashcard items from userProgress (saved words, custom LingQs, mined phrases)
  const queue = useMemo<SRSReviewItem[]>(() => {
    const items: SRSReviewItem[] = [];
    const today = new Date().toISOString().split('T')[0];
    const srsMap = userProgress.srsData || {};
    const lingqs = userProgress.lingqs || {};

    // 1. Saved individual words
    (userProgress.savedWordIds || []).forEach(wordId => {
      const srs = srsMap[wordId] || {
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewDate: today
      };
      const lq = lingqs[wordId];
      const stage = determineStageFromInterval(srs.interval, srs.repetitions);
      const collocations = getCollocationsForWord(wordId);

      items.push({
        id: `word_${wordId}`,
        word: wordId,
        isMWE: wordId.includes(' '),
        translation_en: lq?.translation_en || 'Saved Spanish word',
        translation_ar: lq?.translation_ar,
        phonetic: lq?.phonetic,
        partOfSpeech: lq?.partOfSpeech || (wordId.includes(' ') ? 'expresión' : 'palabra'),
        sentenceContext: lq?.sentenceContext,
        stage,
        interval: srs.interval || 1,
        repetitions: srs.repetitions || 0,
        easinessFactor: srs.easeFactor || 2.5,
        nextReviewDate: srs.nextReviewDate || today,
        collocations
      });
    });

    // 2. Mined sentences or MWEs
    (userProgress.minedSentences || []).forEach(m => {
      const stage = determineStageFromInterval(m.interval, m.repetitions);
      const collocations = getCollocationsForWord(m.targetWord);

      // Only add if not already in items
      if (!items.find(it => it.word.toLowerCase() === m.targetWord.toLowerCase())) {
        items.push({
          id: m.id,
          word: m.targetWord,
          isMWE: m.targetWord.includes(' '),
          translation_en: m.sentence_en,
          translation_ar: m.sentence_ar,
          sentenceContext: m.sentence_es,
          stage,
          interval: m.interval || 1,
          repetitions: m.repetitions || 0,
          easinessFactor: m.easeFactor || 2.5,
          nextReviewDate: m.nextReviewDate || today,
          collocations
        });
      }
    });

    return items;
  }, [userProgress]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const currentItem = queue[currentIndex];
  const isFinished = queue.length === 0 || currentIndex >= queue.length;

  const handleFlipCard = () => {
    setIsFlipped(prev => !prev);
    soundEffects.playPop();
  };

  const handleGrade = (quality: SRSReviewQuality) => {
    if (!currentItem) return;

    // Calculate new SM-2 scheduling parameters
    const update = calculateSM2Review(
      {
        easinessFactor: currentItem.easinessFactor,
        interval: currentItem.interval,
        repetitions: currentItem.repetitions,
        stage: currentItem.stage
      },
      quality
    );

    // Update userProgress state globally
    setUserProgress(prev => {
      const norm = currentItem.word.toLowerCase().trim();
      const updatedSrs = { ...(prev.srsData || {}) };
      const updatedLingqs = { ...(prev.lingqs || {}) };

      updatedSrs[norm] = {
        wordId: norm,
        interval: update.interval,
        repetitions: update.repetitions,
        easeFactor: update.easinessFactor,
        nextReviewDate: update.nextReviewDate,
        lastReviewedDate: update.lastReviewedDate,
        streak: (updatedSrs[norm]?.streak || 0) + (quality >= 3 ? 1 : 0),
        successCount: (updatedSrs[norm]?.successCount || 0) + (quality >= 3 ? 1 : 0),
        failCount: (updatedSrs[norm]?.failCount || 0) + (quality < 3 ? 1 : 0),
        history: [
          ...(updatedSrs[norm]?.history || []),
          { date: update.lastReviewedDate || '', grade: quality as SRSGrade }
        ]
      };

      // Keep lingq status in sync (1 to 4 or 5)
      if (updatedLingqs[norm]) {
        updatedLingqs[norm] = {
          ...updatedLingqs[norm],
          status: Math.min(4, Math.max(1, update.stage)) as any,
          lastReviewed: new Date().toISOString()
        };
      }

      // If stage 5 (Mastered), ensure it is marked in knownWords
      let updatedKnown = prev.knownWords || [];
      if (update.stage === 5 && !updatedKnown.includes(norm)) {
        updatedKnown = [...updatedKnown, norm];
      }

      return {
        ...prev,
        srsData: updatedSrs,
        lingqs: updatedLingqs,
        knownWords: updatedKnown,
        xp: prev.xp + (quality >= 3 ? 15 : 5)
      };
    });

    if (quality >= 3) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playPop();
    }

    setCompletedCount(prev => prev + 1);
    setIsFlipped(false);
    setCurrentIndex(prev => prev + 1);
  };

  // Keyboard shortcut handler (Space = Flip, 1, 2, 3, 4 = Grade)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlipCard();
      } else if (isFlipped) {
        if (e.key === '1') handleGrade(1);
        else if (e.key === '2') handleGrade(2);
        else if (e.key === '3') handleGrade(3);
        else if (e.key === '4') handleGrade(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isFinished, currentItem]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 font-sans">
      {/* Top Session Progress Bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-stone-800 dark:text-stone-200">
            Repetición Espaciada SM-2 (FSRS)
          </span>
        </div>
        <span className="font-mono">
          {currentIndex} / {queue.length} tarjetas
        </span>
      </div>

      <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${queue.length > 0 ? (currentIndex / queue.length) * 100 : 100}%` }}
        />
      </div>

      {isFinished ? (
        /* Finished State */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 text-center space-y-5 shadow-lg">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              ¡Sesión de Repaso Completada!
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Has repasado {completedCount} tarjetas con el algoritmo SM-2. Los intervalos se han recalculado en tiempo real.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 inline-flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-900 dark:text-amber-200">
              +{completedCount * 15} XP ganados para tu racha diaria
            </span>
          </div>

          <div className="pt-4 flex justify-center">
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Volver a la Biblioteca
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Active Flashcard */
        <div className="space-y-4">
          <div
            onClick={handleFlipCard}
            className={`min-h-[260px] p-6 rounded-3xl border transition-all duration-200 cursor-pointer shadow-md flex flex-col justify-between select-none relative ${
              isFlipped
                ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800 hover:border-amber-400'
            }`}
          >
            {/* Stage Badge & Dialect Trigger */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${STAGE_CONFIGS[currentItem.stage].badgeBg} ${STAGE_CONFIGS[currentItem.stage].badgeText}`}
              >
                {STAGE_CONFIGS[currentItem.stage].labelEs} • Intervalo: {currentItem.interval}d
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakSpanish(currentItem.word, 0.95);
                }}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-200 dark:bg-stone-800 dark:hover:bg-amber-950/80 text-stone-700 dark:text-stone-200 transition cursor-pointer"
                title="Escuchar pronunciación"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Front Card Face: Word / Multi-Word Expression */}
            <div className="my-auto text-center space-y-2 py-4">
              <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
                {currentItem.word}
              </div>

              {currentItem.isMWE && (
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md inline-block">
                  Expresión Multipalabra (MWE)
                </span>
              )}

              {currentItem.sentenceContext && !isFlipped && (
                <p className="text-xs text-stone-500 italic max-w-md mx-auto line-clamp-2">
                  "{currentItem.sentenceContext}"
                </p>
              )}
            </div>

            {/* Flip Callout / Back Face: Definition & Collocations */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>{isFlipped ? 'Presiona 1-4 para evaluar' : 'Toca la tarjeta o presiona Espacio'}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {isFlipped ? '✓ Respuesta revelada' : 'Girar tarjeta ↺'}
              </span>
            </div>
          </div>

          {/* Flipped Answer Breakdown */}
          {isFlipped && (
            <div className="space-y-4 animate-fadeIn">
              {/* Translations Box */}
              <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Significado
                </span>
                <div className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {currentItem.translation_en}
                </div>
                {currentItem.translation_ar && (
                  <div className="text-sm font-bold text-amber-800 dark:text-amber-300 font-arabic text-right" dir="rtl">
                    {currentItem.translation_ar}
                  </div>
                )}
              </div>

              {/* Authentic Collocation Card with Audio */}
              {currentItem.collocations.length > 0 && (
                <CollocationCard collocations={currentItem.collocations} targetWord={currentItem.word} />
              )}

              {/* 4 SM-2 Grading Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <button
                  onClick={() => handleGrade(1)}
                  className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-500 hover:text-white text-rose-800 dark:text-rose-200 font-bold text-xs transition cursor-pointer flex flex-col items-center gap-1 shadow-xs"
                >
                  <span className="text-sm">1</span>
                  <span>Olvido (1d)</span>
                  <span className="text-[10px] opacity-75 font-normal">Blackout</span>
                </button>

                <button
                  onClick={() => handleGrade(2)}
                  className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 hover:bg-amber-500 hover:text-stone-950 text-amber-800 dark:text-amber-200 font-bold text-xs transition cursor-pointer flex flex-col items-center gap-1 shadow-xs"
                >
                  <span className="text-sm">2</span>
                  <span>Difícil (2d)</span>
                  <span className="text-[10px] opacity-75 font-normal">Hard</span>
                </button>

                <button
                  onClick={() => handleGrade(3)}
                  className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-600 hover:text-white text-blue-800 dark:text-blue-200 font-bold text-xs transition cursor-pointer flex flex-col items-center gap-1 shadow-xs"
                >
                  <span className="text-sm">3</span>
                  <span>Bien ({Math.round(currentItem.interval * 2)}d)</span>
                  <span className="text-[10px] opacity-75 font-normal">Good</span>
                </button>

                <button
                  onClick={() => handleGrade(4)}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-200 font-bold text-xs transition cursor-pointer flex flex-col items-center gap-1 shadow-xs"
                >
                  <span className="text-sm">4</span>
                  <span>Fácil ({Math.round(currentItem.interval * 3)}d)</span>
                  <span className="text-[10px] opacity-75 font-normal">Easy</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
