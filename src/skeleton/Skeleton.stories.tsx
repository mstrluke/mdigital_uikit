import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from './index'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Skeleton height size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Skeleton color',
    },
    circle: {
      control: 'boolean',
      description: 'Display as a circle (for avatars)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'default',
    className: 'w-full',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Skeleton size="xs" className="w-full" />
      <Skeleton size="sm" className="w-full" />
      <Skeleton size="md" className="w-full" />
      <Skeleton size="lg" className="w-full" />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-2">
        <Skeleton color="default" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">default</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="primary" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">primary</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="secondary" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">secondary</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="accent" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">accent</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="success" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">success</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="error" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">error</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="warning" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">warning</span>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton color="info" className="w-full" />
        <span className="text-xs text-gray-500 min-w-[60px]">info</span>
      </div>
    </div>
  ),
}

export const CircleSkeletons: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <Skeleton circle size="xs" className="w-8" />
      <Skeleton circle size="sm" className="w-10" />
      <Skeleton circle size="md" className="w-12" />
      <Skeleton circle size="lg" className="w-16" />
    </div>
  ),
}

export const CircleColors: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(
        (color) => (
          <Skeleton key={color} circle color={color} className="w-12" />
        ),
      )}
    </div>
  ),
}

export const DifferentWidths: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-1/2" />
      <Skeleton className="w-1/3" />
      <Skeleton className="w-1/4" />
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4">User Profile Card Loading</h3>
        <div className="border rounded-lg p-6 max-w-sm">
          <div className="flex items-center gap-4">
            <Skeleton circle className="w-16 h-16" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-1/2 h-3" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Article Loading</h3>
        <div className="border rounded-lg p-6 max-w-2xl">
          <Skeleton className="w-3/4 h-8 mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <Skeleton circle className="w-10 h-10" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-32 h-3" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-4/5 h-3" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Card Grid Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="w-full h-32 mb-3 rounded" />
              <Skeleton className="w-3/4 h-4 mb-2" />
              <Skeleton className="w-full h-3 mb-2" />
              <Skeleton className="w-5/6 h-3" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">List Item Loading</h3>
        <div className="border rounded-lg divide-y max-w-lg">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 flex items-center gap-3">
              <Skeleton circle className="w-12 h-12" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Table Loading</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <Skeleton className="h-3" />
                  <Skeleton className="h-3" />
                  <Skeleton className="h-3" />
                  <Skeleton className="h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Comment Thread Loading</h3>
        <div className="space-y-4 max-w-2xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton circle className="w-10 h-10" />
              <div className="flex-1 border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-24 h-3" />
                  <Skeleton className="w-16 h-3" />
                </div>
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-3/4 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Dashboard Widget Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="w-20 h-3 mb-4" />
              <Skeleton className="w-full h-10 mb-2" />
              <Skeleton className="w-16 h-3" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Navigation Loading</h3>
        <div className="border rounded-lg p-4 space-y-2 max-w-xs">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Hero Section Loading</h3>
        <div className="border rounded-lg p-8 max-w-4xl">
          <div className="text-center space-y-4">
            <Skeleton className="w-2/3 h-12 mx-auto" />
            <Skeleton className="w-4/5 h-6 mx-auto" />
            <Skeleton className="w-3/4 h-4 mx-auto" />
            <div className="flex justify-center gap-4 mt-6">
              <Skeleton className="w-32 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold mb-2 text-gray-500">Custom Heights</h3>
        <div className="space-y-2">
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    </div>
  ),
}

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Skeleton circle className="w-6 h-6" />
      <Skeleton circle className="w-8 h-8" />
      <Skeleton circle className="w-10 h-10" />
      <Skeleton circle className="w-12 h-12" />
      <Skeleton circle className="w-16 h-16" />
      <Skeleton circle className="w-20 h-20" />
      <Skeleton circle className="w-24 h-24" />
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;

    return (
      <div className="space-y-6">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-sm text-gray-500">Color</th>
              <th className="p-2 text-left text-sm text-gray-500">Example</th>
            </tr>
          </thead>
          <tbody>
            {colors.map(c => (
              <tr key={c}>
                <td className="p-2 text-sm font-medium">{c}</td>
                <td className="p-2">
                  <Skeleton color={c} className="h-4 w-32" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
}
