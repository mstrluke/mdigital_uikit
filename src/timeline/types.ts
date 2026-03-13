import type { ComponentColor, ComponentSize, CreateClassNames } from '../types'

export type TimelineMode = 'left' | 'right' | 'center'

export type TimelineOrientation = 'vertical' | 'horizontal'

export type TimelineClassNames = CreateClassNames<
  'root' | 'item' | 'dot' | 'connector' | 'content' | 'title' | 'description' | 'timestamp' | 'date' | 'icon'
>

export interface TimelineItem {
  key?: string
  title: React.ReactNode
  description?: React.ReactNode
  timestamp?: React.ReactNode
  icon?: React.ReactNode
  color?: ComponentColor
  dot?: React.ReactNode // custom dot element
}

export interface TimelineProps {
  items: TimelineItem[]
  mode?: TimelineMode
  orientation?: TimelineOrientation
  size?: ComponentSize
  color?: ComponentColor // default color for all items
  pending?: boolean // show pending indicator at the end
  pendingText?: React.ReactNode
  reverse?: boolean
  className?: string
  classNames?: TimelineClassNames
  ref?: React.Ref<HTMLDivElement>
}
