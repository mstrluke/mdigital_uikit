import type { ComponentColor, ComponentSize } from '../types'

export interface TagsInputClassNames {
  root?: string
  input?: string
  tag?: string
  tagLabel?: string
  tagClose?: string
  wrapper?: string
}

export interface TagsInputProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  suggestions?: string[]
  placeholder?: string
  maxTags?: number
  allowDuplicates?: boolean
  separator?: string | string[]
  addOnBlur?: boolean
  addOnPaste?: boolean
  validate?: (value: string) => boolean
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string) => void
  size?: ComponentSize
  color?: ComponentColor
  disabled?: boolean
  readOnly?: boolean
  label?: string
  error?: string
  helperText?: string
  clearable?: boolean
  fullWidth?: boolean
  className?: string
  classNames?: TagsInputClassNames
}
