import type { ComponentColor, ComponentSize } from '../types'

export type ToggleVariant = 'default' | 'solid' | 'soft'
export type ToggleSize = ComponentSize

export interface ToggleClassNames {
  root?: string
}

export interface SingleToggleProps {
  /**
   * Pressed state (controlled)
   */
  pressed?: boolean
  /**
   * Default initial pressed state (uncontrolled)
   */
  defaultPressed?: boolean
  color?: ComponentColor
  /**
   * Size variant (toggle only supports xs, sm, md, lg)
   */
  size?: ToggleSize
  variant?: ToggleVariant
  onChange?: (pressed: boolean) => void
  disabled?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  /**
   * Accessible label (required for icon-only toggles)
   */
  'aria-label'?: string
  className?: string
  classNames?: ToggleClassNames
  ref?: React.Ref<HTMLButtonElement>
}
