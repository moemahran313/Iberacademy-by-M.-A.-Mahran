import { IRREGULAR_VERB_TABLE, IrregularVerbInfo } from '../data/irregularVerbTable';

export interface LemmatizationResult {
  rawWord: string;
  cleanWord: string;
  baseLemma: string;
  alternativeLemmas?: string[];
  partOfSpeech: 'verb' | 'noun' | 'adjective' | 'adverb' | 'pronoun' | 'other';
  parsingText?: string;
  morphology?: {
    person?: string;
    number?: 'singular' | 'plural';
    tense?: string;
    mood?: 'Indicativo' | 'Subjuntivo' | 'Imperativo';
    gender?: 'masculine' | 'feminine';
    parsingText: string;
  };
  detachedPronouns?: string[];
  detachedClitics?: string[];
  isIrregular?: boolean;
  disambiguationOptions?: IrregularVerbInfo[];
  multipleLemmas?: {
    lemma: string;
    partOfSpeech: string;
    contextDescription: string;
  }[];
}

// Single and compound clitic pronouns
const DOUBLE_CLITICS = [
  'melo', 'mela', 'melos', 'melas',
  'telo', 'tela', 'telos', 'telas',
  'selo', 'sela', 'selos', 'selas',
  'noslo', 'nosla', 'noslos', 'noslas',
  'oslo', 'osla', 'oslos', 'oslas'
];

const SINGLE_CLITICS = [
  'me', 'te', 'se', 'nos', 'os', 'le', 'la', 'les', 'los', 'lo'
];

// Accented vowel replacement map to restore unaccented stems after pronoun detachment
const ACCENT_MAP: Record<string, string> = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
};

function removeAccents(str: string): string {
  return str.replace(/[áéíóú]/g, match => ACCENT_MAP[match] || match);
}

/**
 * Normalizes graphic accents on verb stems after clitic pronoun detachment.
 * e.g., "dándoles" -> stem "dándo" -> "dando"
 *       "explicándo" -> "explicando"
 *       "cómpra" -> "compra"
 */
function restoreStemAccents(stem: string): string {
  // If the stem has an accent on the penult/antepenult, remove it if it's now a standard paroxytone
  return removeAccents(stem);
}

/**
 * Clitic Pronoun Detachment Algorithm.
 * Strips attached clitics from infinitives, gerunds, and imperative verb forms.
 */
export function detachClitics(word: string): { stem: string; pronouns: string[] } | null {
  const lower = word.toLowerCase();

  // Try double clitics first (e.g., diciéndomelo -> stem: diciéndo, pronouns: ['me', 'lo'])
  for (const compound of DOUBLE_CLITICS) {
    if (lower.endsWith(compound) && lower.length > compound.length + 2) {
      const stemRaw = lower.substring(0, lower.length - compound.length);
      const stem = restoreStemAccents(stemRaw);

      // Extract original 2 pronouns from compound
      let p1 = '';
      let p2 = compound.substring(compound.length - 2); // 'lo', 'la', 'os', 'as'
      if (compound.startsWith('nos')) p1 = 'nos';
      else if (compound.startsWith('me')) p1 = 'me';
      else if (compound.startsWith('te')) p1 = 'te';
      else if (compound.startsWith('se')) p1 = 'se';
      else if (compound.startsWith('os')) p1 = 'os';

      return { stem, pronouns: [p1, p2].filter(Boolean) };
    }
  }

  // Try single clitics (e.g., dándoles -> stem: dando, pronoun: 'les')
  for (const clitic of SINGLE_CLITICS) {
    if (lower.endsWith(clitic) && lower.length > clitic.length + 2) {
      const stemRaw = lower.substring(0, lower.length - clitic.length);
      const stem = restoreStemAccents(stemRaw);
      return { stem, pronouns: [clitic] };
    }
  }

  return null;
}

/**
 * Resolves gerund/infinitive stems to base infinitives.
 * e.g., "diciendo" -> "decir", "haciendo" -> "hacer", "dando" -> "dar", "comprando" -> "comprar"
 */
