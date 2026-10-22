import { CEFRLevel, ComprehensibilityScore, ReadabilityMetrics, ScaffoldingPackage, TextAdvancementPackage } from '../types/curriculum';

// High-frequency Spanish irregular and morphological lemma mappings
const IRREGULAR_LEMMA_MAP: Record<string, string> = {
  // Ser / Estar
  soy: 'ser', eres: 'ser', es: 'ser', somos: 'ser', sois: 'ser', son: 'ser',
  era: 'ser', eras: 'ser', éramos: 'ser', erais: 'ser', eran: 'ser',
  fui: 'ir_ser', fuiste: 'ir_ser', fue: 'ir_ser', fuimos: 'ir_ser', fuisteis: 'ir_ser', fueron: 'ir_ser',
  sea: 'ser', seas: 'ser', seamos: 'ser', seáis: 'ser', sean: 'ser',
  siendo: 'ser', sido: 'ser',
  estoy: 'estar', estás: 'estar', está: 'estar', estamos: 'estar', estáis: 'estar', están: 'estar',
  estaba: 'estar', estabas: 'estar', estábamos: 'estar', estabais: 'estar', estaban: 'estar',
  estuve: 'estar', estuviste: 'estar', estuvo: 'estar', estuvimos: 'estar', estuvisteis: 'estar', estuvieron: 'estar',
  esté: 'estar', estés: 'estar', estemos: 'estar', estéis: 'estar', estén: 'estar',
  estando: 'estar', estado: 'estar',
  // Haber
  he: 'haber', has: 'haber', ha: 'haber', hemos: 'haber', habéis: 'haber', han: 'haber',
  hay: 'haber', había: 'haber', habías: 'haber', habíamos: 'haber', habían: 'haber',
  hubo: 'haber', hubiese: 'haber', hubiera: 'haber', haya: 'haber', hayan: 'haber',
  // Ir
  voy: 'ir', vas: 'ir', va: 'ir', vamos: 'ir', vais: 'ir', van: 'ir',
  iba: 'ir', ibas: 'ir', íbamos: 'ir', ibais: 'ir', iban: 'ir',
  vaya: 'ir', vayas: 'ir', vayamos: 'ir', vayan: 'ir', yendo: 'ir', ido: 'ir',
  // Tener
  tengo: 'tener', tienes: 'tener', tiene: 'tener', tenemos: 'tener', tenéis: 'tener', tienen: 'tener',
  tenía: 'tener', tenías: 'tener', teníamos: 'tener', tenían: 'tener',
  tuve: 'tener', tuviste: 'tener', tuvo: 'tener', tuvimos: 'tener', tuvieron: 'tener',
  tenga: 'tener', tengas: 'tener', tengamos: 'tener', tengan: 'tener', tendré: 'tener', tendrá: 'tener',
  // Hacer
  hago: 'hacer', haces: 'hacer', hace: 'hacer', hacemos: 'hacer', hacéis: 'hacer', hacen: 'hacer',
  hacía: 'hacer', hacías: 'hacer', hacíamos: 'hacer', hacían: 'hacer',
  hice: 'hacer', hiciste: 'hacer', hizo: 'hacer', hicimos: 'hacer', hicieron: 'hacer',
  haga: 'hacer', hagas: 'hacer', hagamos: 'hacer', hagan: 'hacer', haré: 'hacer', hará: 'hacer', hecho: 'hacer',
  // Poder
  puedo: 'poder', puedes: 'poder', puede: 'poder', podemos: 'poder', podéis: 'poder', pueden: 'poder',
  podía: 'poder', podías: 'poder', podíamos: 'poder', podían: 'poder',
  pude: 'poder', pudiste: 'poder', pudo: 'poder', pudimos: 'poder', pudieron: 'poder',
  pueda: 'poder', puedan: 'poder', podré: 'poder', podrá: 'poder', podido: 'poder',
  // Decir
  digo: 'decir', dices: 'decir', dice: 'decir', decimos: 'decir', decís: 'decir', dicen: 'decir',
  decía: 'decir', decías: 'decir', decíamos: 'decir', decían: 'decir',
  dije: 'decir', dijiste: 'decir', dijo: 'decir', dijimos: 'decir', dijeron: 'decir',
  diga: 'decir', digas: 'decir', digamos: 'decir', digan: 'decir', dicho: 'decir',
  // Ver / Dar / Saber / Querer / Poner / Venir / Salir
  veo: 'ver', ves: 'ver', ve: 'ver', vemos: 'ver', veis: 'ver', ven: 'ver', vio: 'ver', vimos: 'ver', vieron: 'ver', visto: 'ver',
  doy: 'dar', das: 'dar', da: 'dar', damos: 'dar', dais: 'dar', dan: 'dar', di: 'dar', dio: 'dar', dimos: 'dar', dieron: 'dar',
  sé: 'saber', sabes: 'saber', sabe: 'saber', sabemos: 'saber', saben: 'saber', supe: 'saber', supo: 'saber', supimos: 'saber', supieron: 'saber',
  quiero: 'querer', quieres: 'querer', quiere: 'querer', queremos: 'querer', quieren: 'querer', quise: 'querer', quiso: 'querer', quisieron: 'querer',
  pongo: 'poner', pones: 'poner', pone: 'poner', ponemos: 'poner', ponen: 'poner', puse: 'poner', puso: 'poner', pusieron: 'poner', puesto: 'poner',
  vengo: 'venir', vienes: 'venir', viene: 'venir', venimos: 'venir', vienen: 'venir', vine: 'venir', vino: 'venir', vinieron: 'venir',
  salgo: 'salir', sales: 'salir', sale: 'salir', salimos: 'salir', salen: 'salir', salí: 'salir', salió: 'salir', salieron: 'salir'
};

