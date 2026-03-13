import type { Meta, StoryObj } from '@storybook/react'
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import Collapse from './index'

const meta: Meta<typeof Collapse> = {
  title: 'Data Display/Collapse',
  component: Collapse,
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
      description: 'Collapse size',
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
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (uncontrolled)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Collapse>

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: <div>This is the collapsible content. Click the header to toggle visibility.</div>,
    color: 'default',
    size: 'md',
    variant: 'default',
  },
}


export const DefaultOpen: Story = {
  args: {
    title: 'This collapse is open by default',
    children: <div>The content is visible when the component mounts because defaultOpen is set to true.</div>,
    color: 'primary',
    defaultOpen: true,
  },
}

export const Disabled: Story = {
  args: {
    title: 'This collapse is disabled',
    children: <div>This content cannot be seen because the collapse is disabled.</div>,
    color: 'default',
    disabled: true,
  },
}

export const ControlledMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Open
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
          >
            Close
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90"
          >
            Toggle
          </button>
        </div>
        <div className="text-sm text-text-secondary">
          Current state: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </div>
        <Collapse
          title="Controlled Collapse"
          open={isOpen}
          onChange={setIsOpen}
          color="primary"
        >
          This collapse is controlled by external state. Use the buttons above to control it.
        </Collapse>
      </div>
    )
  },
}

export const WithCallback: Story = {
  render: () => {
    const [log, setLog] = useState<string[]>([])

    const handleChange = (open: boolean) => {
      const timestamp = new Date().toLocaleTimeString()
      setLog((prev) => [...prev, `${timestamp}: Collapse ${open ? 'opened' : 'closed'}`])
    }

    return (
      <div className="space-y-4">
        <Collapse
          title="Collapse with onChange callback"
          onChange={handleChange}
          color="primary"
        >
          Toggle this collapse to see events logged below.
        </Collapse>
        <div className="p-4 bg-surface border border-border rounded">
          <h4 className="font-semibold mb-2">Event Log:</h4>
          {log.length === 0 ? (
            <div className="text-sm text-text-secondary">No events yet</div>
          ) : (
            <div className="space-y-1">
              {log.map((entry, index) => (
                <div key={index} className="text-sm font-mono">{entry}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const NotificationStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Collapse
        title={
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Information</span>
          </div>
        }
        color="info"
        variant="soft"
        defaultOpen
      >
        This is an informational message. You can expand or collapse it to manage screen space.
      </Collapse>

      <Collapse
        title={
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Success</span>
          </div>
        }
        color="success"
        variant="soft"
        defaultOpen
      >
        Your operation completed successfully! All changes have been saved.
      </Collapse>

      <Collapse
        title={
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Warning</span>
          </div>
        }
        color="warning"
        variant="soft"
        defaultOpen
      >
        Please review the following items before proceeding. Some settings may require your attention.
      </Collapse>

      <Collapse
        title={
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Error</span>
          </div>
        }
        color="error"
        variant="soft"
        defaultOpen
      >
        An error occurred while processing your request. Please try again or contact support.
      </Collapse>
    </div>
  ),
}

export const FAQ: Story = {
  render: () => (
    <div className="max-w-3xl space-y-3">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Collapse
        title="What payment methods do you accept?"
        color="primary"
        variant="default"
      >
        We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.
      </Collapse>
      <Collapse
        title="How do I track my order?"
        color="primary"
        variant="default"
      >
        Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package in real-time.
      </Collapse>
      <Collapse
        title="What is your return policy?"
        color="primary"
        variant="default"
      >
        We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Items must be in their original condition with all tags attached.
      </Collapse>
      <Collapse
        title="Do you ship internationally?"
        color="primary"
        variant="default"
      >
        Yes! We ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and taxes may apply depending on your country.
      </Collapse>
      <Collapse
        title="How can I contact customer support?"
        color="primary"
        variant="default"
      >
        Our customer support team is available 24/7. You can reach us via email at support@example.com, through our live chat feature, or by calling our toll-free number at 1-800-EXAMPLE.
      </Collapse>
    </div>
  ),
}

// Color × Variant × Size Matrix
export const ColorVariantSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {variants.map((v) => (
          <div key={v}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{v} Variant</h3>
            <div className="space-y-6">
              {colors.map((c) => (
                <div key={c}>
                  <h4 className="text-sm font-medium mb-2 capitalize text-text-secondary">{c}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((s) => (
                      <Collapse
                        key={s}
                        title={`${s}`}
                        color={c}
                        variant={v}
                        size={s}
                      >
                        {c} {v} {s}
                      </Collapse>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

