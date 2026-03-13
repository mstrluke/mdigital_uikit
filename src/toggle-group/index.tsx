'use client'

import { cva } from 'class-variance-authority'
import React, { useState, useCallback } from 'react'

import { useRipple, RippleContainer } from '../hooks/useRipple'
import { cn } from '../utils'
import { colorVars } from '../variants'
import type { ToggleGroupProps } from './types'

const toggleGroupVariants = cva(
  'inline-flex border rounded-md overflow-hidden',
)

const toggleItemVariants = cva(
  'font-medium transition-colors cursor-pointer border-r last:border-r-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      size: {
        xs: 'h-(--toggle-height-xs) px-(--toggle-padding-x-xs) text-xs',
        sm: 'h-(--toggle-height-sm) px-(--toggle-padding-x-sm) text-sm',
        md: 'h-(--toggle-height-md) px-(--toggle-padding-x-md) text-base',
        lg: 'h-(--toggle-height-lg) px-(--toggle-padding-x-lg) text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const getToggleClasses = (
  variant: string,
  isActive: boolean,
) => {
  if (!isActive) {
    return 'text-text-secondary hover:text-slot hover:bg-slot-10'
  }

  if (variant === 'solid') {
    return 'bg-slot border-slot text-slot-fg'
  }
  if (variant === 'soft') {
    return 'bg-slot-10 border-slot-30 text-slot'
  }
  // default variant
  return 'bg-slot-10 border-slot text-slot'
}

const ToggleItemButton = React.memo<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }>(({ children, disabled, className, ...props }) => {
  const { ripples, onPointerDown, onKeyDown, onAnimationEnd } = useRipple(!disabled)
  return (
    <button className={cn(className, 'relative overflow-hidden')} onPointerDown={onPointerDown} onKeyDown={onKeyDown} disabled={disabled} {...props}>
      {children}
      <RippleContainer ripples={ripples} onAnimationEnd={onAnimationEnd} />
    </button>
  )
})

export const ToggleGroup = React.memo<ToggleGroupProps>(
  ({
    options,
    value: controlledValue,
    defaultValue,
    multiple = false,
    color = 'primary',
    size = 'md',
    variant = 'default',
    onChange,
    fullWidth = false,
    disabled = false,
    className,
    centered = false,
    classNames,
    ref,
  }) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (multiple ? [] : options?.[0]?.value || ''),
    )

    const value =
      controlledValue !== undefined ? controlledValue : internalValue

    const handleToggleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const optionValue = e.currentTarget.dataset.value
        const optionDisabled = e.currentTarget.dataset.disabled === 'true'

        if (!optionValue || disabled || optionDisabled) return

        setInternalValue((prevValue) => {
          const currentValues = Array.isArray(prevValue) ? prevValue : []
          let newValue: string | string[]

          if (multiple) {
            if (currentValues.includes(optionValue)) {
              newValue = currentValues.filter((v) => v !== optionValue)
            } else {
              newValue = [...currentValues, optionValue]
            }
          } else {
            newValue = optionValue
          }

          onChange?.(newValue)
          return controlledValue !== undefined ? prevValue : newValue
        })
      },
      [disabled, multiple, onChange, controlledValue],
    )

    const isActive = (optionValue: string) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(optionValue)
      }
      return optionValue === value
    }

    const baseColor = colorVars[color as keyof typeof colorVars] || colorVars.default

    return (
      <div
        data-slot="root"
        ref={ref}
        role="group"
        className={cn(
          'toggleGroup_root',
          toggleGroupVariants(),
          baseColor,
          'border-slot-20 bg-background',
          classNames?.root,
          className,
          fullWidth && 'grid w-full',
        )}
        style={fullWidth ? { gridTemplateColumns: `repeat(${options.length}, 1fr)` } : undefined}
      >
        {options.map((option) => {
          const active = isActive(option.value)
          const isDisabled = disabled || option.disabled

          return (
            <ToggleItemButton
              type="button"
              key={option.value}
              className={cn(
                'toggleGroup_item',
                toggleItemVariants({ size }),
                getToggleClasses(variant, active),
                'border-slot-20 flex items-center justify-center',
                isDisabled && 'opacity-50 cursor-not-allowed',
                centered && 'text-center',
                classNames?.item,
              )}
              data-value={option.value}
              data-disabled={option.disabled}
              onClick={handleToggleClick}
              disabled={isDisabled}
              aria-pressed={active}
            >
              <div className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </div>
            </ToggleItemButton>
          )
        })}
      </div>
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'

export type * from './types'
export default ToggleGroup
