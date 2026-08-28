import { VocabularyItem, CEFRLevel, ExerciseType } from '../types';
import { ALL_VOCABULARY } from '../data/vocabularyComprehensive1000';

export interface AssessmentQuestion {
  id: string;
  type: 'vocab_meaning' | 'reverse_translation' | 'listening' | 'sentence_fill' | 'gender_article' | 'false_friend' | 'conjugation';
  level: CEFRLevel;
  prompt_es?: string;
  prompt_en: string;
  prompt_ar: string;
  contextSentence_es?: string;
  contextSentence_en?: string;
  contextSentence_ar?: string;
  options: string[];
  correctAnswer: string;
  hint_en: string;
  hint_ar: string;
  explanation_en: string;
  explanation_ar: string;
  audioText?: string;
  vocabItem?: VocabularyItem;
  testedConcept: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Clean string for comparison
function cleanStr(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Generates an official 15-question End-of-Level Assessment from the level's vocabulary vault
 */
export function generateLevelAssessment(level: CEFRLevel, count: number = 15): {
  questions: AssessmentQuestion[];
  flashcardPool: VocabularyItem[];
} {
  // Filter vocabulary pool for this level (or include immediate prerequisite if small)
  let levelVocab = ALL_VOCABULARY.filter(v => v.cefr === level);
  if (levelVocab.length < 20) {
    levelVocab = ALL_VOCABULARY.filter(v => v.cefr === level || (level === 'A2' && v.cefr === 'A1') || (level === 'B1' && (v.cefr === 'A2' || v.cefr === 'A1')));
  }

  const shuffledVocab = shuffleArray(levelVocab);
  const flashcardPool = shuffledVocab.slice(0, Math.min(25, shuffledVocab.length));
  const questions: AssessmentQuestion[] = [];
  const usedWordIds = new Set<string>();

  // 1. Direct Vocabulary Meaning (ES -> EN/AR) (3-4 questions)
  for (const item of shuffledVocab) {
    if (questions.length >= 3) break;
    if (usedWordIds.has(item.id)) continue;
    usedWordIds.add(item.id);

    const spanishWord = item.spanish || item.word || '';
    const englishMeaning = item.english || item.translation_en || '';
    const arabicMeaning = item.arabic || item.translation_ar || '';

    // Distractors from other words
    const distractors = shuffledVocab
      .filter(w => w.id !== item.id && (w.english || w.translation_en) !== englishMeaning)
      .slice(0, 3)
      .map(w => w.english || w.translation_en || '');

    if (distractors.length < 3) continue;

    const options = shuffleArray([englishMeaning, ...distractors]);

    questions.push({
      id: `q-meaning-${item.id}`,
      type: 'vocab_meaning',
      level,
      prompt_es: `¿Qué significa "${spanishWord}"?`,
      prompt_en: `What is the accurate meaning of "${spanishWord}"?`,
      prompt_ar: `ما هو المعنى الدقيق لكلمة "${spanishWord}"؟`,
      options,
      correctAnswer: englishMeaning,
      hint_en: `Think about category: ${item.category}. Phonetics: ${item.phonetic || item.ipa || ''}. Example: "${item.examples?.[0]?.es || ''}"`,
      hint_ar: `تلميح: تنتمي الكلمة لفئة (${item.category}). اللفظ: ${item.phonetic || item.ipa || ''}.`,
      explanation_en: `"${spanishWord}" means "${englishMeaning}" (${arabicMeaning}). Part of speech: ${item.partOfSpeech || 'noun'}.`,
      explanation_ar: `كلمة "${spanishWord}" تعني "${arabicMeaning}" (${englishMeaning}).`,
      audioText: spanishWord,
      vocabItem: item,
      testedConcept: `Vocabulary: ${spanishWord}`
    });
  }

  // 2. Reverse Production (EN/AR -> ES) (3-4 questions)
  for (const item of shuffledVocab) {
    if (questions.length >= 6) break;
    if (usedWordIds.has(item.id)) continue;
    usedWordIds.add(item.id);

    const spanishWord = item.spanish || item.word || '';
    const englishMeaning = item.english || item.translation_en || '';
    const arabicMeaning = item.arabic || item.translation_ar || '';

    const distractors = shuffledVocab
      .filter(w => w.id !== item.id && (w.spanish || w.word) !== spanishWord)
      .slice(0, 3)
      .map(w => w.spanish || w.word || '');

    if (distractors.length < 3) continue;

    const options = shuffleArray([spanishWord, ...distractors]);

    questions.push({
      id: `q-rev-${item.id}`,
      type: 'reverse_translation',
      level,
      prompt_es: `Selecciona la traducción correcta en español:`,
      prompt_en: `Select the Spanish translation for "${englishMeaning}":`,
      prompt_ar: `اختر الترجمة الإسبانية الصحيحة لـ "${arabicMeaning}":`,
      options,
      correctAnswer: spanishWord,
      hint_en: `Starts with "${spanishWord.slice(0, 2)}...". It has ${spanishWord.length} letters.`,
      hint_ar: `تبدأ بالحرفين "${spanishWord.slice(0, 2)}..." وتتكون من ${spanishWord.length} أحرف.`,
      explanation_en: `The Spanish word for "${englishMeaning}" is "${spanishWord}". Pronunciation: ${item.phonetic || item.ipa || ''}.`,
      explanation_ar: `الكلمة الإسبانية لـ "${arabicMeaning}" هي "${spanishWord}".`,
      audioText: spanishWord,
      vocabItem: item,
      testedConcept: `Active Recall: ${englishMeaning}`
    });
  }

  // 3. Listening & Ear Training (3 questions)
  for (const item of shuffledVocab) {
    if (questions.length >= 9) break;
    if (usedWordIds.has(item.id)) continue;
    usedWordIds.add(item.id);

    const spanishWord = item.spanish || item.word || '';
    const englishMeaning = item.english || item.translation_en || '';
    const arabicMeaning = item.arabic || item.translation_ar || '';

    const distractors = shuffledVocab
      .filter(w => w.id !== item.id && (w.spanish || w.word) !== spanishWord)
      .slice(0, 3)
      .map(w => w.spanish || w.word || '');

    if (distractors.length < 3) continue;

    const options = shuffleArray([spanishWord, ...distractors]);

    questions.push({
      id: `q-listen-${item.id}`,
      type: 'listening',
      level,
      prompt_es: `🎧 Escucha con atención el audio y selecciona la palabra correcta:`,
      prompt_en: `🎧 Listen carefully to the native pronunciation and choose the correct word:`,
      prompt_ar: `🎧 استمع جيداً للنطق الإسباني واختر الكلمة الصحيحة:`,
      options,
      correctAnswer: spanishWord,
      hint_en: `Meaning clue: It relates to "${englishMeaning}" (${item.category}).`,
      hint_ar: `تلميح المعنى: ترتبط بـ "${arabicMeaning}" (ضمن تصنيف ${item.category}).`,
      explanation_en: `The spoken audio was "${spanishWord}" (/ ${item.phonetic || item.ipa || ''} /), meaning "${englishMeaning}".`,
      explanation_ar: `الكلمة المسموعة كانت "${spanishWord}"، ومعناها "${arabicMeaning}".`,
      audioText: spanishWord,
      vocabItem: item,
      testedConcept: `Auditory Recognition: ${spanishWord}`
    });
  }

  // 4. Contextual Sentence Fill-in-the-Blank (3 questions)
  for (const item of shuffledVocab) {
    if (questions.length >= 12) break;
    if (usedWordIds.has(item.id)) continue;
    if (!item.examples || item.examples.length === 0) continue;

    const example = item.examples[0];
    const spanishWord = item.spanish || item.word || '';
    if (!example.es.toLowerCase().includes(spanishWord.toLowerCase())) continue;

    usedWordIds.add(item.id);

    // Replace the target word in the sentence with ______
    const regex = new RegExp(`\\b${spanishWord}\\b`, 'gi');
    const blankedSentence = example.es.replace(regex, '_______');

    const distractors = shuffledVocab
      .filter(w => w.id !== item.id && (w.partOfSpeech === item.partOfSpeech || !w.partOfSpeech))
      .slice(0, 3)
      .map(w => w.spanish || w.word || '');

    if (distractors.length < 3) continue;

    const options = shuffleArray([spanishWord, ...distractors]);

    questions.push({
      id: `q-fill-${item.id}`,
      type: 'sentence_fill',
      level,
      prompt_es: `Completa la frase con la palabra correcta:`,
      prompt_en: `Complete the sentence with the appropriate word:`,
      prompt_ar: `أكمل الجملة بالكلمة المناسبة سياقياً:`,
      contextSentence_es: blankedSentence,
      contextSentence_en: example.en,
      contextSentence_ar: example.ar,
      options,
      correctAnswer: spanishWord,
      hint_en: `English context translation: "${example.en}". Target word means "${item.english || ''}".`,
      hint_ar: `ترجمة السياق: "${example.ar}". الكلمة المستهدفة تعني "${item.arabic || ''}".`,
      explanation_en: `Complete sentence: "${example.es}" (${example.en}). "${spanishWord}" fits perfectly in this syntactic slot.`,
      explanation_ar: `الجملة الكاملة: "${example.es}" (${example.ar}). كلمة "${spanishWord}" هي الاختيار الصحيح.`,
      audioText: example.es,
      vocabItem: item,
      testedConcept: `Contextual Syntax: ${spanishWord}`
    });
  }

  // 5. Gender & Definite Article Matching OR False Friends / Grammar (remaining questions up to count)
  for (const item of shuffledVocab) {
    if (questions.length >= count) break;
    if (usedWordIds.has(item.id)) continue;

    const spanishWord = item.spanish || item.word || '';
    const gender = item.gender;

    if (gender && (gender === 'el' || gender === 'la' || gender === 'm' || gender === 'f')) {
      usedWordIds.add(item.id);
      const isFeminine = gender === 'la' || gender === 'f';
      const correctArticle = isFeminine ? 'la' : 'el';
      const correctOption = `${correctArticle} ${spanishWord}`;

      // Distractors: wrong article, plural wrong article
      const distractors = [
        `${isFeminine ? 'el' : 'la'} ${spanishWord}`,
        `${isFeminine ? 'los' : 'las'} ${spanishWord}`,
        `${isFeminine ? 'un' : 'una'} ${spanishWord}`
      ];

      const options = shuffleArray([correctOption, ...distractors]);

      questions.push({
        id: `q-gender-${item.id}`,
        type: 'gender_article',
        level,
        prompt_es: `¿Cuál es el artículo definido y género correcto para "${spanishWord}"?`,
        prompt_en: `Which is the correct definite article and grammatical gender for "${spanishWord}"?`,
        prompt_ar: `ما هي أداة التعريف والجنس النحوي الصحيح لكلمة "${spanishWord}"؟`,
        options,
        correctAnswer: correctOption,
        hint_en: `In Spanish, "${spanishWord}" is grammatically ${isFeminine ? 'Feminine (femenino)' : 'Masculine (masculino)'}.`,
        hint_ar: `في الإسبانية، كلمة "${spanishWord}" جنسها النحوي (${isFeminine ? 'مؤنث' : 'مذكر'}).`,
        explanation_en: `"${spanishWord}" is a ${isFeminine ? 'feminine' : 'masculine'} noun, so it takes "${correctArticle}" -> "${correctOption}". Meaning: "${item.english}".`,
        explanation_ar: `كلمة "${spanishWord}" اسم ${isFeminine ? 'مؤنث' : 'مذكر'} ويأخذ أداة التعريف "${correctArticle}". المعنى: "${item.arabic}".`,
        audioText: correctOption,
        vocabItem: item,
        testedConcept: `Gender Agreement: ${spanishWord}`
      });
    } else {
      // Fallback to vocabulary translation
      usedWordIds.add(item.id);
      const englishMeaning = item.english || item.translation_en || '';
      const distractors = shuffledVocab
        .filter(w => w.id !== item.id)
        .slice(0, 3)
        .map(w => w.english || w.translation_en || '');

      if (distractors.length >= 3) {
        questions.push({
          id: `q-extra-${item.id}`,
          type: 'vocab_meaning',
          level,
          prompt_es: `¿Cuál es el significado de "${spanishWord}"?`,
          prompt_en: `What is the accurate meaning of "${spanishWord}"?`,
          prompt_ar: `ما هو المعنى الصحيح لكلمة "${spanishWord}"؟`,
          options: shuffleArray([englishMeaning, ...distractors]),
          correctAnswer: englishMeaning,
          hint_en: `Category: ${item.category}. Phonetic: ${item.phonetic || item.ipa || ''}.`,
          hint_ar: `التصنيف: ${item.category}. اللفظ: ${item.phonetic || item.ipa || ''}.`,
          explanation_en: `"${spanishWord}" translates to "${englishMeaning}" (${item.arabic}).`,
          explanation_ar: `كلمة "${spanishWord}" تعني "${item.arabic}".`,
          audioText: spanishWord,
          vocabItem: item,
          testedConcept: `Vocabulary: ${spanishWord}`
        });
      }
    }
  }

  // Ensure exactly count questions
  return {
    questions: questions.slice(0, count),
    flashcardPool
  };
}
