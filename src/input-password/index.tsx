'use client'

import React from 'react'

import { Eye, EyeOff } from 'lucide-react'

import Input from '../input'
import { cn, iconSizes } from '../utils'
import type { PasswordInputProps } from './types'

export const PasswordInput = React.memo<PasswordInputProps>(
  ({ visibilityToggle = true, size = 'md', ref, classNames, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const toggleVisibility = React.useCallback(() => {
      setShowPassword((prev) => !prev)
    }, [])

    const memoizedClassNames = React.useMemo(
      () => ({
        root: cn('inputPassword_root', classNames?.root),
        wrapper: cn('inputPassword_wrapper', classNames?.wrapper),
        label: cn('inputPassword_label', classNames?.label),
        input: cn('inputPassword_input', classNames?.input),
        helper: cn('inputPassword_helper', classNames?.helper),
        error: cn('inputPassword_error', classNames?.error),
      }),
      [classNames],
    )

    const memoizedRightIcon = React.useMemo(
      () =>
        visibilityToggle ? (
          <button
            type="button"
            onClick={toggleVisibility}
            data-slot="toggleButton"
            className={cn(
              'inputPassword_toggleButton',
              'cursor-pointer hover:text-text-primary transition-colors',
              classNames?.toggleButton,
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            // tabIndex={-1}
          >
            {showPassword ? (
              <Eye
                data-slot="toggleIcon"
                className={cn(
                  'inputPassword_toggleIcon',
                  iconSizes[size],
                  classNames?.toggleIcon,
                )}
              />
            ) : (
              <EyeOff
                data-slot="toggleIcon"
                className={cn(
                  'inputPassword_toggleIcon',
                  iconSizes[size],
                  classNames?.toggleIcon,
                )}
              />
            )}
          </button>
        ) : undefined,
      [visibilityToggle, toggleVisibility, showPassword, size, classNames],
    )

    return (
      <Input
        {...props}
        size={size}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        classNames={memoizedClassNames}
        rightIcon={memoizedRightIcon}
      />
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export type * from './types'
export default PasswordInput
