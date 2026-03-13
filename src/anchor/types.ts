import type { ComponentSize } from '../types'

export interface AnchorItem {
  id: string
  label: string
  children?: AnchorItem[]
}

export interface AnchorClassNames {
  root?: string
  link?: string
  activeLink?: string
  indicator?: string
}

export interface AnchorProps {
  items: AnchorItem[]
  offset?: number
  bounds?: number
  targetOffset?: number
  size?: ComponentSize
  affix?: boolean
  affixTop?: number
  getContainer?: () => HTMLElement | Window
  className?: string
  classNames?: AnchorClassNames
  onChange?: (activeId: string) => void
}
