'use client'

import { cva } from 'class-variance-authority'
import React, { useCallback, useRef, useState } from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { SliderProps } from './types'

const sliderTrackVariants = cva('relative rounded-full', {
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'h-1' },
    { orientation: 'horizontal', size: 'sm', class: 'h-2' },
    { orientation: 'horizontal', size: 'md', class: 'h-3' },
    { orientation: 'horizontal', size: 'lg', class: 'h-4' },
    { orientation: 'vertical', size: 'xs', class: 'w-1' },
    { orientation: 'vertical', size: 'sm', class: 'w-2' },
    { orientation: 'vertical', size: 'md', class: 'w-3' },
    { orientation: 'vertical', size: 'lg', class: 'w-4' },
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
  },
})

const thumbVariants = cva(
  'absolute rounded-full border-2 bg-background cursor-pointer hover:scale-110 active:scale-100 transition-transform duration-150',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const getTrackColorClasses = (variant: 'default' | 'solid' | 'soft'): string => {
  if (variant === 'soft') return 'bg-slot-10'
  if (variant === 'solid') return 'bg-slot-20'
  return 'bg-slot-10' // default
}

const getFillColorClasses = (variant: 'default' | 'solid' | 'soft'): string => {
  if (variant === 'default') return 'bg-slot-20 border-slot'
  if (variant === 'solid') return 'bg-slot'
  return 'bg-slot-50' // soft
}

const getThumbColorClasses = (variant: 'default' | 'solid' | 'soft'): string => {
  if (variant === 'soft') return 'border-slot-50'
  return 'border-slot' // default and solid
}

const Slider = React.memo<SliderProps>(
  ({
    value: controlledValue,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    color = 'primary',
    size = 'md',
    variant = 'default',
    orientation = 'horizontal',
    onChange,
    disabled = false,
    className,
    classNames,
    footer = false,
    range = false,
  }) => {
    const isVertical = orientation === 'vertical'
    const [internalValue, setInternalValue] = useState<number | number[]>(
      defaultValue,
    )
    const [hoveredThumb, setHoveredThumb] = useState<number | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const activeThumb = useRef<number>(0)

    const value = controlledValue ?? internalValue
    const values = Array.isArray(value) ? value : [value]

    // Fix 3: Mirror latest value in a ref to avoid stale closures during rapid drag
    const valueRef = useRef(value)
    valueRef.current = value

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

    // Fix 1: Wrap getValue in useCallback to prevent stale references
    const getValue = useCallback((clientX: number, clientY: number) => {
      if (!trackRef.current) return min
      const rect = trackRef.current.getBoundingClientRect()
      const percentage = isVertical
        ? 1 - (clientY - rect.top) / rect.height // Inverted: bottom=min, top=max
        : (clientX - rect.left) / rect.width
      const rawValue = min + percentage * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      return Math.max(min, Math.min(max, steppedValue))
    }, [isVertical, min, max, step])

    // Fix 3: Read from valueRef.current instead of value closure
    const updateValue = useCallback(
      (newValue: number) => {
        const currentValue = valueRef.current
        if (range && Array.isArray(currentValue)) {
          const newValues = [...currentValue]
          newValues[activeThumb.current] = newValue
          newValues.sort((a, b) => a - b)
          if (!controlledValue) setInternalValue(newValues)
          onChange?.(newValues)
        } else {
          if (!controlledValue) setInternalValue(newValue)
          onChange?.(newValue)
        }
      },
      [range, controlledValue, onChange],
    )

    // Fix 1: Include getValue in deps (replaces isVertical, min, max, step)
    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging.current || disabled) return
        updateValue(getValue(e.clientX, e.clientY))
      },
      [disabled, updateValue, getValue],
    )

    const [isDraggingState, setIsDraggingState] = useState(false)

    // Fix 2: Single useCallback handler using data-index attribute
    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      const thumbIndex = parseInt(e.currentTarget.dataset.index!, 10)
      isDragging.current = true
      setIsDraggingState(true)
      activeThumb.current = thumbIndex
      setHoveredThumb(thumbIndex)
      if ((e.target as HTMLElement).setPointerCapture) {
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      }
      e.preventDefault()
    }, [disabled])

    const handlePointerUp = useCallback(() => {
      isDragging.current = false
      setIsDraggingState(false)
      setHoveredThumb(null)
    }, [])

    // Only add global listeners when dragging - fixes memory leak
    React.useEffect(() => {
      if (!isDraggingState) return

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
      return () => {
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }
    }, [isDraggingState, handlePointerMove, handlePointerUp])

    // Fix 2: Wrap in useCallback to avoid recreation every render
    const handleTrackClick = useCallback((e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isDragging.current) return
      const newValue = getValue(e.clientX, e.clientY)
      const currentValue = valueRef.current

      if (range && Array.isArray(currentValue)) {
        let closestThumbIndex = 0
        let minDistance = Math.abs(newValue - (currentValue[0] || 0))
        for (let i = 1; i < currentValue.length; i++) {
          const distance = Math.abs(newValue - (currentValue[i] || 0))
          if (distance < minDistance) {
            minDistance = distance
            closestThumbIndex = i
          }
        }

        const newValues = [...currentValue]
        newValues[closestThumbIndex] = newValue
        newValues.sort((a, b) => a - b)
        if (!controlledValue) setInternalValue(newValues)
        onChange?.(newValues)
      } else {
        if (!controlledValue) setInternalValue(newValue)
        onChange?.(newValue)
      }
    }, [disabled, getValue, range, controlledValue, onChange])

    // Fix 2: Single useCallback handler using data-index attribute
    // Keyboard: ArrowUp/Right = increase, ArrowDown/Left = decrease
    const handleThumbKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      const index = parseInt(e.currentTarget.dataset.index!, 10)
      const val = Number(e.currentTarget.getAttribute('aria-valuenow'))
      let newValue = val
      const increaseKeys = isVertical ? ['ArrowUp', 'ArrowRight'] : ['ArrowRight', 'ArrowUp']
      const decreaseKeys = isVertical ? ['ArrowDown', 'ArrowLeft'] : ['ArrowLeft', 'ArrowDown']

      if (increaseKeys.includes(e.key)) {
        newValue = Math.min(max, val + step)
      } else if (decreaseKeys.includes(e.key)) {
        newValue = Math.max(min, val - step)
      } else if (e.key === 'Home') {
        newValue = min
      } else if (e.key === 'End') {
        newValue = max
      } else {
        return
      }
      e.preventDefault()
      const currentValue = valueRef.current
      if (range && Array.isArray(currentValue)) {
        const newValues = [...currentValue]
        newValues[index] = newValue
        newValues.sort((a, b) => a - b)
        if (!controlledValue) setInternalValue(newValues)
        onChange?.(newValues)
      } else {
        if (!controlledValue) setInternalValue(newValue)
        onChange?.(newValue)
      }
    }, [disabled, isVertical, min, max, step, range, controlledValue, onChange])

    // Fill segment styles
    const getFillStyle = (startPct: number, endPct: number) =>
      isVertical
        ? { bottom: `${startPct}%`, height: `${endPct - startPct}%` }
        : { left: `${startPct}%`, width: `${endPct - startPct}%` }

    // Thumb position style
    const getThumbStyle = (pct: number) =>
      isVertical
        ? { bottom: `${pct}%` }
        : { left: `${pct}%` }

    return (
      <div
        data-slot="root"
        className={cn(
          isVertical ? 'h-full inline-flex flex-col items-center' : 'w-full',
          colorVars[color],
          'slider_root',
          classNames?.root,
          className,
        )}
      >
        {/* Footer top (vertical: value at top) */}
        {isVertical && footer === true && (
          <span className={cn('text-sm text-text-secondary mb-1', 'slider_label', classNames?.label)}>{max}</span>
        )}

        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className={cn(
            sliderTrackVariants({ size, orientation }),
            getTrackColorClasses(variant),
            'relative cursor-pointer touch-none',
            isVertical && 'h-full',
            'slider_track',
            classNames?.track,
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {/* Fill segment */}
          {range && values.length > 1 ? (
            values.slice(0, -1).map((val, index) => {
              const start = getPercentage(val)
              const end = getPercentage(values[index + 1]!)
              return (
                <div
                  key={index}
                  className={cn(
                    'absolute rounded-full',
                    isVertical ? 'w-full' : 'h-full',
                    getFillColorClasses(variant),
                    'slider_range',
                    classNames?.range,
                  )}
                  style={getFillStyle(start, end)}
                />
              )
            })
          ) : (
            <div
              className={cn(
                'absolute rounded-full',
                isVertical ? 'w-full' : 'h-full',
                getFillColorClasses(variant),
                'slider_range',
                classNames?.range,
              )}
              style={getFillStyle(0, getPercentage(values[0] || 0))}
            />
          )}

          {/* Thumbs */}
          {values.map((val, index) => {
            const pct = getPercentage(val)
            const isAtStart = pct <= 0
            const isAtEnd = pct >= 100
            return (
              <div
                key={index}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={val}
                aria-disabled={disabled}
                aria-orientation={orientation}
                aria-label={range ? `Slider thumb ${index + 1}` : 'Slider'}
                className={cn(
                  thumbVariants({ size }),
                  getThumbColorClasses(variant),
                  '-translate-x-1/2',
                  disabled && 'cursor-not-allowed',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
                  isVertical
                    ? cn(
                        'left-1/2 translate-y-1/2',
                        isAtStart && 'translate-y-0',
                        isAtEnd && 'translate-y-full',
                      )
                    : cn(
                        'top-1/2 -translate-y-1/2',
                        isAtStart && 'translate-x-0',
                        isAtEnd && '-translate-x-full',
                      ),
                  'slider_thumb',
                  classNames?.thumb,
                )}
                data-index={index}
                style={getThumbStyle(pct)}
                onPointerDown={handlePointerDown}
                onKeyDown={handleThumbKeyDown}
              >
                <div
                  className={cn(
                    'absolute bg-text-primary text-background text-xs px-2 py-1 rounded whitespace-nowrap',
                    hoveredThumb === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    isVertical
                      ? 'left-full ml-2 top-1/2 -translate-y-1/2'
                      : '-top-8 left-1/2 -translate-x-1/2',
                  )}
                >
                  {val}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        {isVertical && footer === true && (
          <span className={cn('text-sm text-text-secondary mt-1', 'slider_label', classNames?.label)}>{min}</span>
        )}

        {!isVertical && footer === true && (
          <div className="flex justify-between mt-1 text-sm text-text-secondary">
            <span className={cn('slider_label', classNames?.label)}>{min}</span>
            <span className={cn('font-medium text-text-primary', 'slider_value', classNames?.value)}>
              {range && Array.isArray(value) ? value.join(' - ') : value}
            </span>
            <span className={cn('slider_label', classNames?.label)}>{max}</span>
          </div>
        )}
        {footer && typeof footer !== 'boolean' && footer}
      </div>
    )
  },
)

Slider.displayName = 'Slider'

export type * from './types'
export default Slider
