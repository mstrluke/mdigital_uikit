import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Calendar from './index'

const meta: Meta<typeof Calendar> = {
  title: 'Data Entry/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <Calendar />,
}

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date())

    return (
      <div className="space-y-4">
        <Calendar value={date} onChange={setDate} />
        <p className="text-sm text-text-secondary">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

export const MondayStart: Story = {
  render: () => <Calendar weekStartsOn={1} />,
}

export const WithMinMax: Story = {
  render: () => {
    const today = new Date()
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)

    return (
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">Only ±7/+14 days from today selectable</p>
        <Calendar minDate={min} maxDate={max} />
      </div>
    )
  },
}

export const DisabledWeekends: Story = {
  render: () => (
    <Calendar
      disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="text-xs text-text-secondary mb-2">{size}</p>
          <Calendar size={size} />
        </div>
      ))}
    </div>
  ),
}

export const NoOutsideDays: Story = {
  render: () => <Calendar showOutsideDays={false} />,
}

export const PreselectedDate: Story = {
  render: () => (
    <Calendar
      defaultValue={new Date(2025, 11, 25)}
      defaultMonth={new Date(2025, 11, 1)}
    />
  ),
}
