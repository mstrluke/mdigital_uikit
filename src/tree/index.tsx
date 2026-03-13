'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { Check, ChevronRight, Minus } from 'lucide-react'

import { cn, iconSizes } from '../utils'
import type { TreeNode, TreeProps } from './types'

const treeItemVariants = cva(
  'flex items-center gap-2 px-2 rounded cursor-pointer select-none transition-colors duration-200 ease-out',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'hover:bg-surface',
      },
      selected: {
        true: 'bg-primary/10 text-primary',
        false: 'text-text-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
      selected: false,
    },
  },
)

// Pure function moved outside component to avoid recreation on every render
function getAllKeys(nodes: TreeNode[]): string[] {
  const keys: string[] = []
  const traverse = (items: TreeNode[]) => {
    items.forEach((item) => {
      keys.push(item.key)
      if (item.children) {
        traverse(item.children)
      }
    })
  }
  traverse(nodes)
  return keys
}

const Tree = React.memo<TreeProps>(
  ({
    data,
    defaultExpandedKeys = [],
    expandedKeys,
    onExpand,
    checkable = false,
    checkedKeys,
    defaultCheckedKeys = [],
    onCheck,
    selectable = true,
    selectedKeys,
    defaultSelectedKeys = [],
    onSelect,
    disabled = false,
    size = 'md',
    showLine = false,
    showIcon = true,
    defaultExpandAll = false,
    className,
    classNames,
  }) => {
    const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<
      string[]
    >(defaultExpandAll ? getAllKeys(data) : defaultExpandedKeys)
    const [internalCheckedKeys, setInternalCheckedKeys] =
      React.useState<string[]>(defaultCheckedKeys)
    const [internalSelectedKeys, setInternalSelectedKeys] =
      React.useState<string[]>(defaultSelectedKeys)

    const currentExpandedKeys =
      expandedKeys !== undefined ? expandedKeys : internalExpandedKeys
    const currentCheckedKeys =
      checkedKeys !== undefined ? checkedKeys : internalCheckedKeys
    const currentSelectedKeys =
      selectedKeys !== undefined ? selectedKeys : internalSelectedKeys

    const getAllLeafKeys = React.useCallback((node: TreeNode): string[] => {
      const keys: string[] = []

      const traverse = (n: TreeNode) => {
        if (!n.children || n.children.length === 0 || n.isLeaf) {
          keys.push(n.key)
        } else {
          n.children.forEach((child) => traverse(child))
        }
      }

      traverse(node)
      return keys
    }, [])

    const getNodeByKey = React.useCallback(
      (key: string): TreeNode | null => {
        const traverse = (nodes: TreeNode[]): TreeNode | null => {
          for (const node of nodes) {
            if (node.key === key) return node
            if (node.children) {
              const found = traverse(node.children)
              if (found) return found
            }
          }
          return null
        }
        return traverse(data)
      },
      [data],
    )

    const getCheckedNodes = React.useCallback(
      (keys: string[]): TreeNode[] => {
        return keys
          .map((key) => getNodeByKey(key))
          .filter((node): node is TreeNode => node !== null)
      },
      [getNodeByKey],
    )

    const checkedKeysSet = React.useMemo(
      () => new Set(currentCheckedKeys),
      [currentCheckedKeys],
    )

    const getCheckState = React.useCallback(
      (node: TreeNode): { checked: boolean; indeterminate: boolean } => {
        if (!node.children || node.children.length === 0 || node.isLeaf) {
          return {
            checked: checkedKeysSet.has(node.key),
            indeterminate: false,
          }
        }

        const leafKeys = getAllLeafKeys(node)
        const checkedCount = leafKeys.filter((key) =>
          checkedKeysSet.has(key),
        ).length

        return {
          checked: checkedCount === leafKeys.length && leafKeys.length > 0,
          indeterminate: checkedCount > 0 && checkedCount < leafKeys.length,
        }
      },
      [checkedKeysSet, getAllLeafKeys],
    )

    const expandedKeysSet = React.useMemo(
      () => new Set(currentExpandedKeys),
      [currentExpandedKeys],
    )

    const handleExpand = React.useCallback(
      (key: string) => {
        const newExpandedKeys = expandedKeysSet.has(key)
          ? currentExpandedKeys.filter((k) => k !== key)
          : [...currentExpandedKeys, key]

        if (expandedKeys === undefined) {
          setInternalExpandedKeys(newExpandedKeys)
        }
        onExpand?.(newExpandedKeys)
      },
      [currentExpandedKeys, expandedKeys, onExpand, expandedKeysSet],
    )

    const handleCheck = React.useCallback(
      (node: TreeNode, checked: boolean) => {
        if (disabled || node.disabled) return

        const leafKeys = getAllLeafKeys(node)
        let newCheckedKeys: string[]

        if (checked) {
          // Add all leaf keys that aren't already checked
          const keysToAdd = leafKeys.filter(
            (key) => !currentCheckedKeys.includes(key),
          )
          newCheckedKeys = [...currentCheckedKeys, ...keysToAdd]
        } else {
          // Remove all leaf keys
          newCheckedKeys = currentCheckedKeys.filter(
            (key) => !leafKeys.includes(key),
          )
        }

        if (checkedKeys === undefined) {
          setInternalCheckedKeys(newCheckedKeys)
        }

        const checkedNodes = getCheckedNodes(newCheckedKeys)
        onCheck?.(newCheckedKeys, {
          checked,
          node,
          checkedNodes,
        })
      },
      [
        disabled,
        getAllLeafKeys,
        currentCheckedKeys,
        checkedKeys,
        onCheck,
        getCheckedNodes,
      ],
    )

    const handleSelect = React.useCallback(
      (node: TreeNode) => {
        if (disabled || node.disabled || !selectable) return

        const isSelected = currentSelectedKeys.includes(node.key)
        const newSelectedKeys = isSelected
          ? currentSelectedKeys.filter((k) => k !== node.key)
          : [...currentSelectedKeys, node.key]

        if (selectedKeys === undefined) {
          setInternalSelectedKeys(newSelectedKeys)
        }

        onSelect?.(newSelectedKeys, {
          selected: !isSelected,
          node,
        })
      },
      [disabled, selectable, currentSelectedKeys, selectedKeys, onSelect],
    )

    const flattenTree = React.useCallback(
      (
        nodes: TreeNode[],
        level: number = 0,
      ): Array<{ node: TreeNode; level: number }> => {
        const result: Array<{ node: TreeNode; level: number }> = []

        nodes.forEach((node) => {
          result.push({ node, level })

          const hasChildren =
            node.children && node.children.length > 0 && !node.isLeaf
          const isExpanded = expandedKeysSet.has(node.key)

          if (hasChildren && isExpanded) {
            result.push(...flattenTree(node.children!, level + 1))
          }
        })

        return result
      },
      [expandedKeysSet],
    )

    const flatNodes = React.useMemo(
      () => flattenTree(data),
      [data, flattenTree],
    )

    // Memoize check states for all visible nodes
    const checkStates = React.useMemo(() => {
      if (!checkable) return new Map<string, 'checked' | 'unchecked' | 'indeterminate'>()

      const states = new Map<string, 'checked' | 'unchecked' | 'indeterminate'>()

      const compute = (node: TreeNode): 'checked' | 'unchecked' | 'indeterminate' => {
        if (states.has(node.key)) return states.get(node.key)!

        const checkState = getCheckState(node)
        let state: 'checked' | 'unchecked' | 'indeterminate'

        if (checkState.indeterminate) {
          state = 'indeterminate'
        } else if (checkState.checked) {
          state = 'checked'
        } else {
          state = 'unchecked'
        }

        states.set(node.key, state)
        return state
      }

      // Pre-compute for all visible nodes
      flatNodes.forEach(({ node }) => compute(node))
      return states
    }, [checkable, flatNodes, getCheckState])

    const renderNode = React.useCallback(
      (
        item: { node: TreeNode; level: number },
        index: number,
      ): React.ReactNode => {
        const { node, level } = item
        const hasChildren =
          node.children && node.children.length > 0 && !node.isLeaf
        const isExpanded = expandedKeysSet.has(node.key)
        const isSelected = currentSelectedKeys.includes(node.key)

        // Use memoized check state
        const checkStateValue = checkable ? checkStates.get(node.key) : null
        const checkState = checkStateValue
          ? {
              checked: checkStateValue === 'checked',
              indeterminate: checkStateValue === 'indeterminate',
            }
          : null

        return (
          <div
            key={node.key}
            className={cn(
              'tree_node',
              'relative animate-in fade-in slide-in-from-top-1 duration-200',
              classNames?.node,
            )}
          >
            <div
              className={cn(
                'tree_nodeContent',
                treeItemVariants({
                  size,
                  disabled: !!node.disabled,
                  selected: checkable ? false : isSelected,
                }),
                className,
                classNames?.nodeContent,
              )}
            >
              {/* Indentation units with vertical lines */}
              {Array.from({ length: level }).map((_, i) => {
                // Check if this indent level should have a vertical line
                const shouldDrawLine =
                  showLine &&
                  flatNodes.slice(index + 1).some((n) => n.level === i)

                return (
                  <span
                    key={i}
                    className="relative inline-block w-4 h-6 shrink-0"
                  >
                    {/* Vertical line connecting siblings */}
                    {shouldDrawLine && (
                      <span className="absolute top-0 left-1/2 bottom-0 h-full border-l border-border -translate-x-px" />
                    )}
                  </span>
                )
              })}

              {/* Expand/Collapse Icon */}
              {hasChildren ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleExpand(node.key)
                  }}
                  className={cn(
                    'tree_expandIcon',
                    'shrink-0 hover:text-primary transition-colors duration-200',
                    classNames?.expandIcon,
                  )}
                  disabled={disabled || node.disabled}
                >
                  <ChevronRight
                    className={cn(
                      iconSizes[size],
                      'transition-transform duration-300 ease-out',
                      isExpanded && 'rotate-90',
                    )}
                  />
                </button>
              ) : (
                <span className={cn('shrink-0', iconSizes[size])} />
              )}

              {/* Checkbox */}
              {checkable && (
                <div
                  role="checkbox"
                  tabIndex={disabled || node.disabled ? -1 : 0}
                  aria-checked={checkState?.indeterminate ? 'mixed' : checkState?.checked}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCheck(node, !checkState?.checked)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCheck(node, !checkState?.checked)
                    }
                  }}
                  className={cn(
                    'w-4 h-4 border rounded flex items-center justify-center shrink-0 cursor-pointer transition-[colors,transform] duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                    checkState?.checked
                      ? 'bg-primary border-primary'
                      : 'border-border',
                    (disabled || node.disabled) &&
                      'opacity-50 cursor-not-allowed',
                  )}
                >
                  {checkState?.checked && (
                    <Check className="h-3 w-3 text-background animate-in zoom-in-50 duration-200" />
                  )}
                  {checkState?.indeterminate && !checkState?.checked && (
                    <Minus className="h-3 w-3 text-primary animate-in zoom-in-50 duration-200" />
                  )}
                </div>
              )}

              {/* Icon */}
              {showIcon && node.icon && (
                <span
                  className={cn('tree_icon', 'shrink-0', classNames?.icon)}
                >
                  {node.icon}
                </span>
              )}

              {/* Label */}
              <span
                onClick={() => {
                  if (checkable) {
                    handleCheck(node, !checkState?.checked)
                  } else {
                    handleSelect(node)
                  }
                }}
                className={cn('tree_label', 'flex-1 truncate', classNames?.label)}
              >
                {node.label}
              </span>
            </div>
          </div>
        )
      },
      [
        expandedKeysSet,
        currentSelectedKeys,
        checkable,
        checkStates,
        size,
        className,
        classNames,
        disabled,
        handleExpand,
        handleCheck,
        handleSelect,
        showIcon,
        showLine,
        flatNodes,
      ],
    )

    return (
      <div data-slot="root" className={cn('tree_root', 'w-full', className, classNames?.root)}>
        {flatNodes.map((item, index) => renderNode(item, index))}
      </div>
    )
  },
)

Tree.displayName = 'Tree'

export type * from './types'
export default Tree
