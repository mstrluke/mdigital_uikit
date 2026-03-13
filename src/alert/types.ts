import type { ComponentColor, ComponentSize } from '../types'

export type AlertVariant = 'default' | 'solid' | 'outline' | 'soft'

export interface AlertClassNames {
  root?: string
  icon?: string
  content?: string
  title?: string
  description?: string
  closeButton?: string
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode | null
  variant?: AlertVariant
  color?: ComponentColor
  size?: ComponentSize
  closable?: boolean
  onClose?: () => void
  className?: string
  classNames?: AlertClassNames
  children?: React.ReactNode
}
