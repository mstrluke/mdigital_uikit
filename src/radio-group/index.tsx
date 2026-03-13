'use client'

import React, { useId } from 'react'

import { cn } from '../utils'
import type { RadioGroupProps } from './types'

export const RadioGroup = React.memo<RadioGroupProps>(
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
    const id = useId()
    const labelId = `radiogroup-label-${id}`
    const helperId = `radiogroup-helper-${id}`
    const hasHelperText = !!(helperText || error)

    return (
      <div
        data-slot="root"
        ref={ref}
        className={cn('radioGroup_root', 'w-full', className, classNames?.root)}
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={hasHelperText ? helperId : undefined}
        {...props}
      >
        {label && (
          <div className="mb-2">
            <span id={labelId} className={cn('radioGroup_label', 'text-sm font-medium text-text-secondary', classNames?.label)}>
              {label}
            </span>
          </div>
        )}
        <div
          className={cn(
            'radioGroup_group',
            'flex',
            orientation === 'vertical'
              ? 'flex-col gap-2'
              : 'flex-row flex-wrap gap-4',
            classNames?.group,
          )}
        >
          {children}
        </div>
        {(helperText || error) && (
          <p
            id={helperId}
            className={cn(
              error ? 'radioGroup_error' : 'radioGroup_helper',
              'mt-2 text-xs',
              error ? 'text-error' : 'text-text-secondary',
              error ? classNames?.error : classNames?.helper,
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export type * from './types'
export default RadioGroup
