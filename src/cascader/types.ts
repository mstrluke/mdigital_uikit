import type { ComponentColor, ComponentSize } from '../types'

export type CascaderSize = ComponentSize

export type CascaderExpandTrigger = 'click' | 'hover'

export type CascaderPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

export interface CascaderClassNames {
  root?: string
  trigger?: string
  dropdown?: string
  menu?: string
  option?: string
}

export interface CascaderOption {
  label: string
  value: string
  children?: CascaderOption[]
  disabled?: boolean
  /**
   * Whether this node is a leaf (no children to load)
   * Used with loadData for async loading
   */
  isLeaf?: boolean
  /**
   * Whether children are currently loading
   * @internal
   */
  loading?: boolean
}

export interface CascaderProps {
  options: CascaderOption[]
  /**
   * Current value (controlled) - single path or array of paths for multiple
   */
  value?: string[] | string[][]
  /**
   * Default initial value (uncontrolled)
   */
  defaultValue?: string[] | string[][]
  onChange?: (
    value: string[] | string[][],
    selectedOptions: CascaderOption[] | CascaderOption[][],
  ) => void
  /**
   * Callback when selection is complete (after closing in single mode)
   */
  onSelect?: (
    value: string[],
    selectedOptions: CascaderOption[],
  ) => void
  /**
   * @default 'Please select'
   */
  placeholder?: string
  label?: string
  helperText?: string
  /**
   * @default 'bottom'
   */
  messagePosition?: 'top' | 'bottom'
  /**
   * @default 'default'
   */
  color?: ComponentColor
  /**
   * @default 'md'
   */
  size?: CascaderSize
  /**
   * @default 'bottomLeft'
   */
  placement?: CascaderPlacement
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  loading?: boolean
  error?: string
  warning?: string
  info?: string
  success?: string
  /**
   * @default true
   */
  fullWidth?: boolean
  /**
   * @default 'click'
   */
  expandTrigger?: CascaderExpandTrigger
  /**
   * @default false
   */
  multiple?: boolean
  /**
   * @default 3
   */
  maxTagCount?: number
  /**
   * @default true
   */
  clearable?: boolean
  /**
   * @default true
   */
  showPath?: boolean
  /**
   * @default ' / '
   */
  pathSeparator?: string
  /**
   * @default false
   */
  changeOnSelect?: boolean
  /**
   * Load data asynchronously
   * Called when expanding a node that has no children and isLeaf is not true
   */
  loadData?: (selectedOptions: CascaderOption[]) => Promise<void>
  displayRender?: (labels: string[] | string[][], selectedOptions?: CascaderOption[] | CascaderOption[][]) => React.ReactNode
  tagRender?: (props: {
    label: string
    value: string[]
    closable: boolean
    onClose: () => void
  }) => React.ReactNode
  /**
   * @default 'No options'
   */
  emptyContent?: React.ReactNode
  className?: string
  classNames?: CascaderClassNames
  /**
   * @default false
   */
  required?: boolean
  ref?: React.Ref<HTMLDivElement>
  onOpenChange?: (open: boolean) => void
}
