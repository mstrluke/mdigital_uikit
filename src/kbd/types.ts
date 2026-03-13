import type { ComponentColor, ComponentSize } from '../types'

export type KbdVariant = 'solid' | 'outline' | 'soft'

export type KbdSize = ComponentSize

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: KbdVariant
  color?: ComponentColor
  size?: KbdSize
  className?: string
}
