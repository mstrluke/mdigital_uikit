import type { ComponentColor, ComponentSize } from '../types'

export type SpinnerSize = ComponentSize

export type SpinnerColor = ComponentColor

export interface SpinnerProps {
  size?: SpinnerSize
  color?: SpinnerColor
  label?: string
  className?: string
}
