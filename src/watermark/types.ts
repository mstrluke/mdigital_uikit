export interface WatermarkClassNames {
  root?: string
  content?: string
  watermark?: string
}

export interface WatermarkProps {
  children: React.ReactNode
  text?: string | string[]
  image?: string
  width?: number
  height?: number
  rotate?: number
  gap?: [number, number]
  offset?: [number, number]
  fontSize?: number
  fontFamily?: string
  fontWeight?: string | number
  fontColor?: string
  opacity?: number
  zIndex?: number
  className?: string
  classNames?: WatermarkClassNames
}
