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
  badge: string;
  badgeColor: string;
  scaffolding: ScaffoldingPackage;
  advancements?: TextAdvancementPackage;
}

export interface Competencies {
  canDoStatement: string;
  canDoStatement_en: string;
  canDoStatement_ar: string;
  grammarPoints: string[];
  vocabularySize: number;
  communicativeOutcome?: string;
  culturalNote?: string;
  pragmaticFocus?: string;
}

export interface CurriculumNode {
  id: string;
  cefrLevel: CEFRLevel;
  title: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  prerequisiteNodeIds: string[];
  estimatedMinutes: number;
  competencies: Competencies;
  category: 'phonetics' | 'grammar' | 'communicative' | 'pragmatics' | 'culture' | 'literature' | 'stylistics';
}

export type NodeStatus = 'completed' | 'unlocked' | 'locked';

export interface LevelGraphProgress {
  level: CEFRLevel;
  totalNodes: number;
  completedNodes: number;
  unlockedNodes: number;
  percentage: number;
}

