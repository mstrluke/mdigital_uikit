import type { Meta, StoryObj } from '@storybook/react'
import { Search, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'
import FloatInput from './index'

const meta: Meta<typeof FloatInput> = {
  title: 'Data Entry/FloatInput',
  component: FloatInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
  },
}

export default meta
type Story = StoryObj<typeof FloatInput>

export const Primary: Story = {
  args: {
    label: 'Email',
    placeholder: ' ',
    size: 'md',
  },
}

export const WithValue: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput label="SKU" defaultValue="12345342312" />
      <FloatInput label="Product Name" defaultValue="Example Product" />
      <FloatInput label="Email Address" defaultValue="user@example.com" type="email" />
    </div>
  ),
}

export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="flex flex-col gap-4 max-w-md">
        <FloatInput
          label="Type to see the label animate"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-sm text-text-secondary">
          Current value: {value || '(empty)'}
        </p>
      </div>
    )
  },
}

export const WithLeftIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput label="Search" leftIcon={<Search size={16} />} />
      <FloatInput label="Email" leftIcon={<Mail size={16} />} type="email" />
      <FloatInput label="Password" leftIcon={<Lock size={16} />} type="password" />
      <FloatInput label="Username" leftIcon={<User size={16} />} />
    </div>
  ),
}

export const WithRightIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput label="Search" rightIcon={<Search size={16} />} />
      <FloatInput label="Email" rightIcon={<Mail size={16} />} type="email" />
      <FloatInput label="Username" rightIcon={<User size={16} />} />
    </div>
  ),
}

export const WithBothIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput label="Search" leftIcon={<Search size={16} />} rightIcon={<Mail size={16} />} />
      <FloatInput label="Email" leftIcon={<Mail size={16} />} rightIcon={<Lock size={16} />} type="email" />
    </div>
  ),
}

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput label="Extra Small" leftIcon={<Search size={12} />} rightIcon={<Mail size={12} />} size="xs" />
      <FloatInput label="Small" leftIcon={<Search size={14} />} rightIcon={<Mail size={14} />} size="sm" />
      <FloatInput label="Medium" leftIcon={<Search size={16} />} rightIcon={<Mail size={16} />} size="md" />
      <FloatInput label="Large" leftIcon={<Search size={20} />} rightIcon={<Mail size={20} />} size="lg" />
    </div>
  ),
}

export const Clearable: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput
        label="SKU"
        clearable
        defaultValue="12345342312"
      />
      <FloatInput
        label="Search"
        leftIcon={<Search size={16} />}
        clearable
        defaultValue="Search term"
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FloatInput
        label="Success"
        success="Input is valid!"
        defaultValue="valid@email.com"
        type="email"
      />
      <FloatInput
        label="Error"
        error="This field is required"
      />
      <FloatInput
        label="Warning"
        warning="This value might be incorrect"
        defaultValue="suspicious value"
      />
      <FloatInput
        label="Info"
        info="Please use lowercase letters only"
        defaultValue="UPPERCASE"
      />
    </div>
  ),
}

export const ComplexExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <FloatInput
        label="Email Address"
        type="email"
        leftIcon={<Mail size={16} />}
        clearable
        helperText="We'll send confirmation to this email"
        required
      />
      <FloatInput
        label="Password"
        type="password"
        leftIcon={<Lock size={16} />}
        clearable
        helperText="Must contain at least 8 characters"
        required
      />
      <FloatInput
        label="Product SKU"
        clearable
        defaultValue="12345342312"
        helperText="Unique product identifier"
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      sku: '12345342312',
      name: '',
      email: '',
      password: '',
    })

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    return (
      <div className="flex flex-col gap-6 max-w-md">
        <FloatInput
          label="Product SKU"
          value={formData.sku}
          onChange={handleChange('sku')}
          clearable
          required
        />
        <FloatInput
          label="Product Name"
          value={formData.name}
          onChange={handleChange('name')}
          clearable
          required
        />
        <FloatInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          leftIcon={<Mail size={16} />}
          clearable
          required
        />
        <FloatInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          leftIcon={<Lock size={16} />}
          clearable
          required
        />
      </div>
    )
  },
}