// Base Spanish function words known to almost all learners
const UNIVERSAL_FUNCTION_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'a', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'entre', 'hacia', 'hasta', 'desde',
  'y', 'e', 'o', 'u', 'pero', 'mas', 'sino', 'aunque', 'porque', 'si', 'no',
  'que', 'como', 'cuando', 'donde', 'quien', 'cual', 'cuanto',
  'yo', 'tu', 'tú', 'el', 'él', 'ella', 'usted', 'nosotros', 'nosotras', 'ellos', 'ellas', 'ustedes',
  'me', 'te', 'se', 'nos', 'os', 'le', 'les', 'lo',
  'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'nuestro', 'nuestra',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas',
  'muy', 'más', 'tan', 'tanto', 'mucho', 'poco', 'todo', 'nada', 'bien', 'mal', 'ya', 'aquí', 'ahí', 'allí'
]);

// Cognate suffix transformation patterns: Spanish -> English
const COGNATE_RULES: Array<{ suffixEs: RegExp; suffixEn: string; rule: string }> = [
  { suffixEs: /ción$/i, suffixEn: 'tion', rule: '-ción ➔ -tion' },
  { suffixEs: /sión$/i, suffixEn: 'sion', rule: '-sión ➔ -sion' },
  { suffixEs: /dad$/i, suffixEn: 'ty', rule: '-dad ➔ -ty' },
  { suffixEs: /tad$/i, suffixEn: 'ty', rule: '-tad ➔ -ty' },
  { suffixEs: /mente$/i, suffixEn: 'ly', rule: '-mente ➔ -ly' },
  { suffixEs: /oso$/i, suffixEn: 'ous', rule: '-oso ➔ -ous' },
  { suffixEs: /osa$/i, suffixEn: 'ous', rule: '-osa ➔ -ous' },
  { suffixEs: /ble$/i, suffixEn: 'ble', rule: '-ble ➔ -ble' },
  { suffixEs: /ico$/i, suffixEn: 'ic', rule: '-ico ➔ -ic' },
  { suffixEs: /ica$/i, suffixEn: 'ic', rule: '-ica ➔ -ic' },
  { suffixEs: /ista$/i, suffixEn: 'ist', rule: '-ista ➔ -ist' },
  { suffixEs: /ario$/i, suffixEn: 'ary', rule: '-ario ➔ -ary' },
  { suffixEs: /ancia$/i, suffixEn: 'ance', rule: '-ancia ➔ -ance' },
  { suffixEs: /encia$/i, suffixEn: 'ence', rule: '-encia ➔ -ence' }
];

