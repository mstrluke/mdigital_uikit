'use client'

import { cva } from 'class-variance-authority'
import React, { useCallback, useLayoutEffect, useRef } from 'react'

import { useControllable } from '../hooks/useControllable'

import { ChevronDown } from 'lucide-react'

import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { CollapseProps } from './types'

const collapseVariants = 'w-full border rounded-md overflow-hidden'

const collapseHeaderVariants = cva(
  'w-full flex items-center justify-between cursor-pointer touch-manipulation font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm',
  {
    variants: {
      size: {
        xs: 'px-2 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'hover:bg-surface/50',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

const collapseContentVariants = cva('', {
  variants: {
    size: {
      xs: 'px-2 pb-2 text-xs',
      sm: 'px-3 pb-3 text-sm',
      md: 'px-4 pb-4 text-base',
      lg: 'px-5 pb-5 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// Variant × color: slot-based — colorVars[color] sets --_c on root
const variantStyles = {
  default: 'border-slot bg-background text-text-primary',
  solid: 'border-slot bg-slot text-slot-fg',
  soft: 'border-slot-30 bg-slot-10 text-text-primary',
}

const headerVariantStyles = {
  default: 'text-slot hover:bg-slot-10',
  solid: 'hover:bg-slot-90',
  soft: 'text-slot hover:bg-slot-20',
}

const Collapse = React.memo<CollapseProps>(
  ({
    title,
    children,
    color = 'default',
    size = 'md',
    variant = 'default',
    defaultOpen = false,
    open: controlledOpen,
    onChange,
    disabled = false,
    className,
    classNames,
    ref,
  }) => {
    const [isOpen, setOpen] = useControllable({ value: controlledOpen, defaultValue: defaultOpen, onChange })
    const uniqueId = React.useId()
    const headerId = `collapse-header-${uniqueId}`
    const contentId = `collapse-content-${uniqueId}`
    const panelRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const prevOpenRef = useRef(isOpen)
    const cachedHeightRef = useRef<number>(0)
    const animRef = useRef<Animation | null>(null)

    const handlePointerEnter = useCallback(() => {
      if (contentRef.current) {
        cachedHeightRef.current = contentRef.current.scrollHeight
      }
    }, [])

    useLayoutEffect(() => {
      if (panelRef.current) {
        panelRef.current.style.height = isOpen ? 'auto' : '0'
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useLayoutEffect(() => {
      const panel = panelRef.current
      const content = contentRef.current
      if (!panel || !content) return

      const wasOpen = prevOpenRef.current
      prevOpenRef.current = isOpen
      if (isOpen === wasOpen) return

      if (animRef.current) animRef.current.cancel()

      const height = cachedHeightRef.current || content.scrollHeight
      cachedHeightRef.current = 0

      // Check for prefers-reduced-motion
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      const duration = prefersReducedMotion ? 0 : 200

      const anim = panel.animate(
        isOpen
          ? [{ height: '0px' }, { height: `${height}px` }]
          : [{ height: `${height}px` }, { height: '0px' }],
        { duration, easing: 'ease-out', fill: 'forwards' },
      )

      anim.onfinish = () => {
        panel.style.height = isOpen ? 'auto' : '0'
        anim.cancel()
      }

      animRef.current = anim
    }, [isOpen])

    const handleToggle = useCallback(() => {
      if (disabled) return
      setOpen(!isOpen)
    }, [disabled, isOpen, setOpen])

    return (
      <div
        ref={ref}
        className={cn(
          'collapse_root',
          collapseVariants,
          colorVars[color],
          variantStyles[variant],
          classNames?.root,
          className,
        )}
        data-slot="root"
      >
        <button
          id={headerId}
          type="button"
          onClick={handleToggle}
          onPointerEnter={handlePointerEnter}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={cn(
            'collapse_header',
            collapseHeaderVariants({ size, disabled }),
            headerVariantStyles[variant],
            'focus-visible:ring-slot',
            classNames?.header,
          )}
          data-slot="header"
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              'collapse_icon',
              iconSizes[size],
              'transition-transform duration-300 ease-out flex-shrink-0',
              isOpen && 'rotate-180',
              classNames?.icon,
            )}
            data-slot="icon"
          />
        </button>
        <div
          ref={panelRef}
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          aria-hidden={!isOpen}
          className="overflow-hidden"
          style={{ contain: 'content' }}
        >
          <div ref={contentRef}>
            <div
              className={cn(
                'collapse_content',
                collapseContentVariants({ size }),
                classNames?.content,
              )}
              data-slot="content"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Collapse.displayName = 'Collapse'

export type * from './types'
export default Collapse
