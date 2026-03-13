'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn, iconSizes } from '../utils'

export interface CalendarHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
  decreaseYear: () => void
  increaseYear: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
  prevYearButtonDisabled: boolean
  nextYearButtonDisabled: boolean
  showMonthSelector?: boolean
  onMonthClick?: () => void
  onYearClick?: () => void
  headerClassName?: string
  navigationClassName?: string
}

export const CalendarHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  showMonthSelector = false,
  onMonthClick,
  onYearClick,
  headerClassName,
  navigationClassName,
}: CalendarHeaderProps) => {
  const monthName = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()

  return (
    <div className={cn('datePicker_header', 'flex items-center justify-between px-4 py-3 bg-surface border-b border-border', headerClassName)} data-slot="header">
      <div className={cn('datePicker_navigation', 'flex items-center gap-1', navigationClassName)} data-slot="navigation">
        <button
          type="button"
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled || showMonthSelector}
          className="p-1 rounded hover:bg-surface text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous year"
        >
          <ChevronsLeft className={iconSizes.sm} />
        </button>
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled || showMonthSelector}
          className="p-1 rounded hover:bg-surface text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className={iconSizes.sm} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMonthClick}
          className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
        >
          {monthName}
        </button>
        <button
          type="button"
          onClick={onYearClick}
          className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
        >
          {year}
        </button>
      </div>

      <div className={cn('datePicker_navigation', 'flex items-center gap-1', navigationClassName)} data-slot="navigation">
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled || showMonthSelector}
          className="p-1 rounded hover:bg-surface text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className={iconSizes.sm} />
        </button>
        <button
          type="button"
          onClick={increaseYear}
          disabled={nextYearButtonDisabled || showMonthSelector}
          className="p-1 rounded hover:bg-surface text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next year"
        >
          <ChevronsRight className={iconSizes.sm} />
        </button>
      </div>
    </div>
  )
}
