import type { ComponentSize, ValidationMessages, CreateClassNames } from '../types'

export type NumberInputSize = ComponentSize

export interface NumberInputClassNames extends CreateClassNames<
  'root' | 'wrapper' | 'input' | 'label' | 'helper' | 'error' | 'increment' | 'decrement' | 'controls'
> {}

export interface NumberInputProps extends ValidationMessages {
  value?: number
  defaultValue?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  size?: NumberInputSize
  label?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  controls?: boolean
  controlsPosition?: 'right' | 'sides'
  clampOnBlur?: boolean
  className?: string
  classNames?: NumberInputClassNames
  ref?: React.Ref<HTMLInputElement>
  id?: string
  name?: string
}
