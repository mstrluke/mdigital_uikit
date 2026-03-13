/**
 * Command component types
 * Note: Most command components use React.ComponentProps with the underlying
 * cmdk primitives and add a size prop
 */

import { ComponentColor, ComponentSize } from '../types'

export type CommandSize = ComponentSize

// Export CommandSize explicitly for use in component
export type { CommandSize as CommandInputSize }

export interface CommandClassNames {
  root?: string
  input?: string
  inputIcon?: string
  list?: string
  empty?: string
  group?: string
  groupLabel?: string
  item?: string
  itemIcon?: string
  shortcut?: string
}

export interface CommandItemProps {
  color?: ComponentColor
}
