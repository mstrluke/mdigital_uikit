'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { KbdProps } from './types'

const kbdVariants = cva(
  'pointer-events-none min-w-4 min-h-3.5 border inline-flex align-middle w-fit items-center justify-center gap-1 rounded-sm font-sans font-medium select-none',
  {
    variants: {
      variant: {
        solid: 'bg-slot border border-slot text-slot-fg',
        outline: 'bg-background border border-slot text-slot',
        soft: 'bg-slot-10 border border-slot-20 text-slot',
      },
      color: colorVars,
      size: {
        xs: 'h-3.5 p-0.5 text-[9px]',
        sm: 'h-4 p-0.5 text-xs',
        md: 'h-4.5 px-1.5 text-sm',
        lg: 'h-5 px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'outline',
      color: 'default',
      size: 'sm',
    },
  },
)

const Kbd = React.memo<KbdProps>(
  ({
    variant = 'outline',
    color = 'default',
    size = 'sm',
    className,
    children,
    ...props
  }) => {
    return (
      <kbd
        data-slot="root"
        className={cn(
          'kbd_root',
          kbdVariants({ variant, color, size }),
          "[&_svg:not([class*='size-'])]:size-3",
          className,
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  },
)

Kbd.displayName = 'Kbd'

export type * from './types'
export default Kbd
