'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { SpinnerProps } from './types'

const spinnerVariants = cva(
  'inline-block border border-current border-t-transparent rounded-full animate-spin',
  {
    variants: {
      size: {
        xs: 'w-3 h-3 border',
        sm: 'w-4 h-4 border',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2',
      },
      color: colorVars,
    },
    defaultVariants: {
      size: 'sm',
      color: 'primary',
    },
  },
)

const Spinner = React.memo<SpinnerProps>(({ size = 'sm', color = 'primary', label, className }) => {
  return (
    <div data-slot="root" className={cn('spinner_root', 'inline-flex flex-col items-center gap-2', className)}>
      <div
        className={cn(spinnerVariants({ size, color }), 'text-slot')}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </div>
  )
})

Spinner.displayName = 'Spinner'

export type * from './types'
export { Spinner }
export default Spinner
