'use client'

import React from 'react'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react'

import Checkbox from '../checkbox'
import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from '../utils'
import { colorVars } from '../variants'
import type { TransferItem, TransferListProps, TransferProps } from './types'
import {
  filterItems,
  getEnabledItems,
  getItemsByKeys,
  transferActionButtonVariants,
  transferBodyVariants,
  transferButtonVariants,
  transferHeaderVariants,
  transferItemVariants,
} from './utils'

const TransferList = React.memo<TransferListProps>(
  ({
    title,
    dataSource,
    selectedKeys,
    disabled = false,
    showSearch = false,
    searchPlaceholder = 'Search...',
    listHeight = 300,
    showSelectAll = true,
    onItemSelect,
    onItemSelectAll,
    onSearch,
    render,
    footer,
    classNames,
  }) => {
    const [searchValue, setSearchValue] = React.useState('')

    const selectedKeySet = React.useMemo(() => new Set(selectedKeys), [selectedKeys])

    const filteredData = React.useMemo(
      () => filterItems(dataSource, searchValue),
      [dataSource, searchValue],
    )

    const enabledItems = React.useMemo(
      () => getEnabledItems(filteredData),
      [filteredData],
    )

    const selectedCount = React.useMemo(
      () =>
        filteredData.filter((item) => selectedKeySet.has(item.key)).length,
      [filteredData, selectedKeySet],
    )

    const allChecked =
      enabledItems.length > 0 && selectedCount === enabledItems.length
    const indeterminate =
      selectedCount > 0 && selectedCount < enabledItems.length

    const handleSearchChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        onSearch?.(value)
      },
      [onSearch],
    )

    const handleSelectAll = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        const keys = enabledItems.map((item) => item.key)
        onItemSelectAll(keys, checked)
      },
      [enabledItems, onItemSelectAll],
    )

    const handleItemSelect = React.useCallback(
      (item: TransferItem) => {
        if (item.disabled) return
        const checked = !selectedKeySet.has(item.key)
        onItemSelect(item.key, checked)
      },
      [selectedKeySet, onItemSelect],
    )

    return (
      <div className={cn("flex flex-1 flex-col border border-border rounded-lg bg-card overflow-hidden min-w-0 transfer_list", classNames?.list)}>
        {/* Header */}
        <div className={cn(transferHeaderVariants(), "transfer_header", classNames?.header)}>
          <div className="flex items-center gap-2 flex-1">
            {showSelectAll && (
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={handleSelectAll}
                disabled={disabled || enabledItems.length === 0}
                size="sm"
              />
            )}
            <span className="text-sm font-medium text-text-primary">
              {title}
              <span className="text-text-secondary ml-1">
                ({selectedCount}/{filteredData.length})
              </span>
            </span>
          </div>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                className={cn("w-full pl-8 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted bg-background border border-border rounded-md outline-none focus:border-primary transition-colors transfer_search", classNames?.search)}
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div
          className={transferBodyVariants()}
          style={{ height: listHeight }}
        >
          {filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-text-secondary">
              No data
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.key}
                className={cn(
                  transferItemVariants({
                    selected: selectedKeySet.has(item.key),
                    disabled: !!item.disabled || disabled,
                  }),
                  "transfer_item",
                  classNames?.item
                )}
                onClick={() => handleItemSelect(item)}
              >
                <Checkbox
                  checked={selectedKeySet.has(item.key)}
                  disabled={!!item.disabled || disabled}
                  size="sm"
                    onChange={() => {}} // Handled by parent click
                />
                {render ? (
                  render(item)
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-text-primary truncate">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-xs text-text-secondary truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-4 py-2 border-t border-border bg-surface text-sm text-text-secondary">
            {footer}
          </div>
        )}
      </div>
    )
  },
)

TransferList.displayName = 'TransferList'

