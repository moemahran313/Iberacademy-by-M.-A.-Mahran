import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Flame,
  X,
  RotateCw,
  Mic,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';
import { UserProgress } from '../types';
import { COMPREHENSIBLE_STORIES } from '../data/comprehensibleStories';
import { soundEffects, speakSpanish } from '../utils/audio';
import { triggerConfettiBurst } from '../utils/confetti';

interface DailyRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const DailyRoutineModal: React.FC<DailyRoutineModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  setUserProgress
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Story state
  const currentStory = COMPREHENSIBLE_STORIES.find(s => s.cefr === userProgress.currentLevel) || COMPREHENSIBLE_STORIES[0];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Step 2: Flashcards state
  const sampleCards = [
    { es: 'el barrio', en: 'the neighborhood', ar: 'الحي', example: 'Un barrio hermoso e histórico.' },
    { es: 'el hogar', en: 'the home', ar: 'المنزل', example: 'La Casa Azul fue su hogar.' },
    { es: 'desarrollar', en: 'to develop', ar: 'تطوير', example: 'Quiero desarrollar mi español.' },
    { es: 'sonreír', en: 'to smile', ar: 'ابتسامة', example: 'Carlos sonríe porque está feliz.' },
    { es: 'la costumbre', en: 'the custom / habit', ar: 'العادة', example: 'Es una costumbre mexicana.' }
  ];
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Step 3: Shadowing state
  const shadowingSentences = [
    { es: 'Hoy es un excelente día para aprender español.', en: 'Today is an excellent day to learn Spanish.' },
    { es: 'Me gusta practicar hablar todos los días.', en: 'I like to practice speaking every day.' }
  ];
  const [shadowIdx, setShadowIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [shadowDone, setShadowDone] = useState(false);

  if (!isOpen) return null;

  const handleNextStep1 = () => {
    soundEffects.playPop();
    setStep(2);
  };

  const handleCardRate = () => {
    soundEffects.playFlip();
    setIsFlipped(false);
    if (cardIdx + 1 < sampleCards.length) {
      setCardIdx(cardIdx + 1);
    } else {
      setStep(3);
    }
  };

  const handleStartRecording = () => {
    soundEffects.playPop();
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setShadowDone(true);
      soundEffects.playCorrect();
    }, 2500);
  };

  const handleFinishShadowing = () => {
    if (shadowIdx + 1 < shadowingSentences.length) {
      setShadowIdx(shadowIdx + 1);
      setShadowDone(false);
    } else {
      // Award XP and complete daily routine!
      triggerConfettiBurst();
      soundEffects.playLevelUp();
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 50,
        totalWordsRead: prev.totalWordsRead + currentStory.wordCount,
        streakDays: prev.streakDays + 1
      }));
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header Progress Stepper */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-black text-xs">
              15m
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-stone-900 dark:text-white">
                Guided Daily Study Routine
              </span>
              <span className="text-[10px] text-stone-500 font-medium">
                Step {step} of 3: {step === 1 ? '5-Min Reading' : step === 2 ? '5-Min SRS Memory' : step === 3 ? '2-Min Shadowing' : 'Completed!'}
              </span>
            </div>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === i
                    ? 'w-6 bg-amber-500'
                    : step > i
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-stone-300 dark:bg-stone-700'
                }`}
              />
            ))}
            <button
              onClick={onClose}
              className="ml-3 p-1 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* STEP 1: Graded Story Reading */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    CEFR {currentStory.cefr}
                  </span>
                  <h3 className="text-xl font-black text-stone-900 dark:text-white mt-1">
                    {currentStory.title_es}
                  </h3>
                  <p className="text-xs text-stone-500">{currentStory.title_en}</p>
                </div>
                <button
                  onClick={() => speakSpanish(currentStory.paragraphs[0].es)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-amber-500/20 text-stone-800 dark:text-stone-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>Listen</span>
                </button>
              </div>

              {/* Story Paragraph */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-3">
                <p className="text-base sm:text-lg text-stone-900 dark:text-stone-100 font-serif leading-relaxed">
                  {currentStory.paragraphs[0].es}
                </p>
                <p className="text-xs text-stone-500 italic">
                  {currentStory.paragraphs[0].en}
                </p>
              </div>

              {/* Quick Comprehension Check */}
              {currentStory.comprehensionQuiz && currentStory.comprehensionQuiz[0] && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 space-y-3">
                  <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Comprehension Check: {currentStory.comprehensionQuiz[0].question_es}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentStory.comprehensionQuiz[0].options.map((opt, idx) => {
                      const isCorrect = idx === currentStory.comprehensionQuiz[0].answerIdx;
                      const isSelected = selectedAnswer === idx;
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedAnswer(idx);
                            setQuizSubmitted(true);
                            if (isCorrect) soundEffects.playCorrect();
                            else soundEffects.playIncorrect();
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-500 text-white'
                                : isSelected
                                ? 'bg-rose-500 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 opacity-50'
                              : isSelected
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={handleNextStep1}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Continue to Step 2: Memory Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Flashcard Memory Review */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-center"
            >
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                <span>SRS Memory Deck</span>
                <span>Card {cardIdx + 1} of {sampleCards.length}</span>
              </div>

              {/* Flip Card */}
              <div
                onClick={() => {
                  soundEffects.playFlip();
                  setIsFlipped(!isFlipped);
                }}
                className="relative min-h-[220px] p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20 flex flex-col items-center justify-center cursor-pointer select-none shadow-md hover:border-amber-500/40 transition-all"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(sampleCards[cardIdx].es);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-stone-800 shadow-xs text-amber-500 hover:scale-105 transition-all"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                {!isFlipped ? (
                  <div className="space-y-2">
                    <span className="text-3xl font-black text-stone-900 dark:text-white">
                      {sampleCards[cardIdx].es}
                    </span>
                    <p className="text-xs text-stone-400">Tap card to show translation</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                      {sampleCards[cardIdx].en}
                    </span>
                    <span className="text-sm font-bold text-stone-500 block">
                      {sampleCards[cardIdx].ar}
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 italic max-w-md">
                      "{sampleCards[cardIdx].example}"
                    </p>
                  </div>
                )}
              </div>

              {/* Rating buttons */}
              {isFlipped ? (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleCardRate}
                    className="py-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs transition-all cursor-pointer"
                  >
                    Hard (1d)
                  </button>
                  <button
                    onClick={handleCardRate}
                    className="py-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-bold text-xs transition-all cursor-pointer"
                  >
                    Good (3d)
                  </button>
                  <button
                    onClick={handleCardRate}
                    className="py-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs transition-all cursor-pointer"
                  >
                    Easy (7d)
                  </button>
                </div>
              ) : (
                <p className="text-xs text-stone-400 font-medium">
                  Tap the card to reveal translation & test your recall
                </p>
              )}
            </motion.div>
          )}

          {/* STEP 3: Oral Shadowing Drill */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-center"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  Native Pronunciation Shadowing
                </span>
                <h4 className="text-lg font-black text-stone-900 dark:text-white">
                  Listen & Repeat Aloud
                </h4>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-3">
                <p className="text-xl font-bold text-stone-900 dark:text-white">
                  "{shadowingSentences[shadowIdx].es}"
                </p>
                <p className="text-xs text-stone-500">
                  {shadowingSentences[shadowIdx].en}
                </p>

                <button
                  onClick={() => speakSpanish(shadowingSentences[shadowIdx].es)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Native Model</span>
                </button>
              </div>

              {/* Record Action */}
              {!shadowDone ? (
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className={`w-20 h-20 mx-auto rounded-full flex flex-col items-center justify-center gap-1 shadow-xl transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  <Mic className="w-7 h-7" />
                  <span className="text-[10px] font-black uppercase">
                    {isRecording ? 'Listening...' : 'Speak'}
                  </span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Great Cadence & Pitch Match!</span>
                  </div>
                  <button
                    onClick={handleFinishShadowing}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>{shadowIdx + 1 < shadowingSentences.length ? 'Next Sentence' : 'Complete Routine & Collect XP'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: Completion Screen */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-xl">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                  Daily Study Sequence Complete!
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  You completed reading, memory review, and shadowing drills today. Keep up the habit!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                  <span className="text-xl font-black text-stone-900 dark:text-white block">+50 XP</span>
                  <span className="text-[10px] text-stone-500 font-bold uppercase">Earned Today</span>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <Flame className="w-6 h-6 text-rose-500 mx-auto mb-1" />
                  <span className="text-xl font-black text-stone-900 dark:text-white block">{userProgress.streakDays} Days</span>
                  <span className="text-[10px] text-stone-500 font-bold uppercase">Active Streak</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-sm mx-auto py-3.5 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black text-sm transition-all cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
