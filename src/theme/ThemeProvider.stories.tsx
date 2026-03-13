import type { Meta, StoryObj } from '@storybook/react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { ThemeProvider, useTheme } from './index';
import Button from '../button';
import Card from '../card';
import Badge from '../badge';
import Toggle from '../toggle';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Design System/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Manages light/dark/system theme with localStorage persistence. Wrap your app root and use the `useTheme` hook to read or change the current theme.',
      },
    },
  },
  argTypes: {
    defaultTheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Initial theme when no preference is stored',
    },
    disableTransitionOnChange: {
      control: 'boolean',
      description: 'Disable CSS transitions during theme switch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      {([
        { value: 'light' as const, icon: Sun, label: 'Light' },
        { value: 'dark' as const, icon: Moon, label: 'Dark' },
        { value: 'system' as const, icon: Monitor, label: 'System' },
      ]).map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          size="sm"
          variant={theme === value ? 'solid' : 'ghost'}
          onClick={() => setTheme(value)}
          iconLeft={<Icon className="h-4 w-4" />}
        >
          {label}
        </Button>
      ))}
      <Badge variant="soft" color="primary" className="ml-2">
        {resolvedTheme}
      </Badge>
    </div>
  );
};

const ThemeDemo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-1">
          Theme Provider
        </h2>
        <p className="text-text-secondary">
          Toggle between light, dark, and system themes. Preference persists to localStorage.
        </p>
      </div>

      <ThemeSwitcher />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {([
          { label: 'Background', class: 'bg-background', border: true },
          { label: 'Surface', class: 'bg-surface', border: true },
          { label: 'Primary', class: 'bg-primary text-primary-foreground', border: false },
          { label: 'Success', class: 'bg-success text-success-foreground', border: false },
          { label: 'Error', class: 'bg-error text-error-foreground', border: false },
          { label: 'Warning', class: 'bg-warning text-warning-foreground', border: false },
        ]).map(({ label, class: cls, border }) => (
          <div
            key={label}
            className={`rounded-lg p-4 text-center text-sm font-medium ${cls} ${border ? 'border border-border' : ''}`}
          >
            {label}
          </div>
        ))}
      </div>

      <Card>
        <div className="p-5 space-y-3">
          <h3 className="text-base font-semibold text-text-primary">
            Components adapt automatically
          </h3>
          <p className="text-sm text-text-secondary">
            All components read theme tokens via CSS custom properties — no prop changes needed.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="solid" color="primary">Primary</Button>
            <Button variant="outline" color="secondary">Secondary</Button>
            <Button variant="ghost" color="accent">Accent</Button>
            <Toggle defaultPressed>Dark mode</Toggle>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-5 space-y-3">
          <h3 className="text-base font-semibold text-text-primary">
            useTheme Hook API
          </h3>
          <pre className="bg-surface border border-border rounded-lg p-4 text-xs overflow-x-auto">
            {`const { theme, setTheme, resolvedTheme } = useTheme()

// theme: 'light' | 'dark' | 'system'
// resolvedTheme: 'light' | 'dark' (actual computed theme)
// setTheme: (theme) => void`}
          </pre>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-text-secondary">theme: </span>
              <code className="text-primary font-mono">{`"${resolvedTheme}"`}</code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * Interactive theme switcher with live component preview.
 * Click the buttons to switch between Light, Dark, and System themes.
 */
export const Default: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system" storageKey="storybook-theme">
      <div className="bg-background p-6 rounded-xl min-h-[400px]">
        <ThemeDemo />
      </div>
    </ThemeProvider>
  ),
};

/**
 * Minimal setup example — just wrap your app and go.
 */
export const Setup: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">Quick Setup</h3>

      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          1. Wrap your app
        </h4>
        <pre className="bg-surface border border-border rounded-lg p-4 text-xs overflow-x-auto">
          {`import { ThemeProvider } from '@mdigital_ui/ui'

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}`}
        </pre>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          2. Add the theme script (prevents flash)
        </h4>
        <pre className="bg-surface border border-border rounded-lg p-4 text-xs overflow-x-auto">
          {`import { getThemeScript } from '@mdigital_ui/ui'

// In your HTML <head>:
<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />

// With a custom storage key:
<script dangerouslySetInnerHTML={{ __html: getThemeScript('my-app-theme') }} />`}
        </pre>
        <p className="text-xs text-text-secondary mt-2">
          <code>getThemeScript()</code> generates inline JS that reads the stored
          preference and sets the <code>class</code> attribute before React hydrates,
          preventing a flash of wrong theme.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          3. Use the hook anywhere
        </h4>
        <pre className="bg-surface border border-border rounded-lg p-4 text-xs overflow-x-auto">
          {`import { useTheme } from '@mdigital_ui/ui'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Currently: {resolvedTheme}
    </button>
  )
}`}
        </pre>
      </div>

      <div className="bg-info/10 border border-info/30 rounded-lg p-4">
        <p className="text-sm text-text-primary">
          <strong>Props:</strong>{' '}
          <code>defaultTheme</code> (light/dark/system), {' '}
          <code>storageKey</code> (localStorage key), {' '}
          <code>disableTransitionOnChange</code> (skip transition on switch)
        </p>
      </div>
    </div>
  ),
};

/**
 * Disable CSS transitions during theme changes for an instant swap.
 * Useful when transitions cause flickering or layout shift.
 */
export const DisableTransitions: Story = {
  render: () => {
    const Inner = () => {
      const { theme, setTheme, resolvedTheme } = useTheme();
      return (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Click the buttons below. Theme switches happen <strong>instantly</strong> with
            no CSS transition because <code>disableTransitionOnChange</code> is enabled.
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={theme === 'light' ? 'solid' : 'outline'}
              onClick={() => setTheme('light')}
              iconLeft={<Sun className="h-4 w-4" />}
            >
              Light
            </Button>
            <Button
              size="sm"
              variant={theme === 'dark' ? 'solid' : 'outline'}
              onClick={() => setTheme('dark')}
              iconLeft={<Moon className="h-4 w-4" />}
            >
              Dark
            </Button>
            <Badge variant="soft" color="primary">
              {resolvedTheme}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-surface border border-border text-sm">
              Surface color
            </div>
            <div className="p-4 rounded-lg bg-primary text-primary-foreground text-sm">
              Primary color
            </div>
          </div>
        </div>
      );
    };

    return (
      <ThemeProvider
        defaultTheme="light"
        storageKey="storybook-no-transition"
        disableTransitionOnChange
      >
        <div className="bg-background p-6 rounded-xl">
          <Inner />
        </div>
      </ThemeProvider>
    );
  },
};

/**
 * Custom storage key — useful when multiple apps share the same domain.
 * Each app reads/writes its own localStorage key.
 */
export const CustomStorageKey: Story = {
  render: () => {
    const Inner = () => {
      const { theme, setTheme, resolvedTheme } = useTheme();
      return (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            This provider stores the preference under <code>"my-app-theme"</code> in
            localStorage. Changing the theme here won't affect other providers
            using the default key.
          </p>
          <div className="flex items-center gap-2">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={theme === t ? 'solid' : 'ghost'}
                onClick={() => setTheme(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <pre className="bg-surface border border-border rounded-lg p-3 text-xs">
            {`localStorage key: "my-app-theme"\ncurrent value: "${theme}"\nresolved: "${resolvedTheme}"`}
          </pre>
        </div>
      );
    };

    return (
      <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
        <div className="bg-background p-6 rounded-xl">
          <Inner />
        </div>
      </ThemeProvider>
    );
  },
};
