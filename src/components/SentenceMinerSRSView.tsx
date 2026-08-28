import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Volume2,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Layers,
  Flame,
  Award,
  Zap,
  Trash2,
  Eye
} from 'lucide-react';
import { UserProgress, MinedSentence, SRSGrade, LingQStatus, LingQItem } from '../types';
import { speakSpanish, soundEffects } from '../utils/audio';
import { generateClozeSentence, findMultiContextSentences, ContextualSentence } from '../utils/lingqEngine';

interface SentenceMinerSRSViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const SentenceMinerSRSView: React.FC<SentenceMinerSRSViewProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [subTab, setSubTab] = useState<'review' | 'mined_vault' | 'lingq_vault'>('review');
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [selectedWordContexts, setSelectedWordContexts] = useState<ContextualSentence[]>([]);
  const [showMultiContexts, setShowMultiContexts] = useState<boolean>(false);

  const minedList = useMemo(() => {
    return userProgress.minedSentences || [];
  }, [userProgress.minedSentences]);

  const dueCards = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return minedList.filter(card => !card.nextReviewDate || card.nextReviewDate <= today);
  }, [minedList]);

  const currentCard: MinedSentence | undefined = dueCards[currentCardIdx] || dueCards[0];

  const cloze = useMemo(() => {
    if (!currentCard) return { clozePrompt: '', targetClean: '' };
    return generateClozeSentence(currentCard.sentence_es, currentCard.targetWord);
  }, [currentCard]);

  // Handle revealing the cloze card
  const handleReveal = () => {
    setIsRevealed(true);
    if (currentCard) {
      speakSpanish(currentCard.sentence_es);
      const contexts = findMultiContextSentences(currentCard.targetWord);
      setSelectedWordContexts(contexts);
    }
  };

  // Grade Card with SuperMemo-2 Spaced Repetition Logic
  const handleGradeCard = (grade: SRSGrade) => {
    if (!currentCard) return;

    if (grade >= 3) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    const today = new Date();
    let newInterval = 1;
    let newRepetitions = currentCard.repetitions || 0;
    let newEase = currentCard.easeFactor || 2.5;

    if (grade === 1) {
      // Again
      newInterval = 1;
      newRepetitions = 0;
      newEase = Math.max(1.3, newEase - 0.2);
    } else if (grade === 2) {
      // Hard
      newInterval = Math.max(1, Math.round(currentCard.interval * 1.2));
      newRepetitions += 1;
      newEase = Math.max(1.3, newEase - 0.15);
    } else if (grade === 3) {
      // Good
      if (newRepetitions === 0) newInterval = 1;
      else if (newRepetitions === 1) newInterval = 3;
      else newInterval = Math.round(currentCard.interval * newEase);
      newRepetitions += 1;
    } else if (grade === 4) {
      // Easy
      if (newRepetitions === 0) newInterval = 3;
      else if (newRepetitions === 1) newInterval = 6;
      else newInterval = Math.round(currentCard.interval * newEase * 1.3);
      newRepetitions += 1;
      newEase += 0.15;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + newInterval);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    // Update in UserProgress
    setUserProgress(prev => {
      const updatedList = (prev.minedSentences || []).map(m => {
        if (m.id === currentCard.id) {
          return {
            ...m,
            interval: newInterval,
            repetitions: newRepetitions,
            easeFactor: newEase,
            nextReviewDate: nextDateStr,
            lastGrade: grade
          };
        }
        return m;
      });

      return {
        ...prev,
        minedSentences: updatedList,
        xp: prev.xp + (grade >= 3 ? 15 : 5)
      };
    });

    // Reset card state
    setIsRevealed(false);
    setTypedInput('');
    setShowMultiContexts(false);

    if (currentCardIdx < dueCards.length - 1) {
      setCurrentCardIdx(prev => prev + 1);
    } else {
      setCurrentCardIdx(0);
    }
  };

  // Delete a mined sentence
  const handleDeleteMinedSentence = (id: string) => {
    setUserProgress(prev => ({
      ...prev,
      minedSentences: (prev.minedSentences || []).filter(m => m.id !== id)
    }));
  };

  // Convert LingQ dictionary to array
  const lingqArray: LingQItem[] = useMemo(() => {
    return Object.values(userProgress.lingqs || {});
  }, [userProgress.lingqs]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/70 to-stone-900 border border-amber-500/30 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-stone-950">
                True Acquisition Engine
              </span>
              <span className="text-xs text-amber-300 font-bold">
                Cloze Deletion & Sentence Mining
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Sentence Mining & Active Recall Deck
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              No superficial multiple-choice recognition. Every card is an authentic Spanish sentence you mined directly from real stories and news, tested in full context.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-stone-800 border border-stone-700 text-center">
              <div className="text-lg font-black text-amber-400">{dueCards.length}</div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">Due Today</div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-stone-800 border border-stone-700 text-center">
              <div className="text-lg font-black text-emerald-400">{minedList.length}</div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">Total Mined</div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2">
          <button
            onClick={() => setSubTab('review')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'review'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Active Cloze Reviews ({dueCards.length})</span>
          </button>

          <button
            onClick={() => setSubTab('mined_vault')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'mined_vault'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Mined Sentences Vault ({minedList.length})</span>
          </button>

          <button
            onClick={() => setSubTab('lingq_vault')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              subTab === 'lingq_vault'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Active LingQs ({lingqArray.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: ACTIVE CLOZE REVIEW */}
      {subTab === 'review' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {dueCards.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-10 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-stone-900 dark:text-white">
                  All Cloze Reviews Completed!
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  You have reviewed all your mined sentences for today. Open any story or article in the Interactive Reader to mine new sentences!
                </p>
              </div>
            </div>
          ) : currentCard ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
              {/* Progress Indicator */}
              <div className="flex justify-between items-center text-xs font-extrabold text-stone-400">
                <span>
                  Card {currentCardIdx + 1} of {dueCards.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Target Word: {currentCard.targetWord}
                </span>
              </div>

              {/* Cloze Sentence Display */}
              <div className="p-6 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                  Fill in the authentic Spanish context:
                </span>

                <p className="text-lg sm:text-xl font-extrabold leading-relaxed text-stone-900 dark:text-white">
                  {isRevealed ? (
                    <span>
                      {currentCard.sentence_es.split(new RegExp(`(${currentCard.targetWord})`, 'gi')).map((part, pIdx) => {
                        if (part.toLowerCase() === currentCard.targetWord.toLowerCase()) {
                          return (
                            <span key={pIdx} className="bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded-md font-black">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </span>
                  ) : (
                    <span>{cloze.clozePrompt}</span>
                  )}
                </p>

                {/* Optional typing input for high rigor active recall */}
                {!isRevealed && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={e => setTypedInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleReveal();
                      }}
                      placeholder="Type the missing Spanish word (optional) and press Reveal..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Reveal or Grade Controls */}
              {!isRevealed ? (
                <button
                  onClick={handleReveal}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Eye className="w-5 h-5" />
                  <span>Reveal Sentence & Translations</span>
                </button>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  {/* Revealed Translations & Audio */}
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-900 dark:text-amber-300">
                        Contextual Meaning:
                      </span>
                      <button
                        onClick={() => speakSpanish(currentCard.sentence_es)}
                        className="p-1.5 rounded-xl bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 hover:bg-amber-300"
                        title="Replay Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {currentCard.sentence_en}
                    </p>

                    {currentCard.sentence_ar && (
                      <p className="text-sm font-bold text-amber-800 dark:text-amber-300 font-arabic" dir="rtl">
                        {currentCard.sentence_ar}
                      </p>
                    )}
                  </div>

                  {/* Multi-Context Drawer */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowMultiContexts(!showMultiContexts)}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{showMultiContexts ? 'Hide' : 'Show'} "{currentCard.targetWord}" in {selectedWordContexts.length} other authentic corpus contexts</span>
                    </button>

                    {showMultiContexts && (
                      <div className="space-y-2 p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-xs max-h-48 overflow-y-auto">
                        {selectedWordContexts.map((ctx, idx) => (
                          <div key={idx} className="p-2 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
                            <p className="font-bold text-stone-900 dark:text-white">{ctx.es}</p>
                            <p className="text-stone-500 text-[11px]">{ctx.en}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SM-2 Spaced Repetition Grading Buttons */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-black uppercase text-stone-400 text-center block">
                      Rate Your Retrieval Effort (SuperMemo-2 Spaced Repetition)
                    </span>

                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleGradeCard(1)}
                        className="py-3 px-2 rounded-2xl bg-rose-100 dark:bg-rose-950/70 hover:bg-rose-200 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 font-black text-xs flex flex-col items-center gap-0.5 transition"
                      >
                        <span>🔴 Again</span>
                        <span className="text-[10px] font-normal opacity-80">&lt; 1 day</span>
                      </button>

                      <button
                        onClick={() => handleGradeCard(2)}
                        className="py-3 px-2 rounded-2xl bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-black text-xs flex flex-col items-center gap-0.5 transition"
                      >
                        <span>🟠 Hard</span>
                        <span className="text-[10px] font-normal opacity-80">1-2 days</span>
                      </button>

                      <button
                        onClick={() => handleGradeCard(3)}
                        className="py-3 px-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 hover:bg-emerald-200 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-black text-xs flex flex-col items-center gap-0.5 transition"
                      >
                        <span>🟢 Good</span>
                        <span className="text-[10px] font-normal opacity-80">3-6 days</span>
                      </button>

                      <button
                        onClick={() => handleGradeCard(4)}
                        className="py-3 px-2 rounded-2xl bg-sky-100 dark:bg-sky-950/70 hover:bg-sky-200 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 font-black text-xs flex flex-col items-center gap-0.5 transition"
                      >
                        <span>🔵 Easy</span>
                        <span className="text-[10px] font-normal opacity-80">1-2 weeks</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* SUB-TAB 2: MINED SENTENCES VAULT */}
      {subTab === 'mined_vault' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              All Mined Sentences ({minedList.length})
            </h3>
          </div>

          {minedList.length === 0 ? (
            <div className="p-8 text-center text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
              No mined sentences yet. Open any story in the interactive reader and click "Mine Sentence to Cloze SRS"!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {minedList.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-xs space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-500 text-stone-950">
                      Target: {item.targetWord}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => speakSpanish(item.sentence_es)}
                        className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-amber-500"
                        title="Play audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMinedSentence(item.id)}
                        className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-rose-500"
                        title="Delete card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {item.sentence_es}
                  </p>

                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {item.sentence_en}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono pt-1 border-t border-stone-100 dark:border-stone-800">
                    <span>Source: {item.sourceTitle || 'Comprehensible Reader'}</span>
                    <span>Next Review: {item.nextReviewDate || 'Today'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: ACTIVE LINGQS MATRIX */}
      {subTab === 'lingq_vault' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Active LingQ Learning Matrix ({lingqArray.length})
            </h3>
          </div>

          {lingqArray.length === 0 ? (
            <div className="p-8 text-center text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
              No active LingQs created yet. Click any yellow/blue word in the interactive reader to create a LingQ!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {lingqArray.map(l => (
                <div
                  key={l.word}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 shadow-xs space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-stone-900 dark:text-white">
                        {l.word}
                      </span>
                      <button
                        onClick={() => speakSpanish(l.word)}
                        className="text-stone-400 hover:text-amber-500"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      Status {l.status}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {l.translation_en}
                  </p>
                  {l.translation_ar && (
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 font-arabic" dir="rtl">
                      {l.translation_ar}
                    </p>
                  )}
                  {l.sentenceContext && (
                    <p className="text-[11px] text-stone-400 italic border-t border-stone-100 dark:border-stone-800 pt-1">
                      "{l.sentenceContext}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
