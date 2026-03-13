import type { ComponentSize } from '../types'

export type ColorFormat = 'hex' | 'rgb' | 'hsl'

export interface ColorPickerClassNames {
  root?: string
  saturation?: string
  hueSlider?: string
  alphaSlider?: string
  input?: string
  swatches?: string
  swatch?: string
  preview?: string
}

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  format?: ColorFormat
  showAlpha?: boolean
  swatches?: string[]
  size?: ComponentSize
  disabled?: boolean
  label?: string
  className?: string
  classNames?: ColorPickerClassNames
}

export interface ColorInputProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  format?: ColorFormat
  showAlpha?: boolean
  swatches?: string[]
  size?: ComponentSize
  disabled?: boolean
  label?: string
  placeholder?: string
  clearable?: boolean
  fullWidth?: boolean
  className?: string
  classNames?: ColorPickerClassNames
}
