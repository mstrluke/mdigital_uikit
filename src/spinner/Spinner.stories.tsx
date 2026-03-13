import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './index'

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Spinner color',
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed below the spinner',
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Primary: Story = {
  args: {
    size: 'sm',
    color: 'primary',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center flex-wrap">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap items-center">
      <Spinner color="default" />
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="accent" />
      <Spinner color="success" />
      <Spinner color="error" />
      <Spinner color="warning" />
      <Spinner color="info" />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap items-start">
      <Spinner label="Loading..." />
      <Spinner label="Processing..." color="primary" />
      <Spinner label="Uploading..." color="success" />
      <Spinner label="Deleting..." color="error" />
    </div>
  ),
}

export const SizeWithLabels: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap items-start">
      <Spinner size="xs" label="Extra Small" />
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
    </div>
  ),
}

export const ColorMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Extra Small</h3>
        <div className="flex gap-4 flex-wrap items-center">
          {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => (
              <Spinner key={color} size="xs" color={color} />
            ),
          )}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Small</h3>
        <div className="flex gap-4 flex-wrap items-center">
          {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => (
              <Spinner key={color} size="sm" color={color} />
            ),
          )}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Medium</h3>
        <div className="flex gap-4 flex-wrap items-center">
          {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => (
              <Spinner key={color} size="md" color={color} />
            ),
          )}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Large</h3>
        <div className="flex gap-4 flex-wrap items-center">
          {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => (
              <Spinner key={color} size="lg" color={color} />
            ),
          )}
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4">Loading States</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg flex items-center justify-center">
            <Spinner size="md" color="primary" label="Loading content..." />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Button Loading States</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
            <Spinner size="xs" color="default" />
            <span>Loading...</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2">
            <Spinner size="xs" color="default" />
            <span>Saving...</span>
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2">
            <Spinner size="xs" color="default" />
            <span>Deleting...</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Inline Spinners</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Spinner size="xs" color="primary" />
            <span className="text-sm">Fetching data...</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="xs" color="success" />
            <span className="text-sm">Upload in progress...</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="xs" color="warning" />
            <span className="text-sm">Processing request...</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Card Loading State</h3>
        <div className="p-6 border rounded-lg flex flex-col items-center justify-center h-64">
          <Spinner size="lg" color="primary" label="Loading dashboard..." />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Status Indicators</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex items-center gap-3">
            <Spinner size="sm" color="primary" />
            <div>
              <p className="font-medium text-sm">Synchronizing</p>
              <p className="text-xs text-gray-500">Syncing your data...</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg flex items-center gap-3">
            <Spinner size="sm" color="success" />
            <div>
              <p className="font-medium text-sm">Processing</p>
              <p className="text-xs text-gray-500">Please wait...</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Overlay Loading</h3>
        <div className="relative p-6 border rounded-lg h-48">
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <Spinner size="lg" color="primary" label="Loading..." />
          </div>
          <p className="text-gray-400">Content underneath</p>
        </div>
      </div>
    </div>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="text-center">
        <Spinner color="primary" size="md" />
        <p className="text-xs mt-2 text-gray-600">Primary</p>
      </div>
      <div className="text-center">
        <Spinner color="success" size="md" />
        <p className="text-xs mt-2 text-gray-600">Success</p>
      </div>
      <div className="text-center">
        <Spinner color="error" size="md" />
        <p className="text-xs mt-2 text-gray-600">Error</p>
      </div>
      <div className="text-center">
        <Spinner color="warning" size="md" />
        <p className="text-xs mt-2 text-gray-600">Warning</p>
      </div>
      <div className="text-center">
        <Spinner color="info" size="md" />
        <p className="text-xs mt-2 text-gray-600">Info</p>
      </div>
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    return (
      <div className="space-y-6">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
              {sizes.map(s => (
                <th key={s} className="p-2 text-center text-sm text-gray-500">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colors.map(c => (
              <tr key={c}>
                <td className="p-2 text-sm font-medium">{c}</td>
                {sizes.map(s => (
                  <td key={s} className="p-2 text-center">
                    <Spinner color={c} size={s} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
}
