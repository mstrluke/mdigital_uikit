import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Cascader from './index'
import type { CascaderOption } from './types'

const meta: Meta<typeof Cascader> = {
  title: 'Data Entry/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Cascader size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Color variant',
    },
    placement: {
      control: 'select',
      options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
      description: 'Dropdown placement relative to trigger',
    },
    expandTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How to expand child options',
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
    multiple: {
      control: 'boolean',
      description: 'Multiple selection mode',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width cascader',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected',
    },
    showPath: {
      control: 'boolean',
      description: 'Show full path in selection display',
    },
    changeOnSelect: {
      control: 'boolean',
      description: 'Allow selecting parent nodes (not just leaves)',
    },
    maxTagCount: {
      control: 'number',
      description: 'Maximum number of tags visible in multiple mode',
    },
    pathSeparator: {
      control: 'text',
      description: 'Path separator for display',
    },
  },
}

export default meta
type Story = StoryObj<typeof Cascader>

// Sample nested data
const locationOptions: CascaderOption[] = [
  {
    value: 'north-america',
    label: 'North America',
    children: [
      {
        value: 'usa',
        label: 'United States',
        children: [
          { value: 'california', label: 'California' },
          { value: 'texas', label: 'Texas' },
          { value: 'new-york', label: 'New York' },
          { value: 'florida', label: 'Florida' },
        ],
      },
      {
        value: 'canada',
        label: 'Canada',
        children: [
          { value: 'ontario', label: 'Ontario' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'british-columbia', label: 'British Columbia' },
        ],
      },
      {
        value: 'mexico',
        label: 'Mexico',
        children: [
          { value: 'mexico-city', label: 'Mexico City' },
          { value: 'guadalajara', label: 'Guadalajara' },
        ],
      },
    ],
  },
  {
    value: 'europe',
    label: 'Europe',
    children: [
      {
        value: 'uk',
        label: 'United Kingdom',
        children: [
          { value: 'london', label: 'London' },
          { value: 'manchester', label: 'Manchester' },
          { value: 'edinburgh', label: 'Edinburgh' },
        ],
      },
      {
        value: 'germany',
        label: 'Germany',
        children: [
          { value: 'berlin', label: 'Berlin' },
          { value: 'munich', label: 'Munich' },
          { value: 'hamburg', label: 'Hamburg' },
        ],
      },
      {
        value: 'france',
        label: 'France',
        children: [
          { value: 'paris', label: 'Paris' },
          { value: 'lyon', label: 'Lyon' },
          { value: 'marseille', label: 'Marseille' },
        ],
      },
    ],
  },
  {
    value: 'asia',
    label: 'Asia',
    children: [
      {
        value: 'china',
        label: 'China',
        children: [
          { value: 'beijing', label: 'Beijing' },
          { value: 'shanghai', label: 'Shanghai' },
          { value: 'guangzhou', label: 'Guangzhou' },
        ],
      },
      {
        value: 'japan',
        label: 'Japan',
        children: [
          { value: 'tokyo', label: 'Tokyo' },
          { value: 'osaka', label: 'Osaka' },
          { value: 'kyoto', label: 'Kyoto' },
        ],
      },
    ],
  },
]

