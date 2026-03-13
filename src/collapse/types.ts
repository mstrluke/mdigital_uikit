import type { ComponentColor, ComponentSize } from '../types'

export type CollapseVariant = 'default' | 'solid' | 'soft'
export type CollapseSize = ComponentSize

export interface CollapseClassNames {
  root?: string
  header?: string
  content?: string
  icon?: string
}

export interface CollapseProps {
  title: React.ReactNode
  children: React.ReactNode
  color?: ComponentColor
  /**
   * Size variant (collapse only supports xs, sm, md, lg)
   */
  size?: CollapseSize
  variant?: CollapseVariant
  defaultOpen?: boolean
  open?: boolean
  onChange?: (open: boolean) => void
  disabled?: boolean
  className?: string
  classNames?: CollapseClassNames
  ref?: React.Ref<HTMLDivElement>
}
