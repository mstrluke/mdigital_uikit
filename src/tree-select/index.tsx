'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { ChevronDown, Loader2, X } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { colorVars } from '../variants'
import Tree from '../tree'
import type { TreeNode } from '../tree/types'
import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from '../utils'
import type { TreeSelectProps } from './types'

const treeSelectTriggerVariants = cva(
  'w-full flex items-center justify-between rounded-md bg-background text-text-primary border outline-none cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
  {
    variants: {
      status: {
        default: 'border-border hover:border-primary/50',
        error: 'border-error',
        warning: 'border-warning',
        info: 'border-info',
        success: 'border-success',
      },
      size: {
        xs: 'min-h-(--select-height-xs) px-(--select-padding-x-xs) py-1 text-xs gap-1.5',
        sm: 'min-h-(--input-height-sm) px-1 py-1 text-sm gap-2',
        md: 'min-h-(--input-height-md) px-2 py-1 text-base gap-2',
        lg: 'min-h-(--input-height-lg) px-3 py-1.5 text-lg gap-3',
      },
      fullWidth: {
        true: 'w-full',
        false: 'max-w-full',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
      fullWidth: true,
    },
  },
)

const TreeSelect = React.memo<TreeSelectProps>(
  ({
    size = 'md',
    label,
    helperText,
    error,
    warning,
    info,
    success,
    data = [],
    placeholder = 'Select an option',
    loading = false,
    fullWidth = true,
    value,
    defaultValue,
    onChange,
    disabled,
    required,
    multiple = false,
    checkable = false,
    searchable = true,
    clearable = true,
    maxChipsVisible = 3,
    maxDropdownHeight = 300,
    defaultExpandAll = false,
    defaultExpandedKeys = [],
    showLine = false,
    showIcon = true,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const uniqueId = React.useId()
    const labelId = `tree-select-label-${uniqueId}`

    const [isOpen, setIsOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (multiple ? [] : ''),
    )
    const [searchQuery, setSearchQuery] = React.useState('')
    const [expandedKeys, setExpandedKeys] = React.useState<string[]>(
      defaultExpandAll ? [] : defaultExpandedKeys,
    )
    const [visibleChipsCount, setVisibleChipsCount] =
      React.useState(maxChipsVisible)

    const triggerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const currentValue = value !== undefined ? value : internalValue

    // Use shared validation status utility
    const { status, message: helperMessage } = getValidationStatus({
      error,
      warning,
      info,
      success,
      helperText,
    })

    // Get all nodes in a flat structure for search and lookup
    const getAllNodes = React.useCallback((nodes: TreeNode[]): TreeNode[] => {
      const result: TreeNode[] = []
      const traverse = (items: TreeNode[]) => {
        items.forEach((item) => {
          result.push(item)
          if (item.children) {
            traverse(item.children)
          }
        })
      }
      traverse(nodes)
      return result
    }, [])

    const allNodes = React.useMemo(() => getAllNodes(data), [data, getAllNodes])

    // Find node by key
    const getNodeByKey = React.useCallback(
      (key: string): TreeNode | null => {
        return allNodes.find((node) => node.key === key) || null
      },
      [allNodes],
    )

    // Get selected nodes
    const getSelectedNodes = React.useCallback(
      (keys: string | string[]): TreeNode[] => {
        const keyArray = Array.isArray(keys) ? keys : [keys]
        return keyArray
          .map((key) => getNodeByKey(key))
          .filter((node): node is TreeNode => node !== null)
      },
      [getNodeByKey],
    )

    // Filter tree data based on search query
    const filteredData = React.useMemo(() => {
      if (!searchQuery) return data

      const matchingKeys = new Set<string>()

      // Find all nodes that match the search
      allNodes.forEach((node) => {
        if (node.label.toLowerCase().includes(searchQuery.toLowerCase())) {
          // Add the node and all its ancestors
          let current: TreeNode | null = node
          while (current) {
            matchingKeys.add(current.key)
            // Find parent
            const parent = allNodes.find((n) =>
              n.children?.some((child) => child.key === current!.key),
            )
            current = parent || null
          }
        }
      })

      // Filter tree to only include matching nodes and their paths
      const filterTree = (nodes: TreeNode[]): TreeNode[] => {
        return nodes
          .filter((node) => matchingKeys.has(node.key))
          .map((node) => ({
            ...node,
            children: node.children ? filterTree(node.children) : undefined,
          }))
      }

      return filterTree(data)
    }, [data, searchQuery, allNodes])

    // Get display value
    const selectedNodes = React.useMemo(
      () => getSelectedNodes(currentValue),
      [currentValue, getSelectedNodes],
    )

    const getDisplayValue = React.useMemo(() => {
      if (!selectedNodes.length) return ''
      if (selectedNodes.length === 1) return selectedNodes[0]?.label
      return `${selectedNodes.length} selected`
    }, [selectedNodes])

    const handleSelect = React.useCallback(
      (_: string[], info: { selected: boolean; node: TreeNode }) => {
        if (disabled) return

        // Prevent selection of directory nodes (nodes with children)
        if (info.node.children && info.node.children.length > 0) {
          return
        }

        let newValue: string | string[]

        if (multiple) {
          // For multiple selection
          const currentArray = Array.isArray(currentValue) ? currentValue : []
          if (info.selected) {
            newValue = [...currentArray, info.node.key]
          } else {
            newValue = currentArray.filter((k) => k !== info.node.key)
          }
        } else {
          // For single selection
          if (info.selected) {
            newValue = info.node.key
            setIsOpen(false)
            setSearchQuery('')
          } else {
            newValue = ''
          }
        }

        if (value === undefined) {
          setInternalValue(newValue)
        }

        const selectedNodesResult = getSelectedNodes(newValue)
        onChange?.(newValue, selectedNodesResult)
      },
      [disabled, multiple, currentValue, value, onChange, getSelectedNodes],
    )

    const handleCheck = React.useCallback(
      (
        keys: string[],
        info: {
          checked: boolean
          node: TreeNode
          checkedNodes: TreeNode[]
        },
      ) => {
        if (disabled) return

        // Filter out directory nodes (nodes with children) from checked keys
        const leafKeys = keys.filter((key) => {
          const node = getNodeByKey(key)
          return node && (!node.children || node.children.length === 0)
        })

        const leafNodes = info.checkedNodes.filter(
          (node) => !node.children || node.children.length === 0,
        )

        if (value === undefined) {
          setInternalValue(leafKeys)
        }

        onChange?.(leafKeys, leafNodes)
      },
      [disabled, value, onChange, getNodeByKey],
    )

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        if (!isOpen) setIsOpen(true)
      },
      [isOpen],
    )

    const handleInputFocus = React.useCallback(() => {
      setIsOpen(true)
    }, [])

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        const newValue = multiple ? [] : ''
        if (value === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(newValue, [])
        setSearchQuery('')
      },
      [multiple, value, onChange],
    )

    const handleRemoveItem = React.useCallback(
      (
        e: React.SyntheticEvent,
        keyToRemove: string,
      ) => {
        e.stopPropagation()
        if (!multiple || disabled) return

        const currentArray = Array.isArray(currentValue) ? currentValue : []
        const newValue = currentArray.filter((k) => k !== keyToRemove)

        if (value === undefined) {
          setInternalValue(newValue)
        }

        const selectedNodesResult = getSelectedNodes(newValue)
        onChange?.(newValue, selectedNodesResult)
      },
      [multiple, disabled, currentValue, value, onChange, getSelectedNodes],
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen && e.key !== 'Tab') {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            setIsOpen(true)
          }
          return
        }

        if (e.key === 'Escape') {
          e.preventDefault()
          setIsOpen(false)
          setSearchQuery('')
          triggerRef.current?.focus()
        }
      },
      [isOpen],
    )

    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          e.key === 'Backspace' &&
          !searchQuery &&
          multiple &&
          Array.isArray(currentValue) &&
          currentValue.length > 0
        ) {
          e.preventDefault()
          const lastKey = currentValue[currentValue.length - 1]
          handleRemoveItem(e, lastKey || '')
        } else {
          handleKeyDown(e)
        }
      },
      [searchQuery, currentValue, multiple, handleRemoveItem, handleKeyDown],
    )

    // Dynamic badge size calculation
    React.useEffect(() => {
      if (selectedNodes.length === 0 || !triggerRef.current) {
        setVisibleChipsCount(maxChipsVisible)
        return
      }

      const calculateVisibleChips = () => {
        const container = triggerRef.current
        if (!container) return

        const hiddenChips = container.querySelectorAll('[data-hidden-chip]')
        if (hiddenChips.length === 0) return

        const containerWidth = container.offsetWidth
        const padding =
          size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 16

        // Account for icons on the right (clear + chevron/search)
        // Use a generous estimate to avoid overflow
        const iconsWidth = 60 // Enough space for clear button + chevron + gap

        const gap = 4
        const plusIndicatorWidth = 40 // Width of "+X" badge

        const availableWidth = containerWidth - padding * 2 - iconsWidth
        let totalWidth = 0
        let visibleCount = 0

        for (let i = 0; i < hiddenChips.length; i++) {
          const chipWidth = hiddenChips[i]?.getBoundingClientRect().width || 0
          const requiredSpace =
            totalWidth + chipWidth + (visibleCount > 0 ? gap : 0)

          const needsPlusIndicator = i < hiddenChips.length - 1
          const spaceWithIndicator =
            requiredSpace + (needsPlusIndicator ? gap + plusIndicatorWidth : 0)

          if (spaceWithIndicator <= availableWidth) {
            totalWidth = requiredSpace
            visibleCount++
          } else {
            break
          }
        }

        setVisibleChipsCount(Math.max(1, visibleCount))
      }

      const timeoutId = setTimeout(calculateVisibleChips, 0)

      const resizeObserver = new ResizeObserver(() => {
        calculateVisibleChips()
      })

      if (triggerRef.current) {
        resizeObserver.observe(triggerRef.current)
      }

      return () => {
        clearTimeout(timeoutId)
        resizeObserver.disconnect()
      }
    }, [selectedNodes, size, maxChipsVisible])

    const treeSelectElement = (
      <div
        data-slot="root"
        className={cn(
          'treeSelect_root',
          'relative group',
          colorVars.primary,
          fullWidth ? 'w-full' : 'inline-block',
          classNames?.root,
        )}
        ref={ref}
        {...props}
      >
        <Popover
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) setSearchQuery('')
          }}
        >
          <PopoverTrigger asChild>
            <div
              ref={triggerRef}
              role="combobox"
              tabIndex={disabled || loading ? -1 : 0}
              className={cn(
                'treeSelect_trigger',
                treeSelectTriggerVariants({ status, size, fullWidth }),
                loading && 'opacity-50',
                className,
                classNames?.trigger,
              )}
              aria-haspopup="tree"
              aria-expanded={isOpen}
              aria-disabled={disabled || loading}
              aria-labelledby={label ? labelId : undefined}
              onClick={() => {
                if (disabled || loading) return
                if (!isOpen) {
                  setIsOpen(true)
                  if (searchable) {
                    requestAnimationFrame(() => inputRef.current?.focus())
                  }
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {multiple && selectedNodes.length > 0 && (
                <div className="flex gap-1 flex-shrink-0 flex-wrap">
                  {selectedNodes.slice(0, visibleChipsCount).map((node) => (
                    <span
                      key={node.key}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slot-10 text-slot rounded text-sm whitespace-nowrap"
                    >
                      {node.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveItem(e, node.key)}
                        className="hover:bg-slot-20 rounded-sm"
                        disabled={disabled}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedNodes.length > visibleChipsCount && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-surface text-text-secondary rounded text-sm whitespace-nowrap">
                      +{selectedNodes.length - visibleChipsCount}
                    </span>
                  )}
                </div>
              )}
              {/* Hidden chips for width calculation (multiple mode only) */}
              {multiple && (
                <div
                  className="absolute opacity-0 pointer-events-none whitespace-nowrap"
                  aria-hidden="true"
                >
                  {selectedNodes.map((node) => (
                    <span
                      key={node.key}
                      data-hidden-chip
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slot-10 text-slot rounded text-sm whitespace-nowrap"
                    >
                      {node.label}
                      <X className="h-3 w-3" />
                    </span>
                  ))}
                </div>
              )}
              {searchable && isOpen ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="bg-transparent outline-none placeholder:text-text-secondary/50 flex-1 min-w-[60px] w-0"
                  placeholder={getDisplayValue || placeholder}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleInputKeyDown}
                  disabled={disabled || loading}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={-1}
                />
              ) : (
                <span className={cn('flex-1 truncate', !getDisplayValue && 'text-text-secondary/50')}>
                  {getDisplayValue || placeholder}
                </span>
              )}
              <div className="flex items-center gap-1 text-text-secondary shrink-0">
                {clearable && getDisplayValue && !disabled && !loading && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleClear(e) }}
                    className="hover:text-text-primary transition-colors"
                    tabIndex={-1}
                  >
                    <X className={iconSizes[size]} />
                  </button>
                )}
                {loading ? (
                  <Loader2 className={cn('animate-spin', iconSizes[size])} />
                ) : (
                  <ChevronDown
                    className={cn(
                      iconSizes[size],
                      'transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                )}
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent
            className={cn(
              'treeSelect_dropdown',
              'p-2 w-[var(--radix-popover-trigger-width)]',
              classNames?.dropdown,
            )}
            align="start"
            onOpenAutoFocus={(e: Event) => {
              e.preventDefault()
              inputRef.current?.focus()
            }}
          >
            <div
              className="overflow-auto"
              style={{ maxHeight: maxDropdownHeight }}
              role="tree"
              aria-labelledby={label ? labelId : undefined}
            >
              {filteredData.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-text-secondary">
                  No options found
                </div>
              ) : (
                <Tree
                  data={filteredData}
                  checkable={checkable}
                  checkedKeys={
                    checkable && Array.isArray(currentValue)
                      ? currentValue
                      : undefined
                  }
                  onCheck={checkable ? handleCheck : undefined}
                  selectable={!checkable}
                  selectedKeys={
                    !checkable
                      ? Array.isArray(currentValue)
                        ? currentValue
                        : currentValue
                          ? [currentValue]
                          : []
                      : undefined
                  }
                  onSelect={!checkable ? handleSelect : undefined}
                  disabled={disabled}
                  size={size}
                  showLine={showLine}
                  showIcon={showIcon}
                  defaultExpandAll={defaultExpandAll || !!searchQuery}
                  expandedKeys={defaultExpandAll ? undefined : (searchQuery ? undefined : expandedKeys)}
                  onExpand={setExpandedKeys}
                  className={cn('treeSelect_tree', classNames?.tree)}
                  classNames={{
                    node: cn('treeSelect_node', classNames?.node),
                    label: cn('treeSelect_label', classNames?.label),
                  }}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )

    return (
      <div className={cn('w-full flex flex-col', !fullWidth && 'inline-block')}>
        <div className="flex gap-2 items-center">
          {label && (
            <label
              id={labelId}
              className="block mb-0.5"
            >
              <span className="text-sm font-medium text-text-secondary">
                {label}
                {required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
          )}
          {helperMessage && (
            <p className={statusMessageVariants({ status })}>{helperMessage}</p>
          )}
        </div>
        {treeSelectElement}
      </div>
    )
  },
)

TreeSelect.displayName = 'TreeSelect'

export type * from './types'
export default TreeSelect
