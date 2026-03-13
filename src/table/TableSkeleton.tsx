import { cn } from '../utils'
import type { TableSize } from './types'
import { cellVariants } from './variants'

interface TableSkeletonProps {
  rows?: number
  columns: number
  size?: TableSize
  className?: string
}

export const TableSkeleton = ({
  rows = 5,
  columns,
  size = 'md',
  className,
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className={cn('table_skeleton border-b border-border', className)}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td
              key={colIndex}
              className={cn(cellVariants({ size }))}
            >
              <div className="animate-pulse">
                <div className="h-4 bg-surface rounded w-full" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

TableSkeleton.displayName = 'TableSkeleton'
