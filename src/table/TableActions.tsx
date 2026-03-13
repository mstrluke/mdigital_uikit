'use client'

import { Columns3, Search } from 'lucide-react'

import Button from '../button'
import Checkbox from '../checkbox'
import Input from '../input'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import ToggleGroup from '../toggle-group'
import { cn, iconSizes } from '../utils'
import type { TableColor, TableSize } from './types'

interface TableActionsProps {
  searchValue: string
  onSearchChange: (value: string) => void
  visibleColumns: string[]
  allColumns: Array<{ id: string; label: string }>
  onVisibleColumnsChange: (columns: string[]) => void
  size: TableSize
  onSizeChange: (size: TableSize) => void
  color?: TableColor
  className?: string
}

export function TableActions({
  searchValue,
  onSearchChange,
  visibleColumns,
  allColumns,
  onVisibleColumnsChange,
  size,
  onSizeChange,
  color = 'default',
  className,
}: TableActionsProps) {
  const handleColumnToggle = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      onVisibleColumnsChange(visibleColumns.filter((id) => id !== columnId))
    } else {
      onVisibleColumnsChange([...visibleColumns, columnId])
    }
  }

  const sizeOptions = [
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
  ]

  return (
    <div className={cn('table_actions flex flex-wrap items-center gap-4 rounded-md', className)}>
      {/* Search Input - Left */}
      <div className="w-auto mr-auto">
        <Input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          size="sm"
          rightIcon={<Search className={iconSizes[size]} />}
        />
      </div>

      {/* Column Visibility Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Columns3 className={iconSizes[size]} />}
          >
            Columns
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {allColumns.map((col) => (
              <label
                key={col.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-surface rounded cursor-pointer"
              >
                <Checkbox
                  checked={visibleColumns.includes(col.id)}
                  onChange={() => handleColumnToggle(col.id)}
                  color={color === 'default' ? 'primary' : color}
                  size="sm"
                />
                <span className="text-sm text-text-primary">{col.label}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Size Toggle Group */}
      <ToggleGroup
        options={sizeOptions}
        value={size}
        onChange={(value) => onSizeChange(value as TableSize)}
        color={color}
        size="sm"
        variant="default"
      />
    </div>
  )
}

TableActions.displayName = 'TableActions'
