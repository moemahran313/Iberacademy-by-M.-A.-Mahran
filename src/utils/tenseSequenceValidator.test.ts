import {
  NATURAL_ORDER_TENSE_MILESTONES,
  isTenseUnlocked,
  validateTenseProgression,
  recordTenseMilestoneMastery,
  getTenseMilestoneById,
  canBypassPrerequisitesViaPlacement
} from './tenseSequenceValidator';
import { UserProgress } from '../types';

console.log('🧪 RUNNING KRASHEN NATURAL ORDER HYPOTHESIS TENSE TEST SUITE...\n');

let failedTests = 0;
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

const mockBaseProgress: UserProgress = {
  currentLevel: 'A1',
  streakDays: 3,
  lastActiveDate: '2026-10-22',
  xp: 150,
  completedLessonIds: ['lesson-1', 'lesson-2'],
  savedWordIds: [],
  masteredWordIds: [],
  srsData: {},
  settings: {
    nativeLanguage: 'en',
    audioSpeed: 0.9,
    theme: 'dark',
    dailyGoalMinutes: 15
  }
};

// TEST 1: All 8 Empirical Natural Order Levels are Present in Exact Sequence
{
  assert(NATURAL_ORDER_TENSE_MILESTONES.length === 8, 'Exactly 8 developmental milestones defined');
  const levelNumbers = NATURAL_ORDER_TENSE_MILESTONES.map(m => m.levelNumber);
  assert(JSON.stringify(levelNumbers) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]), 'Levels ordered strictly 1 through 8');
  assert(NATURAL_ORDER_TENSE_MILESTONES[0].id === 'level_1_present', 'Level 1 is Presente de Indicativo');
  assert(NATURAL_ORDER_TENSE_MILESTONES[3].id === 'level_4_past_contrast', 'Level 4 is Contraste Indefinido vs Imperfecto');
  assert(NATURAL_ORDER_TENSE_MILESTONES[5].id === 'level_6_present_subjunctive', 'Level 6 is Presente de Subjuntivo');
  assert(NATURAL_ORDER_TENSE_MILESTONES[7].id === 'level_8_imperfect_subjunctive', 'Level 8 is Imperfecto de Subjuntivo');
}

// TEST 2: Level 1 is Unlocked by Default
{
  const evalL1 = isTenseUnlocked('level_1_present', mockBaseProgress);
  assert(evalL1.unlocked === true, 'Level 1 Presente is unlocked by default for new learners');
}

// TEST 3: Subjunctive (Level 6) is STRICTLY LOCKED without Past Tense Contrast Mastery (Level 4 >= 85%)
{
  const evalSubjunctive = isTenseUnlocked('level_6_present_subjunctive', mockBaseProgress);
  assert(evalSubjunctive.unlocked === false, 'Present Subjunctive is LOCKED for beginner profile');
  assert(evalSubjunctive.cognitiveLockReason !== undefined, 'Cognitive lock explanation is provided');
  assert(evalSubjunctive.cognitiveLockReason!.includes('Indefinido vs Imperfecto'), 'Cognitive lock reason references past tense contrast');
  assert(evalSubjunctive.missingPrerequisites.some(p => p.id === 'level_4_past_contrast'), 'Level 4 is flagged as a missing prerequisite');
}

// TEST 4: Automated Prerequisite Gate Unlocking
{
  // User masters levels 1, 2, 3, 4 (with 90% >= 85%), and level 5
  let advancedProgress = recordTenseMilestoneMastery(mockBaseProgress, 'level_1_present', 95);
  advancedProgress = recordTenseMilestoneMastery(advancedProgress, 'level_2_progressive_future', 90);
  advancedProgress = recordTenseMilestoneMastery(advancedProgress, 'level_3_preterite_perfect', 88);
  advancedProgress = recordTenseMilestoneMastery(advancedProgress, 'level_4_past_contrast', 92); // Passed with 92% >= 85%
  advancedProgress = recordTenseMilestoneMastery(advancedProgress, 'level_5_imperative', 85);

  const evalSubjunctiveAfterPass = isTenseUnlocked('level_6_present_subjunctive', advancedProgress);
  assert(evalSubjunctiveAfterPass.unlocked === true, 'Subjunctive unlocks once past contrast is stabilized (92% >= 85%)');
}

// TEST 5: Insufficient Mastery on Level 4 Blocks Subjunctive
{
  // User scored only 70% on past contrast (needs 85%)
  let weakPastProgress = recordTenseMilestoneMastery(mockBaseProgress, 'level_4_past_contrast', 70);
  weakPastProgress = recordTenseMilestoneMastery(weakPastProgress, 'level_5_imperative', 85);

  const evalSubjunctiveWeak = isTenseUnlocked('level_6_present_subjunctive', weakPastProgress);
  assert(evalSubjunctiveWeak.unlocked === false, 'Subjunctive remains locked when past contrast score is only 70% (needs 85%)');
}

// TEST 6: Timestamp Storage in User Profile
{
  const updatedProgress = recordTenseMilestoneMastery(mockBaseProgress, 'level_4_past_contrast', 88);
  const record = updatedProgress.tenseMilestoneMastery?.['level_4_past_contrast'];
  assert(record !== undefined, 'Milestone mastery record is stored in profile');
  assert(record?.score === 88, 'Score 88% is preserved');
  assert(record?.passed === true, 'Passed flag is true');
  assert(typeof record?.completedAt === 'string', 'Timestamp completedAt is stored as ISO string');
}

// TEST 7: Full Progression Report & Subjunctive Gating Flag
{
  const report = validateTenseProgression(mockBaseProgress);
  assert(report.isSubjunctiveGated === true, 'Report flags isSubjunctiveGated as true for beginner');
  assert(report.pastTenseContrastStabilized === false, 'Report flags pastTenseContrastStabilized as false');
}

console.log(`\n========================================`);
if (failedTests === 0) {
  console.log('🎉 ALL 7 NATURAL ORDER HYPOTHESIS TESTS PASSED PERFECTLY!');
} else {
  console.error(`💥 ${failedTests} TESTS FAILED.`);
  process.exit(1);
}
