import type { Meta, StoryObj } from '@storybook/react'

import { FloatButton, FloatButtonGroup, BackTop } from './index'
import { Plus, Search, Star } from 'lucide-react'

const meta: Meta<typeof FloatButton> = {
  title: 'General/FloatButton',
  component: FloatButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FloatButton>

export const Default: Story = {
  render: () => (
    <div className="relative h-64 border border-border rounded-lg p-6">
      <p className="text-text-secondary">FloatButton positioned with CSS</p>
      <div className="absolute bottom-4 right-4">
        <FloatButton icon={<Plus className="w-5 h-5" />} onClick={() => alert('Clicked!')} />
      </div>
    </div>
  ),
}

export const Colored: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['default', 'primary', 'accent', 'success', 'error'] as const).map((color) => (
        <FloatButton key={color} icon={<Plus className="w-5 h-5" />} color={color} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <FloatButton key={size} icon={<Plus className="w-4 h-4" />} size={size} />
      ))}
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <FloatButton icon={<Plus className="w-5 h-5" />} shape="circle" />
      <FloatButton icon={<Plus className="w-5 h-5" />} shape="square" />
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <div className="flex gap-4">
      <FloatButton icon={<Star className="w-5 h-5" />} badge={3} />
      <FloatButton icon={<Star className="w-5 h-5" />} badge="99+" color="primary" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="relative h-64 border border-border rounded-lg">
      <div className="absolute bottom-4 right-4">
        <FloatButtonGroup trigger="click" color="primary">
          <FloatButton icon={<Search className="w-4 h-4" />} tooltip="Search" />
          <FloatButton icon={<Star className="w-4 h-4" />} tooltip="Favorite" />
          <FloatButton icon={<Plus className="w-4 h-4" />} tooltip="Add" />
        </FloatButtonGroup>
      </div>
    </div>
  ),
}
