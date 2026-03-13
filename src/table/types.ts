import type { AccessorKeyColumnDef, Cell, DisplayColumnDef, GroupColumnDef, Row, Table } from '@tanstack/react-table'

import type { ComponentColor, ComponentSize } from '../types'

export type TableVariant = 'outline' | 'line' | 'ghost'

export type TableSize = ComponentSize

export type TableColor = ComponentColor

export interface ColumnGroup {
  id: string
  header: string
  columns: string[]
}

export type PaginationPosition =
  | 'topleft'
  | 'topcenter'
  | 'topright'
  | 'bottomleft'
  | 'bottomcenter'
  | 'bottomright'

export type ColumnPinPosition = 'left' | 'right' | false

export interface PinnableRow {
  pin?: boolean
}

export interface PinnableColumn {
  pin?: ColumnPinPosition
}

export interface EditableCellProps {
  editable?: boolean
}

/**
 * Extended column definition with mdigital-specific properties.
 * Adds `pin` (column pinning) and `editable` (inline editing) to TanStack's ColumnDef.
 */
export type ExtendedColumnDef<TData, TValue = unknown> =
  | (AccessorKeyColumnDef<TData, TValue> & { pin?: ColumnPinPosition; editable?: boolean })
  | (DisplayColumnDef<TData, TValue> & { pin?: ColumnPinPosition; editable?: boolean })
  | (GroupColumnDef<TData, TValue> & { pin?: ColumnPinPosition; editable?: boolean })

/**
 * Context passed to table header render functions
 */
export interface TableHeaderContext<TData> {
  table: Table<TData>
}

/**
 * Context passed to table cell render functions
 */
export interface TableCellContext<TData, TValue = unknown> {
  row: Row<TData>
  cell?: Cell<TData, TValue>
  getValue?: () => TValue
}

/**
 * Event fired when a cell is edited
 */
export interface CellEditEvent<TData = unknown, TValue = unknown> {
  rowIndex: number
  columnId: string
  value: TValue
  row: TData
}

export interface TableClassNames {
  root?: string
  wrapper?: string
  header?: string
  headerRow?: string
  headerCell?: string
  body?: string
  row?: string
  cell?: string
  footer?: string
  pagination?: string
  empty?: string
  skeleton?: string
  actions?: string
}

export interface TableProps<TData> {
  data: TData[]
  columns: ExtendedColumnDef<TData, unknown>[]
  columnGroups?: ColumnGroup[]
  /**
   * Table caption for accessibility (visually hidden by default)
   */
  caption?: string
  /**
   * Whether to visually display the caption
   */
  showCaption?: boolean
  /**
   * Accessible label for the table (alternative to caption)
   */
  'aria-label'?: string
  variant?: TableVariant
  size?: TableSize
  color?: TableColor
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  enableSorting?: boolean
  /** Controlled sorting state */
  sorting?: import('@tanstack/react-table').SortingState
  /** Callback when sorting changes */
  onSortingChange?: (sorting: import('@tanstack/react-table').SortingState) => void
  enableFiltering?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  /** Controlled row selection state (record of rowId → boolean) */
  rowSelection?: Record<string, boolean>
  enableMultiRowSelection?: boolean
  enableRowPinning?: boolean
  enableExpandable?: boolean
  enableGrouping?: boolean
  enableVirtualization?: boolean
  enableClickToSelect?: boolean
  enableColumnPinning?: boolean
  enableActions?: boolean
  paginationPosition?: PaginationPosition
  expandedContent?: (row: Row<TData>) => React.ReactNode
  footer?: React.ReactNode
  emptyState?: React.ReactNode
  loading?: boolean
  loadingRows?: number
  pageSize?: number
  pageSizeOptions?: number[]
  onRowClick?: (row: TData) => void
  onSelectionChange?: (selectedRows: TData[]) => void
  onCellEdit?: (event: CellEditEvent<TData>) => void
  pinnedRowIds?: string[]
  onPinnedRowsChange?: (pinnedRowIds: string[]) => void
  className?: string
  classNames?: TableClassNames
}
