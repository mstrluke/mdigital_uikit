# FloatInput Component

A Material Design style input component with a floating label that animates when the input is focused or has a value.

## Features

- **Floating Label Animation**: Label sits inside the input and moves up when focused or has value
- **Size Variants**: xs, sm, md, lg sizes with appropriate label scaling
- **Validation States**: error, warning, info, success with colored borders and messages
- **Icon Support**: Left and right icon slots
- **Clearable**: Optional clear button
- **Loading State**: Shows spinner in right icon slot
- **Full Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **TypeScript**: Full type safety with comprehensive prop types

## Installation

```bash
npm install @mdigital_ui/ui
```

## Basic Usage

```tsx
import { FloatInput } from '@mdigital_ui/ui'

function MyForm() {
  return <FloatInput label="Email" />
}
```

## Examples

### With Value

```tsx
<FloatInput label="SKU" defaultValue="12345342312" />
```

The label automatically stays at the top when there's a value.

### Different Sizes

```tsx
<FloatInput size="xs" label="Extra Small" />
<FloatInput size="sm" label="Small" />
<FloatInput size="md" label="Medium" />
<FloatInput size="lg" label="Large" />
```

### With Icons

```tsx
import { Mail, Lock, Search } from 'lucide-react'

<FloatInput label="Email" leftIcon={<Mail size={16} />} />
<FloatInput label="Password" leftIcon={<Lock size={16} />} type="password" />
<FloatInput label="Search" leftIcon={<Search size={16} />} />
```

### Validation States

```tsx
<FloatInput
  label="Email"
  error="This field is required"
/>

<FloatInput
  label="Email"
  success="Email is valid!"
  defaultValue="user@example.com"
/>

<FloatInput
  label="Warning"
  warning="This value might be incorrect"
/>

<FloatInput
  label="Info"
  info="Please use lowercase letters only"
/>
```

### Clearable

```tsx
<FloatInput
  label="Search"
  clearable
  onClear={() => console.log('cleared')}
  defaultValue="Search term"
/>
```

### Loading State

```tsx
<FloatInput
  label="Loading"
  loading
/>
```

### Required Field

```tsx
<FloatInput
  label="Email"
  required
  type="email"
/>
```

### Disabled and Read-Only

```tsx
<FloatInput
  label="Disabled"
  disabled
  defaultValue="Cannot edit"
/>

<FloatInput
  label="Read Only"
  readOnly
  defaultValue="Cannot edit"
/>
```

### Controlled Component

```tsx
import { useState } from 'react'

function MyForm() {
  const [value, setValue] = useState('')

  return (
    <FloatInput
      label="Email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

### Complex Form Example

```tsx
import { Mail, Lock, User } from 'lucide-react'

function SignUpForm() {
  return (
    <div className="flex flex-col gap-6">
      <FloatInput
        label="Full Name"
        leftIcon={<User size={16} />}
        required
        clearable
      />

      <FloatInput
        label="Email Address"
        type="email"
        leftIcon={<Mail size={16} />}
        helperText="We'll send confirmation to this email"
        required
        clearable
      />

      <FloatInput
        label="Password"
        type="password"
        leftIcon={<Lock size={16} />}
        helperText="Must contain at least 8 characters"
        required
        clearable
      />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** The floating label text |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `leftIcon` | `ReactNode` | - | Icon to display on the left |
| `rightIcon` | `ReactNode` | - | Icon to display on the right |
| `clearable` | `boolean` | `false` | Show clear button when input has value |
| `onClear` | `() => void` | - | Callback when clear button is clicked |
| `loading` | `boolean` | `false` | Show loading spinner |
| `error` | `string` | - | Error message (also sets validation state) |
| `warning` | `string` | - | Warning message |
| `info` | `string` | - | Info message |
| `success` | `string` | - | Success message |
| `helperText` | `string` | - | Helper text displayed below input |
| `fullWidth` | `boolean` | `true` | Make input full width |
| `disabled` | `boolean` | `false` | Disable the input |
| `readOnly` | `boolean` | `false` | Make input read-only |
| `required` | `boolean` | `false` | Mark as required (shows asterisk) |
| `classNames` | `FloatInputClassNames` | - | Custom class names for sub-elements |
| `className` | `string` | - | Additional CSS class for the input element |

Plus all standard HTML input attributes (type, placeholder, value, onChange, etc.)

## ClassNames API

Customize specific parts of the component:

```tsx
<FloatInput
  label="Custom"
  classNames={{
    root: 'my-root-class',
    wrapper: 'my-wrapper-class',
    input: 'my-input-class',
    label: 'my-label-class',
    leftIcon: 'my-left-icon-class',
    rightIcon: 'my-right-icon-class',
    clearButton: 'my-clear-button-class',
    helper: 'my-helper-class',
    error: 'my-error-class',
  }}
/>
```

## Styling

The component uses Tailwind CSS and follows the UIKit design system. The label animation is achieved using:

- CSS `transform` and `translate` for smooth transitions
- Tailwind's `peer` pattern for state-based styling
- The `:placeholder-shown` pseudo-class to detect empty inputs

### Animation Details

- **Default state**: Label centered vertically, normal size
- **Focused OR has value**: Label moves to top, shrinks to smaller size
- **Transition**: 200ms smooth animation
- **Focus color**: Primary color for label when focused

## Accessibility

- Uses proper `<label>` element with `htmlFor` attribute
- ARIA attributes: `aria-invalid`, `aria-busy`, `aria-describedby`, `aria-labelledby`
- Screen reader announcements for loading and validation states
- Keyboard navigation fully supported
- Focus states clearly visible

## Browser Support

Works in all modern browsers that support:
- CSS transforms
- Flexbox
- CSS custom properties
- The `:placeholder-shown` pseudo-class

## Implementation Notes

- The label positioning is size-aware - larger sizes have proportionally positioned labels
- Left icon presence adjusts label position to avoid overlap
- Uses React.memo for performance optimization
- Supports both controlled and uncontrolled modes
- Empty `placeholder=" "` is used internally for the `:placeholder-shown` trick

## Comparison with Regular Input

Use `FloatInput` when:
- You want a modern, Material Design aesthetic
- Space is limited and you want the label inside the input
- You want smooth label animations

Use regular `Input` when:
- You prefer traditional above-input labels
- You need the `variant` prop (outline/filled)
- You need character count display
- You need message position control (top/bottom)

## Related Components

- `Input` - Standard input with traditional label placement
- `Textarea` - Multi-line text input
- `InputPassword` - Password input with show/hide toggle
- `InputOTP` - One-time password input
