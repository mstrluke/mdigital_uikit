import type React from 'react'
import type { ComponentColor } from '../types'

export interface ContextMenuClassNames {
  root?: string
  content?: string
  item?: string
  itemIcon?: string
  itemLabel?: string
  divider?: string
  submenu?: string
}

export interface ContextMenuItem {
  key: string
  label?: React.ReactNode
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
  /**
   * Nested items (submenu)
   */
  children?: ContextMenuItem[]
  /**
   * Separator (if true, other properties are ignored)
   */
  separator?: boolean
}

export interface ContextMenuProps {
  children: React.ReactNode
  items: ContextMenuItem[]
  className?: string
  classNames?: ContextMenuClassNames
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  color?: ComponentColor
  /** Delay (ms) before submenu opens on hover @default 200 */
  submenuOpenDelay?: number
  /** Delay (ms) before submenu closes on mouse leave @default 300 */
  submenuCloseDelay?: number
}

export interface ContextMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ContextMenuItem[]
  onClose: () => void
  /**
   * Nesting level (for styling)
   */
  level?: number
  classNames?: ContextMenuClassNames
  color?: ComponentColor
  /** Delay (ms) before submenu opens on hover @default 200 */
  submenuOpenDelay?: number
  /** Delay (ms) before submenu closes on mouse leave @default 300 */
  submenuCloseDelay?: number
}

export interface ContextMenuSubMenuProps {
  item: ContextMenuItem
  onClose: () => void
  level: number
  classNames?: ContextMenuClassNames
  color?: ComponentColor
  /** Delay (ms) before submenu opens on hover @default 200 */
  openDelay?: number
  /** Delay (ms) before submenu closes on mouse leave @default 300 */
  closeDelay?: number
}
