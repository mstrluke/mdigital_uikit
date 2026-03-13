# @mdigital_ui/ui

React component library. 76 components. Tailwind CSS v4, CVA, Radix UI.

## Install

```bash
npm install @mdigital_ui/ui
```

Peer deps: `react`, `react-dom`, `lucide-react`, `tailwindcss` (v4+)

## Setup

Your project needs Tailwind CSS v4 with either `@tailwindcss/vite` or `@tailwindcss/postcss`.

In your CSS entry point:

```css
@import "tailwindcss";
@import "@mdigital_ui/ui/styles/global.css";
```

That's it. Our CSS provides:
- `@theme` — all design tokens as CSS variables (override in `:root`)
- `@source "../dist"` — Tailwind auto-scans our compiled components for class names
- `@custom-variant dark` — dark mode via `.dark` class
- `@utility` — slot-based color system, stroke utilities
- Component-specific styles (datepicker, animations)

Your Tailwind build processes everything. When Tailwind ships new utilities or features, you get them immediately.

## Usage

```tsx
import Button from '@mdigital_ui/ui/button'
import Input from '@mdigital_ui/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@mdigital_ui/ui/card'
```

Barrel import also works:

```tsx
import { Button, Input, Card } from '@mdigital_ui/ui'
```

## Dark Mode

Toggle `.dark` class on `<html>`:

```tsx
import { ThemeProvider, useTheme } from '@mdigital_ui/ui/theme'

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// anywhere:
const { theme, setTheme, resolvedTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'
```

SSR flash prevention — add to `<head>`:

```tsx
import { themeScript } from '@mdigital_ui/ui/theme'

<script dangerouslySetInnerHTML={{ __html: themeScript }} />
```

All components use CSS custom properties. Dark mode swaps values at `:root` level. No `dark:` prefixes needed.

## Theme Presets

```tsx
import '@mdigital_ui/ui/styles/global.css'
import '@mdigital_ui/ui/styles/themes/presets/corporate.css'
```

```html
<html data-theme="corporate" class="dark">
```

Presets: `corporate`, `vibrant`, `minimal`. Independent of dark/light — combine freely.

## Custom Tokens

All tokens live in one `@theme` block. Override after our import:

```css
:root {
  --color-primary: oklch(0.55 0.22 270);
  --color-primary-hover: oklch(0.50 0.24 270);
  --color-primary-foreground: oklch(1 0 0);

  --color-background: oklch(0.98 0 0);
  --color-surface: oklch(0.95 0 0);
  --color-border: oklch(0.90 0 0);
  --color-text-primary: oklch(0.15 0 0);
  --color-text-secondary: oklch(0.45 0 0);

  --button-height-md: 2.5rem;
  --input-height-md: 2.5rem;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

Full token list in [CSS Variables](#css-variables).

## Common Props

### color

```
'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'
```

### size

```
'xs' | 'sm' | 'md' | 'lg'
```

### variant

Per-component. Examples:
- Button: `solid`, `outline`, `soft`, `dashed`, `link`, `ghost`
- Card: `default`, `solid`, `outline`, `soft`, `ghost`, `elevated`
- Input: `outline`, `filled`
- Badge/Tag: `default`, `solid`, `outline`, `soft`

### Validation

Form components accept validation as string (message) or boolean:

```tsx
<Input error="Required field" />
<Input warning="Weak password" />
<Input success />
```

## Styling

### className

Root element:

```tsx
<Button className="shadow-lg mt-4">Submit</Button>
```

### classNames

Target internal parts:

```tsx
<Input
  classNames={{
    root: 'mb-4',
    label: 'font-bold',
    input: 'tracking-wide',
    helper: 'italic',
  }}
