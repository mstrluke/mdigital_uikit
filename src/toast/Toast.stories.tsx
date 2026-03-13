import type { Meta, StoryObj } from '@storybook/react'
import { Check, Download, Mail, RefreshCw, Send, Trash2, Upload, Wifi, WifiOff } from 'lucide-react'
import React, { useState } from 'react'

import Button from '../button'
import { ToastProvider, useToast } from './index'

const meta: Meta<typeof ToastProvider> = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

// Helper Demo Components

function ShortcutsDemo() {
  const { toast, success, error, warning, info, dismissAll } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Shortcut Methods</h2>
      <p className="text-sm text-text-secondary mb-4">
        Quick helpers: success(), error(), warning(), info() — all use soft variant by default.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast({ title: 'Default Toast', description: 'This is a default notification' })}>
          toast()
        </Button>
        <Button color="success" onClick={() => success('Success!', 'Your changes have been saved.')}>
          success()
        </Button>
        <Button color="error" onClick={() => error('Error!', 'Something went wrong.')}>
          error()
        </Button>
        <Button color="warning" onClick={() => warning('Warning!', 'Please check your input.')}>
          warning()
        </Button>
        <Button color="info" onClick={() => info('Info', 'Here is some information.')}>
          info()
        </Button>
        <Button
          onClick={() => {
            success('First', 'Toast 1')
            setTimeout(() => error('Second', 'Toast 2'), 200)
            setTimeout(() => warning('Third', 'Toast 3'), 400)
            setTimeout(() => info('Fourth', 'Toast 4'), 600)
          }}
        >
          Show All
        </Button>
        <Button onClick={() => dismissAll()} color="error" variant="outline">
          Dismiss All
        </Button>
      </div>
    </div>
  )
}

function PromiseDemo() {
  const { promise } = useToast()

  const simulateSuccess = () =>
    promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Saving changes...',
      success: 'Changes saved successfully!',
      error: 'Failed to save changes.',
    })

  const simulateError = () =>
    promise(new Promise((_, reject) => setTimeout(() => reject(new Error('Network error')), 2000)), {
      loading: 'Uploading file...',
      success: 'File uploaded!',
      error: (err) => `Upload failed: ${(err as Error).message}`,
    })

  const simulateApi = () =>
    promise(
      new Promise<{ count: number }>((resolve) =>
        setTimeout(() => resolve({ count: 42 }), 1500),
      ),
      {
        loading: 'Fetching data...',
        success: (data) => `Loaded ${data.count} records`,
        error: 'Failed to fetch data.',
      },
    )

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Promise Toasts</h2>
      <p className="text-sm text-text-secondary mb-4">
        Automatically transitions through loading, success, and error states.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={simulateSuccess} leftIcon={<Send className="w-4 h-4" />}>
          Simulate Success
        </Button>
        <Button onClick={simulateError} color="error" leftIcon={<Upload className="w-4 h-4" />}>
          Simulate Error
        </Button>
        <Button onClick={simulateApi} color="info" leftIcon={<Download className="w-4 h-4" />}>
          Simulate API Call
        </Button>
      </div>
    </div>
  )
}

function ActionDemo() {
  const { toast, success } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Action Toasts</h2>
      <p className="text-sm text-text-secondary mb-4">
        Toasts with clickable action buttons for user interaction.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: 'Item deleted',
              description: 'The file has been moved to trash.',
              action: { label: 'Undo', onClick: () => success('Restored!', 'File has been restored.') },
            })
          }
          leftIcon={<Trash2 className="w-4 h-4" />}
        >
          Delete with Undo
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Email sent',
              description: 'Your message has been delivered.',
              color: 'success',
              action: { label: 'View', onClick: () => alert('Opening sent mail...') },
            })
          }
          color="success"
          leftIcon={<Mail className="w-4 h-4" />}
        >
          Send with View
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Update available',
              description: 'Version 2.0.0 is ready to install.',
              color: 'info',
              duration: 0,
              action: { label: 'Update Now', onClick: () => success('Updating...', 'Please wait.') },
            })
          }
          color="info"
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Persistent with Action
        </Button>
      </div>
    </div>
  )
}

function IconDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Custom Icon Toasts</h2>
      <p className="text-sm text-text-secondary mb-4">
        Override the default icon with any React node. Pass icon=null to hide the default.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: 'Connected',
              description: 'You are back online.',
              color: 'success',
              icon: <Wifi className="w-5 h-5" />,
            })
          }
        >
          Custom Icon
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Disconnected',
              description: 'Check your network connection.',
              color: 'error',
              icon: <WifiOff className="w-5 h-5" />,
            })
          }
          color="error"
        >
          Custom Icon
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Task completed',
              description: 'All items have been processed.',
              color: 'success',
              icon: <Check className="w-5 h-5" />,
            })
          }
          color="success"
        >
          Custom Icon
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'No icon toast',
              description: 'Explicitly hidden with icon={null}',
              color: 'info',
              icon: null,
            })
          }
          color="info"
          variant="outline"
        >
          No Icon
        </Button>
      </div>
    </div>
  )
}

function DurationDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Duration Options</h2>
      <p className="text-sm text-text-secondary mb-4">
        Control how long each toast stays visible.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => toast({ title: 'Quick flash', description: 'Gone in 1 second', duration: 1000 })}
        >
          1 second
        </Button>
        <Button
          onClick={() => toast({ title: 'Standard', description: 'Default 5 seconds', duration: 5000 })}
        >
          5 seconds (default)
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Persistent',
              description: 'Swipe or click to dismiss manually',
              duration: 0,
              color: 'warning',
            })
          }
          color="warning"
        >
          Persistent
        </Button>
      </div>
    </div>
  )
}

function DismissDemo() {
  const { toast, dismiss, dismissAll } = useToast()
  const [ids, setIds] = useState<(string | number)[]>([])

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Programmatic Dismiss</h2>
      <p className="text-sm text-text-secondary mb-4">
        Dismiss individual toasts by ID or all at once.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            const id = toast({ title: `Toast #${ids.length + 1}`, description: 'Click dismiss to remove', duration: 0 })
            setIds((prev) => [...prev, id])
          }}
        >
          Add Persistent Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (ids.length > 0) {
              dismiss(ids[ids.length - 1])
              setIds((prev) => prev.slice(0, -1))
            }
          }}
          disabled={ids.length === 0}
        >
          Dismiss Last
        </Button>
        <Button
          variant="outline"
          color="error"
          onClick={() => {
            dismissAll()
            setIds([])
          }}
        >
          Dismiss All
        </Button>
      </div>
      {ids.length > 0 && (
        <p className="text-xs text-text-secondary mt-2">
          Active toasts: {ids.length}
        </p>
      )}
    </div>
  )
}

function PositionDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Position Options</h2>
      <p className="text-sm text-text-secondary mb-4">
        Change toast position via ToastProvider position prop.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast({ title: 'Top Right', description: 'Default position' })}>
          Top Right
        </Button>
      </div>
    </div>
  )
}

// Stories

/**
 * Quick shortcut methods: success(), error(), warning(), info()
 */
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ShortcutsDemo />
    </ToastProvider>
  ),
}

/**
 * Promise-based toasts that show loading, success, and error states
 */
export const PromiseToasts: Story = {
  render: () => (
    <ToastProvider>
      <PromiseDemo />
    </ToastProvider>
  ),
}

/**
 * Toasts with action buttons
 */
export const WithActions: Story = {
  render: () => (
    <ToastProvider>
      <ActionDemo />
    </ToastProvider>
  ),
}

/**
 * Toasts with custom icons or no icon
 */
export const CustomIcons: Story = {
  render: () => (
    <ToastProvider>
      <IconDemo />
    </ToastProvider>
  ),
}

/**
 * Different auto-dismiss durations
 */
export const Durations: Story = {
  render: () => (
    <ToastProvider>
      <DurationDemo />
    </ToastProvider>
  ),
}

/**
 * Programmatic dismiss by ID
 */
export const ProgrammaticDismiss: Story = {
  render: () => (
    <ToastProvider>
      <DismissDemo />
    </ToastProvider>
  ),
}

/**
 * Toast positioned at top-left
 */
export const TopLeft: Story = {
  render: () => (
    <ToastProvider position="top-left">
      <PositionDemo />
    </ToastProvider>
  ),
}

/**
 * Toast positioned at bottom-right
 */
export const BottomRight: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <PositionDemo />
    </ToastProvider>
  ),
}

/**
 * Close button on every toast
 */
export const WithCloseButton: Story = {
  render: () => (
    <ToastProvider closeButton>
      <ShortcutsDemo />
    </ToastProvider>
  ),
}

/**
 * Force dark theme
 */
export const DarkTheme: Story = {
  render: () => (
    <ToastProvider theme="dark">
      <ShortcutsDemo />
    </ToastProvider>
  ),
}

function ColorVariantMatrixDemo() {
  const { toast } = useToast()
  const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
  const variants = ['default', 'solid', 'outline', 'soft'] as const

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-semibold mb-2">Color × Variant Matrix</h2>
      <p className="text-sm text-text-secondary mb-4">
        Click buttons to trigger toasts with different color/variant combinations.
      </p>
      <div className="space-y-4">
        {variants.map((v) => (
          <div key={v}>
            <h3 className="text-md font-semibold mb-2 capitalize">{v} Variant</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <Button
                  key={c}
                  color={c}
                  size="sm"
                  onClick={() =>
                    toast({
                      title: `${c} ${v}`,
                      description: 'This is a toast notification',
                      color: c,
                      variant: v,
                    })
                  }
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Color × Variant Matrix
 */
export const ColorVariantMatrix: Story = {
  render: () => (
    <ToastProvider>
      <ColorVariantMatrixDemo />
    </ToastProvider>
  ),
}
