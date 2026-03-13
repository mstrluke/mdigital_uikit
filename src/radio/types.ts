import type { ButtonColor, ComponentSize } from '../types'

export type RadioColor = ButtonColor

export type RadioSize = ComponentSize

export interface RadioClassNames {
  root?: string
  radio?: string
  indicator?: string
  label?: string
  description?: string
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  color?: RadioColor
  size?: RadioSize
  label?: React.ReactNode
  helperText?: string
  error?: string | boolean
  ref?: React.Ref<HTMLInputElement>
  classNames?: RadioClassNames
}
