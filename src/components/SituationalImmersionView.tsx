import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { SITUATIONAL_SCENARIOS, SituationalScenario, DialogueTurn, RoleplayOption } from '../data/situationalScenarios';
import { speakSpanish, soundEffects } from '../utils/audio';

export const SituationalImmersionView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SituationalScenario | null>(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<RoleplayOption | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startScenario = (scenario: SituationalScenario) => {
    setSelectedScenario(scenario);
    setCurrentTurnIndex(0);
    setUserScore(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCompleted(false);
    soundEffects.playPop();

    // Auto speak initial NPC line
    if (scenario.dialogue_turns.length > 0) {
      speakSpanish(scenario.dialogue_turns[0].npc_audio_script);
    }
  };

  const handleSelectOption = (option: RoleplayOption) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);
    setUserScore((prev) => prev + option.score_delta);

    if (option.quality === 'natural_polite') {
      soundEffects.playLevelUp();
    } else {
      soundEffects.playPop();
    }
  };

  const handleNextTurn = () => {
    if (!selectedScenario) return;

    if (currentTurnIndex + 1 < selectedScenario.dialogue_turns.length) {
      const nextIdx = currentTurnIndex + 1;
      setCurrentTurnIndex(nextIdx);
      setSelectedOption(null);
      setHasAnswered(false);
      
      // Auto speak next turn NPC script
      const nextTurn = selectedScenario.dialogue_turns[nextIdx];
      if (nextTurn) {
        speakSpanish(nextTurn.npc_audio_script);
      }
    } else {
      setIsCompleted(true);
      soundEffects.playLevelUp();
    }
  };

  const currentTurn: DialogueTurn | null = selectedScenario
    ? selectedScenario.dialogue_turns[currentTurnIndex]
    : null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase tracking-wide">
              🇲🇽 Berlitz Situational Immersion
            </span>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-2">
              Second-Person Interactive Roleplay Suite
            </h2>
          </div>
          {selectedScenario && (
            <button
              onClick={() => setSelectedScenario(null)}
              className="px-3.5 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Scenarios</span>
            </button>
          )}
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Step into authentic Mexican situations as the primary character. You must achieve real goals by navigating branching responses in street food orderings, Uber directions, hotel check-ins, and local market negotiations.
        </p>
      </div>

      {/* Scenario Selector Grid */}
      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SITUATIONAL_SCENARIOS.map((scen) => (
            <motion.div
              key={scen.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => startScenario(scen)}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{scen.emoji}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/50">
                      {scen.level} • {scen.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {scen.location_city}
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {scen.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                  📍 <strong>Setting:</strong> {scen.environment_setting}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 line-clamp-1 max-w-[80%]">
                  🎯 Goal: {scen.roleplay_goal}
                </span>
                <span className="font-black text-amber-500 flex items-center gap-1">
                  Start <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Active Roleplay Simulation Board */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 space-y-6 shadow-sm">
          {/* Scenario Overview Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-100 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedScenario.emoji}</span>
                <h3 className="text-base font-black text-stone-900 dark:text-white">
                  {selectedScenario.title}
                </h3>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-1">
                🎯 <strong>Active Mission Goal:</strong> {selectedScenario.roleplay_goal}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400">
                Turn {currentTurnIndex + 1} / {selectedScenario.dialogue_turns.length}
              </span>
              <div className="px-3 py-1 bg-amber-500 text-stone-950 font-black text-xs rounded-xl flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Score: {userScore} pts</span>
              </div>
            </div>
          </div>

          {!isCompleted && currentTurn ? (
            <div className="space-y-6">
              {/* NPC Statement Speech Bubble */}
              <div className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-stone-800 dark:to-stone-800/80 border border-amber-300/60 dark:border-stone-700 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {currentTurn.npc_speaker}
                  </span>
                  <button
                    onClick={() => speakSpanish(currentTurn.npc_audio_script)}
                    className="p-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg transition cursor-pointer"
                    title="Play Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-lg font-black text-stone-900 dark:text-white">
                  "{currentTurn.npc_line_es}"
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  🇬🇧 "{currentTurn.npc_line_en}"
                </p>
              </div>

              {/* User Task Prompt */}
              <div className="p-3 bg-amber-100/60 dark:bg-amber-950/40 rounded-xl border border-amber-300/40 dark:border-amber-800/40 text-xs font-bold text-amber-950 dark:text-amber-200">
                👉 <strong>Your Objective for Turn {currentTurnIndex + 1}:</strong> {currentTurn.user_prompt_context}
              </div>

              {/* Response Options */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase text-stone-400 tracking-wider block">
                  Choose Your Response in Spanish:
                </span>

                <div className="grid grid-cols-1 gap-3">
                  {currentTurn.options.map((option) => {
                    const isSelected = selectedOption?.id === option.id;
                    let borderStyle = 'border-stone-200 dark:border-stone-800 hover:border-amber-500';

                    if (hasAnswered) {
                      if (option.quality === 'natural_polite') {
                        borderStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20';
                      } else if (isSelected) {
                        borderStyle = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1.5 cursor-pointer disabled:cursor-default ${borderStyle}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-stone-900 dark:text-white">
                            🇪🇸 {option.option_es}
                          </span>
                          {hasAnswered && option.quality === 'natural_polite' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-emerald-500 text-stone-950">
                              ✅ Natural & Polite (+25 pts)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          🇬🇧 {option.option_en}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant Pedagogical Feedback */}
              <AnimatePresence>
                {hasAnswered && selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      selectedOption.quality === 'natural_polite'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                        : selectedOption.quality === 'grammatically_incorrect'
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-200'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedOption.quality === 'natural_polite' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <span className="font-black text-sm">
                        {selectedOption.quality === 'natural_polite'
                          ? 'Perfect Response!'
                          : selectedOption.quality === 'grammatically_incorrect'
                          ? 'Grammar Error Detected'
                          : 'Culturally Unnatural Phrase'}
                      </span>
                    </div>

                    <p className="text-xs font-medium">
                      🇲🇽 {selectedOption.feedback_es}
                    </p>
                    <p className="text-xs opacity-90">
                      🇬🇧 {selectedOption.feedback_en}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextTurn}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>{currentTurnIndex + 1 < selectedScenario.dialogue_turns.length ? 'Next Turn' : 'Finish Scenario'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Scenario Completion Summary Card */
            <div className="text-center py-8 space-y-4">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                Scenario Completed!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                You successfully navigated "{selectedScenario.title}" in real-time Mexican Spanish.
              </p>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl w-fit mx-auto font-mono font-black text-lg text-amber-900 dark:text-amber-300">
                Final Roleplay Score: {userScore} / {selectedScenario.dialogue_turns.length * 25} pts
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => startScenario(selectedScenario)}
                  className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Retry Scenario
                </button>
                <button
                  onClick={() => setSelectedScenario(null)}
                  className="px-4 py-2 bg-amber-500 text-stone-950 font-black text-xs rounded-xl transition cursor-pointer"
                >
                  Select Another Mission
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
