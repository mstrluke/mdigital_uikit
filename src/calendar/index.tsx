'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useControllable } from '../hooks/useControllable'
import { cn } from '../utils'
import type { CalendarProps } from './types'

const calendarVariants = cva('inline-flex flex-col select-none', {
  variants: {
    size: {
      xs: 'text-xs gap-1',
      sm: 'text-sm gap-1.5',
      md: 'text-sm gap-2',
      lg: 'text-base gap-2.5',
    },
  },
  defaultVariants: { size: 'md' },
})

const cellVariants = cva(
  'flex items-center justify-center rounded-md transition-colors cursor-pointer font-normal',
  {
    variants: {
      size: {
        xs: 'w-7 h-7 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-9 h-9 text-sm',
        lg: 'w-10 h-10 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const navBtnClass =
  'inline-flex items-center justify-center rounded-md w-7 h-7 hover:bg-surface transition-colors cursor-pointer text-text-secondary hover:text-text-primary'

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthGrid(
  year: number,
  month: number,
  weekStartsOn: number,
  showOutside: boolean,
) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = getDaysInMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const offset = (firstDay - weekStartsOn + 7) % 7

  const weeks: Array<Array<{ date: Date; outside: boolean }>> = []
  let week: Array<{ date: Date; outside: boolean }> = []

  for (let i = 0; i < offset; i++) {
    const day = daysInPrevMonth - offset + 1 + i
    week.push({ date: new Date(year, month - 1, day), outside: true })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push({ date: new Date(year, month, day), outside: false })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }

  if (week.length > 0) {
    let nextDay = 1
    while (week.length < 7) {
      week.push({ date: new Date(year, month + 1, nextDay++), outside: true })
    }
    weeks.push(week)
  }

  if (!showOutside) {
    return weeks.map((w) =>
      w.map((d) => (d.outside ? { ...d, date: d.date } : d)),
    )
  }

  return weeks
}

const DAY_NAMES_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const Calendar = React.memo<CalendarProps>(
  ({
    value,
    defaultValue,
    onChange,
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    minDate,
    maxDate,
    disabledDates,
    size = 'md',
    weekStartsOn = 0,
    showOutsideDays = true,
    className,
    classNames,
  }) => {
    const today = new Date()
    const onChangeWrapped = React.useMemo(
      () => onChange ? (v: Date | null) => { if (v) onChange(v) } : undefined,
      [onChange],
    )
    const [selected, setSelected] = useControllable<Date | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange: onChangeWrapped,
    })
    const [internalMonth, setInternalMonth] = React.useState<Date>(
      defaultMonth ?? defaultValue ?? today,
    )

    const currentMonth = controlledMonth ?? internalMonth

    const year = currentMonth.getFullYear()
    const monthIdx = currentMonth.getMonth()

    const weeks = React.useMemo(
      () => getMonthGrid(year, monthIdx, weekStartsOn, showOutsideDays),
      [year, monthIdx, weekStartsOn, showOutsideDays],
    )

    const dayNames = React.useMemo(() => {
      const names = []
      for (let i = 0; i < 7; i++) {
        names.push(DAY_NAMES_SHORT[(weekStartsOn + i) % 7])
      }
      return names
    }, [weekStartsOn])

    const navigate = (offset: number) => {
      const next = new Date(year, monthIdx + offset, 1)
      if (controlledMonth === undefined) setInternalMonth(next)
      onMonthChange?.(next)
    }

    const isDisabled = (date: Date) => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()))
        return true
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()))
        return true
      return disabledDates?.(date) ?? false
    }

    const handleSelect = (date: Date) => {
      if (isDisabled(date)) return
      setSelected(date)
      if (date.getMonth() !== monthIdx) {
        navigate(date.getMonth() - monthIdx)
      }
    }

    return (
      <div
        data-slot="root"
        className={cn(
          'calendar_root',
          calendarVariants({ size }),
          classNames?.root,
          className,
        )}
      >
        {/* Header */}
        <div
          data-slot="header"
          className={cn(
            'calendar_header',
            'flex items-center justify-between px-1',
            classNames?.header,
          )}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={navBtnClass}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-text-primary">
            {MONTH_NAMES[monthIdx]} {year}
          </span>
          <button
            type="button"
            onClick={() => navigate(1)}
            className={navBtnClass}
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div
          data-slot="grid"
          className={cn('calendar_grid', 'grid grid-cols-7', classNames?.grid)}
          role="grid"
        >
          {dayNames.map((name) => (
            <div
              key={name}
              role="columnheader"
              className={cn(
                'calendar_dayName',
                cellVariants({ size }),
                'font-medium text-text-secondary cursor-default',
                classNames?.dayName,
              )}
            >
              {name}
            </div>
          ))}
          {weeks.map((week, wi) =>
            week.map(({ date, outside }) => {
              const disabled = isDisabled(date)
              const isToday = isSameDay(date, today)
              const isSelected = selected ? isSameDay(date, selected) : false

              return (
                <button
                  key={`${wi}-${date.toISOString()}`}
                  type="button"
                  role="gridcell"
                  disabled={disabled}
                  onClick={() => handleSelect(date)}
                  aria-selected={isSelected}
                  aria-current={isToday ? 'date' : undefined}
                  className={cn(
                    'calendar_day',
                    cellVariants({ size }),
                    outside && 'text-text-secondary/40',
                    outside && !showOutsideDays && 'invisible',
                    disabled && 'opacity-30 cursor-not-allowed',
                    !disabled && !isSelected && 'hover:bg-surface',
                    isToday && !isSelected && 'border border-primary text-primary',
                    isSelected && 'bg-primary text-primary-foreground',
                    classNames?.day,
                    isToday && classNames?.today,
                    isSelected && classNames?.selected,
                    outside && classNames?.outside,
                    disabled && classNames?.disabled,
                  )}
                >
                  {date.getDate()}
                </button>
              )
            }),
          )}
        </div>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'

export type * from './types'
export default Calendar
