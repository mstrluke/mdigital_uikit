'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { DescriptionsItem, DescriptionsProps, DescriptionsVariant } from './types'

const tableVariants = cva('w-full border-separate border-spacing-0', {
  variants: {
    bordered: {
      true: 'border',
      false: '',
    },
    rounded: {
      true: 'rounded-lg',
      false: '',
    },
  },
  compoundVariants: [
    { bordered: true, rounded: true, class: 'overflow-hidden' },
  ],
  defaultVariants: {
    bordered: true,
    rounded: true,
  },
})

const labelCellVariants = cva(
  'font-semibold border-b border-r',
  {
    variants: {
      size: {
        xs: 'py-1 px-2 text-[10px]',
        sm: 'py-2 px-3 text-xs',
        md: 'py-3 px-4 text-sm',
        lg: 'py-4 px-5 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const valueCellVariants = cva(
  'text-text-primary border-b border-r',
  {
    variants: {
      size: {
        xs: 'py-1 px-2 text-[10px]',
        sm: 'py-2 px-3 text-xs',
        md: 'py-3 px-4 text-sm',
        lg: 'py-4 px-5 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

// Slot-based variant styles — colorVars[color] on root sets --_c
const labelVariantStyles: Record<DescriptionsVariant, string> = {
  default: 'bg-slot-10 text-text-primary',
  solid: 'bg-slot text-slot-fg',
  soft: 'bg-slot-10 text-slot',
}

const valueVariantStyles: Record<DescriptionsVariant, string> = {
  default: 'bg-background',
  solid: 'bg-background',
  soft: 'bg-slot-10',
}

const borderVariantStyles: Record<DescriptionsVariant, string> = {
  default: 'border-slot-30',
  solid: 'border-slot-50',
  soft: 'border-slot-20',
}

const Descriptions = React.memo<DescriptionsProps>(
  ({
    items,
    column = 3,
    color = 'default',
    size = 'md',
    variant = 'default',
    layout = 'horizontal',
    bordered = true,
    rounded = true,
    className,
    classNames,
    title,
    extra,
    ref,
    ...props
  }) => {
    const labelColors = labelVariantStyles[variant]
    const valueColors = valueVariantStyles[variant]
    const borderColors = borderVariantStyles[variant]

    // Split items into rows based on column count and span
    const rows: DescriptionsItem[][] = []
    let currentRow: DescriptionsItem[] = []
    let currentSpan = 0

    items.forEach((item) => {
      const itemSpan = item.span || 1

      if (currentSpan + itemSpan > column) {
        rows.push(currentRow)
        currentRow = [item]
        currentSpan = itemSpan
      } else {
        currentRow.push(item)
        currentSpan += itemSpan
      }
    })

    if (currentRow.length > 0) {
      rows.push(currentRow)
    }

    if (layout === 'vertical') {
      const tableContent = (
        <table
          className={cn(tableVariants({ bordered, rounded }), bordered && borderColors)}
          role="presentation"
        >
          <tbody data-slot="body" className={classNames?.body}>
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1

              // Calculate which items reach the right edge
              let colPosition = 0
              const itemsAtRightEdge = row.map((item) => {
                const span = item.span || 1
                colPosition += span
                return colPosition >= column
              })

              return (
                <React.Fragment key={rowIndex}>
                  <tr className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                    {row.map((item, itemIndex) => (
                      <th
                        key={`${item.key}-label`}
                        colSpan={item.span || 1}
                        className={cn(
                          'descriptions_label',
                          labelCellVariants({ size }), labelColors, borderColors,
                          itemsAtRightEdge[itemIndex] && 'border-r-0',
                          classNames?.label,
                        )}
                        data-slot='label'
                      >
                        {item.label}
                      </th>
                    ))}
                  </tr>
                  <tr className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                    {row.map((item, itemIndex) => (
                      <td
                        key={`${item.key}-value`}
                        colSpan={item.span || 1}
                        className={cn(
                          'descriptions_content',
                          valueCellVariants({ size }), valueColors, borderColors,
                          itemsAtRightEdge[itemIndex] && 'border-r-0',
                          isLastRow && 'border-b-0',
                          classNames?.content,
                        )}
                        data-slot='content'
                      >
                        {item.children}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      )

      if (title || extra) {
        return (
          <div ref={ref} className={cn('descriptions_root', colorVars[color], classNames?.root, className)} data-slot="root" {...props}>
            <div className={cn('descriptions_title', 'flex items-center justify-between mb-3', classNames?.title)} data-slot="title">
              {title && <div className="text-base font-semibold text-text-primary">{title}</div>}
              {extra && <div className={cn('descriptions_extra', classNames?.extra)} data-slot="extra">{extra}</div>}
            </div>
            {tableContent}
          </div>
        )
      }

      return (
        <table
          ref={ref as React.Ref<HTMLTableElement>}
          className={cn('descriptions_root', colorVars[color], tableVariants({ bordered, rounded }), bordered && borderColors, classNames?.root, className)}
          data-slot="root"
          role="presentation"
          {...props}
        >
          <tbody data-slot="body" className={classNames?.body}>
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1

              // Calculate which items reach the right edge
              let colPosition = 0
              const itemsAtRightEdge = row.map((item) => {
                const span = item.span || 1
                colPosition += span
                return colPosition >= column
              })

              return (
                <React.Fragment key={rowIndex}>
                  <tr className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                    {row.map((item, itemIndex) => (
                      <th
                        key={`${item.key}-label`}
                        colSpan={item.span || 1}
                        className={cn(
                          'descriptions_label',
                          labelCellVariants({ size }), labelColors, borderColors,
                          itemsAtRightEdge[itemIndex] && 'border-r-0',
                          classNames?.label,
                        )}
                        data-slot='label'
                      >
                        {item.label}
                      </th>
                    ))}
                  </tr>
                  <tr className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                    {row.map((item, itemIndex) => (
                      <td
                        key={`${item.key}-value`}
                        colSpan={item.span || 1}
                        className={cn(
                          'descriptions_content',
                          valueCellVariants({ size }), valueColors, borderColors,
                          itemsAtRightEdge[itemIndex] && 'border-r-0',
                          isLastRow && 'border-b-0',
                          classNames?.content,
                        )}
                        data-slot='content'
                      >
                        {item.children}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      )
    }

    // Horizontal layout
    const horizontalTableContent = (
      <table
        className={cn(tableVariants({ bordered, rounded }), bordered && borderColors)}
        role="presentation"
      >
        <tbody data-slot="body" className={classNames?.body}>
          {rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1

            // Calculate which value cells reach the right edge
            let colPosition = 0
            const valueAtRightEdge = row.map((item) => {
              const span = item.span || 1
              colPosition += span * 2 // Each item takes label + value columns
              return colPosition >= column * 2
            })

            return (
              <tr key={rowIndex} className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                {row.map((item, itemIndex) => {
                  const itemSpan = item.span || 1
                  const valueColSpan = itemSpan * 2 - 1

                  return (
                    <React.Fragment key={item.key}>
                      <th
                        className={cn(
                          'descriptions_label',
                          labelCellVariants({ size }), labelColors, borderColors,
                          isLastRow && 'border-b-0',
                          classNames?.label,
                        )}
                        data-slot='label'
                      >
                        {item.label}
                      </th>
                      <td
                        colSpan={valueColSpan}
                        className={cn(
                          'descriptions_content',
                          valueCellVariants({ size }), valueColors, borderColors,
                          valueAtRightEdge[itemIndex] && 'border-r-0',
                          isLastRow && 'border-b-0',
                          classNames?.content,
                        )}
                        data-slot='content'
                      >
                        {item.children}
                      </td>
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )

    if (title || extra) {
      return (
        <div ref={ref} className={cn('descriptions_root', colorVars[color], classNames?.root, className)} data-slot="root" {...props}>
          <div className={cn('descriptions_title', 'flex items-center justify-between mb-3', classNames?.title)} data-slot="title">
            {title && <div className="text-base font-semibold text-text-primary">{title}</div>}
            {extra && <div className={cn('descriptions_extra', classNames?.extra)} data-slot="extra">{extra}</div>}
          </div>
          {horizontalTableContent}
        </div>
      )
    }

    return (
      <table
        ref={ref as React.Ref<HTMLTableElement>}
        className={cn('descriptions_root', colorVars[color], tableVariants({ bordered, rounded }), bordered && borderColors, classNames?.root, className)}
        data-slot="root"
        role="presentation"
        {...props}
      >
        <tbody data-slot="body" className={classNames?.body}>
          {rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1

            // Calculate which value cells reach the right edge
            let colPosition = 0
            const valueAtRightEdge = row.map((item) => {
              const span = item.span || 1
              colPosition += span * 2 // Each item takes label + value columns
              return colPosition >= column * 2
            })

            return (
              <tr key={rowIndex} className={cn('descriptions_item', classNames?.item)} data-slot='item'>
                {row.map((item, itemIndex) => {
                  const itemSpan = item.span || 1
                  const valueColSpan = itemSpan * 2 - 1

                  return (
                    <React.Fragment key={item.key}>
                      <th
                        className={cn(
                          'descriptions_label',
                          labelCellVariants({ size }), labelColors, borderColors,
                          isLastRow && 'border-b-0',
                          classNames?.label,
                        )}
                        data-slot='label'
                      >
                        {item.label}
                      </th>
                      <td
                        colSpan={valueColSpan}
                        className={cn(
                          'descriptions_content',
                          valueCellVariants({ size }), valueColors, borderColors,
                          valueAtRightEdge[itemIndex] && 'border-r-0',
                          isLastRow && 'border-b-0',
                          classNames?.content,
                        )}
                        data-slot='content'
                      >
                        {item.children}
                      </td>
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  },
)

Descriptions.displayName = 'Descriptions'

export type * from './types'
export default Descriptions
