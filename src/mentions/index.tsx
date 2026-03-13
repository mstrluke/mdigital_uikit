'use client'

import { cva } from 'class-variance-authority'
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'

import { useControllable } from '../hooks/useControllable'
import { cn, statusMessageVariants } from '../utils'
import type { MentionOption, MentionsProps } from './types'

const textareaVariants = cva(
  'w-full rounded-md border bg-background text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface read-only:cursor-default',
  {
    variants: {
      size: {
        xs: 'px-(--input-padding-x-xs) py-1.5 text-xs',
        sm: 'px-(--input-padding-x-sm) py-2 text-sm',
        md: 'px-(--input-padding-x-md) py-2 text-sm',
        lg: 'px-(--input-padding-x-lg) py-2.5 text-base',
      },
      status: {
        default: 'border-border focus:border-primary',
        error: 'border-error focus:border-error',
      },
    },
    defaultVariants: { size: 'md', status: 'default' },
  },
)

function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
  const div = document.createElement('div')
  const style = getComputedStyle(element)
  const props = [
    'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'wordWrap', 'whiteSpace', 'overflowWrap',
  ] as const

  div.style.position = 'absolute'
  div.style.visibility = 'hidden'
  div.style.whiteSpace = 'pre-wrap'
  div.style.wordWrap = 'break-word'
  div.style.width = `${element.offsetWidth}px`
  for (const prop of props) div.style[prop as any] = style.getPropertyValue(prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`))

  div.textContent = element.value.substring(0, position)
  const span = document.createElement('span')
  span.textContent = element.value.substring(position) || '.'
  div.appendChild(span)
  document.body.appendChild(div)

  const top = span.offsetTop - element.scrollTop
  const left = span.offsetLeft - element.scrollLeft
  document.body.removeChild(div)
  return { top, left }
}

const Mentions = React.memo<MentionsProps>(
  ({
    value,
    defaultValue = '',
    onChange,
    onSelect,
    options = [],
    triggers = ['@'],
    loading = false,
    size = 'md',
    disabled = false,
    readOnly = false,
    placeholder,
    rows = 3,
    label,
    error,
    helperText,
    fullWidth = true,
    className,
    classNames,
  }) => {
    const [currentValue, setCurrentValue] = useControllable({ value, defaultValue: defaultValue ?? '', onChange })
    const [showDropdown, setShowDropdown] = useState(false)
    const [query, setQuery] = useState('')
    const [activeTrigger, setActiveTrigger] = useState('')
    const [triggerStart, setTriggerStart] = useState(-1)
    const [highlightedIdx, setHighlightedIdx] = useState(0)
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const update = setCurrentValue

    const filteredOptions = useMemo(() => {
      if (!query) return options
      const q = query.toLowerCase()
      return options.filter(
        (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
      )
    }, [options, query])

    const insertMention = useCallback(
      (option: MentionOption) => {
        const before = currentValue.substring(0, triggerStart)
        const after = currentValue.substring(textareaRef.current?.selectionStart ?? triggerStart)
        const mention = `${activeTrigger}${option.value} `
        const next = before + mention + after
        update(next)
        onSelect?.(option, activeTrigger)
        setShowDropdown(false)
        setQuery('')

        requestAnimationFrame(() => {
          if (textareaRef.current) {
            const pos = before.length + mention.length
            textareaRef.current.selectionStart = pos
            textareaRef.current.selectionEnd = pos
            textareaRef.current.focus()
          }
        })
      },
      [currentValue, triggerStart, activeTrigger, update, onSelect],
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value
      update(v)

      const cursor = e.target.selectionStart
      const textBefore = v.substring(0, cursor)

      let found = false
      for (const trigger of triggers) {
        const lastTrigger = textBefore.lastIndexOf(trigger)
        if (lastTrigger >= 0) {
          const between = textBefore.substring(lastTrigger + trigger.length)
          const charBefore = lastTrigger > 0 ? (textBefore[lastTrigger - 1] ?? ' ') : ' '
          if (/\s/.test(charBefore) || lastTrigger === 0) {
            if (!/\s/.test(between)) {
              setActiveTrigger(trigger)
              setTriggerStart(lastTrigger)
              setQuery(between)
              setShowDropdown(true)
              setHighlightedIdx(0)
              found = true

              if (typeof window !== 'undefined' && textareaRef.current) {
                const coords = getCaretCoordinates(textareaRef.current, lastTrigger)
                setDropdownPos({ top: coords.top + 24, left: coords.left })
              }
              break
            }
          }
        }
      }
      if (!found) setShowDropdown(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!showDropdown || filteredOptions.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIdx((p) => Math.min(p + 1, filteredOptions.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIdx((p) => Math.max(p - 1, 0))
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        if (filteredOptions[highlightedIdx]) insertMention(filteredOptions[highlightedIdx])
      } else if (e.key === 'Escape') {
        setShowDropdown(false)
      }
    }

    useEffect(() => {
      if (highlightedIdx >= filteredOptions.length) setHighlightedIdx(Math.max(0, filteredOptions.length - 1))
    }, [filteredOptions.length, highlightedIdx])

    return (
      <div
        data-slot="root"
        className={cn(
          'mentions_root',
          'flex flex-col gap-1.5',
          fullWidth ? 'w-full' : 'inline-flex',
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
          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            data-slot="textarea"
            className={cn(
              'mentions_textarea',
              textareaVariants({ size, status: error ? 'error' : 'default' }),
              'resize-y',
              classNames?.textarea,
            )}
          />

          {showDropdown && filteredOptions.length > 0 && (
            <div
              data-slot="dropdown"
              className={cn(
                'mentions_dropdown',
                'absolute z-[var(--z-popover)] rounded-md border border-border bg-background shadow-md max-h-[200px] overflow-auto min-w-[180px]',
                classNames?.dropdown,
              )}
              style={{ top: dropdownPos.top, left: Math.min(dropdownPos.left, 200) }}
            >
              {loading ? (
                <div className="px-3 py-2 text-sm text-text-secondary">Loading...</div>
              ) : (
                filteredOptions.map((option, idx) => (
                  <div
                    key={option.value}
                    onMouseDown={(e) => { e.preventDefault(); insertMention(option) }}
                    onMouseEnter={() => setHighlightedIdx(idx)}
                    data-slot="option"
                    className={cn(
                      'mentions_option',
                      'flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors',
                      idx === highlightedIdx ? 'bg-surface text-text-primary' : 'text-text-primary hover:bg-surface',
                      classNames?.option,
                    )}
                  >
                    {option.icon && <span className="shrink-0 w-5 h-5">{option.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-text-secondary truncate">{option.description}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
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

Mentions.displayName = 'Mentions'

export type * from './types'
export default Mentions
