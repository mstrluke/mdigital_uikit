'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { ChevronRight, MoreHorizontal, MoreVertical } from 'lucide-react'

import Dropdown from '../dropdown'
import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbsColor,
  BreadcrumbSeparatorProps,
  BreadcrumbsSize,
} from './types'

export type { BreadcrumbItemData } from './types'

interface BreadcrumbContextValue {
  color?: BreadcrumbsColor
  size?: BreadcrumbsSize
  classNames?: {
    list?: string
    item?: string
    link?: string
    separator?: string
    current?: string
  }
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({})

const breadcrumbVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const Breadcrumb = React.memo<BreadcrumbProps>(
  ({
    children,
    items,
    color = 'default',
    size = 'md',
    separator,
    className,
    classNames,
  }) => {
    const content = items?.length ? (
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.ellipsis ? (
                  <BreadcrumbEllipsis
                    orientation={item.ellipsisOrientation || 'horizontal'}
                    items={item.ellipsisItems || []}
                    size={size}
                  />
                ) : isLast ? (
                  <BreadcrumbPage
                    leftIcon={item.leftIcon}
                    rightIcon={item.rightIcon}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href || ''}
                    onClick={item.onClick}
                    leftIcon={item.leftIcon}
                    rightIcon={item.rightIcon}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator size={size}>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    ) : (
      children
    )

    return (
      <BreadcrumbContext.Provider value={{ color, size, classNames }}>
        <nav
          data-slot="root"
          aria-label="breadcrumb"
          className={cn(
            'breadcrumbs_root',
            breadcrumbVariants({ size }),
            colorVars[color],
            'text-slot',
            classNames?.root,
            className,
          )}
        >
          {content}
        </nav>
      </BreadcrumbContext.Provider>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = React.memo<BreadcrumbListProps>(
  ({ children, className }) => {
    const { classNames } = React.useContext(BreadcrumbContext)

    return (
      <ol
        className={cn(
          'breadcrumbs_list',
          'flex items-center gap-1.5',
          classNames?.list,
          className,
        )}
      >
        {children}
      </ol>
    )
  },
)

BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = React.memo<BreadcrumbItemProps>(
  ({ children, className }) => {
    const { classNames } = React.useContext(BreadcrumbContext)

    return (
      <li
        className={cn(
          'breadcrumbs_item',
          'inline-flex items-center gap-1.5',
          classNames?.item,
          className,
        )}
      >
        {children}
      </li>
    )
  },
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

export const BreadcrumbLink = React.memo<BreadcrumbLinkProps>(
  ({ children, href, onClick, leftIcon, rightIcon, className }) => {
    const { classNames } = React.useContext(BreadcrumbContext)

    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    }

    const content = (
      <>
        {leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="inline-flex items-center">{rightIcon}</span>
        )}
      </>
    )

    const linkClasses = cn(
      'breadcrumbs_link',
      'inline-flex items-center gap-1.5 transition-colors hover:underline cursor-pointer',
      classNames?.link,
      className,
    )

    if (href) {
      return (
        <a
          href={href}
          onClick={handleClick}
          className={linkClasses}
        >
          {content}
        </a>
      )
    }

    if (onClick) {
      return (
        <button
          type="button"
          onClick={handleClick}
          className={linkClasses}
        >
          {content}
        </button>
      )
    }

    return (
      <span
        className={cn(
          'breadcrumbs_link',
          'inline-flex items-center gap-1.5',
          classNames?.link,
          className,
        )}
      >
        {content}
      </span>
    )
  },
)

BreadcrumbLink.displayName = 'BreadcrumbLink'

export const BreadcrumbPage = React.memo<BreadcrumbPageProps>(
  ({ children, leftIcon, rightIcon, className }) => {
    const { classNames } = React.useContext(BreadcrumbContext)

    return (
      <span
        aria-current="page"
        className={cn(
          'breadcrumbs_current',
          'inline-flex items-center gap-1.5 font-medium',
          classNames?.current,
          className,
        )}
      >
        {leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="inline-flex items-center">{rightIcon}</span>
        )}
      </span>
    )
  },
)

BreadcrumbPage.displayName = 'BreadcrumbPage'

export const BreadcrumbSeparator = React.memo<BreadcrumbSeparatorProps>(
  ({ children, className, size = 'md' }) => {
    const { classNames } = React.useContext(BreadcrumbContext)

    return (
      <span
        aria-hidden="true"
        className={cn(
          'breadcrumbs_separator',
          'text-text-secondary',
          classNames?.separator,
          className,
        )}
      >
        {children ?? <ChevronRight className={iconSizes[size]} />}
      </span>
    )
  },
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

/**
 * Validates URL to prevent open redirect vulnerabilities
 * Only allows relative URLs or same-origin URLs
 */
const isValidNavigationUrl = (href: string): boolean => {
  // Allow relative URLs starting with / or #
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) {
    return true
  }

  // Block javascript: and other dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:']
  const lowerHref = href.toLowerCase()
  if (dangerousProtocols.some(protocol => lowerHref.startsWith(protocol))) {
    return false
  }

  // For absolute URLs, verify same origin
  if (typeof window !== 'undefined') {
    try {
      const url = new URL(href, window.location.origin)
      return url.origin === window.location.origin
    } catch {
      // If URL parsing fails, allow it (likely a relative URL)
      return true
    }
  }

  // SSR fallback - allow relative-looking URLs
  return true
}

export const BreadcrumbEllipsis = React.memo<BreadcrumbEllipsisProps>(
  ({ orientation = 'horizontal', items, children, className, size = 'md' }) => {
    const Icon = orientation === 'horizontal' ? MoreHorizontal : MoreVertical
    const isInteractive = !!(items?.length || children)

    const ellipsisButton = (
      <span
        {...(isInteractive && {
          role: 'button',
          'aria-label': 'Show more breadcrumbs',
          tabIndex: 0,
        })}
        {...(!isInteractive && {
          'aria-hidden': true,
        })}
        className={cn(
          'flex items-center justify-center',
          isInteractive && 'cursor-pointer',
          className,
        )}
      >
        <Icon className={iconSizes[size]} />
        <span className="sr-only">More</span>
      </span>
    )

    // If items or children are provided, wrap in Dropdown
    if (items || children) {
      const dropdownItems = (items || []).map((item) => ({
        label: item.label || '',
        value: item.label || '',
        onClick:
          item.onClick ||
          (() => {
            // Validate URL before navigation to prevent open redirect
            if (item.href && isValidNavigationUrl(item.href)) {
              window.location.href = item.href
            }
          }),
      }))

      return <Dropdown items={dropdownItems}>{ellipsisButton}</Dropdown>
    }

    return ellipsisButton
  },
)

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

export type * from './types'
export default Breadcrumb
