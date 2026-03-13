'use client'

import React, { useId } from 'react'

import { cn } from '../utils'
import type { CheckboxGroupProps } from './types'

const CheckboxGroup = React.memo<CheckboxGroupProps>(
  ({
    label,
    helperText,
    error,
    orientation = 'vertical',
    className,
    classNames,
    children,
    ref,
    ...props
  }) => {
    const uniqueId = useId()
    const labelId = label ? `checkboxgroup-label-${uniqueId}` : undefined
    const messageId = (helperText || error) ? `checkboxgroup-message-${uniqueId}` : undefined

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={labelId}
        aria-describedby={messageId}
        className={cn('checkboxGroup_root', 'w-full', className, classNames?.root)}
        data-slot="root"
        {...props}
      >
        {label && (
          <div className="mb-2" data-slot="label">
            <span
              id={labelId}
              className={cn('checkboxGroup_label', 'text-sm font-medium text-text-secondary', classNames?.label)}
            >
              {label}
            </span>
          </div>
        )}
        <div
          className={cn(
            'checkboxGroup_group',
            'flex',
            orientation === 'vertical'
              ? 'flex-col gap-2'
              : 'flex-row flex-wrap gap-4',
            classNames?.group,
          )}
          data-slot="group"
        >
          {children}
        </div>
        {(helperText || error) && (
          <p
            id={messageId}
            className={cn(
              error ? 'checkboxGroup_error' : 'checkboxGroup_helper',
              'mt-2 text-xs',
              error ? 'text-error' : 'text-text-secondary',
              error ? classNames?.error : classNames?.helper,
            )}
            data-slot={error ? 'error' : 'helper'}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'

export type * from './types'
export default CheckboxGroup
