import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "Visual reference for all design tokens. Override any token via CSS custom properties in your app.",
      },
    },
    layout: "padded",
  },
};

export default meta;

const ColorSwatch = ({
  name,
  bg,
  token,
  text,
}: {
  name: string;
  bg: string;
  token: string;
  text?: boolean;
}) => (
  <div className="flex items-center gap-3 py-1.5">
    <div
      className={`w-10 h-10 rounded-lg border border-border shrink-0 ${bg}`}
    />
    <div className="min-w-0">
      <p className="text-sm font-medium text-text-primary">{name}</p>
      <code className="text-xs text-text-secondary">{token}</code>
    </div>
  </div>
);

/**
 * All semantic colors used across the library — brand, status, surfaces, text, and borders.
 */
export const Colors: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Brand
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
          <ColorSwatch name="Primary" bg="bg-primary" token="--color-primary" />
          <ColorSwatch
            name="Primary Hover"
            bg="bg-primary-hover"
            token="--color-primary-hover"
          />
          <ColorSwatch
            name="Primary Active"
            bg="bg-primary-active"
            token="--color-primary-active"
          />
          <ColorSwatch
            name="Secondary"
            bg="bg-secondary"
            token="--color-secondary"
          />
          <ColorSwatch
            name="Secondary Hover"
            bg="bg-secondary-hover"
            token="--color-secondary-hover"
          />
          <ColorSwatch
            name="Secondary Active"
            bg="bg-secondary-active"
            token="--color-secondary-active"
          />
          <ColorSwatch name="Accent" bg="bg-accent" token="--color-accent" />
          <ColorSwatch
            name="Accent Hover"
            bg="bg-accent-hover"
            token="--color-accent-hover"
          />
          <ColorSwatch
            name="Accent Active"
            bg="bg-accent-active"
            token="--color-accent-active"
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Status
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-1">
          <ColorSwatch name="Success" bg="bg-success" token="--color-success" />
          <ColorSwatch name="Error" bg="bg-error" token="--color-error" />
          <ColorSwatch name="Warning" bg="bg-warning" token="--color-warning" />
          <ColorSwatch name="Info" bg="bg-info" token="--color-info" />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Surfaces & Borders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
          <ColorSwatch
            name="Background"
            bg="bg-background"
            token="--color-background"
          />
          <ColorSwatch
            name="Background Secondary"
            bg="bg-background-secondary"
            token="--color-background-secondary"
          />
          <ColorSwatch name="Surface" bg="bg-surface" token="--color-surface" />
          <ColorSwatch name="Border" bg="bg-border" token="--color-border" />
          <ColorSwatch
            name="Border Primary"
            bg="bg-border-primary"
            token="--color-border-primary"
          />
          <ColorSwatch name="Overlay" bg="bg-overlay" token="--color-overlay" />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Text
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-text-primary">
              Primary Text
            </span>
            <code className="text-xs text-text-secondary">
              --color-text-primary
            </code>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-text-secondary">
              Secondary Text
            </span>
            <code className="text-xs text-text-secondary">
              --color-text-secondary
            </code>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-text-muted">
              Muted Text
            </span>
            <code className="text-xs text-text-secondary">
              --color-text-muted
            </code>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-text-disabled">
              Disabled Text
            </span>
            <code className="text-xs text-text-secondary">
              --color-text-disabled
            </code>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Gray Scale
        </h3>
        <div className="flex gap-1">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            (shade) => (
              <div key={shade} className="text-center flex-1">
                <div
                  className="h-10 rounded border border-border/50"
                  style={{ backgroundColor: `var(--color-gray-${shade})` }}
                />
                <code className="text-[10px] text-text-secondary">{shade}</code>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  ),
};

/**
 * Font sizes, weights, and line heights available via Tailwind utility classes.
 */
