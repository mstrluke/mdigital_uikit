import type { ComponentColor, ComponentSize } from '../types'

export type DatePickerVariant = 'outline' | 'filled'

export type PickerMode = 'date' | 'time' | 'datetime'

export type DatePickerSize = ComponentSize

export interface DatePickerClassNames {
  root?: string
  trigger?: string
  calendar?: string
  header?: string
  navigation?: string
  day?: string
  daySelected?: string
  dayToday?: string
  label?: string
  helper?: string
  icon?: string
  clear?: string
}

export interface BaseDatePickerProps {
  variant?: DatePickerVariant
  size?: DatePickerSize
  color?: ComponentColor

  // Validation
  label?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  helperText?: string
  messagePosition?: 'top' | 'bottom'

  // Common props
  placeholder?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  fullWidth?: boolean
  className?: string
  classNames?: DatePickerClassNames

  // Date constraints
  minDate?: Date
  maxDate?: Date

  // Format
  dateFormat?: string
}

export interface DatePickerProps extends BaseDatePickerProps {
  ref?: React.Ref<HTMLDivElement>
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
}

export interface RangePickerProps extends BaseDatePickerProps {
  ref?: React.Ref<HTMLDivElement>
  startDate?: Date | null
  endDate?: Date | null
  defaultStartDate?: Date | null
  defaultEndDate?: Date | null
  onChange?: (dates: [Date | null, Date | null]) => void
}

export interface TimePickerProps extends BaseDatePickerProps {
  ref?: React.Ref<HTMLDivElement>
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  timeIntervals?: number
  timeFormat?: string
  showTimeSelectOnly?: boolean
}
