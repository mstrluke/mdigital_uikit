import type { ComponentSize } from '../types'

export type TreeSize = ComponentSize

export interface TreeClassNames {
  root?: string
  node?: string
  nodeContent?: string
  icon?: string
  expandIcon?: string
  label?: string
  children?: string
}

export interface TreeNode {
  key: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
  /**
   * Force node to be treated as leaf (no expand icon)
   */
  isLeaf?: boolean
}

export interface TreeProps {
  data: TreeNode[]
  /**
   * Default expanded node keys (uncontrolled)
   */
  defaultExpandedKeys?: string[]
  /**
   * Expanded node keys (controlled)
   */
  expandedKeys?: string[]
  onExpand?: (expandedKeys: string[]) => void
  checkable?: boolean
  /**
   * Checked node keys (controlled)
   */
  checkedKeys?: string[]
  /**
   * Default checked node keys (uncontrolled)
   */
  defaultCheckedKeys?: string[]
  onCheck?: (
    checkedKeys: string[],
    info: {
      checked: boolean
      node: TreeNode
      checkedNodes: TreeNode[]
    },
  ) => void
  selectable?: boolean
  /**
   * Selected node keys (controlled)
   */
  selectedKeys?: string[]
  /**
   * Default selected node keys (uncontrolled)
   */
  defaultSelectedKeys?: string[]
  onSelect?: (
    selectedKeys: string[],
    info: {
      selected: boolean
      node: TreeNode
    },
  ) => void
  disabled?: boolean
  /**
   * Size variant (tree only supports xs, sm, md, lg)
   */
  size?: TreeSize
  showLine?: boolean
  showIcon?: boolean
  defaultExpandAll?: boolean
  className?: string
  classNames?: TreeClassNames
}
