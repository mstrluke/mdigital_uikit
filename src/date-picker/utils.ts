import { cva } from 'class-variance-authority'
import { cn } from '../utils'
import type { ComponentColor } from '../types'
import type { DatePickerClassNames } from './types'

export const pickerInputVariants = cva(
  'w-full placeholder:text-text-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-text-primary transition-colors',
  {
    variants: {
      variant: {
        outline: 'bg-background border rounded-md',
        filled: 'bg-surface border border-transparent rounded-md',
      },
      status: {
        default: 'border-border',
        error: 'border-error',
        warning: 'border-warning',
        info: 'border-info',
        success: 'border-success',
      },
      size: {
        xs: 'h-(--input-height-xs) px-(--input-padding-x-xs) text-xs',
        sm: 'h-(--input-height-sm) px-(--input-padding-x-sm) text-sm',
        md: 'h-(--input-height-md) px-(--input-padding-x-md) text-base',
        lg: 'h-(--input-height-lg) px-(--input-padding-x-lg) text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'max-w-full',
      },
    },
    defaultVariants: {
      variant: 'outline',
      status: 'default',
      size: 'md',
      fullWidth: true,
    },
  },
)

// Base structural styles (no color references)
const datePickerBaseStyles = `
  datePicker_day
  [&_.react-datepicker]:!bg-background
  [&_.react-datepicker]:!border-border
  [&_.react-datepicker]:!text-text-primary
  [&_.react-datepicker]:!flex
  [&_.react-datepicker]:!gap-0
  [&_.react-datepicker__header]:!bg-transparent
  [&_.react-datepicker__header]:!border-none
  [&_.react-datepicker__header]:!p-0
  [&_.react-datepicker__month-container]:!flex
  [&_.react-datepicker__month-container]:!flex-col
  [&_.react-datepicker__month]:!m-0
  [&_.react-datepicker__month]:!p-4
  [&_.react-datepicker__week]:!grid
  [&_.react-datepicker__week]:!grid-cols-7
  [&_.react-datepicker__week]:!gap-1
  [&_.react-datepicker__day-names]:!grid
  [&_.react-datepicker__day-names]:!grid-cols-7
  [&_.react-datepicker__day-names]:!gap-1
  [&_.react-datepicker__day-names]:!px-4
  [&_.react-datepicker__day-names]:!pt-4
  [&_.react-datepicker__day-names]:!pb-2
  [&_.react-datepicker__day-name]:!text-text-secondary
  [&_.react-datepicker__day-name]:!text-sm
  [&_.react-datepicker__day-name]:!font-medium
  [&_.react-datepicker__day-name]:!text-center
  [&_.react-datepicker__day-name]:!w-auto
  [&_.react-datepicker__day-name]:!m-0
  [&_.react-datepicker__day]:!w-10
  [&_.react-datepicker__day]:!h-10
  [&_.react-datepicker__day]:!leading-10
  [&_.react-datepicker__day]:!text-center
  [&_.react-datepicker__day]:!rounded-md
  [&_.react-datepicker__day]:!text-text-primary
  [&_.react-datepicker__day]:!text-sm
  [&_.react-datepicker__day]:!m-0
  [&_.react-datepicker__day]:!cursor-pointer
  [&_.react-datepicker__day]:!transition-colors
  [&_.react-datepicker__day--selected]:datePicker_daySelected
  [&_.react-datepicker__day]:hover:!bg-surface
  [&_.react-datepicker__day--disabled]:!cursor-not-allowed
  [&_.react-datepicker__day--disabled]:!opacity-40
  [&_.react-datepicker__day--disabled]:hover:!bg-transparent
  [&_.react-datepicker__day--outside-month]:!text-text-secondary
  [&_.react-datepicker__day--today]:datePicker_dayToday
  [&_.react-datepicker__day--today]:!font-semibold
  [&_.react-datepicker__current-month]:!hidden
  [&_.react-datepicker__navigation]:!hidden
  [&_.react-datepicker__time-container]:!border-border
  [&_.react-datepicker__time-list-item]:hover:!bg-surface
  [&_.react-datepicker__time-list]:!bg-background
`

// Slot-based: uses --_c-bg / --_c-fg / --_c set by colorVars on the wrapper.
// CSS custom properties inherit through the DOM, so child elements of the wrapper can reference them.
const datePickerSlotColorStyles = `
  [&_.react-datepicker__day--selected]:![background-color:var(--_c-bg)]
  [&_.react-datepicker__day--selected]:![color:var(--_c-fg)]
  [&_.react-datepicker__day--keyboard-selected]:![background-color:color-mix(in_oklch,var(--_c-bg)_50%,transparent)]
  [&_.react-datepicker__day--today]:!border
  [&_.react-datepicker__day--today]:![border-color:var(--_c-border)]
  [&_.react-datepicker__time-list-item--selected]:![background-color:var(--_c-bg)]
  [&_.react-datepicker__time-list-item--selected]:![color:var(--_c-fg)]
  [&_.react-datepicker__day--in-selecting-range]:![background-color:color-mix(in_oklch,var(--_c-bg)_30%,transparent)]
  [&_.react-datepicker__day--in-range]:![background-color:color-mix(in_oklch,var(--_c-bg)_10%,transparent)]
  [&_.react-datepicker__day--range-start]:![background-color:var(--_c-bg)]
  [&_.react-datepicker__day--range-start]:![color:var(--_c-fg)]
  [&_.react-datepicker__day--range-end]:![background-color:var(--_c-bg)]
  [&_.react-datepicker__day--range-end]:![color:var(--_c-fg)]
`

export const getDatePickerStyles = (_color?: ComponentColor, classNames?: DatePickerClassNames) => {
  return cn(
    datePickerBaseStyles,
    datePickerSlotColorStyles,
    classNames?.day && `[&_.react-datepicker__day]:${classNames.day}`,
    classNames?.daySelected && `[&_.react-datepicker__day--selected]:${classNames.daySelected}`,
    classNames?.dayToday && `[&_.react-datepicker__day--today]:${classNames.dayToday}`,
  )
}
