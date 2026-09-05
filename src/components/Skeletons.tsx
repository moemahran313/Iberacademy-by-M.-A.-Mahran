import React from 'react';

/**
 * Shimmer base element helper
 */
const ShimmerBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-stone-200 dark:bg-stone-800/80 rounded-2xl relative overflow-hidden animate-pulse ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer" />
  </div>
);

/**
 * Dashboard View Shimmer Skeleton Loading State
 */
export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto px-1 sm:px-4">
      {/* Top Welcome Banner Skeleton */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2.5">
            <ShimmerBlock className="h-4 w-32 rounded-lg" />
            <ShimmerBlock className="h-8 w-64 sm:w-80 rounded-xl" />
            <ShimmerBlock className="h-4 w-48 sm:w-96 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <ShimmerBlock className="h-10 w-28 rounded-2xl" />
            <ShimmerBlock className="h-10 w-28 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Metric Cards Skeleton Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-3 w-20 rounded-md" />
              <ShimmerBlock className="h-8 w-8 rounded-xl" />
            </div>
            <ShimmerBlock className="h-7 w-28 rounded-lg" />
            <ShimmerBlock className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* Main Content Split Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Story / Input Deck */}
        <div className="lg:col-span-2 space-y-4 p-5 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <ShimmerBlock className="h-6 w-40 rounded-lg" />
            <ShimmerBlock className="h-4 w-20 rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <ShimmerBlock className="h-3 w-16 rounded-md" />
                  <ShimmerBlock className="h-5 w-12 rounded-full" />
                </div>
                <ShimmerBlock className="h-5 w-3/4 rounded-md" />
                <ShimmerBlock className="h-3 w-full rounded-md" />
                <ShimmerBlock className="h-3 w-2/3 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Recommended Focus & SRS */}
        <div className="space-y-4 p-5 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
          <ShimmerBlock className="h-6 w-36 rounded-lg" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between"
              >
                <div className="space-y-1.5 flex-1 pr-3">
                  <ShimmerBlock className="h-4 w-32 rounded-md" />
                  <ShimmerBlock className="h-3 w-20 rounded-md" />
                </div>
                <ShimmerBlock className="h-8 w-8 rounded-xl shrink-0" />
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
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto px-1 sm:px-4">
      {/* Header Banner Skeleton */}
      <div className="p-6 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
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
      <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <ShimmerBlock className="h-4 w-40 rounded-lg" />
        <ShimmerBlock className="h-6 w-24 rounded-full" />
      </div>

      {/* Vocabulary Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-6 w-32 rounded-lg" />
              <ShimmerBlock className="h-5 w-16 rounded-full" />
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
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto px-1 sm:px-4">
      {/* Level Selector Chips Skeleton */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <ShimmerBlock key={i} className="h-10 w-28 rounded-2xl shrink-0" />
        ))}
      </div>

      {/* Search Input Skeleton */}
      <ShimmerBlock className="h-12 w-full rounded-2xl" />

      {/* Story Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-5 w-16 rounded-full" />
              <ShimmerBlock className="h-4 w-20 rounded-md" />
            </div>
            <ShimmerBlock className="h-6 w-4/5 rounded-xl" />
            <ShimmerBlock className="h-4 w-full rounded-md" />
            <ShimmerBlock className="h-4 w-3/4 rounded-md" />
            <div className="flex justify-between items-center pt-2">
              <ShimmerBlock className="h-4 w-24 rounded-md" />
              <ShimmerBlock className="h-9 w-28 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