export const Transfer = React.memo<TransferProps>(
  ({
    dataSource = [],
    targetKeys,
    defaultTargetKeys = [],
    titles = ['Source', 'Target'],
    size = 'md',
    showSearch = false,
    searchPlaceholder = 'Search...',
    listHeight = 300,
    showSelectAll = true,
    oneWay = false,
    disabled = false,
    render,
    footer,
    onChange,
    onSelectChange,
    onSearch,
    label,
    helperText,
    error,
    warning,
    info,
    success,
    className,
    classNames,
    ref,
  }) => {
    const [internalTargetKeys, setInternalTargetKeys] =
      React.useState<string[]>(defaultTargetKeys)
    const [leftSelectedKeys, setLeftSelectedKeys] = React.useState<string[]>([])
    const [rightSelectedKeys, setRightSelectedKeys] = React.useState<string[]>(
      [],
    )

    // Refs to avoid closure issues in select handlers
    const leftSelectedKeysRef = React.useRef(leftSelectedKeys)
    leftSelectedKeysRef.current = leftSelectedKeys
    const rightSelectedKeysRef = React.useRef(rightSelectedKeys)
    rightSelectedKeysRef.current = rightSelectedKeys

    const currentTargetKeys =
      targetKeys !== undefined ? targetKeys : internalTargetKeys

    const { status, message: helperMessage } = getValidationStatus({
      error,
      warning,
      info,
      success,
      helperText,
    })

    // Split data into source and target
    const currentTargetKeySet = React.useMemo(
      () => new Set(currentTargetKeys),
      [currentTargetKeys],
    )

    const leftDataSource = React.useMemo(
      () => dataSource.filter((item) => !currentTargetKeySet.has(item.key)),
      [dataSource, currentTargetKeySet],
    )

    const rightDataSource = React.useMemo(
      () => getItemsByKeys(dataSource, currentTargetKeys),
      [dataSource, currentTargetKeys],
    )

    const handleLeftItemSelect = React.useCallback(
      (key: string, checked: boolean) => {
        setLeftSelectedKeys((prev) => {
          const newKeys = checked ? [...prev, key] : prev.filter((k) => k !== key)
          onSelectChange?.(newKeys, rightSelectedKeysRef.current)
          return newKeys
        })
      },
      [onSelectChange],
    )

    const handleRightItemSelect = React.useCallback(
      (key: string, checked: boolean) => {
        setRightSelectedKeys((prev) => {
          const newKeys = checked ? [...prev, key] : prev.filter((k) => k !== key)
          onSelectChange?.(leftSelectedKeysRef.current, newKeys)
          return newKeys
        })
      },
      [onSelectChange],
    )

    const handleLeftSelectAll = React.useCallback(
      (keys: string[], checked: boolean) => {
        const newKeys = checked ? keys : []
        setLeftSelectedKeys(newKeys)
        onSelectChange?.(newKeys, rightSelectedKeysRef.current)
      },
      [onSelectChange],
    )

    const handleRightSelectAll = React.useCallback(
      (keys: string[], checked: boolean) => {
        const newKeys = checked ? keys : []
        setRightSelectedKeys(newKeys)
        onSelectChange?.(leftSelectedKeysRef.current, newKeys)
      },
      [onSelectChange],
    )

    const moveToRight = React.useCallback(() => {
      const newTargetKeys = [...new Set([...currentTargetKeys, ...leftSelectedKeys])]

      if (targetKeys === undefined) {
        setInternalTargetKeys(newTargetKeys)
      }

      onChange?.(newTargetKeys, 'right', leftSelectedKeys)
      setLeftSelectedKeys([])
    }, [currentTargetKeys, leftSelectedKeys, targetKeys, onChange])

    const moveToLeft = React.useCallback(() => {
      const newTargetKeys = currentTargetKeys.filter(
        (key) => !rightSelectedKeys.includes(key),
      )

      if (targetKeys === undefined) {
        setInternalTargetKeys(newTargetKeys)
      }

      onChange?.(newTargetKeys, 'left', rightSelectedKeys)
      setRightSelectedKeys([])
    }, [currentTargetKeys, rightSelectedKeys, targetKeys, onChange])

    const moveAllToRight = React.useCallback(() => {
      const enabledLeftItems = getEnabledItems(leftDataSource)
      const keysToMove = enabledLeftItems.map((item) => item.key)
      const newTargetKeys = [...currentTargetKeys, ...keysToMove]

      if (targetKeys === undefined) {
        setInternalTargetKeys(newTargetKeys)
      }

      onChange?.(newTargetKeys, 'right', keysToMove)
      setLeftSelectedKeys([])
    }, [leftDataSource, currentTargetKeys, targetKeys, onChange])

    const moveAllToLeft = React.useCallback(() => {
      const enabledRightItems = getEnabledItems(rightDataSource)
      const keysToMove = enabledRightItems.map((item) => item.key)
      const newTargetKeys = currentTargetKeys.filter(
        (key) => !keysToMove.includes(key),
      )

      if (targetKeys === undefined) {
        setInternalTargetKeys(newTargetKeys)
      }

      onChange?.(newTargetKeys, 'left', keysToMove)
      setRightSelectedKeys([])
    }, [rightDataSource, currentTargetKeys, targetKeys, onChange])

    const handleLeftSearch = React.useCallback(
      (value: string) => {
        onSearch?.('left', value)
      },
      [onSearch],
    )

    const handleRightSearch: ((value: string) => void) | undefined = onSearch
      ? React.useCallback(
          (value: string) => {
            onSearch('right', value)
          },
          [onSearch],
        )
      : undefined

    const leftFooter = React.useMemo(
      () => footer?.({ direction: 'left' }),
      [footer],
    )
    const rightFooter = React.useMemo(
      () => footer?.({ direction: 'right' }),
      [footer],
    )

    return (
      <div ref={ref}>
        {label && (
          <label className="block mb-2">
            <span className="text-sm font-medium text-text-primary">{label}</span>
          </label>
        )}

        <div data-slot="root" className={cn('flex items-start gap-4 transfer_root', colorVars.primary, classNames?.root, className)}>
          {/* Left List */}
          <TransferList
            title={titles[0]}
            dataSource={leftDataSource}
            selectedKeys={leftSelectedKeys}
            disabled={disabled}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            listHeight={listHeight}
            showSelectAll={showSelectAll}
            direction="left"
            onItemSelect={handleLeftItemSelect}
            onItemSelectAll={handleLeftSelectAll}
            onSearch={handleLeftSearch}
            render={render}
            footer={leftFooter}
            size={size}
            classNames={classNames}
          />

          {/* Action Buttons */}
          <div className={cn(transferButtonVariants(), "self-center transfer_actions", classNames?.actions)}>
            <button
              type="button"
              className={transferActionButtonVariants()}
              onClick={moveToRight}
              disabled={disabled || leftSelectedKeys.length === 0}
              title="Move selected to right" aria-label="Move selected to right"
            >
              <ChevronRight className={iconSizes[size]} />
            </button>
            {!oneWay && (
              <button
                type="button"
                className={transferActionButtonVariants()}
                onClick={moveToLeft}
                disabled={disabled || rightSelectedKeys.length === 0}
                title="Move selected to left" aria-label="Move selected to left"
              >
                <ChevronLeft className={iconSizes[size]} />
              </button>
            )}
            <button
              type="button"
              className={transferActionButtonVariants()}
              onClick={moveAllToRight}
              disabled={disabled || leftDataSource.length === 0}
              title="Move all to right" aria-label="Move all to right"
            >
              <ChevronsRight className={iconSizes[size]} />
            </button>
            {!oneWay && (
              <button
                type="button"
                className={transferActionButtonVariants()}
                onClick={moveAllToLeft}
                disabled={disabled || rightDataSource.length === 0}
                title="Move all to left" aria-label="Move all to left"
              >
                <ChevronsLeft className={iconSizes[size]} />
              </button>
            )}
          </div>

          {/* Right List */}
          <TransferList
            title={titles[1]}
            dataSource={rightDataSource}
            selectedKeys={rightSelectedKeys}
            disabled={disabled}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            listHeight={listHeight}
            showSelectAll={showSelectAll}
            direction="right"
            onItemSelect={handleRightItemSelect}
            onItemSelectAll={handleRightSelectAll}
            onSearch={handleRightSearch}
            render={render}
            footer={rightFooter}
            size={size}
            classNames={classNames}
          />
        </div>

        {helperMessage && (
          <p className={cn(statusMessageVariants({ status }), 'mt-1')}>
            {helperMessage}
          </p>
        )}
      </div>
    )
  },
)

Transfer.displayName = 'Transfer'

export type * from './types'
