import type React from 'react'
import type { ComponentColor } from '../types'

/**
 * Type definitions for the Divider component
 */

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerVariant = 'solid' | 'dashed' | 'dotted'

export type DividerColor = ComponentColor

export interface DividerClassNames {
  root?: string
  line?: string
  label?: string
}

/**
 * Props for the Divider component
 * Uses HTMLAttributes appropriate for the rendered element type
 */
export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * @default 'horizontal'
   */
  orientation?: DividerOrientation

  /**
   * @default 'solid'
   */
  variant?: DividerVariant

  /**
   * @default 'default'
   */
  color?: DividerColor

  /**
   * Optional label text to display within the divider
   * Only supported for horizontal orientation
   */
  children?: React.ReactNode

  /**
   * Position of the label text within the divider
   * Only applicable when children is provided
   * @default 'center'
   */
  textAlign?: 'left' | 'center' | 'right'

  /**
   * Custom spacing around the divider
   * Accepts CSS values (e.g., "1rem 0")
   */
  spacing?: string

  className?: string
  classNames?: DividerClassNames
  ref?: React.Ref<HTMLElement>
}
