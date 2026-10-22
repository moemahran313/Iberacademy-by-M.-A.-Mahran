import { CEFRLevel as BaseCEFRLevel } from './index';

export type CEFRLevel = BaseCEFRLevel | 'A0' | 'C1' | 'C2';

export interface ReadabilityMetrics {
  fernandezHuertaIndex: number; // 0 to 100+
  gutierrezPoliniIndex: number; // 0 to 100+
  compositeReadingEase: number; // 0 to 100 clamped
  readabilityGrade: 'Muy Fácil' | 'Fácil' | 'Adecuado' | 'Algo Difícil' | 'Difícil' | 'Muy Difícil';
  totalWords: number;
  totalSentences: number;
  totalSyllables: number;
  avgSentenceLength: number;
  avgSyllablesPerWord: number;
  avgLettersPerWord: number;
}

export interface ScaffoldingPackage {
  required: boolean;
  cognateCallouts: Array<{
    spanish: string;
    english: string;
    rule: string;
    context: string;
  }>;
  contextualGlosses: Array<{
    word: string;
    lemma: string;
    translation_en: string;
    translation_ar: string;
    pos?: string;
    cefr: CEFRLevel;
  }>;
  grammarHints: Array<{
    title: string;
    structure: string;
    explanation_en: string;
    explanation_ar: string;
  }>;
}

export interface TextAdvancementPackage {
  suggestedSynonyms: Array<{
    original: string;
    advanced: string;
    cefr: CEFRLevel;
    nuance: string;
  }>;
  subjunctiveTriggers: Array<{
    trigger: string;
    targetSentence: string;
    explanation: string;
  }>;
  regionalIdioms: Array<{
    idiom: string;
    region: string;
    meaning: string;
  }>;
}

export interface ComprehensibilityScore {
  ratio: number; // 0.0 to 1.0 (knownTokens / totalTokens)
  percentage: number; // 0 to 100
  targetWords: string[]; // 5-10% sweet spot target acquisition words
  unknownWords: string[]; // All unknown words detected
  knownWords: string[]; // Known words identified
  totalWordTokens: number;
  cefrDifficulty: CEFRLevel;
  readability: ReadabilityMetrics;
  zone: 'optimal_i_plus_1' | 'too_difficult' | 'too_easy';
  badge: string; // e.g., "Optimal i+1 (93% Known)" or "High Friction (78% Known - Scaffolding Enabled)"
  badgeColor: string; // Tailwind color classes
  scaffolding: ScaffoldingPackage;
  advancements?: TextAdvancementPackage;
}
