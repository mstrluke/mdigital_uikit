import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Select from './index'
import type { SelectOption } from './types'

const meta: Meta<typeof Select> = {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Select size',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
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
      description: 'Full width select',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

// Sample data sets
const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
]

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
]

const groupedOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'orange', label: 'Orange', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
  { value: 'spinach', label: 'Spinach', group: 'Vegetables' },
  { value: 'chicken', label: 'Chicken', group: 'Protein' },
  { value: 'beef', label: 'Beef', group: 'Protein' },
  { value: 'fish', label: 'Fish', group: 'Protein' },
]

const optionsWithDisabled: SelectOption[] = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Available Option 2' },
  { value: 'option4', label: 'Another Disabled', disabled: true },
  { value: 'option5', label: 'Available Option 3' },
]

// Generate large dataset for virtualization
const largeOptions: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}))

export const Primary: Story = {
  args: {
    placeholder: 'Select an option',
    options: basicOptions,
    size: 'md',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Choose a fruit"
        placeholder="Select fruit"
        options={basicOptions}
      />
      <Select
        label="Country"
        placeholder="Select country"
        options={countryOptions}
        required
      />
    </div>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Search countries"
        placeholder="Type to search..."
        options={countryOptions}
        helperText="Click and start typing to filter options"
      />
    </div>
  ),
}

export const Clearable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Clearable select"
        placeholder="Select an option"
        options={basicOptions}
        defaultValue="banana"
        clearable
        helperText="Click the X icon to clear selection"
      />
    </div>
  ),
}

export const GroupedOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Food categories"
        placeholder="Select food"
        options={groupedOptions}
        helperText="Options are grouped by category"
      />
    </div>
  ),
}

export const WithDisabledOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Select option"
        placeholder="Some options are disabled"
        options={optionsWithDisabled}
        helperText="Try selecting the disabled options"
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Success state"
        placeholder="Select option"
        options={basicOptions}
        defaultValue="apple"
        success="Great choice!"
      />
      <Select
        label="Error state"
        placeholder="Select option"
        options={basicOptions}
        error="This field is required"
      />
    </div>
  ),
}

export const KeyboardScrollDemo: Story = {
  name: 'Keyboard Navigation (Scroll into View)',
  render: () => {
    const manyOptions: SelectOption[] = Array.from({ length: 30 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}${i === 0 ? ' (start)' : i === 29 ? ' (end)' : ''}`,
    }))

    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <p className="text-sm text-text-secondary">
          Open the dropdown, then use <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-xs">↑</kbd> <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-xs">↓</kbd> arrow keys — the highlighted option scrolls into view.
        </p>
        <Select
          label="30 Options"
          placeholder="Open and press arrow keys"
          options={manyOptions}
        />
      </div>
    )
  },
}

export const VirtualizedList: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        label="Large dataset (1000 items)"
        placeholder="Search through 1000 items"
        options={largeOptions}
        helperText="Uses virtualization for optimal performance"
        virtualizeThreshold={50}
      />
    </div>
  ),
}

export const ControlledExample: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('')

    return (
      <div className="flex flex-col gap-4">
        <Select
          label="Controlled select"
          placeholder="Select an option"
          options={basicOptions}
          value={value}
          onChange={setValue}
          helperText="Current value is controlled by React state"
        />
        <div className="p-4 bg-surface rounded-md">
          <p className="text-sm text-text-secondary">
            Selected value: <span className="font-mono text-primary">{value || 'none'}</span>
          </p>
          <button
            type="button"
            onClick={() => setValue('orange')}
            className="mt-2 px-3 py-1 bg-primary text-background rounded text-sm"
          >
            Set to Orange
          </button>
        </div>
      </div>
    )
  },
}

export const ComplexExample: Story = {
  render: function ComplexSelect() {
    const [country, setCountry] = useState('')
    const [food, setFood] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCountryChange = (value: string) => {
      setCountry(value)
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => setIsLoading(false), 1000)
    }

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Select
          label="Select your country"
          placeholder="Choose country"
          options={countryOptions}
          value={country}
          onChange={handleCountryChange}
          clearable
          required
          helperText="Select your country of residence"
        />
        <Select
          label="Favorite food"
          placeholder="Choose food category"
          options={groupedOptions}
          value={food}
          onChange={setFood}
          clearable
          loading={isLoading}
          disabled={!country}
          helperText={
            !country
              ? 'Please select a country first'
              : isLoading
                ? 'Loading food options...'
                : 'Select your favorite food'
          }
          error={country && !food ? 'Please select a food option' : undefined}
        />
        {country && food && (
          <div className="p-4 bg-surface rounded-md">
            <h3 className="font-semibold text-text-primary mb-2">Selection Summary</h3>
            <p className="text-sm text-text-secondary">
              Country:{' '}
              <span className="font-mono text-primary">
                {countryOptions.find((o) => o.value === country)?.label}
              </span>
            </p>
            <p className="text-sm text-text-secondary">
              Food:{' '}
              <span className="font-mono text-primary">
                {groupedOptions.find((o) => o.value === food)?.label}
              </span>
            </p>
          </div>
        )}
      </div>
    )
  },
}
