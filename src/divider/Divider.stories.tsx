import type { Meta, StoryObj } from '@storybook/react'
import Divider from './index'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The visual style of the divider line',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color for the divider',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of the label text within the divider',
    },
    children: {
      control: 'text',
      description: 'Optional label text to display within the divider',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Primary: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
}

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>Content above</div>
      <Divider />
      <div>Content below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 h-24">
      <div>Left content</div>
      <Divider orientation="vertical" />
      <div>Middle content</div>
      <Divider orientation="vertical" />
      <div>Right content</div>
    </div>
  ),
}


export const WithText: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-sm font-semibold mb-4">Center Aligned (Default)</h3>
        <Divider>Section Title</Divider>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Left Aligned</h3>
        <Divider textAlign="left">Options</Divider>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Right Aligned</h3>
        <Divider textAlign="right">End Section</Divider>
      </div>
    </div>
  ),
}


export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-sm font-semibold mb-4">Content Sections</h3>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Divider />
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Form Sections</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <Divider>Contact Information</Divider>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Vertical Menu Separator</h3>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm hover:text-primary">
            Home
          </button>
          <Divider orientation="vertical" className="h-6" />
          <button className="px-4 py-2 text-sm hover:text-primary">
            About
          </button>
          <Divider orientation="vertical" className="h-6" />
          <button className="px-4 py-2 text-sm hover:text-primary">
            Contact
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">List Separator</h3>
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="font-medium">Item 1</h4>
            <p className="text-sm text-text-secondary">Description for item 1</p>
          </div>
          <Divider variant="dashed" />
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="font-medium">Item 2</h4>
            <p className="text-sm text-text-secondary">Description for item 2</p>
          </div>
          <Divider variant="dashed" />
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="font-medium">Item 3</h4>
            <p className="text-sm text-text-secondary">Description for item 3</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Section Headers</h3>
        <div className="space-y-6">
          <div>
            <Divider textAlign="left" variant="solid">
              Personal Information
            </Divider>
            <div className="mt-4 space-y-2">
              <p className="text-sm">Name: John Doe</p>
              <p className="text-sm">Age: 30</p>
            </div>
          </div>
          <div>
            <Divider textAlign="left" variant="solid">
              Professional Details
            </Divider>
            <div className="mt-4 space-y-2">
              <p className="text-sm">Position: Senior Developer</p>
              <p className="text-sm">Experience: 8 years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ColorMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    return (
      <div className="space-y-4 p-4">
        {colors.map((color) => (
          <div key={color}>
            <p className="text-xs text-text-secondary mb-2 capitalize">{color}</p>
            <Divider color={color} />
          </div>
        ))}
      </div>
    )
  },
}

