import React, { useState, useEffect, useRef } from 'react';

interface LazyViewWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * LazyViewWrapper: Uses IntersectionObserver to defer mounting heavy off-screen
 * views or media assets until they come near the viewport.
 */
export const LazyViewWrapper: React.FC<LazyViewWrapperProps> = ({
  children,
  fallback,
  rootMargin = '200px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : fallback || (
        <div className="w-full h-48 bg-stone-100 dark:bg-stone-900/50 rounded-3xl animate-pulse flex items-center justify-center text-xs text-stone-400 font-mono">
          Loading Content...
        </div>
      )}
    </div>
  );
};
