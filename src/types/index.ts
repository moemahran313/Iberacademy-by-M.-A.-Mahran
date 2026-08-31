export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';
export type ExplanationLanguage = 'en' | 'ar' | 'bilingual' | 'es_immersion';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'expression'
  | 'interjection';

export type TutorPersona = 'teacher' | 'friend' | 'grammar_doctor' | 'dele_examiner';

export interface Collocation {
  phrase_es: string;
  phrase_en: string;
  phrase_ar: string;
  example_es: string;
  example_en: string;
  example_ar: string;
}

export interface VocabularyItem {
  id: string;
  spanish?: string;
  word?: string;
  english?: string;
  translation_en?: string;
  arabic?: string;
  translation_ar?: string;
  phonetic?: string;
  ipa?: string;
  gender?: 'el' | 'la' | 'los' | 'las' | 'm' | 'f' | 'mf' | 'neutral' | string;
  plural?: string;
  cefr: CEFRLevel;
  category: string;
  topic?: string;
  partOfSpeech?: PartOfSpeech | string;
  pos?: PartOfSpeech | string;
  frequencyRank: number;
  collocations?: Collocation[] | string[];
  examples?: {
    es: string;
    en: string;
    ar: string;
  }[];
  exampleSentences?: {
    es: string;
    en: string;
    ar: string;
  }[];
  synonyms?: string[];
  antonyms?: string[];
  commonMistakes?: string;
  commonMistakes_ar?: string;
  imageVisualCue?: string;
  falseFriendAlert?: string;
  falseFriendAlert_ar?: string;
  relatedWords?: string[];
  relatedGrammarId?: string;
}

export type VocabularyWord = VocabularyItem;

export interface ConjugationForms {
  yo: string;
  tu: string;
  el_ella_usted: string;
  nosotros: string;
  vosotros: string;
  ellos_ellas_ustedes: string;
}

export interface VerbConjugations {
  present: ConjugationForms;
  preterite: ConjugationForms;
  imperfect: ConjugationForms;
  future: ConjugationForms;
  conditional: ConjugationForms;
  presentSubjunctive: ConjugationForms;
  imperfectSubjunctive: ConjugationForms;
  imperativeAffirmative: {
    tu: string;
    usted: string;
    nosotros: string;
    vosotros: string;
    ustedes: string;
  };
}

export type VerbConjugationTable = VerbConjugations;

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  arabic: string;
  gerund: string;
  participle: string;
  cefr: CEFRLevel;
  regularType: 'regular-ar' | 'regular-er' | 'regular-ir' | 'stem-changing' | 'irregular' | 'reflexive' | string;
  isReflexive: boolean;
  frequencyRank: number;
  conjugations: VerbConjugations;
  commonPrepositions?: string[];
  examples: {
    es: string;
    en: string;
    ar: string;
    tense: string;
  }[];
  commonMistakes?: string;
  commonMistakes_ar?: string;
  collocations: string[];
}

export interface GrammarTopic {
  id: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  cefr: CEFRLevel;
  category: 'foundations' | 'verbs' | 'subjunctive' | 'pronouns_se' | 'advanced_discourse' | string;
  summary_en: string;
  summary_ar: string;
  formula?: string;
  fullContent_en: string;
  fullContent_ar: string;
  examples: {
    es: string;
    en: string;
    ar: string;
    note?: string;
  }[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    reason_en: string;
    reason_ar: string;
  }[];
  relatedTopicIds?: string[];
  quickQuiz: {
    question_es: string;
    question_en: string;
    question_ar: string;
    options: string[];
    answerIdx: number;
    explanation_en: string;
    explanation_ar: string;
  }[];
}

export interface SentencePattern {
  id: string;
  spanish: string;
  english: string;
  arabic: string;
  cefr: CEFRLevel;
  pattern: string;
  patternBreakdown: string;
  tags: string[];
  grammarRefId?: string;
}

