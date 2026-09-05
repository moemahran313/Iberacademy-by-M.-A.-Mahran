import { useState, useEffect, useRef, useCallback } from 'react';

interface WindowedListOptions {
  pageSize?: number;
  resetDeps?: any[];
}

/**
 * Custom hook for list windowing / lazy incremental rendering.
 * Keeps DOM node count low on mobile while scrolling large data sets.
 */
export function useWindowedList<T>(
  items: T[],
  options: WindowedListOptions = {}
) {
  const { pageSize = 20, resetDeps = [] } = options;
  const [visibleCount, setVisibleCount] = useState<number>(pageSize);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset window count whenever underlying items or search dependencies change
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items.length, pageSize, ...resetDeps]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
  }, [items.length, pageSize]);

  // Ref callback for the bottom sentinel element
  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && visibleCount < items.length) {
            loadMore();
          }
        },
        { rootMargin: '300px' }
      );

      observerRef.current.observe(node);
    },
    [visibleCount, items.length, loadMore]
  );

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return {
    visibleItems,
    hasMore,
    visibleCount,
    totalCount: items.length,
    sentinelRef,
    loadMore
  };
}
