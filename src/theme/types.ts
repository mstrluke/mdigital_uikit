/**
 * Theme Types
 * TypeScript types for theme management
 */

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeProviderProps {
  /**
   * @default 'system'
   */
  defaultTheme?: Theme;

  /**
   * The localStorage key to use for persisting theme preference
   * @default 'ui-theme'
   */
  storageKey?: string;

  children: React.ReactNode;

  /**
   * @default false
   */
  disableTransitionOnChange?: boolean;

  /**
   * @default false
   */
  enableStrictMode?: boolean;
}

export interface ThemeProviderState {
  theme: Theme;

  /**
   * The resolved theme ('light' or 'dark')
   * When theme is 'system', this will be the actual OS preference
   */
  resolvedTheme: 'light' | 'dark';

  setTheme: (theme: Theme) => void;
}
