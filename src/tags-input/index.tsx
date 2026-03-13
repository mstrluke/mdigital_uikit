'use client'

import { cva } from 'class-variance-authority'
import React, { useState, useRef, useCallback, useMemo } from 'react'

import { X } from 'lucide-react'
import { useControllable } from '../hooks/useControllable'
import { cn, statusMessageVariants } from '../utils'
import { colorVars } from '../variants'
import type { TagsInputProps } from './types'

const wrapperVariants = cva(
  'flex flex-wrap items-center gap-1 rounded-md border bg-background text-text-primary transition-colors cursor-text',
  {
    variants: {
      size: {
        xs: 'min-h-(--input-height-xs) px-(--input-padding-x-xs) py-0.5 text-xs',
        sm: 'min-h-(--input-height-sm) px-(--input-padding-x-sm) py-1 text-sm',
        md: 'min-h-(--input-height-md) px-(--input-padding-x-md) py-1 text-sm',
        lg: 'min-h-(--input-height-lg) px-(--input-padding-x-lg) py-1.5 text-base',
      },
      status: {
        default: 'border-border focus-within:border-primary',
        error: 'border-error focus-within:border-error',
      },
    },
    defaultVariants: { size: 'md', status: 'default' },
  },
)

const tagVariants = cva(
  'inline-flex items-center gap-0.5 rounded-md font-medium transition-colors bg-slot-10 text-slot',
  {
    variants: {
      size: {
        xs: 'h-4 px-1 text-[10px]',
        sm: 'h-5 px-1.5 text-xs',
        md: 'h-6 px-2 text-xs',
        lg: 'h-7 px-2.5 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const TagsInput = React.memo<TagsInputProps>(
  ({
    value,
    defaultValue = [],
    onChange,
    suggestions,
    placeholder = 'Add tag...',
    maxTags,
    allowDuplicates = false,
    separator = ',',
    addOnBlur = true,
    addOnPaste = true,
    validate,
    onTagAdd,
    onTagRemove,
    size = 'md',
    color = 'primary',
    disabled = false,
    readOnly = false,
    label,
    error,
    helperText,
    clearable = false,
    fullWidth = true,
    className,
    classNames,
  }) => {
    const [tags, setTags] = useControllable({ value, defaultValue, onChange })
    const [inputValue, setInputValue] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [highlightedIdx, setHighlightedIdx] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)

    const separators = useMemo(
      () => (Array.isArray(separator) ? separator : [separator]),
      [separator],
    )

    const addTag = useCallback(
      (raw: string) => {
        const tag = raw.trim()
        if (!tag) return false
        if (maxTags && tags.length >= maxTags) return false
        if (!allowDuplicates && tags.includes(tag)) return false
        if (validate && !validate(tag)) return false
        setTags([...(tags || []), tag])
        onTagAdd?.(tag)
        return true
      },
      [tags, maxTags, allowDuplicates, validate, setTags, onTagAdd],
    )

    const removeTag = useCallback(
      (idx: number) => {
        const tag = tags[idx]
        const next = tags.filter((_, i) => i !== idx)
        setTags(next)
        if (tag) onTagRemove?.(tag)
      },
      [tags, setTags, onTagRemove],
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || separators.includes(e.key)) {
        e.preventDefault()
        if (showSuggestions && highlightedIdx >= 0 && filteredSuggestions[highlightedIdx]) {
          addTag(filteredSuggestions[highlightedIdx])
          setInputValue('')
          setShowSuggestions(false)
          setHighlightedIdx(-1)
        } else if (addTag(inputValue)) {
          setInputValue('')
          setShowSuggestions(false)
        }
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1)
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
      } else if (e.key === 'ArrowDown' && showSuggestions) {
        e.preventDefault()
        setHighlightedIdx((p) => Math.min(p + 1, filteredSuggestions.length - 1))
      } else if (e.key === 'ArrowUp' && showSuggestions) {
        e.preventDefault()
        setHighlightedIdx((p) => Math.max(p - 1, 0))
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!addOnPaste) return
      e.preventDefault()
      const text = e.clipboardData.getData('text')
      const parts = text.split(new RegExp(`[${separators.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}]`))
      let added = false
      for (const part of parts) {
        if (addTag(part)) added = true
      }
      if (added) setInputValue('')
    }

    const handleBlur = () => {
      setShowSuggestions(false)
      if (addOnBlur && inputValue.trim()) {
        if (addTag(inputValue)) setInputValue('')
      }
    }

    const filteredSuggestions = useMemo(() => {
      if (!suggestions || !inputValue.trim()) return []
      const q = inputValue.toLowerCase()
      return suggestions.filter(
        (s) => s.toLowerCase().includes(q) && (allowDuplicates || !tags.includes(s)),
      )
    }, [suggestions, inputValue, tags, allowDuplicates])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      setShowSuggestions(!!e.target.value.trim() && !!suggestions?.length)
      setHighlightedIdx(-1)
    }

    const atMax = !!maxTags && tags.length >= maxTags

    return (
      <div
        data-slot="root"
        className={cn(
          'tagsInput_root',
          'flex flex-col gap-1.5',
          fullWidth ? 'w-full' : 'inline-flex',
          colorVars[color],
          classNames?.root,
          className,
        )}
      >
        {label && (
          <label data-slot="label" className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        <div className="relative">
          <div
            data-slot="wrapper"
            className={cn(
              'tagsInput_wrapper',
              wrapperVariants({ size, status: error ? 'error' : 'default' }),
              disabled && 'opacity-50 cursor-not-allowed',
              classNames?.wrapper,
            )}
            onClick={() => !disabled && !readOnly && inputRef.current?.focus()}
          >
            {tags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                data-slot="tag"
                className={cn('tagsInput_tag', tagVariants({ size }), classNames?.tag)}
              >
                <span className={cn('tagsInput_tagLabel truncate max-w-[150px]', classNames?.tagLabel)}>
                  {tag}
                </span>
                {!readOnly && !disabled && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeTag(idx) }}
                    className={cn('tagsInput_tagClose shrink-0 hover:text-slot-80 cursor-pointer', classNames?.tagClose)}
                    aria-label={`Remove ${tag}`}
                    tabIndex={-1}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}

            {!atMax && !readOnly && !disabled && (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onBlur={handleBlur}
                onFocus={() => inputValue.trim() && suggestions?.length && setShowSuggestions(true)}
                placeholder={tags.length === 0 ? placeholder : ''}
                disabled={disabled}
                readOnly={readOnly}
                data-slot="input"
                className={cn(
                  'tagsInput_input',
                  'flex-1 min-w-[60px] bg-transparent outline-none placeholder:text-text-secondary/50',
                  classNames?.input,
                )}
              />
            )}

            {clearable && tags.length > 0 && !disabled && !readOnly && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setTags([]) }}
                className="shrink-0 text-text-secondary hover:text-text-primary"
                aria-label="Clear all tags"
                tabIndex={-1}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-[var(--z-popover)] mt-1 w-full rounded-md border border-border bg-background shadow-md max-h-[200px] overflow-auto">
              {filteredSuggestions.map((s, idx) => (
                <div
                  key={s}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    addTag(s)
                    setInputValue('')
                    setShowSuggestions(false)
                  }}
                  onMouseEnter={() => setHighlightedIdx(idx)}
                  className={cn(
                    'px-3 py-1.5 text-sm cursor-pointer transition-colors',
                    idx === highlightedIdx ? 'bg-surface text-text-primary' : 'text-text-primary hover:bg-surface',
                  )}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p data-slot="message" className={cn('text-xs', error ? statusMessageVariants({ status: 'error' }) : 'text-text-secondary')}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  },
)

TagsInput.displayName = 'TagsInput'

export type * from './types'
export default TagsInput
