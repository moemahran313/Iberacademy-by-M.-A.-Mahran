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
  // Articles, Pronouns, Prepositions, Conjunctions
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
  de: { en: "of / from", ar: "من / الخاص بـ", pos: "preposition" },
  del: { en: "of the", ar: "من الـ", pos: "preposition" },
  al: { en: "to the / per", ar: "إلى الـ / في الـ", pos: "preposition" },
  en: { en: "in / on / at", ar: "في / على", pos: "preposition" },
  a: { en: "to / at", ar: "إلى / في", pos: "preposition" },
  por: { en: "by / through / for", ar: "عبر / بسبب / من أجل", pos: "preposition" },
  para: { en: "for / to", ar: "لـ / لأجل / كي", pos: "preposition" },
  con: { en: "with", ar: "مع / بـ", pos: "preposition" },
  sin: { en: "without", ar: "بدون / دون", pos: "preposition" },
  su: { en: "his / her / its / their", ar: "خاصته / خاصتها", pos: "pronoun" },
  sus: { en: "his / her / its / their (plural)", ar: "خاصته / خاصتهم", pos: "pronoun" },
  mi: { en: "my", ar: "خاصتي / لي", pos: "pronoun" },
  mis: { en: "my (plural)", ar: "خاصتي (للجمع)", pos: "pronoun" },
  tu: { en: "your (singular)", ar: "خاصتك", pos: "pronoun" },
  tus: { en: "your (plural)", ar: "خاصتك (للجمع)", pos: "pronoun" },
  nuestro: { en: "our (masculine)", ar: "خاصتنا / مذكر", pos: "pronoun" },
  nuestra: { en: "our (feminine)", ar: "خاصتنا / مؤنث", pos: "pronoun" },
  nuestros: { en: "our (masculine plural)", ar: "خاصتنا / أطباقنا", pos: "pronoun" },
  nuestras: { en: "our (feminine plural)", ar: "خاصتنا / أمهاتنا", pos: "pronoun" },
  se: { en: "himself / herself (reflexive)", ar: "نفسه / ضمير انعكاسي", pos: "pronoun" },
  le: { en: "to him / to her", ar: "له / لها", pos: "pronoun" },
  les: { en: "to them / to you all", ar: "لهم / لكم", pos: "pronoun" },
  nos: { en: "us / to us", ar: "إيانا / لنا", pos: "pronoun" },
  lo: { en: "it / him / that", ar: "إياه / ذلك / الشيء", pos: "pronoun" },
  que: { en: "that / which / who", ar: "أن / الذي / التي", pos: "conjunction" },
  como: { en: "how / as / like", ar: "كيف / مثل / كما", pos: "adverb" },
  si: { en: "if", ar: "إذا / لو", pos: "conjunction" },
  sino: { en: "but rather / but also", ar: "بل / بل أيضاً", pos: "conjunction" },
  tambien: { en: "also / too", ar: "أيضاً / كذلك", pos: "adverb" },
  también: { en: "also / too", ar: "أيضاً / كذلك", pos: "adverb" },

  // Story 1: Un Día Tranquilo en Madrid
  sol: { en: "sun", ar: "الشمس", pos: "noun" },
  brilla: { en: "shines / is shining", ar: "تسطع / تشرق", pos: "verb" },
  cielo: { en: "sky", ar: "السماء", pos: "noun" },
  azul: { en: "blue", ar: "الأزرق", pos: "adjective" },
  madrid: { en: "Madrid", ar: "مدريد", pos: "noun" },
  carlos: { en: "Carlos", ar: "كارلوس", pos: "noun" },
  levanta: { en: "gets up / rises", ar: "يستيقظ / ينهض", pos: "verb" },
  ocho: { en: "eight", ar: "الثامنة / ثمانية", pos: "numeral" },
  mañana: { en: "morning / tomorrow", ar: "الصباح / غداً", pos: "noun" },
  abre: { en: "opens", ar: "يفتح", pos: "verb" },
  ventana: { en: "window", ar: "النافذة", pos: "noun" },
  respira: { en: "breathes", ar: "يتنفس", pos: "verb" },
  aire: { en: "air", ar: "الهواء", pos: "noun" },
  fresco: { en: "fresh", ar: "العليل / النقي / الطازج", pos: "adjective" },
  prepara: { en: "prepares", ar: "يعد / يجهّز", pos: "verb" },
  cafe: { en: "coffee", ar: "قهوة", pos: "noun" },
  café: { en: "coffee", ar: "قهوة", pos: "noun" },
  caliente: { en: "hot", ar: "ساخن", pos: "adjective" },
  leche: { en: "milk", ar: "الحليب", pos: "noun" },
  come: { en: "eats", ar: "يتناول / يأكل", pos: "verb" },
  tostada: { en: "toast", ar: "خبز محمص", pos: "noun" },
  aceite: { en: "oil", ar: "زيت", pos: "noun" },
  oliva: { en: "olive", ar: "الزيتون", pos: "noun" },
  tomate: { en: "tomato", ar: "طماطم", pos: "noun" },
  decide: { en: "decides", ar: "يقرر", pos: "verb" },
  salir: { en: "to go out / leave", ar: "الخروج / الذهاب", pos: "verb" },
  caminar: { en: "to walk", ar: "المشي / التنزه", pos: "verb" },
  parque: { en: "park", ar: "الحديقة / المنتزه", pos: "noun" },
  retiro: { en: "Retiro (famous park)", ar: "الريتيرو", pos: "noun" },
  muchas: { en: "many (feminine)", ar: "العديد من / الكثير", pos: "adjective" },
  familias: { en: "families", ar: "عائلات / أسر", pos: "noun" },
  felices: { en: "happy (plural)", ar: "سعيدات / سعداء", pos: "adjective" },
  algunos: { en: "some", ar: "بعض", pos: "pronoun" },
  niños: { en: "children / boys", ar: "أطفال", pos: "noun" },
  juegan: { en: "play (plural)", ar: "يلعبون", pos: "verb" },
  pelota: { en: "ball", ar: "كرة", pos: "noun" },
  otros: { en: "others", ar: "آخرون", pos: "pronoun" },
  montan: { en: "ride (plural) / go on (often used as 'montan en bicicleta', though 'andan en/a bicicleta' is preferred)", ar: "يركبون / يذهبون بـ", pos: "verb" },
  andan: { en: "ride (plural) / walk / travel (as in 'andan en/a bicicleta')", ar: "يتنقلون / يركبون", pos: "verb" },
  andar: { en: "to ride / to walk / to travel", ar: "التنقل / ركوب", pos: "verb" },
  bicicleta: { en: "bicycle", ar: "دراجة هوائية", pos: "noun" },
  lee: { en: "reads", ar: "يقرأ", pos: "verb" },
  libro: { en: "book", ar: "كتاب", pos: "noun" },
  favorito: { en: "favorite", ar: "المفضل", pos: "adjective" },
  bajo: { en: "under / low", ar: "تحت", pos: "preposition" },
  sombra: { en: "shade / shadow", ar: "ظل", pos: "noun" },
  gran: { en: "great / big", ar: "كبير", pos: "adjective" },
  arbol: { en: "tree", ar: "شجرة", pos: "noun" },
  árbol: { en: "tree", ar: "شجرة", pos: "noun" },

  // Story 2: El Viaje a Oaxaca
  verano: { en: "summer", ar: "الصيف", pos: "noun" },
  pasado: { en: "past / last", ar: "الماضي", pos: "adjective" },
  lucia: { en: "Lucía", ar: "لوسيا", pos: "noun" },
  lucía: { en: "Lucía", ar: "لوسيا", pos: "noun" },
  viajo: { en: "traveled", ar: "سافر / سافرت", pos: "verb" },
  viajó: { en: "traveled", ar: "سافر / سافرت", pos: "verb" },
  oaxaca: { en: "Oaxaca", ar: "أوكساكا", pos: "noun" },
  ciudad: { en: "city", ar: "مدينة", pos: "noun" },
  famosa: { en: "famous", ar: "شهيرة / معروفة", pos: "adjective" },
  sur: { en: "south", ar: "جنوب", pos: "noun" },
  mexico: { en: "Mexico", ar: "المكسيك", pos: "noun" },
  méxico: { en: "Mexico", ar: "المكسيك", pos: "noun" },
  gastronomia: { en: "gastronomy / culinary art", ar: "فنون الطهي / المطبخ", pos: "noun" },
  gastronomía: { en: "gastronomy / culinary art", ar: "فنون الطهي / المطبخ", pos: "noun" },
  tradiciones: { en: "traditions", ar: "تقاليد", pos: "noun" },
  vivas: { en: "living", ar: "حية / نابضة بالحياة", pos: "adjective" },
  dia: { en: "day", ar: "يوم", pos: "noun" },
  día: { en: "day", ar: "يوم", pos: "noun" },
  mientras: { en: "while", ar: "بينما / في حين", pos: "conjunction" },
  caminaba: { en: "was walking", ar: "كانت تمشي", pos: "verb" },
  calles: { en: "streets", ar: "شوارع", pos: "noun" },
  empedradas: { en: "cobbled / paved with stones", ar: "مرصوفة بالحجارة", pos: "adjective" },
  señora: { en: "lady / woman", ar: "سيدة / امرأة", pos: "noun" },
  amable: { en: "kind / friendly", ar: "لطيفة / ودودة", pos: "adjective" },
  recomendo: { en: "recommended", ar: "نصحت / أوصت", pos: "verb" },
  recomendó: { en: "recommended", ar: "نصحت / أوصت", pos: "verb" },
  visitar: { en: "to visit", ar: "زيارة / أن يزور", pos: "verb" },
  pequeño: { en: "small / little", ar: "صغير", pos: "adjective" },
  mercado: { en: "market", ar: "سوق", pos: "noun" },
  artesanal: { en: "artisanal / craft", ar: "حرفي", pos: "adjective" },
  aparecia: { en: "appeared / showed up", ar: "تظهر / كان يظهر", pos: "verb" },
  aparecía: { en: "appeared / showed up", ar: "تظهر / كان يظهر", pos: "verb" },
  mapas: { en: "maps", ar: "خرائط", pos: "noun" },
  turisticos: { en: "tourist (plural)", ar: "سياحية", pos: "adjective" },
  turísticos: { en: "tourist (plural)", ar: "سياحية", pos: "adjective" },
  alli: { en: "there", ar: "هناك", pos: "adverb" },
  allí: { en: "there", ar: "هناك", pos: "adverb" },
  encontro: { en: "found", ar: "وجدت / عثرت", pos: "verb" },
  encontró: { en: "found", ar: "وجدت / عثرت", pos: "verb" },
  telas: { en: "fabrics / cloths", ar: "أقمشة", pos: "noun" },
  tejidas: { en: "woven", ar: "منسوجة", pos: "adjective" },
  mano: { en: "hand", ar: "يد", pos: "noun" },
  colores: { en: "colors", ar: "ألوان", pos: "noun" },
  brillantes: { en: "bright / shining", ar: "زاهية / لامعة", pos: "adjective" },
  probo: { en: "tasted / tried", ar: "تذوقت / جربت", pos: "verb" },
  probó: { en: "tasted / tried", ar: "تذوقت / جربت", pos: "verb" },
  autentico: { en: "authentic / genuine", ar: "أصلي / حقيقي", pos: "adjective" },
  auténtico: { en: "authentic / genuine", ar: "أصلي / حقيقي", pos: "adjective" },
  chocolate: { en: "chocolate", ar: "شوكولاتة", pos: "noun" },
  canela: { en: "cinnamon", ar: "قرفة", pos: "noun" },
  experiencia: { en: "experience", ar: "تجربة", pos: "noun" },
  viaje: { en: "trip / journey", ar: "رحلة", pos: "noun" },

  // Story 3: El Dilema de las Ciudades Sostenibles
  medida: { en: "measure / as", ar: "مقياس / بقدر ما", pos: "noun" },
  poblaciones: { en: "populations", ar: "سكان / جموع", pos: "noun" },
  urbanas: { en: "urban", ar: "حضرية / المدن", pos: "adjective" },
  crecen: { en: "grow", ar: "ينمو / يكبرون", pos: "verb" },
  ritmo: { en: "rhythm / pace", ar: "وتيرة / إيقاع", pos: "noun" },
  acelerado: { en: "accelerated / fast", ar: "متسارعة / سريع", pos: "adjective" },
  arquitectos: { en: "architects", ar: "معماريون", pos: "noun" },
  planificadores: { en: "planners / urban planners", ar: "مخططو المدن", pos: "noun" },
  enfrentan: { en: "face / confront", ar: "يواجهون", pos: "verb" },
  desafio: { en: "challenge", ar: "تحدٍ", pos: "noun" },
  desafío: { en: "challenge", ar: "تحدٍ", pos: "noun" },
  crucial: { en: "crucial / critical", ar: "حاسم / جوهري", pos: "adjective" },
  transformar: { en: "to transform", ar: "تحويل / يغير", pos: "verb" },
  metropolis: { en: "metropolises", ar: "مدن كبرى", pos: "noun" },
  metrópolis: { en: "metropolises", ar: "مدن كبرى", pos: "noun" },
  espacios: { en: "spaces", ar: "مساحات / فضاءات", pos: "noun" },
  ecologicos: { en: "ecological / eco-friendly", ar: "بيئية", pos: "adjective" },
  ecológicos: { en: "ecological / eco-friendly", ar: "بيئية", pos: "adjective" },
  perder: { en: "to lose", ar: "فقدان / خسارة", pos: "verb" },
  vitalidad: { en: "vitality", ar: "حيوية", pos: "noun" },
  economica: { en: "economic", ar: "اقتصادية", pos: "adjective" },
  económica: { en: "economic", ar: "اقتصادية", pos: "adjective" },
  varios: { en: "several / various", ar: "عدة / متنوع", pos: "adjective" },
  expertos: { en: "experts", ar: "خبراء", pos: "noun" },
  sugieren: { en: "suggest", ar: "يقترحون", pos: "verb" },
  fundamental: { en: "fundamental / essential", ar: "ضروري / أساسي", pos: "adjective" },
  gobiernos: { en: "governments", ar: "حكومات", pos: "noun" },
  inviertan: { en: "invest (subjunctive)", ar: "يستثمرون", pos: "verb" },
  transporte: { en: "transport", ar: "النقل", pos: "noun" },
  publico: { en: "public", ar: "العام", pos: "noun" },
  público: { en: "public", ar: "العام", pos: "noun" },
  eficiente: { en: "efficient", ar: "فعال / كفؤ", pos: "adjective" },
  energias: { en: "energies", ar: "طاقات", pos: "noun" },
  energías: { en: "energies", ar: "طاقات", pos: "noun" },
  renovables: { en: "renewable", ar: "متجددة", pos: "adjective" },
  todos: { en: "all / everyone", ar: "الجميع / كلنا", pos: "pronoun" },
  utilizaramos: { en: "used (subjunctive)", ar: "استخدمنا", pos: "verb" },
  utilizáramos: { en: "used (subjunctive)", ar: "استخدمنا", pos: "verb" },
  bicicletas: { en: "bicycles", ar: "دراجات هوائية", pos: "noun" },
  trayectos: { en: "trips / routes", ar: "مسافات / مسارات", pos: "noun" },
  cortos: { en: "short", ar: "قصيرة", pos: "adjective" },
  calidad: { en: "quality", ar: "جودة", pos: "noun" },
  sustancialmente: { en: "substantially", ar: "بشكل جوهري / ملحوظ", pos: "adverb" },
  mejoraria: { en: "would improve", ar: "لتحسنت", pos: "verb" },
  mejoraría: { en: "would improve", ar: "لتحسنت", pos: "verb" },

  // Curated Content Vocabulary
  reciente: { en: "recent", ar: "حديث / مؤخر", pos: "adjective" },
  estudio: { en: "study / research", ar: "دراسة / بحث", pos: "noun" },
  cientifico: { en: "scientific / scientist", ar: "علمي / عالم", pos: "adjective" },
  científico: { en: "scientific / scientist", ar: "علمي / عالم", pos: "adjective" },
  internacional: { en: "international", ar: "دولي / عالمي", pos: "adjective" },
  confirma: { en: "confirms / verifies", ar: "يؤكد / يثبت", pos: "verb" },
  dieta: { en: "diet / nutrition plan", ar: "نظام غذائي / حمية", pos: "noun" },
  mediterranea: { en: "Mediterranean", ar: "متوسطية / البحر المتوسط", pos: "adjective" },
  mediterránea: { en: "Mediterranean", ar: "متوسطية / البحر المتوسط", pos: "adjective" },
  tradicional: { en: "traditional", ar: "تقليدي / عريق", pos: "adjective" },
  protege: { en: "protects / safeguards", ar: "يحمي / يصون", pos: "verb" },
  corazon: { en: "heart", ar: "القلب", pos: "noun" },
  corazón: { en: "heart", ar: "القلب", pos: "noun" },
  prolonga: { en: "prolongs / extends", ar: "يطيل / يمدد", pos: "verb" },
  longevidad: { en: "longevity", ar: "طول العمر / المعمَرية", pos: "noun" },
  ingredientes: { en: "ingredients", ar: "مكونات / عناصر", pos: "noun" },
  fundamentales: { en: "fundamental", ar: "أساسية / جوهرية", pos: "adjective" },
  incluyen: { en: "include", ar: "تشمل / تتضمن", pos: "verb" },
  virgen: { en: "virgin / pure", ar: "بكر / خالص", pos: "adjective" },
  extra: { en: "extra / premium", ar: "ممتاز / إضافي", pos: "adjective" },
  verduras: { en: "vegetables", ar: "خضروات", pos: "noun" },
  temporada: { en: "season / period", ar: "موسم / فترة", pos: "noun" },
  legumbres: { en: "legumes", ar: "بقوليات", pos: "noun" },
  pescados: { en: "fish", ar: "أسماك", pos: "noun" },
  azules: { en: "blue / oily", ar: "زرقاء / زيتية", pos: "adjective" },
  frutos: { en: "fruits / nuts", ar: "ثمار / فواكه", pos: "noun" },
  secos: { en: "dry / dried", ar: "جافة / مجففة", pos: "adjective" },
  italia: { en: "Italy", ar: "إيطاليا", pos: "noun" },
  continuan: { en: "continue", ar: "يواصلون / يستمرون", pos: "verb" },
  continúan: { en: "continue", ar: "يواصلون / يستمرون", pos: "verb" },
  costumbre: { en: "custom / habit", ar: "عادة / تقاليد", pos: "noun" },
  cocinar: { en: "to cook", ar: "الطهي / يطبخ", pos: "verb" },
  juntos: { en: "together", ar: "معاً / سوياً", pos: "adjective" },
  fines: { en: "ends / weekends", ar: "نهايات / عطلات", pos: "noun" },
  semana: { en: "week", ar: "أسبوع", pos: "noun" },
  nutricionistas: { en: "nutritionists", ar: "خبراء التغذية", pos: "noun" },
  recomiendan: { en: "recommend", ar: "ينصحون / يوصون", pos: "verb" },
  evitar: { en: "to avoid", ar: "تجنب / تفادي", pos: "verb" },
  alimentos: { en: "foods", ar: "أطعمة / أغذية", pos: "noun" },
  ultraprocesados: { en: "ultra-processed", ar: "فائقة المعالجة", pos: "adjective" },
  recuperar: { en: "to recover / reclaim", ar: "استعادة / استرجاع", pos: "verb" },
  recetas: { en: "recipes", ar: "وصفات طعام", pos: "noun" },
  abuelas: { en: "grandmothers", ar: "جدات", pos: "noun" },
  ricas: { en: "rich", ar: "غنية", pos: "adjective" },
  fibra: { en: "fiber", ar: "ألياف", pos: "noun" },
  natural: { en: "natural", ar: "طبيعي", pos: "adjective" },
  antioxidantes: { en: "antioxidants", ar: "مضادات الأكسدة", pos: "noun" },
  esenciales: { en: "essential", ar: "ضرورية / أساسية", pos: "adjective" },
  comer: { en: "to eat / dining", ar: "الأكل / تناول الطعام", pos: "verb" },
  bien: { en: "well / good", ar: "جيداً / بشكل حسَن", pos: "adverb" },
  parte: { en: "part / portion", ar: "جزء / جانب", pos: "noun" },
  inseparable: { en: "inseparable", ar: "لا يتجزأ / لا ينفصل", pos: "adjective" },
  cultura: { en: "culture", ar: "ثقافة", pos: "noun" },
  hispana: { en: "Hispanic", ar: "إسبانية / هيسبانية", pos: "adjective" },
  declarada: { en: "declared", ar: "معلنة / مصنّفة", pos: "adjective" },
  patrimonio: { en: "heritage / legacy", ar: "تراث / إرث", pos: "noun" },
  vivo: { en: "living", ar: "حي / نابض", pos: "adjective" },
  saludable: { en: "healthy", ar: "صحي / مفيد للصحة", pos: "adjective" },

  // News 1 & Additional
  revolucion: { en: "revolution", ar: "ثورة", pos: "noun" },
  revolución: { en: "revolution", ar: "ثورة", pos: "noun" },
  energia: { en: "energy", ar: "طاقة", pos: "noun" },
  energía: { en: "energy", ar: "طاقة", pos: "noun" },
  solar: { en: "solar", ar: "شمسية", pos: "adjective" },
  convertido: { en: "become / converted", ar: "أصبحت / تحولت", pos: "verb" },
  uno: { en: "one", ar: "واحد", pos: "numeral" },
  lideres: { en: "leaders", ar: "قادة / رائدة", pos: "noun" },
  líderes: { en: "leaders", ar: "قادة / رائدة", pos: "noun" },
  europeos: { en: "European", ar: "أوروبيون", pos: "adjective" },
  indiscutibles: { en: "undisputed", ar: "بلا منازع", pos: "adjective" },
  generacion: { en: "generation", ar: "توليد / إنتاج", pos: "noun" },
  generación: { en: "generation", ar: "توليد / إنتاج", pos: "noun" },
  fotovoltaica: { en: "photovoltaic", ar: "كهروضوئية", pos: "adjective" },
  gracias: { en: "thanks / gratitude", ar: "بفضل / شكراً", pos: "noun" },
  tres: { en: "three", ar: "ثلاثة", pos: "numeral" },
  mil: { en: "thousand", ar: "ألف", pos: "numeral" },
  horas: { en: "hours", ar: "ساعات", pos: "noun" },
  año: { en: "year", ar: "سنة / عام", pos: "noun" },
  regiones: { en: "regions", ar: "مناطق / إقليم", pos: "noun" },
  andalucia: { en: "Andalusia", ar: "الأندلس", pos: "noun" },
  andalucía: { en: "Andalusia", ar: "الأندلس", pos: "noun" },
  extremadura: { en: "Extremadura", ar: "إكستريمادورا", pos: "noun" },
  pais: { en: "country", ar: "بلد / دولة", pos: "noun" },
  país: { en: "country", ar: "بلد / دولة", pos: "noun" },
  esta: { en: "is / this (f)", ar: "يكون / هذه", pos: "verb" },
  está: { en: "is / located", ar: "يكون / تقوم بـ", pos: "verb" },
  transformando: { en: "transforming", ar: "تغير / تحوّل", pos: "verb" },
  radicalmente: { en: "radically", ar: "جذرياً / بشكل كلي", pos: "adverb" },
  matriz: { en: "matrix / source grid", ar: "مصفوفة / هيكل", pos: "noun" },
  energetica: { en: "energy (f)", ar: "الطاقة", pos: "adjective" },
  energética: { en: "energy (f)", ar: "الطاقة", pos: "adjective" },
  parques: { en: "parks / solar farms", ar: "مزارع / حقول", pos: "noun" },
  solares: { en: "solar", ar: "شمسية", pos: "adjective" },
  modernos: { en: "modern", ar: "حديثة", pos: "adjective" },
  reducen: { en: "reduce", ar: "تخفض / تقلل", pos: "verb" },
  emisiones: { en: "emissions", ar: "انبعاثات", pos: "noun" },
  carbono: { en: "carbon", ar: "كربون", pos: "noun" },
  forma: { en: "form / manner", ar: "شكل / طريقة", pos: "noun" },
  masiva: { en: "massive", ar: "هائلة / ضخمة", pos: "adjective" },
  generan: { en: "generate", ar: "تولّد / توفّر", pos: "verb" },
  miles: { en: "thousands", ar: "آلاف", pos: "noun" },
  empleos: { en: "jobs", ar: "وظائف / فرص عمل", pos: "noun" },
  tecnicos: { en: "technical / technicians", ar: "تقنية / فنية", pos: "adjective" },
  técnicos: { en: "technical / technicians", ar: "تقنية / فنية", pos: "adjective" },
  altamente: { en: "highly", ar: "عالية / بدرجة كبيرة", pos: "adverb" },
  calificados: { en: "qualified", ar: "مؤهلة / ذات مهارة", pos: "adjective" },
  señalan: { en: "point out", ar: "يشيرون / يوضحون", pos: "verb" },
  actual: { en: "current", ar: "حالي / راهن", pos: "adjective" },
  radica: { en: "lies in", ar: "يتمثل / يكمن في", pos: "verb" },
  mejorar: { en: "to improve", ar: "تحسين / تطوير", pos: "verb" },
  tecnologias: { en: "technologies", ar: "تقنيات / تكنولوجيا", pos: "noun" },
  tecnologías: { en: "technologies", ar: "تقنيات / تكنولوجيا", pos: "noun" },
  almacenamiento: { en: "storage", ar: "تخزين", pos: "noun" },
  baterias: { en: "batteries", ar: "بطاريات", pos: "noun" },
  baterías: { en: "batteries", ar: "بطاريات", pos: "noun" },
  gigantes: { en: "giant", ar: "عملاقة / ضخمة", pos: "adjective" },
  garantizar: { en: "to guarantee", ar: "ضمان / تأمين", pos: "verb" },
  suministro: { en: "supply", ar: "إمداد / تزويد", pos: "noun" },
  electrico: { en: "electric", ar: "كهربائي", pos: "adjective" },
  eléctrico: { en: "electric", ar: "كهربائي", pos: "adjective" },
  continuo: { en: "continuous", ar: "مستمر / دائم", pos: "adjective" },
  noches: { en: "nights", ar: "ليالي / ليالٍ", pos: "noun" },
  transicion: { en: "transition", ar: "تحول / انتقال", pos: "noun" },
  transición: { en: "transition", ar: "تحول / انتقال", pos: "noun" },
  hacia: { en: "towards", ar: "نحو / باتجاه", pos: "preposition" },
  economia: { en: "economy", ar: "اقتصاد", pos: "noun" },
  economía: { en: "economy", ar: "اقتصاد", pos: "noun" },
  completamente: { en: "completely", ar: "بالكامل / تماماً", pos: "adverb" },
  verde: { en: "green", ar: "خضراء / بيئية", pos: "adjective" },
  parece: { en: "seems", ar: "يبدو / يظهر", pos: "verb" },
  ahora: { en: "now", ar: "الآن", pos: "adverb" },
  cercana: { en: "close", ar: "قريبة", pos: "adjective" },
  nunca: { en: "never", ar: "أبداً", pos: "adverb" },

  // Culture & Dialogues & Science
  camarero: { en: "waiter", ar: "نادل", pos: "noun" },
  buenas: { en: "good", ar: "طيبة / خير", pos: "adjective" },
  tardes: { en: "afternoons", ar: "مساء", pos: "noun" },
  señores: { en: "gentlemen / sirs", ar: "سادة / ضيوف", pos: "noun" },
  bienvenidos: { en: "welcome", ar: "أهلاً وسهلاً", pos: "interjection" },
  cava: { en: "cellar / La Cava", ar: "قبو / لا كافا", pos: "noun" },
  apetece: { en: "feels like / fancies", ar: "يروق لكم / يطيب لكم", pos: "verb" },
  tomar: { en: "to take / to drink", ar: "تناول / شرب", pos: "verb" },
  empezar: { en: "to start / begin", ar: "البدء / البداية", pos: "verb" },
  miran: { en: "look at", ar: "تطالعون / تنظرون", pos: "verb" },
  carta: { en: "menu / letter", ar: "قائمة الطعام / رسالة", pos: "noun" },
  alberto: { en: "Alberto", ar: "ألبرتو", pos: "noun" },
  caña: { en: "draft beer", ar: "كأس بيرة إسبانية", pos: "noun" },
  fria: { en: "cold", ar: "باردة", pos: "adjective" },
  fría: { en: "cold", ar: "باردة", pos: "adjective" },
  favor: { en: "favor", ar: "فضل / معروف", pos: "noun" },
  compañera: { en: "companion", ar: "زميلة / رفيقة", pos: "noun" },
  copa: { en: "glass (wine)", ar: "كأس نبيذ", pos: "noun" },
  tinto: { en: "red wine", ar: "أحمر (للنبيذ)", pos: "adjective" },
  rioja: { en: "Rioja", ar: "ريوخا", pos: "noun" },
  marchando: { en: "coming right up", ar: "جاري التحضير فوراً", pos: "verb" },
  puesto: { en: "served / placed", ar: "وضعت لكم / قدمت", pos: "verb" },
  tapita: { en: "small tapa", ar: "مقبلات صغيرة", pos: "noun" },
  cortesia: { en: "courtesy", ar: "ضيافة مجانية", pos: "noun" },
  cortesía: { en: "courtesy", ar: "ضيافة مجانية", pos: "noun" },
  aceitunas: { en: "olives", ar: "زيتون", pos: "noun" },
  aliñadas: { en: "seasoned", ar: "متبل / مخلل", pos: "adjective" },
  queso: { en: "cheese", ar: "جبن", pos: "noun" },
  manchego: { en: "Manchego cheese", ar: "مانشيجو", pos: "adjective" },
  curado: { en: "cured / aged", ar: "معتق / قديم", pos: "adjective" },
  elena: { en: "Elena", ar: "إيلينا", pos: "noun" },
  muchisimas: { en: "so many / huge", ar: "جزيل / كثير جداً", pos: "adjective" },
  muchísimas: { en: "so many / huge", ar: "جزيل / كثير جداً", pos: "adjective" },
  huele: { en: "smells", ar: "تفوح رائحتها", pos: "verb" },
  delicioso: { en: "delicious", ar: "شهي / لذيذ", pos: "adjective" },
  recomiendas: { en: "recommend", ar: "تنصحنا / توصي", pos: "verb" },
  alguna: { en: "any / some", ar: "أي / بعض", pos: "pronoun" },
  especialidad: { en: "specialty", ar: "طبق مميز / التخصص", pos: "noun" },
  casa: { en: "house / restaurant", ar: "المطعم / المنزل", pos: "noun" },
  compartir: { en: "to share", ar: "المشاركة / التشارك", pos: "verb" },
  duda: { en: "doubt", ar: "شك", pos: "noun" },
  tienen: { en: "have / must", ar: "يجب عليكم / تملكون", pos: "verb" },
  probar: { en: "to try / taste", ar: "تجربة / تذوق", pos: "verb" },
  huevos: { en: "eggs", ar: "بيض", pos: "noun" },
  rotos: { en: "broken / scrambled", ar: "مقلي ومفتت", pos: "adjective" },
  jamon: { en: "ham", ar: "لحم قديد / جامون", pos: "noun" },
  jamón: { en: "ham", ar: "لحم قديد / جامون", pos: "noun" },
  iberico: { en: "Iberian", ar: "إيبيري", pos: "adjective" },
  ibérico: { en: "Iberian", ar: "إيبيري", pos: "adjective" },
  bellota: { en: "acorn / acorn-fed", ar: "بلوط", pos: "noun" },
  croquetas: { en: "croquettes", ar: "كروكيت", pos: "noun" },
  caseras: { en: "homemade", ar: "منزلية الصنع", pos: "adjective" },
  boletus: { en: "wild mushrooms", ar: "فطر بو ليتوس / مشروم", pos: "noun" },
  son: { en: "are", ar: "تكون / هي", pos: "verb" },
  favoritas: { en: "favorites", ar: "المفضلة", pos: "adjective" },
  clientes: { en: "customers", ar: "زبائن / عملاء", pos: "noun" },
  habituales: { en: "regular / frequent", ar: "دائمون / معتادون", pos: "adjective" },
  perfecto: { en: "perfect", ar: "ممتاز / تام", pos: "adjective" },
  traiganos: { en: "bring us", ar: "أحضر لنا", pos: "verb" },
  tráiganos: { en: "bring us", ar: "أحضر لنا", pos: "verb" },
  racion: { en: "portion", ar: "وجبة / طبق", pos: "noun" },
  ración: { en: "portion", ar: "وجبة / طبق", pos: "noun" },
  media: { en: "half", ar: "نصف", pos: "adjective" },
  pan: { en: "bread", ar: "خبز", pos: "noun" },
  crujiente: { en: "crispy", ar: "مقرمش", pos: "adjective" },
  recien: { en: "freshly / just", ar: "حديثاً / توّاً", pos: "adverb" },
  recién: { en: "freshly / just", ar: "حديثاً / توّاً", pos: "adverb" },
  horneado: { en: "baked", ar: "مخبوز", pos: "adjective" },

  // Legado Andalusi & Toledo & Science
  legado: { en: "legacy / heritage", ar: "إرث / إرث تاريخي", pos: "noun" },
  andalusi: { en: "Andalusian", ar: "أندلسي", pos: "adjective" },
  andalusí: { en: "Andalusian", ar: "أندلسي", pos: "adjective" },
  puente: { en: "bridge", ar: "جسر", pos: "noun" },
  arabe: { en: "Arabic", ar: "عربي / اللغة العربية", pos: "adjective" },
  árabe: { en: "Arabic", ar: "عربي / اللغة العربية", pos: "adjective" },
  lengua: { en: "language", ar: "لغة / لسان", pos: "noun" },
  española: { en: "Spanish (f)", ar: "إسبانية", pos: "adjective" },
  casi: { en: "almost", ar: "تقريباً / زهاء", pos: "adverb" },
  siglos: { en: "centuries", ar: "قرون", pos: "noun" },
  presencia: { en: "presence", ar: "وجود / حضور", pos: "noun" },
  peninsula: { en: "peninsula", ar: "شبه جزيرة", pos: "noun" },
  península: { en: "peninsula", ar: "شبه جزيرة", pos: "noun" },
  iberica: { en: "Iberian", ar: "إيبيرية", pos: "adjective" },
  ibérica: { en: "Iberian", ar: "إيبيرية", pos: "adjective" },
  andalus: { en: "Al-Andalus", ar: "الأندلس", pos: "noun" },
  ándalus: { en: "Al-Andalus", ar: "الأندلس", pos: "noun" },
  transformo: { en: "transformed", ar: "غيّر / حوّل", pos: "verb" },
  transformó: { en: "transformed", ar: "غيّر / حوّل", pos: "verb" },
  siempre: { en: "always", ar: "الأبد / دائماً", pos: "adverb" },
  ciencia: { en: "science", ar: "علم / علوم", pos: "noun" },
  agricultura: { en: "agriculture", ar: "زراعة", pos: "noun" },
  idioma: { en: "language", ar: "لغة", pos: "noun" },
  cuatro: { en: "four", ar: "أربعة", pos: "numeral" },
  palabras: { en: "words", ar: "كلمات / مفردات", pos: "noun" },
  lexico: { en: "lexicon", ar: "معجم / قاموس", pos: "noun" },
  léxico: { en: "lexicon", ar: "معجم / قاموس", pos: "noun" },
  español: { en: "Spanish", ar: "إسباني", pos: "adjective" },
  provienen: { en: "stem from", ar: "تأتي من / تنحدر من", pos: "verb" },
  directamente: { en: "directly", ar: "مباشرة", pos: "adverb" },
  clasico: { en: "classical", ar: "فصحى / كلاسيكي", pos: "adjective" },
  clásico: { en: "classical", ar: "فصحى / كلاسيكي", pos: "adjective" },
  dialecto: { en: "dialect", ar: "لهجة", pos: "noun" },
  terminos: { en: "terms", ar: "مصطلحات / كلمات", pos: "noun" },
  términos: { en: "terms", ar: "مصطلحات / كلمات", pos: "noun" },
  comienzan: { en: "start", ar: "تبدأ", pos: "verb" },
  prefijo: { en: "prefix", ar: "بادئة", pos: "noun" },
  raiz: { en: "root", ar: "جذر / أصل", pos: "noun" },
  raíz: { en: "root", ar: "جذر / أصل", pos: "noun" },
  arabiga: { en: "Arabic", ar: "عربية", pos: "adjective" },
  arábiga: { en: "Arabic", ar: "عربية", pos: "adjective" },
  tales: { en: "such", ar: "مثل", pos: "adjective" },
  alcalde: { en: "mayor / judge", ar: "عمدة / القاضي", pos: "noun" },
  algodon: { en: "cotton", ar: "قطن", pos: "noun" },
  algodón: { en: "cotton", ar: "قطن", pos: "noun" },
  almohada: { en: "pillow", ar: "وسادة / مخدة", pos: "noun" },
  alcazar: { en: "fortress / palace", ar: "قصر / قلعة", pos: "noun" },
  alcázar: { en: "fortress / palace", ar: "قصر / قلعة", pos: "noun" },
  algebra: { en: "algebra", ar: "علم الجبر", pos: "noun" },
  álgebra: { en: "algebra", ar: "علم الجبر", pos: "noun" },
  asimismo: { en: "likewise", ar: "كذلك / بالإضافة إلى ذلك", pos: "adverb" },
  arquitectura: { en: "architecture", ar: "عمارة / هندسة معمارية", pos: "noun" },
  mudejar: { en: "Mudejar style", ar: "مدجّن", pos: "adjective" },
  mudéjar: { en: "Mudejar style", ar: "مدجّن", pos: "adjective" },
  intrincados: { en: "intricate", ar: "معقدة / دقيقة", pos: "adjective" },
  azulejos: { en: "tiles", ar: "زليج / بلاط مزخرف", pos: "noun" },
  geometricos: { en: "geometric", ar: "هندسية", pos: "adjective" },
  geométricos: { en: "geometric", ar: "هندسية", pos: "adjective" },
  avanzados: { en: "advanced", ar: "متقدمة / متطورة", pos: "adjective" },
  sistemas: { en: "systems", ar: "أنظمة / أنماط", pos: "noun" },
  regadio: { en: "irrigation", ar: "ري / سقاية", pos: "noun" },
  regadío: { en: "irrigation", ar: "ري / سقاية", pos: "noun" },
  acequias: { en: "irrigation canals", ar: "سواقي / قنوات ري", pos: "noun" },
  siguen: { en: "continue to", ar: "تستمر / تواصل", pos: "verb" },
  asombrando: { en: "amazing", ar: "إبهار / إدهاش", pos: "verb" },
  historiadores: { en: "historians", ar: "مؤرخين", pos: "noun" },
  planeta: { en: "planet", ar: "كوكب / العالم", pos: "noun" },
  fascinante: { en: "fascinating", ar: "مذهل / ساحر", pos: "adjective" },
  simbiosis: { en: "symbiosis", ar: "تكافل / تمازج", pos: "noun" },
  cultural: { en: "cultural", ar: "ثقافي", pos: "adjective" },
  demuestra: { en: "demonstrates", ar: "يثبت / يظهر", pos: "verb" },
  enriquecido: { en: "enriched", ar: "مثرى / غني", pos: "adjective" },
  convivencia: { en: "coexistence", ar: "تعايش / وئام", pos: "noun" },

  // Toledo Mystery & Tech & Patagonia & AI
  misterio: { en: "mystery", ar: "غموض / لغز", pos: "noun" },
  llave: { en: "key", ar: "مفتاح", pos: "noun" },
  toledo: { en: "Toledo", ar: "طليطلة", pos: "noun" },
  mateo: { en: "Mateo", ar: "ماتيو", pos: "noun" },
  callejones: { en: "alleys", ar: "أزقة / حارات", pos: "noun" },
  casco: { en: "old town", ar: "المركز القديم", pos: "noun" },
  antiguo: { en: "ancient / old", ar: "قديم / أثري", pos: "adjective" },
  tormenta: { en: "storm", ar: "عاصفة", pos: "noun" },
  repentina: { en: "sudden", ar: "مفاجئة", pos: "adjective" },
  obligo: { en: "forced", ar: "أجبرته / اضطرته", pos: "verb" },
  obligó: { en: "forced", ar: "أجبرته / اضطرته", pos: "verb" },
  refugiarse: { en: "to take shelter", ar: "الاحتماء / اللجوء", pos: "verb" },
  pequeña: { en: "small (f)", ar: "صغيرة", pos: "adjective" },
  tienda: { en: "shop / store", ar: "متجر / دكان", pos: "noun" },
  antiguedades: { en: "antiques", ar: "تحف قديمة / أثريات", pos: "noun" },
  antigüedades: { en: "antiques", ar: "تحف قديمة / أثريات", pos: "noun" },
  anciano: { en: "elderly man", ar: "مسن / عجوز", pos: "noun" },
  propietario: { en: "owner", ar: "مالك / صاحب المتجر", pos: "noun" },
  don: { en: "Don (title)", ar: "دون (لقب احترام)", pos: "noun" },
  rodrigo: { en: "Rodrigo", ar: "رودريغو", pos: "noun" },
  estaba: { en: "was", ar: "كان", pos: "verb" },
  limpiando: { en: "cleaning", ar: "ينظف", pos: "verb" },
  viejo: { en: "old", ar: "قديم", pos: "adjective" },
  baul: { en: "chest / trunk", ar: "صندوق خشبي", pos: "noun" },
  baúl: { en: "chest / trunk", ar: "صندوق خشبي", pos: "noun" },
  madera: { en: "wood", ar: "خشب", pos: "noun" },
  nogal: { en: "walnut wood", ar: "جوز", pos: "noun" },
  interior: { en: "interior", ar: "داخل / جوف", pos: "noun" },
  brillaba: { en: "was shining", ar: "كان يلمع / يبرق", pos: "verb" },
  misteriosa: { en: "mysterious", ar: "غامضة", pos: "adjective" },
  bronce: { en: "bronze", ar: "برونز", pos: "noun" },
  grabados: { en: "engravings", ar: "نقوش / حفريات", pos: "noun" },
  caligrafia: { en: "calligraphy", ar: "خط / فن الخط", pos: "noun" },
  caligrafía: { en: "calligraphy", ar: "خط / فن الخط", pos: "noun" },
  cufica: { en: "Kufic", ar: "كوفي", pos: "adjective" },
  cúfica: { en: "Kufic", ar: "كوفي", pos: "adjective" },
  caracteres: { en: "characters / letters", ar: "حروف / رموز", pos: "noun" },
  latinos: { en: "Latin", ar: "لاتينية", pos: "adjective" },
  pertenecido: { en: "belonged", ar: "انتمت / يعود ملكيتها", pos: "verb" },
  familia: { en: "family", ar: "عائلة / أسر", pos: "noun" },
  cinco: { en: "five", ar: "خمسة", pos: "numeral" },
  generaciones: { en: "generations", ar: "أجيال", pos: "noun" },
  murmuro: { en: "whispered", ar: "همس", pos: "verb" },
  murmuró: { en: "whispered", ar: "همس", pos: "verb" },
  voz: { en: "voice", ar: "صوت", pos: "noun" },
  solemne: { en: "solemn", ar: "مهيب / جاد", pos: "adjective" },
  puerta: { en: "door", ar: "باب / بوابة", pos: "noun" },
  secreta: { en: "secret (f)", ar: "سري", pos: "adjective" },
  debajo: { en: "underneath", ar: "أسفل / تحت", pos: "adverb" },
  muralla: { en: "wall / rampart", ar: "سور / جدار حصين", pos: "noun" },
  donde: { en: "where", ar: "حيث / أين", pos: "adverb" },
  dónde: { en: "where", ar: "أين", pos: "adverb" },
  dicen: { en: "they say", ar: "يقولون / يُقال", pos: "verb" },
  esconden: { en: "hide", ar: "تختبئ / مخبأة", pos: "verb" },
  manuscritos: { en: "manuscripts", ar: "مخطوطات", pos: "noun" },
  astronomia: { en: "astronomy", ar: "علم الفلك", pos: "noun" },
  astronomía: { en: "astronomy", ar: "علم الفلك", pos: "noun" },
  medicina: { en: "medicine", ar: "الطب", pos: "noun" },
  medieval: { en: "medieval", ar: "قروسطي / العصور الوسطى", pos: "adjective" },
  sintio: { en: "felt", ar: "شعر / أحس", pos: "verb" },
  sintió: { en: "felt", ar: "شعر / أحس", pos: "verb" },
  inmensa: { en: "immense", ar: "هائل / كبير جداً", pos: "adjective" },
  curiosidad: { en: "curiosity", ar: "فضول / شغف", pos: "noun" },
  decidio: { en: "decided", ar: "قرر", pos: "verb" },
  decidió: { en: "decided", ar: "قرر", pos: "verb" },
  ayudar: { en: "to help", ar: "مساعدة", pos: "verb" },
  resolver: { en: "to solve", ar: "حل / فك رموزه", pos: "verb" },
  enigma: { en: "enigma", ar: "لغز / سر", pos: "noun" },
  historico: { en: "historical", ar: "تاريخي", pos: "adjective" },
  histórico: { en: "historical", ar: "تاريخي", pos: "adjective" },

  // Tech & Patagonia & AI
  entrevista: { en: "interview", ar: "مقابلة", pos: "noun" },
  tecnica: { en: "technical", ar: "تقنية / فنية", pos: "adjective" },
  técnica: { en: "technical", ar: "تقنية / فنية", pos: "adjective" },
  startup: { en: "startup", ar: "شركة ناشئة", pos: "noun" },
  tecnologia: { en: "technology", ar: "تكنولوجيا / تقنية", pos: "noun" },
  tecnología: { en: "technology", ar: "تكنولوجيا / تقنية", pos: "noun" },
  buenos: { en: "good", ar: "جيدة / طيبة", pos: "adjective" },
  aires: { en: "airs / Buenos Aires", ar: "بويناس آيرس", pos: "noun" },
  entrevistadora: { en: "interviewer (f)", ar: "المُحاورة / المقابِلة", pos: "noun" },
  sofia: { en: "Sofía", ar: "صوفيا", pos: "noun" },
  sofía: { en: "Sofía", ar: "صوفيا", pos: "noun" },
  gusto: { en: "pleasure", ar: "سرور / متعة", pos: "noun" },
  saludarte: { en: "to greet you", ar: "الترحيب بكِ", pos: "verb" },
  hemos: { en: "we have", ar: "لقد قمنا", pos: "verb" },
  revisado: { en: "reviewed", ar: "مراجعة / فحص", pos: "verb" },
  perfil: { en: "profile", ar: "ملف شخصي", pos: "noun" },
  trayectoria: { en: "track record", ar: "مسيرة مهنية / مسار", pos: "noun" },
  desarrollo: { en: "development", ar: "تطوير", pos: "noun" },
  software: { en: "software", ar: "برمجيات", pos: "noun" },
  distribuido: { en: "distributed", ar: "موزع", pos: "adjective" },
  sumamente: { en: "extremely", ar: "للغاية / بمدى كبير", pos: "adverb" },
  interesante: { en: "interesting", ar: "مثير للاهتمام", pos: "adjective" },
  contanos: { en: "tell us", ar: "حدثينا / أخبرينا", pos: "verb" },
  sobre: { en: "about / on", ar: "عن / حول", pos: "preposition" },
  abordas: { en: "you approach", ar: "تتعاملين مع / تعالجين", pos: "verb" },
  abordás: { en: "you approach", ar: "تتعاملين مع / تعالجين", pos: "verb" },
  desafios: { en: "challenges", ar: "تحديات", pos: "noun" },
  desafíos: { en: "challenges", ar: "تحديات", pos: "noun" },
  escalabilidad: { en: "scalability", ar: "قابلية التوسع", pos: "noun" },
  rendimiento: { en: "performance", ar: "أداء / إنتاجية", pos: "noun" },
  arquitecturas: { en: "architectures", ar: "بُنى برمجية", pos: "noun" },
  microservicios: { en: "microservices", ar: "خدمات مصغرة", pos: "noun" },
  oportunidad: { en: "opportunity", ar: "فرصة", pos: "noun" },
  previa: { en: "previous", ar: "سابقة", pos: "adjective" },
  clave: { en: "key factor", ar: "مفتاح / عنصر أساسي", pos: "noun" },
  diseñar: { en: "to design", ar: "تصميم", pos: "verb" },
  contratos: { en: "contracts / specs", ar: "عقود برمجية", pos: "noun" },
  api: { en: "API", ar: "واجهة برمجة التطبيقات", pos: "noun" },
  robustos: { en: "robust", ar: "متينة / قوية", pos: "adjective" },
  desacoplar: { en: "to decouple", ar: "فصل / فك الارتباط", pos: "verb" },
  servicios: { en: "services", ar: "خدمات", pos: "noun" },
  mediante: { en: "through / via", ar: "عبر / بواسطة", pos: "preposition" },
  colas: { en: "queues", ar: "طوابير / صفوف", pos: "noun" },
  mensajeria: { en: "messaging", ar: "رسائل / المراسلة", pos: "noun" },
  mensajería: { en: "messaging", ar: "رسائل / المراسلة", pos: "noun" },
  asincronas: { en: "asynchronous", ar: "غير متزامنة", pos: "adjective" },
  asíncronas: { en: "asynchronous", ar: "غير متزامنة", pos: "adjective" },
  cuando: { en: "when", ar: "عندما / حينما", pos: "conjunction" },
  enfrentamos: { en: "we face", ar: "نواجه", pos: "verb" },
  picos: { en: "peaks / spikes", ar: "ذروة / ارتفاعات", pos: "noun" },
  impredecibles: { en: "unpredictable", ar: "غير متوقعة", pos: "adjective" },
  trafico: { en: "traffic", ar: "حركة مرور / زيارات", pos: "noun" },
  tráfico: { en: "traffic", ar: "حركة مرور / زيارات", pos: "noun" },
  evitamos: { en: "we avoid", ar: "نتجنب", pos: "verb" },
  cuellos: { en: "bottlenecks / necks", ar: "عنق", pos: "noun" },
  botella: { en: "bottle", ar: "زجاجة", pos: "noun" },
  implementando: { en: "implementing", ar: "تطبيق / تنفيذ", pos: "verb" },
  patrones: { en: "patterns", ar: "أنماط", pos: "noun" },
  resiliencia: { en: "resilience", ar: "مرونة / صمود", pos: "noun" },
  circuit: { en: "circuit", ar: "دائرة", pos: "noun" },
  breakers: { en: "breakers", ar: "قواطع", pos: "noun" },
  cache: { en: "cache", ar: "ذاكرة مؤقتة", pos: "noun" },
  caché: { en: "cache", ar: "ذاكرة مؤقتة", pos: "noun" },
  excelente: { en: "excellent", ar: "ممتاز", pos: "adjective" },
  enfoque: { en: "approach", ar: "منهج / تركيز", pos: "noun" },
  cuanto: { en: "regarding", ar: "فيما يتعلق / من حيث", pos: "adverb" },
  cuánto: { en: "how much", ar: "كم / أي قدر", pos: "adverb" },
  trabajo: { en: "work", ar: "عمل", pos: "noun" },
  colaborativo: { en: "collaborative", ar: "تعاوني / جماعي", pos: "adjective" },
  manejas: { en: "you handle", ar: "تديرين / تتعاملين", pos: "verb" },
  manejás: { en: "you handle", ar: "تديرين / تتعاملين", pos: "verb" },
  discrepancias: { en: "discrepancies", ar: "خلافات / تباينات", pos: "noun" },
  dentro: { en: "within", ar: "داخل", pos: "adverb" },
  equipo: { en: "team", ar: "فريق", pos: "noun" },
  interdisciplinario: { en: "interdisciplinary", ar: "متعدد التخصصات", pos: "adjective" },
  priorizo: { en: "I prioritize", ar: "أعطي الأولوية", pos: "verb" },
  datos: { en: "data", ar: "بيانات", pos: "noun" },
  empiricos: { en: "empirical", ar: "تجريبية / واقعية", pos: "adjective" },
  empíricos: { en: "empirical", ar: "تجريبية / واقعية", pos: "adjective" },
  pruebas: { en: "tests", ar: "اختبارات / تجارب", pos: "noun" },
  carga: { en: "load", ar: "ضغط / حمولة", pos: "noun" },
  reproducibles: { en: "reproducible", ar: "قابلة للتكرار", pos: "adjective" },
  opiniones: { en: "opiniones", ar: "آراء", pos: "noun" },
  subjetivas: { en: "subjective", ar: "ذاتية / شخصية", pos: "adjective" },
  organizamos: { en: "we organize", ar: "ننظم", pos: "verb" },
  sesiones: { en: "sessions", ar: "جلسات", pos: "noun" },
  diseño: { en: "design", ar: "تصميم", pos: "noun" },
  cada: { en: "each / every", ar: "كل", pos: "determiner" },
  integrante: { en: "member", ar: "عضو", pos: "noun" },
  expone: { en: "presents / exposes", ar: "يعرض / يقدم", pos: "verb" },
  pros: { en: "pros", ar: "إيجابيات", pos: "noun" },
  contras: { en: "cons", ar: "سلبيات", pos: "noun" },
  solucion: { en: "solution", ar: "حل", pos: "noun" },
  solución: { en: "solution", ar: "حل", pos: "noun" },
  buscando: { en: "seeking", ar: "بحثاً عن / سعياً", pos: "verb" },
  consenso: { en: "consensus", ar: "إجماع / توافق", pos: "noun" },
  simplicidad: { en: "simplicity", ar: "بساطة", pos: "noun" },
  arquitectonica: { en: "architectural", ar: "معمارية / برمجية", pos: "adjective" },
  arquitectónica: { en: "architectural", ar: "معمارية / برمجية", pos: "adjective" },

  // Flamenco & Patagonia & AI Science
  flamenco: { en: "Flamenco", ar: "الفلامنكو", pos: "noun" },
  simplemente: { en: "simply", ar: "مجرد / ببساطة", pos: "adverb" },
  genero: { en: "genre", ar: "نمط / نوع موسيقي", pos: "noun" },
  género: { en: "genre", ar: "نمط / نوع موسيقي", pos: "noun" },
  musical: { en: "musical", ar: "موسيقي", pos: "adjective" },
  baile: { en: "dance", ar: "رقص / رقصة", pos: "noun" },
  vistoso: { en: "showy", ar: "استعراضي / ملفت", pos: "adjective" },
  expresion: { en: "expression", ar: "تعبير", pos: "noun" },
  expresión: { en: "expression", ar: "تعبير", pos: "noun" },
  artistica: { en: "artistic", ar: "فني", pos: "adjective" },
  artística: { en: "artistic", ar: "فني", pos: "adjective" },
  profunda: { en: "profound", ar: "عميق", pos: "adjective" },
  nacida: { en: "born", ar: "نشأ / نابع", pos: "adjective" },
  culturas: { en: "cultures", ar: "ثقافات", pos: "noun" },
  gitana: { en: "Gypsy / Romani", ar: "غجرية", pos: "adjective" },
  mora: { en: "Moorish", ar: "موريسكية", pos: "adjective" },
  judia: { en: "Jewish", ar: "يهودية", pos: "adjective" },
  judía: { en: "Jewish", ar: "يهودية", pos: "adjective" },
  cristiana: { en: "Christian", ar: "مسيحية", pos: "adjective" },
  reconocido: { en: "recognized", ar: "معترف به", pos: "adjective" },
  unesco: { en: "UNESCO", ar: "اليونسكو", pos: "noun" },
  inmaterial: { en: "intangible", ar: "غير مادي", pos: "adjective" },
  humanidad: { en: "humanity", ar: "بشرية / إنسانية", pos: "noun" },
  sustenta: { en: "rests on", ar: "يقوم على / يستند", pos: "verb" },
  pilares: { en: "pillars", ar: "ركائز / أعمدة", pos: "noun" },
  cante: { en: "flamenco singing", ar: "الغناء (في الفلامنكو)", pos: "noun" },
  toque: { en: "guitar touch", ar: "عزف القيثارة", pos: "noun" },
  guitarra: { en: "guitar", ar: "قيثارة / جيتار", pos: "noun" },
  concepto: { en: "concept", ar: "مفهوم", pos: "noun" },
  duende: { en: "duende / soul", ar: "الروح السحرية للفلامنكو", pos: "noun" },
  describe: { en: "describes", ar: "يصف", pos: "verb" },
  ese: { en: "that", ar: "ذلك", pos: "pronoun" },
  momento: { en: "moment", ar: "لحظة", pos: "noun" },
  magico: { en: "magical", ar: "سحري", pos: "adjective" },
  mágico: { en: "magical", ar: "سحري", pos: "adjective" },
  inexplicable: { en: "inexplicable", ar: "لا يُفسَر / عجيب", pos: "adjective" },
  artista: { en: "artist", ar: "فنان", pos: "noun" },
  conecta: { en: "connects", ar: "يتواصل / يتصل", pos: "verb" },
  visceral: { en: "visceral", ar: "وجداني / جوهري", pos: "adjective" },
  emociones: { en: "emotions", ar: "مشاعر / عواطف", pos: "noun" },
  puras: { en: "pure", ar: "نقية / خالية من الشوائب", pos: "adjective" },
  alegria: { en: "joy", ar: "فرح / سرور", pos: "noun" },
  alegría: { en: "joy", ar: "فرح / سرور", pos: "noun" },
  soledad: { en: "solitude", ar: "عزلة / وحدة", pos: "noun" },
  esperanza: { en: "hope", ar: "أمل / رجاء", pos: "noun" },
  sevilla: { en: "Seville", ar: "إشبيلية", pos: "noun" },
  granada: { en: "Granada", ar: "غرناطة", pos: "noun" },
  jerez: { en: "Jerez", ar: "خيريز", pos: "noun" },
  frontera: { en: "border", ar: "حدود", pos: "noun" },
  peñas: { en: "flamenco clubs", ar: "نوادي الفلامنكو", pos: "noun" },
  flamencas: { en: "flamenco (f pl)", ar: "فلامنكية", pos: "adjective" },
  mantienen: { en: "maintain", ar: "تحافظ على", pos: "verb" },
  viva: { en: "alive", ar: "حية / نابضة", pos: "adjective" },
  tradicion: { en: "tradition", ar: "تقليد", pos: "noun" },
  tradición: { en: "tradition", ar: "تقليد", pos: "noun" },
  ancestral: { en: "ancestral", ar: "عريق / أثري", pos: "adjective" },
  noche: { en: "night", ar: "ليلة", pos: "noun" },
  tras: { en: "after", ar: "بعد / تلو", pos: "preposition" },

  // Patagonia & AI Science
  planeando: { en: "planning", ar: "تخطيط", pos: "verb" },
  diego: { en: "Diego", ar: "دييغو", pos: "noun" },
  vas: { en: "you go / are going", ar: "ستذهب / تسافر", pos: "verb" },
  proximas: { en: "next", ar: "قادمة / مقبلة", pos: "adjective" },
  próximas: { en: "next", ar: "قادمة / مقبلة", pos: "adjective" },
  vacaciones: { en: "vacation", ar: "عطلة / إجازة", pos: "noun" },
  argentina: { en: "Argentina", ar: "الأرجنتين", pos: "noun" },
  patagonia: { en: "Patagonia", ar: "باتاغونيا", pos: "noun" },
  quiero: { en: "I want", ar: "أريد", pos: "verb" },
  famoso: { en: "famous", ar: "شهير", pos: "adjective" },
  glaciar: { en: "glacier", ar: "نهر جليدي", pos: "noun" },
  perito: { en: "Perito", ar: "بيريتو", pos: "noun" },
  moreno: { en: "Moreno", ar: "مورينو", pos: "noun" },
  senderos: { en: "trails", ar: "مسارات / طرق", pos: "noun" },
  bariloche: { en: "Bariloche", ar: "باريلوتشي", pos: "noun" },
  aventura: { en: "adventure", ar: "مغامرة", pos: "noun" },
  tan: { en: "so", ar: "يا لها من / جداً", pos: "adverb" },
  maravillosa: { en: "wonderful", ar: "رائعة", pos: "adjective" },
  recuerda: { en: "remember", ar: "تذكر", pos: "verb" },
  llevar: { en: "to bring / wear", ar: "أخذ / ارتداء", pos: "verb" },
  ropa: { en: "clothes", ar: "ملابس", pos: "noun" },
  abrigada: { en: "warm (clothing)", ar: "دافئة", pos: "adjective" },
  buena: { en: "good (f)", ar: "جيدة / ممتازة", pos: "adjective" },
  camara: { en: "camera", ar: "كاميرا / آلة تصوير", pos: "noun" },
  cámara: { en: "camera", ar: "كاميرا / آلة تصوير", pos: "noun" },
  fotos: { en: "photos", ar: "صور", pos: "noun" },
  botas: { en: "boots", ar: "أحذية / أحذية ثلج", pos: "noun" },
  comodas: { en: "comfortable", ar: "مريحة", pos: "adjective" },
  cómodas: { en: "comfortable", ar: "مريحة", pos: "adjective" },
  nieve: { en: "snow", ar: "ثلج", pos: "noun" },
  preparado: { en: "prepared", ar: "جهزت / جاهز", pos: "adjective" },
  mochila: { en: "backpack", ar: "حقيبة ظهر", pos: "noun" },
  ganas: { en: "desire / eagerness", ar: "رغبة / حماس", pos: "noun" },
  ver: { en: "to see", ar: "رؤية", pos: "verb" },
  lagos: { en: "lakes", ar: "بحيرات", pos: "noun" },
  puro: { en: "pure / fresh", ar: "نقي / صافٍ", pos: "adjective" },
  montaña: { en: "mountain", ar: "جبل", pos: "noun" },
  investigadores: { en: "researchers", ar: "باحثون", pos: "noun" },
  universidad: { en: "university", ar: "جامعة", pos: "noun" },
  salamanca: { en: "Salamanca", ar: "سالامانكا", pos: "noun" },
  han: { en: "have (plural)", ar: "لقد قاموا", pos: "verb" },
  desarrollado: { en: "developed", ar: "تطوير / طوروا", pos: "verb" },
  sofisticado: { en: "sophisticated", ar: "متطور / معقد", pos: "adjective" },
  modelo: { en: "model", ar: "نموذج", pos: "noun" },
  vision: { en: "vision", ar: "رؤية", pos: "noun" },
  visión: { en: "vision", ar: "رؤية", pos: "noun" },
  computadora: { en: "computer", ar: "حاسوب / كمبيوتر", pos: "noun" },
  capaz: { en: "capable", ar: "قادر", pos: "adjective" },
  transcribir: { en: "to transcribe", ar: "نسخ النص", pos: "verb" },
  restaurar: { en: "to restore", ar: "ترميم / إحياء", pos: "verb" },
  dañados: { en: "damaged", ar: "تالفة / متضررة", pos: "adjective" },
  humedad: { en: "humidity", ar: "رطوبة", pos: "noun" },
  paso: { en: "passage / step", ar: "مرور / خُطوة", pos: "noun" },
  tiempo: { en: "time / weather", ar: "زمن / وقت", pos: "noun" },
  procesamiento: { en: "processing", ar: "معالجة", pos: "noun" },
  neuronal: { en: "neural", ar: "عصبي", pos: "adjective" },
  algoritmo: { en: "algorithm", ar: "خوارزمية", pos: "noun" },
  analiza: { en: "analyzes", ar: "يحلل", pos: "verb" },
  tinta: { en: "ink", ar: "حبر", pos: "noun" },
  invisibles: { en: "invisible", ar: "غير مرئية", pos: "adjective" },
  ojo: { en: "eye", ar: "عين", pos: "noun" },
  humano: { en: "human", ar: "بشري", pos: "adjective" },
  predice: { en: "predicts", ar: "يتنبأ / يتوقع", pos: "verb" },
  deterioradas: { en: "deteriorated", ar: "متدهورة / ممسوخة", pos: "adjective" },
  precision: { en: "precision", ar: "دقة", pos: "noun" },
  precisión: { en: "precision", ar: "دقة", pos: "noun" },
  superior: { en: "superior", ar: "أعلى / تفوق", pos: "adjective" },
  noventa: { en: "ninety", ar: "تسعين", pos: "numeral" },
  avance: { en: "breakthrough", ar: "تقدم / إنجاز", pos: "noun" },
  tecnologico: { en: "technological", ar: "تكنولوجي / تقني", pos: "adjective" },
  tecnológico: { en: "technological", ar: "تكنولوجي / تقني", pos: "adjective" },
  permite: { en: "allows", ar: "يتيح / يسمح", pos: "verb" },
  filologos: { en: "philologists", ar: "علماء لغة", pos: "noun" },
  filólogos: { en: "philologists", ar: "علماء لغة", pos: "noun" },
  digitalizar: { en: "to digitize", ar: "رقمنة", pos: "verb" },
  ineditos: { en: "unpublished", ar: "غير منشور / نادر", pos: "adjective" },
  inéditos: { en: "unpublished", ar: "غير منشور / نادر", pos: "adjective" },
  custodiados: { en: "housed / guarded", ar: "محفوظة / مصونة", pos: "adjective" },
  archivos: { en: "archives", ar: "أرشيفات / وثائق", pos: "noun" },
  monasticos: { en: "monastic", ar: "ديرية / رهبانية", pos: "adjective" },
  monásticos: { en: "monastic", ar: "ديرية / رهبانية", pos: "adjective" },
  bibliotecas: { en: "libraries", ar: "مكتبات", pos: "noun" },
  historicas: { en: "historical", ar: "تاريخية", pos: "adjective" },
  históricas: { en: "historical", ar: "تاريخية", pos: "adjective" },
  hispanohablante: { en: "Spanish-speaking", ar: "ناطق بالإسبانية", pos: "adjective" },
  sinergia: { en: "synergy", ar: "تآزر / تكامل", pos: "noun" },
  entre: { en: "between", ar: "بين", pos: "preposition" },
  humanidades: { en: "humanities", ar: "علوم إنسانية", pos: "noun" },
  digitales: { en: "digital", ar: "رقمية", pos: "adjective" },
  artificial: { en: "artificial", ar: "اصطناعي", pos: "adjective" },
  democratizando: { en: "democratizing", ar: "جعلها متاحة للجميع", pos: "verb" },
  acceso: { en: "access", ar: "وصول / إمكانية الوصول", pos: "noun" },
  intelectual: { en: "intellectual", ar: "فكري", pos: "adjective" },
  colectivo: { en: "collective", ar: "جماعي / مشترك", pos: "adjective" }
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

  // 1. Search in Vocabulary example sentences
  for (const item of ALL_VOCABULARY) {
    if (normalizeWord(item.spanish || item.word || '') === norm) {
      const list = item.examples || item.exampleSentences || [];
      for (const ex of list) {
        if (regex.test(ex.es) && !seenSpanish.has(ex.es.trim())) {
          seenSpanish.add(ex.es.trim());
          results.push({
            es: ex.es.trim(),
            en: ex.en,
            ar: ex.ar,
            source: `Lexicon Context (${item.spanish || item.word})`
          });
        }
      }
      if (results.length >= 3) return results;
    }
  }

  // 2. Search in Comprehensible Stories
  for (const story of COMPREHENSIBLE_STORIES) {
    for (const p of story.paragraphs) {
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

  // 3. Search in Sentence Patterns & Idioms
  for (const pattern of SENTENCE_PATTERNS) {
    if (regex.test(pattern.spanish) && !seenSpanish.has(pattern.spanish.trim())) {
      seenSpanish.add(pattern.spanish.trim());
      results.push({
        es: pattern.spanish.trim(),
        en: pattern.english,
        ar: pattern.arabic,
        source: 'Authentic Spanish Blueprint'
      });
      if (results.length >= 4) return results;
    }
  }

  // 4. Search in Verb examples
  for (const v of SPANISH_VERBS) {
    for (const ex of v.examples) {
      if (regex.test(ex.es) && !seenSpanish.has(ex.es.trim())) {
        seenSpanish.add(ex.es.trim());
        results.push({
          es: ex.es.trim(),
          en: ex.en,
          ar: ex.ar,
          source: `Verb Context (${v.infinitive})`
        });
        if (results.length >= 4) return results;
      }
    }
  }

  // 5. Fallback: Synthesize Domain-Specific Creative Situational Sentences
  const matchingVocabItem = ALL_VOCABULARY.find(
    item => normalizeWord(item.spanish || item.word || '') === norm
  ) || { id: norm, spanish: rawWord, word: rawWord, cefr: 'A2' as const, category: 'general', frequencyRank: 500 };

  const syntheticContexts = generateAuthenticSituationalSentences(matchingVocabItem);
  for (const syn of syntheticContexts) {
    if (!seenSpanish.has(syn.es.trim())) {
      seenSpanish.add(syn.es.trim());
      results.push(syn);
    }
    if (results.length >= 4) break;
  }

  return results;
}

/**
 * Synthesizes domain-specific, realistic, creative situational sentences for ANY vocabulary item.
 * Completely replaces repetitive canned templates with authentic real-world contexts.
 */
export function generateAuthenticSituationalSentences(vocab: VocabularyItem): ContextualSentence[] {
  const word = (vocab.spanish || vocab.word || '').trim();
  const en = vocab.english || vocab.translation_en || word;
  const ar = vocab.arabic || vocab.translation_ar || word;
  const cat = (vocab.category || '').toLowerCase();
  const pos = (vocab.partOfSpeech || vocab.pos || '').toLowerCase();
  const cleanWord = normalizeWord(word);

  if (!cleanWord) return [];

  // Check if item has explicit example sentences
  const list = vocab.examples || vocab.exampleSentences || [];
  if (list.length > 0) {
    return list.map(ex => ({
      es: ex.es,
      en: ex.en,
      ar: ex.ar,
      source: `Authentic Lexicon (${word})`
    }));
  }

  const results: ContextualSentence[] = [];

  // 🥘 Gastronomy & Hospitality
  if (
    cat.includes('food') ||
    cat.includes('restaurant') ||
    cat.includes('drink') ||
    cat.includes('gastronomy') ||
    ['camarero', 'pedir', 'cuenta', 'plato', 'menu', 'tapas', 'pan', 'agua', 'vino', 'café', 'restaurante', 'cena', 'desayuno'].includes(cleanWord)
  ) {
    results.push({
      es: `Le pedimos al camarero que traiga ${word} junto con la cuenta final.`,
      en: `We asked the waiter to bring ${en} along with the final bill.`,
      ar: `طلبنا من النادل إحضار ${ar} جنباً إلى جنب مع الفاتورة النهائية.`,
      source: 'Restaurante & Inmersión Gastronómica'
    });
    results.push({
      es: `En este restaurante tradicional, ${word} se prepara con ingredientes frescos del mercado.`,
      en: `In this traditional restaurant, ${en} is prepared with fresh market ingredients.`,
      ar: `في هذا المطعم التقليدي، يتم تحضير ${ar} بمكونات طازجة من السوق.`,
      source: 'Cultura Culinaria & Menú'
    });
    results.push({
      es: `¿Podría recomendarme una opción deliciosa que incluya ${word}?`,
      en: `Could you recommend a delicious option that includes ${en}?`,
      ar: `هل يمكنك توصيتي بخيار لذيذ يتضمن ${ar}؟`,
      source: 'Interacción Social en el Café'
    });
  }
  // ✈️ Travel & Transport
  else if (
    cat.includes('travel') ||
    cat.includes('transport') ||
    ['tren', 'estación', 'billete', 'viajar', 'maleta', 'avión', 'hotel', 'aeropuerto', 'pasaporte', 'mapa', 'ciudad', 'vuelo'].includes(cleanWord)
  ) {
    results.push({
      es: `Para subir al transporte sin inconvenientes, es fundamental validar el ${word} en la taquilla.`,
      en: `To board transport without hassle, it's essential to validate the ${en} at the ticket window.`,
      ar: `للصعود إلى وسيلة النقل دون مشاكل، من الضروري تأكيد ${ar} في شباك التذاكر.`,
      source: 'Viajes & Logística en España'
    });
    results.push({
      es: `Al llegar a la estación central, nos dimos cuenta de que necesitábamos ${word}.`,
      en: `Upon arriving at the central station, we realized we needed ${en}.`,
      ar: `عند الوصول إلى المحطة المركزية، أدركنا أننا بحاجة إلى ${ar}.`,
      source: 'Narrativa de Viaje & Aventura'
    });
    results.push({
      es: `¿Sabes exactamente a qué hora sale el servicio que incluye ${word}?`,
      en: `Do you know exactly what time the service including ${en} departs?`,
      ar: `هل تعرف بالضبط في أي وقت يغادر الخيار الذي يشمل ${ar}؟`,
      source: 'Consulta en la Estación'
    });
  }
  // 💼 Work & Office
  else if (
    cat.includes('work') ||
    cat.includes('business') ||
    cat.includes('career') ||
    ['reunión', 'proyecto', 'jefe', 'informe', 'trabajar', 'empresa', 'cliente', 'salario', 'oficina', 'empleo', 'contrato', 'entrevista'].includes(cleanWord)
  ) {
    results.push({
      es: `Durante la reunión de la mañana, analizamos la estrategia del ${word} con todo el equipo.`,
      en: `During the morning meeting, we analyzed the ${en} strategy with the whole team.`,
      ar: `خلال اجتماع الصباح، حللنا استراتيجية ${ar} مع الفريق بأكمله.`,
      source: 'Entorno Profesional & Oficina'
    });
    results.push({
      es: `Mi supervisor me solicitó preparar un informe detallado sobre ${word}.`,
      en: `My supervisor requested that I prepare a detailed report on ${en}.`,
      ar: `طلب مني المشرف إعداد تقرير مفصل حول ${ar}.`,
      source: 'Coordinación Laboral'
    });
    results.push({
      es: `¿Cuáles son los requisitos clave para optimizar ${word} antes de la entrega final?`,
      en: `What are the key requirements to optimize ${en} before final delivery?`,
      ar: `ما هي المتطلبات الأساسية لتحسين ${ar} قبل التسليم النهائي؟`,
      source: 'Resolución de Problemas en el Trabajo'
    });
  }
  // 🩺 Health & Medical
  else if (
    cat.includes('health') ||
    cat.includes('medical') ||
    ['médico', 'dolor', 'hospital', 'medicina', 'enfermo', 'síntoma', 'cita', 'salud', 'receta', 'farmacia'].includes(cleanWord)
  ) {
    results.push({
      es: `Si el paciente presenta malestar, es indispensable acudir de inmediato al ${word}.`,
      en: `If the patient shows discomfort, it's essential to go immediately to the ${en}.`,
      ar: `إذا أظهر المريض وعكة صحية، فمن الضروري الذهاب فوراً إلى ${ar}.`,
      source: 'Atención Médica & Urgencias'
    });
    results.push({
      es: `El especialista recetó un tratamiento preventivo enfocado en ${word}.`,
      en: `The specialist prescribed a preventive treatment focused on ${en}.`,
      ar: `وصف الأخصائي العلاج الوقائي الذي يركز على ${ar}.`,
      source: 'Diagnóstico & Bienestar'
    });
    results.push({
      es: `¿Cómo te sientes hoy respecto a ${word} después de seguir las indicaciones?`,
      en: `How do you feel today regarding ${en} after following the instructions?`,
      ar: `كيف تشعر اليوم فيما يتعلق بـ ${ar} بعد اتباع التعليمات؟`,
      source: 'Seguimiento de Salud'
    });
  }
  // ⚡ Verbs & Actions
  else if (pos === 'verb' || cleanWord.endsWith('ar') || cleanWord.endsWith('er') || cleanWord.endsWith('ir')) {
    results.push({
      es: `Para lograr los objetivos deseados, debemos ${word} con constancia y dedicación diaria.`,
      en: `To achieve the desired goals, we must ${en} with consistency and daily dedication.`,
      ar: `لتحقيق الأهداف المرجوة، يجب علينا أن ${ar} باستمرارية وتفانٍ يومي.`,
      source: 'Acción Consciente & Aprendizaje'
    });
    results.push({
      es: `Decidimos ${word} juntos para resolver cualquier duda que pudiera surgir en el camino.`,
      en: `We decided to ${en} together to resolve any questions that might arise along the way.`,
      ar: `قررنا أن ${ar} معاً لحل أي شك قد ينشأ في الطريق.`,
      source: 'Trabajo en Equipo & Colaboración'
    });
    results.push({
      es: `¿Cuándo sería el momento más oportuno para ${word} sin interrumpir las actividades?`,
      en: `When would be the most opportune moment to ${en} without interrupting activities?`,
      ar: `متى سيكون الوقت الأنسب لـ ${ar} دون مقاطعة الأنشطة؟`,
      source: 'Planificación & Toma de Decisiones'
    });
  }
  // 💡 Default General Multi-Situational Real-World Examples
  else {
    results.push({
      es: `En la reunión comunitaria, discutimos la relevancia de ${word} para todos los vecinos.`,
      en: `In the community meeting, we discussed the relevance of ${en} for all neighbors.`,
      ar: `في اجتماع المجتمع المحلي، ناقشنا أهمية ${ar} لجميع الجيران.`,
      source: 'Diálogo Social & Comunidad'
    });
    results.push({
      es: `Durante nuestra visita a Madrid, descubrimos un lugar genial donde ${word} era protagonista.`,
      en: `During our visit to Madrid, we discovered a great place where ${en} was prominent.`,
      ar: `خلال زيارتنا لمدريد، اكتشفنا مكاناً رائعاً حيث كان ${ar} هو الميزة البارزة.`,
      source: 'Experiencia & Inmersión Cultural'
    });
    results.push({
      es: `¿Podrías aclararme cómo se aplica ${word} en esta situación concreta?`,
      en: `Could you clarify for me how ${en} applies in this concrete situation?`,
      ar: `هل يمكنك أن توضح لي كيف يُطبق ${ar} في هذا الموقف المحدد؟`,
      source: 'Consulta Pedagógica & Aclaración'
    });
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
 * Generates distinct multi-skill context-rich exercise variations for a target vocabulary item.
 * Engages ALL cognitive skills:
 * 1. 🎧 Listening Comprehension Skill
 * 2. 📖 Reading & Contextual Analysis Skill
 * 3. ✍️ Active Recall & Writing Production Skill
 * 4. 🧠 Real-World Situational Application Skill
 */
export function generate3ContextClozeExercises(
  vocab: VocabularyItem,
  fallbackVocabularyList: VocabularyItem[] = []
): ClozeSentenceVariation[] {
  const spanishWord = (vocab.spanish || vocab.word || '').trim();
  const englishMeaning = vocab.english || vocab.translation_en || spanishWord;
  const arabicMeaning = vocab.arabic || vocab.translation_ar || spanishWord;
  const cleanTarget = normalizeWord(spanishWord);

  if (!cleanTarget) return [];

  // Search existing contextual corpus or generate authentic situational sentences
  const corpusContexts = findMultiContextSentences(cleanTarget);

  // Smart Distractor Generator
  const getDistractors = (exclude: string[]): string[] => {
    const pool = fallbackVocabularyList
      .map(v => (v.spanish || v.word || '').trim())
      .filter(w => w && !exclude.map(e => e.toLowerCase()).includes(w.toLowerCase()) && w.length > 2);

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 3);

    const defaults = ['siempre', 'ahora', 'después', 'mañana', 'bueno', 'mucho', 'tiempo', 'lugar', 'persona'];
    while (chosen.length < 3) {
      const d = defaults.find(item => !chosen.includes(item) && item.toLowerCase() !== cleanTarget.toLowerCase());
      if (d) chosen.push(d);
      else chosen.push('otro');
    }

    return chosen;
  };

  const variations: ClozeSentenceVariation[] = [];

  const context1 = corpusContexts[0] || {
    es: `En el restaurante, le pedimos al camarero agua fresca y la lista de sugerencias.`,
    en: `In the restaurant, we asked the waiter for fresh water and the suggestions list.`,
    ar: `في المطعم، طلبنا من النادل ماءً نقيًا وقائمة الاقتراحات.`
  };

  const context2 = corpusContexts[1] || {
    es: `Para viajar sin problemas, es importante tener el billete reservado con antelación.`,
    en: `To travel smoothly, it's important to have the ticket booked in advance.`,
    ar: `للسفر دون مشاكل، من المهم حجز التذكرة مسبقًا.`
  };

  const context3 = corpusContexts[2] || {
    es: `Durante la reunión de la mañana, presentamos el informe para coordinar las tareas.`,
    en: `During the morning meeting, we presented the report to coordinate tasks.`,
    ar: `خلال اجتماع الصباح، قدمنا التقرير لتنسيق المهام.`
  };

  // Define 3 multi-skill cognitive variations
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
      title: '🎧 Skill 1: Auditory Comprehension & Real-Life Conversation',
      es: context1.es,
      en: context1.en,
      ar: context1.ar,
      tip: `Listen to how "${cleanTarget}" fits into authentic daily conversational speech.`
    },
    {
      type: 'descriptive',
      title: '📖 Skill 2: Reading Analysis & Situational Setting',
      es: context2.es,
      en: context2.en,
      ar: context2.ar,
      tip: `Analyze the sentence structure and notice how "${cleanTarget}" functions in context.`
    },
    {
      type: 'expressive',
      title: '✍️ Skill 3: Active Recall & Practical Sentence Production',
      es: context3.es,
      en: context3.en,
      ar: context3.ar,
      tip: `Express this idea naturally: use "${cleanTarget}" to formulate precise communicative output.`
    }
  ];

  templates.forEach((t, index) => {
    let rawSentence = t.es;
    let targetInSentence = cleanTarget;

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

