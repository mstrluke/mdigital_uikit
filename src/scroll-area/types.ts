import type { ComponentSize, CreateClassNames } from '../types'

export type ScrollAreaSize = ComponentSize

export interface ScrollAreaClassNames
  extends CreateClassNames<
    | 'root'
    | 'viewport'
    | 'scrollbarVertical'
    | 'scrollbarHorizontal'
    | 'thumb'
    | 'corner'
  > {}

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Max height of the scrollable area */
  maxHeight?: string | number
  /** Max width of the scrollable area */
  maxWidth?: string | number
  /** Scrollbar direction */
  direction?: 'vertical' | 'horizontal' | 'both'
  /** Scrollbar size/thickness */
  size?: ScrollAreaSize
  /** Scrollbar visibility */
  scrollbarVisibility?: 'auto' | 'always' | 'hover'
  /** Additional CSS class */
  className?: string
  /** Custom class names */
  classNames?: ScrollAreaClassNames
  /** Ref */
  ref?: React.Ref<HTMLDivElement>
}
