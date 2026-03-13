import type { ComponentColor, ComponentSize } from '../types'

export type AutocompleteStatus = 'default' | ComponentColor

export interface AutocompleteOption {
  label: string
  value: string
  disabled?: boolean
  group?: string
}

export interface AutocompleteClassNames {
  root?: string
  input?: string
  dropdown?: string
  option?: string
  empty?: string
  group?: string
}

export interface AutocompleteProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  options: (string | AutocompleteOption)[]
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  size?: ComponentSize
  status?: AutocompleteStatus
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
  filter?: (query: string, option: AutocompleteOption) => boolean
  limit?: number
  emptyMessage?: string
  fullWidth?: boolean
  className?: string
  classNames?: AutocompleteClassNames
}
