/**
 * Spanish Phonological Analysis Engine
 * Computes exact syllabification, natural tonic stress according to RAE rules,
 * and detects vocalic liaison (sinalefa) between words.
 */

export interface PhoneticWord {
  raw: string;
  clean: string;
  syllables: string[];
  stressedIndex: number; // 0-indexed syllable with tonic stress
  punctuationBefore: string;
  punctuationAfter: string;
  hasSinalefaWithNext: boolean;
  sinalefaBridge?: string;
  sinalefaExplanation?: string;
}

export interface PhoneticSentenceAnalysis {
  words: PhoneticWord[];
  sinalefaCount: number;
  rhythmNotes: string[];
}

const INSEPARABLE_CLUSTERS = new Set([
  'bl', 'cl', 'fl', 'gl', 'pl',
  'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr',
  'ch', 'll', 'rr'
]);

const ACCENTED_VOWELS = new Set(['á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú']);
const STRONG_VOWELS = new Set(['a', 'e', 'o', 'á', 'é', 'ó', 'A', 'E', 'O', 'Á', 'É', 'Ó']);
const WEAK_VOWELS = new Set(['i', 'u', 'í', 'ú', 'ü', 'I', 'U', 'Í', 'Ú', 'Ü']);
const ALL_VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü', 'A', 'E', 'I', 'O', 'U', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ü']);

function isVowel(char: string): boolean {
  return ALL_VOWELS.has(char);
}

/**
 * Syllabifies a single Spanish word adhering to Spanish phonotactic grammar.
 */
export function syllabifySpanishWord(word: string): string[] {
  const clean = word.toLowerCase().trim();
  if (clean.length <= 1) return [clean];

  const syllables: string[] = [];
  let current = '';

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    current += char;

    if (isVowel(char)) {
      // Check for diphthong or hiatus with next character
      const next = clean[i + 1];
      const nextNext = clean[i + 2];

      if (next && isVowel(next)) {
        // Accented weak vowel always breaks diphthong into hiatus (dí-a, pa-ís, ba-úl)
        if (ACCENTED_VOWELS.has(char) && WEAK_VOWELS.has(char)) {
          syllables.push(current);
          current = '';
          continue;
        }
        if (ACCENTED_VOWELS.has(next) && WEAK_VOWELS.has(next)) {
          syllables.push(current);
          current = '';
          continue;
        }

        // Two strong vowels always break into hiatus (ca-os, po-e-ma, le-er)
        if (STRONG_VOWELS.has(char) && STRONG_VOWELS.has(next)) {
          syllables.push(current);
          current = '';
          continue;
        }

        // Otherwise it's a diphthong/triphthong, so keep together
        continue;
      }

      // If next is consonant
      if (next && !isVowel(next)) {
        // If consonant is followed by a vowel: V-CV (ca-sa, pe-ro)
        if (nextNext && isVowel(nextNext)) {
          syllables.push(current);
          current = '';
          continue;
        }

        // If two consonants: check inseparable clusters
        const next3 = clean[i + 3];
        if (nextNext && !isVowel(nextNext)) {
          const cluster = next + nextNext;
          if (INSEPARABLE_CLUSTERS.has(cluster) && next3 && isVowel(next3)) {
            // V-CCV (ha-blar, li-bro, ma-dre)
            syllables.push(current);
            current = '';
            continue;
          } else {
            // VC-CV (es-tu-dio, par-que, ac-to)
            current += next;
            syllables.push(current);
            current = '';
            i++; // skip next since added
            continue;
          }
        }
      }
    }
  }

  if (current) {
    if (syllables.length > 0 && !isVowel(current[0]) && !current.split('').some(isVowel)) {
      syllables[syllables.length - 1] += current;
    } else {
      syllables.push(current);
    }
  }

  return syllables.length > 0 ? syllables : [clean];
}

/**
 * Identifies the stressed syllable index following canonical Spanish RAE rules:
 * 1. Written tilde (á, é, í, ó, ú)
 * 2. Words ending in vowel, n, s -> Penultimate syllable (segunda desde el final)
 * 3. Words ending in other consonants -> Ultimate syllable (última)
 */
