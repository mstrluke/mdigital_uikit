import type React from 'react'
import type { ComponentColor, ComponentSize } from '../types'

export type DescriptionsVariant = 'default' | 'solid' | 'soft'

export interface DescriptionsItem {
  key: string
  label: React.ReactNode
  children: React.ReactNode
  span?: number
}

export interface DescriptionsClassNames {
  root?: string
  item?: string
  label?: string
  content?: string
  title?: string
  extra?: string
  body?: string
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLTableElement>, 'title'> {
  items: DescriptionsItem[]
  column?: number
  color?: ComponentColor
  size?: ComponentSize
  variant?: DescriptionsVariant
  layout?: 'horizontal' | 'vertical'
  bordered?: boolean
  rounded?: boolean
  className?: string
  classNames?: DescriptionsClassNames
  title?: React.ReactNode
  extra?: React.ReactNode
  ref?: React.Ref<HTMLTableElement>
}
