'use client'

import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  type GroupingState,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { ChevronDown, ChevronRight, Inbox, Pin, PinOff } from 'lucide-react'

import Checkbox from '../checkbox'
import Pagination from '../pagination'
import { cn, iconSizes } from '../utils'
import { EditableCell } from './EditableCell'
import { TableActions } from './TableActions'
import { TableCell } from './TableCell'
import { TableHeaderCell } from './TableHeaderCell'
import { TableRow } from './TableRow'
import { TableSkeleton } from './TableSkeleton'
import type {
  ExtendedColumnDef,
  TableCellContext,
  TableHeaderContext,
  TableProps,
  TableSize,
} from './types'

/** Safely access extended column properties (pin, editable, accessorKey) */
function getColId<TData>(col: ExtendedColumnDef<TData, unknown>): string {
  return (col.id as string) || ('accessorKey' in col ? String(col.accessorKey) : '')
}

function getColPin<TData>(col: ExtendedColumnDef<TData, unknown>) {
  return col.pin
}

function isColEditable<TData>(col: ExtendedColumnDef<TData, unknown>) {
  return col.editable === true
}
import { cellVariants } from './variants'

function TableComponent<TData>({
  data,
  columns,
  columnGroups,
  caption,
  showCaption = false,
  'aria-label': ariaLabel,
  variant = 'outline',
  size: initialSize = 'md',
  color = 'default',
  striped = false,
  hoverable = true,
  bordered = false,
  enableSorting = true,
  sorting: controlledSorting,
  onSortingChange: onSortingChangeProp,
  enableFiltering = false,
  enablePagination = false,
  enableRowSelection = false,
  rowSelection: controlledRowSelection,
  enableMultiRowSelection = true,
  enableRowPinning = false,
  enableExpandable = false,
  enableGrouping = false,
  enableVirtualization = false,
  enableClickToSelect = false,
  enableColumnPinning = false,
  enableActions = false,
  paginationPosition = 'bottomcenter',
  expandedContent,
  footer,
  emptyState,
  loading = false,
  loadingRows = 5,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onRowClick,
  onSelectionChange,
  onCellEdit,
  pinnedRowIds = [],
  onPinnedRowsChange,
  className,
  classNames,
}: TableProps<TData>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([])
  const sorting = controlledSorting ?? internalSorting

  const controlledSortingRef = useRef(controlledSorting)
  const onSortingChangeRef = useRef(onSortingChangeProp)
  controlledSortingRef.current = controlledSorting
  onSortingChangeRef.current = onSortingChangeProp

  const setSorting = React.useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      if (!controlledSortingRef.current) {
        setInternalSorting((prev) => {
          const next = typeof updater === 'function' ? updater(prev) : updater
          onSortingChangeRef.current?.(next)
          return next
        })
      } else {
        const next = typeof updater === 'function' ? updater(controlledSortingRef.current) : updater
        onSortingChangeRef.current?.(next)
      }
    },
    [],
  )

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [internalRowSelection, setInternalRowSelection] = useState<Record<string, boolean>>({})
  const rowSelection = controlledRowSelection ?? internalRowSelection

  const controlledRowSelectionRef = useRef(controlledRowSelection)
  controlledRowSelectionRef.current = controlledRowSelection

  const setRowSelection = React.useCallback(
    (updater: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
      if (!controlledRowSelectionRef.current) {
        setInternalRowSelection((prev) => {
          return typeof updater === 'function' ? updater(prev) : updater
        })
      }
    },
    [],
  )
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [pinnedRows, setPinnedRows] = useState<string[]>(pinnedRowIds)
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchValue, setSearchValue] = useState('')
  const [size, setSize] = useState<TableSize>(initialSize)

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const prevAutoPinnedIdsRef = useRef<string>('')
  const pinnedRowsRef = useRef<string[]>(pinnedRows)
  const prevSelectionRef = useRef<string>('')

  useEffect(() => {
    pinnedRowsRef.current = pinnedRows
  }, [pinnedRows])

  const autoPinnedIds = useMemo(() => {
    if (!enableRowPinning || data.length === 0) return []

    return data
      .map((row, index) => ({ row, id: String(index) }))
      .filter(({ row }) => (row as Record<string, unknown>).pin === true)
      .map(({ id }) => id)
  }, [data, enableRowPinning])

  useEffect(() => {
    if (autoPinnedIds.length > 0) {
      const combinedPinnedIds = [
        ...new Set([...pinnedRowIds, ...autoPinnedIds]),
      ]

      const autoPinnedIdsStr = autoPinnedIds.sort().join(',')
      if (autoPinnedIdsStr !== prevAutoPinnedIdsRef.current) {
        prevAutoPinnedIdsRef.current = autoPinnedIdsStr
        setPinnedRows(combinedPinnedIds)
      }
    }
  }, [autoPinnedIds, pinnedRowIds])

  useEffect(() => {
    if (enableColumnPinning && columns.length > 0) {
      const leftPinned = columns
        .filter((col) => getColPin(col) === 'left')
        .map((col) => getColId(col))
      const rightPinned = columns
        .filter((col) => getColPin(col) === 'right')
        .map((col) => getColId(col))

      if (leftPinned.length > 0 || rightPinned.length > 0) {
        setColumnPinning({
          left: leftPinned,
          right: rightPinned,
        })
      }
    }
  }, [columns, enableColumnPinning])

  const enhancedColumns = useMemo(
    () =>
      enableRowSelection
        ? [
            {
              id: 'select',
              header: ({ table }: TableHeaderContext<TData>) =>
                enableMultiRowSelection ? (
                  <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    size="sm"
                  />
                ) : null,
              cell: ({ row }: TableCellContext<TData>) => (
                <Checkbox
                  checked={row.getIsSelected()}
                  disabled={!row.getCanSelect()}
                  onChange={row.getToggleSelectedHandler()}
                  size="sm"
                />
              ),
              size: 50,
            },
            ...columns,
          ]
        : columns,
    [columns, enableRowSelection, enableMultiRowSelection],
  )

  const finalColumns = useMemo(
    () =>
      enableExpandable
        ? [
            {
              id: 'expand',
              header: () => null,
              cell: ({ row }: TableCellContext<TData>) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    row.toggleExpanded()
                  }}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label={
                    row.getIsExpanded() ? 'Collapse row' : 'Expand row'
                  }
                  aria-expanded={row.getIsExpanded()}
                >
                  {row.getIsExpanded() ? (
                    <ChevronDown
                      className={iconSizes[size]}
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronRight
                      className={iconSizes[size]}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ),
              size: 50,
            },
            ...enhancedColumns,
          ]
        : enhancedColumns,
    [enhancedColumns, enableExpandable, size],
  )

  const columnsWithPinning = useMemo(
    () =>
      enableRowPinning
        ? [
            ...finalColumns,
            {
              id: 'pin',
              header: () => <Pin className="w-4 h-4 text-text-secondary" />,
              cell: ({ row }: TableCellContext<TData>) => {
                const rowId = row.id
                const isPinned = pinnedRowsRef.current.includes(rowId)

                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentPinned = pinnedRowsRef.current
                      const newPinnedRows = isPinned
                        ? currentPinned.filter((id) => id !== rowId)
                        : [...currentPinned, rowId]
                      setPinnedRows(newPinnedRows)
                      onPinnedRowsChange?.(newPinnedRows)
                    }}
                    className={cn(
                      'text-text-secondary hover:text-text-primary transition-colors',
                      isPinned && 'text-primary',
                    )}
                    aria-label={isPinned ? 'Unpin row' : 'Pin row'}
                    aria-pressed={isPinned}
                  >
                    {isPinned ? (
                      <PinOff
                        className={iconSizes[size]}
                        aria-hidden="true"
                      />
                    ) : (
                      <Pin
                        className={iconSizes[size]}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              },
              size: 50,
            },
          ]
        : finalColumns,
    [finalColumns, enableRowPinning, onPinnedRowsChange, size],
  )

  const columnsWithEditable = useMemo(
    () =>
      columnsWithPinning.map((col) => {
        if (isColEditable(col) && onCellEdit) {
          const colId = getColId(col)
          const accessorKey = 'accessorKey' in col ? String(col.accessorKey) : ''
          return {
            ...col,
            cell: ({ row, getValue }: TableCellContext<TData>) => {
              const value =
                getValue?.() ??
                (row.original as Record<string, unknown>)[accessorKey]
              return (
                <EditableCell
                  value={value}
                  size={size}
                  onValueChange={(newValue) => {
                    onCellEdit({
                      rowIndex: row.index,
                      columnId: colId,
                      value: newValue,
                      row: row.original,
                    })
                  }}
                />
              )
            },
          }
        }
        return col
      }),
    [columnsWithPinning, onCellEdit, size],
  )

  const filteredData = useMemo(() => {
    if (!enableActions || !searchValue.trim()) {
      return data
    }

    const searchLower = searchValue.toLowerCase()
    return data.filter((row) => {
      return Object.values(row as Record<string, unknown>).some((value) =>
        String(value).toLowerCase().includes(searchLower),
      )
    })
  }, [data, searchValue, enableActions])

  const allColumnsList = useMemo(() => {
    return columns.map((col) => {
      const id = getColId(col)
      return {
        id,
        label:
          typeof col.header === 'string'
            ? col.header
            : id,
      }
    })
  }, [columns])

  const visibleColumnIds = useMemo(() => {
    return Object.keys(columnVisibility).length === 0
      ? allColumnsList.map((c) => c.id)
      : allColumnsList
          .filter((c) => columnVisibility[c.id] !== false)
          .map((c) => c.id)
  }, [columnVisibility, allColumnsList])

  const table = useReactTable({
    data: filteredData,
    columns: columnsWithEditable as typeof columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel:
      enablePagination && !enableVirtualization
        ? getPaginationRowModel()
        : undefined,
    getExpandedRowModel: enableExpandable ? getExpandedRowModel() : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection,
    enableMultiRowSelection,
    enableGrouping,
    enableColumnPinning,
    getRowCanExpand: enableExpandable ? () => true : undefined,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      expanded,
      grouping,
      columnPinning,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)
      const selectionKey = Object.keys(rowSelection).sort().join(',')

      if (selectionKey !== prevSelectionRef.current) {
        prevSelectionRef.current = selectionKey
        onSelectionChange(selectedRows)
      }
    }
  }, [rowSelection, onSelectionChange])

  const rows = table.getRowModel().rows
  const allRowsOrdered = useMemo(() => {
    const pinnedSet = new Set(pinnedRows)
    const pinned = rows.filter((row) => pinnedSet.has(row.id))
    const unpinned = rows.filter((row) => !pinnedSet.has(row.id))
    return [...pinned, ...unpinned]
  }, [rows, pinnedRows])

  const rowVirtualizer = useVirtualizer({
    count: allRowsOrdered.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => (size === 'sm' ? 44 : size === 'lg' ? 68 : 56),
    overscan: 5,
    enabled: enableVirtualization,
  })

  const handleRowClick = React.useCallback((row: Row<TData>, rowData: TData) => {
    if (enableClickToSelect && enableRowSelection) {
      row.toggleSelected()
    }
    onRowClick?.(rowData)
  }, [enableClickToSelect, enableRowSelection, onRowClick])

  const renderColumnGroups = () => {
    if (!columnGroups || columnGroups.length === 0) return null

    const headerGroups = table.getHeaderGroups()[0]
    if (!headerGroups) return null

    const groupedHeaders: Array<{
      header: string
      span: number
      startIndex: number
    }> = []
    const processedCols = new Set<string>()

    headerGroups.headers.forEach((header, index) => {
      const colId = header.column.id

      if (processedCols.has(colId)) return

      const group = columnGroups.find((g) => g.columns.includes(colId))

      if (group) {
        // Mark all columns in this group as processed
        group.columns.forEach((c) => processedCols.add(c))

        groupedHeaders.push({
          header: group.header,
          span: group.columns.length,
          startIndex: index,
        })
      } else {
        groupedHeaders.push({
          header: '',
          span: 1,
          startIndex: index,
        })
      }
    })

    return (
      <tr className="border-b border-border">
        {groupedHeaders.map((group, idx) => (
          <th
            key={idx}
            colSpan={group.span}
            className={cn(
              cellVariants({ size }),
              'font-bold text-text-primary bg-surface/70 border-border text-center',
              bordered && 'border-r border-border last:border-r-0',
            )}
          >
            {group.header}
          </th>
        ))}
      </tr>
    )
  }

  const renderRows = () => {
    if (loading) {
      return (
        <TableSkeleton
          rows={loadingRows}
          columns={columnsWithPinning.length}
          size={size}
          className={classNames?.skeleton}
        />
      )
    }

    if (allRowsOrdered.length === 0) {
      return (
        <tr className="table_empty">
          <td
            colSpan={columnsWithPinning.length}
            className={cn('px-4 py-12 text-center', classNames?.empty)}
          >
            {emptyState || (
              <div className="flex flex-col items-center justify-center gap-2 text-text-secondary">
                <Inbox className="w-12 h-12 opacity-20" />
                <p className="text-sm">No data available</p>
              </div>
            )}
          </td>
        </tr>
      )
    }

    if (enableVirtualization) {
      const virtualRows = rowVirtualizer.getVirtualItems()
      const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0
      const paddingBottom =
        virtualRows.length > 0
          ? rowVirtualizer.getTotalSize() -
            (virtualRows[virtualRows.length - 1]?.end || 0)
          : 0

      return (
        <>
          {paddingTop > 0 && (
            <tr>
              <td
                colSpan={columnsWithPinning.length}
                style={{ height: `${paddingTop}px`, padding: 0, border: 0 }}
              />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = allRowsOrdered[virtualRow.index]
            if (!row) return null

            const isLastVirtualRow =
              virtualRow.index === allRowsOrdered.length - 1

            return (
              <TableRow
                key={row.id}
                row={row}
                index={virtualRow.index}
                striped={striped}
                hoverable={hoverable}
                onRowClick={() => handleRowClick(row, row.original)}
                isPinned={pinnedRows.includes(row.id)}
                className={cn(isLastVirtualRow && 'border-b-0', classNames?.row)}
              >
                {row.getVisibleCells().map((cell) => {
                  const isPinnedLeft = cell.column.getIsPinned() === 'left'
                  const isPinnedRight = cell.column.getIsPinned() === 'right'

                  return (
                    <TableCell
                      key={cell.id}
                      size={size}
                      bordered={bordered}
                      fixed={
                        isPinnedLeft
                          ? 'left'
                          : isPinnedRight
                            ? 'right'
                            : undefined
                      }
                      className={classNames?.cell}
                    >
                      {cell.getIsGrouped() ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              row.toggleExpanded()
                            }}
                            className="text-text-secondary hover:text-text-primary"
                            aria-label={row.getIsExpanded() ? 'Collapse group' : 'Expand group'}
                            aria-expanded={row.getIsExpanded()}
                          >
                            {row.getIsExpanded() ? (
                              <ChevronDown className={iconSizes[size]} aria-hidden="true" />
                            ) : (
                              <ChevronRight className={iconSizes[size]} aria-hidden="true" />
                            )}
                          </button>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}{' '}
                          ({row.subRows.length})
                        </div>
                      ) : cell.getIsAggregated() ? (
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
          {paddingBottom > 0 && (
            <tr>
              <td
                colSpan={columnsWithPinning.length}
                style={{ height: `${paddingBottom}px`, padding: 0, border: 0 }}
              />
            </tr>
          )}
        </>
      )
    }

    return allRowsOrdered.map((row, index) => (
      <React.Fragment key={row.id}>
        <TableRow
          row={row}
          index={index}
          striped={striped}
          hoverable={hoverable}
          onRowClick={() => handleRowClick(row, row.original)}
          isPinned={pinnedRows.includes(row.id)}
          className={classNames?.row}
        >
          {row.getVisibleCells().map((cell) => {
            const isPinnedLeft = cell.column.getIsPinned() === 'left'
            const isPinnedRight = cell.column.getIsPinned() === 'right'

            return (
              <TableCell
                key={cell.id}
                size={size}
                bordered={bordered}
                fixed={
                  isPinnedLeft ? 'left' : isPinnedRight ? 'right' : undefined
                }
                className={classNames?.cell}
              >
                {cell.getIsGrouped() ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        row.toggleExpanded()
                      }}
                      className="text-text-secondary hover:text-text-primary"
                      aria-label={row.getIsExpanded() ? 'Collapse group' : 'Expand group'}
                      aria-expanded={row.getIsExpanded()}
                    >
                      {row.getIsExpanded() ? (
                        <ChevronDown className={iconSizes[size]} aria-hidden="true" />
                      ) : (
                        <ChevronRight className={iconSizes[size]} aria-hidden="true" />
                      )}
                    </button>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                    ({row.subRows.length})
                  </div>
                ) : cell.getIsAggregated() ? (
                  flexRender(
                    cell.column.columnDef.aggregatedCell ??
                      cell.column.columnDef.cell,
                    cell.getContext(),
                  )
                ) : cell.getIsPlaceholder() ? null : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </TableCell>
            )
          })}
        </TableRow>
        {/* Expanded Content Row */}
        {enableExpandable && row.getIsExpanded() && expandedContent && (
          <tr>
            <td
              colSpan={row.getVisibleCells().length}
              className="bg-surface/30 border-b border-border p-4"
            >
              {expandedContent(row)}
            </td>
          </tr>
        )}
      </React.Fragment>
    ))
  }

  const renderPagination = () => {
    if (
      !enablePagination ||
      table.getPageCount() === 0 ||
      loading ||
      enableVirtualization
    ) {
      return null
    }

    const getPaginationPositionClasses = () => {
      const positionClasses = {
        topleft: 'justify-start',
        topcenter: 'w-full justify-between',
        topright: 'justify-end',
        bottomleft: 'justify-start',
        bottomcenter: 'w-full justify-between',
        bottomright: 'justify-end',
      }
      return positionClasses[paginationPosition]
    }

    return (
      <Pagination
        total={table.getFilteredRowModel().rows.length}
        current={table.getState().pagination.pageIndex + 1}
        pageSize={table.getState().pagination.pageSize}
        onChange={(page, pageSize) => {
          table.setPageIndex(page - 1)
          table.setPageSize(pageSize)
        }}
        showSizeChanger
        pageSizeOptions={pageSizeOptions}
        showTotal={(total, range) => (
          <>
            Showing {range[0]}-{range[1]} of {total} rows
          </>
        )}
        color={color}
        size="sm"
        className={cn('table_pagination flex', getPaginationPositionClasses(), classNames?.pagination)}
      />
    )
  }

  const shouldShowTopPagination = paginationPosition.startsWith('top')
  const shouldShowBottomPagination = paginationPosition.startsWith('bottom')

  const handleVisibleColumnsChange = (newVisibleColumns: string[]) => {
    const newVisibility: VisibilityState = {}
    allColumnsList.forEach((col) => {
      newVisibility[col.id] = newVisibleColumns.includes(col.id)
    })
    setColumnVisibility(newVisibility)
  }

  return (
    <div data-slot="root" className={cn('table_root w-full space-y-4', classNames?.root)}>
      {enableActions && (
        <TableActions
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          visibleColumns={visibleColumnIds}
          allColumns={allColumnsList}
          onVisibleColumnsChange={handleVisibleColumnsChange}
          size={size}
          onSizeChange={setSize}
          color={color}
          className={classNames?.actions}
        />
      )}

      {shouldShowTopPagination && renderPagination()}

      <div
        ref={tableContainerRef}
        className={cn(
          'table_wrapper overflow-auto rounded-md',
          enableVirtualization && 'max-h-[500px]',
          variant === 'outline' && 'border border-border',
          classNames?.wrapper,
        )}
      >
        <table
          className={cn(
            'w-full border-collapse',
            variant === 'line' && 'border-0',
            variant === 'ghost' && 'border-0',
            className,
          )}
          aria-label={ariaLabel}
        >
          {caption && (
            <caption className={cn(!showCaption && 'sr-only')}>
              {caption}
            </caption>
          )}
          <thead className={cn('table_header bg-surface sticky top-0 z-30', classNames?.header)}>
            {renderColumnGroups()}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={cn('table_headerRow', classNames?.headerRow)}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    header={header}
                    size={size}
                    variant={variant}
                    color={color}
                    bordered={bordered}
                    enableColumnPinning={enableColumnPinning}
                    className={classNames?.headerCell}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={cn('table_body', classNames?.body)}>{renderRows()}</tbody>
          {footer && (
            <tfoot className={cn('table_footer bg-surface border-t border-border sticky bottom-0 z-30', classNames?.footer)}>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    const isPinnedLeft = header.column.getIsPinned() === 'left'
                    const isPinnedRight =
                      header.column.getIsPinned() === 'right'

                    return (
                      <th
                        key={header.id}
                        className={cn(
                          'px-4 py-3 text-left font-semibold text-text-primary',
                          bordered && 'border-r border-border last:border-r-0',
                          isPinnedLeft && 'sticky left-0 bg-surface z-20',
                          isPinnedRight && 'sticky right-0 bg-surface z-20',
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>

      {shouldShowBottomPagination && renderPagination()}
    </div>
  )
}

TableComponent.displayName = 'Table'

// Wrap with React.memo for performance - prevents unnecessary re-renders
const Table = React.memo(TableComponent) as typeof TableComponent

export { TableCell } from './TableCell'
export { TableHeaderCell } from './TableHeaderCell'
export { TableRow } from './TableRow'
export { TableSkeleton } from './TableSkeleton'
export { TableActions } from './TableActions'
export { EditableCell } from './EditableCell'
export type * from './types'
export default Table
