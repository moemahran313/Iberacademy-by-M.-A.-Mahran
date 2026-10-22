export * from './curriculum';
export {
  NATURAL_ORDER_TENSE_MILESTONES,
  getTenseMilestoneById,
  isTenseUnlocked,
  validateTenseProgression,
  recordTenseMilestoneMastery,
  canBypassPrerequisitesViaPlacement
} from '../utils/tenseSequenceValidator';
export type {
  TenseMilestone,
  TenseUnlockEvaluation,
  TenseProgressionReport
} from '../utils/tenseSequenceValidator';