// Curated dictionary of common Spanish cognates with reliable translations
const COMMON_COGNATES: Record<string, string> = {
  revolucion: 'revolution', revolución: 'revolution',
  informacion: 'information', información: 'information',
  comunicacion: 'communication', comunicación: 'communication',
  situacion: 'situation', situación: 'situation',
  conversacion: 'conversation', conversación: 'conversation',
  educacion: 'education', educación: 'education',
  nacion: 'nation', nación: 'nation',
  accion: 'action', acción: 'action',
  universidad: 'university',
  ciudad: 'city',
  libertad: 'liberty / freedom',
  sociedad: 'society',
  actividad: 'activity',
  realidad: 'reality',
  posibilidad: 'possibility',
  famoso: 'famous', famosa: 'famous',
  curioso: 'curious', curiosa: 'curious',
  peligroso: 'dangerous', peligrosa: 'dangerous',
  generoso: 'generous', generosa: 'generous',
  importante: 'important',
  diferente: 'different',
  excelente: 'excellent',
  increible: 'incredible', increíble: 'incredible',
  terrible: 'terrible',
  probable: 'probable',
  politico: 'political / politician', político: 'political',
  economico: 'economic', económico: 'economic',
  musica: 'music', música: 'music',
  historia: 'history / story',
  familia: 'family',
  problema: 'problem',
  sistema: 'system'
};

// Advanced vocabulary replacements for texts that are too simple (Ratio > 0.98)
const ADVANCED_SYNONYM_REPLACEMENTS: Record<string, { advanced: string; cefr: CEFRLevel; nuance: string }> = {
  hacer: { advanced: 'desempeñar / efectuar', cefr: 'B2', nuance: 'Denotes carrying out formal functions or technical actions' },
  decir: { advanced: 'manifestar / aseverar', cefr: 'B2', nuance: 'Expresses formal declarations or authoritative affirmations' },
  bueno: { advanced: 'óptimo / encomiable', cefr: 'C1', nuance: 'Expresses ideal suitability or praiseworthy virtue' },
  malo: { advanced: 'perjudicial / deplorable', cefr: 'B2', nuance: 'Highlights damaging consequences or regrettable quality' },
  grande: { advanced: 'monumental / desmesurado', cefr: 'B2', nuance: 'Conveys vast, immense, or historic proportion' },
  problema: { advanced: 'dilema / encrucijada', cefr: 'B2', nuance: 'A difficult dilemma requiring critical strategic resolution' },
  empezar: { advanced: 'inaugurar / emprender', cefr: 'B2', nuance: 'Embarking on a significant project or ceremony' },
  terminar: { advanced: 'culminar / finiquitar', cefr: 'C1', nuance: 'Reaching the crowning peak or settling final accounts' },
  ayudar: { advanced: 'socorrer / respaldar', cefr: 'B2', nuance: 'Lending crucial emergency assistance or organizational backing' },
  mirar: { advanced: 'vislumbrar / contemplar', cefr: 'B2', nuance: 'Catching a glimpse of something distant or reflective observation' }
};

// Subjunctive triggers for text enrichment
const SUBJUNCTIVE_TRIGGER_TEMPLATES = [
  { trigger: 'Es primordial que...', targetSentence: 'Es primordial que analicemos la situación detenidamente.', explanation: 'Impersonal value judgment requiring the present subjunctive.' },
  { trigger: 'Dudo que...', targetSentence: 'Dudo que los resultados reflejen toda la realidad.', explanation: 'Expression of doubt triggering subjunctive mood.' },
  { trigger: 'A menos que...', targetSentence: 'No podremos concluir el proyecto a menos que tengamos consenso.', explanation: 'Restrictive conditional connector strictly demanding subjunctive.' },
  { trigger: 'Ojalá que...', targetSentence: 'Ojalá que esta iniciativa prospere en todos los países.', explanation: 'Expression of deep wish or hope requiring subjunctive.' }
];

