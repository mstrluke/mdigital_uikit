import type { ComponentColor, ComponentSize } from '../types'

export type CardVariant = 'default' | 'solid' | 'outline' | 'soft' | 'ghost' | 'elevated'

export type CardColor = ComponentColor

export type CardSize = ComponentSize

export type CardShadow = 'none' | 'sm' | 'md' | 'lg'

export interface CardClassNames {
  root?: string
  header?: string
  title?: string
  description?: string
  content?: string
  footer?: string
  action?: string
  image?: string
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: CardVariant

  /**
   * Semantic color for the card border/accent
   * @default 'default'
   */
  color?: CardColor

  /**
   * Card size affecting padding
   * @default 'md'
   */
  size?: CardSize

  /**
   * Shadow/elevation level
   * @default 'none'
   */
  shadow?: CardShadow

  /**
   * Show hover effect on the card
   * @default false
   */
  hoverable?: boolean

  /**
   * Make card clickable with proper accessibility
   * When true, card becomes a button element
   * @default false
   */
  clickable?: boolean

  /**
   * Show border around the card
   * @default true
   */
  bordered?: boolean

  /**
   * Show loading skeleton state
   * @default false
   */
  loading?: boolean

  /**
   * Custom class names for card sub-components
   */
  classNames?: CardClassNames

  /**
   * Reference to the card element
   */
  ref?: React.Ref<HTMLDivElement>
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * HTML heading level
   * @default 3
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  ref?: React.Ref<HTMLHeadingElement>
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLParagraphElement>
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /**
   * Position of the image in the card
   * @default 'top'
   */
  position?: 'top' | 'bottom'
  /**
   * Aspect ratio of the image container
   * @default 'video' (16:9)
   */
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
  /**
   * How the image should fit its container
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  ref?: React.Ref<HTMLImageElement>
}
