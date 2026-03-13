'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

import { cn } from '../utils'
import type { AnchorItem, AnchorProps } from './types'

const sizeClasses = {
  xs: { link: 'text-xs py-0.5 pl-3', indicator: 'w-0.5' },
  sm: { link: 'text-sm py-0.5 pl-3', indicator: 'w-0.5' },
  md: { link: 'text-sm py-1 pl-4', indicator: 'w-0.5' },
  lg: { link: 'text-base py-1 pl-5', indicator: 'w-1' },
}

function flattenIds(list: AnchorItem[]): string[] {
  return list.flatMap((item) => [item.id, ...(item.children ? flattenIds(item.children) : [])])
}

function getScrollContainer(getContainer?: () => HTMLElement | Window): HTMLElement | Window {
  if (getContainer) return getContainer()
  return typeof window !== 'undefined' ? window : (null as any)
}

function getContainerRect(container: HTMLElement | Window): { top: number } {
  if (!container || container === window || container instanceof Window) return { top: 0 }
  return (container as HTMLElement).getBoundingClientRect()
}

function scrollTo(container: HTMLElement | Window, top: number) {
  container.scrollTo({ top, behavior: 'smooth' })
}

const Anchor = React.memo<AnchorProps>(
  ({
    items,
    offset = 0,
    targetOffset = 0,
    size = 'md',
    affix = false,
    affixTop = 0,
    getContainer,
    className,
    classNames,
    onChange,
  }) => {
    const [activeId, setActiveId] = useState<string>('')
    const [indicatorTop, setIndicatorTop] = useState(0)
    const [indicatorHeight, setIndicatorHeight] = useState(0)
    const navRef = useRef<HTMLElement>(null)
    const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
    const isScrolling = useRef(false)

    const allIds = flattenIds(items)

    const updateActive = useCallback(() => {
      if (isScrolling.current) return
      if (typeof window === 'undefined') return

      const container = getScrollContainer(getContainer)
      const containerTop = getContainerRect(container).top

      let current = ''
      for (const id of allIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Position relative to scroll container
          const relativeTop = rect.top - containerTop
          if (relativeTop <= offset + 10) current = id
        }
      }
      if (current && current !== activeId) {
        setActiveId(current)
        onChange?.(current)
      }
    }, [allIds, offset, activeId, onChange, getContainer])

    useEffect(() => {
      if (typeof window === 'undefined') return
      const container = getScrollContainer(getContainer)
      const target = container instanceof Window ? window : container

      target.addEventListener('scroll', updateActive, { passive: true })
      updateActive()
      return () => target.removeEventListener('scroll', updateActive)
    }, [updateActive, getContainer])

    useEffect(() => {
      if (!activeId || !navRef.current) return
      const linkEl = linkRefs.current.get(activeId)
      if (linkEl) {
        const navRect = navRef.current.getBoundingClientRect()
        const linkRect = linkEl.getBoundingClientRect()
        setIndicatorTop(linkRect.top - navRect.top)
        setIndicatorHeight(linkRect.height)
      }
    }, [activeId])

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (!el) return

        const container = getScrollContainer(getContainer)

        isScrolling.current = true
        setActiveId(id)
        onChange?.(id)

        if (container instanceof Window) {
          const y = el.getBoundingClientRect().top + window.scrollY - targetOffset
          scrollTo(container, y)
        } else {
          const y = el.offsetTop - targetOffset
          scrollTo(container, y)
        }

        setTimeout(() => { isScrolling.current = false }, 800)
      },
      [targetOffset, onChange, getContainer],
    )

    const s = sizeClasses[size]
    const depthPadding = { 0: '', 1: 'pl-6', 2: 'pl-10', 3: 'pl-14' } as Record<number, string>

    const renderLink = (item: AnchorItem, depth = 0) => (
      <React.Fragment key={item.id}>
        <a
          ref={(el) => { if (el) linkRefs.current.set(item.id, el) }}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          data-slot="link"
          className={cn(
            'anchor_link',
            'block text-text-secondary hover:text-text-primary transition-colors truncate',
            s.link,
            depth > 0 && (depthPadding[depth] || 'pl-14'),
            activeId === item.id && 'text-primary font-medium',
            activeId === item.id && classNames?.activeLink,
            classNames?.link,
          )}
        >
          {item.label}
        </a>
        {item.children?.map((child) => renderLink(child, depth + 1))}
      </React.Fragment>
    )

    return (
      <nav
        ref={navRef}
        data-slot="root"
        className={cn(
          'anchor_root',
          'relative',
          affix && 'sticky',
          classNames?.root,
          className,
        )}
        style={affix ? { top: affixTop } : undefined}
        aria-label="Table of contents"
      >
        <div
          data-slot="indicator"
          className={cn(
            'anchor_indicator',
            'absolute left-0 rounded-full bg-primary transition-all duration-200',
            s.indicator,
            classNames?.indicator,
          )}
          style={{
            top: indicatorTop,
            height: indicatorHeight,
            opacity: activeId ? 1 : 0,
          }}
        />

        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        {items.map((item) => renderLink(item))}
      </nav>
    )
  },
)

Anchor.displayName = 'Anchor'

export type * from './types'
export default Anchor
