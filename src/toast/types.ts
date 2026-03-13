import type React from 'react'

import type { ComponentColor, ComponentSize } from '../types'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'

export interface ToastOptions {
  title?: string
  description?: string
  color?: ComponentColor
  variant?: 'default' | 'solid' | 'outline' | 'soft'
  size?: ComponentSize
  duration?: number
  closable?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
  icon?: React.ReactNode
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => string | number
  success: (title: string, description?: string) => string | number
  error: (title: string, description?: string) => string | number
  warning: (title: string, description?: string) => string | number
  info: (title: string, description?: string) => string | number
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((err: unknown) => string)
    },
  ) => string | number
  dismiss: (id: string | number) => void
  dismissAll: () => void
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  maxToasts?: number
  offset?: number | string
  theme?: 'light' | 'dark' | 'system'
  closeButton?: boolean
  duration?: number
  className?: string
}
