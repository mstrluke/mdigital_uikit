import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import TagsInput from './index'

const meta: Meta<typeof TagsInput> = {
  title: 'Data Entry/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TagsInput>

export const Default: Story = {
  args: { label: 'Tags', placeholder: 'Add tag...' },
}

export const Controlled: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript'])
    return (
      <div className="space-y-2 max-w-sm">
        <TagsInput value={tags} onChange={setTags} label="Technologies" clearable />
        <p className="text-xs text-text-secondary">Tags: {tags.join(', ')}</p>
      </div>
    )
  },
}

export const WithSuggestions: Story = {
  render: () => (
    <TagsInput
      label="Framework"
      suggestions={['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik', 'Astro', 'Next.js', 'Nuxt']}
      placeholder="Type to search..."
      className="max-w-sm"
    />
  ),
}

export const MaxTags: Story = {
  render: () => (
    <TagsInput label="Select up to 3" maxTags={3} defaultValue={['One', 'Two']} helperText="Maximum 3 tags" className="max-w-sm" />
  ),
}

export const WithValidation: Story = {
  render: () => (
    <TagsInput
      label="Email addresses"
      placeholder="Enter email..."
      validate={(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
      helperText="Enter valid email addresses"
      className="max-w-sm"
    />
  ),
}

export const WithError: Story = {
  args: { label: 'Tags', error: 'At least one tag is required', defaultValue: [] },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <TagsInput key={size} size={size} label={size.toUpperCase()} defaultValue={['Tag 1', 'Tag 2']} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      {(['primary', 'accent', 'success', 'error'] as const).map((color) => (
        <TagsInput key={color} color={color} label={color} defaultValue={['Tag A', 'Tag B']} />
      ))}
    </div>
  ),
}
