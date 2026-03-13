import type { ComponentColor, ComponentSize } from '../types'

export type NotificationVariant = 'default' | 'solid' | 'outline' | 'soft'

export type NotificationSize = ComponentSize

export interface NotificationAction {
  label: string
  onClick: () => void
}

export interface NotificationClassNames {
  root?: string
  icon?: string
  content?: string
  title?: string
  description?: string
  action?: string
  closeButton?: string
}

export interface NotificationProps {
  title?: string
  description?: string
  variant?: NotificationVariant
  color?: ComponentColor
  size?: NotificationSize
  closable?: boolean
  onClose?: () => void
  action?: NotificationAction
  className?: string
  classNames?: NotificationClassNames
  children?: React.ReactNode
}
