'use client'

/**
 * ThemeProvider
 * Production-ready theme management with React context
 *
 * Dark/light mode: controlled via `.dark` / `.light` class on <html>
 * Theme presets: controlled via `data-theme` attribute on <html> (e.g. data-theme="corporate")
 *
 * These are independent — you can combine any preset with any mode:
 *   <html class="dark" data-theme="corporate">
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Theme, ThemeProviderProps, ThemeProviderState } from './types';

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * Get stored theme from localStorage (SSR-safe)
 */
const getStoredTheme = (storageKey: string): Theme | null => {
  if (typeof window === 'undefined') return null;
  try {
    return (localStorage.getItem(storageKey) as Theme) || null;
  } catch {
    return null;
  }
};

/**
 * Store theme to localStorage (SSR-safe)
 */
const setStoredTheme = (storageKey: string, theme: Theme): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Silently fail if localStorage is not available
  }
};

/**
 * Get system theme preference (SSR-safe)
 */
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
};

/**
 * Apply theme mode to document (SSR-safe)
 * Only touches the class (.dark / .light) and data-mode attribute.
 * Does NOT touch data-theme — that's reserved for preset names.
 */
const applyTheme = (
  theme: 'light' | 'dark',
  disableTransitionOnChange: boolean
): void => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Disable transitions temporarily if requested
  if (disableTransitionOnChange) {
    const css = document.createElement('style');
    css.textContent = '* { transition: none !important; }';
    document.head.appendChild(css);

    // Force reflow
    void root.offsetHeight;

    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  }

  // Apply mode via class only — data-theme is reserved for presets
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  // Also set data-mode for CSS selectors that prefer attribute-based targeting
  root.setAttribute('data-mode', theme);
};

/**
 * ThemeProvider Component
 * Provides theme context and manages theme state with persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  disableTransitionOnChange = false,
  // enableStrictMode is defined in props but reserved for future use
}) => {
  // Initialize theme state (SSR-safe)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = getStoredTheme(storageKey);
    return stored ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = getStoredTheme(storageKey) ?? defaultTheme;
    if (stored === 'system') return getSystemTheme();
    return stored;
  });

  // Handle theme changes
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      setStoredTheme(storageKey, newTheme);

      const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
      setResolvedTheme(resolved);
      applyTheme(resolved, disableTransitionOnChange);
    },
    [storageKey, disableTransitionOnChange]
  );

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme, disableTransitionOnChange);
    };

    // Initial check
    handleChange(mediaQuery);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Legacy browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme, disableTransitionOnChange]);

  // Apply initial theme on mount (client-side only)
  useEffect(() => {
    applyTheme(resolvedTheme, false);
  }, [resolvedTheme]);

  // Memoize context value
  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

/**
 * useTheme Hook
 * Access theme context from any component
 *
 * @throws {Error} When used outside ThemeProvider (in strict mode)
 * @returns {ThemeProviderState} Theme state and setTheme function
 *
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme } = useTheme();
 *
 * // Current theme setting
 * console.log(theme); // 'light' | 'dark' | 'system'
 *
 * // Resolved theme (actual theme being displayed)
 * console.log(resolvedTheme); // 'light' | 'dark'
 *
 * // Change theme
 * setTheme('dark');
 * ```
 */
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

/**
 * Generate a script to inject in <head> for SSR apps to prevent flash of unstyled content.
 * Place this in your HTML template before any styles.
 *
 * Only sets class and data-mode — does NOT touch data-theme (preset).
 *
 * @param storageKey - Must match the `storageKey` prop on ThemeProvider (default: 'ui-theme')
 *
 * @example
 * ```html
 * <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 * // or with custom key:
 * <script dangerouslySetInnerHTML={{ __html: getThemeScript('my-app-theme') }} />
 * ```
 */
export function getThemeScript(storageKey: string = 'ui-theme'): string {
  return `
(function() {
  try {
    var storageKey = ${JSON.stringify(storageKey)};
    var theme = localStorage.getItem(storageKey) || 'system';
    var resolved = theme;

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.classList.add(resolved);
    document.documentElement.setAttribute('data-mode', resolved);
  } catch (e) {}
})();
`;
}

/**
 * Script to inject in <head> for SSR apps to prevent flash of unstyled content.
 * Uses the default storage key 'ui-theme'. For custom keys, use `getThemeScript(key)` instead.
 *
 * @deprecated Use `getThemeScript()` for configurability. This remains for backward compatibility.
 *
 * @example
 * ```html
 * <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 * ```
 */
export const themeScript = getThemeScript();
