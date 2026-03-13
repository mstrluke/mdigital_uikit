'use client'

import {
  Group,
  Panel,
  Separator,
} from 'react-resizable-panels'

import React from 'react'
import { MoreVertical } from 'lucide-react'
import { cn } from '../utils'
import type {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
} from './types'

const ResizablePanelGroup = React.memo(({
  className,
  ...props
}: ResizablePanelGroupProps) => {
  return (
    <Group
      data-slot="resizable-group"
      className={cn(
        'resizable_group',
        'flex h-full w-full',
        className,
      )}
      {...props}
    />
  )
})

const ResizablePanel = React.memo(({ className, ...props }: ResizablePanelProps) => {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn('resizable_panel', className)}
      {...props}
    />
  )
})

const ResizableHandle = React.memo(({
  withHandle = false,
  className,
  ...props
}: ResizableHandleProps) => {
  const elRef = React.useRef<HTMLDivElement>(null)
  const [isVertical, setIsVertical] = React.useState(false)

  React.useEffect(() => {
    const el = elRef.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return
    const dir = getComputedStyle(parent).flexDirection
    setIsVertical(dir === 'column')
  }, [])

  return (
    <Separator
      elementRef={elRef}
      data-slot="resizable-handle"
      className={cn(
        'resizable_handle',
        'group relative flex items-center justify-center',
        'bg-border',
        'focus-visible:outline-none',
        isVertical ? 'h-px' : 'w-px',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className={cn(
          'z-10 flex items-center justify-center rounded-sm border border-border bg-background',
          'opacity-0 transition-opacity group-hover:opacity-100',
          isVertical ? 'w-4 h-3' : 'h-4 w-3',
        )}>
          <MoreVertical className={cn(
            'w-2.5 h-2.5 text-text-secondary',
            isVertical && 'rotate-90',
          )} />
        </div>
      )}
    </Separator>
  )
})

ResizablePanelGroup.displayName = 'ResizablePanelGroup'
ResizablePanel.displayName = 'ResizablePanel'
ResizableHandle.displayName = 'ResizableHandle'

export type * from './types'
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
