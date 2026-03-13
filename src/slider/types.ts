import type { ComponentColor, ComponentSize } from '../types'

export type SliderVariant = 'default' | 'solid' | 'soft'

export type SliderSize = ComponentSize

export type SliderOrientation = 'horizontal' | 'vertical'

export interface SliderClassNames {
  root?: string
  track?: string
  range?: string
  thumb?: string
  label?: string
  value?: string
}

export interface SliderProps {
  /**
   * Current value (controlled) - single number or array for range
   */
  value?: number | number[]
  /**
   * Default initial value (uncontrolled)
   */
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  color?: ComponentColor
  size?: SliderSize
  variant?: SliderVariant
  onChange?: (value: number | number[]) => void
  disabled?: boolean
  className?: string
  classNames?: SliderClassNames
  /**
   * Footer content or boolean to show default footer
   */
  footer?: React.ReactNode | boolean
  range?: boolean
  /**
   * @default 'horizontal'
   */
  orientation?: SliderOrientation
}
