import type { ComponentColor } from '../types'

export type TypographyLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: TypographyLevel
  color?: ComponentColor | 'inherit'
  copyable?: boolean
  className?: string
}

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: TextSize
  weight?: TextWeight
  color?: ComponentColor | 'inherit' | 'secondary' | 'tertiary'
  truncate?: boolean | number
  copyable?: boolean
  code?: boolean
  mark?: boolean
  del?: boolean
  underline?: boolean
  strong?: boolean
  italic?: boolean
  as?: 'span' | 'p' | 'div' | 'label'
  className?: string
}

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  color?: ComponentColor | 'inherit' | 'secondary' | 'tertiary'
  truncate?: boolean | number
  copyable?: boolean
  className?: string
}
