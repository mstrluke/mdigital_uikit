import type { InputClassNames, InputProps } from '../input/types'

export interface InputPasswordClassNames extends InputClassNames {
  toggleButton?: string
  toggleIcon?: string
}

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'classNames'> {
  visibilityToggle?: boolean
  classNames?: InputPasswordClassNames
}
