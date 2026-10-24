import { SPANISH_COLLOCATIONS } from '../data/spanishCollocations';
import { CollocationPairing } from '../types/vocabulary';

/**
 * Service to retrieve high-frequency authentic collocations for any target Spanish word.
 * Also generates fill-in-the-blank contextual cloze review challenges.
 */
export function getCollocationsForWord(word: string): CollocationPairing[] {
  if (!word) return [];
  const clean = word.toLowerCase().trim().replace(/[^a-záéíóúñü]/g, '');

  const matches = SPANISH_COLLOCATIONS.filter(c => {
    const target = c.targetWord.toLowerCase().trim();
    const partner = c.partnerWord.toLowerCase().trim();
    const phrase = c.phrase_es.toLowerCase().trim();

    return target === clean || partner === clean || phrase.includes(clean);
  });

  return matches.slice(0, 3);
}

/**
 * Get a primary high-frequency collocation for flashcards.
 * If no exact match is found, returns a contextual pairing from the database.
 */
export function getPrimaryCollocation(word: string): CollocationPairing | undefined {
  const list = getCollocationsForWord(word);
  if (list.length > 0) return list[0];

  // If word not specifically indexed, pick a relevant or generic prepositional/verb pairing
  const clean = word.toLowerCase().trim();
  const matched = SPANISH_COLLOCATIONS.find(c => c.phrase_es.toLowerCase().includes(clean));
  return matched;
}

/**
 * Generate a cloze fill-in-the-blank review question from a collocation.
 */
export function generateClozeExercise(collocation: CollocationPairing): {
  id: string;
  sentenceWithBlank: string;
  correctOption: string;
  options: string[];
  explanation: string;
} {
  const correctOption = collocation.correctOption || collocation.partnerWord;
  const distractors = collocation.distractors || ['hacer', 'tener', 'dar'];
  const allOptions = Array.from(new Set([correctOption, ...distractors])).sort(() => 0.5 - Math.random());

  const sentenceWithBlank = collocation.clozeSentence ||
    collocation.example_es.replace(
      new RegExp(`\\b${correctOption}\\b`, 'i'),
      '_______'
    );

  return {
    id: `cloze_${collocation.id}`,
    sentenceWithBlank,
    correctOption,
    options: allOptions,
    explanation: `"${collocation.phrase_es}" (${collocation.phrase_en}) es una colocación auténtica (${collocation.typeLabelEs}).`
  };
}
