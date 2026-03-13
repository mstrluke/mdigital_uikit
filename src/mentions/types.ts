import type { ComponentSize } from '../types'

export interface MentionOption {
  label: string
  value: string
  icon?: React.ReactNode
  description?: string
}

export interface MentionsClassNames {
  root?: string
  textarea?: string
  dropdown?: string
  option?: string
  highlight?: string
}

export interface MentionsProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (option: MentionOption, trigger: string) => void
  options?: MentionOption[]
  triggers?: string[]
  loading?: boolean
  size?: ComponentSize
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  rows?: number
  autoSize?: boolean
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  className?: string
  classNames?: MentionsClassNames
}
