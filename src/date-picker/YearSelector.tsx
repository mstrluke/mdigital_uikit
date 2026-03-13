'use client'

import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { ComponentColor } from '../types'
import { pickerSelectedClasses } from './shared'

interface YearSelectorProps {
  date: Date
  onYearSelect: (year: number) => void
  onDecadeChange: (year: number) => void
  color?: ComponentColor
}

export const YearSelector = ({
  date,
  onYearSelect,
  onDecadeChange,
  color = 'primary',
}: YearSelectorProps) => {
  const currentYear = date.getFullYear()
  const startYear = Math.floor(currentYear / 10) * 10
  const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i)

  return (
    <div className={cn("p-4 bg-background", colorVars[color])}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => onDecadeChange(currentYear - 10)}
          className="p-1 rounded hover:bg-surface text-text-primary transition-colors"
          aria-label="Previous decade"
        >
          <ChevronsLeft className={iconSizes.sm} />
        </button>
        <div className="text-sm font-medium text-text-primary">
          {startYear}-{startYear + 9}
        </div>
        <button
          type="button"
          onClick={() => onDecadeChange(currentYear + 10)}
          className="p-1 rounded hover:bg-surface text-text-primary transition-colors"
          aria-label="Next decade"
        >
          <ChevronsRight className={iconSizes.sm} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => onYearSelect(year)}
            className={cn(
              'px-4 py-2 rounded text-sm font-medium transition-colors',
              year === currentYear
                ? pickerSelectedClasses
                : year < startYear || year > startYear + 9
                  ? 'text-text-secondary opacity-50'
                  : 'text-text-primary hover:bg-surface',
            )}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
