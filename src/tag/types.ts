import type { ComponentColor, ComponentSize } from '../types'

export type TagVariant = 'default' | 'solid' | 'outline' | 'soft'

export type TagColor = ComponentColor

export type TagSize = ComponentSize

export interface TagClassNames {
  root?: string
  content?: string
  closeButton?: string
}

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  children?: React.ReactNode
  variant?: TagVariant
  color?: TagColor
  size?: TagSize
  closable?: boolean
  onClose?: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLSpanElement>) => void
  onClick?: (e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => void
  icon?: React.ReactNode
  className?: string
  classNames?: TagClassNames
  disableKeyboardRemoval?: boolean
}
