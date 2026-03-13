import { cva } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
} as const

export type ValidationStatus =
  | 'default'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'

export interface StatusMessages {
  error?: string | boolean
  warning?: string | boolean
  info?: string | boolean
  success?: string | boolean
  helperText?: string
}

export function getValidationStatus(messages: StatusMessages): {
  status: ValidationStatus
  message?: string | boolean
} {
  const { error, warning, info, success, helperText } = messages
  const message = error || warning || info || success || helperText

  let status: ValidationStatus = 'default'
  if (error) status = 'error'
  else if (warning) status = 'warning'
  else if (success) status = 'success'
  else if (info) status = 'info'

  return { status, message }
}

export const statusMessageVariants = cva('text-xs', {
  variants: {
    status: {
      default: 'text-text-secondary',
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-info',
      success: 'text-success',
    },
  },
  defaultVariants: {
    status: 'default',
  },
})
