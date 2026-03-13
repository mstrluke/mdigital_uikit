import type { ComponentColor, ComponentSize } from '../types'

export type ProgressType = 'line' | 'circle' | 'step'
export type ProgressVariant = 'default' | 'solid' | 'soft'
export type ProgressOrientation = 'horizontal' | 'vertical'
export type ProgressSize = ComponentSize

export interface ProgressClassNames {
  root?: string
  track?: string
  fill?: string
  label?: string
  value?: string
}

export interface ProgressProps {
  /**
   * Progress value (0-100)
   */
  value: number
  color?: ComponentColor
  /**
   * Size variant (preset sizes for both line and circle)
   */
  size?: ProgressSize
  /**
   * Custom circle diameter in pixels (overrides size preset for circle type)
   * @example circleSize={16} // 16px diameter for inline text
   */
  circleSize?: number
  /**
   * Custom stroke width in pixels (overrides size preset for circle type)
   * @example strokeWidth={2} // 2px stroke for small circles
   */
  strokeWidth?: number
  variant?: ProgressVariant
  type?: ProgressType
  /**
   * Orientation (for line type)
   */
  orientation?: ProgressOrientation
  showProgress?: boolean
  label?: string
  striped?: boolean
  animated?: boolean
  className?: string
  classNames?: ProgressClassNames
  /**
   * Total number of steps (for step type)
   */
  totalSteps?: number
  /**
   * Footer content or boolean to show default footer
   */
  footer?: React.ReactNode | boolean
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string
}
