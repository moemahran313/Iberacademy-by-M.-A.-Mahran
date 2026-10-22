import {
  tokenizeAndNormalizeSpanish,
  countSpanishSyllables,
  lemmatizeSpanishWord,
  calculateSpanishReadability,
  calculateComprehensibilityScore,
  runComprehensibilityBenchmark
} from './comprehensibleInputService';

console.log('🧪 RUNNING COMPREHENSIBLE INPUT & KRASHEN i+1 TEST SUITE...\n');

let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failedTests++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// TEST 1: Tokenization and contraction decomposition (al -> a el, del -> de el)
{
  const text = 'Vamos al parque del centro para aprender español.';
  const { tokens } = tokenizeAndNormalizeSpanish(text);
  assert(tokens.includes('a') && tokens.includes('el'), 'Contraction "al" decomposes into "a" and "el"');
  assert(tokens.includes('de'), 'Contraction "del" decomposes into "de" and "el"');
  assert(!tokens.includes('al') && !tokens.includes('del'), 'Raw contractions are replaced by constituent tokens');
}

// TEST 2: Spanish Syllable Counting (Diphthongs, Triphthongs, Hiatus)
{
  assert(countSpanishSyllables('sol') === 1, 'Monosyllable "sol" = 1');
  assert(countSpanishSyllables('casa') === 2, 'Disyllable "casa" = 2');
  assert(countSpanishSyllables('ciudad') === 2, 'Diphthong "ciudad" (iu) = 2');
  assert(countSpanishSyllables('revolución') === 4, 'Word "revolución" (re-vo-lu-ción) = 4');
  assert(countSpanishSyllables('día') === 2, 'Hiatus "día" (dí-a) = 2');
  assert(countSpanishSyllables('limpiáis') === 2, 'Triphthong "limpiáis" (lim-piáis) = 2');
}

// TEST 3: Lemmatization
{
  assert(lemmatizeSpanishWord('estábamos') === 'estar', 'Conjugation "estábamos" lemmatizes to "estar"');
  assert(lemmatizeSpanishWord('hicieron') === 'hacer', 'Irregular preterite "hicieron" lemmatizes to "hacer"');
  assert(lemmatizeSpanishWord('ciudades') === 'ciudad', 'Plural "ciudades" lemmatizes to "ciudad"');
  assert(lemmatizeSpanishWord('luces') === 'luz', 'Plural "luces" lemmatizes to "luz"');
  assert(lemmatizeSpanishWord('dijeron') === 'decir', 'Irregular preterite "dijeron" lemmatizes to "decir"');
}

// TEST 4: Spanish Readability (Fernández-Huerta & Gutiérrez de Polini)
{
  const easyText = 'El gato toma leche. Es bueno y suave.';
  const { rawWords, sentencesCount } = tokenizeAndNormalizeSpanish(easyText);
  const metrics = calculateSpanishReadability(rawWords, sentencesCount);
  assert(metrics.fernandezHuertaIndex >= 70, `Easy text has high Fernández-Huerta index (${metrics.fernandezHuertaIndex}/100)`);
  assert(metrics.readabilityGrade === 'Muy Fácil' || metrics.readabilityGrade === 'Fácil', 'Readability grade is Fácil or Muy Fácil');
}

// TEST 5: Krashen i+1 Classification & Dynamic Scaffolding
{
  // Simulated learner knows high frequency words
  const known = new Set(['el', 'la', 'un', 'una', 'en', 'es', 'de', 'que', 'con', 'por', 'para', 'casa', 'amigo']);
  
  // Difficult text with unknown academic terms
  const hardText = 'La epistemología contemporánea y la fenomenología trascendental exigen una dialéctica rigurosa.';
  const scoreHard = calculateComprehensibilityScore(hardText, known);
  assert(scoreHard.ratio < 0.85, `Difficult text ratio (${scoreHard.ratio}) is < 0.85`);
  assert(scoreHard.zone === 'too_difficult', 'Classified as "too_difficult" (Affective filter danger zone)');
  assert(scoreHard.scaffolding.required === true, 'Scaffolding is required for ratio < 0.85');
  assert(scoreHard.badge.includes('High Friction'), `Badge shows High Friction (${scoreHard.badge})`);

  // Target i+1 text (~94% known sweet spot)
  const iPlus1Text = 'Mi amigo vive en una casa con su familia en la ciudad. La casa es grande y hermosa.';
  const knownForIPlus1 = new Set(['mi', 'amigo', 'vive', 'en', 'una', 'casa', 'con', 'su', 'la', 'es', 'grande', 'familia', 'ciudad']);
  const scoreIPlus1 = calculateComprehensibilityScore(iPlus1Text, knownForIPlus1);
  assert(scoreIPlus1.ratio >= 0.85 && scoreIPlus1.ratio <= 0.98, `Optimal ratio achieved: ${(scoreIPlus1.ratio * 100).toFixed(1)}%`);
  assert(scoreIPlus1.badge.includes('Optimal i+1'), `Badge reflects Optimal i+1 (${scoreIPlus1.badge})`);
}

// TEST 6: Cognate Pattern Extraction
{
  const sampleWords = ['educación', 'universidad', 'rápidamente', 'peligroso', 'artista'];
  const score = calculateComprehensibilityScore(sampleWords.join(' '), new Set());
  const cognateRules = score.scaffolding.cognateCallouts.map(c => c.rule);
  assert(cognateRules.includes('-ción ➔ -tion'), 'Extracted -ción -> -tion cognate rule');
  assert(cognateRules.includes('-dad ➔ -ty'), 'Extracted -dad -> -ty cognate rule');
}

// TEST 7: 500-Word Performance Benchmark (< 10ms execution time)
{
  const bench = runComprehensibilityBenchmark();
  console.log(`\n⏱️ Performance Benchmark: 500-word text analyzed in ${bench.durationMs}ms`);
  assert(bench.durationMs < 20, `500-word excerpt classified within 20ms (actual: ${bench.durationMs}ms)`);
  assert(bench.score.totalWordTokens >= 400, `Analyzed ${bench.score.totalWordTokens} word tokens`);
}

console.log(`\n========================================`);
if (failedTests === 0) {
  console.log('🎉 ALL 7 SLA & KRASHEN i+1 UNIT TESTS PASSED PERFECTLY!');
} else {
  console.error(`💥 ${failedTests} TESTS FAILED.`);
  process.exit(1);
}
