/**
 * Popover component types
 * Note: Popover components use React.ComponentProps with Radix UI primitives
 * The PopoverContentProps is exported from the component file
 */

import type { ComponentColor, ComponentSize } from '../types'

export type PopoverSize = ComponentSize
export type PopoverVariant = 'default' | 'solid' | 'soft'
export type PopoverColor = ComponentColor

export interface PopoverClassNames {
  root?: string
  trigger?: string
  content?: string
  arrow?: string
  closeButton?: string
}
