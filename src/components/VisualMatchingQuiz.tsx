import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Eye, Sparkles, Zap, EyeOff } from 'lucide-react';
import { VISUAL_ASSOCIATION_ENGINE, VisualAssociationItem, VisualCardOption } from '../data/visualAssociationEngine';
import { speakSpanish, soundEffects } from '../utils/audio';

export const VisualMatchingQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zeroEnglishMode, setZeroEnglishMode] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<VisualCardOption | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentItem: VisualAssociationItem = VISUAL_ASSOCIATION_ENGINE[currentIndex];

  const handleSelect = (option: VisualCardOption) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);

    if (option.is_correct) {
      setScore((prev) => prev + 20);
      setStreak((prev) => prev + 1);
      soundEffects.playLevelUp();
    } else {
      setStreak(0);
      soundEffects.playPop();
    }

    speakSpanish(option.label_es);
  };

  const handleNext = () => {
    if (currentIndex + 1 < VISUAL_ASSOCIATION_ENGINE.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setHasAnswered(false);
      speakSpanish(VISUAL_ASSOCIATION_ENGINE[nextIdx].prompt_audio_es);
    } else {
      setIsCompleted(true);
      soundEffects.playLevelUp();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCompleted(false);
    speakSpanish(VISUAL_ASSOCIATION_ENGINE[0].prompt_audio_es);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Rosetta Stone Visual Engine
              </span>
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                0% English Direct Comprehension
              </span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-2">
              Intuitive Visual-Context Association Drills
            </h2>
          </div>

          {/* Zero-English Immersion Toggle */}
          <button
            onClick={() => setZeroEnglishMode(!zeroEnglishMode)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition flex items-center gap-2 cursor-pointer border shadow-xs ${
              zeroEnglishMode
                ? 'bg-amber-500 text-stone-950 border-amber-400'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
            }`}
          >
            {zeroEnglishMode ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Zero-English Mode: ACTIVE</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show English Hint</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Bypass mental translation bottlenecks by matching spoken and written Spanish prompts directly to visual scenes, actions, and spatial relationships.
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 space-y-6 shadow-xs">
          {/* Top Status Bar */}
          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-300">
                {currentItem.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {currentItem.grammar_focus}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono font-bold text-xs">
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Streak: {streak}
              </span>
              <div className="px-3 py-1 bg-amber-500 text-stone-950 font-black rounded-xl flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>{score} pts</span>
              </div>
            </div>
          </div>

          {/* Audio & Target Prompt Card */}
          <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl text-center space-y-3">
            <span className="text-[10px] font-mono font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider block">
              🎧 Escucha y selecciona la imagen correcta:
            </span>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => speakSpanish(currentItem.prompt_audio_es)}
                className="p-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-2xl transition shadow-md cursor-pointer flex items-center gap-2 font-black text-sm"
              >
                <Volume2 className="w-5 h-5" />
                <span>Escuchar</span>
              </button>

              <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-wide">
                "{currentItem.prompt_target_es}"
              </h3>
            </div>

            {!zeroEnglishMode && currentItem.prompt_target_en && (
              <p className="text-xs text-stone-400 font-mono">
                🇬🇧 English hint: "{currentItem.prompt_target_en}"
              </p>
            )}
          </div>

          {/* 4-Card Visual Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentItem.options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              let borderStyle = 'border-stone-200 dark:border-stone-800 hover:border-amber-500';

              if (hasAnswered) {
                if (option.is_correct) {
                  borderStyle = 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20';
                } else if (isSelected && !option.is_correct) {
                  borderStyle = 'border-rose-500 ring-2 ring-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20';
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={hasAnswered}
                  onClick={() => handleSelect(option)}
                  className={`p-5 rounded-2xl border transition-all text-left space-y-3 cursor-pointer disabled:cursor-default ${borderStyle}`}
                >
                  <div className={`p-6 rounded-xl bg-gradient-to-br ${option.visual_bg_gradient} flex justify-center items-center text-4xl shadow-xs`}>
                    <span>{option.visual_emoji}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
                      <span>{option.label_es}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(option.label_es);
                      }}
                      className="p-1 bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 rounded-lg text-stone-500 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                    🖼️ {option.visual_description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          <AnimatePresence>
            {hasAnswered && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-5 rounded-2xl border space-y-2 ${
                  selectedOption.is_correct
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedOption.is_correct ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-500" />
                    )}
                    <span className="font-black text-sm">
                      {selectedOption.is_correct ? '¡Correcto! (+20 pts)' : 'Incorrecto'}
                    </span>
                  </div>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-medium">
                  💡 {currentItem.explanation_es}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Completion Card */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-stone-900 dark:text-white">
            Visual Drills Completed!
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            You internalized key grammar structures directly through high-contrast visual associations with 0% English translation overhead.
          </p>

          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl w-fit mx-auto font-mono font-black text-lg text-amber-900 dark:text-amber-300">
            Final Visual Association Score: {score} pts
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition flex items-center gap-2 mx-auto cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Visual Practice</span>
          </button>
        </div>
      )}
    </div>
  );
};
