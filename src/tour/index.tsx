'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { TourProps, TourPlacement } from './types'

function getTargetElement(target: string | (() => HTMLElement | null)): HTMLElement | null {
  if (typeof target === 'function') return target()
  return document.querySelector(target)
}

function getTargetBorderRadius(el: HTMLElement): string {
  if (typeof window === 'undefined') return '0px'
  return getComputedStyle(el).borderRadius || '0px'
}

// ── Popover positioning ─────────────────────────────────────
function computePopoverPosition(
  rect: DOMRect,
  placement: TourPlacement,
  gap: number,
): { top: number; left: number } {
  const base = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
  const align = placement.split('-')[1] as 'start' | 'end' | undefined

  let top = 0
  let left = 0

  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  if (base === 'bottom') {
    top = rect.bottom + gap
    left = align === 'start' ? rect.left : align === 'end' ? rect.right : cx
  } else if (base === 'top') {
    top = rect.top - gap
    left = align === 'start' ? rect.left : align === 'end' ? rect.right : cx
  } else if (base === 'left') {
    top = align === 'start' ? rect.top : align === 'end' ? rect.bottom : cy
    left = rect.left - gap
  } else {
    top = align === 'start' ? rect.top : align === 'end' ? rect.bottom : cy
    left = rect.right + gap
  }

  return { top, left }
}

function getPopoverStyle(
  rect: DOMRect,
  placement: TourPlacement,
  gap: number,
): React.CSSProperties {
  const base = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
  const align = placement.split('-')[1] as 'start' | 'end' | undefined

  const pos = computePopoverPosition(rect, placement, gap)
  const style: React.CSSProperties = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
  }

  // Transform for anchoring
  if (base === 'bottom') {
    if (!align) style.transform = 'translateX(-50%)'
    else if (align === 'end') style.transform = 'translateX(-100%)'
  } else if (base === 'top') {
    if (!align) style.transform = 'translate(-50%, -100%)'
    else if (align === 'start') style.transform = 'translateY(-100%)'
    else style.transform = 'translate(-100%, -100%)'
  } else if (base === 'left') {
    if (!align) style.transform = 'translate(-100%, -50%)'
    else if (align === 'start') style.transform = 'translateX(-100%)'
    else style.transform = 'translate(-100%, -100%)'
  } else {
    if (!align) style.transform = 'translateY(-50%)'
    else if (align === 'end') style.transform = 'translateY(-100%)'
  }

  return style
}

const sizeMap = {
  xs: { padding: 4, gap: 8, popover: 'p-3 max-w-[260px]', title: 'text-sm font-semibold', desc: 'text-xs', btn: 'h-6 px-2.5 text-xs' },
  sm: { padding: 6, gap: 10, popover: 'p-3.5 max-w-[300px]', title: 'text-sm font-semibold', desc: 'text-sm', btn: 'h-7 px-3 text-xs' },
  md: { padding: 8, gap: 12, popover: 'p-4 max-w-[340px]', title: 'text-base font-semibold', desc: 'text-sm', btn: 'h-8 px-3 text-sm' },
  lg: { padding: 10, gap: 14, popover: 'p-5 max-w-[400px]', title: 'text-lg font-semibold', desc: 'text-base', btn: 'h-9 px-4 text-sm' },
}

// Transition easing
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const DURATION = '350ms'

