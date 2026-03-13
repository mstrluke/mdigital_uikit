import type { ComponentColor, ComponentSize } from '../types'

export type FloatButtonShape = 'circle' | 'square'

export interface FloatButtonClassNames {
  root?: string
  button?: string
  badge?: string
  tooltip?: string
  group?: string
}

export interface FloatButtonProps {
  icon?: React.ReactNode
  label?: string
  tooltip?: string
  badge?: number | string
  onClick?: () => void
  href?: string
  target?: string
  color?: ComponentColor
  size?: ComponentSize
  shape?: FloatButtonShape
  disabled?: boolean
  className?: string
  classNames?: FloatButtonClassNames
  style?: React.CSSProperties
}

export interface FloatButtonGroupProps {
  children: React.ReactNode
  trigger?: 'click' | 'hover'
  icon?: React.ReactNode
  closeIcon?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  shape?: FloatButtonShape
  color?: ComponentColor
  size?: ComponentSize
  placement?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
  classNames?: FloatButtonClassNames
  style?: React.CSSProperties
}

export interface BackTopProps extends Omit<FloatButtonProps, 'onClick'> {
  visibilityHeight?: number
  onClick?: () => void
}
