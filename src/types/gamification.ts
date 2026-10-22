export interface ExplorationEnergy {
  current: number; // e.g. 100
  max: number; // 100
  rechargeRatePerMin: number;
  unlimitedLearningEnabled: true; // Invariant: user is never locked out of learning
}

export type FeedbackTone = 'success' | 'attention' | 'insight';

export interface ContrastiveExplanation {
  selectedToken: string;
  correctToken: string;
  ruleCategory: 'por_vs_para' | 'ser_vs_estar' | 'past_tense' | 'gender_number' | 'subjunctive' | 'lexical_choice' | 'general';
  contrastTitle: string;
  contrastRule: string;
  selectedContextNotice: string;
  correctContextNotice: string;
}

export interface ExerciseFeedbackState {
  status: 'idle' | 'success' | 'attention' | 'insight';
  title: string;
  message_en: string;
  message_ar?: string;
  contrastiveSnippet?: ContrastiveExplanation;
  canTryWithHint: boolean;
  hint?: string;
  nativeAudioModel?: string;
  energyDeducted: number; // 0 XP penalty, low exploration energy cost that auto-replenishes
}

export interface UserVoiceEcho {
  recordedAudioUrl: string | null;
  durationMs: number;
  isRecording: boolean;
  isPlayingEcho: boolean;
}
