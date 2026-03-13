import type { ComponentColor, ComponentSize } from '../types'

export type ClipboardVariant = 'default' | 'solid' | 'soft'
export type ClipboardSize = ComponentSize

export interface ClipboardClassNames {
  root?: string
  input?: string
  button?: string
}

export interface ClipboardProps {
  value: string
  color?: ComponentColor
  /**
   * Size variant (clipboard only supports xs, sm, md, lg)
   */
  size?: ClipboardSize
  variant?: ClipboardVariant
  showValue?: boolean
  /**
   * Duration to show success icon (in milliseconds)
   */
  successDuration?: number
  /**
   * Whether the clipboard is disabled
   * @default false
   */
  disabled?: boolean
  onCopy?: () => void
  className?: string
  classNames?: ClipboardClassNames
  ref?: React.Ref<HTMLDivElement>
}
