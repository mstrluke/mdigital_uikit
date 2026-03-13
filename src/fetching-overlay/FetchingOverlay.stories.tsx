import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import FetchingOverlay from './index'
import Button from '../button'

const meta: Meta<typeof FetchingOverlay> = {
  title: 'Feedback/FetchingOverlay',
  component: FetchingOverlay,
  tags: ['autodocs'],
  argTypes: {
    isFetching: {
      control: 'boolean',
      description: 'Whether the overlay is visible',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Cover entire screen or just parent container',
    },
    backdropOpacity: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: 'Opacity of the backdrop (0-100)',
    },
  },
}

export default meta
type Story = StoryObj<typeof FetchingOverlay>

export const Default: Story = {
  args: {
    isFetching: true,
    size: 'lg',
    fullscreen: false,
    backdropOpacity: 30,
  },
  render: (args) => (
    <div className="relative w-full h-96 bg-surface border border-border rounded-lg flex items-center justify-center">
      <p className="text-text-secondary">Content behind overlay</p>
      <FetchingOverlay {...args} />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [isFetching, setIsFetching] = useState(false)

    const handleFetch = () => {
      setIsFetching(true)
      setTimeout(() => {
        setIsFetching(false)
      }, 3000)
    }

    return (
      <div className="relative w-full h-96 bg-surface border border-border rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Interactive Example</h2>
        <p className="mb-6 text-text-secondary">
          Click the button to simulate a loading state for 3 seconds.
        </p>
        <Button onClick={handleFetch} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Start Loading'}
        </Button>
        <FetchingOverlay isFetching={isFetching} fullscreen={false} />
      </div>
    )
  },
}


export const ContainerMode: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="relative w-full h-96 bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Container Mode</h2>
        <p className="mb-4 text-text-secondary">
          The overlay only covers its parent container when fullscreen is false.
        </p>
        <div className="space-y-2">
          <div className="p-4 bg-background rounded border border-border">
            <p>Content item 1</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <p>Content item 2</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <p>Content item 3</p>
          </div>
        </div>
        <FetchingOverlay isFetching fullscreen={false} />
      </div>
      <p className="text-sm text-text-secondary">
        Content outside the container is not affected by the overlay
      </p>
    </div>
  ),
}

export const FullscreenMode: Story = {
  render: () => {
    const [isFetching, setIsFetching] = useState(false)

    return (
      <div className="space-y-6">
        <div className="p-6 bg-surface border border-border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Fullscreen Mode</h2>
          <p className="mb-6 text-text-secondary">
            Click the button to show a fullscreen overlay that covers the entire viewport.
          </p>
          <Button onClick={() => setIsFetching(!isFetching)}>
            {isFetching ? 'Hide Overlay' : 'Show Fullscreen Overlay'}
          </Button>
        </div>
        <FetchingOverlay isFetching={isFetching} fullscreen />
      </div>
    )
  },
}

export const CardLoading: Story = {
  render: () => {
    const [loadingCards, setLoadingCards] = useState<Record<number, boolean>>({})

    const handleCardLoad = (index: number) => {
      setLoadingCards({ ...loadingCards, [index]: true })
      setTimeout(() => {
        setLoadingCards({ ...loadingCards, [index]: false })
      }, 2000)
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="relative bg-surface border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-bold mb-2">Card {index}</h3>
            <p className="text-text-secondary mb-4">
              This is some content in card {index}
            </p>
            <Button
              size="sm"
              onClick={() => handleCardLoad(index)}
              disabled={loadingCards[index]}
            >
              Load Data
            </Button>
            <FetchingOverlay
              isFetching={loadingCards[index] || false}
              fullscreen={false}
              size="md"
            />
          </div>
        ))}
      </div>
    )
  },
}

export const FormSubmission: Story = {
  render: () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2500)
    }

    return (
      <div className="max-w-md mx-auto">
        <div className="relative bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">User Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <FetchingOverlay
            isFetching={isSubmitting}
            fullscreen={false}
            backdropOpacity={40}
          />
        </div>
      </div>
    )
  },
}

export const DataTable: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false)

    const refreshData = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Users Table</h2>
          <Button onClick={refreshData} disabled={isLoading}>
            Refresh Data
          </Button>
        </div>
        <div className="relative bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
                { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
                { name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
              ].map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active'
                          ? 'bg-success/10 text-success'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FetchingOverlay isFetching={isLoading} fullscreen={false} />
        </div>
      </div>
    )
  },
}

