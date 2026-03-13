import type { ComponentSize } from '../types'

export type InputGroupSize = ComponentSize

export interface InputGroupClassNames {
  root?: string
  addon?: string
  input?: string
}

export interface InputGroupProps {
  /**
   * Children elements (InputGroupAddon and InputGroupInput)
   * Order determines layout - addons and input flow naturally with flexbox
   */
  children: React.ReactNode

  /**
   * Size of the input group - affects height, padding, and text size
   * @default 'md'
   */
  size?: InputGroupSize

  /**
   * Additional CSS class
   */
  className?: string

  /**
   * Custom classes for different parts of the input group
   */
  classNames?: InputGroupClassNames

  /**
   * Accessible label for the input group
   */
  'aria-label'?: string
}

export interface InputGroupInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string
  /**
   * @internal Automatically set by InputGroup
   */
  size?: InputGroupSize
  /**
   * @internal Automatically set by InputGroup
   */
  classNames?: InputGroupClassNames
  ref?: React.Ref<HTMLInputElement>
}

export interface InputGroupAddonProps {
  children: React.ReactNode
  className?: string
  /**
   * @internal Automatically set by InputGroup
   */
  size?: InputGroupSize
  /**
   * @internal Automatically set by InputGroup
   */
  classNames?: InputGroupClassNames
}
