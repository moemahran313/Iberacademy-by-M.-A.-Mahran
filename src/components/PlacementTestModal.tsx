import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { PLACEMENT_QUESTIONS } from '../data';
import { soundEffects } from '../utils/audio';

interface PlacementTestModalProps {
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  onClose,
  userProgress,
  setUserProgress
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [assessedLevel, setAssessedLevel] = useState<CEFRLevel>('A1');

  const question = PLACEMENT_QUESTIONS[currentIdx];
  const total = PLACEMENT_QUESTIONS.length;

  const handleSelectOption = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    soundEffects.playFlip();

    if (currentIdx + 1 < total) {
      setCurrentIdx(prev => prev + 1);
    } else {
      calculateResult({ ...answers, [currentIdx]: optIdx });
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let score = 0;
    PLACEMENT_QUESTIONS.forEach((q, i) => {
      if (finalAnswers[i] === q.correctIdx) score++;
    });

    let level: CEFRLevel = 'A1';
    if (score >= 9) level = 'B2';
    else if (score >= 6) level = 'B1';
    else if (score >= 3) level = 'A2';
    else level = 'A1';

    setAssessedLevel(level);
    setIsFinished(true);
    soundEffects.playLevelUp();
  };

  const handleApplyLevel = () => {
    setUserProgress(prev => ({
      ...prev,
      currentLevel: assessedLevel,
      xp: prev.xp + 100
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
              CEFR Spanish Diagnostic Placement Test
            </h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 font-bold">
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div className="space-y-5">
            <div className="flex justify-between text-xs font-bold text-stone-400">
              <span>Question {currentIdx + 1} of {total}</span>
              <span className="uppercase text-amber-600 font-black">Level {question.level} Target</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
              />
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <p className="text-base font-extrabold text-stone-900">
                {question.question_es}
              </p>
              <p className="text-xs text-stone-500">
                🇬🇧 {question.question_en} • <span className="font-arabic" dir="rtl">{question.question_ar}</span>
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {question.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className="text-left p-3.5 rounded-xl text-sm font-bold bg-white hover:bg-amber-50 hover:border-amber-400 border border-stone-200 text-stone-800 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-2xl font-black shadow-inner">
              {assessedLevel}
            </div>
            <h3 className="text-2xl font-black text-stone-900">
              Recommended Placement: Level {assessedLevel}
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Based on your diagnostic score, we recommend starting your learning path at level <strong>{assessedLevel}</strong> for the optimal challenge and acquisition rate.
            </p>

            <div className="pt-4 flex gap-2 justify-center">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setAnswers({});
                  setIsFinished(false);
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs hover:bg-stone-50"
              >
                Retake Test
              </button>
              <button
                onClick={handleApplyLevel}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition"
              >
                Set Level to {assessedLevel} (+100 XP)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
