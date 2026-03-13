import type { Meta, StoryObj } from '@storybook/react'
import { Heart, Star, Bell, Check, X, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import Toggle from './index'

const meta: Meta<typeof Toggle> = {
  title: 'Data Entry/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Toggle size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    pressed: {
      control: 'boolean',
      description: 'Pressed state (controlled)',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'Default pressed state (uncontrolled)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Primary: Story = {
  args: {
    children: 'Toggle',
    color: 'primary',
    size: 'md',
    variant: 'default',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Variant</h3>
        <div className="flex gap-4 flex-wrap">
          <Toggle variant="default">Default</Toggle>
          <Toggle variant="default" defaultPressed>Default Pressed</Toggle>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Solid Variant</h3>
        <div className="flex gap-4 flex-wrap">
          <Toggle variant="solid">Solid</Toggle>
          <Toggle variant="solid" defaultPressed>Solid Pressed</Toggle>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Soft Variant</h3>
        <div className="flex gap-4 flex-wrap">
          <Toggle variant="soft">Soft</Toggle>
          <Toggle variant="soft" defaultPressed>Soft Pressed</Toggle>
        </div>
      </div>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Toggle color="default" defaultPressed>Default</Toggle>
      <Toggle color="primary" defaultPressed>Primary</Toggle>
      <Toggle color="secondary" defaultPressed>Secondary</Toggle>
      <Toggle color="accent" defaultPressed>Accent</Toggle>
      <Toggle color="success" defaultPressed>Success</Toggle>
      <Toggle color="error" defaultPressed>Error</Toggle>
      <Toggle color="warning" defaultPressed>Warning</Toggle>
      <Toggle color="info" defaultPressed>Info</Toggle>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Toggle size="xs" defaultPressed>Extra Small</Toggle>
      <Toggle size="sm" defaultPressed>Small</Toggle>
      <Toggle size="md" defaultPressed>Medium</Toggle>
      <Toggle size="lg" defaultPressed>Large</Toggle>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Toggle icon={<Heart />}>Like</Toggle>
      <Toggle icon={<Star />} defaultPressed>Favorite</Toggle>
      <Toggle icon={<Bell />}>Notify</Toggle>
      <Toggle icon={<ThumbsUp />} defaultPressed>Approve</Toggle>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Toggle icon={<Heart />} size="xs" />
      <Toggle icon={<Star />} size="sm" defaultPressed />
      <Toggle icon={<Bell />} size="md" />
      <Toggle icon={<Check />} size="lg" defaultPressed />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled defaultPressed>Disabled Pressed</Toggle>
      <Toggle disabled icon={<Heart />}>Disabled with Icon</Toggle>
      <Toggle disabled icon={<Star />} defaultPressed>Disabled Pressed</Toggle>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <Toggle
            pressed={pressed}
            onChange={setPressed}
            icon={<Heart />}
          >
            Like
          </Toggle>
          <span className="text-sm text-text-secondary">
            State: {pressed ? 'Pressed' : 'Not pressed'}
          </span>
        </div>
        <button
          onClick={() => setPressed(!pressed)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Toggle State Externally
        </button>
      </div>
    )
  },
}

export const ColorMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Default Variant</h3>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <Toggle key={color} variant="default" color={color} defaultPressed>
                {color}
              </Toggle>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Solid Variant</h3>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <Toggle key={color} variant="solid" color={color} defaultPressed>
                {color}
              </Toggle>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Soft Variant</h3>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <Toggle key={color} variant="soft" color={color} defaultPressed>
                {color}
              </Toggle>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const InteractiveExample: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    })

    return (
      <div className="space-y-6 max-w-md">
        <h3 className="text-lg font-semibold">Feature Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-text-secondary">Receive email notifications</p>
            </div>
            <Toggle
              pressed={features.notifications}
              onChange={(pressed) => setFeatures({ ...features, notifications: pressed })}
              icon={<Bell />}
              color="primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-xs text-text-secondary">Use dark theme</p>
            </div>
            <Toggle
              pressed={features.darkMode}
              onChange={(pressed) => setFeatures({ ...features, darkMode: pressed })}
              color="accent"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Auto Save</p>
              <p className="text-xs text-text-secondary">Automatically save changes</p>
            </div>
            <Toggle
              pressed={features.autoSave}
              onChange={(pressed) => setFeatures({ ...features, autoSave: pressed })}
              icon={<Check />}
              color="success"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Analytics</p>
              <p className="text-xs text-text-secondary">Share usage data</p>
            </div>
            <Toggle
              pressed={features.analytics}
              onChange={(pressed) => setFeatures({ ...features, analytics: pressed })}
              color="info"
            />
          </div>
        </div>
      </div>
    )
  },
}

export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Text Only</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Toggle size="xs" defaultPressed>XS</Toggle>
          <Toggle size="sm" defaultPressed>SM</Toggle>
          <Toggle size="md" defaultPressed>MD</Toggle>
          <Toggle size="lg" defaultPressed>LG</Toggle>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">With Icons</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Toggle size="xs" icon={<Heart />} defaultPressed>XS</Toggle>
          <Toggle size="sm" icon={<Heart />} defaultPressed>SM</Toggle>
          <Toggle size="md" icon={<Heart />} defaultPressed>MD</Toggle>
          <Toggle size="lg" icon={<Heart />} defaultPressed>LG</Toggle>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Icon Only</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Toggle size="xs" icon={<Heart />} defaultPressed />
          <Toggle size="sm" icon={<Heart />} defaultPressed />
          <Toggle size="md" icon={<Heart />} defaultPressed />
          <Toggle size="lg" icon={<Heart />} defaultPressed />
        </div>
      </div>
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    const variants = ['default', 'solid', 'soft'] as const

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-3 capitalize">{variant} Variant</h3>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                    {sizes.map(size => (
                      <th key={size} className="p-2 text-center text-sm text-gray-500">{size}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map(color => (
                    <tr key={color}>
                      <td className="p-2 text-sm font-medium">{color}</td>
                      {sizes.map(size => (
                        <td key={size} className="p-2">
                          <Toggle color={color} size={size} variant={variant} defaultPressed>A</Toggle>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    )
  },
}
