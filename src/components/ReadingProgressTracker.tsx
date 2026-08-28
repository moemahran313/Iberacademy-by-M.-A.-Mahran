import React from 'react';
import {
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Flame,
  Zap,
  Layers,
  BarChart2,
  Trophy,
  Activity
} from 'lucide-react';
import { UserProgress, ReadingSessionRecord } from '../types';

interface ReadingProgressTrackerProps {
  userProgress: UserProgress;
}

export const ReadingProgressTracker: React.FC<ReadingProgressTrackerProps> = ({ userProgress }) => {
  const totalWordsRead = userProgress.totalWordsRead || 0;
  const totalReadingTimeSec = userProgress.totalReadingTimeSec || 0;
  const knownWordsCount = (userProgress.knownWords || []).length + (userProgress.masteredWordIds || []).length;
  const lingqsCount = Object.keys(userProgress.lingqs || {}).length;
  const sessions = userProgress.readingSessions || [];

  // Format reading time (hours & minutes)
  const formatReadingTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} min`;
  };

  // Average Reading Speed (Words Per Minute)
  const readingSpeedWPM = totalReadingTimeSec > 30
    ? Math.round((totalWordsRead / (totalReadingTimeSec / 60)))
    : 0;

  // Daily word history array for recent 7 days chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const dailyCounts = userProgress.dailyWordsRead || {};
  const chartData = last7Days.map(dateStr => {
    const dayLabel = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
    const count = dailyCounts[dateStr] || 0;
    return { dateStr, dayLabel, count };
  });

  const maxDailyCount = Math.max(500, ...chartData.map(c => c.count));

  // Milestones
  const milestones = [
    { target: 1000, name: 'Novice Immersion Reader', icon: '🌱', badge: '1K Words' },
    { target: 5000, name: 'Story Explorer', icon: '🚀', badge: '5K Words' },
    { target: 10000, name: 'High-Volume Bookworm', icon: '📚', badge: '10K Words' },
    { target: 25000, name: 'Krashen Polyglot Master', icon: '🏆', badge: '25K Words' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Total Words Read</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            {totalWordsRead.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 font-mono">
            Cumulative input volume
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Total Immersion Time</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-500">
            {formatReadingTime(totalReadingTimeSec)}
          </div>
          <p className="text-[11px] text-stone-400 font-mono">
            {readingSpeedWPM > 0 ? `Avg Speed: ${readingSpeedWPM} WPM` : 'Active reading session timer'}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Known Words Vault</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400">
            {knownWordsCount}
          </div>
          <p className="text-[11px] text-stone-400 font-mono">
            Zero-lookup recognition
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Active LingQs</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {lingqsCount}
          </div>
          <p className="text-[11px] text-stone-400 font-mono">
            Words currently in SRS
          </p>
        </div>
      </div>

      {/* Dynamic Reading Volume Chart (Recent 7 Days) */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-500" />
              <span>Daily Input Volume (Last 7 Days)</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              High-volume daily reading is the single strongest predictor of implicit grammar acquisition.
            </p>
          </div>

          <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold">
            Daily Goal: {userProgress.settings.dailyWordsGoal || 500} words
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-4 pb-2">
          <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-stone-200 dark:border-stone-800">
            {chartData.map((d, i) => {
              const pct = Math.min(100, Math.round((d.count / maxDailyCount) * 100));
              const isGoalMet = d.count >= (userProgress.settings.dailyWordsGoal || 500);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-stone-400 opacity-0 group-hover:opacity-100 transition">
                    {d.count} w
                  </span>

                  <div className="w-full max-w-[40px] bg-stone-100 dark:bg-stone-800/80 rounded-t-xl h-full flex items-end overflow-hidden p-1">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isGoalMet
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                          : 'bg-gradient-to-t from-amber-600 to-amber-400'
                      }`}
                      style={{ height: `${Math.max(8, pct)}%` }}
                    />
                  </div>

                  <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                    {d.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reading Milestones Progress */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Volume Reading Milestones</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => {
            const isUnlocked = totalWordsRead >= m.target;
            const pct = Math.min(100, Math.round((totalWordsRead / m.target) * 100));

            return (
              <div
                key={i}
                className={`p-4 rounded-2xl border space-y-2 transition ${
                  isUnlocked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                    : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    isUnlocked ? 'bg-emerald-500 text-stone-950' : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                  }`}>
                    {m.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black">{m.name}</h4>
                  <p className="text-[10px] text-stone-400 font-mono">
                    {totalWordsRead.toLocaleString()} / {m.target.toLocaleString()} words
                  </p>
                </div>

                <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading Session Log Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-500" />
          <span>Recent Reading Session History</span>
        </h3>

        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase font-extrabold">
                  <th className="py-2.5 px-3">Title & Category</th>
                  <th className="py-2.5 px-3">CEFR</th>
                  <th className="py-2.5 px-3">Words Read</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {sessions.slice(0, 10).map((s, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition">
                    <td className="py-3 px-3 font-bold text-stone-900 dark:text-white">
                      <div>{s.contentTitle}</div>
                      <div className="text-[10px] font-medium text-stone-400">{s.category}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black text-[10px]">
                        {s.cefr}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-500 font-mono">
                      {s.wordsRead} words
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-500 dark:text-stone-400">
                      {Math.ceil(s.timeSpentSec / 60)} min
                    </td>
                    <td className="py-3 px-3 text-stone-400 font-mono">
                      {s.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-stone-400 text-xs border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl">
            No logged reading sessions yet. Select any text from the library to launch an interactive session!
          </div>
        )}
      </div>
    </div>
  );
};
