import type { Meta, StoryObj } from '@storybook/react'
import { Info, HelpCircle, AlertCircle } from 'lucide-react'
import Tooltip, { TooltipProvider } from './index'
import Button from '../button'
import Badge from '../badge'

const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content to display',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tooltip size',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to trigger',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the tooltip',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay in milliseconds before showing tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip functionality',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>,
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="Get more information about this feature">
        <Info className="w-5 h-5 text-blue-500 cursor-help" />
      </Tooltip>
      <Tooltip content="Need help? Click for assistance" color="info">
        <HelpCircle className="w-5 h-5 text-blue-500 cursor-help" />
      </Tooltip>
      <Tooltip content="Warning: This action cannot be undone" color="error" variant="solid">
        <AlertCircle className="w-5 h-5 text-red-500 cursor-help" />
      </Tooltip>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="This feature is currently in beta testing">
        <Badge color="info">Beta</Badge>
      </Tooltip>
      <Tooltip content="New feature just released!" color="success">
        <Badge color="success">New</Badge>
      </Tooltip>
      <Tooltip content="This feature is deprecated and will be removed soon" color="warning">
        <Badge color="warning">Deprecated</Badge>
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="This is a much longer tooltip that contains multiple sentences. It demonstrates how the tooltip handles longer content and wrapping. The tooltip will automatically adjust its width to accommodate the content.">
        <Button>Long Content</Button>
      </Tooltip>
      <Tooltip
        content="Short and sweet tooltip"
        size="md"
      >
        <Button>Short Content</Button>
      </Tooltip>
    </div>
  ),
}

export const InteractiveExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Tooltip content="Save your changes" color="primary" side="bottom">
          <Button color="primary">Save</Button>
        </Tooltip>
        <Tooltip content="Cancel and discard changes" color="error" side="bottom">
          <Button color="error" variant="outline">Cancel</Button>
        </Tooltip>
        <Tooltip content="Preview before publishing" color="info" side="bottom">
          <Button variant="ghost">Preview</Button>
        </Tooltip>
      </div>
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-sm font-medium">Form Settings</h4>
          <Tooltip content="Configure how this form behaves" size="xs">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
        <p className="text-sm text-text-secondary">
          Hover over the help icon for more information
        </p>
      </div>
    </div>
  ),
}

export const ColorVariantMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['solid', 'soft'] as const

    return (
      <div className="space-y-6">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-3 capitalize">{variant} Variant</h3>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <Tooltip
                  key={`${variant}-${color}`}
                  content={`${color} ${variant}`}
                  color={color}
                  variant={variant}
                >
                  <button className="px-3 py-2 border border-border rounded text-sm hover:bg-surface">
                    {color}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

