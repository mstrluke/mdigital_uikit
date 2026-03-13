import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Checkbox from './index'

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
      description: 'Visual variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  args: {
    label: 'Checkbox',
    color: 'primary',
    size: 'md',
  },
}


export const Variants: Story = {
  render: () => {
    const variants = ['solid', 'outline', 'soft'] as const
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'] as const

    return (
      <div className="space-y-6">
        {variants.map(variant => (
          <div key={variant}>
            <p className="text-sm font-medium text-text-secondary mb-2 capitalize">{variant}</p>
            <div className="flex items-center gap-6">
              {colors.map(color => (
                <Checkbox key={color} variant={variant} color={color} label={color} defaultChecked />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="I agree to the terms and conditions" />
      <Checkbox label="Subscribe to newsletter" defaultChecked />
      <Checkbox label="Remember me" />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Enable notifications"
        helperText="You will receive email notifications"
      />
      <Checkbox
        label="Two-factor authentication"
        helperText="Adds an extra layer of security"
        defaultChecked
      />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Accept terms" error="You must accept the terms" />
      <Checkbox
        label="Confirm age"
        error="Must be 18 or older"
        helperText="This field is required"
      />
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState([false, false, false])
    const allChecked = checked.every(Boolean)
    const isIndeterminate = checked.some(Boolean) && !allChecked

    return (
      <div className="flex flex-col gap-4">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => {
            const newValue = e.target.checked
            setChecked([newValue, newValue, newValue])
          }}
        />
        <div className="ml-6 flex flex-col gap-2">
          <Checkbox
            label="Option 1"
            checked={checked[0]}
            onChange={(e) => setChecked([e.target.checked, checked[1], checked[2]])}
          />
          <Checkbox
            label="Option 2"
            checked={checked[1]}
            onChange={(e) => setChecked([checked[0], e.target.checked, checked[2]])}
          />
          <Checkbox
            label="Option 3"
            checked={checked[2]}
            onChange={(e) => setChecked([checked[0], checked[1], e.target.checked])}
          />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled label="Disabled checked" defaultChecked />
      <Checkbox disabled indeterminate label="Disabled indeterminate" defaultChecked />
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                {sizes.map(size => (
                  <th key={size} className="p-2 text-center text-sm text-gray-500" colSpan={2}>{size}</th>
                ))}
              </tr>
              <tr>
                <th className="p-2"></th>
                {sizes.map(size => (
                  <>
                    <th key={`${size}-unchecked`} className="p-2 text-center text-xs text-gray-400">unchecked</th>
                    <th key={`${size}-checked`} className="p-2 text-center text-xs text-gray-400">checked</th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map(color => (
                <tr key={color}>
                  <td className="p-2 text-sm font-medium">{color}</td>
                  {sizes.map(size => (
                    <>
                      <td key={`${size}-unchecked`} className="p-2">
                        <Checkbox color={color} size={size} label={color} />
                      </td>
                      <td key={`${size}-checked`} className="p-2">
                        <Checkbox color={color} size={size} label={color} defaultChecked />
                      </td>
                    </>
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

