import type { ComponentSize, ValidationMessages, CreateClassNames } from '../types'

export type FloatInputSize = ComponentSize

export interface FloatInputClassNames extends CreateClassNames<
  'root' | 'input' | 'label' | 'helper' | 'wrapper' | 'leftIcon' | 'rightIcon' | 'clearButton' | 'error'
> {}

export interface FloatInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    ValidationMessages {
  label: string
  size?: FloatInputSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  clearable?: boolean
  onClear?: () => void
  classNames?: FloatInputClassNames
  ref?: React.Ref<HTMLInputElement>
}
