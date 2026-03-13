import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ColorPicker, ColorInput } from './index'

const meta: Meta<typeof ColorPicker> = {
  title: 'Data Entry/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  render: () => <ColorPicker label="Pick a color" />,
}

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6')

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} label="Theme color" />
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg border border-border" style={{ backgroundColor: color }} />
          <code className="text-sm font-mono text-text-secondary">{color}</code>
        </div>
      </div>
    )
  },
}

export const WithSwatches: Story = {
  render: () => (
    <ColorPicker
      label="Brand colors"
      defaultValue="#ef4444"
      swatches={[
        '#ef4444', '#f97316', '#eab308', '#22c55e',
        '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
        '#000000', '#6b7280', '#d1d5db', '#ffffff',
      ]}
    />
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <ColorPicker key={size} size={size} label={size.toUpperCase()} defaultValue="#8b5cf6" />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ColorPicker label="Disabled" defaultValue="#3b82f6" disabled />
  ),
}

// ColorInput stories
export const InputDefault: Story = {
  render: () => (
    <div className="max-w-xs">
      <ColorInput label="Background color" />
    </div>
  ),
  name: 'ColorInput — Default',
}

export const InputControlled: Story = {
  render: () => {
    const [color, setColor] = useState('#22c55e')

    return (
      <div className="space-y-4 max-w-xs">
        <ColorInput value={color} onChange={setColor} label="Accent color" />
        <p className="text-sm text-text-secondary">Selected: <code className="font-mono">{color}</code></p>
      </div>
    )
  },
  name: 'ColorInput — Controlled',
}

export const InputWithSwatches: Story = {
  render: () => (
    <div className="max-w-xs">
      <ColorInput
        label="Chart color"
        defaultValue="#3b82f6"
        swatches={['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']}
      />
    </div>
  ),
  name: 'ColorInput — With Swatches',
}

export const InputSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-xs">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <ColorInput key={size} size={size} label={size.toUpperCase()} defaultValue="#8b5cf6" />
      ))}
    </div>
  ),
  name: 'ColorInput — Sizes',
}

export const ThemeEditor: Story = {
  render: () => {
    const [primary, setPrimary] = useState('#3b82f6')
    const [bg, setBg] = useState('#ffffff')
    const [text, setText] = useState('#111827')

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Theme Editor</h3>
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          <ColorInput label="Primary" value={primary} onChange={setPrimary} />
          <ColorInput label="Background" value={bg} onChange={setBg} />
          <ColorInput label="Text" value={text} onChange={setText} />
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{ backgroundColor: bg, color: text }}
        >
          <h4 className="text-lg font-semibold mb-2">Preview</h4>
          <p className="mb-4">This is how your theme looks.</p>
          <button
            className="px-4 py-2 rounded-md text-white font-medium"
            style={{ backgroundColor: primary }}
          >
            Primary Button
          </button>
        </div>
      </div>
    )
  },
}
