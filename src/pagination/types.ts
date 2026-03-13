import type { ComponentColor, ComponentSize } from '../types'

export type PaginationColor = ComponentColor

export type PaginationSize = ComponentSize

export type PaginationVariant = 'default' | 'solid' | 'soft'

export interface PaginationClassNames {
  root?: string
  list?: string
  item?: string
  button?: string
  buttonActive?: string
  ellipsis?: string
  info?: string
}

export interface PaginationProps {
  total: number
  current?: number
  defaultCurrent?: number
  pageSize?: number
  defaultPageSize?: number
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  color?: PaginationColor
  size?: PaginationSize
  variant?: PaginationVariant
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
  showFirstLastButtons?: boolean
  /**
   * Custom function to display total items
   */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  disabled?: boolean
  className?: string
  classNames?: PaginationClassNames
}
