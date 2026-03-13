import type { ComponentColor, ComponentSize } from '../types'

export type SkeletonSize = ComponentSize

export type SkeletonColor = ComponentColor

export interface SkeletonProps {
  size?: SkeletonSize
  color?: SkeletonColor
  circle?: boolean
  className?: string
}
