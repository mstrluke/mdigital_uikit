export type GridGap = 'xs' | 'sm' | 'md' | 'lg'
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6

export interface GridProps {
  children: React.ReactNode

  /**
   * Number of columns (responsive breakpoints applied automatically)
   */
  columns?: GridColumns

  gap?: GridGap
  className?: string
  ref?: React.Ref<HTMLDivElement>
}