const categoryOptions: CascaderOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'computers',
        label: 'Computers',
        children: [
          { value: 'laptops', label: 'Laptops' },
          { value: 'desktops', label: 'Desktops' },
          { value: 'tablets', label: 'Tablets' },
        ],
      },
      {
        value: 'phones',
        label: 'Phones',
        children: [
          { value: 'smartphones', label: 'Smartphones' },
          { value: 'feature-phones', label: 'Feature Phones' },
        ],
      },
      {
        value: 'accessories',
        label: 'Accessories',
        children: [
          { value: 'headphones', label: 'Headphones' },
          { value: 'chargers', label: 'Chargers' },
          { value: 'cables', label: 'Cables' },
        ],
      },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      {
        value: 'mens',
        label: "Men's",
        children: [
          { value: 'mens-shirts', label: 'Shirts' },
          { value: 'mens-pants', label: 'Pants' },
          { value: 'mens-shoes', label: 'Shoes' },
        ],
      },
      {
        value: 'womens',
        label: "Women's",
        children: [
          { value: 'womens-dresses', label: 'Dresses' },
          { value: 'womens-tops', label: 'Tops' },
          { value: 'womens-shoes', label: 'Shoes' },
        ],
      },
    ],
  },
  {
    value: 'books',
    label: 'Books',
    children: [
      {
        value: 'fiction',
        label: 'Fiction',
        children: [
          { value: 'scifi', label: 'Science Fiction' },
          { value: 'mystery', label: 'Mystery' },
          { value: 'romance', label: 'Romance' },
        ],
      },
      {
        value: 'nonfiction',
        label: 'Non-Fiction',
        children: [
          { value: 'biography', label: 'Biography' },
          { value: 'history', label: 'History' },
          { value: 'science', label: 'Science' },
        ],
      },
    ],
  },
]

const optionsWithDisabled: CascaderOption[] = [
  {
    value: 'available',
    label: 'Available Category',
    children: [
      { value: 'item1', label: 'Available Item 1' },
      { value: 'item2', label: 'Disabled Item', disabled: true },
      { value: 'item3', label: 'Available Item 2' },
    ],
  },
  {
    value: 'disabled-category',
    label: 'Disabled Category',
    disabled: true,
    children: [
      { value: 'item4', label: 'Item 4' },
      { value: 'item5', label: 'Item 5' },
    ],
  },
]

const simpleNestedOptions: CascaderOption[] = [
  {
    value: 'fruits',
    label: 'Fruits',
    children: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    children: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
]

export const Default: Story = {
  args: {
    placeholder: 'Please select',
    options: simpleNestedOptions,
    size: 'md',
  },
}

export const NestedNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Cascader
        label="Location selector"
        placeholder="Select your location"
        options={locationOptions}
        helperText="Navigate through continents → countries → cities"
      />
    </div>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Cascader
        label="Select multiple locations"
        placeholder="Choose locations"
        options={locationOptions}
        multiple
        helperText="You can select multiple items at any level"
      />
      <Cascader
        label="Select multiple categories"
        placeholder="Choose categories"
        options={categoryOptions}
        multiple
        defaultValue={[
          ['electronics', 'computers', 'laptops'],
          ['clothing', 'mens', 'mens-shirts'],
        ]}
        helperText="Pre-selected with default values"
      />
    </div>
  ),
}

export const ExpandTrigger: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Cascader
        label="Hover to expand"
        placeholder="Hover over items"
        options={locationOptions}
        expandTrigger="hover"
        helperText="Options expand on hover instead of click"
      />
      <Cascader
        label="Click to expand (default)"
        placeholder="Click to expand"
        options={locationOptions}
        expandTrigger="click"
        helperText="Options expand on click only"
      />
    </div>
  ),
}

export const ChangeOnSelect: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Cascader
        label="Select parent or leaf"
        placeholder="Select any level"
        options={locationOptions}
        changeOnSelect
        helperText="Can select parent nodes, not just leaves"
      />
      <Cascader
        label="Only leaf selection (default)"
        placeholder="Must select city"
        options={locationOptions}
        changeOnSelect={false}
        helperText="Must navigate to and select a leaf node"
      />
    </div>
  ),
}

