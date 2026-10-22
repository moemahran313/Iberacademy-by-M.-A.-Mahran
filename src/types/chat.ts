import { TutorPersona, CEFRLevel } from './index';

/**
 * Michael Long's Interaction Hypothesis (1983, 1996)
 * Conversational Repair & Negotiation of Meaning Types:
 * - Clarification Request: Learner utterance is ambiguous or conflicting; tutor asks for elaboration.
 * - Confirmation Check: Tutor verifies understanding of learner's intended meaning, especially with loanwords/calques.
 * - Recast: Tutor implicitly reformulates non-target utterances into native phrasing while preserving discourse flow.
 * - Comprehension Check: Tutor checks whether the learner understood an opinion, idiom, or cultural insight.
 */
export type ConversationalRepairType =
  | 'clarification_request'
  | 'confirmation_check'
  | 'recast'
  | 'comprehension_check'
  | 'spontaneous_flow';

export interface ConversationalRepair {
  id: string;
  type: ConversationalRepairType;
  triggerSegment?: string;
  repairInSpanish: string;
  pedagogicalRationale_es: string;
  pedagogicalRationale_en: string;
  targetLinguisticFeature: string;
}

export interface BilingualTranslationChip {
  id: string;
  phrase_es: string;
  translation_en: string;
  translation_ar?: string;
  culturalNote?: string;
  isExpanded?: boolean;
}

export interface ComprehensionCheckItem {
  prompt_es: string;
  prompt_en: string;
  openEndedQuestion: string;
  suggestedAnswers?: string[];
}

export interface NegotiationLogEntry {
  turnIndex: number;
  userUtterance: string;
  tutorReply: string;
  repairsApplied: ConversationalRepair[];
  comprehensionCheck?: string;
  timestamp: string;
}

export interface NegotiationDialogueMetrics {
  totalTurns: number;
  clarificationRequestsCount: number;
  confirmationChecksCount: number;
  recastsCount: number;
  comprehensionChecksCount: number;
  immersionRatio: number; // 0.85 (A1-A2) or 1.0 (B1+)
  threeRepairsAchieved: boolean; // Acceptance Criteria: >= 3 distinct repair types per 10-turn dialogue
}

export interface TutorChatMessage {
  id: string;
  sender: 'user' | 'ai';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  phase?: string;
  timestamp: string;
  // Negotiation of Meaning extensions
  repair?: ConversationalRepair;
  repairsApplied?: ConversationalRepair[];
  comprehensionCheck?: ComprehensionCheckItem;
  translationChips?: BilingualTranslationChip[];
  vocabulary?: {
    word: string;
    en: string;
    ar?: string;
    contextSentence?: string;
  }[];
  followUpQuestions?: string[];
  feedbackBadge?: {
    type: 'correct' | 'warning' | 'tip' | 'analyzing' | 'negotiation';
    text: string;
    xpBonus?: number;
  };
  audioAutoPlayed?: boolean;
}