export function resolveGerundOrInfinitiveStem(stem: string): { lemma: string; parsing: string } | null {
  const lower = stem.toLowerCase();

  if (lower.endsWith('ando')) {
    const root = lower.substring(0, lower.length - 4);
    return { lemma: `${root}ar`, parsing: 'Gerundio (Verbo en -ar)' };
  }

  if (lower.endsWith('iendo') || lower.endsWith('yendo')) {
    const root = lower.substring(0, lower.length - 5);
    const gerundMap: Record<string, string> = {
      'dici': 'decir',
      'haci': 'hacer',
      'pudi': 'poder',
      'pusi': 'poner',
      'quiri': 'querer',
      'vini': 'venir',
      'durmi': 'dormir',
      'sinti': 'sentir',
      'pidi': 'pedir',
      'sigui': 'seguir',
      'sirvi': 'servir',
      'muri': 'morir',
      'ley': 'leer',
      'crey': 'creer',
      'oy': 'oír',
      'tray': 'traer'
    };

    const lemma = gerundMap[root] || `${root}er`;
    return { lemma, parsing: 'Gerundio (Verbo en -er/-ir)' };
  }

  // Infinitives with attached pronouns (e.g., hacerlo -> hacer)
  if (lower.endsWith('ar') || lower.endsWith('er') || lower.endsWith('ir')) {
    return { lemma: lower, parsing: 'Infinitivo' };
  }

  // Common imperatives (di -> decir, haz -> hacer, ve -> ir/ver, pon -> poner, sal -> salir, ten -> tener, ven -> venir)
  const imperativeMap: Record<string, string> = {
    'di': 'decir',
    'haz': 'hacer',
    've': 'ir',
    'pon': 'poner',
    'sal': 'salir',
    'ten': 'tener',
    'ven': 'venir',
    'compra': 'comprar',
    'explica': 'explicar',
    'diga': 'decir',
    'haga': 'hacer'
  };

  if (imperativeMap[lower]) {
    return { lemma: imperativeMap[lower], parsing: 'Imperativo Afirmativo' };
  }

  return null;
}

/**
 * Regular Spanish Suffix Lemmatization Rules.
 */
function lemmatizeRegularSuffixes(word: string): LemmatizationResult | null {
  const lower = word.toLowerCase();

  // 1. Subjuntivo Imperfecto (-áramos, -iéramos, -ara, -iera, -ase, -iese)
  if (lower.endsWith('áramos') || lower.endsWith('ásemos')) {
    const root = lower.substring(0, lower.length - 6);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}ar`,
      partOfSpeech: 'verb',
      morphology: {
        person: '1ª',
        number: 'plural',
        tense: 'Pretérito Imperfecto',
        mood: 'Subjuntivo',
        parsingText: '1ª persona plural, Pretérito Imperfecto de Subjuntivo'
      }
    };
  }

  if (lower.endsWith('iéramos') || lower.endsWith('iésemos')) {
    const root = lower.substring(0, lower.length - 7);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}er`,
      partOfSpeech: 'verb',
      morphology: {
        person: '1ª',
        number: 'plural',
        tense: 'Pretérito Imperfecto',
        mood: 'Subjuntivo',
        parsingText: '1ª persona plural, Pretérito Imperfecto de Subjuntivo'
      }
    };
  }

  // 2. Condicional Simple (-aría, -arías, -aríamos, -arían, -ería, -iría)
  if (lower.endsWith('aría') || lower.endsWith('arías') || lower.endsWith('aríamos') || lower.endsWith('arían')) {
    const rootIdx = lower.lastIndexOf('ar');
    const lemma = lower.substring(0, rootIdx + 2);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: lemma,
      partOfSpeech: 'verb',
      morphology: {
        tense: 'Condicional Simple',
        mood: 'Indicativo',
        parsingText: 'Condicional Simple'
      }
    };
  }

  // 3. Futuro Simple (-aré, -arás, -ará, -aremos, -arán, -eré, -iré)
  if (lower.endsWith('aremos') || lower.endsWith('eremos') || lower.endsWith('iremos')) {
    const root = lower.substring(0, lower.length - 5);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}r`,
      partOfSpeech: 'verb',
      morphology: {
        person: '1ª',
        number: 'plural',
        tense: 'Futuro Simple',
        mood: 'Indicativo',
        parsingText: '1ª persona plural, Futuro Simple'
      }
    };
  }

  // 4. Pretérito Indefinido (-aron, -ieron)
  if (lower.endsWith('aron')) {
    const root = lower.substring(0, lower.length - 4);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}ar`,
      partOfSpeech: 'verb',
      morphology: {
        person: '3ª',
        number: 'plural',
        tense: 'Pretérito Indefinido',
        mood: 'Indicativo',
        parsingText: '3ª persona plural, Pretérito Indefinido'
      }
    };
  }

  if (lower.endsWith('ieron')) {
    const root = lower.substring(0, lower.length - 5);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}er`,
      partOfSpeech: 'verb',
      morphology: {
        person: '3ª',
        number: 'plural',
        tense: 'Pretérito Indefinido',
        mood: 'Indicativo',
        parsingText: '3ª persona plural, Pretérito Indefinido'
      }
    };
  }

  // 5. Feminine Plurals & Plural Nouns / Adjectives
  // e.g. trabajadoras -> trabajador
  if (lower.endsWith('adoras') || lower.endsWith('adores')) {
    const root = lower.substring(0, lower.length - 5);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}ador`,
      partOfSpeech: 'noun',
      morphology: {
        number: 'plural',
        gender: lower.endsWith('adoras') ? 'feminine' : 'masculine',
        parsingText: `Sustantivo / Adjetivo, ${lower.endsWith('adoras') ? 'Femenino Plural' : 'Masculino Plural'}`
      }
    };
  }

  // Plurals in -ces -> -z (e.g. felices -> feliz, luces -> luz)
  if (lower.endsWith('ces') && lower.length > 4) {
    const root = lower.substring(0, lower.length - 3);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: `${root}z`,
      partOfSpeech: 'adjective',
      morphology: {
        number: 'plural',
        parsingText: 'Plural (Base en -z)'
      }
    };
  }

  // Plurals in -s or -es
  if (lower.endsWith('es') && lower.length > 4) {
    const root = lower.substring(0, lower.length - 2);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: root,
      partOfSpeech: 'noun',
      morphology: {
        number: 'plural',
        parsingText: 'Sustantivo / Adjetivo Plural'
      }
    };
  }

  if (lower.endsWith('s') && !lower.endsWith('is') && lower.length > 3) {
    const root = lower.substring(0, lower.length - 1);
    return {
      rawWord: word,
      cleanWord: lower,
      baseLemma: root,
      partOfSpeech: 'noun',
      morphology: {
        number: 'plural',
        parsingText: 'Plural'
      }
    };
  }

  return null;
}

