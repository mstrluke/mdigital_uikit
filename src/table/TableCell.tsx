import { cn } from '../utils'
import type { TableSize } from './types'
import { cellVariants } from './variants'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  size?: TableSize
  bordered?: boolean
  fixed?: 'left' | 'right'
}

export const TableCell = ({
  size = 'md',
  bordered = false,
  fixed,
  className,
  children,
  ...props
}: TableCellProps) => {
  return (
    <td
      className={cn(
        'table_cell',
        cellVariants({ size }),
        'text-text-primary',
        bordered && 'border-r border-border last:border-r-0',
        fixed === 'left' && 'sticky left-0 bg-background z-10',
        fixed === 'right' && 'sticky right-0 bg-background z-10',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

TableCell.displayName = 'TableCell'
