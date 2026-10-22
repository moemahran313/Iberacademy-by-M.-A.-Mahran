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

// ==========================================
// WRITING EVALUATION ENGINE TYPES (CEFR/DELE)
// ==========================================

export type WritingGenre =
  | 'email_formal'
  | 'email_informal'
  | 'opinion_essay'
  | 'argumentative_article'
  | 'dele_b1_tarea1'
  | 'dele_b2_tarea1'
  | 'dele_c1_tarea1';

export interface WritingTask {
  id: string;
  title: string;
  cefrTarget: CEFRLevel;
  genre: WritingGenre;
  genreLabel: string;
  minWords: number;
  maxWords: number;
  promptText: string;
  contextDescription: string;
  bulletPoints: string[];
  targetConnectors: string[];
  sampleTitle?: string;
}

export type ScoreLevel = 0 | 1 | 2 | 3;
export type ScoreLabel = 'Insuficiente' | 'En desarrollo' | 'Competente' | 'Excelente';

export interface DimensionFeedback {
  dimensionKey: 'adecuacion' | 'coherencia' | 'gramatica' | 'lexico';
  title: string;
  titleEs: string;
  score: ScoreLevel; // 0 to 3 points
  scoreLabel: ScoreLabel;
  description: string;
  positivePoints: string[];
  improvements: string[];
}

export type AnnotationType = 'green' | 'amber' | 'red';

export interface InlineAnnotation {
  id: string;
  text: string;
  startIndex: number;
  endIndex: number;
  type: AnnotationType; // green = rich vocabulary/structures, amber = repetitive/overused phrasing, red = grammar/agreement/preposition error
  category: string; // e.g. "Riqueza Léxica", "Uso de Conectores", "Repetición de Verbo", "Error de Concordancia", "Preposición"
  explanation: string;
  correction?: string;
  ruleTip?: string;
}

export interface WritingAssessmentResult {
  id: string;
  taskId: string;
  taskTitle: string;
  essayText: string;
  wordCount: number;
  wordCountCompliant: boolean;
  wordCountWarning?: string;
  overallScore: number; // 0 to 100
  totalPoints: number; // 0 to 12
  estimatedCefrLevel: CEFRLevel;
  dimensions: {
    adecuacion: DimensionFeedback;
    coherencia: DimensionFeedback;
    gramatica: DimensionFeedback;
    lexico: DimensionFeedback;
  };
  annotations: InlineAnnotation[];
  summaryFeedback: string;
  strengths: string[];
  keyRecommendations: string[];
  connectorsDetected: string[];
  repetitiveWordsFound: string[];
  evaluatedAt: string;
}

