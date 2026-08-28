import { ALL_VOCABULARY } from '../data/vocabularyComprehensive1000';
import { SPANISH_VERBS } from '../data/verbs';
import { SENTENCE_PATTERNS } from '../data/sentencesAndIdioms';
import { COMPREHENSIBLE_STORIES } from '../data/comprehensibleStories';
import { UserProgress, LingQItem, LingQStatus, VocabularyItem, ClozeSentenceVariation } from '../types';

export interface WordToken {
  id: string;
  raw: string;
  clean: string; // Lowercase, trimmed of punctuation
  isWord: boolean;
  prefixPunct: string;
  suffixPunct: string;
  sentenceIndex: number;
  paragraphIndex: number;
  fullSentence: string;
}

export interface WordDefinitionMatch {
  word: string;
  translation_en: string;
  translation_ar: string;
  phonetic?: string;
  partOfSpeech?: string;
  gender?: string;
  lemma?: string;
  verbInfinitive?: string;
  verbTense?: string;
  examples: { es: string; en: string; ar: string }[];
  imageUrl?: string;
  explanation_en?: string;
  explanation_ar?: string;
}

export interface ContextualSentence {
  es: string;
  en: string;
  ar: string;
  source: string;
}

// Clean and normalize word string for dictionary lookup
export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .replace(/^[¿¡"'(«—\s]+/, '')
    .replace(/[?!.,;:)"'»—\s]+$/, '');
}

// Split text into tokens with punctuation preservation
export function tokenizeText(text: string, paragraphIdx: number = 0): WordToken[] {
  // Regex splitting by whitespace while preserving tokens
  const rawTokens = text.split(/(\s+)/);
  const result: WordToken[] = [];
  let currentSentenceIndex = 0;

  let tokenCounter = 0;
  for (const raw of rawTokens) {
    if (!raw || /^\s+$/.test(raw)) {
      continue;
    }

    // Match leading punctuation, core letters/accents, and trailing punctuation
    const match = raw.match(/^([¿¡"'(«—]*)([A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\-]+)([?!.,;:)"'»—]*)$/);

    if (match) {
      const prefixPunct = match[1] || '';
      const wordCore = match[2] || '';
      const suffixPunct = match[3] || '';
      const clean = normalizeWord(wordCore);

      result.push({
        id: `token-${paragraphIdx}-${tokenCounter++}`,
        raw,
        clean,
        isWord: clean.length > 0 && /[a-záéíóúñü]/i.test(clean),
        prefixPunct,
        suffixPunct,
        sentenceIndex: currentSentenceIndex,
        paragraphIndex: paragraphIdx,
        fullSentence: '' // Will be populated in sentence grouping
      });

      // If token ends with sentence-ending punctuation, increment sentence index
      if (/[.!?]+/.test(suffixPunct)) {
        currentSentenceIndex++;
      }
    } else {
      // Non-standard punctuation or standalone symbol
      result.push({
        id: `token-${paragraphIdx}-${tokenCounter++}`,
        raw,
        clean: normalizeWord(raw),
        isWord: false,
        prefixPunct: '',
        suffixPunct: '',
        sentenceIndex: currentSentenceIndex,
        paragraphIndex: paragraphIdx,
        fullSentence: ''
      });
    }
  }

  return result;
}

// Group tokens by sentence and populate fullSentence references
export function groupTokensIntoSentences(tokens: WordToken[]): { sentenceIndex: number; text: string; tokens: WordToken[] }[] {
  const map: Record<number, WordToken[]> = {};

  tokens.forEach(t => {
    if (!map[t.sentenceIndex]) {
      map[t.sentenceIndex] = [];
    }
    map[t.sentenceIndex].push(t);
  });

  const sentences = Object.entries(map).map(([sIdxStr, sTokens]) => {
    const sIdx = Number(sIdxStr);
    const sentenceText = sTokens.map(t => t.raw).join(' ');
    // Populate back into tokens
    sTokens.forEach(t => {
      t.fullSentence = sentenceText;
    });
    return {
      sentenceIndex: sIdx,
      text: sentenceText,
      tokens: sTokens
    };
  });

  return sentences;
}

// Common Spanish Stopwords and Grammatical Functional Words
const BASE_FUNCTIONAL_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'e', 'o', 'u', 'pero', 'mas', 'sino', 'aunque', 'porque', 'pues',
  'que', 'qué', 'como', 'cómo', 'cuando', 'cuándo', 'donde', 'dónde',
  'quien', 'quién', 'cual', 'cuál', 'cuyo', 'cuanto', 'cuánto',
  'de', 'a', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'entre', 'hacia', 'hasta', 'desde', 'tras',
  'yo', 'tu', 'tú', 'el', 'él', 'ella', 'usted', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes',
  'me', 'te', 'se', 'nos', 'os', 'le', 'les', 'lo', 'la', 'los', 'las',
  'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'nuestro', 'nuestra', 'nuestros', 'nuestras',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'aquel', 'aquella',
  'es', 'son', 'era', 'fue', 'soy', 'eres', 'somos', 'sois', 'sea', 'sean',
  'está', 'están', 'estaba', 'estuvo', 'estoy', 'estás', 'estamos', 'estáis',
  'ha', 'han', 'había', 'hubo', 'he', 'has', 'hemos', 'habéis', 'hay',
  'si', 'sí', 'no', 'ya', 'muy', 'más', 'tan', 'tanto', 'tanta', 'tantos', 'tantas',
  'mucho', 'mucha', 'muchos', 'muchas', 'poco', 'poca', 'pocos', 'pocas',
  'todo', 'toda', 'todos', 'todas', 'nada', 'nadie', 'alguien', 'algo',
  'bien', 'mal', 'así', 'aquí', 'ahí', 'allí', 'acá', 'allá',
  'hola', 'adiós', 'gracias', 'por favor', 'bueno', 'buena', 'buenos', 'buenas'
]);

// Determine word status for LingQ Color Coding
export type WordState = 'known' | 'lingq_1' | 'lingq_2' | 'lingq_3' | 'lingq_4' | 'new';

export function getWordState(cleanWord: string, userProgress: UserProgress): WordState {
  if (!cleanWord || !/[a-záéíóúñü]/i.test(cleanWord)) {
    return 'known';
  }

  const norm = normalizeWord(cleanWord);

  // Check user custom LingQs
  if (userProgress.lingqs && userProgress.lingqs[norm]) {
    const status = userProgress.lingqs[norm].status;
    return `lingq_${status}` as WordState;
  }

  // Check known words list
  if (userProgress.knownWords && userProgress.knownWords.includes(norm)) {
    return 'known';
  }

  // Check mastered words in legacy vocabulary
  if (userProgress.masteredWordIds && userProgress.masteredWordIds.includes(norm)) {
    return 'known';
  }

  // Check base high-frequency functional words
  if (BASE_FUNCTIONAL_WORDS.has(norm)) {
    return 'known';
  }

  // Default to New (Blue)
  return 'new';
}

// STORY_WORDS_GLOSSARY - Pre-compiled comprehensive bilingual translations for all vocabulary appearing in default graded stories.
const STORY_WORDS_GLOSSARY: Record<string, { en: string; ar: string; pos?: string }> = {
  hoy: { en: "today", ar: "اليوم", pos: "adverb" },
  es: { en: "is", ar: "يكون / هو", pos: "verb" },
  domingo: { en: "Sunday", ar: "الأحد", pos: "noun" },
  y: { en: "and", ar: "و", pos: "conjunction" },
  el: { en: "the", ar: "الـ (أداة تعريف للمذكر)", pos: "article" },
  la: { en: "the", ar: "الـ (أداة تعريف للمؤنث)", pos: "article" },
  los: { en: "the", ar: "الـ (أداة تعريف للجمع المذكر)", pos: "article" },
  las: { en: "the", ar: "الـ (أداة تعريف للجمع المؤنث)", pos: "article" },
  un: { en: "a / an", ar: "أداة تنكير للمذكر", pos: "article" },
  una: { en: "a / an", ar: "أداة تنكير للمؤنث", pos: "article" },
  sol: { en: "sun", ar: "الشمس", pos: "noun" },
  brilla: { en: "shines / is shining", ar: "تسطع / تشرق", pos: "verb" },
  en: { en: "in / on", ar: "في / على", pos: "preposition" },
  cielo: { en: "sky", ar: "السماء", pos: "noun" },
  azul: { en: "blue", ar: "الأزرق", pos: "adjective" },
  de: { en: "of / from", ar: "من / الخاص بـ", pos: "preposition" },
  madrid: { en: "Madrid", ar: "مدريد", pos: "noun" },
  carlos: { en: "Carlos", ar: "كارلوس", pos: "noun" },
  se: { en: "himself / herself (reflexive pronoun)", ar: "نفسه / ضمير انعكاسي", pos: "pronoun" },
  levanta: { en: "gets up / rises", ar: "يستيقظ / ينهض", pos: "verb" },
  a: { en: "to / at", ar: "إلى / في", pos: "preposition" },
  ocho: { en: "eight", ar: "الثامنة / ثمانية", pos: "numeral" },
  mañana: { en: "morning / tomorrow", ar: "الصباح / غداً", pos: "noun" },
  abre: { en: "opens", ar: "يفتح", pos: "verb" },
  ventana: { en: "window", ar: "النافذة", pos: "noun" },
  respira: { en: "breathes", ar: "يتنفس", pos: "verb" },
  aire: { en: "air", ar: "الهواء", pos: "noun" },
  fresco: { en: "fresh", ar: "العليل / النقي / الطازج", pos: "adjective" },
  prepara: { en: "prepares", ar: "يعد / يجهّز", pos: "verb" },
  cafe: { en: "coffee", ar: "قهوة", pos: "noun" },
  caliente: { en: "hot", ar: "ساخن", pos: "adjective" },
  con: { en: "with", ar: "مع / بـ", pos: "preposition" },
  leche: { en: "milk", ar: "الحليب", pos: "noun" },
  come: { en: "eats", ar: "يتناول / يأكل", pos: "verb" },
  tostada: { en: "toast", ar: "خبز محمص", pos: "noun" },
  aceite: { en: "oil", ar: "زيت", pos: "noun" },
  oliva: { en: "olive", ar: "الزيتون", pos: "noun" },
  tomate: { en: "tomato", ar: "طماطم", pos: "noun" },
  decide: { en: "decides", ar: "يقرر", pos: "verb" },
  salir: { en: "to go out / leave", ar: "الخروج / الذهاب", pos: "verb" },
  caminar: { en: "to walk", ar: "المشي / التنزه", pos: "verb" },
  por: { en: "by / through / for", ar: "عبر / من خلال", pos: "preposition" },
  parque: { en: "park", ar: "الحديقة / المنتزه", pos: "noun" },
  del: { en: "of the", ar: "من الـ", pos: "preposition" },
  retiro: { en: "Retiro (famous park)", ar: "الريتيرو", pos: "noun" },
  muchas: { en: "many (feminine)", ar: "العديد من / الكثير", pos: "adjective" },
  familias: { en: "families", ar: "عائلات / أسر", pos: "noun" },
  felices: { en: "happy (plural)", ar: "سعيدات / سعداء", pos: "adjective" },
  algunos: { en: "some", ar: "بعض", pos: "pronoun" },
  niños: { en: "children / boys", ar: "أطفال", pos: "noun" },
  juegan: { en: "play (plural)", ar: "يلعبون", pos: "verb" },
  pelota: { en: "ball", ar: "كرة", pos: "noun" },
  otros: { en: "others", ar: "آخرون", pos: "pronoun" },
  montan: { en: "ride (plural)", ar: "يركبون", pos: "verb" },
  bicicleta: { en: "bicycle", ar: "دراجة هوائية", pos: "noun" },
  lee: { en: "reads", ar: "يقرأ", pos: "verb" },
  libro: { en: "book", ar: "كتاب", pos: "noun" },
  favorito: { en: "favorite", ar: "المفضل", pos: "adjective" },
  bajo: { en: "under / low", ar: "تحت", pos: "preposition" },
  sombra: { en: "shade / shadow", ar: "ظل", pos: "noun" },
  gran: { en: "great / big", ar: "كبير", pos: "adjective" },
  arbol: { en: "tree", ar: "شجرة", pos: "noun" },
  verano: { en: "summer", ar: "الصيف", pos: "noun" },
  pasado: { en: "past / last", ar: "الماضي", pos: "adjective" },
  lucia: { en: "Lucía (name)", ar: "لوسيا", pos: "noun" },
  viajo: { en: "traveled (he/she)", ar: "سافر / سافرت", pos: "verb" },
  oaxaca: { en: "Oaxaca (city in Mexico)", ar: "أوكساكا", pos: "noun" },
  ciudad: { en: "city", ar: "مدينة", pos: "noun" },
  famosa: { en: "famous (feminine)", ar: "شهيرة / معروفة", pos: "adjective" },
  sur: { en: "south", ar: "جنوب", pos: "noun" },
  mexico: { en: "Mexico", ar: "المكسيك", pos: "noun" },
  gastronomia: { en: "gastronomy / culinary art", ar: "فنون الطهي / المطبخ", pos: "noun" },
  tradiciones: { en: "traditions", ar: "تقاليد", pos: "noun" },
  vivas: { en: "living (feminine plural)", ar: "حية / نابضة بالحياة", pos: "adjective" },
  calles: { en: "streets", ar: "شوارع", pos: "noun" },
  empedradas: { en: "cobbled / paved with stones", ar: "مرصوفة بالحجارة", pos: "adjective" },
  señora: { en: "lady / woman", ar: "سيدة / امرأة", pos: "noun" },
  amable: { en: "kind / friendly", ar: "لطيفة / ودودة", pos: "adjective" },
  recomendo: { en: "recommended (he/she)", ar: "نصحت / أوصت", pos: "verb" },
  visitar: { en: "to visit", ar: "زيارة / أن يزور", pos: "verb" },
  pequeño: { en: "small / little", ar: "صغير", pos: "adjective" },
  mercado: { en: "market", ar: "سوق", pos: "noun" },
  artesanal: { en: "artisanal / craft", ar: "حرفي", pos: "adjective" },
  aparecia: { en: "appeared / used to appear", ar: "يظهر / كان يظهر", pos: "verb" },
  mapas: { en: "maps", ar: "خرائط", pos: "noun" },
  turisticos: { en: "tourist (plural)", ar: "سياحية", pos: "adjective" },
  alli: { en: "there", ar: "هناك", pos: "adverb" },
  encontro: { en: "found (he/she)", ar: "وجدت / عثرت", pos: "verb" },
  telas: { en: "fabrics / cloths", ar: "أقمشة", pos: "noun" },
  tejidas: { en: "woven (feminine plural)", ar: "منسوجة", pos: "adjective" },
  mano: { en: "hand", ar: "يد", pos: "noun" },
  colores: { en: "colors", ar: "ألوان", pos: "noun" },
  brillantes: { en: "bright / shining", ar: "زاهية / لامعة", pos: "adjective" },
  probo: { en: "tried / tasted (he/she)", ar: "تذوقت / جربت", pos: "verb" },
  autentico: { en: "authentic / genuine", ar: "أصلي / حقيقي", pos: "adjective" },
  chocolate: { en: "chocolate", ar: "شوكولاتة", pos: "noun" },
  canela: { en: "cinnamon", ar: "قرفة", pos: "noun" },
  experiencia: { en: "experience", ar: "تجربة", pos: "noun" },
  viaje: { en: "trip / journey", ar: "رحلة", pos: "noun" },
  medida: { en: "measure / as", ar: "مقياس / بقدر ما", pos: "noun" },
  poblaciones: { en: "populations", ar: "سكان / جموع", pos: "noun" },
  urbanas: { en: "urban", ar: "حضرية / المدن", pos: "adjective" },
  crecen: { en: "grow (plural)", ar: "ينمو / يكبرون", pos: "verb" },
  ritmo: { en: "rhythm / pace", ar: "وتيرة / إيقاع", pos: "noun" },
  acelerado: { en: "accelerated / fast", ar: "متسارعة / سريع", pos: "adjective" },
  arquitectos: { en: "architects", ar: "معماريون", pos: "noun" },
  planificadores: { en: "planners / urban planners", ar: "مخططو المدن", pos: "noun" },
  enfrentan: { en: "face / confront (plural)", ar: "يواجهون", pos: "verb" },
  desafio: { en: "challenge", ar: "تحدٍ", pos: "noun" },
  crucial: { en: "crucial / critical", ar: "حاسم / جوهري", pos: "adjective" },
  como: { en: "how / like", ar: "كيف / مثل", pos: "adverb" },
  transformar: { en: "to transform", ar: "تحويل / يغير", pos: "verb" },
  metropolis: { en: "metropolises / big cities", ar: "مدن كبرى", pos: "noun" },
  espacios: { en: "spaces", ar: "مساحات / فضاءات", pos: "noun" },
  ecologicos: { en: "ecological / eco-friendly", ar: "بيئية", pos: "adjective" },
  perder: { en: "to lose", ar: "فقدان / خسارة", pos: "verb" },
  vitalidad: { en: "vitality", ar: "حيوية", pos: "noun" },
  economica: { en: "economic (feminine)", ar: "اقتصادية", pos: "adjective" },
  varios: { en: "several / various", ar: "عدة / متنوع", pos: "adjective" },
  expertos: { en: "experts", ar: "خبراء", pos: "noun" },
  sugieren: { en: "suggest (plural)", ar: "يقترحون", pos: "verb" },
  fundamental: { en: "fundamental / essential", ar: "ضروري / أساسي", pos: "adjective" },
  gobiernos: { en: "governments", ar: "حكومات", pos: "noun" },
  inviertan: { en: "invest (subjunctive plural)", ar: "يستثمرون", pos: "verb" },
  transporte: { en: "transport", ar: "النقل", pos: "noun" },
  publico: { en: "public", ar: "العام", pos: "noun" },
  eficiente: { en: "efficient", ar: "فعال / كفؤ", pos: "adjective" },
  energias: { en: "energies", ar: "طاقات", pos: "noun" },
  renovables: { en: "renewable", ar: "متجددة", pos: "adjective" },
  todos: { en: "all / everyone", ar: "الجميع / كلنا", pos: "pronoun" },
  utilizaramos: { en: "used (subjunctive plural)", ar: "استخدمنا", pos: "verb" },
  bicicletas: { en: "bicycles", ar: "دراجات هوائية", pos: "noun" },
  trayectos: { en: "trips / routes", ar: "مسافات / مسارات", pos: "noun" },
  cortos: { en: "short (plural)", ar: "قصيرة", pos: "adjective" },
  calidad: { en: "quality", ar: "جودة", pos: "noun" },
  sustancialmente: { en: "substantially / significantly", ar: "بشكل جوهري / ملحوظ", pos: "adverb" },
  mejoraria: { en: "would improve", ar: "لتحسنت", pos: "verb" }
};

// Instant Dictionary Lookup from Comprehensive 1,000+ Database and Verbs
export function lookupSpanishWord(rawWord: string): WordDefinitionMatch {
  const norm = normalizeWord(rawWord);
  const cleanKey = norm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  // 1. Check Offline Graded Story Word Glossary for instant match
  const storyMatch = STORY_WORDS_GLOSSARY[cleanKey];
  if (storyMatch) {
    return {
      word: rawWord,
      translation_en: storyMatch.en,
      translation_ar: storyMatch.ar,
      phonetic: `/${rawWord}/`,
      partOfSpeech: storyMatch.pos || 'vocabulary',
      lemma: cleanKey,
      examples: [
        {
          es: `Uso de la palabra "${rawWord}" en esta lección.`,
          en: `Use of the word "${rawWord}" in this lesson.`,
          ar: `استخدام كلمة "${rawWord}" في هذا الدرس.`
        }
      ]
    };
  }

  // 1.5. Direct match in Comprehensive Vocabulary
  const vocabMatch = ALL_VOCABULARY.find(v => {
    const spanish = (v.spanish || v.word || '').toLowerCase();
    return spanish === norm;
  });

  if (vocabMatch) {
    const examples = (vocabMatch.examples || vocabMatch.exampleSentences || []).map(ex => ({
      es: ex.es,
      en: ex.en,
      ar: ex.ar
    }));

    return {
      word: vocabMatch.spanish || vocabMatch.word || norm,
      translation_en: vocabMatch.english || vocabMatch.translation_en || 'Spanish vocabulary item',
      translation_ar: vocabMatch.arabic || vocabMatch.translation_ar || 'مفردة إسبانية',
      phonetic: vocabMatch.phonetic || vocabMatch.ipa || '',
      partOfSpeech: vocabMatch.partOfSpeech || vocabMatch.pos || 'noun',
      gender: vocabMatch.gender || '',
      lemma: norm,
      examples: examples.length > 0 ? examples : [
        {
          es: `Me gusta usar "${norm}" en mis conversaciones.`,
          en: `I like using "${norm}" in my conversations.`,
          ar: `أحب استخدام "${norm}" في محادثاتي.`
        }
      ]
    };
  }

  // 2. Verb Conjugation Database Match
  for (const verb of SPANISH_VERBS) {
    if (verb.infinitive.toLowerCase() === norm) {
      return {
        word: verb.infinitive,
        translation_en: verb.english,
        translation_ar: verb.arabic,
        phonetic: `/${verb.infinitive}/`,
        partOfSpeech: 'verb (infinitive)',
        lemma: verb.infinitive,
        verbInfinitive: verb.infinitive,
        examples: verb.examples.map(e => ({ es: e.es, en: e.en, ar: e.ar }))
      };
    }

    // Check all conjugated forms (present, preterite, imperfect, future, subjunctive, etc.)
    const tenses = ['present', 'preterite', 'imperfect', 'future', 'conditional', 'presentSubjunctive'] as const;
    for (const t of tenses) {
      const forms = verb.conjugations[t];
      if (forms) {
        for (const [person, conj] of Object.entries(forms)) {
          if (conj.toLowerCase() === norm) {
            const personLabel = person.replace('_', ' ');
            return {
              word: conj,
              translation_en: `${verb.english} [${personLabel} - ${t}]`,
              translation_ar: `${verb.arabic} [تصريف ${t}]`,
              phonetic: `/${conj}/`,
              partOfSpeech: 'verb (conjugated form)',
              lemma: verb.infinitive,
              verbInfinitive: verb.infinitive,
              verbTense: `${t} (${personLabel})`,
              examples: verb.examples.map(e => ({ es: e.es, en: e.en, ar: e.ar }))
            };
          }
        }
      }
    }
  }

  // 3. Fallback Smart Cognate & Morphological Analyzer
  return generateMorphologicalFallback(norm);
}

// Fallback morphological analyzer for unknown tokens or cognates
function generateMorphologicalFallback(norm: string): WordDefinitionMatch {
  let guessEn = '';
  let guessAr = '';
  let pos = 'word';

  if (norm.endsWith('ción')) {
    const base = norm.replace(/ción$/, '');
    guessEn = `${base}tion / noun concept`;
    guessAr = `اسم مشتق (ينتهي بـ ción)`;
    pos = 'noun (f)';
  } else if (norm.endsWith('mente')) {
    const base = norm.replace(/mente$/, '');
    guessEn = `${base}ly (adverb)`;
    guessAr = `ظرف حال (ينتهي بـ mente)`;
    pos = 'adverb';
  } else if (norm.endsWith('ar') || norm.endsWith('er') || norm.endsWith('ir')) {
    guessEn = `to ${norm} (action verb)`;
    guessAr = `فعل في المصدر`;
    pos = 'verb';
  } else if (norm.endsWith('oso') || norm.endsWith('osa')) {
    guessEn = `characteristic of ${norm.slice(0, -3)} (adjective)`;
    guessAr = `صفة`;
    pos = 'adjective';
  } else {
    guessEn = `Definition for "${norm}"`;
    guessAr = `معنى كلمة "${norm}"`;
    pos = 'vocabulary';
  }

  return {
    word: norm,
    translation_en: guessEn,
    translation_ar: guessAr,
    phonetic: `/${norm}/`,
    partOfSpeech: pos,
    lemma: norm,
    examples: [
      {
        es: `Aprendo el uso de "${norm}" en este contexto.`,
        en: `I am learning the usage of "${norm}" in this context.`,
        ar: `أتعلم استخدام كلمة "${norm}" في هذا السياق.`
      }
    ]
  };
}

// Search the entire platform corpus for 3-5 authentic contextual sentences
export function findMultiContextSentences(rawWord: string): ContextualSentence[] {
  const norm = normalizeWord(rawWord);
  const results: ContextualSentence[] = [];
  const seenSpanish = new Set<string>();

  // Helper to test if a sentence contains the word with word boundaries
  const regex = new RegExp(`\\b${norm}\\b`, 'i');

  // 1. Search in Comprehensible Stories
  for (const story of COMPREHENSIBLE_STORIES) {
    for (const p of story.paragraphs) {
      // Split paragraph into sentences
      const sentences = p.es.split(/(?<=[.!?])\s+/);
      const enSentences = p.en.split(/(?<=[.!?])\s+/);
      const arSentences = p.ar.split(/(?<=[.!?])\s+/);

      sentences.forEach((sEs, sIdx) => {
        if (regex.test(sEs) && !seenSpanish.has(sEs.trim())) {
          seenSpanish.add(sEs.trim());
          results.push({
            es: sEs.trim(),
            en: enSentences[sIdx] || p.en,
            ar: arSentences[sIdx] || p.ar,
            source: `Story: ${story.title_es}`
          });
        }
      });
      if (results.length >= 4) return results;
    }
  }

  // 2. Search in Sentence Patterns & Idioms
  for (const pattern of SENTENCE_PATTERNS) {
    if (regex.test(pattern.spanish) && !seenSpanish.has(pattern.spanish)) {
      seenSpanish.add(pattern.spanish);
      results.push({
        es: pattern.spanish,
        en: pattern.english,
        ar: pattern.arabic,
        source: 'Authentic Spanish Blueprint'
      });
      if (results.length >= 4) return results;
    }
  }

  // 3. Search in Verb examples
  for (const v of SPANISH_VERBS) {
    for (const ex of v.examples) {
      if (regex.test(ex.es) && !seenSpanish.has(ex.es)) {
        seenSpanish.add(ex.es);
        results.push({
          es: ex.es,
          en: ex.en,
          ar: ex.ar,
          source: `Verb Context (${v.infinitive})`
        });
        if (results.length >= 4) return results;
      }
    }
  }

  // 4. Search in Vocabulary example sentences
  for (const item of ALL_VOCABULARY) {
    const list = item.examples || item.exampleSentences || [];
    for (const ex of list) {
      if (regex.test(ex.es) && !seenSpanish.has(ex.es)) {
        seenSpanish.add(ex.es);
        results.push({
          es: ex.es,
          en: ex.en,
          ar: ex.ar,
          source: `Lexicon Context (${item.spanish || item.word})`
        });
        if (results.length >= 4) return results;
      }
    }
  }

  return results;
}

// Krashen Comprehensibility Index & Statistics Calculator
export interface TextComprehensibilityReport {
  totalWords: number;
  uniqueWords: number;
  knownWordsCount: number;
  lingqsCount: number;
  newWordsCount: number;
  comprehensibilityPercentage: number;
  krashenEvaluation: {
    zone: 'optimal_i_plus_1' | 'comfort_zone' | 'challenging_zone';
    badge: string;
    description_en: string;
    description_ar: string;
    color: string;
  };
}

export function calculateComprehensibility(
  tokens: WordToken[],
  userProgress: UserProgress
): TextComprehensibilityReport {
  const wordTokens = tokens.filter(t => t.isWord);
  const totalWords = wordTokens.length;

  if (totalWords === 0) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      knownWordsCount: 0,
      lingqsCount: 0,
      newWordsCount: 0,
      comprehensibilityPercentage: 100,
      krashenEvaluation: {
        zone: 'comfort_zone',
        badge: '100% Comprehensible',
        description_en: 'All words known',
        description_ar: 'جميع الكلمات معروفة',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
      }
    };
  }

  const uniqueWordsSet = new Set<string>();
  let knownCount = 0;
  let lingqCount = 0;
  let newCount = 0;

  wordTokens.forEach(t => {
    uniqueWordsSet.add(t.clean);
    const state = getWordState(t.clean, userProgress);
    if (state === 'known') {
      knownCount++;
    } else if (state.startsWith('lingq_')) {
      lingqCount++;
    } else {
      newCount++;
    }
  });

  // Calculate percentage of text composed of known + active lingq words
  const comprehensibilityPercentage = Math.round(((knownCount + lingqCount * 0.75) / totalWords) * 100);

  let zone: 'optimal_i_plus_1' | 'comfort_zone' | 'challenging_zone' = 'optimal_i_plus_1';
  let badge = '🎯 Krashen i+1 Zone (92-98%)';
  let descEn = 'Ideal sweet spot for effortless acquisition without dictionary fatigue.';
  let descAr = 'النسبة المثالية لاكتساب اللغة بسلاسة ودون إرهاق القاموس.';
  let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  if (comprehensibilityPercentage >= 98) {
    zone = 'comfort_zone';
    badge = '⚡ Flow & Consolidation (98-100%)';
    descEn = 'High fluency speed reading. Excellent for solidifying speed and automaticity.';
    descAr = 'قراءة انسيابية سريعة ممتازة لترسيخ التلقائية والطلاقة.';
    color = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
  } else if (comprehensibilityPercentage < 90) {
    zone = 'challenging_zone';
    badge = '🔥 Intensive Acquisition (<90%)';
    descEn = 'Rich in new vocabulary. Use the interactive audio and 1-click LingQing to scaffold.';
    descAr = 'كثيف بالمفردات الجديدة. استخدم الاستماع المتزامن وأداة حفظ الكلمات للتدرج.';
    color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  }

  return {
    totalWords,
    uniqueWords: uniqueWordsSet.size,
    knownWordsCount: knownCount,
    lingqsCount: lingqCount,
    newWordsCount: newCount,
    comprehensibilityPercentage,
    krashenEvaluation: {
      zone,
      badge,
      description_en: descEn,
      description_ar: descAr,
      color
    }
  };
}

// Generate Cloze deletion string with masked target word
export function generateClozeSentence(fullSentence: string, targetWord: string): { clozePrompt: string; targetClean: string } {
  const norm = normalizeWord(targetWord);
  if (!norm || !fullSentence) {
    return { clozePrompt: fullSentence || '', targetClean: norm };
  }

  const regex = new RegExp(`\\b${norm}\\b`, 'i');
  const clozePrompt = fullSentence.replace(regex, '[ _____ ]');

  return {
    clozePrompt,
    targetClean: norm
  };
}

/**
 * Generates 3 distinct context-rich Cloze sentence variations for a target vocabulary item.
 * Variation 1: Conversational / Daily Life
 * Variation 2: Descriptive / Narrative
 * Variation 3: Expressive / Question / Collocation
 */
export function generate3ContextClozeExercises(
  vocab: VocabularyItem,
  fallbackVocabularyList: VocabularyItem[] = []
): ClozeSentenceVariation[] {
  const spanishWord = (vocab.spanish || vocab.word || '').trim();
  const englishMeaning = vocab.english || vocab.translation_en || '';
  const arabicMeaning = vocab.arabic || vocab.translation_ar || '';
  const cleanTarget = normalizeWord(spanishWord);

  if (!cleanTarget) return [];

  // Search existing contextual corpus
  const corpusContexts = findMultiContextSentences(cleanTarget);

  // Distractor generator
  const getDistractors = (exclude: string[]): string[] => {
    const pool = fallbackVocabularyList
      .map(v => (v.spanish || v.word || '').trim())
      .filter(w => w && !exclude.map(e => e.toLowerCase()).includes(w.toLowerCase()) && w.length > 2);

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 3);

    // Fallback options if pool is small
    const defaults = ['siempre', 'ahora', 'después', 'mañana', 'bueno', 'mucho', 'tiempo'];
    while (chosen.length < 3) {
      const d = defaults.find(item => !chosen.includes(item) && item.toLowerCase() !== cleanTarget.toLowerCase());
      if (d) chosen.push(d);
      else chosen.push('otro');
    }

    return chosen;
  };

  const variations: ClozeSentenceVariation[] = [];

  // Define 3 contextual frameworks
  const templates: {
    type: 'conversational' | 'descriptive' | 'expressive' | 'idiomatic';
    title: string;
    es: string;
    en: string;
    ar: string;
    tip: string;
  }[] = [
    {
      type: 'conversational',
      title: 'Context 1/3: Daily Conversation & High-Frequency Routine',
      es: corpusContexts[0]?.es || `En mi vida cotidiana, ${cleanTarget} es algo muy común y útil.`,
      en: corpusContexts[0]?.en || `In my daily life, ${englishMeaning} is something very common and useful.`,
      ar: corpusContexts[0]?.ar || `في حياتي اليومية، ${arabicMeaning} هو شيء شائع ومفيد جداً.`,
      tip: `Notice how "${cleanTarget}" functions naturally in common daily communication.`
    },
    {
      type: 'descriptive',
      title: 'Context 2/3: Descriptive Narrative & Real-World Setting',
      es: corpusContexts[1]?.es || `Durante el viaje por España, observamos ${cleanTarget} con gran detalle y atención.`,
      en: corpusContexts[1]?.en || `During the trip through Spain, we observed ${englishMeaning} with great detail and attention.`,
      ar: corpusContexts[1]?.ar || `خلال الرحلة في إسبانيا، لاحظنا ${arabicMeaning} بتفصيل وعناية كبيرة.`,
      tip: `Pay attention to the gender agreement and descriptive modifiers alongside "${cleanTarget}".`
    },
    {
      type: 'expressive',
      title: 'Context 3/3: Expressive Dialogue & Question Form',
      es: corpusContexts[2]?.es || `¿Podrías explicarme por qué ${cleanTarget} es tan importante en esta situación?`,
      en: corpusContexts[2]?.en || `Could you explain to me why ${englishMeaning} is so important in this situation?`,
      ar: corpusContexts[2]?.ar || `هل يمكنك أن تشرح لي لماذا ${arabicMeaning} مهم جداً في هذا الموقف؟`,
      tip: `Observe how native speakers use "${cleanTarget}" to express inquiries, opinions, and nuance.`
    }
  ];

  templates.forEach((t, index) => {
    let rawSentence = t.es;
    let targetInSentence = cleanTarget;

    // Check if target exists in rawSentence
    const regex = new RegExp(`\\b${cleanTarget}\\b`, 'i');
    let clozeSentence = '';

    if (regex.test(rawSentence)) {
      const match = rawSentence.match(regex);
      targetInSentence = match ? match[0] : cleanTarget;
      clozeSentence = rawSentence.replace(regex, '[ _____ ]');
    } else {
      rawSentence = `${t.es} (${cleanTarget})`;
      clozeSentence = `${t.es} ([ _____ ])`;
    }

    const distractors = getDistractors([targetInSentence, cleanTarget]);
    const options = [targetInSentence, ...distractors].sort(() => Math.random() - 0.5);

    variations.push({
      id: `cloze-${cleanTarget}-var-${index + 1}`,
      variationType: t.type,
      variationTitle: t.title,
      sentence_es: rawSentence,
      sentence_en: t.en,
      sentence_ar: t.ar,
      targetWord: cleanTarget,
      targetWordForm: targetInSentence,
      clozeSentence,
      options,
      explanation_en: `"${targetInSentence}" means "${englishMeaning}" (${arabicMeaning}). ${t.tip}`,
      explanation_ar: `كلمة "${targetInSentence}" تعني "${arabicMeaning}" (${englishMeaning}).`,
      grammarTip: t.tip
    });
  });

  return variations;
}

