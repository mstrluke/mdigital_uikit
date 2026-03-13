import React, { useCallback, useRef, useState } from 'react'

import { cn } from '../utils'

interface RippleEntry {
  key: number
  x: number
  y: number
  size: number
}

/**
 * Lightweight ripple effect hook — GPU-composited (transform + opacity only).
 * Returns ripple state and handlers to attach to any interactive element.
 *
 * Animation uses only `transform: scale()` and `opacity` for 60fps performance.
 */
const MAX_RIPPLES = 5

export function useRipple(enabled: boolean) {
  const [ripples, setRipples] = useState<RippleEntry[]>([])
  const counter = useRef(0)

  const addRipple = useCallback(
    (x: number, y: number, size: number) => {
      const key = ++counter.current
      setRipples((prev) => {
        const next = [...prev, { key, x, y, size }]
        // Cap at MAX_RIPPLES to prevent unbounded growth from rapid clicks
        return next.length > MAX_RIPPLES ? next.slice(-MAX_RIPPLES) : next
      })
    },
    [],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return

      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      addRipple(x, y, size)
    },
    [enabled, addRipple],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!enabled) return
      if (e.key !== 'Enter' && e.key !== ' ') return

      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      // For keyboard events, center the ripple
      const x = rect.width / 2 - size / 2
      const y = rect.height / 2 - size / 2

      addRipple(x, y, size)
    },
    [enabled, addRipple],
  )

  const onAnimationEnd = useCallback((key: number) => {
    setRipples((prev) => prev.filter((r) => r.key !== key))
  }, [])

  return { ripples, onPointerDown, onKeyDown, onAnimationEnd } as const
}

// GPU-only animation (transform + opacity) — shared ripple span
const RippleSpan: React.FC<{
  x: number
  y: number
  size: number
  className?: string
  onAnimationEnd: () => void
}> = ({ x, y, size, className, onAnimationEnd }) => (
  <span
    className={cn(
      'absolute rounded-full bg-current opacity-25 pointer-events-none animate-[ripple_600ms_ease-out_forwards]',
      className,
    )}
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    onAnimationEnd={onAnimationEnd}
    aria-hidden="true"
  />
)

/**
 * Renders all active ripple spans. Drop this inside any `relative overflow-hidden` element.
 */
export const RippleContainer: React.FC<{
  ripples: RippleEntry[]
  className?: string
  onAnimationEnd: (key: number) => void
}> = ({ ripples, className, onAnimationEnd }) => {
  if (ripples.length === 0) return null
  return (
    <>
      {ripples.map((r) => (
        <RippleSpan
          key={r.key}
          x={r.x}
          y={r.y}
          size={r.size}
          className={className}
          onAnimationEnd={() => onAnimationEnd(r.key)}
        />
      ))}
    </>
  )
}
