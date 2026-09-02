import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  ChevronLeft,
  Zap,
  HelpCircle,
  Lightbulb,
  Check,
  X
} from 'lucide-react';
import { A0_BEGINNER_UNITS, A0Unit, MicroDrill } from '../data/a0BeginnerFoundation';
import { speakSpanish, soundEffects } from '../utils/audio';
import { triggerConfettiBurst } from '../utils/confetti';

interface A0BeginnerFoundationViewProps {
  onAddXp?: (amount: number) => void;
  onBackToDashboard?: () => void;
}

export const A0BeginnerFoundationView: React.FC<A0BeginnerFoundationViewProps> = ({
  onAddXp,
  onBackToDashboard
}) => {
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [completedUnitIds, setCompletedUnitIds] = useState<string[]>([]);
  const [unitStep, setUnitStep] = useState<'anchors' | 'ladder' | 'jargon' | 'drills' | 'completed'>('anchors');
  
  // Drill state
  const [currentDrillIndex, setCurrentDrillIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);

  const activeUnit: A0Unit | undefined = A0_BEGINNER_UNITS.find(u => u.unit_id === activeUnitId);

  const handleStartUnit = (unitId: string) => {
    soundEffects.playPop();
    setActiveUnitId(unitId);
    setUnitStep('anchors');
    setCurrentDrillIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
  };

  const handleNextStepFromAnchors = () => {
    soundEffects.playPop();
    setUnitStep('ladder');
  };

  const handleNextStepFromLadder = () => {
    soundEffects.playPop();
    setUnitStep('jargon');
  };

  const handleStartDrills = () => {
    soundEffects.playPop();
    setUnitStep('drills');
    setCurrentDrillIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  const handleAnswerDrill = (option: string) => {
    if (isAnswered || !activeUnit) return;
    const currentDrill: MicroDrill = activeUnit.micro_drills[currentDrillIndex];
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option.trim().toLowerCase() === currentDrill.correct_answer.trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleNextDrill = () => {
    soundEffects.playPop();
    if (!activeUnit) return;

    if (currentDrillIndex < activeUnit.micro_drills.length - 1) {
      setCurrentDrillIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      // Unit Completed!
      soundEffects.playLevelUp();
      triggerConfettiBurst();
      if (!completedUnitIds.includes(activeUnit.unit_id)) {
        setCompletedUnitIds(prev => [...prev, activeUnit.unit_id]);
      }
      if (onAddXp) {
        onAddXp(100);
      }
      setUnitStep('completed');
    }
  };

  const handleNextUnit = () => {
    soundEffects.playPop();
    if (!activeUnitId) return;
    const currentIndex = A0_BEGINNER_UNITS.findIndex(u => u.unit_id === activeUnitId);
    if (currentIndex >= 0 && currentIndex < A0_BEGINNER_UNITS.length - 1) {
      handleStartUnit(A0_BEGINNER_UNITS[currentIndex + 1].unit_id);
    } else {
      setActiveUnitId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-stone-800 dark:text-stone-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-amber-500/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-extrabold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Absolute Zero (A0) Foundation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-white">
            Spanish Zero-To-Hero Scaffold
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl font-medium">
            25 zero-jargon micro-units built for total beginners. Master sound anchors, progressive chunk ladders, and survival sentence building without intimidating grammar rules.
          </p>
        </div>

        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs z-10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!activeUnit ? (
        /* Unit Selection Grid */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Foundational Units ({completedUnitIds.length}/{A0_BEGINNER_UNITS.length} Complete)</span>
            </h2>
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
              {Math.round((completedUnitIds.length / A0_BEGINNER_UNITS.length) * 100)}% Mastered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {A0_BEGINNER_UNITS.map((unit, index) => {
              const isCompleted = completedUnitIds.includes(unit.unit_id);
              return (
                <motion.div
                  key={unit.unit_id}
                  whileHover={{ y: -3 }}
                  onClick={() => handleStartUnit(unit.unit_id)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden ${
                    isCompleted
                      ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50 dark:bg-emerald-500/10'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{unit.emoji}</span>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
                      }`}>
                        {isCompleted ? '✓ Done' : `Unit ${index + 1}`}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-stone-900 dark:text-white leading-snug">
                      {unit.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {unit.category} • {unit.anchor_words.length} Key Words
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-extrabold text-amber-600 dark:text-amber-400">
                    <span>Start Micro-Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Unit Player View */
        <div className="space-y-6">
          {/* Active Unit Header */}
          <div className="flex items-center justify-between bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setActiveUnitId(null)}
              className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>All A0 Units</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-lg">{activeUnit.emoji}</span>
              <span className="font-black text-sm text-stone-900 dark:text-white">{activeUnit.title}</span>
            </div>

            <div className="flex items-center gap-1">
              {(['anchors', 'ladder', 'jargon', 'drills'] as const).map((stepKey, idx) => (
                <div
                  key={stepKey}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    unitStep === stepKey
                      ? 'bg-amber-500 ring-2 ring-amber-500/30'
                      : (['anchors', 'ladder', 'jargon', 'drills'].indexOf(unitStep) > idx)
                      ? 'bg-emerald-500'
                      : 'bg-stone-200 dark:bg-stone-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Sound & Vocabulary Anchors */}
            {unitStep === 'anchors' && (
              <motion.div
                key="anchors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                    <span>Step 1 of 4</span>
                    <span>•</span>
                    <span>Micro-Sound Recognition & Anchors</span>
                  </div>
                  <h2 className="text-xl font-black text-stone-900 dark:text-white">
                    Listen & Tap the Sound Anchors
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Tap each card to hear Mexican Spanish pronunciation, IPA phonetic guide, and instant meaning.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeUnit.anchor_words.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => speakSpanish(item.word, 0.9)}
                      className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 hover:border-amber-500/60 transition cursor-pointer flex flex-col justify-between space-y-3 relative group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{item.emoji}</span>
                        <button className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-stone-900 dark:text-white">{item.word}</h3>
                        <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                          {item.phonetic_guide} <span className="text-stone-400 dark:text-stone-500 font-normal">({item.ipa})</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
                        <span>{item.translation}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={handleNextStepFromAnchors}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition"
                  >
                    <span>Next: Chunk Building Ladder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Progressive Chunk Building Ladder */}
            {unitStep === 'ladder' && (
              <motion.div
                key="ladder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                    <span>Step 2 of 4</span>
                    <span>•</span>
                    <span>4-Step Chunk Building Ladder</span>
                  </div>
                  <h2 className="text-xl font-black text-stone-900 dark:text-white">
                    Watch 1 Word Expand into a Full Survival Sentence
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    See how phrases build step-by-step. Tap the audio button on any step to listen.
                  </p>
                </div>

                <div className="space-y-4">
                  {activeUnit.chunk_building_ladder.map((stepItem, idx) => (
                    <motion.div
                      key={stepItem.step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                          {stepItem.step}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-stone-900 dark:text-white">
                              {stepItem.text_es}
                            </span>
                            <button
                              onClick={() => speakSpanish(stepItem.audio_text, 0.9)}
                              className="p-1 rounded-lg hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-pointer"
                              title="Listen"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            {stepItem.text_en}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                            {stepItem.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={handleNextStepFromLadder}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition"
                  >
                    <span>Next: Zero-Jargon Rule Hack</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Zero-Jargon Explanation */}
            {unitStep === 'jargon' && (
              <motion.div
                key="jargon"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                    <span>Step 3 of 4</span>
                    <span>•</span>
                    <span>Zero-Jargon Language Hack</span>
                  </div>
                  <h2 className="text-xl font-black text-stone-900 dark:text-white">
                    The Plain-English Rule Takeaway
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    No academic terms. Just the instant practical key to remember.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-black text-sm">
                    <Lightbulb className="w-5 h-5" />
                    <span>Key Takeaway:</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed">
                    "{activeUnit.zero_jargon_explanation}"
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={handleStartDrills}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition"
                  >
                    <span>Start Micro-Drills (6 Interactive Challenges)</span>
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Interactive Micro-Drills */}
            {unitStep === 'drills' && (
              <motion.div
                key="drills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 shadow-2xs"
              >
                {/* Drill Header Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="text-amber-600 dark:text-amber-400">
                      Drill {currentDrillIndex + 1} of {activeUnit.micro_drills.length}
                    </span>
                    <span className="text-stone-400">Score: {score}</span>
                  </div>

                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${((currentDrillIndex + 1) / activeUnit.micro_drills.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Drill Challenge */}
                {activeUnit.micro_drills[currentDrillIndex] && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                        <span>{activeUnit.micro_drills[currentDrillIndex].prompt}</span>
                        {activeUnit.micro_drills[currentDrillIndex].audio_text && (
                          <button
                            onClick={() => speakSpanish(activeUnit.micro_drills[currentDrillIndex].audio_text!, 0.9)}
                            className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </h3>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeUnit.micro_drills[currentDrillIndex].options.map((opt, idx) => {
                        const isSelected = selectedOption === opt;
                        const isCorrectOpt = opt.trim().toLowerCase() === activeUnit.micro_drills[currentDrillIndex].correct_answer.trim().toLowerCase();

                        let buttonStyles = "bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 hover:border-amber-500/60 text-stone-900 dark:text-white";

                        if (isAnswered) {
                          if (isCorrectOpt) {
                            buttonStyles = "bg-emerald-500/20 border-emerald-500/60 text-emerald-900 dark:text-emerald-100 font-extrabold";
                          } else if (isSelected && !isCorrectOpt) {
                            buttonStyles = "bg-rose-500/20 border-rose-500/60 text-rose-900 dark:text-rose-100 font-extrabold";
                          }
                        }

                        return (
                          <motion.button
                            key={idx}
                            whileHover={!isAnswered ? { scale: 1.01 } : {}}
                            whileTap={!isAnswered ? { scale: 0.99 } : {}}
                            onClick={() => handleAnswerDrill(opt)}
                            disabled={isAnswered}
                            className={`p-4 rounded-2xl border text-left font-bold text-sm flex items-center justify-between transition cursor-pointer ${buttonStyles}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrectOpt && <Check className="w-5 h-5 text-emerald-500" />}
                            {isAnswered && isSelected && !isCorrectOpt && <X className="w-5 h-5 text-rose-500" />}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Box */}
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border ${
                          isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                        }`}
                      >
                        <p className="text-xs font-bold leading-relaxed">
                          {activeUnit.micro_drills[currentDrillIndex].explanation}
                        </p>
                      </motion.div>
                    )}

                    {/* Action Next Button */}
                    <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={handleNextDrill}
                        disabled={!isAnswered}
                        className={`px-6 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg transition ${
                          isAnswered
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <span>{currentDrillIndex < activeUnit.micro_drills.length - 1 ? 'Next Drill' : 'Complete Unit'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 5: Unit Completion Screen */}
            {unitStep === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 text-center space-y-6 shadow-2xs"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                    Unit Mastered! +100 XP
                  </h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium max-w-md mx-auto">
                    You completed <span className="font-extrabold text-stone-900 dark:text-white">{activeUnit.title}</span> with zero academic jargon!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveUnitId(null)}
                    className="px-5 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-extrabold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
                  >
                    All Units
                  </button>

                  <button
                    onClick={handleNextUnit}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition"
                  >
                    <span>Next A0 Unit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
