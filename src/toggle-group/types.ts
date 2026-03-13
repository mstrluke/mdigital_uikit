import type { ComponentColor, ComponentSize } from '../types'

export type ToggleGroupVariant = 'default' | 'solid' | 'soft'
export type ToggleGroupSize = ComponentSize

export interface ToggleGroupClassNames {
  root?: string
  item?: string
}

export interface ToggleGroupOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[]
  /**
   * Current value (controlled) - single value or array for multiple
   */
  value?: string | string[]
  /**
   * Default initial value (uncontrolled)
   */
  defaultValue?: string | string[]
  multiple?: boolean
  color?: ComponentColor
  /**
   * Size variant (toggle-group only supports xs, sm, md, lg)
   */
  size?: ToggleGroupSize
  variant?: ToggleGroupVariant
  onChange?: (value: string | string[]) => void
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  centered?: boolean
  classNames?: ToggleGroupClassNames
  ref?: React.Ref<HTMLDivElement>
}
