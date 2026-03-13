'use client'

import { cva } from 'class-variance-authority'
import React, { useState, useCallback, useId } from 'react'
import { useControllable } from '../hooks/useControllable'

import { Star } from 'lucide-react'

import { cn } from '../utils'
import type { RatingProps } from './types'

const ratingVariants = cva('inline-flex items-center gap-1', {
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

const starSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
}

/**
 * Color mappings for Tailwind JIT compatibility
 */
const fillColorClasses: Record<string, string> = {
  default: 'fill-border',
  primary: 'fill-primary',
  secondary: 'fill-secondary',
  accent: 'fill-accent',
  success: 'fill-success',
  error: 'fill-error',
  warning: 'fill-warning',
  info: 'fill-info',
}

const strokeColorClasses: Record<string, string> = {
  default: 'stroke-border',
  primary: 'stroke-primary',
  secondary: 'stroke-secondary',
  accent: 'stroke-accent',
  success: 'stroke-success',
  error: 'stroke-error',
  warning: 'stroke-warning',
  info: 'stroke-info',
}

const getStarClasses = (
  color: string,
  variant: string,
  isFilled: boolean,
  isHovered: boolean,
) => {
  const state = isFilled || isHovered ? 'filled' : 'empty'
  const strokeClass = strokeColorClasses[color] || strokeColorClasses.default
  const fillClass = fillColorClasses[color] || fillColorClasses.default

  if (state === 'empty') {
    if (variant === 'solid') {
      if (color === 'default') return 'fill-transparent stroke-border'
      return `fill-transparent ${strokeClass} opacity-20`
    }
    if (variant === 'soft') {
      if (color === 'default') return 'fill-transparent stroke-border/50'
      return `fill-transparent ${strokeClass} opacity-20`
    }
    if (color === 'default') return 'fill-transparent stroke-border'
    return `fill-transparent ${strokeClass} opacity-20`
  }

  // filled state
  if (variant === 'solid') {
    if (color === 'default') return 'fill-border stroke-border'
    return `${fillClass} ${strokeClass}`
  }
  if (variant === 'soft') {
    if (color === 'default') return 'fill-border/50 stroke-border'
    return `${fillClass} opacity-20 ${strokeClass}`
  }
  if (color === 'default') return 'fill-border stroke-border'
  return `${fillClass} ${strokeClass}`
}

const Rating = React.memo<RatingProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    count = 5,
    allowHalf = false,
    color = 'warning',
    size = 'md',
    variant = 'solid',
    onChange,
    disabled = false,
    readOnly = false,
    className,
    classNames,
    'aria-label': ariaLabel,
  }) => {
    const [currentValue, setCurrentValue] = useControllable({ value: controlledValue, defaultValue, onChange })
    const [hoverValue, setHoverValue] = useState<number | null>(null)
    const uniqueId = useId()

    const displayValue = hoverValue !== null ? hoverValue : (currentValue ?? 0)
    const isInteractive = !disabled && !readOnly

    const updateValue = useCallback(
      (newValue: number) => {
        if (!isInteractive) return
        setCurrentValue(newValue)
      },
      [isInteractive, setCurrentValue],
    )

    const handleStarClick = useCallback(
      (index: number, isHalf: boolean) => {
        if (!isInteractive) return
        const newValue = isHalf ? index + 0.5 : index + 1
        updateValue(newValue)
      },
      [isInteractive, updateValue],
    )

    const handleStarHover = useCallback(
      (index: number, isHalf: boolean) => {
        if (!isInteractive) return
        const newValue = isHalf ? index + 0.5 : index + 1
        setHoverValue(newValue)
      },
      [isInteractive],
    )

    const handleMouseLeave = useCallback(() => {
      setHoverValue(null)
    }, [])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isInteractive) return

        const step = allowHalf ? 0.5 : 1
        let newValue = currentValue ?? 0

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault()
            newValue = Math.min((currentValue ?? 0) + step, count)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault()
            newValue = Math.max((currentValue ?? 0) - step, 0)
            break
          case 'Home':
            e.preventDefault()
            newValue = 0
            break
          case 'End':
            e.preventDefault()
            newValue = count
            break
          default:
            return
        }

        updateValue(newValue)
      },
      [isInteractive, currentValue, count, allowHalf, updateValue],
    )

    const getStarFill = useCallback((index: number) => {
      const fillValue = displayValue - index
      if (fillValue >= 1) return 'full'
      if (fillValue > 0 && fillValue < 1) return 'half'
      return 'empty'
    }, [displayValue])

    return (
      <div data-slot="root" className={cn(ratingVariants({ size }), 'rating_root', classNames?.root, className)}>
        <div
          id={`rating-${uniqueId}`}
          role="radiogroup"
          aria-label={ariaLabel || 'Rating'}
          tabIndex={isInteractive ? 0 : -1}
          onKeyDown={handleKeyDown}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'inline-flex items-center gap-0.5 outline-none',
            'rating_label',
            classNames?.label,
            isInteractive && 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded',
          )}
        >
          {Array.from({ length: count }, (_, index) => {
            const fillType = getStarFill(index)
            const isHovered =
              hoverValue !== null && index < Math.ceil(hoverValue)

            const starValue = index + 1
            const isChecked = fillType !== 'empty'

            return (
              <div
                key={index}
                role="radio"
                aria-checked={isChecked}
                aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
                className={cn(
                  'relative inline-flex',
                  isInteractive && 'cursor-pointer',
                  disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                {/* Left half */}
                {allowHalf && (
                  <div
                    className="absolute inset-0 w-1/2 z-10"
                    onClick={() => handleStarClick(index, true)}
                    onMouseEnter={() => handleStarHover(index, true)}
                  />
                )}
                {/* Right half or full star */}
                <div
                  className={cn(
                    'absolute inset-0 z-10',
                    allowHalf ? 'left-1/2' : 'left-0',
                  )}
                  onClick={() => handleStarClick(index, false)}
                  onMouseEnter={() => handleStarHover(index, false)}
                />

                {/* Background star (empty) */}
                <Star
                  width={starSizes[size]}
                  height={starSizes[size]}
                  className={cn(
                    getStarClasses(color, variant, false, false),
                    'transition-colors',
                    'rating_star',
                    classNames?.star,
                  )}
                  aria-hidden="true"
                />

                {/* Foreground star (filled) */}
                {fillType !== 'empty' && (
                  <Star
                    width={starSizes[size]}
                    height={starSizes[size]}
                    className={cn(
                      'absolute top-0 left-0 transition-colors',
                      getStarClasses(color, variant, true, isHovered),
                      'rating_starFilled',
                      classNames?.starFilled,
                    )}
                    style={{
                      clipPath:
                        fillType === 'half'
                          ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                          : 'none',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)

Rating.displayName = 'Rating'

export type * from './types'
export default Rating
