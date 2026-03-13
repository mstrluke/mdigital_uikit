'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { Loader2, X, ChevronDown } from 'lucide-react'
import { useControllable } from '../hooks/useControllable'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { cn, iconSizes, statusMessageVariants } from '../utils'
import { colorVars } from '../variants'
import type { AutocompleteOption, AutocompleteProps } from './types'

const inputVariants = cva(
  'w-full flex items-center rounded-md bg-background text-text-primary border outline-none transition-colors',
  {
    variants: {
      status: {
        default: 'border-border focus-within:border-slot hover:border-slot-50',
        primary: 'border-slot', secondary: 'border-slot', accent: 'border-slot',
        success: 'border-slot', error: 'border-slot', warning: 'border-slot', info: 'border-slot',
      },
      size: {
        xs: 'h-(--input-height-xs) px-2 text-xs gap-1.5',
        sm: 'h-(--input-height-sm) px-2.5 text-sm gap-2',
        md: 'h-(--input-height-md) px-3 text-base gap-2',
        lg: 'h-(--input-height-lg) px-3.5 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
      fullWidth: true,
      disabled: false,
    },
  },
)

function normalizeOption(opt: string | AutocompleteOption): AutocompleteOption {
  return typeof opt === 'string' ? { label: opt, value: opt } : opt
}

const defaultFilter = (query: string, option: AutocompleteOption) =>
  option.label.toLowerCase().includes(query.toLowerCase())

const Autocomplete = React.memo<AutocompleteProps>(
  ({
    value,
    defaultValue = '',
    onChange,
    onSelect,
    options: rawOptions,
    placeholder,
    label,
    helperText,
    error,
    size = 'md',
    status: statusProp,
    disabled = false,
    loading = false,
    clearable = false,
    filter = defaultFilter,
    limit = 10,
    emptyMessage = 'No results',
    fullWidth = true,
    className,
    classNames,
  }) => {
    const [currentValue, setCurrentValue] = useControllable({ value, defaultValue, onChange })
    const [isOpen, setIsOpen] = React.useState(false)
    const [highlightIdx, setHighlightIdx] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const labelId = React.useId()
    // Guard against blur closing the dropdown while clicking an option
    const selectingRef = React.useRef(false)
    const status = error ? 'error' : statusProp || 'default'

    const options = React.useMemo(
      () => rawOptions.map(normalizeOption),
      [rawOptions],
    )

    const filtered = React.useMemo(() => {
      if (!currentValue) return options.slice(0, limit)
      return options.filter((o) => filter(currentValue, o)).slice(0, limit)
    }, [currentValue, options, filter, limit])

    // Reset highlight when filtered list changes
    React.useEffect(() => {
      setHighlightIdx(-1)
    }, [filtered.length])

    const updateValue = (v: string) => {
      setCurrentValue(v)
    }

    const open = () => {
      if (!disabled) setIsOpen(true)
    }

    const close = () => {
      setIsOpen(false)
      setHighlightIdx(-1)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(e.target.value)
      open()
    }

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return
      updateValue(option.label)
      onSelect?.(option)
      close()
      // Refocus input after selection
      requestAnimationFrame(() => inputRef.current?.focus())
    }

    const handleClear = () => {
      updateValue('')
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isOpen) { open(); return }
        setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (!isOpen) { open(); return }
        setHighlightIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && highlightIdx >= 0 && isOpen && filtered[highlightIdx]) {
        e.preventDefault()
        handleSelect(filtered[highlightIdx])
      } else if (e.key === 'Escape') {
        close()
      } else if (e.key === 'Tab') {
        close()
      }
    }

    const handleFocus = () => {
      open()
    }

    const handleBlur = () => {
      // Delay close so option mousedown/click can fire first
      setTimeout(() => {
        if (!selectingRef.current) close()
        selectingRef.current = false
      }, 150)
    }

    React.useEffect(() => {
      if (highlightIdx >= 0 && listRef.current) {
        const el = listRef.current.children[highlightIdx] as HTMLElement
        el?.scrollIntoView?.({ block: 'nearest' })
      }
    }, [highlightIdx])

    return (
      <div
        data-slot="root"
        className={cn(
          'autocomplete_root',
          'flex flex-col gap-1.5',
          colorVars[status === 'default' ? 'primary' : status],
          fullWidth ? 'w-full' : 'inline-flex',
          classNames?.root,
          className,
        )}
      >
        {label && (
          <label
            id={labelId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <Popover open={isOpen && !disabled} onOpenChange={(v) => { if (!v) close() }}>
          <PopoverAnchor asChild>
            <div
              className={inputVariants({ status, size, fullWidth, disabled })}
              onClick={() => { if (!isOpen) open(); inputRef.current?.focus() }}
            >
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-labelledby={label ? labelId : undefined}
                className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-text-secondary/50"
                placeholder={placeholder}
                value={currentValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={disabled}
              />
              {loading && (
                <Loader2 className={cn('animate-spin text-text-secondary', iconSizes[size])} />
              )}
              {clearable && currentValue && !disabled && !loading && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => { e.stopPropagation(); handleClear() }}
                  className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label="Clear"
                >
                  <X className={iconSizes[size]} />
                </button>
              )}
              {!loading && !clearable && (
                <ChevronDown
                  className={cn(
                    'text-text-secondary transition-transform duration-200',
                    iconSizes[size],
                    isOpen && 'rotate-180',
                  )}
                />
              )}
            </div>
          </PopoverAnchor>

          <PopoverContent
            className={cn(
              'autocomplete_dropdown',
              'p-1 w-[var(--radix-popover-trigger-width)] max-h-60 overflow-y-auto',
              classNames?.dropdown,
            )}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              // Don't close if clicking the anchor/input area
              const target = e.target as HTMLElement
              if (inputRef.current?.contains(target)) {
                e.preventDefault()
              }
            }}
          >
            <div ref={listRef} role="listbox">
              {filtered.length === 0 ? (
                <div
                  className={cn(
                    'autocomplete_empty',
                    'px-3 py-2 text-sm text-text-secondary text-center',
                    classNames?.empty,
                  )}
                >
                  {emptyMessage}
                </div>
              ) : (
                filtered.map((option, idx) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={idx === highlightIdx}
                    aria-disabled={option.disabled}
                    onMouseDown={(e) => {
                      // Prevent blur from firing before select
                      e.preventDefault()
                      selectingRef.current = true
                    }}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightIdx(idx)}
                    className={cn(
                      'autocomplete_option',
                      'px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                      idx === highlightIdx && 'bg-surface',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                      !option.disabled && 'hover:bg-surface',
                      classNames?.option,
                    )}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {(error || helperText) && (
          <p className={cn(
            'text-xs',
            error ? statusMessageVariants({ status: 'error' }) : 'text-text-secondary',
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  },
)

Autocomplete.displayName = 'Autocomplete'

export type * from './types'
export default Autocomplete