export const Typography: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Type Scale
        </h3>
        <div className="space-y-3">
          {(
            [
              ["text-xs", "12px"],
              ["text-sm", "14px"],
              ["text-base", "16px"],
              ["text-lg", "18px"],
              ["text-xl", "20px"],
              ["text-2xl", "24px"],
              ["text-3xl", "30px"],
              ["text-4xl", "36px"],
            ] as const
          ).map(([cls, px]) => (
            <div key={cls} className="flex items-baseline gap-4">
              <code className="w-20 text-xs text-text-secondary shrink-0">
                {cls}
              </code>
              <span className={`${cls} text-text-primary`}>
                The quick brown fox
              </span>
              <span className="text-xs text-text-muted shrink-0">{px}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Font Weights
        </h3>
        <div className="space-y-2">
          {(
            [
              ["font-normal", "400"],
              ["font-medium", "500"],
              ["font-semibold", "600"],
              ["font-bold", "700"],
              ["font-extrabold", "800"],
            ] as const
          ).map(([cls, val]) => (
            <div key={cls} className="flex items-center gap-4">
              <code className="w-28 text-xs text-text-secondary shrink-0">
                {cls}
              </code>
              <span className={`text-base text-text-primary ${cls}`}>
                Sample Text
              </span>
              <span className="text-xs text-text-muted">{val}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

/**
 * Spacing scale and component height tokens. Override `--size-*` to change all component heights at once.
 */
export const SpacingAndSizing: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Component Heights (shared)
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Button, Input, Select, Toggle all share these height tokens.
        </p>
        <div className="space-y-3">
          {(
            [
              ["xs", "--size-xs", "28px"],
              ["sm", "--size-sm", "32px"],
              ["md", "--size-md", "36px"],
              ["lg", "--size-lg", "44px"],
            ] as const
          ).map(([size, token, px]) => (
            <div key={size} className="flex items-center gap-4">
              <code className="w-16 text-xs text-text-secondary shrink-0">
                {size}
              </code>
              <div
                className="bg-primary rounded-md flex items-center justify-center text-xs text-primary-foreground font-medium"
                style={{
                  height: `var(${token})`,
                  width: `calc(var(${token}) * 3)`,
                }}
              >
                {px}
              </div>
              <code className="text-xs text-text-muted">{token}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Spacing Scale (4px base)
        </h3>
        <div className="space-y-2">
          {(
            [
              [1, 4],
              [2, 8],
              [3, 12],
              [4, 16],
              [5, 20],
              [6, 24],
              [8, 32],
              [10, 40],
              [12, 48],
            ] as const
          ).map(([n, px]) => (
            <div key={n} className="flex items-center gap-4">
              <code className="w-8 text-xs text-text-secondary text-right shrink-0">
                {n}
              </code>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary/20 border border-primary rounded-sm shrink-0" />
                <div className="h-1 bg-primary" style={{ width: `${px}px` }} />
                <div className="w-6 h-6 bg-primary/20 border border-primary rounded-sm shrink-0" />
              </div>
              <span className="text-xs text-text-muted">{px}px</span>
              <code className="text-xs text-text-muted">--spacing-{n}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Border Radius
        </h3>
        <div className="flex gap-8 flex-wrap">
          {(
            ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const
          ).map((r) => (
            <div key={r} className="text-center">
              <div
                className="w-24 h-24 bg-primary/15 border-2 border-primary"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <code className="text-xs text-text-secondary mt-1.5 block">
                {r}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

/**
 * Shadow elevation scale for depth and hierarchy.
 */
export const Shadows: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
        Elevation
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '48px',
          padding: '40px',
          borderRadius: '12px',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div
              style={{
                height: '120px',
                backgroundColor: 'var(--color-background)',
                borderRadius: '8px',
                border: '1px solid color-mix(in oklch, var(--color-border) 30%, transparent)',
                boxShadow: `var(--shadow-${s})`,
              }}
            />
            <code className="text-xs text-text-secondary" style={{ marginTop: '12px', display: 'block' }}>
              shadow-{s}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * How to override tokens in your app — CSS custom properties, Tailwind, or TypeScript import.
 */
export const HowToOverride: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-lg font-semibold text-text-primary">
        Overriding Tokens
      </h3>
      <p className="text-sm text-text-secondary">
        All tokens are CSS custom properties that cascade naturally. Override at
        any scope.
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-2">
            1. Global CSS Override
          </h4>
          <pre className="bg-surface p-4 rounded-lg text-xs overflow-x-auto border border-border">
            {`:root {
  --color-primary: oklch(55% 0.20 280);  /* Purple */
  --size-md: 2.5rem;                     /* Taller buttons/inputs */
  --card-padding: 2rem;                  /* Larger card padding */
}`}
          </pre>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-2">
            2. Tailwind v4 Arbitrary Properties
          </h4>
          <pre className="bg-surface p-4 rounded-lg text-xs overflow-x-auto border border-border">
            {`<div className="p-(--card-padding) gap-(--card-header-gap)">
  Card content
</div>`}
          </pre>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-2">
            3. Scoped Inline Override
          </h4>
          <pre className="bg-surface p-4 rounded-lg text-xs overflow-x-auto border border-border">
            {`<Card style={{ '--card-padding': '2rem', '--card-title-size': '2rem' }}>
  Custom card with larger padding and title
</Card>`}
          </pre>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-2">
            4. TypeScript Token Import
          </h4>
          <pre className="bg-surface p-4 rounded-lg text-xs overflow-x-auto border border-border">
            {`import { tokens } from '@mdigital_ui/ui/styles/tokens'

// tokens.colors.primary → 'var(--color-primary)'
// tokens.components.card.padding → 'var(--card-padding)'

<div style={{ padding: tokens.components.card.padding }}>
  Card with TypeScript autocomplete
</div>`}
          </pre>
        </div>
      </div>

      <div className="bg-info/10 border border-info/30 rounded-lg p-4">
        <p className="text-sm text-text-primary">
          <strong>Three-layer architecture:</strong> Primitive tokens (raw
          values) → Semantic tokens (surface, border, text) → Component tokens
          (card-padding, button-height). Override at any layer — changes cascade
          down.
        </p>
      </div>
    </div>
  ),
};
