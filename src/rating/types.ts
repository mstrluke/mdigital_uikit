import type { ComponentColor, ComponentSize } from '../types'

export type RatingVariant = 'default' | 'solid' | 'soft'

export type RatingSize = ComponentSize

export interface RatingClassNames {
  root?: string
  star?: string
  starFilled?: string
  label?: string
}

export interface RatingProps {
  /**
   * Current rating value (controlled)
   */
  value?: number

  /**
   * Default initial rating value (uncontrolled)
   */
  defaultValue?: number

  /**
   * Total number of stars
   */
  count?: number

  /**
   * Allow half star ratings
   */
  allowHalf?: boolean

  /**
   * Theme color
   */
  color?: ComponentColor

  /**
   * Size variant
   */
  size?: RatingSize

  /**
   * Visual style variant
   */
  variant?: RatingVariant

  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void

  /**
   * Whether rating is disabled
   */
  disabled?: boolean

  /**
   * Whether rating is read-only
   */
  readOnly?: boolean

  /**
   * Additional CSS class
   */
  className?: string

  /**
   * Custom class names for component parts
   */
  classNames?: RatingClassNames

  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string
}