export interface Idiom {
  id: string;
  spanish: string;
  literal_en: string;
  meaning_en: string;
  meaning_ar: string;
  cefr: CEFRLevel;
  formality: 'informal' | 'slang' | 'neutral' | 'formal';
  region: 'Spain' | 'Mexico' | 'Argentina' | 'Colombia' | 'General' | 'Latin America';
  example_es: string;
  example_en: string;
  example_ar: string;
  culturalOrigin?: string;
  culturalOrigin_ar?: string;
}

export interface ComprehensibleStory {
  id: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  cefr: CEFRLevel;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  wordCount: number;
  audioDurationSec: number;
  paragraphs: {
    es: string;
    en: string;
    ar: string;
  }[];
  vocabHighlights: {
    word: string;
    en: string;
    ar: string;
  }[];
  grammarHighlights: string[];
  comprehensionQuiz: {
    question_es: string;
    question_en: string;
    question_ar: string;
    options: string[];
    answerIdx: number;
    explanation_en: string;
    explanation_ar: string;
  }[];
}

export interface VideoCourse {
  id: string;
  title: string;
  creator: string;
  youtubeId: string;
  playlistId?: string;
  playlistUrl?: string;
  cefr: CEFRLevel;
  topic: string;
  duration: string;
  description_en: string;
  description_ar: string;
  timestamps: {
    time: string;
    seconds: number;
    title: string;
    grammarOrVocab?: string;
  }[];
  keyVocab: string[];
  grammarNote: string;
}

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'translation'
  | 'sentence_order'
  | 'conjugation'
  | 'error_correction'
  | 'listening_recall';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt_es?: string;
  prompt_en: string;
  prompt_ar: string;
  options: string[];
  correctAnswer: string;
  hints?: string[];
  explanation_en: string;
  explanation_ar: string;
  audioText?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  lessonNumber: number;
  title_es: string;
  title_en: string;
  title_ar: string;
  cefr: CEFRLevel;
  objectives_en: string[];
  objectives_ar: string[];
  vocabWordIds: string[];
  grammarTopicId?: string;
  culturalNote?: {
    title: string;
    content_en: string;
    content_ar: string;
  };
  dialogue?: {
    speaker: string;
    es: string;
    en: string;
    ar: string;
  }[];
  exercises: Exercise[];
  productionPrompt?: {
    prompt_en: string;
    prompt_ar: string;
    minSentences: number;
    sampleTarget: string;
  };
}

export interface Unit {
  id: string;
  level: CEFRLevel;
  unitNumber: number;
  title_es: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  lessons: Lesson[];
}

export interface PlacementQuestion {
  id: number;
  level: CEFRLevel;
  category: 'vocabulary' | 'grammar' | 'reading' | 'sentence_logic';
  question_es: string;
  question_en: string;
  question_ar: string;
  options: string[];
  correctIdx: number;
  explanation_en: string;
  explanation_ar: string;
}

export type SRSGrade = 1 | 2 | 3 | 4; // 1: Again (reset/today), 2: Hard (1-2d), 3: Good (interval*ease), 4: Easy (bonus interval)

export interface SRSItem {
  wordId: string;
  interval: number; // in days
  repetitions: number;
  easeFactor: number; // default 2.5
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedDate?: string;
  history?: {
    date: string;
    grade: SRSGrade;
  }[];
  streak: number;
  successCount: number;
  failCount: number;
}

export interface LevelAssessmentResult {
  level: CEFRLevel;
  score: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  date: string;
  answers: Record<number, { selected: string; correct: string; isCorrect: boolean }>;
}

export type LingQStatus = 1 | 2 | 3 | 4; // 1: New / Status 1, 2: Recognized, 3: Familiar, 4: Mastered soon

export interface LingQItem {
  word: string; // normalized lowercase
  status: LingQStatus;
  translation_en: string;
  translation_ar?: string;
  phonetic?: string;
  partOfSpeech?: string;
  gender?: string;
  notes?: string;
  sentenceContext?: string;
  createdAt: string;
  lastReviewed?: string;
}

