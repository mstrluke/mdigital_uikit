'use client'

import type { Header } from '@tanstack/react-table'

import { ChevronDown, ChevronsUpDown, Pin, PinOff } from 'lucide-react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { TableColor, TableSize, TableVariant } from './types'
import { cellVariants } from './variants'

interface TableHeaderCellProps<TData>
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  header: Header<TData, unknown>
  size?: TableSize
  variant?: TableVariant
  color?: TableColor
  bordered?: boolean
  enableColumnPinning?: boolean
}

export function TableHeaderCell<TData>({
  header,
  size = 'md',
  variant = 'outline',
  color = 'default',
  bordered = false,
  enableColumnPinning = false,
  className,
  ...props
}: TableHeaderCellProps<TData>) {
  const isPinnedLeft = header.column.getIsPinned() === 'left'
  const isPinnedRight = header.column.getIsPinned() === 'right'

  // Slot-based: colorVars[color] on <th> sets --_c, children use slot utilities
  const hoverSlot = 'hover:bg-slot-10'
  const textSlot = 'text-slot'

  return (
    <th
      className={cn(
        'table_headerCell',
        colorVars[color],
        cellVariants({ size }),
        'font-semibold text-text-primary border-b border-border relative group',
        variant === 'line' && 'border-b-2',
        bordered && 'border-r border-border last:border-r-0',
        header.column.getCanSort() &&
          'cursor-pointer select-none hover:bg-background',
        isPinnedLeft && 'sticky left-0 bg-surface z-20',
        isPinnedRight && 'sticky right-0 bg-surface z-20',
        className,
      )}
      onClick={header.column.getToggleSortingHandler()}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex-1">
          {header.isPlaceholder
            ? null
            : typeof header.column.columnDef.header === 'function'
              ? header.column.columnDef.header(header.getContext())
              : header.column.columnDef.header}
        </span>
        <div className="flex items-center gap-1">
          {header.column.getCanSort() && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                header.column.toggleSorting()
              }}
              className={cn(
                'p-1 rounded transition-[colors,opacity]',
                header.column.getIsSorted()
                  ? `opacity-100 ${hoverSlot}`
                  : `opacity-0 group-hover:opacity-100 ${hoverSlot}`,
                header.column.getIsSorted() && textSlot,
              )}
            >
              {header.column.getIsSorted() === 'asc' ? (
                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
              ) : header.column.getIsSorted() === 'desc' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronsUpDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          {enableColumnPinning && header.column.getCanPin() && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                const isPinned = header.column.getIsPinned()
                if (isPinned) {
                  header.column.pin(false)
                } else {
                  header.column.pin('left')
                }
              }}
              className={cn(
                'p-1 rounded transition-[colors,opacity]',
                isPinnedLeft || isPinnedRight
                  ? `opacity-100 ${hoverSlot} ${textSlot}`
                  : `opacity-0 group-hover:opacity-100 ${hoverSlot}`,
              )}
            >
              {isPinnedLeft || isPinnedRight ? (
                <PinOff className="w-3.5 h-3.5" />
              ) : (
                <Pin className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </th>
  )
}

TableHeaderCell.displayName = 'TableHeaderCell'
