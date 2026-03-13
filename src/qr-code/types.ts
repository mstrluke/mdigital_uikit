import type { ComponentColor } from '../types'

export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H'
export type QRCodeStatus = 'active' | 'expired' | 'loading'
export type QRCodeType = 'canvas' | 'svg'
export type QRModuleStyle = 'squares' | 'dots' | 'rounded'
export type QRFinderStyle = 'square' | 'rounded' | 'dot'

export interface QRCodeClassNames {
  root?: string
  canvas?: string
  svg?: string
  overlay?: string
  icon?: string
}

export interface QRCodeProps {
  /** Data encoded in the QR code */
  value: string
  /** Pixel size of the QR code */
  size?: number
  /**
   * Design-system color variant (uses the slot system like all other components).
   * @default 'default'
   */
  color?: ComponentColor
  /**
   * Explicit foreground color (overrides color variant).
   * Any valid CSS color string.
   */
  fgColor?: string
  /**
   * Explicit background color.
   * Any valid CSS color string.
   */
  bgColor?: string
  errorLevel?: QRCodeErrorLevel
  type?: QRCodeType
  moduleStyle?: QRModuleStyle
  finderStyle?: QRFinderStyle
  icon?: string
  iconSize?: number
  iconBorderRadius?: number
  bordered?: boolean
  status?: QRCodeStatus
  onRefresh?: () => void
  refreshText?: string
  expiredText?: string
  className?: string
  classNames?: QRCodeClassNames
}
