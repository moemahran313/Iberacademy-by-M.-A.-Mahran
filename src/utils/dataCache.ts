/**
 * Local Storage-backed caching utility for instant load times and offline availability.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export const dataCache = {
  /**
   * Retrieves data from localStorage with optional expiration check
   */
  get<T>(key: string, maxAgeMs: number = DEFAULT_TTL_MS): T | null {
    try {
      const raw = localStorage.getItem(`iberio_cache_${key}`);
      if (!raw) return null;
      
      const parsed: CacheEntry<T> = JSON.parse(raw);
      const isExpired = Date.now() - parsed.timestamp > maxAgeMs;
      
      if (isExpired) {
        localStorage.removeItem(`iberio_cache_${key}`);
        return null;
      }
      
      return parsed.data;
    } catch (err) {
      console.warn(`Cache read error for key ${key}:`, err);
      return null;
    }
  },

  /**
   * Saves data to localStorage with timestamp
   */
  set<T>(key: string, data: T): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`iberio_cache_${key}`, JSON.stringify(entry));
    } catch (err) {
      console.warn(`Cache write error for key ${key}:`, err);
    }
  },

  /**
   * Clears a specific cache key or all app caches
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(`iberio_cache_${key}`);
    } catch (err) {
      console.warn(`Cache remove error for key ${key}:`, err);
    }
  },

  /**
   * Clears all cached entries managed by Iberio
   */
  clearAll(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('iberio_cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (err) {
      console.warn('Cache clear error:', err);
    }
  }
};
