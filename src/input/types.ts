import type { ComponentSize, ValidationMessages } from '../types'

export type InputVariant = 'outline' | 'filled'

export type InputSize = ComponentSize

export interface InputClassNames {
  root?: string
  wrapper?: string
  label?: string
  input?: string
  leftIcon?: string
  rightIcon?: string
  clearButton?: string
  helper?: string
  error?: string
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    ValidationMessages {
  variant?: InputVariant
  size?: InputSize
  label?: string
  messagePosition?: 'top' | 'bottom'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  clearable?: boolean
  onClear?: () => void
  maxLength?: number
  showCount?: boolean
  ref?: React.Ref<HTMLInputElement>
  wrapperClassName?: string
  classNames?: InputClassNames
}
