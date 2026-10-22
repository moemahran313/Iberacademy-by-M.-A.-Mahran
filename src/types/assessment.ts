import { CEFRLevel } from './index';

export type { CEFRLevel };

export type SkillCategory = 'Grammar' | 'Vocabulary' | 'Reading' | 'Discourse';

export interface AssessmentItem {
  id: string;
  questionText: string;
  contextTranslation: string;
  options: string[];
  correctAnswerIndex: number;
  itemDifficulty: number; // b parameter (-3.0 to +3.0)
  discriminator: number;  // a parameter (usually ~1.7 for Rasch scaling)
  cefrEquivalent: CEFRLevel;
  skillCategory: SkillCategory;
  explanation: string;
}

export interface AdministeredItem {
  item: AssessmentItem;
  userAnswerIndex: number;
  isCorrect: boolean;
  thetaBefore: number;
  thetaAfter: number;
  semAfter: number;
  responseTimeSeconds: number;
}

export interface AbilityTrajectoryPoint {
  questionIndex: number; // 1-based
  itemId: string;
  theta: number;
  sem: number;
  ciLower: number;
  ciUpper: number;
  isCorrect: boolean;
  itemDifficulty: number;
}

export interface AssessmentState {
  currentTheta: number;
  currentSEM: number;
  administeredItems: AdministeredItem[];
  trajectory: AbilityTrajectoryPoint[];
  isComplete: boolean;
  startTime: number;
  totalTimeSeconds: number;
}

export interface CategoryPerformance {
  category: SkillCategory;
  total: number;
  correct: number;
  accuracy: number;
}

export interface AssessmentResult {
  finalTheta: number;
  finalSEM: number;
  cefrLevel: CEFRLevel;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  totalQuestions: number;
  totalTimeSeconds: number;
  accuracyPercentage: number;
  categoryBreakdown: Record<SkillCategory, CategoryPerformance>;
  recommendedFocusAreas: string[];
  trajectory: AbilityTrajectoryPoint[];
}
