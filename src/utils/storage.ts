import { UserProgress } from '../types';

const STORAGE_KEY = 'hispano_academy_user_progress';

export const DEFAULT_USER_PROGRESS: UserProgress = {
  currentLevel: 'A1',
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 0,
  completedLessonIds: [],
  passedUnitQuizIds: [],
  quizScores: {},
  unlockedLevels: ['A1'],
  passedLevelExamIds: [],
  levelExamScores: {},
  levelCertificates: {},
  savedWordIds: [],
  masteredWordIds: [],
  srsData: {},
  // LingQ & Comprehensible Input Acquisition Engine
  knownWords: [],
  lingqs: {},
  minedSentences: [],
  totalWordsRead: 0,
  dailyWordsRead: {},
  customImportedTexts: [],
  settings: {
    nativeLanguage: 'bilingual',
    audioSpeed: 0.9,
    theme: 'light',
    dailyGoalMinutes: 15,
    dailyWordsGoal: 250
  }
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_USER_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_USER_PROGRESS;
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_USER_PROGRESS,
      ...parsed,
      unlockedLevels: parsed.unlockedLevels || ['A1'],
      knownWords: parsed.knownWords || [],
      lingqs: parsed.lingqs || {},
      minedSentences: parsed.minedSentences || [],
      totalWordsRead: parsed.totalWordsRead ?? 0,
      dailyWordsRead: parsed.dailyWordsRead || {},
      dailyLessonsCompleted: parsed.dailyLessonsCompleted || {},
      dailyGoalMetDates: parsed.dailyGoalMetDates || {},
      customImportedTexts: parsed.customImportedTexts || []
    };
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
}
