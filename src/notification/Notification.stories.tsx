import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Bell,
  Download,
  Upload,
  Mail,
  Heart,
  Star,
  User,
} from 'lucide-react'
import Notification from './index'
import Button from '../button'

const meta: Meta<typeof Notification> = {
  title: 'Feedback/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'solid', 'outline', 'soft'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Color theme',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Notification size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Notification>

// Basic notification
export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a notification message.',
  },
}

// Success notifications
export const SuccessNotifications: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="solid"
        color="success"
        title="Success!"
        description="Your changes have been saved successfully."
      />
      <Notification
        variant="soft"
        color="success"
        title="Upload Complete"
        description="3 files have been uploaded to the cloud."
      />
      <Notification
        variant="outline"
        color="success"
        title="Payment Received"
        description="Payment of $150.00 has been processed."
      />
    </div>
  ),
}

// Error notifications
export const ErrorNotifications: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="solid"
        color="error"
        title="Error"
        description="Failed to save changes. Please try again."
      />
      <Notification
        variant="soft"
        color="error"
        title="Upload Failed"
        description="Could not upload file. Check your connection."
      />
      <Notification
        variant="outline"
        color="error"
        title="Authentication Error"
        description="Your session has expired. Please sign in again."
      />
    </div>
  ),
}

// Warning notifications
export const WarningNotifications: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="solid"
        color="warning"
        title="Warning"
        description="Your storage is almost full. Upgrade for more space."
      />
      <Notification
        variant="soft"
        color="warning"
        title="Unsaved Changes"
        description="You have unsaved changes that will be lost."
      />
      <Notification
        variant="outline"
        color="warning"
        title="Scheduled Maintenance"
        description="System will be down for maintenance at 2 AM."
      />
    </div>
  ),
}

// Info notifications
export const InfoNotifications: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="solid"
        color="info"
        title="New Feature"
        description="Check out our new dark mode in settings!"
      />
      <Notification
        variant="soft"
        color="info"
        title="Update Available"
        description="Version 2.0 is now available for download."
      />
      <Notification
        variant="outline"
        color="info"
        title="Pro Tip"
        description="Use keyboard shortcuts to speed up your workflow."
      />
    </div>
  ),
}

// With action button
export const WithAction: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="soft"
        color="primary"
        title="New Message"
        description="You have received a new message from John."
        action={{
          label: 'View Message',
          onClick: () => alert('Opening message...'),
        }}
      />
      <Notification
        variant="soft"
        color="success"
        title="Backup Complete"
        description="Your data has been backed up successfully."
        action={{
          label: 'View Details',
          onClick: () => alert('Showing details...'),
        }}
      />
      <Notification
        variant="soft"
        color="warning"
        title="Storage Full"
        description="You have used 95% of your storage space."
        action={{
          label: 'Upgrade Now',
          onClick: () => alert('Redirecting to upgrade...'),
        }}
      />
    </div>
  ),
}

// Not closable
export const NotClosable: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        closable={false}
        variant="solid"
        color="info"
        title="Important Notice"
        description="This notification cannot be dismissed."
      />
      <Notification
        closable={false}
        variant="soft"
        color="warning"
        title="System Update"
        description="An update is required to continue."
      />
    </div>
  ),
}

// Interactive example
export const InteractiveDemo: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Array<{ id: number; type: string; message: string }>>([])

    const addNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: 'Operation completed successfully!',
        error: 'An error occurred. Please try again.',
        warning: 'Please review your input.',
        info: 'Here is some helpful information.',
      }

      const id = Date.now()
      setNotifications((prev) => [...prev, { id, type, message: messages[type] }])

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, 5000)
    }

    return (
      <div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button color="success" onClick={() => addNotification('success')}>
            Show Success
          </Button>
          <Button color="error" onClick={() => addNotification('error')}>
            Show Error
          </Button>
          <Button color="warning" onClick={() => addNotification('warning')}>
            Show Warning
          </Button>
          <Button color="info" onClick={() => addNotification('info')}>
            Show Info
          </Button>
        </div>

        <div className="fixed top-4 right-4 space-y-2 z-50" style={{ maxWidth: '400px' }}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              variant="soft"
              color={notification.type as any}
              title={notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              description={notification.message}
              onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
            />
          ))}
        </div>
      </div>
    )
  },
}

