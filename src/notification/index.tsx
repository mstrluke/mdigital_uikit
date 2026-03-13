'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { X } from 'lucide-react'

import { cn, iconSizes } from '../utils'
import { colorVars } from '../variants'
import type { NotificationProps } from './types'

const notificationVariants = cva(
  'relative flex gap-3 rounded-md transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-slot border border-slot text-slot-fg',
        solid: 'bg-slot text-slot-fg',
        outline: 'bg-background border border-slot border-l-4 border-l-slot text-slot',
        soft: 'bg-slot-10 border-l-4 border-l-slot text-slot',
      },
      color: colorVars,
      size: {
        xs: 'p-2 gap-2',
        sm: 'p-3 gap-2.5',
        md: 'p-4 gap-3',
        lg: 'p-5 gap-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'md',
    },
  },
)

const titleSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const descriptionSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const Notification = React.memo<NotificationProps>(
  ({
    title,
    description,
    variant = 'default',
    color = 'default',
    size = 'md',
    closable,
    onClose,
    action,
    className,
    classNames,
    children,
  }) => {
    const isClosable = closable ?? (onClose !== undefined)

    return (
      <div
        data-slot="root"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'notification_root',
          notificationVariants({ variant, color, size }),
          className,
          classNames?.root,
        )}
      >
        <div className={cn('flex-1 min-w-0', 'notification_content', classNames?.content)}>
          {title && <div className={cn('font-semibold mb-1', titleSizeClasses[size], 'notification_title', classNames?.title)}>{title}</div>}
          {description && (
            <div className={cn('opacity-90', descriptionSizeClasses[size], 'notification_description', classNames?.description)}>{description}</div>
          )}
          {children && <div className="mt-2">{children}</div>}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn('mt-2 font-medium underline hover:no-underline', descriptionSizeClasses[size], 'notification_action', classNames?.action)}
            >
              {action.label}
            </button>
          )}
        </div>

        {isClosable && (
          <button
            type="button"
            onClick={onClose}
            className={cn('shrink-0 rounded-sm opacity-70 hover:opacity-100 transition-opacity', 'notification_closeButton', classNames?.closeButton)}
            aria-label="Close notification"
          >
            <X className={cn(iconSizes[size], 'notification_icon', classNames?.icon)} aria-hidden="true" />
          </button>
        )}
      </div>
    )
  },
)

Notification.displayName = 'Notification'

export type * from './types'
export default Notification
