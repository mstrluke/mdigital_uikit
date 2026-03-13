import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Mentions from './index'

const meta: Meta<typeof Mentions> = {
  title: 'Data Entry/Mentions',
  component: Mentions,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Mentions>

const users = [
  { label: 'John Doe', value: 'john', description: 'Engineering' },
  { label: 'Jane Smith', value: 'jane', description: 'Design' },
  { label: 'Bob Wilson', value: 'bob', description: 'Product' },
  { label: 'Alice Brown', value: 'alice', description: 'Marketing' },
  { label: 'Charlie Davis', value: 'charlie', description: 'Sales' },
]

export const Default: Story = {
  render: () => (
    <Mentions label="Comment" options={users} placeholder="Type @ to mention someone..." className="max-w-lg" helperText="Use @ to mention a team member" />
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="space-y-2 max-w-lg">
        <Mentions value={value} onChange={setValue} options={users} label="Message" placeholder="Write a message..." />
        <p className="text-xs text-text-secondary font-mono whitespace-pre-wrap">{value || '(empty)'}</p>
      </div>
    )
  },
}

export const CustomTrigger: Story = {
  render: () => (
    <Mentions
      label="Channels & Users"
      options={[
        { label: 'general', value: 'general' },
        { label: 'random', value: 'random' },
        { label: 'engineering', value: 'engineering' },
      ]}
      triggers={['@', '#']}
      placeholder="Use @ for users, # for channels"
      className="max-w-lg"
    />
  ),
}

export const WithError: Story = {
  args: {
    label: 'Review',
    options: users,
    error: 'Comment cannot be empty',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Mentions key={size} size={size} label={size.toUpperCase()} options={users} placeholder={`Size ${size}...`} />
      ))}
    </div>
  ),
}
