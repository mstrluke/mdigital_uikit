import type { ComponentColor, ComponentSize } from '../types'
import type * as TooltipPrimitive from '@radix-ui/react-tooltip'

export type TooltipVariant = 'solid' | 'soft'
export type TooltipColor = ComponentColor
export type TooltipSize = ComponentSize

export interface TooltipClassNames {
  root?: string
  trigger?: string
  content?: string
  arrow?: string
}

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  color?: TooltipColor
  size?: TooltipSize
  variant?: TooltipVariant
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  /**
   * Delay before tooltip appears (milliseconds)
   */
  delayDuration?: number
  disabled?: boolean
  className?: string
  classNames?: TooltipClassNames
}

export interface TooltipProviderProps
  extends React.ComponentProps<typeof TooltipPrimitive.Provider> {}
