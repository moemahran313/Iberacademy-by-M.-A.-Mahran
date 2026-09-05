import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce fast changing values (e.g. search inputs).
 * @param value The value to be debounced
 * @param delay Delay in milliseconds (default 250ms)
 */
export function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
