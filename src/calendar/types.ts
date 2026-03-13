import type { ComponentSize } from '../types'

export interface CalendarClassNames {
  root?: string
  header?: string
  grid?: string
  dayName?: string
  day?: string
  today?: string
  selected?: string
  outside?: string
  disabled?: string
}

export interface CalendarProps {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  size?: ComponentSize
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showOutsideDays?: boolean
  className?: string
  classNames?: CalendarClassNames
}
