import type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../button/types'

export interface ButtonGroupClassNames {
  root?: string;
  button?: string;
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode

  /**
   * @default false
   */
  vertical?: boolean

  /**
   * Whether buttons are visually attached (connected) or separated
   * When true, buttons share borders and have no gap
   * When false, buttons are separated with a gap
   * @default true
   */
  attached?: boolean

  /**
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg'

  /**
   * @default false
   */
  fullWidth?: boolean

  /**
   * Size to apply to all child buttons
   * Individual button size props will override this
   */
  size?: ButtonSize

  /**
   * Variant to apply to all child buttons
   * Individual button variant props will override this
   */
  variant?: ButtonVariant

  /**
   * Color to apply to all child buttons
   * Individual button color props will override this
   */
  color?: ButtonColor

  /**
   * Shape to apply to all child buttons
   * Individual button shape props will override this
   */
  shape?: ButtonShape

  /**
   * @default false
   */
  disabled?: boolean

  'aria-label'?: string
  className?: string
  classNames?: ButtonGroupClassNames
  ref?: React.Ref<HTMLDivElement>
}
