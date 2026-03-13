import type React from 'react'

export interface NavigationMenuClassNames {
  root?: string
  list?: string
  item?: string
  trigger?: string
  content?: string
  link?: string
  indicator?: string
  viewport?: string
}

export interface NavigationMenuItem {
  key: string
  label: React.ReactNode
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
  children?: NavigationMenuChildItem[]
  onClick?: () => void
}

export interface NavigationMenuChildItem {
  key: string
  label: React.ReactNode
  description?: string
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[]
  orientation?: 'horizontal' | 'vertical'
  /** Delay (ms) before dropdown closes on mouse leave @default 150 */
  closeDelay?: number
  className?: string
  classNames?: NavigationMenuClassNames
  ref?: React.Ref<HTMLElement>
}
