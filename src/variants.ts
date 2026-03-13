import type { ComponentColor, ButtonColor } from "./types";

// Color Slot System
//
// How it works:
//   1. Component receives `color="primary"` prop
//   2. Component applies `colorVars.primary` → sets 4 CSS custom properties
//   3. Slot utilities (bg-slot, text-slot, border-slot) read those properties
//
// Customization — override design tokens in your CSS:
//
//   :root {
//     --color-primary: oklch(65% 0.2 280);
//     --color-primary-foreground: oklch(100% 0 0);
//   }

export const colorVars: Record<ComponentColor, string> = {
  default:
    "[--_c:var(--color-text-primary)] [--_c-bg:var(--color-surface)] [--_c-fg:var(--color-text-primary)] [--_c-border:var(--color-border)]",
  primary:
    "[--_c:var(--color-primary)] [--_c-bg:var(--color-primary)] [--_c-fg:var(--color-primary-foreground)] [--_c-border:var(--color-primary)]",
  secondary:
    "[--_c:var(--color-secondary)] [--_c-bg:var(--color-secondary)] [--_c-fg:var(--color-secondary-foreground)] [--_c-border:var(--color-secondary)]",
  accent:
    "[--_c:var(--color-accent)] [--_c-bg:var(--color-accent)] [--_c-fg:var(--color-accent-foreground)] [--_c-border:var(--color-accent)]",
  success:
    "[--_c:var(--color-success)] [--_c-bg:var(--color-success)] [--_c-fg:var(--color-success-foreground)] [--_c-border:var(--color-success)]",
  error:
    "[--_c:var(--color-error)] [--_c-bg:var(--color-error)] [--_c-fg:var(--color-error-foreground)] [--_c-border:var(--color-error)]",
  warning:
    "[--_c:var(--color-warning)] [--_c-bg:var(--color-warning)] [--_c-fg:var(--color-warning-foreground)] [--_c-border:var(--color-warning)]",
  info: "[--_c:var(--color-info)] [--_c-bg:var(--color-info)] [--_c-fg:var(--color-info-foreground)] [--_c-border:var(--color-info)]",
} as const;

export const buttonColorVars: Record<ButtonColor, string> = {
  primary: colorVars.primary,
  secondary: colorVars.secondary,
  accent: colorVars.accent,
  success: colorVars.success,
  error: colorVars.error,
  warning: colorVars.warning,
  info: colorVars.info,
} as const;
