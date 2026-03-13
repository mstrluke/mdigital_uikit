import type { Meta, StoryObj } from '@storybook/react'
import Textarea from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Data Entry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Textarea size',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto resize based on content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width textarea',
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Primary: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'outline',
    size: 'md',
  },
}


export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea label="Description" placeholder="Enter description" />
      <Textarea label="Comments" placeholder="Add your comments" required />
    </div>
  ),
}

export const AutoResize: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea
        autoResize
        label="Auto Resize"
        placeholder="Type to see auto resize..."
        defaultValue="This textarea automatically grows with content."
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Success"
        placeholder="Valid input"
        success="Looks good!"
        defaultValue="This is valid content"
      />
      <Textarea
        label="Error"
        placeholder="Invalid input"
        error="This field is required"
      />
      <Textarea
        label="Warning"
        placeholder="Warning input"
        warning="Please check your input"
      />
      <Textarea
        label="Info"
        placeholder="Info input"
        info="Maximum 500 characters"
      />
    </div>
  ),
}

export const WithCharacterCount: Story = {
  render: () => (
    <Textarea
      label="Article Content"
      placeholder="Write your article"
      maxLength={500}
      showCount
      defaultValue="Start writing..."
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <Textarea
      disabled
      label="Disabled with label"
      placeholder="Cannot interact"
      defaultValue="Disabled content"
    />
  ),
}

export const ComplexExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Textarea
        label="Article Content"
        placeholder="Write your article here..."
        autoResize
        maxLength={1000}
        showCount
        helperText="Markdown formatting supported"
        required
      />
      <Textarea
        label="Additional Notes"
        placeholder="Add any additional notes"
        resize="vertical"
        helperText="Optional field for extra information"
      />
    </div>
  ),
}
