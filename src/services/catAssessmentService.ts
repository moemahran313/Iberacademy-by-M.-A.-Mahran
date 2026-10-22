import { ASSESSMENT_ITEM_BANK } from '../data/assessmentItemBank';
import {
  AssessmentItem,
  AdministeredItem,
  AbilityTrajectoryPoint,
  AssessmentState,
  AssessmentResult,
  CEFRLevel,
  SkillCategory,
  CategoryPerformance
} from '../types/assessment';

const SCALING_FACTOR_A = 1.7;
const INITIAL_THETA = 0.0; // Baseline intermediate expectation
const STOPPING_SEM_THRESHOLD = 0.32;
const MAX_QUESTIONS = 20;
const MIN_QUESTIONS = 5;

/**
 * Rasch 1PL Probability formula: P(theta) = 1 / (1 + exp(-1.7 * (theta - b)))
 */
export function calculateProbability(theta: number, itemDifficulty: number): number {
  const exponent = -SCALING_FACTOR_A * (theta - itemDifficulty);
  return 1 / (1 + Math.exp(exponent));
}

/**
 * Fisher Information for a single item at current theta:
 * I(theta) = a^2 * P(theta) * (1 - P(theta))
 */
export function calculateItemInformation(theta: number, itemDifficulty: number): number {
  const p = calculateProbability(theta, itemDifficulty);
  return SCALING_FACTOR_A * SCALING_FACTOR_A * p * (1 - p);
}

/**
 * Total Fisher Information across all administered items
 */
export function calculateTotalInformation(theta: number, administered: AdministeredItem[]): number {
  if (administered.length === 0) return 0.0001; // Avoid divide by zero
  return administered.reduce((sum, item) => {
    return sum + calculateItemInformation(theta, item.item.itemDifficulty);
  }, 0);
}

/**
 * Standard Error of Measurement (SEM) = 1 / sqrt(Total Information)
 */
export function calculateSEM(theta: number, administered: AdministeredItem[]): number {
  const infoSum = calculateTotalInformation(theta, administered);
  if (infoSum <= 0) return 1.0;
  return 1 / Math.sqrt(infoSum);
}

/**
 * Update ability estimate theta using Newton-Raphson Maximum Likelihood Estimation (MLE)
 */
export function updateThetaMLE(currentTheta: number, administered: AdministeredItem[]): number {
  if (administered.length === 0) return INITIAL_THETA;

  const allCorrect = administered.every(a => a.isCorrect);
  const allIncorrect = administered.every(a => !a.isCorrect);

  // Fallback step for extreme response vectors (pure MLE diverges to +- infinity when 100% or 0%)
  if (allCorrect) {
    return Math.min(3.8, currentTheta + 0.55);
  }
  if (allIncorrect) {
    return Math.max(-3.8, currentTheta - 0.55);
  }

  // Newton-Raphson iteration
  let theta = currentTheta;
  const maxIterations = 10;
  const tolerance = 0.001;

  for (let iter = 0; iter < maxIterations; iter++) {
    let scoreDerivative = 0; // L'(theta)
    let infoSum = 0;          // L''(theta) / Fisher Information

    for (const record of administered) {
      const p = calculateProbability(theta, record.item.itemDifficulty);
      const u = record.isCorrect ? 1 : 0;
      scoreDerivative += SCALING_FACTOR_A * (u - p);
      infoSum += SCALING_FACTOR_A * SCALING_FACTOR_A * p * (1 - p);
    }

    if (infoSum <= 0.00001) break;

    const delta = scoreDerivative / infoSum;
    // Bound single step delta to +/- 0.85 to maintain numerical convergence
    const boundedDelta = Math.max(-0.85, Math.min(0.85, delta));
    theta += boundedDelta;

    if (Math.abs(boundedDelta) < tolerance) break;
  }

  // Bound overall theta within realistic limits
  return Math.max(-3.8, Math.min(3.8, theta));
}

/**
 * Select next item maximizing Fisher Information I_j(theta) among unadministered items.
 * Breaks ties by balancing skill category representation.
 */
