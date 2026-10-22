import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Volume2,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Exercise, CEFRLevel } from '../../types';
import { ExerciseFeedbackState, ExplorationEnergy, ContrastiveExplanation } from '../../types/gamification';
import { FeedbackBanner } from './FeedbackBanner';
import { soundEffects } from '../../utils/soundEffects';
import { speakSpanish } from '../../utils/audio';

interface ExerciseEngineProps {
  exercise: Exercise;
  cefrLevel?: CEFRLevel;
  onCorrectSubmit?: () => void;
  onAdvance?: () => void;
  advanceLabel?: string;
}

/**
 * Intelligent Contrastive Rule Matcher:
 * Generates specific linguistic contrast notices when a learner selects an intelligible distractor.
 */
function analyzeContrastiveError(selected: string, correct: string, promptText: string): ContrastiveExplanation | null {
  const sel = selected.trim().toLowerCase();
  const corr = correct.trim().toLowerCase();

  // 1. Por vs Para Contrast
  if ((sel === 'por' && corr === 'para') || (sel === 'para' && corr === 'por')) {
    return {
      selectedToken: selected,
      correctToken: correct,
      ruleCategory: 'por_vs_para',
      contrastTitle: 'Diferenciación Conceptual: "Por" vs "Para"',
      contrastRule: '"Para" apunta hacia el destino, receptor, fecha límite o propósito final (hacia dónde). "Por" denota la causa motivadora, duración, medio o intercambio (a través de / a causa de).',
      selectedContextNotice: sel === 'por'
        ? '"Por" señala causa motriz o duración. En esta oración no explicamos la causa, sino la finalidad o destinatario.'
        : '"Para" indica propósito o meta. En este contexto se requiere señalar la causa o el medio.',
      correctContextNotice: corr === 'para'
        ? '"Para" es necesario porque apunta al objetivo o receptor ("para aprender", "para ti").'
        : '"Por" es necesario porque señala la causa ("por la lluvia") o el medio ("por teléfono").'
    };
  }

  // 2. Ser vs Estar Contrast
  if (
    (sel.includes('es') && corr.includes('está')) ||
    (sel.includes('son') && corr.includes('están')) ||
    (sel.includes('era') && corr.includes('estaba')) ||
    (sel.includes('fue') && corr.includes('estuvo'))
  ) {
    return {
      selectedToken: selected,
      correctToken: correct,
      ruleCategory: 'ser_vs_estar',
      contrastTitle: 'Diferenciación Ontológica: "Ser" vs "Estar"',
      contrastRule: '"Ser" define la identidad esencial, origen, profesión y localización de eventos. "Estar" expresa el estado resultante de un cambio, condición de ánimo y localización física de objetos o personas.',
      selectedContextNotice: `"${selected}" pertenece a SER (identidad o característica inherente). Aquí describimos una condición, estado temporal o ubicación física.`,
      correctContextNotice: `"${correct}" pertenece a ESTAR, el cual refleja fielmente la condición circunstancial o lugar físico.`
    };
  }

  // 3. Pretérito Indefinido vs Imperfecto
  if (
    (sel.endsWith('aba') || sel.endsWith('ía') || sel.endsWith('aban') || sel.endsWith('ían')) &&
    (corr.endsWith('ó') || corr.endsWith('é') || corr.endsWith('ió') || corr.endsWith('ieron') || corr.endsWith('aron'))
  ) {
    return {
      selectedToken: selected,
      correctToken: correct,
      ruleCategory: 'past_tense',
      contrastTitle: 'Aspecto Temporal: Pretérito Indefinido vs Imperfecto',
      contrastRule: 'El Pretérito Imperfecto describe el escenario de fondo, hábitos pasados o acciones continuas sin límite definido. El Indefinido puntualiza un evento terminado que corta la narración.',
      selectedContextNotice: `"${selected}" es Imperfecto (describe continuidad o trasfondo).`,
      correctContextNotice: `"${correct}" es Indefinido (marca un hecho puntual concluido).`
    };
  }

  // 4. Gender / Number Agreement
  if (
    (sel.endsWith('o') && corr.endsWith('a')) ||
    (sel.endsWith('os') && corr.endsWith('as')) ||
    (sel.endsWith('a') && corr.endsWith('o'))
  ) {
    return {
      selectedToken: selected,
      correctToken: correct,
      ruleCategory: 'gender_number',
      contrastTitle: 'Concordancia de Género y Número',
      contrastRule: 'En español, los adjetivos y determinantes deben concordar en género (masculino/femenino) y número (singular/plural) con el sustantivo al que modifican.',
      selectedContextNotice: `"${selected}" tiene una terminación discordante con el sustantivo rector de la frase.`,
      correctContextNotice: `"${correct}" concuerda con exactitud morfológica.`
    };
  }

  // General fallthrough
  return {
    selectedToken: selected,
    correctToken: correct,
    ruleCategory: 'general',
    contrastTitle: 'Matiz Léxico y Contexto Comunicativo',
    contrastRule: 'Observa la función sintáctica y el significado contextual de la oración.',
    selectedContextNotice: `"${selected}" es una palabra válida pero no encaja con la colocación natural de esta oración.`,
    correctContextNotice: `"${correct}" completa el patrón nativo auténtico.`
  };
}

