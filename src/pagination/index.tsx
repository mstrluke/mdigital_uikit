'use client'

import { cva } from 'class-variance-authority'
import React, { useCallback, useMemo, useState } from 'react'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'

import { useRipple, RippleContainer } from '../hooks/useRipple'
import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { PaginationProps } from './types'

const paginationVariants = cva('inline-flex items-center gap-1', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const paginationItemVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium outline-none cursor-pointer border min-w-fit',
  {
    variants: {
      size: {
        xs: 'h-6 min-w-6 px-1.5 text-xs',
        sm: 'h-8 min-w-8 px-2 text-sm',
        md: 'h-10 min-w-10 px-3 text-base',
        lg: 'h-12 min-w-12 px-4 text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

const getInactiveStyles = (color: string, variant: string) => {
  const baseColor = colorVars[color as keyof typeof colorVars] || colorVars.default

  if (variant === 'solid') {
    return cn(baseColor, 'border-slot bg-slot text-slot-fg hover:bg-slot-90')
  }
  if (variant === 'soft') {
    return cn(baseColor, 'border-slot-30 bg-slot-10 text-slot hover:bg-slot-20')
  }
  // default variant
  return cn(baseColor, 'border-border bg-background text-text-primary hover:bg-slot-10 hover:border-slot')
}

const getActiveStyles = (color: string, variant: string) => {
  const baseColor = colorVars[color as keyof typeof colorVars] || colorVars.default

  if (variant === 'solid') {
    return cn(baseColor, 'border-slot bg-slot text-slot-fg')
  }
  if (variant === 'soft') {
    return cn(baseColor, 'border-slot bg-slot-20 text-slot')
  }
  // default variant
  return cn(baseColor, 'border-slot bg-slot-10 text-slot')
}

const PaginationButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }> = ({ children, disabled, className, ...props }) => {
  const { ripples, onPointerDown, onKeyDown, onAnimationEnd } = useRipple(!disabled)
  return (
    <button className={cn(className, 'relative overflow-hidden')} onPointerDown={onPointerDown} onKeyDown={onKeyDown} disabled={disabled} {...props}>
      {children}
      <RippleContainer ripples={ripples} onAnimationEnd={onAnimationEnd} />
    </button>
  )
}

const Pagination = React.memo<PaginationProps>(
  ({
    total,
    current: controlledCurrent,
    defaultCurrent = 1,
    pageSize: controlledPageSize,
    defaultPageSize = 10,
    onChange,
    onShowSizeChange,
    color = 'default',
    size = 'md',
    variant = 'default',
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper = false,
    showFirstLastButtons = false,
    showTotal,
    disabled = false,
    className,
    classNames,
  }) => {
    const [internalCurrent, setInternalCurrent] = useState(defaultCurrent)
    const [internalPageSize, setInternalPageSize] = useState(defaultPageSize)

    const current =
      controlledCurrent !== undefined ? controlledCurrent : internalCurrent
    const pageSize =
      controlledPageSize !== undefined ? controlledPageSize : internalPageSize
    const totalPages = Math.ceil(total / pageSize)

    const handlePageChange = useCallback((page: number) => {
      if (disabled || page === current || page < 1 || page > totalPages) return

      if (controlledCurrent === undefined) {
        setInternalCurrent(page)
      }
      onChange?.(page, pageSize)
    }, [disabled, current, totalPages, controlledCurrent, onChange, pageSize])

    const handlePageSizeChange = useCallback((newSize: number) => {
      if (disabled) return

      const newTotalPages = Math.ceil(total / newSize)
      const newCurrent = current > newTotalPages ? newTotalPages : current

      if (controlledPageSize === undefined) {
        setInternalPageSize(newSize)
      }
      if (controlledCurrent === undefined && newCurrent !== current) {
        setInternalCurrent(newCurrent)
      }

      onShowSizeChange?.(newCurrent, newSize)
      onChange?.(newCurrent, newSize)
    }, [disabled, total, current, controlledPageSize, controlledCurrent, onShowSizeChange, onChange])

    const getPageNumbers = useMemo(() => {
      const pages: (number | 'ellipsis')[] = []

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (current >= totalPages - 3) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        pages.push(current - 1)
        pages.push(current)
        pages.push(current + 1)
        pages.push('ellipsis')
        pages.push(totalPages)
      }

      return pages
    }, [current, totalPages])

    const range: [number, number] = [
      (current - 1) * pageSize + 1,
      Math.min(current * pageSize, total),
    ]

    if (totalPages <= 0) {
      return null
    }

    return (
      <div
        data-slot="root"
        className={cn(
          'pagination_root',
          'flex items-center gap-4',
          classNames?.root,
          className,
        )}
      >
        {showTotal && (
          <div
            className={cn(
              'pagination_info',
              'text-text-secondary text-sm',
              classNames?.info,
            )}
          >
            {showTotal(total, range)}
          </div>
        )}

        <div
          className={cn(
            'pagination_list',
            paginationVariants({ size }),
            classNames?.list,
          )}
        >
          {/* First Page Button */}
          {showFirstLastButtons && (
            <PaginationButton
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={disabled || current === 1}
              className={cn(
                'pagination_button',
                paginationItemVariants({
                  size,
                  disabled: disabled || current === 1,
                }),
                getInactiveStyles(color, variant),
                classNames?.button,
              )}
              aria-label="First page"
            >
              <ChevronsLeft className={iconSizes[size]} />
            </PaginationButton>
          )}

          {/* Previous Button */}
          <PaginationButton
            type="button"
            onClick={() => handlePageChange(current - 1)}
            disabled={disabled || current === 1}
            className={cn(
              'pagination_button',
              paginationItemVariants({
                size,
                disabled: disabled || current === 1,
              }),
              getInactiveStyles(color, variant),
              classNames?.button,
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className={iconSizes[size]} />
          </PaginationButton>

          {/* Page Numbers */}
          {getPageNumbers.map((page, index) =>
            page === 'ellipsis' ? (
              <span
                key={`slot-${index}`}
                className={cn(
                  'pagination_ellipsis',
                  paginationItemVariants({ size, disabled: false }),
                  getInactiveStyles(color, 'soft'),
                  'border-none pointer-events-none',
                  classNames?.ellipsis,
                )}
                aria-hidden="true"
              >
                <MoreHorizontal className={iconSizes[size]} />
              </span>
            ) : (
              <PaginationButton
                type="button"
                key={`slot-${index}`}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                aria-label={`Page ${page} of ${totalPages}`}
                aria-current={current === page ? 'page' : undefined}
                className={cn(
                  'pagination_button',
                  paginationItemVariants({ size, disabled }),
                  current === page
                    ? getActiveStyles(color, variant)
                    : getInactiveStyles(color, variant),
                  current === page ? classNames?.buttonActive : classNames?.button,
                )}
              >
                {page}
              </PaginationButton>
            ),
          )}

          {/* Next Button */}
          <PaginationButton
            type="button"
            onClick={() => handlePageChange(current + 1)}
            disabled={disabled || current === totalPages}
            className={cn(
              'pagination_button',
              paginationItemVariants({
                size,
                disabled: disabled || current === totalPages,
              }),
              getInactiveStyles(color, variant),
              classNames?.button,
            )}
            aria-label="Next page"
          >
            <ChevronRight className={iconSizes[size]} />
          </PaginationButton>

          {/* Last Page Button */}
          {showFirstLastButtons && (
            <PaginationButton
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled || current === totalPages}
              className={cn(
                'pagination_button',
                paginationItemVariants({
                  size,
                  disabled: disabled || current === totalPages,
                }),
                getInactiveStyles(color, variant),
                classNames?.button,
              )}
              aria-label="Last page"
            >
              <ChevronsRight className={iconSizes[size]} />
            </PaginationButton>
          )}
        </div>

        {/* Page Size Changer */}
        {showSizeChanger && (
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={disabled}
            aria-label="Items per page"
            className={cn(
              paginationItemVariants({ size, disabled }),
              getInactiveStyles(color, variant),
              'cursor-pointer',
            )}
          >
            {pageSizeOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option} / page
              </option>
            ))}
          </select>
        )}

        {/* Quick Jumper */}
        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              disabled={disabled}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const inputEl = e.target as HTMLInputElement
                  const value = parseInt(inputEl.value)
                  if (!isNaN(value)) {
                    const clampedValue = Math.max(1, Math.min(totalPages, value))
                    handlePageChange(clampedValue)
                    inputEl.value = ''
                  }
                }
              }}
              onBlur={(e) => {
                const inputEl = e.target as HTMLInputElement
                const value = parseInt(inputEl.value)
                if (!isNaN(value) && inputEl.value !== '') {
                  const clampedValue = Math.max(1, Math.min(totalPages, value))
                  if (clampedValue !== value) {
                    inputEl.value = String(clampedValue)
                  }
                }
              }}
              className={cn(
                paginationItemVariants({ size, disabled }),
                getInactiveStyles(color, variant),
                'w-16 text-center',
              )}
            />
          </div>
        )}
      </div>
    )
  },
)

Pagination.displayName = 'Pagination'

export type * from './types'
export default Pagination