export function selectNextItem(
  currentTheta: number,
  administered: AdministeredItem[]
): AssessmentItem | null {
  const administeredIds = new Set(administered.map(a => a.item.id));
  const candidateItems = ASSESSMENT_ITEM_BANK.filter(item => !administeredIds.has(item.id));

  if (candidateItems.length === 0) return null;

  // Calculate skill category frequencies in administered list to balance categories
  const categoryCounts: Record<SkillCategory, number> = {
    Grammar: 0,
    Vocabulary: 0,
    Reading: 0,
    Discourse: 0
  };
  administered.forEach(a => {
    categoryCounts[a.item.skillCategory] = (categoryCounts[a.item.skillCategory] || 0) + 1;
  });

  // Score candidate items based on Information and Category Balance Bonus
  let bestItem: AssessmentItem = candidateItems[0];
  let maxScore = -Infinity;

  for (const item of candidateItems) {
    const info = calculateItemInformation(currentTheta, item.itemDifficulty);
    // Give slight preference to under-represented categories
    const categoryCount = categoryCounts[item.skillCategory] || 0;
    const categoryBalanceBonus = 0.05 / (1 + categoryCount);
    
    const totalScore = info + categoryBalanceBonus;

    if (totalScore > maxScore) {
      maxScore = totalScore;
      bestItem = item;
    }
  }

  return bestItem;
}

/**
 * Map theta score to CEFR Level according to exact specifications
 */
export function mapThetaToCEFR(theta: number): CEFRLevel {
  if (theta < -1.8) return 'A0';
  if (theta < -0.6) return 'A1';
  if (theta < 0.4) return 'A2';
  if (theta < 1.4) return 'B1';
  if (theta < 2.2) return 'B2';
  return 'C1';
}

/**
 * Check if CAT exam stopping rule is satisfied
 */
export function shouldStopCAT(administered: AdministeredItem[], currentSEM: number): boolean {
  if (administered.length >= MAX_QUESTIONS) return true;
  if (administered.length < MIN_QUESTIONS) return false;
  return currentSEM < STOPPING_SEM_THRESHOLD;
}

/**
 * Initialize new CAT Assessment State
 */
export function initializeAssessmentState(): AssessmentState {
  return {
    currentTheta: INITIAL_THETA,
    currentSEM: 1.0,
    administeredItems: [],
    trajectory: [],
    isComplete: false,
    startTime: Date.now(),
    totalTimeSeconds: 0
  };
}

/**
 * Process a user response and calculate updated state
 */
export function processUserResponse(
  state: AssessmentState,
  item: AssessmentItem,
  userAnswerIndex: number,
  responseTimeSeconds: number
): AssessmentState {
  const isCorrect = userAnswerIndex === item.correctAnswerIndex;
  const thetaBefore = state.currentTheta;

  const tempAdministered: AdministeredItem = {
    item,
    userAnswerIndex,
    isCorrect,
    thetaBefore,
    thetaAfter: thetaBefore,
    semAfter: state.currentSEM,
    responseTimeSeconds
  };

  const updatedAdministered = [...state.administeredItems, tempAdministered];
  const thetaAfter = updateThetaMLE(thetaBefore, updatedAdministered);
  const semAfter = calculateSEM(thetaAfter, updatedAdministered);

  // Update last administered item record with final theta and SEM after step
  updatedAdministered[updatedAdministered.length - 1].thetaAfter = thetaAfter;
  updatedAdministered[updatedAdministered.length - 1].semAfter = semAfter;

  // Calculate 95% Confidence Interval band (theta +/- 1.96 * SEM)
  const ciLower = Math.max(-4.0, thetaAfter - 1.96 * semAfter);
  const ciUpper = Math.min(4.0, thetaAfter + 1.96 * semAfter);

  const trajectoryPoint: AbilityTrajectoryPoint = {
    questionIndex: updatedAdministered.length,
    itemId: item.id,
    theta: Math.round(thetaAfter * 100) / 100,
    sem: Math.round(semAfter * 100) / 100,
    ciLower: Math.round(ciLower * 100) / 100,
    ciUpper: Math.round(ciUpper * 100) / 100,
    isCorrect,
    itemDifficulty: item.itemDifficulty
  };

  const updatedTrajectory = [...state.trajectory, trajectoryPoint];
  const isComplete = shouldStopCAT(updatedAdministered, semAfter);
  const totalTimeSeconds = Math.round((Date.now() - state.startTime) / 1000);

  return {
    currentTheta: thetaAfter,
    currentSEM: semAfter,
    administeredItems: updatedAdministered,
    trajectory: updatedTrajectory,
    isComplete,
    startTime: state.startTime,
    totalTimeSeconds
  };
}

