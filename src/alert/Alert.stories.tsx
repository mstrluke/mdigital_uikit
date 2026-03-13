import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Alert from './index'
import Button from '../button'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'solid', 'outline', 'soft'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
}

export const Success: Story = {
  args: {
    title: 'Success',
    description: 'Your changes have been saved.',
    color: 'success',
  },
}

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    color: 'error',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Your session will expire in 5 minutes.',
    color: 'warning',
  },
}

export const Info: Story = {
  args: {
    title: 'Info',
    description: 'A new version is available. Update now.',
    color: 'info',
  },
}

export const Closable: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    return (
      <div className="space-y-4">
        {show ? (
          <Alert
            title="Dismissible alert"
            description="Click the X to dismiss this alert."
            color="info"
            closable
            onClose={() => setShow(false)}
          />
        ) : (
          <Button onClick={() => setShow(true)} size="sm">Show alert again</Button>
        )}
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <Alert title="Default variant" description="Uses bg-slot + border-slot" variant="default" color="primary" />
      <Alert title="Solid variant" description="Filled background" variant="solid" color="primary" />
      <Alert title="Outline variant" description="Background + border" variant="outline" color="primary" />
      <Alert title="Soft variant" description="Tinted background" variant="soft" color="primary" />
    </div>
  ),
}

export const ColorMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    return (
      <div className="space-y-3 max-w-lg">
        {colors.map((color) => (
          <Alert
            key={color}
            title={`${color.charAt(0).toUpperCase() + color.slice(1)} alert`}
            description={`This is a ${color} alert with the soft variant.`}
            color={color}
          />
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <Alert title="Extra small" description="xs size" size="xs" color="info" />
      <Alert title="Small" description="sm size" size="sm" color="info" />
      <Alert title="Medium" description="md size (default)" size="md" color="info" />
      <Alert title="Large" description="lg size" size="lg" color="info" />
    </div>
  ),
}

export const NoIcon: Story = {
  args: {
    title: 'No icon',
    description: 'Pass icon={null} to hide the default icon.',
    icon: null,
    color: 'warning',
  },
}

export const WithChildren: Story = {
  render: () => (
    <Alert title="Action required" color="error" closable>
      <p className="mt-2 text-sm opacity-90">
        Your payment method has expired. Please update it to continue using the service.
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" color="error">Update payment</Button>
        <Button size="sm" variant="outline">Dismiss</Button>
      </div>
    </Alert>
  ),
}
