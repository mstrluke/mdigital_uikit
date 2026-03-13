'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { TooltipProps } from './types'

const tooltipContentVariants = cva(
  'z-[var(--z-tooltip)] overflow-hidden rounded px-3 py-1.5 text-sm will-change-[transform,_opacity] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2',
  {
    variants: {
      size: {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-2.5 py-1',
        md: 'text-base px-3 py-1.5',
        lg: 'text-lg px-4 py-2',
      },
      color: colorVars,
      variant: {
        solid: 'bg-slot text-slot-fg',
        soft: 'bg-slot-20 text-slot border border-slot-30',
      },
    },
    defaultVariants: {
      size: 'sm',
      color: 'default',
      variant: 'solid',
    },
  },
)

export const TooltipProvider = TooltipPrimitive.Provider

export type {
  TooltipProps,
  TooltipProviderProps,
  TooltipColor,
  TooltipSize,
  TooltipVariant,
} from './types'

const Tooltip = React.memo<TooltipProps>(
  ({
    content,
    children,
    color = 'default',
    size = 'sm',
    variant = 'solid',
    side = 'top',
    align = 'center',
    delayDuration = 200,
    disabled = false,
    className,
    classNames,
    ...props
  }) => {
    if (disabled) {
      return <>{children}</>
    }

    return (
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            align={align}
            className={cn(
              'tooltip_content',
              tooltipContentVariants({ size, color, variant }),
              className,
              classNames?.content,
            )}
            sideOffset={4}
            {...props}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  },
)

Tooltip.displayName = 'Tooltip'

export type * from './types'
export default Tooltip
