import React from 'react';

/**
 * Shimmer base element helper using the Iberio warm stone & subtle amber palette
 */
export const ShimmerBlock: React.FC<{ className?: string; variant?: 'stone' | 'amber' | 'accent' }> = ({
  className = '',
  variant = 'stone'
}) => {
  const bgColors = {
    stone: 'bg-stone-200/80 dark:bg-stone-800/80',
    amber: 'bg-amber-200/60 dark:bg-amber-900/30',
    accent: 'bg-amber-500/20 dark:bg-amber-500/20'
  }[variant];

  return (
    <div className={`${bgColors} rounded-2xl relative overflow-hidden animate-pulse ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent" />
    </div>
  );
};

/**
 * Dashboard View Shimmer Skeleton Loading State
 */
export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-4">
      {/* Top Welcome Banner Skeleton */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2.5">
            <ShimmerBlock className="h-4 w-32 rounded-lg" variant="amber" />
            <ShimmerBlock className="h-8 w-64 sm:w-80 rounded-xl" />
            <ShimmerBlock className="h-4 w-48 sm:w-96 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <ShimmerBlock className="h-10 w-28 rounded-2xl" variant="amber" />
            <ShimmerBlock className="h-10 w-28 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Metric Cards Skeleton Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-3 w-20 rounded-md" />
              <ShimmerBlock className="h-8 w-8 rounded-xl" variant={i === 1 ? 'amber' : 'stone'} />
            </div>
            <ShimmerBlock className="h-7 w-28 rounded-lg" />
            <ShimmerBlock className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* Main Content Split Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Story / Input Deck */}
        <div className="lg:col-span-2 space-y-4 p-5 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs">
          <div className="flex items-center justify-between">
            <ShimmerBlock className="h-6 w-40 rounded-lg" />
            <ShimmerBlock className="h-4 w-20 rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-950/60 border border-stone-200/70 dark:border-stone-800/70 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <ShimmerBlock className="h-3 w-16 rounded-md" />
                  <ShimmerBlock className="h-5 w-12 rounded-full" variant="amber" />
                </div>
                <ShimmerBlock className="h-5 w-3/4 rounded-md" />
                <ShimmerBlock className="h-3 w-full rounded-md" />
                <ShimmerBlock className="h-3 w-2/3 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Recommended Focus & SRS */}
        <div className="space-y-4 p-5 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs">
          <ShimmerBlock className="h-6 w-36 rounded-lg" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-stone-50/70 dark:bg-stone-950/60 border border-stone-200/70 dark:border-stone-800/70 flex items-center justify-between"
              >
                <div className="space-y-1.5 flex-1 pr-3">
                  <ShimmerBlock className="h-4 w-32 rounded-md" />
                  <ShimmerBlock className="h-3 w-20 rounded-md" />
                </div>
                <ShimmerBlock className="h-8 w-8 rounded-xl shrink-0" variant="amber" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Vocabulary Library View Shimmer Skeleton Loading State
 */
export const VocabularySkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-4">
      {/* Header Banner Skeleton */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
        <ShimmerBlock className="h-8 w-60 rounded-xl" />
        <ShimmerBlock className="h-4 w-96 max-w-full rounded-lg" />
      </div>

      {/* Search & Category Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <ShimmerBlock className="h-12 flex-1 rounded-2xl" />
        <div className="flex gap-2">
          <ShimmerBlock className="h-12 w-28 rounded-2xl" />
          <ShimmerBlock className="h-12 w-28 rounded-2xl" />
        </div>
      </div>

      {/* SRS Stats Summary Skeleton */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center justify-between">
        <ShimmerBlock className="h-4 w-40 rounded-lg" />
        <ShimmerBlock className="h-6 w-24 rounded-full" variant="amber" />
      </div>

      {/* Vocabulary Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-6 w-32 rounded-lg" />
              <ShimmerBlock className="h-5 w-16 rounded-full" variant="amber" />
            </div>
            <ShimmerBlock className="h-4 w-48 rounded-md" />
            <ShimmerBlock className="h-12 w-full rounded-xl" />
            <div className="flex justify-between items-center pt-2">
              <ShimmerBlock className="h-3 w-20 rounded-md" />
              <ShimmerBlock className="h-7 w-20 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Comprehensible Input Stories Shimmer Skeleton Loading State
 */
export const StoriesSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-4">
      {/* Level Selector Chips Skeleton */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
        {['A1', 'A2', 'B1', 'B2', 'All'].map((_, i) => (
          <ShimmerBlock key={i} className="h-10 w-28 rounded-2xl shrink-0" variant={i === 0 ? 'amber' : 'stone'} />
        ))}
      </div>

      {/* Search Input Skeleton */}
      <ShimmerBlock className="h-12 w-full rounded-2xl" />

      {/* Story Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-5 w-16 rounded-full" variant="amber" />
              <ShimmerBlock className="h-4 w-20 rounded-md" />
            </div>
            <ShimmerBlock className="h-6 w-4/5 rounded-xl" />
            <ShimmerBlock className="h-4 w-full rounded-md" />
            <ShimmerBlock className="h-4 w-3/4 rounded-md" />
            <div className="flex justify-between items-center pt-2">
              <ShimmerBlock className="h-4 w-24 rounded-md" />
              <ShimmerBlock className="h-9 w-28 rounded-2xl" variant="amber" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * CEFR Roadmap & Learning Path Shimmer Skeleton Loading State
 */
export const RoadmapSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 sm:px-4">
      {/* Header with Level Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <ShimmerBlock className="h-7 w-48 rounded-xl" />
            <ShimmerBlock className="h-4 w-64 rounded-md" />
          </div>
          <ShimmerBlock className="h-10 w-24 rounded-2xl" variant="amber" />
        </div>
        <ShimmerBlock className="h-3 w-full rounded-full" variant="amber" />
      </div>

      {/* Roadmap Tree Node Steps */}
      <div className="space-y-4 pt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center gap-4"
          >
            <ShimmerBlock className="h-12 w-12 rounded-2xl shrink-0" variant={i === 1 ? 'amber' : 'stone'} />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <ShimmerBlock className="h-5 w-44 rounded-md" />
                <ShimmerBlock className="h-4 w-16 rounded-full" />
              </div>
              <ShimmerBlock className="h-3 w-3/4 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skill Workshop Shimmer Skeleton Loading State
 */
export const WorkshopSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-4">
      {/* Workshop Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
        <ShimmerBlock className="h-4 w-28 rounded-md" variant="amber" />
        <ShimmerBlock className="h-8 w-56 rounded-xl" />
        <ShimmerBlock className="h-4 w-80 max-w-full rounded-lg" />
      </div>

      {/* Workshop Module Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-12 w-12 rounded-2xl" variant={i % 2 === 0 ? 'amber' : 'stone'} />
              <ShimmerBlock className="h-5 w-16 rounded-full" />
            </div>
            <ShimmerBlock className="h-6 w-36 rounded-lg" />
            <ShimmerBlock className="h-4 w-full rounded-md" />
            <ShimmerBlock className="h-4 w-2/3 rounded-md" />
            <div className="pt-2">
              <ShimmerBlock className="h-9 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Verb Conjugator Shimmer Skeleton Loading State
 */
export const VerbConjugatorSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto px-1 sm:px-4">
      {/* Header & Search */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        <ShimmerBlock className="h-8 w-64 rounded-xl" />
        <ShimmerBlock className="h-12 w-full rounded-2xl" />
        {/* Tense pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <ShimmerBlock key={i} className="h-8 w-24 rounded-full shrink-0" variant={i === 1 ? 'amber' : 'stone'} />
          ))}
        </div>
      </div>

      {/* Conjugation Table Matrix Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
          <ShimmerBlock className="h-6 w-32 rounded-lg" />
          <ShimmerBlock className="h-5 w-20 rounded-full" variant="amber" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/60 dark:border-stone-800/60 space-y-2">
              <ShimmerBlock className="h-3 w-16 rounded-md" />
              <ShimmerBlock className="h-5 w-28 rounded-md" variant="amber" />
              <ShimmerBlock className="h-3 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Grammar Encyclopedia Shimmer Skeleton Loading State
 */
export const GrammarSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto px-1 sm:px-4">
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
        <ShimmerBlock className="h-8 w-56 rounded-xl" />
        <ShimmerBlock className="h-4 w-72 rounded-md" />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[1, 2, 3, 4].map((i) => (
          <ShimmerBlock key={i} className="h-9 w-28 rounded-2xl shrink-0" variant={i === 1 ? 'amber' : 'stone'} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <ShimmerBlock className="h-5 w-36 rounded-md" />
              <ShimmerBlock className="h-4 w-12 rounded-full" variant="amber" />
            </div>
            <ShimmerBlock className="h-3 w-full rounded-md" />
            <ShimmerBlock className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * AI Tutor Chat Shimmer Skeleton Loading State
 */
export const AITutorSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto px-1 sm:px-4">
      {/* Tutor Profile Header */}
      <div className="p-4 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShimmerBlock className="h-10 w-10 rounded-2xl" variant="amber" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-4 w-28 rounded-md" />
            <ShimmerBlock className="h-3 w-20 rounded-md" />
          </div>
        </div>
        <ShimmerBlock className="h-8 w-24 rounded-xl" />
      </div>

      {/* Chat Messages Stream */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs min-h-[380px] flex flex-col justify-end space-y-4">
        {/* Tutor message */}
        <div className="flex items-start gap-3 max-w-[80%]">
          <ShimmerBlock className="h-8 w-8 rounded-full shrink-0" variant="amber" />
          <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-800/80 space-y-2 flex-1">
            <ShimmerBlock className="h-3 w-48 rounded-md" />
            <ShimmerBlock className="h-3 w-64 rounded-md" />
          </div>
        </div>
        {/* User response */}
        <div className="flex items-start gap-3 max-w-[70%] self-end flex-row-reverse">
          <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-2 flex-1">
            <ShimmerBlock className="h-3 w-40 rounded-md" variant="amber" />
          </div>
        </div>
        {/* Tutor reply */}
        <div className="flex items-start gap-3 max-w-[80%]">
          <ShimmerBlock className="h-8 w-8 rounded-full shrink-0" variant="amber" />
          <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-800/80 space-y-2 flex-1">
            <ShimmerBlock className="h-3 w-56 rounded-md" />
          </div>
        </div>
      </div>

      {/* Input box */}
      <div className="p-3 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center gap-3">
        <ShimmerBlock className="h-10 flex-1 rounded-xl" />
        <ShimmerBlock className="h-10 w-10 rounded-xl shrink-0" variant="amber" />
      </div>
    </div>
  );
};

/**
 * LingLooper / Shadowing Interactive Drills Shimmer Skeleton Loading State
 */
export const AudioDrillSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-4">
      <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs text-center space-y-6">
        <ShimmerBlock className="h-6 w-48 mx-auto rounded-lg" variant="amber" />
        <ShimmerBlock className="h-12 w-3/4 mx-auto rounded-2xl" />
        {/* Simulated Waveform */}
        <div className="flex items-center justify-center gap-1.5 h-14">
          {[40, 70, 30, 85, 60, 95, 45, 80, 50, 65, 30].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="w-1.5 bg-amber-500/40 rounded-full animate-pulse"
            />
          ))}
        </div>
        {/* Audio Control Actions */}
        <div className="flex justify-center items-center gap-4">
          <ShimmerBlock className="h-12 w-12 rounded-full" />
          <ShimmerBlock className="h-16 w-16 rounded-full" variant="amber" />
          <ShimmerBlock className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Profile View Shimmer Skeleton Loading State
 */
export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 sm:px-4">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <ShimmerBlock className="h-20 w-20 rounded-full" variant="amber" />
        <div className="space-y-2 text-center sm:text-left flex-1">
          <ShimmerBlock className="h-7 w-48 rounded-xl" />
          <ShimmerBlock className="h-4 w-32 rounded-md" />
        </div>
        <ShimmerBlock className="h-10 w-28 rounded-2xl" />
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-2">
            <ShimmerBlock className="h-3 w-16 rounded-md" />
            <ShimmerBlock className="h-6 w-20 rounded-lg" variant={i === 1 ? 'amber' : 'stone'} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Dynamic Tab Skeleton Dispatcher - returns the skeleton that mirrors each specific tab
 */
export const TabLoadingSkeleton: React.FC<{ tab: string }> = ({ tab }) => {
  switch (tab) {
    case 'stories':
    case 'videos':
      return <StoriesSkeleton />;
    case 'vocabulary':
      return <VocabularySkeleton />;
    case 'verbs':
      return <VerbConjugatorSkeleton />;
    case 'grammar':
      return <GrammarSkeleton />;
    case 'tutor':
      return <AITutorSkeleton />;
    case 'workshop':
      return <WorkshopSkeleton />;
    case 'path':
    case 'planner':
      return <RoadmapSkeleton />;
    case 'linglooper':
    case 'shadowing':
      return <AudioDrillSkeleton />;
    case 'profile':
      return <ProfileSkeleton />;
    case 'dashboard':
    default:
      return <DashboardSkeleton />;
  }
};
