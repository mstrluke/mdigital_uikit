'use client'

import { useEffect, useRef, useState } from 'react'

import Input from '../input'
import { cn } from '../utils'
import type { TableSize } from './types'

interface EditableCellProps<TValue = unknown> {
  value: TValue
  onValueChange: (value: TValue) => void
  size?: TableSize
  className?: string
}

export function EditableCell<TValue = unknown>({
  value,
  onValueChange,
  size = 'md',
  className,
}: EditableCellProps<TValue>) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(value ?? ''))
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditValue(String(value ?? ''))
  }, [value])

  const handleSave = () => {
    setIsEditing(false)
    if (editValue !== String(value ?? '')) {
      onValueChange(editValue as TValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(String(value ?? ''))
      setIsEditing(false)
    }
  }

  const sizeClasses = {
    xs: 'text-xs py-0.5',
    sm: 'text-sm py-1',
    md: 'text-base py-1.5',
    lg: 'text-lg py-2',
  }

  const inputSizeMap = {
    xs: 'sm' as const,
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  return (
    <div
      ref={containerRef}
      className={cn('table_editableCell relative w-full max-w-full overflow-hidden', className)}
    >
      {isEditing ? (
        <div className="w-full">
          <Input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            size={inputSizeMap[size]}
            className="w-full min-w-0 max-w-full"
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className={cn(
            'cursor-text hover:bg-surface/50 rounded transition-colors min-h-[20px] px-3 w-full overflow-hidden text-ellipsis whitespace-nowrap',
            sizeClasses[size],
          )}
          title="Click to edit"
        >
          {String(value ?? '')}
        </div>
      )}
    </div>
  )
}

EditableCell.displayName = 'EditableCell'
