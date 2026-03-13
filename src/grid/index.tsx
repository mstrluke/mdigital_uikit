'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import type { GridProps } from './types'

const gridVariants = cva('w-full grid', {
  variants: {
    gap: {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    },
  },
  defaultVariants: {
    gap: 'md',
    columns: 3,
  },
})

const Grid = React.memo<GridProps>(({ children, columns = 3, gap = 'md', className, ref }) => {
  return (
    <div ref={ref} data-slot="root" className={cn('grid_root', gridVariants({ gap, columns }), className)}>
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export type * from './types'
export default Grid
