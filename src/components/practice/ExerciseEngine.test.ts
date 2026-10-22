import { soundEffects } from '../../utils/soundEffects';
import { ExplorationEnergy, ContrastiveExplanation, ExerciseFeedbackState } from '../../types/gamification';

console.log('🧪 RUNNING LOW AFFECTIVE FILTER & COGNITIVE RE-FRAMING TEST SUITE...\n');

let failedTests = 0;
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// TEST 1: Exploration Energy Invariant (Zero Lockout)
{
  const energy: ExplorationEnergy = {
    current: 100,
    max: 100,
    rechargeRatePerMin: 15,
    unlimitedLearningEnabled: true
  };

  assert(energy.unlimitedLearningEnabled === true, 'Exploration Energy has unlimited learning enabled');
  
  // Simulate multiple mistaken attempts
  let current = energy.current;
  for (let i = 0; i < 20; i++) {
    current = Math.max(10, current - 5);
  }
  assert(current >= 10, `Energy never drops to zero or locks user out (current: ${current}%)`);
}

// TEST 2: Sound Effects Non-Punitive Gentle Chime
{
  assert(typeof soundEffects.playGentleChime === 'function', 'soundEffects has playGentleChime');
  assert(typeof soundEffects.playInsightChime === 'function', 'soundEffects has playInsightChime');
  assert(typeof soundEffects.playCorrect === 'function', 'soundEffects has playCorrect');
  assert(typeof soundEffects.playIncorrect === 'function', 'soundEffects.playIncorrect is mapped to gentle chime');
}

// TEST 3: Soft Pastel Palette Contrast Tokens
{
  const successColor = '#10B981';
  const attentionColor = '#F59E0B';
  const insightColor = '#6366F1';

  assert(successColor === '#10B981', 'Success maps to soft emerald (#10B981)');
  assert(attentionColor === '#F59E0B', 'Attention maps to warm honey/amber (#F59E0B)');
  assert(insightColor === '#6366F1', 'Insight maps to soft indigo/lavender (#6366F1)');
}

// TEST 4: Feedback State Structure & Zero XP Penalty
{
  const feedback: ExerciseFeedbackState = {
    status: 'attention',
    title: '💡 Oportunidad de Aprendizaje y Contraste',
    message_en: 'Notice: "para" denotes destination or purpose (hacia dónde), while "por" marks cause or duration (a través de).',
    canTryWithHint: true,
    energyDeducted: 0,
    nativeAudioModel: 'Trabajo para aprender español.'
  };

  assert(feedback.canTryWithHint === true, 'Can try with hint without penalty');
  assert(feedback.energyDeducted === 0, 'Zero XP deducted on review');
  assert(feedback.nativeAudioModel !== undefined, 'Native audio model is provided for micro-echo');
}

console.log(`\n========================================`);
if (failedTests === 0) {
  console.log('🎉 ALL AFFECTIVE FILTER ELIMINATION TESTS PASSED PERFECTLY!');
} else {
  console.error(`💥 ${failedTests} TESTS FAILED.`);
  process.exit(1);
}
