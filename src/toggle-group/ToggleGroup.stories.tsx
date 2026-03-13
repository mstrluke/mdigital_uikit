import type { Meta, StoryObj } from '@storybook/react'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, List, ListOrdered, Check } from 'lucide-react'
import { useState } from 'react'
import ToggleGroup from './index'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Data Entry/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Toggle size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width layout',
    },
    centered: {
      control: 'boolean',
      description: 'Center align content',
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

const basicOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

const alignmentOptions = [
  { label: 'Left', value: 'left', icon: <AlignLeft size={16} /> },
  { label: 'Center', value: 'center', icon: <AlignCenter size={16} /> },
  { label: 'Right', value: 'right', icon: <AlignRight size={16} /> },
  { label: 'Justify', value: 'justify', icon: <AlignJustify size={16} /> },
]

const formattingOptions = [
  { label: 'Bold', value: 'bold', icon: <Bold size={16} /> },
  { label: 'Italic', value: 'italic', icon: <Italic size={16} /> },
  { label: 'Underline', value: 'underline', icon: <Underline size={16} /> },
]

const listOptions = [
  { label: 'Bullet', value: 'bullet', icon: <List size={16} /> },
  { label: 'Numbered', value: 'numbered', icon: <ListOrdered size={16} /> },
]

export const Primary: Story = {
  args: {
    options: basicOptions,
    color: 'primary',
    size: 'md',
    variant: 'default',
  },
}

export const SingleSelection: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Text Alignment (Single Selection)</h3>
      <ToggleGroup
        options={alignmentOptions}
        defaultValue="left"
        multiple={false}
      />
    </div>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Text Formatting (Multiple Selection)</h3>
      <ToggleGroup
        options={formattingOptions}
        defaultValue={['bold']}
        multiple={true}
      />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Text Alignment</h3>
      <ToggleGroup
        options={alignmentOptions}
        defaultValue="left"
      />
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Icon Only Toggles</h3>
      <ToggleGroup
        options={[
          { value: 'left', icon: <AlignLeft size={16} /> },
          { value: 'center', icon: <AlignCenter size={16} /> },
          { value: 'right', icon: <AlignRight size={16} /> },
          { value: 'justify', icon: <AlignJustify size={16} /> },
        ]}
        defaultValue="left"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">All Disabled</h3>
        <ToggleGroup
          options={alignmentOptions}
          defaultValue="left"
          disabled
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Individual Items Disabled</h3>
        <ToggleGroup
          options={[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled', disabled: true },
            { label: 'Enabled', value: 'enabled2' },
            { label: 'Disabled', value: 'disabled2', disabled: true },
          ]}
          defaultValue="enabled"
        />
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Full Width Toggle Group</h3>
      <ToggleGroup
        options={basicOptions}
        fullWidth
        defaultValue="opt1"
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('left')
    const [multipleValue, setMultipleValue] = useState<string[]>(['bold'])

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Single Selection (Controlled)</h3>
          <ToggleGroup
            options={alignmentOptions}
            value={singleValue}
            onChange={(value) => setSingleValue(value as string)}
          />
          <p className="text-sm text-text-secondary mt-2">Selected: {singleValue}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Multiple Selection (Controlled)</h3>
          <ToggleGroup
            options={formattingOptions}
            value={multipleValue}
            onChange={(value) => setMultipleValue(value as string[])}
            multiple
          />
          <p className="text-sm text-text-secondary mt-2">
            Selected: {multipleValue.length > 0 ? multipleValue.join(', ') : 'none'}
          </p>
        </div>
      </div>
    )
  },
}

export const TextEditorExample: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left')
    const [formatting, setFormatting] = useState<string[]>([])

    return (
      <div className="space-y-6 max-w-2xl">
        <h3 className="text-lg font-semibold">Text Editor Toolbar</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Alignment</label>
            <ToggleGroup
              options={alignmentOptions}
              value={alignment}
              onChange={(value) => setAlignment(value as string)}
              color="primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Formatting</label>
            <ToggleGroup
              options={formattingOptions}
              value={formatting}
              onChange={(value) => setFormatting(value as string[])}
              multiple
              color="accent"
            />
          </div>
          <div className="p-4 border border-border rounded-md bg-surface">
            <p className="text-sm">
              <strong>Alignment:</strong> {alignment}
            </p>
            <p className="text-sm">
              <strong>Formatting:</strong> {formatting.length > 0 ? formatting.join(', ') : 'none'}
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const ViewModeExample: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('grid')

    const viewOptions = [
      { label: 'List', value: 'list' },
      { label: 'Grid', value: 'grid' },
      { label: 'Table', value: 'table' },
    ]

    return (
      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">View Mode</h3>
          <ToggleGroup
            options={viewOptions}
            value={viewMode}
            onChange={(value) => setViewMode(value as string)}
            color="primary"
            size="sm"
          />
        </div>
        <div className="p-6 border border-border rounded-md bg-surface text-center">
          <p className="text-text-secondary">Current view: <strong>{viewMode}</strong></p>
        </div>
      </div>
    )
  },
}

export const FilterExample: Story = {
  render: () => {
    const [statusFilters, setStatusFilters] = useState<string[]>(['active'])

    const statusOptions = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Completed', value: 'completed' },
    ]

    return (
      <div className="space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold">Status Filters</h3>
        <ToggleGroup
          options={statusOptions}
          value={statusFilters}
          onChange={(value) => setStatusFilters(value as string[])}
          multiple
          color="info"
          variant="soft"
        />
        <div className="p-4 border border-border rounded-md bg-surface">
          <p className="text-sm">
            <strong>Active filters:</strong> {statusFilters.length > 0 ? statusFilters.join(', ') : 'none'}
          </p>
        </div>
      </div>
    )
  },
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-6">
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
                      <ToggleGroup
                        options={[
                          { label: 'A', value: 'a' },
                          { label: 'B', value: 'b' },
                          { label: 'C', value: 'c' },
                        ]}
                        color={color}
                        size={size}
                        defaultValue="b"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
}

