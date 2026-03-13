import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from './index'

const meta: Meta<typeof DatePicker> = {
  title: 'Data Entry/DatePicker',
  component: DatePicker,
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
      description: 'DatePicker size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width picker',
    },
    messagePosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position of validation messages',
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Primary: Story = {
  args: {
    placeholder: 'Select date...',
    variant: 'outline',
    size: 'md',
  },
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker
        label="Success"
        placeholder="Valid date"
        success="Date is valid!"
        defaultValue={new Date()}
      />
      <DatePicker
        label="Error"
        placeholder="Invalid date"
        error="This field is required"
      />
      <DatePicker
        label="Warning"
        placeholder="Warning date"
        warning="This date might be incorrect"
        defaultValue={new Date()}
      />
    </div>
  ),
}

export const DateConstraints: Story = {
  name: 'Min/Max Date Constraints',
  render: () => {
    const today = new Date()
    const minDate = new Date()
    minDate.setDate(today.getDate() - 7)
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 30)

    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          label="Future Dates Only"
          placeholder="Select future date"
          minDate={today}
          helperText="Only dates from today onwards"
        />
        <DatePicker
          label="Date Range (Last 7 Days to Next 30 Days)"
          placeholder="Select date in range"
          minDate={minDate}
          maxDate={maxDate}
          helperText="Between last week and next month"
        />
      </div>
    )
  },
}

export const AllSizes: Story = {
  name: 'All Sizes (Icon Alignment)',
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker size="xs" label="Extra Small" placeholder="xs" clearable defaultValue={new Date()} />
      <DatePicker size="sm" label="Small" placeholder="sm" clearable defaultValue={new Date()} />
      <DatePicker size="md" label="Medium" placeholder="md" clearable defaultValue={new Date()} />
      <DatePicker size="lg" label="Large" placeholder="lg" clearable defaultValue={new Date()} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <DatePicker
      disabled
      label="Disabled with label"
      placeholder="Cannot interact"
      defaultValue={new Date()}
    />
  ),
}

export const ControlledExample: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          label="Controlled Date Picker"
          placeholder="Select date"
          value={date}
          onChange={setDate}
          clearable
        />
        <div className="text-sm text-text-muted">
          Selected date: {date ? date.toLocaleDateString() : 'None'}
        </div>
        <button
          onClick={() => setDate(new Date())}
          className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary/90 transition-colors"
        >
          Set to Today
        </button>
      </div>
    )
  },
}

export const ComplexExample: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const today = new Date()
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 365)

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={startDate}
          onChange={(date) => {
            setStartDate(date)
            if (endDate && date && endDate < date) {
              setEndDate(null)
            }
          }}
          minDate={today}
          maxDate={maxDate}
          clearable
          helperText="Select a start date for your event"
          required
        />
        <DatePicker
          label="End Date"
          placeholder="Select end date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || today}
          maxDate={maxDate}
          clearable
          disabled={!startDate}
          helperText={
            !startDate ? 'Please select a start date first' : 'Must be after start date'
          }
          required
        />
      </div>
    )
  },
}

// RangePicker Stories
export const RangePickerBasic: Story = {
  name: 'RangePicker - Basic',
  render: () => (
    <DatePicker.RangePicker
      label="Date Range"
      placeholder="Choose start and end dates"
    />
  ),
}

export const RangePickerControlled: Story = {
  name: 'RangePicker - Controlled',
  render: () => {
    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null])

    const getDaysBetween = () => {
      if (dates[0] && dates[1]) {
        const diffTime = Math.abs(dates[1].getTime() - dates[0].getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      }
      return 0
    }

    return (
      <div className="flex flex-col gap-4">
        <DatePicker.RangePicker
          label="Controlled Range Picker"
          placeholder="Select date range"
          startDate={dates[0]}
          endDate={dates[1]}
          onChange={setDates}
          clearable
        />
        <div className="text-sm text-text-muted">
          {dates[0] && dates[1] ? (
            <>
              <div>Start: {dates[0].toLocaleDateString()}</div>
              <div>End: {dates[1].toLocaleDateString()}</div>
              <div>Days between: {getDaysBetween()}</div>
            </>
          ) : (
            'No range selected'
          )}
        </div>
        <button
          onClick={() => {
            const today = new Date()
            const nextWeek = new Date(today)
            nextWeek.setDate(today.getDate() + 7)
            setDates([today, nextWeek])
          }}
          className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary/90 transition-colors"
        >
          Set to This Week
        </button>
      </div>
    )
  },
}

// TimePicker Stories
export const TimePickerBasic: Story = {
  name: 'TimePicker - Basic',
  render: () => (
    <DatePicker.TimePicker
      label="Meeting Time"
      placeholder="Choose time"
    />
  ),
}

export const TimePickerControlled: Story = {
  name: 'TimePicker - Controlled',
  render: () => {
    const [time, setTime] = useState<Date | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <DatePicker.TimePicker
          label="Controlled Time Picker"
          placeholder="Select time"
          value={time}
          onChange={setTime}
          clearable
        />
        <div className="text-sm text-text-muted">
          Selected time: {time ? time.toLocaleTimeString() : 'None'}
        </div>
        <button
          onClick={() => setTime(new Date())}
          className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary/90 transition-colors"
        >
          Set to Current Time
        </button>
      </div>
    )
  },
}