/**
 * Main Client-Side Lemmatizer & Morphological Analyzer.
 * Resolves conjugated verbs, irregular roots, feminine/plural forms, and enclitic pronouns in < 25ms.
 */
export function lemmatizeSpanishWord(word: string, sentenceContext?: string): LemmatizationResult {
  const clean = word.trim().toLowerCase().replace(/[^a-záéíóúñü]/g, '');

  if (!clean) {
    return {
      rawWord: word,
      cleanWord: '',
      baseLemma: word,
      partOfSpeech: 'other',
      parsingText: 'Forma no válida'
    };
  }

  // 1. Direct Irregular Table Lookup (High-Frequency Roots e.g., fue, habrías, puso, durmiéramos)
  if (IRREGULAR_VERB_TABLE[clean]) {
    const options = IRREGULAR_VERB_TABLE[clean];
    const primary = options[0];
    const alternativeLemmas = options.length > 1 ? options.map(o => o.lemma) : undefined;

    const multipleLemmas = options.length > 1
      ? options.map(o => ({
          lemma: o.lemma,
          partOfSpeech: 'Verbo',
          contextDescription: o.disambiguationContext || o.parsing
        }))
      : undefined;

    return {
      rawWord: word,
      cleanWord: clean,
      baseLemma: primary.lemma,
      alternativeLemmas,
      partOfSpeech: 'verb',
      isIrregular: true,
      parsingText: primary.parsing,
      disambiguationOptions: options,
      multipleLemmas,
      morphology: {
        person: primary.personNumber?.split(' ')[0],
        number: primary.personNumber?.includes('plur') ? 'plural' : 'singular',
        tense: primary.tense,
        mood: primary.mood,
        parsingText: primary.parsing
      }
    };
  }

  // 2. Clitic Pronoun Detachment (e.g., diciéndomelo -> stem: diciendo -> lemma: decir, pronouns: ['me', 'lo'])
  const cliticAnalysis = detachClitics(clean);
  if (cliticAnalysis) {
    const { stem, pronouns } = cliticAnalysis;

    // Check if stem is irregular first (e.g., diciéndo -> diciendo -> decir)
    if (IRREGULAR_VERB_TABLE[stem]) {
      const primary = IRREGULAR_VERB_TABLE[stem][0];
      const pStr = `${primary.parsing} + pron. clíticos: ${pronouns.map(p => `-${p}`).join('')}`;
      return {
        rawWord: word,
        cleanWord: clean,
        baseLemma: primary.lemma,
        partOfSpeech: 'verb',
        detachedPronouns: pronouns,
        detachedClitics: pronouns,
        isIrregular: true,
        parsingText: pStr,
        morphology: {
          parsingText: pStr
        }
      };
    }

    const resolvedStem = resolveGerundOrInfinitiveStem(stem);
    if (resolvedStem) {
      const pStr = `${resolvedStem.parsing} + pron. clíticos: ${pronouns.map(p => `-${p}`).join('')}`;
      return {
        rawWord: word,
        cleanWord: clean,
        baseLemma: resolvedStem.lemma,
        partOfSpeech: 'verb',
        detachedPronouns: pronouns,
        detachedClitics: pronouns,
        parsingText: pStr,
        morphology: {
          parsingText: pStr
        }
      };
    }
  }

  // 3. Regular Morphological Suffix Analysis
  const regularResult = lemmatizeRegularSuffixes(clean);
  if (regularResult) {
    return {
      ...regularResult,
      parsingText: regularResult.parsingText || regularResult.morphology?.parsingText || 'Forma regular'
    };
  }

  // 4. Default Fallback
  return {
    rawWord: word,
    cleanWord: clean,
    baseLemma: clean,
    partOfSpeech: 'other',
    parsingText: 'Forma canónica'
  };
}