// With custom content
export const CustomContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="soft"
        color="primary"
        title="Download Ready"
        description="Your file is ready to download."
      >
        <div className="flex items-center gap-2 mt-2">
          <Button size="sm" leftIcon={<Download />}>
            Download
          </Button>
          <Button size="sm" variant="outline">
            Preview
          </Button>
        </div>
      </Notification>

      <Notification
        variant="soft"
        color="info"
        title="Update Available"
      >
        <div className="mt-2">
          <p className="text-sm text-text-secondary mb-3">
            Version 2.5.0 includes new features and bug fixes.
          </p>
          <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
            <li>Improved performance</li>
            <li>New dark mode</li>
            <li>Bug fixes</li>
          </ul>
          <div className="mt-3">
            <Button size="sm" color="info">
              Update Now
            </Button>
          </div>
        </div>
      </Notification>

      <Notification
        variant="outline"
        color="success"
        title="Welcome!"
      >
        <div className="mt-2 space-y-2">
          <p className="text-sm text-text-secondary">
            Thanks for signing up! Here's what you can do next:
          </p>
          <div className="flex gap-2">
            <Button size="sm" color="success" leftIcon={<User />}>
              Complete Profile
            </Button>
            <Button size="sm" variant="outline">
              Skip
            </Button>
          </div>
        </div>
      </Notification>
    </div>
  ),
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        variant="soft"
        color="primary"
        size="sm"
        title="New message from Sarah"
        description="Hey! Are you available for a quick call?"
        action={{
          label: 'Reply',
          onClick: () => alert('Opening chat...'),
        }}
      />

      <Notification
        variant="soft"
        color="success"
        size="sm"
        title="Upload complete"
        description="document.pdf (2.4 MB)"
        action={{
          label: 'Open',
          onClick: () => alert('Opening document...'),
        }}
      />

      <Notification
        variant="soft"
        color="warning"
        size="sm"
        title="Connection unstable"
        description="Your internet connection appears to be slow."
        action={{
          label: 'Retry',
          onClick: () => alert('Retrying connection...'),
        }}
      />

      <Notification
        variant="soft"
        color="error"
        size="sm"
        title="Payment failed"
        description="Your card was declined. Please update your payment method."
        action={{
          label: 'Update',
          onClick: () => alert('Opening payment settings...'),
        }}
      />

      <Notification
        variant="soft"
        color="info"
        size="sm"
        title="Tip of the day"
        description="Press Cmd+K to quickly search for anything."
        closable
      />
    </div>
  ),
}

// Toast-style notifications (positioned)
export const ToastStyled: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; color: string; message: string }>>([])

    const showToast = (color: 'success' | 'error' | 'warning' | 'info') => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, color, message: `${color} toast notification` }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }

    return (
      <div>
        <div className="flex gap-2 flex-wrap">
          <Button color="success" onClick={() => showToast('success')}>
            Success Toast
          </Button>
          <Button color="error" onClick={() => showToast('error')}>
            Error Toast
          </Button>
          <Button color="warning" onClick={() => showToast('warning')}>
            Warning Toast
          </Button>
          <Button color="info" onClick={() => showToast('info')}>
            Info Toast
          </Button>
        </div>

        {/* Toast container */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50" style={{ maxWidth: '400px' }}>
          {toasts.map((toast) => (
            <Notification
              key={toast.id}
              variant="solid"
              color={toast.color as any}
              size="sm"
              title={toast.message}
              onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            />
          ))}
        </div>
      </div>
    )
  },
}

// Color × Variant Matrix
export const ColorVariantMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'outline', 'soft'] as const

    return (
      <div className="space-y-8">
        {variants.map((v) => (
          <div key={v}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{v}</h3>
            <div className="space-y-2">
              {colors.map((c) => (
                <Notification
                  key={c}
                  color={c}
                  variant={v}
                  title={`${c} ${v}`}
                  description="Description text"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
