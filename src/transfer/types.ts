import type { ComponentSize } from '../types'

export interface TransferClassNames {
  root?: string
  list?: string
  header?: string
  search?: string
  item?: string
  actions?: string
}

export interface TransferItem {
  key: string
  label: string
  description?: string
  disabled?: boolean
}

export interface TransferProps {
  // Data
  dataSource: TransferItem[]
  targetKeys?: string[]
  defaultTargetKeys?: string[]

  // Display
  titles?: [string, string]
  size?: ComponentSize
  showSearch?: boolean
  searchPlaceholder?: string
  listHeight?: number
  showSelectAll?: boolean
  oneWay?: boolean
  disabled?: boolean

  // Custom render
  render?: (item: TransferItem) => React.ReactNode
  footer?: (props: { direction: 'left' | 'right' }) => React.ReactNode

  // Callbacks
  onChange?: (
    targetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[],
  ) => void
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[],
  ) => void
  onSearch?: (direction: 'left' | 'right', value: string) => void

  // Validation
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string

  className?: string
  classNames?: TransferClassNames
  ref?: React.Ref<HTMLDivElement>
}

export interface TransferListProps {
  title: string
  dataSource: TransferItem[]
  selectedKeys: string[]
  disabled?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  listHeight?: number
  showSelectAll?: boolean
  direction: 'left' | 'right'
  onItemSelect: (key: string, checked: boolean) => void
  onItemSelectAll: (keys: string[], checked: boolean) => void
  onSearch?: (value: string) => void
  render?: (item: TransferItem) => React.ReactNode
  footer?: React.ReactNode
  size?: ComponentSize
  classNames?: TransferClassNames
}
