import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Autocomplete from './index'

const meta: Meta<typeof Autocomplete> = {
  title: 'Data Entry/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew']

export const Default: Story = {
  args: {
    options: fruits,
    placeholder: 'Search fruits...',
    label: 'Fruit',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div className="space-y-2 max-w-sm">
        <Autocomplete
          options={fruits}
          value={value}
          onChange={setValue}
          label="Fruit"
          placeholder="Type to search..."
          clearable
        />
        <p className="text-xs text-text-secondary">Value: "{value}"</p>
      </div>
    )
  },
}

export const WithObjectOptions: Story = {
  render: () => {
    const countries = [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Japan', value: 'jp' },
      { label: 'Australia', value: 'au' },
      { label: 'Canada', value: 'ca' },
      { label: 'Brazil', value: 'br' },
    ]

    return (
      <Autocomplete
        options={countries}
        label="Country"
        placeholder="Search countries..."
        clearable
        className="max-w-sm"
      />
    )
  },
}

export const WithHelperAndError: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Autocomplete
        options={fruits}
        label="With helper text"
        helperText="Start typing to see suggestions"
        placeholder="Search..."
      />
      <Autocomplete
        options={fruits}
        label="With error"
        error="This field is required"
        placeholder="Search..."
      />
    </div>
  ),
}

export const CustomFilter: Story = {
  render: () => {
    const filter = (query: string, option: { label: string; value: string }) =>
      option.label.toLowerCase().startsWith(query.toLowerCase())

    return (
      <Autocomplete
        options={fruits}
        label="Starts-with filter"
        placeholder="Type to filter..."
        filter={filter}
        className="max-w-sm"
      />
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Autocomplete
          key={size}
          options={fruits}
          size={size}
          placeholder={`Size: ${size}`}
          label={size.toUpperCase()}
        />
      ))}
    </div>
  ),
}

export const Loading: Story = {
  args: {
    options: fruits,
    placeholder: 'Loading...',
    label: 'Fruit',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    options: fruits,
    placeholder: 'Disabled',
    label: 'Fruit',
    disabled: true,
    defaultValue: 'Apple',
  },
}

export const ManyOptions: Story = {
  render: () => {
    const cities = Array.from({ length: 200 }, (_, i) => `City ${i + 1}`)

    return (
      <Autocomplete
        options={cities}
        label="City"
        placeholder="Search 200 cities..."
        limit={15}
        clearable
        className="max-w-sm"
      />
    )
  },
}