export const ExerciseEngine: React.FC<ExerciseEngineProps> = ({
  exercise,
  cefrLevel = 'A1',
  onCorrectSubmit,
  onAdvance,
  advanceLabel = 'Siguiente Ejercicio'
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [hasTriedWithHint, setHasTriedWithHint] = useState(false);
  const [showHintExplicitly, setShowHintExplicitly] = useState(false);

  // Exploration Energy Pool (Never locks user out, always recharges)
  const [energy, setEnergy] = useState<ExplorationEnergy>({
    current: 100,
    max: 100,
    rechargeRatePerMin: 15,
    unlimitedLearningEnabled: true
  });

  const [feedback, setFeedback] = useState<ExerciseFeedbackState>({
    status: 'idle',
    title: '',
    message_en: '',
    message_ar: '',
    canTryWithHint: false,
    energyDeducted: 0
  });

  const isMultipleChoice = exercise.options && exercise.options.length > 0;
  const isFillBlank = exercise.type === 'fill_blank' || exercise.type === 'translation';

  // Handle checking the user's answer with low affective filter feedback
  const handleCheck = () => {
    const rawAnswer = isMultipleChoice ? selectedOption : writtenAnswer;
    if (!rawAnswer) return;

    const isCorrect = rawAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    setIsChecked(true);

    if (isCorrect) {
      soundEffects.playCorrect();
      setFeedback({
        status: 'success',
        title: '¡Excelente! Active Recall Consolidado',
        message_en: exercise.explanation_en || 'Your selection perfectly matches native Spanish communicative usage.',
        message_ar: exercise.explanation_ar || 'إجابتك صحيحة ومطابقة للاستخدام اللغوي الأصيل.',
        nativeAudioModel: exercise.audioText || exercise.correctAnswer,
        canTryWithHint: false,
        energyDeducted: 0
      });
      if (onCorrectSubmit) {
        onCorrectSubmit();
      }
    } else {
      // Gentle attention chime (A4 -> C5) instead of abrasive buzzer
      soundEffects.playGentleChime();

      // Soft non-punitive energy cost (learner is never locked out)
      setEnergy(prev => ({
        ...prev,
        current: Math.max(10, prev.current - 5)
      }));

      const contrastive = analyzeContrastiveError(
        rawAnswer,
        exercise.correctAnswer,
        exercise.prompt_es || exercise.prompt_en
      );

      setFeedback({
        status: 'attention',
        title: '💡 Oportunidad de Aprendizaje y Contraste',
        message_en: `Notice the communicative distinction. Let's analyze why "${exercise.correctAnswer}" is preferred here.`,
        message_ar: `لاحظ الفرق الدلالي. دعنا نتأمل سبب تفضيل "${exercise.correctAnswer}" في هذا السياق.`,
        contrastiveSnippet: contrastive || undefined,
        canTryWithHint: true,
        hint: exercise.hints?.[0] || exercise.explanation_en,
        nativeAudioModel: exercise.audioText || exercise.correctAnswer,
        energyDeducted: 5
      });
    }
  };

  // 1-Click "Try with Hint" without XP penalty
  const handleTryWithHint = () => {
    setIsChecked(false);
    setSelectedOption(null);
    setHasTriedWithHint(true);
    setShowHintExplicitly(true);
    setFeedback({
      status: 'idle',
      title: '',
      message_en: '',
      canTryWithHint: false,
      energyDeducted: 0
    });
  };

  return (
    <div className="space-y-5">
      {/* 1. Header: Exploration Energy Pool (Zero lockouts, anti-anxiety) */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider text-[10px] bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            {cefrLevel}
          </span>
          <span className="text-stone-500 font-bold">
            {exercise.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Exploration Energy Indicator */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 font-bold"
          title="Energía de Exploración: ¡Nunca bloquea tu aprendizaje! Los errores son datos para la mente, no castigos."
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
          <span>Energía de Exploración: {energy.current}%</span>
        </div>
      </div>

      {/* 2. Prompt Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-2.5 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            {exercise.prompt_es && (
              <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                {exercise.prompt_es}
              </h3>
            )}
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
              🇬🇧 {exercise.prompt_en}
            </p>
            {exercise.prompt_ar && (
              <p className="text-xs text-amber-900/90 dark:text-amber-300/90 font-arabic pt-0.5" dir="rtl">
                🇦🇪 {exercise.prompt_ar}
              </p>
            )}
          </div>

          {exercise.audioText && (
            <button
              onClick={() => speakSpanish(exercise.audioText || '')}
              className="p-2.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-300 shadow-2xs border border-stone-200 dark:border-stone-700 transition cursor-pointer shrink-0"
              title="Escuchar audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Explicit Hint Callout when active */}
        {showHintExplicitly && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2"
          >
            <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Pista Guiada: </span>
              <span>{exercise.hints?.[0] || exercise.explanation_en}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. Interactive Inputs (Options or Text Entry) */}
      {isMultipleChoice ? (
        <div className="space-y-2.5">
          {exercise.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrectAnswer = opt.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();

            // Soft pastel button borders & backgrounds
            let btnClasses = 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 text-stone-800 dark:text-stone-200';

            if (isChecked) {
              if (isCorrectAnswer) {
                btnClasses = 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-extrabold shadow-xs';
              } else if (isSelected) {
                // Soft pastel amber attention styling instead of severe harsh red
                btnClasses = 'bg-amber-500/15 border-amber-500/80 text-amber-900 dark:text-amber-200 font-bold';
              } else {
                btnClasses = 'opacity-40 bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800';
              }
            } else if (isSelected) {
              btnClasses = 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/20 text-stone-900 dark:text-white font-bold';
            }

            return (
              <button
                key={idx}
                disabled={isChecked}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedOption(opt);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base cursor-pointer ${btnClasses}`}
              >
                <span>{opt}</span>
                {isChecked && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            disabled={isChecked}
            value={writtenAnswer}
            onChange={(e) => setWrittenAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && writtenAnswer.trim() && !isChecked) {
                handleCheck();
              }
            }}
            placeholder="Escribe tu respuesta en español..."
            className="w-full px-4 py-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-base focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>
      )}

      {/* 4. Feedback Banner (Pastel transitions, zero punishment) */}
      <AnimatePresence>
        {isChecked && (
          <FeedbackBanner
            feedback={feedback}
            onTryWithHint={feedback.canTryWithHint ? handleTryWithHint : undefined}
            onProceed={onAdvance}
            proceedLabel={advanceLabel}
          />
        )}
      </AnimatePresence>

      {/* 5. Check Button (if not yet checked) */}
      {!isChecked && (
        <div className="flex justify-end pt-2">
          <button
            disabled={isMultipleChoice ? !selectedOption : !writtenAnswer.trim()}
            onClick={handleCheck}
            className="px-6 py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 hover:opacity-90 disabled:opacity-40 text-white dark:text-stone-900 text-sm font-extrabold transition shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>Verificar Respuesta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
