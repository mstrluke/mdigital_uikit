import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import NumberInput from '.'

const meta = {
  title: 'Data Entry/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    controlsPosition: {
      control: 'select',
      options: ['right', 'sides'],
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: 'Enter a number',
  },
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    placeholder: 'Value between 0 and 100',
  },
}

export const WithStep: Story = {
  args: {
    step: 0.1,
    defaultValue: 0,
    placeholder: 'Step by 0.1',
    label: 'Decimals',
  },
}

export const ControlsOnSides: Story = {
  args: {
    controlsPosition: 'sides',
    defaultValue: 5,
    placeholder: 'Controls on sides',
  },
}

export const WithValidation: Story = {
  args: {
    label: 'Error Example',
    defaultValue: 10,
    error: 'Value is too low',
  },
}

export const ValidationStates: Story = {
  name: 'All Validation States (Border Consistency)',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <NumberInput label="Default" defaultValue={10} />
      <NumberInput label="Error" defaultValue={10} error="Value is too low" />
      <NumberInput label="Warning" defaultValue={10} warning="Value seems unusual" />
      <NumberInput label="Success" defaultValue={10} success="Value is valid" />
      <NumberInput label="Info" defaultValue={10} info="Enter a value between 0-100" />
      <NumberInput label="Error (sides)" defaultValue={10} error="Invalid" controlsPosition="sides" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 42,
    placeholder: 'Disabled input',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(10)

    return (
      <div className="flex flex-col gap-4 w-64">
        <NumberInput
          label="Controlled Input"
          value={value}
          onChange={setValue}
          min={0}
          max={100}
        />
        <div className="text-sm text-text-secondary">
          Current value: <span className="font-mono font-bold">{value ?? 'undefined'}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
          >
            Set to 0
          </button>
          <button
            onClick={() => setValue(50)}
            className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
          >
            Set to 50
          </button>
          <button
            onClick={() => setValue(100)}
            className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
          >
            Set to 100
          </button>
        </div>
      </div>
    )
  },
}

export const WithLoading: Story = {
  args: {
    loading: true,
    defaultValue: 42,
    placeholder: 'Loading...',
  },
}

export const Complex: Story = {
  render: () => {
    const [price, setPrice] = useState<number | undefined>(19.99)
    const [quantity, setQuantity] = useState<number | undefined>(1)
    const total = price && quantity ? price * quantity : 0

    return (
      <div className="flex flex-col gap-4 w-80 p-6 bg-surface rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-text-primary">Order Form</h3>

        <NumberInput
          label="Price"
          value={price}
          onChange={setPrice}
          min={0}
          step={0.01}
          precision={2}
          placeholder="0.00"
          required
        />

        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={999}
          controlsPosition="sides"
          required
        />

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-secondary">Total:</span>
            <span className="text-xl font-bold text-text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    )
  },
}
