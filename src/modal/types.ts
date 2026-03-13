import type { ComponentColor, ComponentSize } from '../types'

export type ModalSize = ComponentSize
export type ModalColor = ComponentColor

export interface ModalClassNames {
  root?: string
  overlay?: string
  content?: string
  header?: string
  title?: string
  description?: string
  body?: string
  footer?: string
  closeButton?: string
}

export interface ComposedModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  /**
   * Theme color (adds colored left border)
   */
  color?: ModalColor
  centered?: boolean
  showCloseButton?: boolean
  hideHeader?: boolean
  hideFooter?: boolean
  /**
   * Prevent closing on outside click (useful for modal-in-drawer)
   */
  onInteractOutside?: (e: Event) => void
  /**
   * Prevent closing on escape key
   */
  onEscapeKeyDown?: (e: KeyboardEvent) => void
  className?: string
  contentClassName?: string
  classNames?: ModalClassNames
}
