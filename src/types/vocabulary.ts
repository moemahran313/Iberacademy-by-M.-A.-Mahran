import { CEFRLevel } from './index';

// 5-Stage Acquisition Lifecycle (LingQ & SM-2 Methodology)
// Stage 0: New / Unsaved (Blue background highlight)
// Stage 1: Just Saved / Learning (Interval 1 day - Soft Amber highlight)
// Stage 2: Recognized / Review (Interval 3 days - Light Amber tint)
// Stage 3: Familiar / Recall (Interval 7 days - Very faint yellow underline)
// Stage 4: Near Mastery (Interval 14 days - Dotted green underline)
// Stage 5: Mastered / Known (Interval 60+ days - Clean text appearance / No highlight)
export type AcquisitionStage = 0 | 1 | 2 | 3 | 4 | 5;

export interface StageMetadata {
  stage: AcquisitionStage;
  label: string;
  labelEs: string;
  nominalIntervalDays: number;
  description: string;
  visualClass: string;
  badgeBg: string;
  badgeText: string;
}

export const STAGE_CONFIGS: Record<AcquisitionStage, StageMetadata> = {
  0: {
    stage: 0,
    label: 'New / Unread',
    labelEs: 'Nueva / No guardada',
    nominalIntervalDays: 0,
    description: 'Palabra aún no guardada en el sistema de repetición espaciada.',
    visualClass: 'bg-sky-100/90 dark:bg-sky-950/70 text-sky-950 dark:text-sky-100 rounded px-0.5 border-b-2 border-sky-400',
    badgeBg: 'bg-sky-500/15',
    badgeText: 'text-sky-700 dark:text-sky-300'
  },
  1: {
    stage: 1,
    label: 'Just Saved / Learning',
    labelEs: 'Nivel 1: Guardada / Aprendiendo',
    nominalIntervalDays: 1,
    description: 'Palabra recién guardada. Revisión diaria.',
    visualClass: 'bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 rounded px-0.5 border-b-2 border-amber-500 shadow-2xs',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-800 dark:text-amber-300'
  },
  2: {
    stage: 2,
    label: 'Recognized / Review',
    labelEs: 'Nivel 2: Reconocida',
    nominalIntervalDays: 3,
    description: 'Reconocida en contexto. Intervalo de 3 días.',
    visualClass: 'bg-amber-100/60 dark:bg-amber-950/40 text-stone-900 dark:text-stone-100 rounded px-0.5 border-b border-amber-400/80',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-700 dark:text-amber-400'
  },
  3: {
    stage: 3,
    label: 'Familiar / Recall',
    labelEs: 'Nivel 3: Familiar',
    nominalIntervalDays: 7,
    description: 'Familiar con significado rápido. Intervalo de 7 días.',
    visualClass: 'text-stone-900 dark:text-stone-100 underline decoration-amber-300/80 dark:decoration-amber-500/60 decoration-1 underline-offset-3',
    badgeBg: 'bg-yellow-500/15',
    badgeText: 'text-yellow-700 dark:text-yellow-400'
  },
  4: {
    stage: 4,
    label: 'Near Mastery',
    labelEs: 'Nivel 4: Casi Dominada',
    nominalIntervalDays: 14,
    description: 'Comprensión casi automática. Intervalo de 14 a 30 días.',
    visualClass: 'text-stone-900 dark:text-stone-100 underline decoration-dotted decoration-emerald-500/80 decoration-2 underline-offset-4',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-700 dark:text-emerald-400'
  },
  5: {
    stage: 5,
    label: 'Mastered / Known',
    labelEs: 'Nivel 5: Dominada / Sabida',
    nominalIntervalDays: 60,
    description: 'Internalizada por completo. Aspecto limpio sin resaltado.',
    visualClass: 'text-stone-900 dark:text-stone-100',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-800 dark:text-emerald-300'
  }
};

// SuperMemo-2 (SM-2) Quality Ratings
// 1 = Blackout (Complete failure, interval reset to 1d)
// 2 = Hard (Hesitant recall, minor interval increment)
// 3 = Good (Normal recall with acceptable effort)
// 4 = Easy (Instant effortless recall, ease factor bonus)
export type SRSReviewQuality = 1 | 2 | 3 | 4;

export interface SM2State {
  easinessFactor: number; // default 2.5, min 1.3
  interval: number; // in days
  repetitions: number;
  stage: AcquisitionStage;
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedDate?: string; // YYYY-MM-DD
}

// Multi-Word Expression (MWE) Structures
export type MWECategory =
  | 'compound_preposition'  // e.g. "a pesar de que", "con respecto a", "a través de"
  | 'phrasal_expression'    // e.g. "dar de alta", "echar de menos", "tener ganas de"
  | 'idiom'                 // e.g. "por si las moscas", "tomar el pelo", "costar un ojo de la cara"
  | 'collocation_verb'      // e.g. "prestar atención", "hacer una pregunta", "tomar una decisión"
  | 'discursive_marker';    // e.g. "en primer lugar", "a fin de cuentas", "por consiguiente"

export interface MultiWordExpression {
  id: string;
  phrase_es: string; // e.g. "por si las moscas"
  phrase_en: string; // e.g. "just in case"
  phrase_ar: string; // e.g. "احتياطاً / تحسباً لأي طارئ"
  category: MWECategory;
  categoryLabel: string;
  cefr: CEFRLevel;
  constituentTokensCount: number; // e.g. 4
  example_es: string;
  example_en: string;
  example_ar: string;
  notes?: string;
}

export interface MWEMatch {
  mwe: MultiWordExpression;
  tokenIds: string[];
  startTokenIndex: number;
  endTokenIndex: number;
  matchedText: string;
}

export interface MultiTokenSelection {
  tokenIds: string[];
  cleanWords: string[];
  combinedPhrase: string;
  sentenceIndex: number;
  fullSentence: string;
  rect?: DOMRect;
}

// Collocation Pairings
export type CollocationType = 'verb_noun' | 'noun_adj' | 'prep_verb';

export interface CollocationPairing {
  id: string;
  targetWord: string;
  partnerWord: string;
  collocationType: CollocationType;
  typeLabelEs: string;
  phrase_es: string; // e.g. "tomar una decisión"
  phrase_en: string; // e.g. "to make a decision"
  phrase_ar: string; // e.g. "اتخاذ قرار"
  example_es: string;
  example_en: string;
  example_ar: string;
  clozeSentence?: string; // "Siempre debemos reflexionar antes de _______ una decisión importante."
  correctOption?: string; // "tomar"
  distractors?: string[]; // ["hacer", "dar", "poner"]
}