/**
 * Generate complete assessment result breakdown
 */
export function generateAssessmentResult(state: AssessmentState): AssessmentResult {
  const finalTheta = state.currentTheta;
  const finalSEM = state.currentSEM;
  const cefrLevel = mapThetaToCEFR(finalTheta);

  const totalQuestions = state.administeredItems.length;
  const correctCount = state.administeredItems.filter(a => a.isCorrect).length;
  const accuracyPercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Category performance breakdown
  const categoryMap: Record<SkillCategory, { total: number; correct: number }> = {
    Grammar: { total: 0, correct: 0 },
    Vocabulary: { total: 0, correct: 0 },
    Reading: { total: 0, correct: 0 },
    Discourse: { total: 0, correct: 0 }
  };

  state.administeredItems.forEach(a => {
    const cat = a.item.skillCategory;
    categoryMap[cat].total += 1;
    if (a.isCorrect) {
      categoryMap[cat].correct += 1;
    }
  });

  const categoryBreakdown: Record<SkillCategory, CategoryPerformance> = {
    Grammar: {
      category: 'Grammar',
      total: categoryMap.Grammar.total,
      correct: categoryMap.Grammar.correct,
      accuracy: categoryMap.Grammar.total > 0 ? Math.round((categoryMap.Grammar.correct / categoryMap.Grammar.total) * 100) : 0
    },
    Vocabulary: {
      category: 'Vocabulary',
      total: categoryMap.Vocabulary.total,
      correct: categoryMap.Vocabulary.correct,
      accuracy: categoryMap.Vocabulary.total > 0 ? Math.round((categoryMap.Vocabulary.correct / categoryMap.Vocabulary.total) * 100) : 0
    },
    Reading: {
      category: 'Reading',
      total: categoryMap.Reading.total,
      correct: categoryMap.Reading.correct,
      accuracy: categoryMap.Reading.total > 0 ? Math.round((categoryMap.Reading.correct / categoryMap.Reading.total) * 100) : 0
    },
    Discourse: {
      category: 'Discourse',
      total: categoryMap.Discourse.total,
      correct: categoryMap.Discourse.correct,
      accuracy: categoryMap.Discourse.total > 0 ? Math.round((categoryMap.Discourse.correct / categoryMap.Discourse.total) * 100) : 0
    }
  };

  // Generate recommended focus areas
  const recommendedFocusAreas: string[] = [];
  if (categoryBreakdown.Grammar.accuracy < 70) {
    recommendedFocusAreas.push('Grammar concord & verb mood structures (Ser/Estar, Subjunctive triggers)');
  }
  if (categoryBreakdown.Vocabulary.accuracy < 70) {
    recommendedFocusAreas.push('Targeted CEFR lexical depth and idiomatic collocations');
  }
  if (categoryBreakdown.Reading.accuracy < 70) {
    recommendedFocusAreas.push('Textual comprehension & syntactic agreement parsing');
  }
  if (categoryBreakdown.Discourse.accuracy < 70) {
    recommendedFocusAreas.push('Pragmatic turn-taking & discourse cohesion markers');
  }

  if (recommendedFocusAreas.length === 0) {
    recommendedFocusAreas.push('Advanced C1/C2 pragmatic nuances and classical literature analysis');
  }

  return {
    finalTheta: Math.round(finalTheta * 100) / 100,
    finalSEM: Math.round(finalSEM * 100) / 100,
    cefrLevel,
    confidenceInterval: {
      lower: Math.round(Math.max(-4.0, finalTheta - 1.96 * finalSEM) * 100) / 100,
      upper: Math.round(Math.min(4.0, finalTheta + 1.96 * finalSEM) * 100) / 100
    },
    totalQuestions,
    totalTimeSeconds: state.totalTimeSeconds,
    accuracyPercentage,
    categoryBreakdown,
    recommendedFocusAreas,
    trajectory: state.trajectory
  };
}
