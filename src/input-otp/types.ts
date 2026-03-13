import type { ComponentSize } from '../types'

export type InputOTPSize = ComponentSize

export interface InputOTPClassNames {
  root?: string
  wrapper?: string
  label?: string
  slot?: string
  slotActive?: string
  separator?: string
  helper?: string
}

export interface InputOTPProps {
  length?: number
  size?: InputOTPSize
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  error?: string | boolean
  warning?: string | boolean
  info?: string | boolean
  success?: string | boolean
  helperText?: string
  disabled?: boolean
  autoFocus?: boolean
  type?: 'text' | 'number'
  pattern?: string
  label?: string
  messagePosition?: 'top' | 'bottom'
  className?: string
  classNames?: InputOTPClassNames
  ref?: React.Ref<HTMLDivElement>
}
