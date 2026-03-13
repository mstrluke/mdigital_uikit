import type { ComponentColor, ComponentSize } from '../types'

export type TabsColor = ComponentColor

export type TabsVariant = 'default' | 'solid' | 'soft' | 'pill'

export type TabsSize = ComponentSize

export interface TabItem {
  key: string
  label: string
  /**
   * Content to display when tab is active
   */
  content?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabsClassNames {
  root?: string
  list?: string
  tab?: string
  tabActive?: string
  indicator?: string
  panel?: string
}

export interface TabsProps {
  items: TabItem[]
  /**
   * Default active tab key (uncontrolled)
   */
  defaultActiveKey?: string
  /**
   * Active tab key (controlled)
   */
  activeKey?: string
  color?: TabsColor
  size?: TabsSize
  variant?: TabsVariant
  onChange?: (key: string) => void
  className?: string
  classNames?: TabsClassNames
}