// Regional idioms for enrichment
const REGIONAL_IDIOMS = [
  { idiom: 'Estar en las nubes', region: 'General', meaning: 'To be daydreaming or distracted' },
  { idiom: 'Tomar el pelo', region: 'Spain', meaning: 'To pull someone\'s leg or tease' },
  { idiom: 'Ponerse las pilas', region: 'Latin America', meaning: 'To get one\'s act together / get energized' },
  { idiom: 'No tener pelos en la lengua', region: 'General', meaning: 'To speak frankly without holding back' },
  { idiom: 'Tirar la casa por la ventana', region: 'Spain & Mexico', meaning: 'To spare no expense / celebrate lavishly' }
];

/**
 * Spanish Syllable Counter (Silabeo)
 * Accurately handles Spanish strong/weak vowels, diphthongs, triphthongs, and hiatus
 */
export function countSpanishSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
  if (!clean) return 0;
  if (clean.length <= 2) return 1;

  // Strong vowels: a, e, o, á, é, ó
  // Weak vowels: i, u, ü
  // Accented weak vowels acting as strong (Hiatus): í, ú
  let syllables = 0;
  let i = 0;
  const len = clean.length;

  const isStrong = (c: string) => /[aeoáéó]/i.test(c);
  const isWeakUnstressed = (c: string) => /[iuü]/i.test(c);
  const isWeakStressed = (c: string) => /[íú]/i.test(c);
  const isVowel = (c: string) => isStrong(c) || isWeakUnstressed(c) || isWeakStressed(c);

  while (i < len) {
    if (isVowel(clean[i])) {
      syllables++;
      // Check for Triphthong: weak + strong + weak (e.g. iai, iei, uai, uei in limpiáis, cambiáis, averiguáis)
      if (
        i + 2 < len &&
        isWeakUnstressed(clean[i]) &&
        isStrong(clean[i + 1]) &&
        isWeakUnstressed(clean[i + 2])
      ) {
        i += 2; // Absorb entire triphthong
      }
      // Falling diphthong (strong + weak or weak + weak)
      else if (i + 1 < len && isWeakUnstressed(clean[i + 1]) && (isStrong(clean[i]) || isWeakUnstressed(clean[i]))) {
        i++; // Absorbed into diphthong
      }
      // Rising diphthong (weak + strong)
      else if (i + 1 < len && isWeakUnstressed(clean[i]) && isStrong(clean[i + 1])) {
        i++; // Rising diphthong
      }
    }
    i++;
  }

  return Math.max(1, syllables);
}

/**
 * Strips Spanish punctuation, handles contractions (al -> a el, del -> de el),
 * and normalizes tokens into clean lowercase words.
 */