const Tour = React.memo<TourProps>(
  ({
    steps,
    open: controlledOpen,
    onOpenChange,
    current: controlledCurrent,
    onCurrentChange,
    color = 'primary',
    size = 'md',
    showProgress = true,
    showSkip = true,
    skipText = 'Skip',
    finishText = 'Finish',
    nextText = 'Next',
    prevText = 'Back',
    onFinish,
    onSkip,
    overlayClickable = false,
    className,
    classNames,
  }) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const [internalCurrent, setInternalCurrent] = useState(0)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const current = controlledCurrent !== undefined ? controlledCurrent : internalCurrent

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
    const [targetRadius, setTargetRadius] = useState('0px')
    const [entering, setEntering] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    const setOpen = useCallback(
      (v: boolean) => {
        if (controlledOpen === undefined) setInternalOpen(v)
        onOpenChange?.(v)
      },
      [controlledOpen, onOpenChange],
    )

    const setCurrent = useCallback(
      (v: number) => {
        if (controlledCurrent === undefined) setInternalCurrent(v)
        onCurrentChange?.(v)
      },
      [controlledCurrent, onCurrentChange],
    )

    const step = steps[current]
    const s = sizeMap[size]

    // Initial entrance animation
    useEffect(() => {
      if (isOpen) {
        setEntering(true)
        const t = setTimeout(() => setEntering(false), 400)
        return () => clearTimeout(t)
      }
    }, [isOpen])

    // Track target rect + border-radius
    useEffect(() => {
      if (!isOpen || !step) { setTargetRect(null); return }
      const el = getTargetElement(step.target)
      if (!el) { setTargetRect(null); return }

      const updateRect = () => {
        setTargetRect(el.getBoundingClientRect())
        setTargetRadius(getTargetBorderRadius(el))
      }
      updateRect()

      el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Collect all scrollable ancestors so the highlight follows if any of them scroll
      const scrollParents: (HTMLElement | Window)[] = [window]
      let parent = el.parentElement
      while (parent) {
        const { overflow, overflowX, overflowY } = getComputedStyle(parent)
        if (/auto|scroll/.test(overflow + overflowX + overflowY)) {
          scrollParents.push(parent)
        }
        parent = parent.parentElement
      }

      const ro = new ResizeObserver(updateRect)
      ro.observe(el)
      for (const sp of scrollParents) {
        sp.addEventListener('scroll', updateRect, { passive: true })
      }
      window.addEventListener('resize', updateRect, { passive: true })

      return () => {
        ro.disconnect()
        for (const sp of scrollParents) {
          sp.removeEventListener('scroll', updateRect)
        }
        window.removeEventListener('resize', updateRect)
      }
    }, [isOpen, current, step])

    const handleNext = () => {
      step?.onNext?.()
      if (current < steps.length - 1) setCurrent(current + 1)
      else { setOpen(false); onFinish?.() }
    }

    const handlePrev = () => {
      step?.onPrev?.()
      if (current > 0) setCurrent(current - 1)
    }

    const handleSkip = () => {
      setOpen(false)
      if (controlledCurrent === undefined) setInternalCurrent(0)
      onSkip?.()
    }

    useEffect(() => {
      if (!isOpen) return
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') handleSkip() }
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }, [isOpen])

    if (!isOpen || !step) return null

    const placement = step.placement || 'bottom'
    const isLast = current === steps.length - 1

    // The spotlight element — uses box-shadow to create the overlay
    // As this element transitions position/size/border-radius, the
    // entire overlay smoothly morphs to follow the target.
    const spotlightStyle: React.CSSProperties = targetRect
      ? {
          position: 'fixed',
          top: targetRect.top - s.padding,
          left: targetRect.left - s.padding,
          width: targetRect.width + s.padding * 2,
          height: targetRect.height + s.padding * 2,
          borderRadius: targetRadius,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          transition: entering
            ? 'none'
            : `top ${DURATION} ${EASE}, left ${DURATION} ${EASE}, width ${DURATION} ${EASE}, height ${DURATION} ${EASE}, border-radius ${DURATION} ${EASE}`,
          pointerEvents: 'none' as const,
          opacity: entering ? 0 : 1,
          animation: entering ? 'none' : undefined,
        }
      : {
          position: 'fixed' as const,
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
        }

    // Popover transitions position smoothly (no remount)
    const popoverStyle: React.CSSProperties = targetRect
      ? {
          ...getPopoverStyle(targetRect, placement, s.gap),
          transition: entering
            ? 'none'
            : `top ${DURATION} ${EASE}, left ${DURATION} ${EASE}, bottom ${DURATION} ${EASE}, right ${DURATION} ${EASE}`,
        }
      : { position: 'fixed', opacity: 0 }

    return (
      <div
        data-slot="root"
        className={cn('tour_root', colorVars[color], classNames?.root, className)}
        style={{ opacity: entering ? 0 : 1, transition: `opacity 300ms ${EASE}` }}
        ref={(el) => {
          // Trigger entrance fade after mount
          if (el && entering) requestAnimationFrame(() => setEntering(false))
        }}
      >
        {/* Spotlight overlay — single div, box-shadow creates darkened backdrop */}
        <div
          data-slot="overlay"
          className={cn('tour_overlay', 'z-[var(--z-overlay)]', classNames?.overlay)}
          onClick={overlayClickable ? handleSkip : undefined}
          style={spotlightStyle}
        />

        {/* Highlight ring — follows target shape */}
        {targetRect && (
          <div
            data-slot="highlight"
            className="fixed z-[var(--z-overlay)] pointer-events-none"
            style={{
              top: targetRect.top - s.padding,
              left: targetRect.left - s.padding,
              width: targetRect.width + s.padding * 2,
              height: targetRect.height + s.padding * 2,
              borderRadius: targetRadius,
              boxShadow: '0 0 0 2px var(--color-slot, #3b82f6), 0 0 12px 2px color-mix(in srgb, var(--color-slot, #3b82f6) 30%, transparent)',
              transition: `top ${DURATION} ${EASE}, left ${DURATION} ${EASE}, width ${DURATION} ${EASE}, height ${DURATION} ${EASE}, border-radius ${DURATION} ${EASE}`,
            }}
          />
        )}

        {/* Popover — position transitions, content crossfades */}
        <div
          ref={popoverRef}
          data-slot="popover"
          className={cn(
            'tour_popover',
            'z-[calc(var(--z-overlay)+1)] rounded-lg border border-border bg-background shadow-lg',
            s.popover,
            classNames?.popover,
          )}
          style={popoverStyle}
        >
          {step.cover && (
            <div data-slot="cover" className={cn('tour_cover', 'mb-3 rounded-md overflow-hidden', classNames?.cover)}>
              {step.cover}
            </div>
          )}

          <div data-slot="title" className={cn('tour_title', s.title, 'text-text-primary', classNames?.title)}>
            {step.title}
          </div>

          {step.description && (
            <div data-slot="description" className={cn('tour_description', s.desc, 'text-text-secondary mt-1', classNames?.description)}>
              {step.description}
            </div>
          )}

          <div data-slot="footer" className={cn('tour_footer', 'flex items-center justify-between mt-3 gap-2', classNames?.footer)}>
            <div className="flex items-center gap-2">
              {showProgress && (
                <span data-slot="indicator" className={cn('tour_indicator', 'text-xs text-text-secondary', classNames?.indicator)}>
                  {current + 1} / {steps.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {showSkip && !isLast && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className={cn('inline-flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary transition-colors font-medium cursor-pointer', s.btn)}
                >
                  {skipText}
                </button>
              )}

              {current > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={cn('inline-flex items-center justify-center rounded-md border border-border bg-background text-text-primary hover:bg-surface transition-colors font-medium cursor-pointer', s.btn)}
                >
                  {step.prevText || prevText}
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className={cn('inline-flex items-center justify-center rounded-md bg-slot text-slot-fg hover:bg-slot-90 transition-colors font-medium cursor-pointer', s.btn)}
              >
                {isLast ? finishText : step.nextText || nextText}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Tour.displayName = 'Tour'

export type * from './types'
export default Tour
