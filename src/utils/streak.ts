import { UserProgress } from '../types';

export interface StreakUpdateResult {
  updatedProgress: UserProgress;
  isFirstLessonToday: boolean;
  newStreak: number;
}

export function recordLessonCompletionInProgress(
  prevProgress: UserProgress,
  lessonId: string
): StreakUpdateResult {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const dailyLessons = prevProgress.dailyLessonsCompleted || {};
  const lessonsTodayCount = dailyLessons[today] || 0;
  const isFirstLessonToday = lessonsTodayCount === 0;

  let newStreak = prevProgress.streakDays || 0;

  // Calculate streak continuity
  if (prevProgress.lastActiveDate === today) {
    // Already active today; keep current streak (or initialize to 1 if it was 0)
    if (newStreak === 0) newStreak = 1;
  } else if (prevProgress.lastActiveDate === yesterday) {
    // Practiced yesterday, extend streak
    newStreak = Math.max(1, newStreak + 1);
  } else {
    // Missed 1+ days, reset streak to 1
    newStreak = 1;
  }

  const updatedDailyLessons = {
    ...dailyLessons,
    [today]: lessonsTodayCount + 1
  };

  const isAlreadyCompleted = prevProgress.completedLessonIds.includes(lessonId);
  const updatedCompletedLessonIds = isAlreadyCompleted
    ? prevProgress.completedLessonIds
    : [...prevProgress.completedLessonIds, lessonId];

  const updatedProgress: UserProgress = {
    ...prevProgress,
    completedLessonIds: updatedCompletedLessonIds,
    streakDays: newStreak,
    lastActiveDate: today,
    dailyLessonsCompleted: updatedDailyLessons,
    dailyGoalMetDates: {
      ...(prevProgress.dailyGoalMetDates || {}),
      [today]: true
    }
  };

  return {
    updatedProgress,
    isFirstLessonToday,
    newStreak
  };
}
