import type { ComponentColor, ComponentSize, CreateClassNames } from '../types'

export type LinkColor = ComponentColor
export type LinkSize = ComponentSize

export interface LinkClassNames extends CreateClassNames<
  'root' | 'icon' | 'externalIcon'
> {}

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /** Link color */
  color?: LinkColor
  /** Link size */
  size?: LinkSize
  /** Underline behavior */
  underline?: 'always' | 'hover' | 'none'
  /** Whether the link is external (opens in new tab, shows icon) */
  external?: boolean
  /** Show external link icon */
  showExternalIcon?: boolean
  /** Whether the link is disabled */
  disabled?: boolean
  /** Left icon */
  leftIcon?: React.ReactNode
  /** Right icon */
  rightIcon?: React.ReactNode
  /** Additional CSS class */
  className?: string
  /** Custom class names */
  classNames?: LinkClassNames
  /** Ref */
  ref?: React.Ref<HTMLAnchorElement>
}