/>
```

### CSS selectors

Every part gets a semantic class and `data-slot`:

```css
.button_root { border-radius: 12px; }
.input_label { font-weight: 700; }
[data-slot="trigger"] { min-width: 200px; }
```

## Components

### Inputs

| Component | Path |
|-----------|------|
| Input | `input` |
| FloatInput | `float-input` |
| InputPassword | `input-password` |
| InputOTP | `input-otp` |
| InputGroup | `input-group` |
| NumberInput | `number-input` |
| Textarea | `textarea` |
| Select | `select` |
| MultiSelect | `multi-select` |
| Cascader | `cascader` |
| TreeSelect | `tree-select` |
| DatePicker | `date-picker` |
| ColorPicker | `color-picker` |
| Autocomplete | `autocomplete` |
| Mentions | `mentions` |
| Checkbox | `checkbox` |
| CheckboxGroup | `checkbox-group` |
| Radio | `radio` |
| RadioGroup | `radio-group` |
| Switch | `switch` |
| Slider | `slider` |
| Rating | `rating` |
| Toggle | `toggle` |
| ToggleGroup | `toggle-group` |
| Upload | `upload` |
| Clipboard | `clipboard` |
| TagsInput | `tags-input` |

### Layout

| Component | Path |
|-----------|------|
| Button | `button` |
| ButtonGroup | `button-group` |
| Card | `card` |
| Grid | `grid` |
| Divider | `divider` |
| Collapse | `collapse` |
| Accordion | `accordion` |
| ScrollArea | `scroll-area` |
| Resizable | `resizable` |

### Navigation

| Component | Path |
|-----------|------|
| Tabs | `tabs` |
| Breadcrumbs | `breadcrumbs` |
| Pagination | `pagination` |
| Stepper | `stepper` |
| Dropdown | `dropdown` |
| ContextMenu | `context-menu` |
| Menubar | `menubar` |
| NavigationMenu | `navigation-menu` |
| Command | `command` |
| Anchor | `anchor` |
| Link | `link` |
| FloatButton | `float-button` |

### Overlays

| Component | Path |
|-----------|------|
| Modal | `modal` |
| Drawer | `drawer` |
| Tooltip | `tooltip` |
| Popover | `popover` |
| Tour | `tour` |

### Feedback

| Component | Path |
|-----------|------|
| Notification | `notification` |
| Alert | `alert` |
| Toast | `toast` |
| Progress | `progress` |
| Spinner | `spinner` |
| Skeleton | `skeleton` |
| Result | `result` |
| FetchingOverlay | `fetching-overlay` |

### Data

| Component | Path |
|-----------|------|
| Table | `table` |
| Tree | `tree` |
| Calendar | `calendar` |
| Descriptions | `descriptions` |
| Timeline | `timeline` |
| Transfer | `transfer` |
| Carousel | `carousel` |
| Image | `image` |
| QRCode | `qr-code` |

### Display

| Component | Path |
|-----------|------|
| Badge | `badge` |
| Tag | `tag` |
| Avatar | `avatar` |
| Kbd | `kbd` |
| Typography | `typography` |
| Watermark | `watermark` |

### Theme

| Export | Path |
|--------|------|
| ThemeProvider, useTheme, themeScript | `theme` |

### Hooks

| Hook | Path |
|------|------|
| useControllable | `hooks/useControllable` |
| useDebounce | `hooks/useDebounce` |
| useThrottle | `hooks/useThrottle` |
| useMediaQuery | `hooks/useMediaQuery` |
| useRipple | `hooks/useRipple` |

## CSS Variables

<details>
<summary>Colors</summary>

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

--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-disabled

--color-input-bg / -text / -placeholder / -border / -border-focus / -border-error
--color-focus / -ring
--color-disabled / -text
--color-overlay
```

</details>

<details>
<summary>Sizing</summary>

```
--size-xs / -sm / -md / -lg          (shared base heights)

--button-height-xs/sm/md/lg
--button-padding-x-xs/sm/md/lg

--input-height-xs/sm/md/lg
--input-padding-x-xs/sm/md/lg

--select-height-xs/sm/md/lg
--select-padding-x-xs/sm/md/lg

--toggle-height-xs/sm/md/lg
--toggle-padding-x-xs/sm/md/lg

--textarea-min-height-xs/sm/md/lg
--textarea-padding-xs/sm/md/lg

--checkbox-size-xs/sm/md/lg
--switch-width-xs/sm/md/lg
--switch-height-xs/sm/md/lg
--otp-size-xs/sm/md/lg

--accordion-padding-x-xs/sm/md/lg
--accordion-padding-y-xs/sm/md/lg
```

</details>

<details>
<summary>Effects & Layout</summary>

```
--shadow-sm / -md / -lg / -xl / -2xl
--overlay-stripe

--z-dropdown    (1000)
--z-sticky      (1020)
--z-modal       (1040)
--z-popover     (1050)
--z-tooltip     (1060)
--z-overlay     (1070)
```

</details>

## TypeScript

All props and types exported:

```tsx
import type { ButtonProps, InputProps, SelectProps } from '@mdigital_ui/ui'
import type { TableProps, ModalClassNames, CardVariant } from '@mdigital_ui/ui'
```

## Browser Support

Chrome, Firefox, Safari, Edge — last 2 versions.

## License

MIT