export function findStressedSyllableIndex(syllables: string[], rawWord: string): number {
  if (syllables.length <= 1) return 0;

  // 1. Check for written acute accent mark
  for (let i = 0; i < syllables.length; i++) {
    if (syllables[i].split('').some(c => ACCENTED_VOWELS.has(c))) {
      return i;
    }
  }

  // Clean word ending
  const lastChar = rawWord.toLowerCase().replace(/[^a-záéíóúüñ]/g, '').slice(-1);

  // 2. Ends in vowel, -n, or -s -> Penultimate (llana)
  if (ALL_VOWELS.has(lastChar) || lastChar === 'n' || lastChar === 's') {
    return Math.max(0, syllables.length - 2);
  }

  // 3. Ends in any other consonant -> Final syllable (aguda)
  return syllables.length - 1;
}

/**
 * Checks if word A and word B form a sinalefa (vocalic link).
 * Occurs when word A ends in vowel sound and word B starts with vowel sound (or silent h + vowel).
 */
export function checkSinalefa(wordA: string, wordB: string): { hasSinalefa: boolean; explanation?: string } {
  const cleanA = wordA.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
  const cleanB = wordB.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');

  if (!cleanA || !cleanB) return { hasSinalefa: false };

  const lastCharA = cleanA.slice(-1);
  const endsWithVowel = ALL_VOWELS.has(lastCharA) || lastCharA === 'y';

  let startsWithVowel = false;
  if (ALL_VOWELS.has(cleanB[0])) {
    startsWithVowel = true;
  } else if (cleanB.startsWith('h') && cleanB.length > 1 && ALL_VOWELS.has(cleanB[1])) {
    startsWithVowel = true; // silent 'h' e.g. "va a hacer" -> "a_hacer"
  }

  if (endsWithVowel && startsWithVowel) {
    return {
      hasSinalefa: true,
      explanation: `Sinalefa: La vocal final de "${cleanA}" se funde con el inicio de "${cleanB}" en una sola emisión continua.`
    };
  }

  return { hasSinalefa: false };
}

/**
 * Deconstructs an entire Spanish sentence into words with stress visualization
 * and sinalefa bridges between linked words.
 */
export function analyzeSentencePhonetics(sentence: string): PhoneticSentenceAnalysis {
  // Tokenize preserving leading and trailing punctuation
  const tokens = sentence.trim().split(/\s+/);
  const words: PhoneticWord[] = [];
  let sinalefaCount = 0;

  for (let i = 0; i < tokens.length; i++) {
    const raw = tokens[i];
    const match = raw.match(/^([^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]*)(.*?)([^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]*)$/);

    const punctuationBefore = match ? match[1] : '';
    const clean = match ? match[2] : raw;
    const punctuationAfter = match ? match[3] : '';

    const syllables = syllabifySpanishWord(clean);
    const stressedIndex = findStressedSyllableIndex(syllables, clean);

    words.push({
      raw,
      clean,
      syllables,
      stressedIndex,
      punctuationBefore,
      punctuationAfter,
      hasSinalefaWithNext: false
    });
  }

  // Calculate sinalefa links between consecutive words
  for (let i = 0; i < words.length - 1; i++) {
    const curr = words[i];
    const next = words[i + 1];

    // If there is strong punctuation between them (like comma, period, question mark), no sinalefa
    if (curr.punctuationAfter.includes('.') || curr.punctuationAfter.includes('?') || curr.punctuationAfter.includes('!') || curr.punctuationAfter.includes(',')) {
      continue;
    }

    const { hasSinalefa, explanation } = checkSinalefa(curr.clean, next.clean);
    if (hasSinalefa) {
      curr.hasSinalefaWithNext = true;
      curr.sinalefaBridge = `${curr.clean}_${next.clean}`;
      curr.sinalefaExplanation = explanation;
      sinalefaCount++;
    }
  }

  const rhythmNotes: string[] = [];
  if (sinalefaCount > 0) {
    rhythmNotes.push(`Se detectaron ${sinalefaCount} enlaces de sinalefa: las palabras fluyen sin pausa entre vocales.`);
  }

  return {
    words,
    sinalefaCount,
    rhythmNotes
  };
}
