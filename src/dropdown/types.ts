import type React from 'react'
import type { ComponentColor, ComponentSize } from '../types'

export type DropdownSize = ComponentSize

export interface DropdownClassNames {
  root?: string
  trigger?: string
  menu?: string
  item?: string
  itemIcon?: string
  itemLabel?: string
}

export interface DropdownItem {
  label: React.ReactNode
  value?: string | number
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface DropdownRenderProps {
  /**
   * Function to close the dropdown
   */
  close: () => void
}

export interface DropdownProps {
  children: React.ReactNode
  items?: DropdownItem[]
  /**
   * Custom render function for dropdown content
   */
  render?: (props: DropdownRenderProps) => React.ReactNode
  color?: ComponentColor
  /**
   * Size variant (dropdown only supports xs, sm, md, lg)
   */
  size?: DropdownSize
  position?: 'left' | 'right'
  maxHeight?: number
  disabled?: boolean
  fullWidth?: boolean
  hover?: boolean
  className?: string
  classNames?: DropdownClassNames
  onItemClick?: (value: string | number) => void
  ref?: React.Ref<HTMLDivElement>
}
