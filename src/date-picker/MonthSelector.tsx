'use client'

import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { ComponentColor } from '../types'
import { pickerSelectedClasses } from './shared'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface MonthSelectorProps {
  date: Date
  onMonthSelect: (month: number) => void
  onYearClick: () => void
  onYearChange: (year: number) => void
  color?: ComponentColor
}

export const MonthSelector = ({
  date,
  onMonthSelect,
  onYearClick,
  onYearChange,
  color = 'primary',
}: MonthSelectorProps) => {
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  return (
    <div className={cn("p-4 bg-background", colorVars[color])}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => onYearChange(currentYear - 1)}
          className="p-1 rounded hover:bg-surface text-text-primary transition-colors"
          aria-label="Previous year"
        >
          <ChevronsLeft className={iconSizes.sm} />
        </button>
        <button
          type="button"
          onClick={onYearClick}
          className="text-sm font-medium text-text-primary hover:text-slot transition-colors"
        >
          {currentYear}
        </button>
        <button
          type="button"
          onClick={() => onYearChange(currentYear + 1)}
          className="p-1 rounded hover:bg-surface text-text-primary transition-colors"
          aria-label="Next year"
        >
          <ChevronsRight className={iconSizes.sm} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            type="button"
            onClick={() => onMonthSelect(index)}
            className={cn(
              'px-4 py-2 rounded text-sm font-medium transition-colors',
              index === currentMonth
                ? pickerSelectedClasses
                : 'text-text-primary hover:bg-surface',
            )}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  )
}
