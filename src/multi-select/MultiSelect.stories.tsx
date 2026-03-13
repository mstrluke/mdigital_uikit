import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import MultiSelect from './index'
import type { MultiSelectOption } from './types'

const meta: Meta<typeof MultiSelect> = {
  title: 'Data Entry/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'MultiSelect size',
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
      description: 'Show clear all button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width multi-select',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    maxChipsVisible: {
      control: 'number',
      description: 'Maximum number of chips to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof MultiSelect>

// Sample data sets
const basicOptions: MultiSelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'watermelon', label: 'Watermelon' },
]

const skillOptions: MultiSelectOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
]

const groupedOptions: MultiSelectOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'orange', label: 'Orange', group: 'Fruits' },
  { value: 'grape', label: 'Grape', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
  { value: 'spinach', label: 'Spinach', group: 'Vegetables' },
  { value: 'tomato', label: 'Tomato', group: 'Vegetables' },
  { value: 'chicken', label: 'Chicken', group: 'Protein' },
  { value: 'beef', label: 'Beef', group: 'Protein' },
  { value: 'fish', label: 'Fish', group: 'Protein' },
  { value: 'tofu', label: 'Tofu', group: 'Protein' },
  { value: 'milk', label: 'Milk', group: 'Dairy' },
  { value: 'cheese', label: 'Cheese', group: 'Dairy' },
  { value: 'yogurt', label: 'Yogurt', group: 'Dairy' },
]

const optionsWithDisabled: MultiSelectOption[] = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Available Option 2' },
  { value: 'option4', label: 'Another Disabled', disabled: true },
  { value: 'option5', label: 'Available Option 3' },
  { value: 'option6', label: 'Available Option 4' },
]

const countryOptions: MultiSelectOption[] = [
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
  { value: 'mx', label: 'Mexico' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
]

// Generate large dataset for virtualization
const largeOptions: MultiSelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}))

export const Default: Story = {
  args: {
    placeholder: 'Select options',
    options: basicOptions,
    size: 'md',
  },
}

export const WithSearch: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MultiSelect
        label="Search and select"
        placeholder="Type to search..."
        options={skillOptions}
        helperText="Click and start typing to filter options"
      />
    </div>
  ),
}

export const GroupedOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MultiSelect
        label="Food categories"
        placeholder="Select food items"
        options={groupedOptions}
        helperText="Options are grouped by category"
      />
      <MultiSelect
        label="Pre-selected grouped items"
        placeholder="Select food items"
        options={groupedOptions}
        defaultValue={['apple', 'carrot', 'chicken', 'milk']}
      />
    </div>
  ),
}

export const MaxChipsVisible: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MultiSelect
        label="Max 2 chips visible"
        placeholder="Select options"
        options={basicOptions}
        defaultValue={['apple', 'banana', 'orange', 'grape', 'mango']}
        maxChipsVisible={2}
        helperText="Only 2 chips shown, rest displayed as +N"
      />
      <MultiSelect
        label="Max 1 chip visible"
        placeholder="Select options"
        options={skillOptions}
        defaultValue={['js', 'ts', 'react', 'vue', 'node']}
        maxChipsVisible={1}
      />
    </div>
  ),
}

export const VirtualizedList: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MultiSelect
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
  render: function ControlledMultiSelect() {
    const [value, setValue] = useState<string[]>([])

    return (
      <div className="flex flex-col gap-4">
        <MultiSelect
          label="Controlled multi-select"
          placeholder="Select options"
          options={basicOptions}
          value={value}
          onChange={setValue}
          helperText="Values are controlled by React state"
        />
        <div className="p-4 bg-surface rounded-md">
          <p className="text-sm text-text-secondary mb-2">
            Selected values ({value.length}):
          </p>
          {value.length === 0 ? (
            <p className="text-sm text-text-muted">None selected</p>
          ) : (
            <div className="flex flex-wrap gap-1">
              {value.map((val) => (
                <span
                  key={val}
                  className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-mono"
                >
                  {val}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => setValue(['apple', 'banana', 'orange'])}
              className="px-3 py-1 bg-primary text-background rounded text-sm"
            >
              Set Fruits
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

export const FormIntegration: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        console.log('Form data:', Object.fromEntries(formData))
        alert('Form submitted! Check console for data.')
      }}
      className="flex flex-col gap-4 max-w-md"
    >
      <MultiSelect
        label="Required skills"
        placeholder="Select skills"
        options={skillOptions}
        required
        helperText="Select at least one skill (required)"
      />
      <MultiSelect
        label="Preferred countries"
        placeholder="Select countries"
        options={countryOptions}
        clearable
        helperText="Optional field"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-background rounded hover:bg-primary/90"
      >
        Submit Form
      </button>
    </form>
  ),
}

export const ComplexExample: Story = {
  render: function ComplexMultiSelect() {
    const [skills, setSkills] = useState<string[]>([])
    const [countries, setCountries] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSummary, setShowSummary] = useState(false)

    const handleSkillsChange = (value: string[]) => {
      setSkills(value)
      if (value.length >= 3) {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setShowSummary(true)
        }, 800)
      } else {
        setShowSummary(false)
      }
    }

    const hasMinimumSkills = skills.length >= 3
    const hasMinimumCountries = countries.length >= 2

    return (
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="p-4 bg-surface rounded-md border border-border">
          <h3 className="font-semibold text-text-primary mb-2">Instructions</h3>
          <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
            <li>Select at least 3 programming skills</li>
            <li>Select at least 2 countries you'd like to work in</li>
            <li>Both fields must meet requirements to continue</li>
          </ul>
        </div>

        <MultiSelect
          label="Programming skills"
          placeholder="Select your skills"
          options={skillOptions}
          value={skills}
          onChange={handleSkillsChange}
          clearable
          maxChipsVisible={4}
          required
          success={hasMinimumSkills ? 'Minimum requirement met' : undefined}
          error={skills.length > 0 && !hasMinimumSkills ? 'Select at least 3 skills' : undefined}
          helperText={
            skills.length === 0
              ? 'Select at least 3 skills'
              : `${skills.length} selected (minimum 3 required)`
          }
        />

        <MultiSelect
          label="Preferred work locations"
          placeholder="Select countries"
          options={countryOptions}
          value={countries}
          onChange={setCountries}
          clearable
          maxChipsVisible={3}
          loading={isLoading}
          disabled={!hasMinimumSkills}
          required
          success={hasMinimumCountries ? 'Looks good!' : undefined}
          warning={countries.length === 1 ? 'Add at least one more country' : undefined}
          helperText={
            !hasMinimumSkills
              ? 'Complete skills selection first'
              : isLoading
                ? 'Loading location options...'
                : countries.length === 0
                  ? 'Select at least 2 countries'
                  : `${countries.length} selected (minimum 2 required)`
          }
        />

        {showSummary && hasMinimumSkills && hasMinimumCountries && (
          <div className="p-4 bg-success/10 border border-success rounded-md">
            <h3 className="font-semibold text-success mb-3">Profile Complete</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-muted uppercase mb-1">Skills ({skills.length})</p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => {
                    const option = skillOptions.find((o) => o.value === skill)
                    return (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {option?.label}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase mb-1">
                  Locations ({countries.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {countries.map((country) => {
                    const option = countryOptions.find((o) => o.value === country)
                    return (
                      <span
                        key={country}
                        className="px-2 py-1 bg-accent/10 text-accent rounded text-xs"
                      >
                        {option?.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full px-4 py-2 bg-success text-background rounded hover:bg-success/90"
            >
              Submit Application
            </button>
          </div>
        )}
      </div>
    )
  },
}
