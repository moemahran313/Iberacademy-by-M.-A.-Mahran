import { AcquisitionStage, SRSReviewQuality, SM2State } from '../types/vocabulary';

/**
 * SuperMemo-2 (SM-2) Spaced Repetition Scheduling Algorithm.
 * Implements empirical interval calculation, easiness factor adjustment,
 * and 5-stage vocabulary acquisition lifecycle transitions.
 */

export const DEFAULT_EASINESS_FACTOR = 2.5;
export const MIN_EASINESS_FACTOR = 1.3;

/**
 * Calculate the next review date as YYYY-MM-DD from today + interval days.
 */
export function calculateNextReviewDate(intervalDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + Math.max(1, intervalDays));
  return date.toISOString().split('T')[0];
}

/**
 * Compute the corresponding acquisition stage (0-5) based on interval and repetitions.
 */
export function determineStageFromInterval(interval: number, repetitions: number): AcquisitionStage {
  if (interval >= 60) return 5; // Mastered / Known
  if (interval >= 14 || repetitions >= 4) return 4; // Near Mastery
  if (interval >= 7 || repetitions >= 3) return 3; // Familiar / Recall
  if (interval >= 3 || repetitions >= 2) return 2; // Recognized / Review
  if (interval >= 1) return 1; // Just Saved / Learning
  return 0; // New / Unsaved
}

/**
 * Process an SM-2 review rating and return updated spaced repetition state.
 * Quality ratings:
 * 1 = Blackout (Complete failure, reset interval to 1 day)
 * 2 = Hard (Hesitant recall, minimal progression)
 * 3 = Good (Successful recall with acceptable effort)
 * 4 = Easy (Effortless recall, interval & easiness factor bonus)
 */
export function calculateSM2Review(
  currentState: {
    easinessFactor?: number;
    interval?: number;
    repetitions?: number;
    stage?: AcquisitionStage;
  },
  rating: SRSReviewQuality
): SM2State {
  const ef = currentState.easinessFactor || DEFAULT_EASINESS_FACTOR;
  const currentInterval = currentState.interval || 1;
  const repetitions = currentState.repetitions || 0;

  // Map 1-4 rating to SM-2 scale (2 to 5 equivalent)
  // Rating 1 -> SM-2 quality 2 (fail)
  // Rating 2 -> SM-2 quality 3 (hard pass)
  // Rating 3 -> SM-2 quality 4 (good pass)
  // Rating 4 -> SM-2 quality 5 (easy pass)
  const sm2Quality = rating === 1 ? 2 : rating === 2 ? 3 : rating === 3 ? 4 : 5;

  // 1. Calculate new Easiness Factor (EF)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEf = ef + (0.1 - (5 - sm2Quality) * (0.08 + (5 - sm2Quality) * 0.02));
  if (newEf < MIN_EASINESS_FACTOR) {
    newEf = MIN_EASINESS_FACTOR;
  }

  let nextInterval: number;
  let nextRepetitions: number;

  // 2. Calculate interval and repetitions based on quality
  if (rating === 1) {
    // Blackout / Fail: reset repetitions and schedule for tomorrow
    nextRepetitions = 0;
    nextInterval = 1;
  } else if (rating === 2) {
    // Hard: advance minimally
    nextRepetitions = repetitions + 1;
    nextInterval = repetitions === 0 ? 1 : repetitions === 1 ? 2 : Math.max(3, Math.round(currentInterval * 1.2));
  } else if (rating === 3) {
    // Good: standard SM-2 exponential interval expansion
    nextRepetitions = repetitions + 1;
    if (repetitions === 0) {
      nextInterval = 1;
    } else if (repetitions === 1) {
      nextInterval = 3;
    } else if (repetitions === 2) {
      nextInterval = 7;
    } else if (repetitions === 3) {
      nextInterval = 14;
    } else {
      nextInterval = Math.round(currentInterval * newEf);
    }
  } else {
    // Easy: bonus interval progression
    nextRepetitions = repetitions + 1;
    if (repetitions === 0) {
      nextInterval = 3;
    } else if (repetitions === 1) {
      nextInterval = 7;
    } else if (repetitions === 2) {
      nextInterval = 14;
    } else {
      nextInterval = Math.round(currentInterval * newEf * 1.3);
    }
  }

  const stage = determineStageFromInterval(nextInterval, nextRepetitions);
  const nextReviewDate = calculateNextReviewDate(nextInterval);
  const today = new Date().toISOString().split('T')[0];

  return {
    easinessFactor: Math.round(newEf * 100) / 100,
    interval: nextInterval,
    repetitions: nextRepetitions,
    stage,
    nextReviewDate,
    lastReviewedDate: today
  };
}

/**
 * Directly transition word to a designated stage (1 to 5)
 * Useful for in-reader 1-5 keyboard shortcuts or direct status clicks.
 */
export function transitionToStage(stage: AcquisitionStage): SM2State {
  const nominalIntervals: Record<AcquisitionStage, number> = {
    0: 0,
    1: 1,
    2: 3,
    3: 7,
    4: 14,
    5: 60
  };

  const interval = nominalIntervals[stage];
  const repetitions = stage === 0 ? 0 : stage;

  return {
    easinessFactor: DEFAULT_EASINESS_FACTOR,
    interval,
    repetitions,
    stage,
    nextReviewDate: calculateNextReviewDate(interval),
    lastReviewedDate: new Date().toISOString().split('T')[0]
  };
}
