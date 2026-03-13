import type { ReactNode } from 'react'
import type { ComponentColor, ComponentSize } from '../types'

export type BreadcrumbsColor = ComponentColor

export type BreadcrumbsSize = ComponentSize

export interface BreadcrumbsClassNames {
  root?: string
  list?: string
  item?: string
  link?: string
  separator?: string
  current?: string
}

export interface BreadcrumbItemData {
  label: string
  href?: string
  /**
   * Click handler (used instead of href for custom navigation)
   */
  onClick?: () => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  ellipsis?: boolean
  ellipsisOrientation?: 'horizontal' | 'vertical'
  /**
   * Items to show in the ellipsis dropdown
   */
  ellipsisItems?: Array<{
    label: string
    href?: string
    onClick?: () => void
  }>
}

export interface BreadcrumbProps {
  items?: BreadcrumbItemData[]
  /**
   * Manual children (alternative to items prop)
   */
  children?: ReactNode
  color?: BreadcrumbsColor
  size?: BreadcrumbsSize
  separator?: ReactNode
  className?: string
  classNames?: BreadcrumbsClassNames
}

export interface BreadcrumbListProps {
  children: ReactNode
  className?: string
}

export interface BreadcrumbItemProps {
  children: ReactNode
  className?: string
}

export interface BreadcrumbLinkProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export interface BreadcrumbPageProps {
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export interface BreadcrumbSeparatorProps {
  children?: ReactNode
  className?: string
  size?: BreadcrumbsSize
}

export interface BreadcrumbEllipsisProps {
  orientation?: 'horizontal' | 'vertical'
  items?: Array<{
    label: string
    href?: string
    onClick?: () => void
  }>
  children?: ReactNode
  className?: string
  size?: BreadcrumbsSize
}
