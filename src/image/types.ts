export interface ImageClassNames {
  root?: string
  image?: string
  placeholder?: string
  error?: string
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  withBlur?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'

  /**
   * Loading strategy for the image. Defaults to "lazy", or "eager" if fetchPriority is "high"
   */
  loading?: 'lazy' | 'eager'

  className?: string
  width?: number
  height?: number
  /**
   * Fallback image src to display on error
   */
  fallbackSrc?: string
  classNames?: ImageClassNames
}
