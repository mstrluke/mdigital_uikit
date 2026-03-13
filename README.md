<div align="center">

# @mdigital_ui/ui

**A modern React component library built for speed.**

76 components · Tailwind CSS v4 · Slot-based theming · Tree-shakeable

[![CI](https://github.com/mstrluke/mdigital_uikit/actions/workflows/ci.yml/badge.svg)](https://github.com/mstrluke/mdigital_uikit/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@mdigital_ui/ui?color=blue)](https://www.npmjs.com/package/@mdigital_ui/ui)
[![downloads](https://img.shields.io/npm/dm/@mdigital_ui/ui?color=green)](https://www.npmjs.com/package/@mdigital_ui/ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@mdigital_ui/ui)](https://bundlephobia.com/package/@mdigital_ui/ui)
[![license](https://img.shields.io/github/license/mstrluke/mdigital_uikit)](https://github.com/mstrluke/mdigital_uikit/blob/main/LICENSE)

[Changelog](https://github.com/mstrluke/mdigital_uikit/releases) · [Report Bug](https://github.com/mstrluke/mdigital_uikit/issues/new?template=bug_report.md) · [Request Feature](https://github.com/mstrluke/mdigital_uikit/issues/new?template=feature_request.md)

</div>

---

## Why This Library?

| | @mdigital_ui/ui | shadcn/ui | Ant Design | Chakra UI |
|---|---|---|---|---|
| **Theming** | Slot-based color system — 1 prop themes everything | Copy-paste, manual | Token config object | colorScheme prop |
| **Tailwind** | v4 native (`@theme`, `@source`) | v3 with config | No Tailwind | No Tailwind |
| **Bundle** | Tree-shake per component | Copy into project | 300KB+ full bundle | 200KB+ full bundle |
| **Dark mode** | Zero-config CSS variables | Manual `dark:` classes | ConfigProvider | ColorModeProvider |
| **Components** | 76 production-ready | ~50 primitives | 60+ | 60+ |
| **Tests** | 1,556 tests | Community | Extensive | Moderate |

### The Slot Color System

One `color` prop. Every part of the component responds — backgrounds, borders, text, hover states, focus rings. No manual mapping. No 49 color variants hardcoded per component.

```tsx
<Button color="primary">Submit</Button>
<Button color="error">Delete</Button>
<Alert color="warning">Watch out</Alert>
<Badge color="success">Active</Badge>
```

Under the hood, `color="primary"` sets a single CSS variable `--_c`. Every slot utility (`bg-slot`, `text-slot`, `border-slot-30`, `bg-slot-10`) derives from it automatically. Add a new color to your theme → every component supports it instantly.

### Tailwind CSS v4 Native

Not "works with Tailwind" — **built on v4's architecture**:

- `@theme` block defines all tokens as CSS custom properties
- `@source` auto-scans compiled components — no manual safelist
- `@custom-variant dark` — dark mode via `.dark` class on `<html>`
- `@utility` defines the slot color system as real Tailwind utilities
- When Tailwind ships new features, you get them. No wrapper layer in the way.

### Per-Component Imports

Every component is its own entry point. Import what you use, ship only what you use:

```tsx
import Button from '@mdigital_ui/ui/button'     // just Button
import Table from '@mdigital_ui/ui/table'        // just Table
import { useTheme } from '@mdigital_ui/ui/theme' // just the hook
```

---

## Quick Start

```bash
npm install @mdigital_ui/ui
```

> **Peer deps:** `react` ≥18, `react-dom` ≥18, `lucide-react` ≥0.400, `tailwindcss` ≥4.0

### CSS Setup

Your project needs Tailwind CSS v4 with `@tailwindcss/vite` or `@tailwindcss/postcss`.

```css
@import "tailwindcss";
@import "@mdigital_ui/ui/styles/global.css";
```

That's it. One import. Tokens, dark mode, utilities, component styles — all included.

### Use It

```tsx
import Button from '@mdigital_ui/ui/button'
import Input from '@mdigital_ui/ui/input'
import Select from '@mdigital_ui/ui/select'

function App() {
  return (
    <div className="flex gap-3">
      <Input placeholder="Search..." />
      <Select options={[{ label: 'React', value: 'react' }]} />
      <Button color="primary">Go</Button>
    </div>
  )
}
```

---

## Dark Mode

```tsx
import { ThemeProvider, useTheme } from '@mdigital_ui/ui/theme'

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Toggle anywhere:
const { setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'
```

SSR flash prevention — add to `<head>`:

```tsx
import { getThemeScript } from '@mdigital_ui/ui/theme'

<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
```

All components use CSS custom properties. Dark mode swaps values at `:root`. Zero `dark:` prefixes in component code.

## Theme Presets

```css
@import "@mdigital_ui/ui/styles/global.css";
@import "@mdigital_ui/ui/styles/themes/presets/corporate.css";
```

```html
<html data-theme="corporate" class="dark">
```

Available: `corporate`, `vibrant`, `minimal`. Mix with dark/light freely.

## Custom Tokens

Override after our import — no `!important` needed:

```css
@import "tailwindcss";
@import "@mdigital_ui/ui/styles/global.css";

/* Your overrides — just plain :root, wins by source order */
:root {
  --color-primary: oklch(0.55 0.22 270);
  --color-primary-hover: oklch(0.50 0.24 270);
  --color-primary-foreground: oklch(1 0 0);
  --color-background: oklch(0.98 0 0);
  --font-sans: 'Inter', system-ui, sans-serif;
  --button-height-md: 2.5rem;
}

/* Optional: different dark mode values */
.dark {
  --color-primary: oklch(0.65 0.22 270);
  --color-background: oklch(0.12 0.01 270);
}
```

Every token is a CSS variable. Change one, it propagates everywhere. Dark mode selectors use `:where()` to keep specificity flat — your overrides always win by source order.

---

## Common API

### `color`

```
'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'
```

### `size`

```
'xs' | 'sm' | 'md' | 'lg'
```

### `variant`

Per-component:
- **Button:** `solid` `outline` `soft` `dashed` `link` `ghost`
- **Card:** `default` `solid` `outline` `soft` `ghost` `elevated`
- **Checkbox / Toggle:** `solid` `outline` `soft`
- **Input:** `outline` `filled`
- **Badge / Tag:** `default` `solid` `outline` `soft`

### Validation

```tsx
<Input error="Required field" />
<Input warning="Weak password" />
<Input success />
```

### Styling Escape Hatches

```tsx
// Root element
<Button className="shadow-lg">Submit</Button>

// Internal parts
<Input classNames={{ root: 'mb-4', label: 'font-bold', input: 'tracking-wide' }} />

// CSS selectors — every part has a semantic class + data-slot
.input_label { font-weight: 700; }
[data-slot="trigger"] { min-width: 200px; }
```

---

## All 76 Components

<details>
<summary><b>Data Entry (27)</b></summary>

| Component | Import |
|-----------|--------|
| Input | `@mdigital_ui/ui/input` |
| FloatInput | `@mdigital_ui/ui/float-input` |
| InputPassword | `@mdigital_ui/ui/input-password` |
| InputOTP | `@mdigital_ui/ui/input-otp` |
| InputGroup | `@mdigital_ui/ui/input-group` |
| NumberInput | `@mdigital_ui/ui/number-input` |
| Textarea | `@mdigital_ui/ui/textarea` |
| Select | `@mdigital_ui/ui/select` |
| MultiSelect | `@mdigital_ui/ui/multi-select` |
| Cascader | `@mdigital_ui/ui/cascader` |
| TreeSelect | `@mdigital_ui/ui/tree-select` |
| DatePicker | `@mdigital_ui/ui/date-picker` |
| ColorPicker | `@mdigital_ui/ui/color-picker` |
| Autocomplete | `@mdigital_ui/ui/autocomplete` |
| Mentions | `@mdigital_ui/ui/mentions` |
| Checkbox | `@mdigital_ui/ui/checkbox` |
| CheckboxGroup | `@mdigital_ui/ui/checkbox-group` |
| Radio | `@mdigital_ui/ui/radio` |
| RadioGroup | `@mdigital_ui/ui/radio-group` |
| Switch | `@mdigital_ui/ui/switch` |
| Slider | `@mdigital_ui/ui/slider` |
| Rating | `@mdigital_ui/ui/rating` |
| Toggle | `@mdigital_ui/ui/toggle` |
| ToggleGroup | `@mdigital_ui/ui/toggle-group` |
| Upload | `@mdigital_ui/ui/upload` |
| Clipboard | `@mdigital_ui/ui/clipboard` |
| TagsInput | `@mdigital_ui/ui/tags-input` |

</details>

<details>
<summary><b>Layout (9)</b></summary>

| Component | Import |
|-----------|--------|
| Button | `@mdigital_ui/ui/button` |
| ButtonGroup | `@mdigital_ui/ui/button-group` |
| Card | `@mdigital_ui/ui/card` |
| Grid | `@mdigital_ui/ui/grid` |
| Divider | `@mdigital_ui/ui/divider` |
| Collapse | `@mdigital_ui/ui/collapse` |
| Accordion | `@mdigital_ui/ui/accordion` |
| ScrollArea | `@mdigital_ui/ui/scroll-area` |
| Resizable | `@mdigital_ui/ui/resizable` |

</details>

<details>
<summary><b>Navigation (12)</b></summary>

| Component | Import |
|-----------|--------|
| Tabs | `@mdigital_ui/ui/tabs` |
| Breadcrumbs | `@mdigital_ui/ui/breadcrumbs` |
| Pagination | `@mdigital_ui/ui/pagination` |
| Stepper | `@mdigital_ui/ui/stepper` |
| Dropdown | `@mdigital_ui/ui/dropdown` |
| ContextMenu | `@mdigital_ui/ui/context-menu` |
| Menubar | `@mdigital_ui/ui/menubar` |
| NavigationMenu | `@mdigital_ui/ui/navigation-menu` |
| Command | `@mdigital_ui/ui/command` |
| Anchor | `@mdigital_ui/ui/anchor` |
| Link | `@mdigital_ui/ui/link` |
| FloatButton | `@mdigital_ui/ui/float-button` |

</details>

<details>
<summary><b>Overlays (5)</b></summary>

| Component | Import |
|-----------|--------|
| Modal | `@mdigital_ui/ui/modal` |
| Drawer | `@mdigital_ui/ui/drawer` |
| Tooltip | `@mdigital_ui/ui/tooltip` |
| Popover | `@mdigital_ui/ui/popover` |
| Tour | `@mdigital_ui/ui/tour` |

</details>

<details>
<summary><b>Feedback (8)</b></summary>

| Component | Import |
|-----------|--------|
| Notification | `@mdigital_ui/ui/notification` |
| Alert | `@mdigital_ui/ui/alert` |
| Toast | `@mdigital_ui/ui/toast` |
| Progress | `@mdigital_ui/ui/progress` |
| Spinner | `@mdigital_ui/ui/spinner` |
| Skeleton | `@mdigital_ui/ui/skeleton` |
| Result | `@mdigital_ui/ui/result` |
| FetchingOverlay | `@mdigital_ui/ui/fetching-overlay` |

</details>

<details>
<summary><b>Data Display (9)</b></summary>

| Component | Import |
|-----------|--------|
| Table | `@mdigital_ui/ui/table` |
| Tree | `@mdigital_ui/ui/tree` |
| Calendar | `@mdigital_ui/ui/calendar` |
| Descriptions | `@mdigital_ui/ui/descriptions` |
| Timeline | `@mdigital_ui/ui/timeline` |
| Transfer | `@mdigital_ui/ui/transfer` |
| Carousel | `@mdigital_ui/ui/carousel` |
| Image | `@mdigital_ui/ui/image` |
| QRCode | `@mdigital_ui/ui/qr-code` |

</details>

<details>
<summary><b>General (6)</b></summary>

| Component | Import |
|-----------|--------|
| Badge | `@mdigital_ui/ui/badge` |
| Tag | `@mdigital_ui/ui/tag` |
| Avatar | `@mdigital_ui/ui/avatar` |
| Kbd | `@mdigital_ui/ui/kbd` |
| Typography | `@mdigital_ui/ui/typography` |
| Watermark | `@mdigital_ui/ui/watermark` |

</details>

<details>
<summary><b>Theme & Hooks</b></summary>

| Export | Import |
|--------|--------|
| ThemeProvider, useTheme, getThemeScript | `@mdigital_ui/ui/theme` |
| useControllable | `@mdigital_ui/ui/hooks/useControllable` |
| useDebounce | `@mdigital_ui/ui/hooks/useDebounce` |
| useThrottle | `@mdigital_ui/ui/hooks/useThrottle` |
| useMediaQuery | `@mdigital_ui/ui/hooks/useMediaQuery` |
| useRipple | `@mdigital_ui/ui/hooks/useRipple` |

</details>

---

## CSS Variables Reference

<details>
<summary><b>Colors</b></summary>

```
--color-primary / -hover / -active / -foreground
--color-secondary / -hover / -active / -foreground
--color-accent / -hover / -active / -foreground
--color-success / -hover / -active / -foreground
--color-error / -hover / -active / -foreground
--color-warning / -hover / -active / -foreground
--color-info / -hover / -active / -foreground

--color-background / -secondary
--color-surface
--color-card / -foreground
--color-border / -primary / -hover / -focus

--color-text-primary / -secondary / -muted / -disabled

--color-input-bg / -text / -placeholder / -border / -border-focus / -border-error
--color-focus / -ring
--color-disabled / -text
--color-overlay
```

</details>

<details>
<summary><b>Sizing</b></summary>

```
--button-height-xs/sm/md/lg      --button-padding-x-xs/sm/md/lg
--input-height-xs/sm/md/lg       --input-padding-x-xs/sm/md/lg
--select-height-xs/sm/md/lg      --select-padding-x-xs/sm/md/lg
--toggle-height-xs/sm/md/lg      --toggle-padding-x-xs/sm/md/lg
--textarea-min-height-xs/sm/md/lg
--checkbox-size-xs/sm/md/lg
--switch-width-xs/sm/md/lg       --switch-height-xs/sm/md/lg
--otp-size-xs/sm/md/lg
--accordion-padding-x-xs/sm/md/lg
```

</details>

<details>
<summary><b>Effects & Z-Index</b></summary>

```
--shadow-sm / -md / -lg / -xl / -2xl

--z-dropdown  (1000)    --z-sticky   (1020)
--z-modal     (1040)    --z-popover  (1050)
--z-tooltip   (1060)    --z-overlay  (1070)
```

</details>

---

## TypeScript

Full type coverage. Every prop, variant, and callback is typed:

```tsx
import type { ButtonProps, SelectOption, TableColumn } from '@mdigital_ui/ui'
```

## Browser Support

Chrome, Firefox, Safari, Edge — last 2 versions.

## License

[MIT](./LICENSE)
