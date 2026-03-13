'use client'

import React, { useEffect, useId, useRef } from 'react'


import { cn } from '../utils'
import type { ScrollAreaProps, ScrollAreaSize } from './types'

const stylesInjected = new Set<string>()

/**
 * Scrollbar thickness by size
 */
const scrollbarSizes: Record<ScrollAreaSize, string> = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
}

/**
 * ScrollArea root variants
 */
const scrollAreaBase = 'scroll-area_root relative overflow-hidden'

/**
 * ScrollArea Component
 * Provides a customizable scrollable container with styled scrollbars
 */
const ScrollArea = React.memo<ScrollAreaProps>(
  ({
    children,
    maxHeight,
    maxWidth,
    direction = 'vertical',
    size = 'md',
    scrollbarVisibility = 'auto',
    className,
    classNames,
    ref,
    style,
    ...props
  }) => {
    const scrollId = useId().replace(/:/g, '')
    const scrollClass = `scroll-area-${scrollId}`
    const thickness = scrollbarSizes[size]
    const styleElRef = useRef<HTMLStyleElement | null>(null)

    const getOverflowClass = () => {
      if (direction === 'vertical') return 'overflow-y-auto overflow-x-hidden'
      if (direction === 'horizontal') return 'overflow-x-auto overflow-y-hidden'
      return 'overflow-auto'
    }

    const viewportStyle: React.CSSProperties = {
      ...style,
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    }

    useEffect(() => {
      if (!stylesInjected.has(scrollClass)) {
        const baseOpacity = scrollbarVisibility === 'hover' ? '0' : '1'
        const hoverOpacity = '1'

        const scrollbarStyles = `
        .${scrollClass} {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--color-border)) transparent;
        }

        .${scrollClass}::-webkit-scrollbar {
          width: ${direction !== 'horizontal' ? thickness : '0'};
          height: ${direction !== 'vertical' ? thickness : '0'};
        }

        .${scrollClass}::-webkit-scrollbar-track {
          background: transparent;
          border-radius: ${thickness};
        }

        .${scrollClass}::-webkit-scrollbar-thumb {
          background: hsl(var(--color-border));
          border-radius: ${thickness};
          opacity: ${baseOpacity};
          transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }

        .${scrollClass}::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--color-border-strong));
        }

        ${
          scrollbarVisibility === 'hover'
            ? `.${scrollClass}:hover::-webkit-scrollbar-thumb {
          opacity: ${hoverOpacity};
        }`
            : ''
        }

        .${scrollClass}::-webkit-scrollbar-corner {
          background: transparent;
        }
      `

        const styleEl = document.createElement('style')
        styleEl.textContent = scrollbarStyles
        document.head.appendChild(styleEl)
        styleElRef.current = styleEl
        stylesInjected.add(scrollClass)
      }

      return () => {
        if (styleElRef.current) {
          document.head.removeChild(styleElRef.current)
          stylesInjected.delete(scrollClass)
        }
      }
    }, [scrollClass, direction, thickness, scrollbarVisibility])

    return (
      <div
        ref={ref}
        className={cn(
          scrollAreaBase,
          classNames?.root,
          className,
        )}
        data-slot="root"
        {...props}
      >
        <div
          className={cn(
            'scroll-area_viewport',
            scrollClass,
            getOverflowClass(),
            classNames?.viewport,
          )}
          style={viewportStyle}
          data-slot="viewport"
        >
          {children}
        </div>
      </div>
    )
  },
)

ScrollArea.displayName = 'ScrollArea'

export type * from './types'
export default ScrollArea
