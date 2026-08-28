import React from 'react';
import { motion } from 'motion/react';
import { Flame, CheckCircle2, ShieldCheck, Zap, Calendar, Award } from 'lucide-react';
import { UserProgress } from '../types';

interface StreakCounterWidgetProps {
  userProgress: UserProgress;
  onOpenLesson?: () => void;
}

export const StreakCounterWidget: React.FC<StreakCounterWidgetProps> = ({
  userProgress,
  onOpenLesson
}) => {
  const streak = userProgress.streakDays || 0;
  const today = new Date().toISOString().split('T')[0];
  const isPracticedToday = userProgress.lastActiveDate === today && (userProgress.dailyLessonsCompleted?.[today] || 0) > 0;

  // Generate 7 days of the current week (Sun - Sat)
  const getWeekDays = () => {
    const days = [];
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 = Sun
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - currentDayOfWeek);

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = dateStr === today;
      const wasPracticed = (userProgress.dailyLessonsCompleted?.[dateStr] || 0) > 0 || (userProgress.dailyGoalMetDates?.[dateStr] || false) || (isToday && isPracticedToday);

      days.push({
        label: dayLabels[i],
        dateStr,
        isToday,
        wasPracticed
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-stone-900 border border-orange-500/30 dark:border-orange-500/20 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      {/* Header: Flame Icon & Streak Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 text-white shadow-md shadow-orange-500/20 shrink-0">
            <Flame className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
                Daily Streak
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> Synced
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono tracking-tight">
                {streak} {streak === 1 ? 'Day' : 'Days'}
              </h3>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {streak > 0 ? '🔥 Active' : 'Start Today'}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
          {isPracticedToday ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500 text-stone-950 text-xs font-black shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Practiced Today</span>
            </div>
          ) : (
            <button
              onClick={() => onOpenLesson && onOpenLesson()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black shadow-sm transition cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-stone-950 text-stone-950" />
              <span>Extend Streak</span>
            </button>
          )}
        </div>
      </div>

      {/* 7-Day Visual Calendar Tracker */}
      <div className="pt-3 border-t border-orange-500/15 dark:border-stone-800 relative z-10 space-y-2.5">
        <div className="flex justify-between items-center text-xs font-bold text-stone-600 dark:text-stone-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span>Weekly Consistency</span>
          </span>
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
            {isPracticedToday ? 'Goal Met Today 🎉' : 'Lesson pending today'}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekDays.map((day) => (
            <div
              key={day.dateStr}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border transition ${
                day.wasPracticed
                  ? 'bg-gradient-to-b from-orange-500 to-amber-500 text-stone-950 border-orange-400 shadow-xs'
                  : day.isToday
                  ? 'bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/50 text-orange-600 dark:text-orange-400 font-black'
                  : 'bg-stone-100/80 dark:bg-stone-800/50 border-stone-200/80 dark:border-stone-800 text-stone-400'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-tight">
                {day.label}
              </span>
              <div className="mt-1">
                {day.wasPracticed ? (
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-stone-950 text-stone-950" />
                ) : day.isToday ? (
                  <span className="block w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                ) : (
                  <span className="text-xs font-mono opacity-40">•</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
