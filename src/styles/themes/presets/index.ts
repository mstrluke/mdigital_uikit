/**
 * Theme Presets
 *
 * Pre-configured color schemes for the UIKit
 * Each preset includes light and dark mode variants
 *
 * Usage:
 * ```tsx
 * <div data-theme="corporate">
 *   // Your components will use the corporate color scheme
 * </div>
 * ```
 *
 * Available presets:
 * - corporate: Professional blue/gray palette for business applications
 * - vibrant: Bold, saturated colors with purple/pink/teal
 * - minimal: Muted, low-contrast palette with subtle accents
 */

export const themePresets = ['corporate', 'vibrant', 'minimal'] as const

export type ThemePreset = typeof themePresets[number]