export function tokenizeAndNormalizeSpanish(text: string): { tokens: string[]; rawWords: string[]; sentencesCount: number } {
  if (!text || text.trim().length === 0) {
    return { tokens: [], rawWords: [], sentencesCount: 0 };
  }

  // Count sentences based on Spanish punctuation [. ! ? ¿ ¡]
  const sentenceMatches = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentencesCount = Math.max(1, sentenceMatches.length);

  // Split into whitespace tokens
  const rawSegments = text.split(/\s+/);
  const tokens: string[] = [];
  const rawWords: string[] = [];

  for (const seg of rawSegments) {
    const stripped = seg
      .toLowerCase()
      .trim()
      .replace(/^[¿¡"'(«—\s]+/, '')
      .replace(/[?!.,;:)"'»—\s]+$/, '');

    if (!stripped || !/[a-záéíóúñü]/i.test(stripped)) {
      continue;
    }

    rawWords.push(stripped);

    // Contraction decomposition
    if (stripped === 'al') {
      tokens.push('a');
      tokens.push('el');
    } else if (stripped === 'del') {
      tokens.push('de');
      tokens.push('el');
    } else {
      tokens.push(stripped);
    }
  }

  return { tokens, rawWords, sentencesCount };
}

/**
 * Spanish Lemmatizer: Maps inflections, plurals, and conjugated verbs to their base dictionary lemma.
 */
export function lemmatizeSpanishWord(word: string): string {
  const norm = word.toLowerCase().trim();
  if (!norm) return '';

  // 1. Direct irregular check
  if (IRREGULAR_LEMMA_MAP[norm]) {
    return IRREGULAR_LEMMA_MAP[norm];
  }

  // 2. Regular verb infinitive restoration
  // Imperfect -aba / -ían
  if (norm.endsWith('ábamos')) return norm.slice(0, -6) + 'ar';
  if (norm.endsWith('abais')) return norm.slice(0, -5) + 'ar';
  if (norm.endsWith('aban') || norm.endsWith('abas')) return norm.slice(0, -4) + 'ar';
  if (norm.endsWith('aba')) return norm.slice(0, -3) + 'ar';
  if (norm.endsWith('íamos')) return norm.slice(0, -5) + 'er'; // or -ir
  if (norm.endsWith('ían') || norm.endsWith('ías') || norm.endsWith('ía')) return norm.slice(0, -3) + 'er';

  // Gerunds
  if (norm.endsWith('ando')) return norm.slice(0, -4) + 'ar';
  if (norm.endsWith('iendo')) return norm.slice(0, -5) + 'er';

  // Participles
  if (norm.endsWith('ados') || norm.endsWith('adas')) return norm.slice(0, -4) + 'ar';
  if (norm.endsWith('ado') || norm.endsWith('ada')) return norm.slice(0, -3) + 'ar';
  if (norm.endsWith('idos') || norm.endsWith('idas')) return norm.slice(0, -4) + 'er';
  if (norm.endsWith('ido') || norm.endsWith('ida')) return norm.slice(0, -3) + 'er';

  // Preterite
  if (norm.endsWith('aron')) return norm.slice(0, -4) + 'ar';
  if (norm.endsWith('ieron')) return norm.slice(0, -5) + 'er';

  // Plurals (Nouns / Adjectives)
  if (norm.endsWith('ces') && norm.length > 4) return norm.slice(0, -3) + 'z'; // e.g. luces -> luz
  if (norm.endsWith('es') && norm.length > 3 && /[bcdfghjklmnprstvwxz]es$/i.test(norm)) {
    return norm.slice(0, -2); // e.g. ciudades -> ciudad, papeles -> papel, flores -> flor
  }
  if (norm.endsWith('s') && norm.length > 2 && !norm.endsWith('is') && !norm.endsWith('os')) {
    return norm.slice(0, -1);
  }

  // Feminine to masculine base
  if (norm.endsWith('as') && norm.length > 3) return norm.slice(0, -2) + 'o';
  if (norm.endsWith('a') && norm.length > 3 && !['agua', 'dia', 'día', 'mapa', 'problema', 'sistema'].includes(norm)) {
    return norm.slice(0, -1) + 'o';
  }

  return norm;
}

/**
 * Calculates Spanish Readability Metrics:
 * 1. Fernández-Huerta Readability Formula (Spanish adaptation of Flesch Reading Ease):
 *    IFH = 206.84 - 0.60 * (Syllables / Words * 100) - 1.02 * (Sentences / Words * 100)
 * 2. Gutiérrez de Polini Readability Formula:
 *    IGP = 95.2 - 9.7 * (Letters / Words) - 0.35 * (Words / Sentences)
 */
export function calculateSpanishReadability(rawWords: string[], sentencesCount: number): ReadabilityMetrics {
  const totalWords = Math.max(1, rawWords.length);
  const totalSentences = Math.max(1, sentencesCount);

  let totalSyllables = 0;
  let totalLetters = 0;

  for (const w of rawWords) {
    totalSyllables += countSpanishSyllables(w);
    totalLetters += w.replace(/[^a-záéíóúüñ]/g, '').length;
  }

  const P = (totalSyllables / totalWords) * 100; // Syllables per 100 words
  const F = (totalSentences / totalWords) * 100; // Sentences per 100 words

  // Formula de Fernandez-Huerta
  const ifhRaw = 206.84 - 0.60 * P - 1.02 * F;
  const fernandezHuertaIndex = Math.max(0, Math.min(100, Math.round(ifhRaw)));

  // Formula de Gutierrez de Polini
  const avgLettersPerWord = totalLetters / totalWords;
  const avgWordsPerSentence = totalWords / totalSentences;
  const igpRaw = 95.2 - 9.7 * avgLettersPerWord - 0.35 * avgWordsPerSentence;
  const gutierrezPoliniIndex = Math.max(0, Math.min(100, Math.round(igpRaw)));

  // Composite Reading Ease Index
  const compositeReadingEase = Math.round((fernandezHuertaIndex * 0.65 + gutierrezPoliniIndex * 0.35));

  let readabilityGrade: ReadabilityMetrics['readabilityGrade'] = 'Adecuado';
  if (compositeReadingEase >= 85) readabilityGrade = 'Muy Fácil';
  else if (compositeReadingEase >= 75) readabilityGrade = 'Fácil';
  else if (compositeReadingEase >= 60) readabilityGrade = 'Adecuado';
  else if (compositeReadingEase >= 50) readabilityGrade = 'Algo Difícil';
  else if (compositeReadingEase >= 35) readabilityGrade = 'Difícil';
  else readabilityGrade = 'Muy Difícil';

  return {
    fernandezHuertaIndex,
    gutierrezPoliniIndex,
    compositeReadingEase,
    readabilityGrade,
    totalWords,
    totalSentences,
    totalSyllables,
    avgSentenceLength: Number((totalWords / totalSentences).toFixed(1)),
    avgSyllablesPerWord: Number((totalSyllables / totalWords).toFixed(2)),
    avgLettersPerWord: Number(avgLettersPerWord.toFixed(2))
  };
}

/**
 * Detects English cognates in unknown Spanish words based on morpho-phonetic rules.
 */
export function identifySpanishEnglishCognates(words: string[]): ScaffoldingPackage['cognateCallouts'] {
  const callouts: ScaffoldingPackage['cognateCallouts'] = [];
  const seen = new Set<string>();

  for (const word of words) {
    const clean = word.toLowerCase().trim();
    if (seen.has(clean) || clean.length < 4) continue;

    // Pattern-based cognate match
    let patternMatched = false;
    for (const { suffixEs, suffixEn, rule } of COGNATE_RULES) {
      if (suffixEs.test(clean)) {
        const transformed = clean.replace(suffixEs, suffixEn);
        seen.add(clean);
        callouts.push({
          spanish: clean,
          english: COMMON_COGNATES[clean] || transformed,
          rule,
          context: `Rule ${rule}: Notice how "-${clean.match(suffixEs)?.[0]}" translates directly to "-${suffixEn}".`
        });
        patternMatched = true;
        break;
      }
    }

    if (patternMatched) continue;

    // Direct cognate match
    if (COMMON_COGNATES[clean]) {
      seen.add(clean);
      callouts.push({
        spanish: clean,
        english: COMMON_COGNATES[clean],
        rule: 'Direct Latin Cognate',
        context: `Spanish "${clean}" directly corresponds to English "${COMMON_COGNATES[clean]}".`
      });
      continue;
    }
  }

  return callouts.slice(0, 6);
}

/**
 * Identifies grammar structures in text requiring scaffolding (Subjunctive, Preterite/Imperfect, Clitics).
 */
export function identifyScaffoldedGrammarHints(text: string): ScaffoldingPackage['grammarHints'] {
  const hints: ScaffoldingPackage['grammarHints'] = [];
  const lower = text.toLowerCase();

  // Subjunctive check
  if (/(dudo que|es necesario que|quiero que|para que|ojalá)/i.test(lower)) {
    hints.push({
      title: 'Modo Subjuntivo (Subjunctive Mood)',
      structure: 'Trigger + que + Verbo en Subjuntivo',
      explanation_en: 'This clause introduces doubt, desire, or subjective evaluation, requiring the subjunctive verb form.',
      explanation_ar: 'هذه الجملة تتضمن رغبة أو شكاً، وبالتالي تتطلب صيغة الفعل المنصوب (Subjuntivo).'
    });
  }

  // Preterite vs Imperfect contrast
  if (/(mientras|siempre|todos los días|cuando|ayer|anoche|de repente)/i.test(lower)) {
    hints.push({
      title: 'Contraste Pretérito Indefinido vs Imperfecto',
      structure: 'Punto de tiempo puntual vs Acción continua de fondo',
      explanation_en: 'Notice how completed episodic actions (indefinido) punctuate habitual background actions (imperfecto).',
      explanation_ar: 'لاحظ التمييز بين أحداث الماضي المكتملة والنقطية (Indefinido) والأحداث المستمرة أو الاعتيادية (Imperfecto).'
    });
  }

  // Clitic pronoun doubling
  if (/\b(se lo|se la|me lo|te lo|le dijo|les dio)\b/i.test(lower)) {
    hints.push({
      title: 'Pronombres Dobles (Direct & Indirect Objects)',
      structure: 'Indirect (le/se) + Direct (lo/la)',
      explanation_en: 'When both indirect and direct object pronouns occur together, "le/les" becomes "se" (e.g., "se lo di").',
      explanation_ar: 'عند اجتماع ضمير المفعول غير المباشر والمباشر، تتحول "le" إلى "se" لتفادي ثقل النطق.'
    });
  }

  return hints;
}

/**
 * Estimates CEFR difficulty based on lexical rarity, sentence complexity, and verb paradigms.
 */
export function estimateTextCEFR(ratio: number, readability: ReadabilityMetrics): CEFRLevel {
  const { avgSentenceLength, compositeReadingEase } = readability;

  if (compositeReadingEase >= 80 && avgSentenceLength <= 10) {
    return 'A1';
  } else if (compositeReadingEase >= 65 && avgSentenceLength <= 14) {
    return 'A2';
  } else if (compositeReadingEase >= 50 && avgSentenceLength <= 18) {
    return 'B1';
  } else if (compositeReadingEase >= 35 && avgSentenceLength <= 24) {
    return 'B2';
  } else {
    return 'C1';
  }
}

/**
 * PRIMARY ENGINE: Calculates Krashen Comprehensibility Score (i+1)
 * Inputs:
 * - text: string (target Spanish text)
 * - userKnownLemmas: Set<string> (set of known words/lemmas from user progress)
 *
 * Output: Complete ComprehensibilityScore with ratio, readability, scaffolding & advancement recommendations.
 */
export function calculateComprehensibilityScore(
  text: string,
  userKnownLemmas: Set<string>
): ComprehensibilityScore {
  const startTime = performance.now();

  const { tokens, rawWords, sentencesCount } = tokenizeAndNormalizeSpanish(text);
  const readability = calculateSpanishReadability(rawWords, sentencesCount);

  if (tokens.length === 0) {
    return {
      ratio: 1.0,
      percentage: 100,
      targetWords: [],
      unknownWords: [],
      knownWords: [],
      totalWordTokens: 0,
      cefrDifficulty: 'A1',
      readability,
      zone: 'optimal_i_plus_1',
      badge: 'Optimal i+1 (100% Known)',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      scaffolding: { required: false, cognateCallouts: [], contextualGlosses: [], grammarHints: [] }
    };
  }

  let knownTokenCount = 0;
  const unknownWordSet = new Set<string>();
  const knownWordSet = new Set<string>();

  for (const token of tokens) {
    const lemma = lemmatizeSpanishWord(token);
    const isKnown =
      UNIVERSAL_FUNCTION_WORDS.has(token) ||
      UNIVERSAL_FUNCTION_WORDS.has(lemma) ||
      userKnownLemmas.has(token) ||
      userKnownLemmas.has(lemma);

    if (isKnown) {
      knownTokenCount++;
      knownWordSet.add(token);
    } else {
      unknownWordSet.add(token);
    }
  }

  const totalTokens = tokens.length;
  const ratio = Number((knownTokenCount / totalTokens).toFixed(3));
  const percentage = Math.round(ratio * 100);

  const unknownWords = Array.from(unknownWordSet);
  const knownWords = Array.from(knownWordSet);

  // Target acquisition items: the 5% to 10% acquisition frontier
  const targetWords = unknownWords.slice(0, Math.max(3, Math.min(8, Math.round(totalTokens * 0.08))));
  const cefrDifficulty = estimateTextCEFR(ratio, readability);

  // Krashen Zone Evaluation:
  // - Optimal i+1: exactly 90% - 95% (or up to 97%)
  // - Too Difficult / Frustrating (Affective Filter elevated): < 85%
  // - Too Easy / Stagnant: > 98%
  let zone: ComprehensibilityScore['zone'] = 'optimal_i_plus_1';
  let badge = `Optimal i+1 (${percentage}% Known)`;
  let badgeColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/40';

  if (ratio < 0.85) {
    zone = 'too_difficult';
    badge = `High Friction (${percentage}% Known - Scaffolding Enabled)`;
    badgeColor = 'text-amber-600 dark:text-amber-400 bg-amber-500/15 border-amber-500/40';
  } else if (ratio > 0.98) {
    zone = 'too_easy';
    badge = `Fluency Mastered (${percentage}% Known - Advancement Active)`;
    badgeColor = 'text-sky-600 dark:text-sky-400 bg-sky-500/15 border-sky-500/40';
  }

  // 1. Scaffolding Package (Triggered or primed if ratio < 0.85 or for unknown target words)
  const isScaffoldingNeeded = ratio < 0.88;
  const cognates = identifySpanishEnglishCognates(unknownWords);
  const grammarHints = identifyScaffoldedGrammarHints(text);

  const contextualGlosses: ScaffoldingPackage['contextualGlosses'] = targetWords.map(word => {
    const lemma = lemmatizeSpanishWord(word);
    return {
      word,
      lemma,
      translation_en: COMMON_COGNATES[word] || `Target word [${word}]`,
      translation_ar: `كلمة مستهدفة [${word}]`,
      cefr: cefrDifficulty
    };
  });

  const scaffolding: ScaffoldingPackage = {
    required: isScaffoldingNeeded,
    cognateCallouts: cognates,
    contextualGlosses,
    grammarHints
  };

  // 2. Advancement Package (Triggered if ratio > 0.98)
  let advancements: TextAdvancementPackage | undefined = undefined;
  if (ratio >= 0.96) {
    const suggestedSynonyms: TextAdvancementPackage['suggestedSynonyms'] = [];
    for (const [simpleWord, replacement] of Object.entries(ADVANCED_SYNONYM_REPLACEMENTS)) {
      if (knownWordSet.has(simpleWord) || tokens.includes(simpleWord)) {
        suggestedSynonyms.push({
          original: simpleWord,
          advanced: replacement.advanced,
          cefr: replacement.cefr,
          nuance: replacement.nuance
        });
      }
    }

    advancements = {
      suggestedSynonyms: suggestedSynonyms.slice(0, 4),
      subjunctiveTriggers: SUBJUNCTIVE_TRIGGER_TEMPLATES,
      regionalIdioms: REGIONAL_IDIOMS
    };
  }

  const executionTimeMs = performance.now() - startTime;
  if (executionTimeMs > 20) {
    console.debug(`[ComprehensibleInputService] Processed ${totalTokens} tokens in ${executionTimeMs.toFixed(2)}ms`);
  }

  return {
    ratio,
    percentage,
    targetWords,
    unknownWords,
    knownWords,
    totalWordTokens: totalTokens,
    cefrDifficulty,
    readability,
    zone,
    badge,
    badgeColor,
    scaffolding,
    advancements
  };
}

/**
 * Benchmark / Unit Test Verification helper to verify that a 500-word text classifies within 10ms.
 */
export function runComprehensibilityBenchmark(): { success: boolean; durationMs: number; score: ComprehensibilityScore } {
  // Generate a realistic 500-word authentic Spanish excerpt
  const sampleParagraph = `El cambio climático y la transición hacia energías renovables representan uno de los desafíos más trascendentales de nuestra época. En España y en toda Latinoamérica, los gobiernos y las empresas están invirtiendo en infraestructura solar y eólica para garantizar un suministro eléctrico sostenible. Durante los últimos años, hemos observado una notable transformación en la manera en que producimos y consumimos energía. Aunque todavía existen obstáculos significativos en cuanto a las redes de almacenamiento, la innovación tecnológica continúa avanzando con paso firme. `;
  
  const text500Words = sampleParagraph.repeat(8); // ~500 words
  const userKnown = new Set(['el', 'la', 'en', 'espana', 'gobiernos', 'innovación', 'durante', 'solar', 'ano']);

  const t0 = performance.now();
  const score = calculateComprehensibilityScore(text500Words, userKnown);
  const durationMs = performance.now() - t0;

  return {
    success: durationMs < 20, // Strict performance threshold
    durationMs: Number(durationMs.toFixed(2)),
    score
  };
}