export const AsyncLoading: Story = {
  render: function AsyncLoadingCascader() {
    const [options, setOptions] = useState<CascaderOption[]>([
      { value: 'category1', label: 'Category 1', isLeaf: false },
      { value: 'category2', label: 'Category 2', isLeaf: false },
      { value: 'category3', label: 'Category 3', isLeaf: false },
    ])

    const loadData = async (selectedOptions: CascaderOption[]) => {
      const targetOption = selectedOptions[selectedOptions.length - 1]

      // Simulate async loading
      setOptions((prevOptions) =>
        prevOptions.map((opt) =>
          opt.value === targetOption.value ? { ...opt, loading: true } : opt,
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const children: CascaderOption[] = [
        { value: `${targetOption.value}-1`, label: `${targetOption.label} - Item 1` },
        { value: `${targetOption.value}-2`, label: `${targetOption.label} - Item 2` },
        { value: `${targetOption.value}-3`, label: `${targetOption.label} - Item 3` },
      ]

      setOptions((prevOptions) =>
        prevOptions.map((opt) =>
          opt.value === targetOption.value
            ? { ...opt, loading: false, children }
            : opt,
        ),
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <Cascader
          label="Async loading"
          placeholder="Select to load children"
          options={options}
          loadData={loadData}
          helperText="Children are loaded on demand when expanding"
        />
      </div>
    )
  },
}

export const ControlledMode: Story = {
  render: function ControlledCascader() {
    const [value, setValue] = useState<string[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Cascader
          label="Controlled cascader"
          placeholder="Select location"
          options={locationOptions}
          value={value}
          onChange={(val) => setValue(val as string[])}
          helperText="Value is controlled by React state"
        />
        <div className="p-4 bg-surface rounded-md">
          <p className="text-sm text-text-secondary">
            Selected path:{' '}
            <span className="font-mono text-primary">
              {value.length > 0 ? value.join(' → ') : 'none'}
            </span>
          </p>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => setValue(['north-america', 'usa', 'california'])}
              className="px-3 py-1 bg-primary text-background rounded text-sm"
            >
              Set to California
            </button>
            <button
              type="button"
              onClick={() => setValue([])}
              className="px-3 py-1 bg-surface text-text-primary rounded text-sm border border-border"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const ComplexExample: Story = {
  render: function ComplexCascader() {
    const [location, setLocation] = useState<string[]>([])
    const [categories, setCategories] = useState<string[][]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleLocationChange = (value: string[]) => {
      setLocation(value)
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => setIsLoading(false), 800)
    }

    const getLocationLabel = (path: string[]): string => {
      let current = locationOptions
      const labels: string[] = []

      for (const val of path) {
        const option = current.find((opt) => opt.value === val)
        if (option) {
          labels.push(option.label)
          current = option.children || []
        }
      }

      return labels.join(' → ')
    }

    return (
      <div className="flex flex-col gap-4 max-w-2xl">
        <Cascader
          label="Primary location"
          placeholder="Select your location"
          options={locationOptions}
          value={location}
          onChange={(val) => handleLocationChange(val as string[])}
          expandTrigger="hover"
          required
          helperText="Select continent → country → city"
        />
        <Cascader
          label="Product interests (multiple)"
          placeholder="Select product categories"
          options={categoryOptions}
          value={categories}
          onChange={(val) => setCategories(val as string[][])}
          multiple
          loading={isLoading}
          disabled={location.length === 0}
          maxTagCount={3}
          helperText={
            location.length === 0
              ? 'Please select a location first'
              : isLoading
                ? 'Loading categories...'
                : 'Select multiple product categories'
          }
          error={location.length > 0 && categories.length === 0 ? 'Please select at least one category' : undefined}
        />
        {location.length > 0 && categories.length > 0 && (
          <div className="p-4 bg-surface rounded-md border border-border">
            <h3 className="font-semibold text-text-primary mb-3">Selection Summary</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-text-muted uppercase">Location</p>
                <p className="text-sm text-primary font-mono">{getLocationLabel(location)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase">Categories ({categories.length})</p>
                <ul className="list-disc list-inside space-y-1">
                  {categories.map((path, idx) => {
                    let current = categoryOptions
                    const labels: string[] = []

                    for (const val of path) {
                      const option = current.find((opt) => opt.value === val)
                      if (option) {
                        labels.push(option.label)
                        current = option.children || []
                      }
                    }

                    return (
                      <li key={idx} className="text-sm font-mono text-primary">
                        {labels.join(' → ')}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
}
