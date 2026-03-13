import type { ComponentColor, ComponentSize } from '../types'

export type TourPlacement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end'

export interface TourStep {
  target: string | (() => HTMLElement | null)
  title: React.ReactNode
  description?: React.ReactNode
  placement?: TourPlacement
  cover?: React.ReactNode
  nextText?: string
  prevText?: string
  onNext?: () => void
  onPrev?: () => void
}

export interface TourClassNames {
  root?: string
  overlay?: string
  popover?: string
  title?: string
  description?: string
  cover?: string
  footer?: string
  indicator?: string
}

export interface TourProps {
  steps: TourStep[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  current?: number
  onCurrentChange?: (current: number) => void
  color?: ComponentColor
  size?: ComponentSize
  showArrow?: boolean
  showProgress?: boolean
  showSkip?: boolean
  skipText?: string
  finishText?: string
  nextText?: string
  prevText?: string
  onFinish?: () => void
  onSkip?: () => void
  overlayClickable?: boolean
  className?: string
  classNames?: TourClassNames
}
