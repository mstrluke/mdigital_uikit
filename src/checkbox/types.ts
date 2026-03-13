import type { ButtonColor, ComponentSize } from '../types'

export type CheckboxColor = ButtonColor

export type CheckboxSize = ComponentSize

export type CheckboxVariant = 'solid' | 'outline' | 'soft'

export interface CheckboxClassNames {
  root?: string
  checkbox?: string
  indicator?: string
  label?: string
  description?: string
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  variant?: CheckboxVariant
  color?: CheckboxColor
  size?: CheckboxSize
  label?: React.ReactNode
  helperText?: string
  error?: string | boolean
  indeterminate?: boolean
  ref?: React.Ref<HTMLInputElement>
  classNames?: CheckboxClassNames
}

