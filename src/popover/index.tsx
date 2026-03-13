'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { PopoverClassNames } from './types'

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  )
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  )
}

const popoverContentVariants = cva(
  'overflow-hidden will-change-[transform,_opacity] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 z-[var(--z-popover)] w-72 origin-(--radix-popover-content-transform-origin) rounded-md border outline-none',
  {
    variants: {
      size: {
        xs: 'p-2 text-xs',
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
      variant: {
        default: 'bg-background border border-slot text-text-primary',
        solid: 'bg-slot border border-slot text-slot-fg',
        soft: 'backdrop-blur-sm bg-slot-10 border border-slot-30 text-slot',
      },
      color: colorVars,
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      color: 'default',
    },
  },
)

export interface PopoverContentProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, 'color'>,
    VariantProps<typeof popoverContentVariants> {
  classNames?: PopoverClassNames
  /**
   * Whether to render content in a React portal.
   * Set to `false` to keep content in the DOM tree (inherits parent CSS).
   * @default true
   */
  portal?: boolean
}

const PopoverContent = React.memo(({
  className,
  align = 'center',
  sideOffset = 4,
  size = 'md',
  variant = 'default',
  color = 'default',
  classNames,
  portal = true,
  ...props
}: PopoverContentProps) => {
  const content = (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'popover_content',
        popoverContentVariants({ size, variant, color }),
        className,
        classNames?.content,
      )}
      {...props}
    />
  )

  if (!portal) return content

  return (
    <PopoverPrimitive.Portal>
      {content}
    </PopoverPrimitive.Portal>
  )
})

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return (
    <PopoverPrimitive.Anchor
      data-slot="popover-anchor"
      {...props}
    />
  )
}

Popover.displayName = 'Popover'
PopoverTrigger.displayName = 'PopoverTrigger'
PopoverContent.displayName = 'PopoverContent'
PopoverAnchor.displayName = 'PopoverAnchor'

export type * from './types'
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
