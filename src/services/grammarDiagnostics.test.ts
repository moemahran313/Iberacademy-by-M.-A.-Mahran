import {
  tokenizeSpanishSentence,
  detectAgreementErrors,
  extractSyntacticGaps,
  generateSelfNoticingChecks,
  diagnoseProduction,
  PUSHED_OUTPUT_SCENARIOS
} from './grammarDiagnostics';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('🧪 RUNNING MERRILL SWAIN PUSHED-OUTPUT & GRAMMAR DIAGNOSTIC TEST SUITE...\n');

// 1. Test scenarios definition
assert(PUSHED_OUTPUT_SCENARIOS.length >= 4, 'At least 4 communicative scenarios provided');
const sevilleScenario = PUSHED_OUTPUT_SCENARIOS.find(s => s.id === 'scen_seville_pharmacy');
assert(!!sevilleScenario, 'Seville pharmacy scenario exists');
assert(sevilleScenario!.minWords === 15, 'Seville scenario requires minimum 15 words');
assert(sevilleScenario!.assistedLemmas.length === 3, 'Seville scenario provides exactly 3 assisted lemmas');

// 2. Tokenizer test
const testSentence = 'Buenos días, señor farmacéutico. Llevo tres días con un fuerte dolor de estómago y quisiera un antiácido suave.';
const tokens = tokenizeSpanishSentence(testSentence);
assert(tokens.length >= 15, `Tokenized 15+ words successfully (actual: ${tokens.length})`);
assert(tokens[0] === 'buenos', 'Tokenized lowercase normalized first word');

// 3. Agreement Error Detection: English duration calque ("dolor por tres dias")
const calqueText = 'Hola señor, yo tengo dolor por tres dias y quiero medicina rápida.';
const calqueDiagnostics = detectAgreementErrors(calqueText);
assert(calqueDiagnostics.length > 0, 'Detected duration calque or agreement issue');
const hasCalqueDiagnostic = calqueDiagnostics.some(d => d.type === 'calque_aspect');
assert(hasCalqueDiagnostic, 'Identified calque_aspect violation for "dolor por tres dias"');

// 4. Concordance Error Detection: Noun-Adjective Gender/Number mismatch
const genderMismatchText = 'Tengo un dolor aguda en el estómago y tomo una pastilla suave.';
const genderDiagnostics = detectAgreementErrors(genderMismatchText);
assert(genderDiagnostics.some(d => d.type === 'gender'), 'Identified gender mismatch in "dolor aguda"');

// 5. Syntactic Gap Extraction
const gaps = extractSyntacticGaps(calqueText, sevilleScenario!);
assert(gaps.length >= 2, `Extracted syntactic gaps between learner text and native model (found: ${gaps.length})`);

// 6. Merrill Swain Self-Noticing Checks Generation (Must provide 3 syntactic differences)
const checks = generateSelfNoticingChecks(calqueText, sevilleScenario!.nativeCorpusModels[0], sevilleScenario!);
assert(checks.length === 3, `Generated exactly 3 self-noticing checks (found: ${checks.length})`);
assert(checks[0].options.some(o => o.isCorrect), 'Check 1 contains valid correct option');
assert(checks[1].options.some(o => o.isCorrect), 'Check 2 contains valid correct option');
assert(checks[2].options.some(o => o.isCorrect), 'Check 3 contains valid correct option');

// 7. Full Production Diagnosis
const valid17WordLearnerText =
  'Buenos días farmacéutico, tengo dolor en el estómago desde el lunes y necesito una medicina suave para calmarme.';
const fullResult = diagnoseProduction(valid17WordLearnerText, sevilleScenario!, ['llevar / hace']);
assert(fullResult.wordCount >= 15, `Word count threshold calculated correctly (${fullResult.wordCount})`);
assert(fullResult.meetsWordCountMin === true, 'Meets word count minimum requirement');
assert(fullResult.primaryNativeModel.length > 20, 'Includes authentic native corpus model');
assert(fullResult.selfNoticingChecks.length === 3, 'Includes 3 gap-noticing interactive items');

console.log('\n========================================');
console.log('🎉 ALL PUSHED-OUTPUT & GRAMMAR DIAGNOSTIC TESTS PASSED PERFECTLY!');
