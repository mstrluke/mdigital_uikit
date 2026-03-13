import type { Meta, StoryObj } from '@storybook/react'
import { Star, Tag as TagIcon, X } from 'lucide-react'
import { useState } from 'react'
import Tag from './index'

const meta: Meta<typeof Tag> = {
  title: 'Data Display/Tag',
  component: Tag,
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
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tag size',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the tag can be closed',
    },
    disableKeyboardRemoval: {
      control: 'boolean',
      description: 'Disables Backspace/Delete key shortcuts for removing the tag when focused',
    },
    icon: {
      control: false,
      description: 'Icon element to display before the tag text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Primary: Story = {
  args: {
    children: 'Tag',
    variant: 'solid',
    color: 'primary',
    size: 'sm',
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap items-center">
      <Tag icon={<Star size={16} />} color="warning">
        Featured
      </Tag>
      <Tag icon={<TagIcon size={16} />} color="info">
        Category
      </Tag>
      <Tag icon={<Star size={16} />} color="success" variant="outline">
        Favorite
      </Tag>
    </div>
  ),
}

export const Closable: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'React', color: 'primary' as const },
      { id: 2, label: 'TypeScript', color: 'accent' as const },
      { id: 3, label: 'Tailwind', color: 'success' as const },
      { id: 4, label: 'Storybook', color: 'info' as const },
    ])

    const handleRemove = (id: number) => {
      setTags(tags.filter((tag) => tag.id !== id))
    }

    return (
      <div className="flex gap-3 flex-wrap items-center">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            color={tag.color}
            closable
            onClose={() => handleRemove(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    )
  },
}

export const ClosableWithIcons: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'Featured', color: 'warning' as const },
      { id: 2, label: 'Important', color: 'error' as const },
      { id: 3, label: 'Popular', color: 'success' as const },
    ])

    const handleRemove = (id: number) => {
      setTags(tags.filter((tag) => tag.id !== id))
    }

    return (
      <div className="flex gap-3 flex-wrap items-center">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            color={tag.color}
            icon={<Star size={16} />}
            closable
            onClose={() => handleRemove(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    )
  },
}

export const DisableKeyboardRemoval: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'Keyboard Enabled', disabled: false, color: 'primary' as const },
      { id: 2, label: 'Keyboard Disabled', disabled: true, color: 'secondary' as const },
    ])

    const handleRemove = (id: number) => {
      setTags(tags.filter((tag) => tag.id !== id))
    }

    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Try focusing the tags (using Tab) and pressing Backspace/Delete:
          </p>
          <div className="flex gap-3 flex-wrap items-center">
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                color={tag.color}
                closable
                disableKeyboardRemoval={tag.disabled}
                onClose={() => handleRemove(tag.id)}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          <strong>Keyboard Enabled:</strong> Focus the tag (Tab key) and press Backspace or Delete to remove<br/>
          <strong>Keyboard Disabled:</strong> Must click the close button (keyboard shortcuts disabled)
        </div>
      </div>
    )
  },
}

export const Clickable: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap items-center">
      <Tag onClick={() => alert('Tag clicked!')} color="primary">
        Click me
      </Tag>
      <Tag onClick={() => alert('Tag clicked!')} color="success" variant="outline">
        Interactive
      </Tag>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Technology Stack</h3>
        <div className="flex gap-2 flex-wrap">
          <Tag variant="outline" color="primary" size="sm">
            React
          </Tag>
          <Tag variant="outline" color="accent" size="sm">
            TypeScript
          </Tag>
          <Tag variant="outline" color="success" size="sm">
            Tailwind CSS
          </Tag>
          <Tag variant="outline" color="info" size="sm">
            Storybook
          </Tag>
          <Tag variant="outline" color="warning" size="sm">
            Vite
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Status Tags</h3>
        <div className="flex gap-2 flex-wrap">
          <Tag variant="soft" color="success" icon={<Star size={16} />}>
            Active
          </Tag>
          <Tag variant="soft" color="warning" icon={<Star size={16} />}>
            Pending
          </Tag>
          <Tag variant="soft" color="error" icon={<X size={16} />}>
            Inactive
          </Tag>
          <Tag variant="soft" color="info" icon={<TagIcon size={16} />}>
            Draft
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Category Tags (Removable)</h3>
        <TagListExample />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Priority Labels</h3>
        <div className="flex gap-2 flex-wrap">
          <Tag variant="solid" color="error" size="xs">
            Critical
          </Tag>
          <Tag variant="solid" color="warning" size="xs">
            High
          </Tag>
          <Tag variant="solid" color="info" size="xs">
            Medium
          </Tag>
          <Tag variant="solid" color="default" size="xs">
            Low
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Feature Tags</h3>
        <div className="flex gap-2 flex-wrap">
          <Tag variant="solid" color="success" icon={<Star size={16} />}>
            New
          </Tag>
          <Tag variant="solid" color="warning" icon={<Star size={16} />}>
            Featured
          </Tag>
          <Tag variant="solid" color="primary" icon={<Star size={16} />}>
            Premium
          </Tag>
          <Tag variant="solid" color="accent" icon={<Star size={16} />}>
            Beta
          </Tag>
        </div>
      </div>
    </div>
  ),
}

/**
 * Helper component for interactive tag list example
 */
function TagListExample() {
  const [tags, setTags] = useState([
    { id: 1, label: 'Design', color: 'primary' as const },
    { id: 2, label: 'Development', color: 'accent' as const },
    { id: 3, label: 'Marketing', color: 'success' as const },
    { id: 4, label: 'Sales', color: 'warning' as const },
    { id: 5, label: 'Support', color: 'info' as const },
  ])

  const handleRemove = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          color={tag.color}
          variant="outline"
          icon={<TagIcon size={16} />}
          closable
          onClose={() => handleRemove(tag.id)}
        >
          {tag.label}
        </Tag>
      ))}
    </div>
  )
}

// Color × Size Matrix

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const variants = ['default', 'solid', 'outline', 'soft'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{variant}</h3>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                    {sizes.map(size => (
                      <th key={size} className="p-2 text-center text-sm text-gray-500">{size}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map(color => (
                    <tr key={color}>
                      <td className="p-2 text-sm font-medium">{color}</td>
                      {sizes.map(size => (
                        <td key={size} className="p-2">
                          <Tag color={color} variant={variant} size={size}>Tag</Tag>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
