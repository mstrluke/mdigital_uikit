'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import type { ButtonProps } from '../button/types'
import { cn } from '../utils'
import type { ButtonGroupProps } from './types'

const buttonGroupVariants = cva('inline-flex', {
  variants: {
    vertical: {
      true: 'flex-col',
      false: 'flex-row',
    },
    fullWidth: {
      true: 'w-full [&>*]:flex-1',
      false: '',
    },
  },
  defaultVariants: {
    vertical: false,
    fullWidth: false,
  },
})

const attachedHorizontalClasses =
  '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:border-r-0 [&>*:not(:last-child)]:rounded-r-none'

const attachedVerticalClasses =
  '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:border-b-0 [&>*:not(:last-child)]:rounded-b-none'

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
}

const ButtonGroup = React.memo<ButtonGroupProps>(
  ({
    vertical = false,
    attached = true,
    gap = 'md',
    fullWidth = false,
    size,
    variant,
    color,
    shape,
    disabled = false,
    className,
    classNames,
    children,
    ref,
    ...props
  }) => {
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement<ButtonProps>(child)) {
        return React.cloneElement(child, {
          // Group props are defaults - child props take precedence
          size: child.props.size ?? size,
          variant: child.props.variant ?? variant,
          color: child.props.color ?? color,
          shape: child.props.shape ?? shape,
          disabled: child.props.disabled || disabled,
          className: cn(classNames?.button, child.props.className),
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'buttonGroup_root',
          buttonGroupVariants({ vertical, fullWidth }),
          attached
            ? vertical
              ? attachedVerticalClasses
              : attachedHorizontalClasses
            : gapClasses[gap],
          classNames?.root,
          className,
        )}
        data-slot="root"
        {...props}
      >
        {enhancedChildren}
      </div>
    )
  },
)

ButtonGroup.displayName = 'ButtonGroup'

export type * from './types'
export default ButtonGroup
