import React from 'react';
import { Volume2, HelpCircle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export interface ExerciseFooterProps {
  onCheckOrSubmit?: () => void;
  onNext?: () => void;
  onPlayAudio?: () => void;
  onShowHint?: () => void;
  submitLabel?: string;
  isSubmitted?: boolean;
  isCorrect?: boolean;
  isDisabled?: boolean;
  showAudioButton?: boolean;
  showHintButton?: boolean;
  feedbackMessage?: string;
}

export const ExerciseFooter: React.FC<ExerciseFooterProps> = ({
  onCheckOrSubmit,
  onNext,
  onPlayAudio,
  onShowHint,
  submitLabel = 'Comprobar Respuesta',
  isSubmitted = false,
  isCorrect = false,
  isDisabled = false,
  showAudioButton = false,
  showHintButton = false,
  feedbackMessage
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#181615]/95 backdrop-blur-md border-t border-stone-200/90 dark:border-stone-800/90 pb-safe pl-safe pr-safe pt-3 shadow-lg">
      <div className="max-w-3xl mx-auto space-y-3 px-4">
        {/* Feedback Alert Row */}
        {isSubmitted && feedbackMessage && (
          <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`} />
            <span className="flex-1">{feedbackMessage}</span>
          </div>
        )}

        {/* Action Controls Row (Every Interactive Trigger Has min-h-[48px] and min-w-[48px] Target) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {showAudioButton && onPlayAudio && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  onPlayAudio();
                }}
                className="flex items-center justify-center min-h-[48px] min-w-[48px] p-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition cursor-pointer border border-stone-200 dark:border-stone-700"
                title="Escuchar audio"
                aria-label="Escuchar audio"
              >
                <Volume2 className="w-5 h-5 text-[#C85A32] dark:text-[#E07A5F]" />
              </button>
            )}

            {showHintButton && onShowHint && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  onShowHint();
                }}
                className="flex items-center justify-center min-h-[48px] min-w-[48px] p-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition cursor-pointer border border-stone-200 dark:border-stone-700"
                title="Pista"
                aria-label="Pista"
              >
                <HelpCircle className="w-5 h-5 text-amber-500" />
              </button>
            )}
          </div>

          {/* Primary Submit / Next Button (48px Height Enforced) */}
          <button
            type="button"
            disabled={isDisabled && !isSubmitted}
            onClick={() => {
              soundEffects.playPop();
              if (isSubmitted && onNext) {
                onNext();
              } else if (onCheckOrSubmit) {
                onCheckOrSubmit();
              }
            }}
            className={`flex-1 min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitted
                ? isCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#C85A32] hover:bg-[#b34f2a] text-white'
                : 'bg-[#C85A32] hover:bg-[#b34f2a] text-white'
            }`}
          >
            <span>{isSubmitted ? 'Siguiente Pregunta' : submitLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
