'use client'

import type { Row } from '@tanstack/react-table'

import { cn } from '../utils'

interface TableRowProps<TData>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  row: Row<TData>
  index: number
  striped?: boolean
  hoverable?: boolean
  onRowClick?: (row: TData) => void
  isPinned?: boolean
  isExpanded?: boolean
}

export function TableRow<TData>({
  row,
  index,
  striped = false,
  hoverable = true,
  onRowClick,
  isPinned = false,
  isExpanded = false,
  className,
  children,
  ...props
}: TableRowProps<TData>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onRowClick(row.original)
    }
  }

  return (
    <tr
      className={cn(
        'table_row border-b border-border last:border-b-0 transition-colors duration-150',
        striped && index % 2 === 1 && 'bg-surface/50',
        hoverable && 'hover:bg-surface cursor-pointer',
        onRowClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
        isPinned && 'bg-primary/5 border-primary/20',
        row.getIsSelected() && 'bg-primary/10',
        className,
      )}
      onClick={() => onRowClick?.(row.original)}
      onKeyDown={handleKeyDown}
      tabIndex={onRowClick ? 0 : undefined}
      role={onRowClick ? 'button' : undefined}
      {...props}
    >
      {children}
    </tr>
  )
}

TableRow.displayName = 'TableRow'
