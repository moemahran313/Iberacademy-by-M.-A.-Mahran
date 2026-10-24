import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ReaderFontFamily = 'lora' | 'merriweather' | 'fraunces';

export interface ReaderTypographySettings {
  fontSize: number;       // 16 to 28 px
  lineHeight: number;     // 1.6 to 2.0
  fontFamily: ReaderFontFamily;
}

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  readerSettings: ReaderTypographySettings;
  setReaderFontSize: (size: number) => void;
  setReaderLineHeight: (lineHeight: number) => void;
  setReaderFontFamily: (font: ReaderFontFamily) => void;
  resetReaderTypography: () => void;
}

const THEME_STORAGE_KEY = 'iberio_theme_mode';
const READER_PREFS_KEY = 'iberio_reader_typography';

const DEFAULT_READER_SETTINGS: ReaderTypographySettings = {
  fontSize: 18,
  lineHeight: 1.75,
  fontFamily: 'lora',
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (e) {
    console.warn('Could not read theme preference from localStorage', e);
  }
  return 'system';
}

function getStoredReaderSettings(): ReaderTypographySettings {
  if (typeof window === 'undefined') return DEFAULT_READER_SETTINGS;
  try {
    const raw = localStorage.getItem(READER_PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        fontSize: Math.min(28, Math.max(16, Number(parsed.fontSize) || 18)),
        lineHeight: Math.min(2.0, Math.max(1.6, Number(parsed.lineHeight) || 1.75)),
        fontFamily: ['lora', 'merriweather', 'fraunces'].includes(parsed.fontFamily)
          ? parsed.fontFamily
          : 'lora',
      };
    }
  } catch (e) {
    console.warn('Could not read reader preferences from localStorage', e);
  }
  return DEFAULT_READER_SETTINGS;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
  const [readerSettings, setReaderSettingsState] = useState<ReaderTypographySettings>(getStoredReaderSettings);

  // Resolved theme accounts for 'system'
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  // Listen for OS color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleChange);
      return () => (mediaQuery as any).removeListener(handleChange);
    }
  }, []);

  // Sync DOM classes and CSS variables with resolvedTheme
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Apply dark class
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // Set meta theme-color to avoid browser frame jarring
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      // Warm cream for light, rich obsidian for dark
      themeColorMeta.setAttribute('content', isDark ? '#0F172A' : '#FDFBF7');
    }
  }, [isDark]);

  // Sync reader typography CSS variables
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.style.setProperty('--reader-font-size', `${readerSettings.fontSize}px`);
    root.style.setProperty('--reader-line-height', `${readerSettings.lineHeight}`);

    const fontMap: Record<ReaderFontFamily, string> = {
      lora: "'Lora', Georgia, serif",
      merriweather: "'Merriweather', Georgia, serif",
      fraunces: "'Fraunces', Georgia, serif",
    };
    root.style.setProperty('--reader-font-family', fontMap[readerSettings.fontFamily]);
  }, [readerSettings]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (e) {
      console.warn('Failed to persist theme mode to localStorage', e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    // If current is system, toggle based on current resolved, otherwise flip light/dark
    const nextMode: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextMode);
  }, [resolvedTheme, setTheme]);

  const setReaderFontSize = useCallback((size: number) => {
    const clamped = Math.min(28, Math.max(16, size));
    setReaderSettingsState((prev) => {
      const next = { ...prev, fontSize: clamped };
      try {
        localStorage.setItem(READER_PREFS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save reader preferences', e);
      }
      return next;
    });
  }, []);

  const setReaderLineHeight = useCallback((lh: number) => {
    const clamped = Math.min(2.0, Math.max(1.6, Number(lh.toFixed(2))));
    setReaderSettingsState((prev) => {
      const next = { ...prev, lineHeight: clamped };
      try {
        localStorage.setItem(READER_PREFS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save reader preferences', e);
      }
      return next;
    });
  }, []);

  const setReaderFontFamily = useCallback((font: ReaderFontFamily) => {
    setReaderSettingsState((prev) => {
      const next = { ...prev, fontFamily: font };
      try {
        localStorage.setItem(READER_PREFS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save reader preferences', e);
      }
      return next;
    });
  }, []);

  const resetReaderTypography = useCallback(() => {
    setReaderSettingsState(DEFAULT_READER_SETTINGS);
    try {
      localStorage.setItem(READER_PREFS_KEY, JSON.stringify(DEFAULT_READER_SETTINGS));
    } catch (e) {
      console.warn('Failed to reset reader preferences', e);
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      isDark,
      setTheme,
      toggleTheme,
      readerSettings,
      setReaderFontSize,
      setReaderLineHeight,
      setReaderFontFamily,
      resetReaderTypography,
    }),
    [
      theme,
      resolvedTheme,
      isDark,
      setTheme,
      toggleTheme,
      readerSettings,
      setReaderFontSize,
      setReaderLineHeight,
      setReaderFontFamily,
      resetReaderTypography,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
