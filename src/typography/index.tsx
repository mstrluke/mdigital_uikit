'use client'

import { Check, Copy } from 'lucide-react'
import React, { useState, useCallback, useRef, useEffect } from 'react'

import { cn } from '../utils'
import type { TitleProps, TextProps, ParagraphProps, TypographyLevel, TextSize } from './types'

const levelElements: Record<TypographyLevel, string> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
}

const levelClasses: Record<TypographyLevel, string> = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const textColorClasses = {
  default: 'text-text-primary',
  primary: 'text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-secondary/60',
  accent: 'text-accent',
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
  inherit: '',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }, [text])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center ml-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  )
}

function useTruncation(truncate: boolean | number | undefined, ref: React.RefObject<HTMLElement | null>) {
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (!truncate || expanded || !ref.current) return
    const el = ref.current
    setIsTruncated(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
  }, [truncate, expanded, ref])

  return { expanded, setExpanded, isTruncated }
}

// ── Title ────────────────────────────────────────────────────
const Title = React.memo<TitleProps>(
  ({ level = 'h1', color = 'default', copyable = false, className, children, ...props }) => {
    const Tag = levelElements[level]
    const textContent = typeof children === 'string' ? children : ''

    return React.createElement(
      Tag as any,
      {
        'data-slot': 'title',
        className: cn('typography_title', levelClasses[level], textColorClasses[color] || '', className),
        ...props,
      },
      <>
        {children}
        {copyable && textContent && <CopyButton text={textContent} />}
      </>,
    )
  },
)

Title.displayName = 'Title'

// ── Text ─────────────────────────────────────────────────────
const Text = React.memo<TextProps>(
  ({
    size = 'md',
    weight,
    color = 'default',
    truncate,
    copyable = false,
    code = false,
    mark = false,
    del: deleted = false,
    underline = false,
    strong = false,
    italic = false,
    as: Component = 'span',
    className,
    children,
    ...props
  }) => {
    const ref = useRef<HTMLElement>(null)
    const { expanded, setExpanded, isTruncated } = useTruncation(truncate, ref)
    const textContent = typeof children === 'string' ? children : ''

    const truncateClass = !expanded && truncate
      ? typeof truncate === 'number'
        ? `line-clamp-${truncate}`
        : 'truncate'
      : ''

    let content: React.ReactNode = children
    if (code) content = <code className="px-1 py-0.5 rounded bg-surface text-sm font-mono">{content}</code>
    if (mark) content = <mark className="bg-warning/20 px-0.5 rounded-sm">{content}</mark>
    if (deleted) content = <del>{content}</del>
    if (underline) content = <u>{content}</u>
    if (strong) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>

    return React.createElement(
      Component,
      {
        ref: ref as any,
        'data-slot': 'text',
        className: cn(
          'typography_text',
          sizeClasses[size],
          weight && weightClasses[weight],
          textColorClasses[color] || '',
          truncateClass,
          className,
        ),
        ...props,
      },
      <>
        {content}
        {copyable && textContent && <CopyButton text={textContent} />}
        {isTruncated && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-primary hover:text-primary/80 ml-1 text-inherit cursor-pointer"
          >
            more
          </button>
        )}
      </>,
    )
  },
)

Text.displayName = 'Text'

// ── Paragraph ────────────────────────────────────────────────
const Paragraph = React.memo<ParagraphProps>(
  ({
    size = 'md',
    color = 'default',
    truncate,
    copyable = false,
    className,
    children,
    ...props
  }) => {
    const ref = useRef<HTMLParagraphElement>(null)
    const { expanded, setExpanded, isTruncated } = useTruncation(truncate, ref)
    const textContent = typeof children === 'string' ? children : ''

    const truncateClass = !expanded && truncate
      ? typeof truncate === 'number'
        ? `line-clamp-${truncate}`
        : 'truncate'
      : ''

    return (
      <p
        ref={ref}
        data-slot="paragraph"
        className={cn(
          'typography_paragraph',
          sizeClasses[size],
          textColorClasses[color] || '',
          truncateClass,
          'leading-relaxed',
          className,
        )}
        {...props}
      >
        {children}
        {copyable && textContent && <CopyButton text={textContent} />}
        {isTruncated && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-primary hover:text-primary/80 ml-1 text-inherit cursor-pointer"
          >
            more
          </button>
        )}
      </p>
    )
  },
)

Paragraph.displayName = 'Paragraph'

export type * from './types'
export { Title, Text, Paragraph }
