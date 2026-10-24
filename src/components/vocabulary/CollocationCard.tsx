import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { CollocationPairing } from '../../types/vocabulary';
import { generateClozeExercise } from '../../services/collocationService';
import { speakSpanish } from '../../utils/audio';

interface CollocationCardProps {
  collocations: CollocationPairing[];
  targetWord?: string;
  showClozeDrill?: boolean;
}

export const CollocationCard: React.FC<CollocationCardProps> = ({
  collocations,
  targetWord,
  showClozeDrill = true
}) => {
  const [selectedCollocationIdx, setSelectedCollocationIdx] = useState<number>(0);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState<string | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);

  if (!collocations || collocations.length === 0) {
    return null;
  }

  const currentCollocation = collocations[selectedCollocationIdx] || collocations[0];
  const cloze = currentCollocation ? generateClozeExercise(currentCollocation) : null;

  const handleSelectOption = (option: string) => {
    if (hasSubmittedAnswer) return;
    setUserSelectedAnswer(option);
    setHasSubmittedAnswer(true);
  };

  const handleResetCloze = (idx: number) => {
    setSelectedCollocationIdx(idx);
    setUserSelectedAnswer(null);
    setHasSubmittedAnswer(false);
  };

  const handlePlayAudio = (phrase: string) => {
    speakSpanish(phrase, 0.95);
  };

  return (
    <div className="bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-4 space-y-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Colocaciones Auténticas en Contexto</span>
        </div>
        <span className="text-[10px] font-bold text-amber-700/80 dark:text-amber-400/80 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full">
          {currentCollocation.typeLabelEs}
        </span>
      </div>

      {/* Selector pills if multiple collocations exist */}
      {collocations.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {collocations.map((col, idx) => (
            <button
              key={col.id}
              onClick={() => handleResetCloze(idx)}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                selectedCollocationIdx === idx
                  ? 'bg-amber-500 text-stone-950 shadow-2xs'
                  : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-amber-100 border border-amber-200/60 dark:border-amber-800/60'
              }`}
            >
              {col.phrase_es}
            </button>
          ))}
        </div>
      )}

      {/* Main Collocation Display */}
      <div className="bg-white/90 dark:bg-stone-900/80 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-stone-900 dark:text-stone-100">
            {currentCollocation.phrase_es}
          </span>
          <button
            onClick={() => handlePlayAudio(currentCollocation.phrase_es)}
            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 transition cursor-pointer"
            title="Escuchar pronunciación"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between flex-wrap gap-1">
          <span className="font-semibold">{currentCollocation.phrase_en}</span>
          {currentCollocation.phrase_ar && (
            <span className="font-arabic text-amber-800 dark:text-amber-300" dir="rtl">
              {currentCollocation.phrase_ar}
            </span>
          )}
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-400 italic pt-1 border-t border-stone-100 dark:border-stone-800">
          "{currentCollocation.example_es}"
        </p>
      </div>

      {/* In-Context Cloze Drill */}
      {showClozeDrill && cloze && (
        <div className="bg-amber-100/50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-2">
          <div className="text-[11px] font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Reto de Colocación (Completa el hueco):</span>
          </div>

          <p className="text-xs font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
            {cloze.sentenceWithBlank}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {cloze.options.map((opt, oIdx) => {
              const isSelected = userSelectedAnswer === opt;
              const isCorrect = opt.toLowerCase() === cloze.correctOption.toLowerCase();

              let btnStyle = 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-amber-200/80 dark:border-amber-800/80 hover:bg-amber-100';

              if (hasSubmittedAnswer) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 line-through';
                } else {
                  btnStyle = 'opacity-50 bg-stone-100 dark:bg-stone-800';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasSubmittedAnswer}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-1.5 ${btnStyle}`}
                >
                  {hasSubmittedAnswer && isCorrect && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {hasSubmittedAnswer && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {hasSubmittedAnswer && (
            <p className="text-[11px] text-stone-600 dark:text-stone-300 font-medium pt-1">
              {cloze.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
