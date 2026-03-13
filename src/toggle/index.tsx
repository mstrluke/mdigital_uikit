'use client'

import { cva } from 'class-variance-authority'
import React, { useState } from 'react'

import { useRipple, RippleContainer } from '../hooks/useRipple'
import { cn } from '../utils'
import { colorVars } from '../variants'
import type { SingleToggleProps } from './types'

const getToggleClasses = (
  color: string,
  variant: string,
  isActive: boolean,
) => {
  const baseColor = colorVars[color as keyof typeof colorVars] || colorVars.default

  if (!isActive) {
    return cn(baseColor, 'border-border text-text-secondary hover:text-slot hover:bg-slot-10 hover:border-slot-30')
  }

  if (variant === 'solid') {
    return cn(baseColor, 'bg-slot border-slot text-slot-fg')
  }
  if (variant === 'soft') {
    return cn(baseColor, 'bg-slot-10 border-slot-30 text-slot')
  }
  // default variant
  return cn(baseColor, 'bg-slot-10 border-slot text-slot')
}

const singleToggleVariants = cva(
  'inline-flex items-center gap-2 font-medium transition-colors cursor-pointer border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      size: {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-5 py-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Toggle = React.memo<SingleToggleProps>(
  ({
    pressed: controlledPressed,
    defaultPressed = false,
    color = 'primary',
    size = 'md',
    variant = 'default',
    onChange,
    disabled = false,
    icon,
    children,
    'aria-label': ariaLabel,
    className,
    classNames,
    ref,
  }) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed)
    const { ripples, onPointerDown: ripplePointerDown, onKeyDown: rippleKeyDown, onAnimationEnd: rippleAnimationEnd } = useRipple(!disabled)

    const pressed =
      controlledPressed !== undefined ? controlledPressed : internalPressed

    const handleClick = () => {
      if (disabled) return

      const newPressed = !pressed
      if (controlledPressed === undefined) {
        setInternalPressed(newPressed)
      }
      onChange?.(newPressed)
    }

    return (
      <button
        data-slot="root"
        ref={ref}
        type="button"
        className={cn(
          'toggle_root',
          singleToggleVariants({ size }),
          getToggleClasses(color, variant, pressed),
          'border relative overflow-hidden',
          disabled && 'opacity-50 cursor-not-allowed',
          classNames?.root,
          className,
        )}
        onClick={handleClick}
        onPointerDown={ripplePointerDown}
        onKeyDown={rippleKeyDown}
        disabled={disabled}
        aria-pressed={pressed}
        aria-label={ariaLabel}
      >
        {icon}
        {children}
        <RippleContainer ripples={ripples} onAnimationEnd={rippleAnimationEnd} />
      </button>
    )
  },
)

Toggle.displayName = 'Toggle'

export type * from './types'
export default Toggle