export interface MinedSentence {
  id: string;
  targetWord: string;
  sentence_es: string;
  sentence_en: string;
  sentence_ar?: string;
  sourceTitle?: string;
  dateMined: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReviewDate: string;
  lastGrade?: SRSGrade;
}

export interface ReadingSessionRecord {
  id: string;
  contentId: string;
  contentTitle: string;
  category: string;
  cefr: CEFRLevel;
  wordsRead: number;
  timeSpentSec: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
}

export interface ClozeSentenceVariation {
  id: string;
  variationType: 'conversational' | 'descriptive' | 'expressive' | 'idiomatic';
  variationTitle: string;
  sentence_es: string;
  sentence_en: string;
  sentence_ar: string;
  targetWord: string;
  targetWordForm: string; // The specific form in the sentence (conjugated, plural, etc.)
  clozeSentence: string; // e.g. "Por la mañana, me gusta tomar un [ _____ ] caliente."
  options: string[]; // 4 plausible distractors/forms
  explanation_en: string;
  explanation_ar: string;
  grammarTip?: string;
}

export interface ImportedContent {
  id: string;
  title: string;
  category: string; // 'News' | 'Dialogue' | 'Podcast' | 'Story' | 'Custom' | 'Song' | 'Cultural Essay' | 'Science & Tech'
  cefr: CEFRLevel;
  content: string;
  translation_en?: string;
  translation_ar?: string;
  dateAdded: string;
  wordCount: number;
  estimatedReadingTimeMin?: number;
  isCompleted?: boolean;
}

export interface ReminderSettings {
  enabled: boolean;
  channel: 'push' | 'email' | 'both';
  preferredTime: string;
  daysOfWeek: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  emailAddress?: string;
  focusArea?: 'vocabulary' | 'tutor' | 'stories' | 'grammar' | 'custom';
  customMessage?: string;
}

export interface RoleplayEvaluationRecord {
  id: string;
  timestamp: string;
  domain: 'professional' | 'social' | 'travel';
  title: string;
  overallScore: number;
  listeningRelevanceScore: number;
  writingFluencyScore: number;
  vocabularyUsageScore: number;
  weaknessCategory?: string;
  missedVocabulary?: string[];
  feedback_es: string;
  feedback_en: string;
}

export interface UserProgress {
  currentLevel: CEFRLevel;
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  avatarId?: string;
  photoURL?: string;
  targetDialect?: 'castilian' | 'latin_america' | 'mexico' | 'rioplatense' | 'caribbean' | string;
  completedLessonIds: string[];
  passedUnitQuizIds?: string[];
  quizScores?: Record<string, number>;
  unlockedLevels?: CEFRLevel[];
  passedLevelExamIds?: string[];
  levelExamScores?: Record<string, number>;
  levelCertificates?: Record<string, { date: string; score: number; level: CEFRLevel }>;
  savedWordIds: string[];
  masteredWordIds: string[];
  srsData: Record<string, SRSItem>;
  roleplayEvaluations?: RoleplayEvaluationRecord[];
  // LingQ & Comprehensible Input Acquisition Engine
  knownWords?: string[];
  lingqs?: Record<string, LingQItem>;
  minedSentences?: MinedSentence[];
  totalWordsRead?: number;
  totalReadingTimeSec?: number;
  dailyWordsRead?: Record<string, number>;
  dailyLessonsCompleted?: Record<string, number>;
  dailyGoalMetDates?: Record<string, boolean>;
  readingSessions?: ReadingSessionRecord[];
  userInterests?: string[];
  customImportedTexts?: ImportedContent[];
  settings: {
    nativeLanguage: ExplanationLanguage;
    audioSpeed: number;
    theme: 'light' | 'dark';
    dailyGoalMinutes: number;
    dailyWordsGoal?: number;
    reminderSettings?: ReminderSettings;
  };
}
