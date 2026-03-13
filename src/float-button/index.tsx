'use client'

import { cva } from 'class-variance-authority'
import React, { useState, useEffect, useCallback } from 'react'

import { ArrowUp, X, Plus } from 'lucide-react'
import { cn } from '../utils'
import { colorVars } from '../variants'
import type { FloatButtonProps, FloatButtonGroupProps, BackTopProps } from './types'

const buttonVariants = cva(
  'inline-flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      size: {
        xs: 'w-8 h-8 text-sm',
        sm: 'w-10 h-10 text-base',
        md: 'w-12 h-12 text-lg',
        lg: 'w-14 h-14 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
      variant: {
        default: 'bg-background border border-border text-text-primary hover:bg-surface',
        colored: 'bg-slot text-slot-fg hover:bg-slot-90',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle', variant: 'default' },
  },
)

const FloatButton = React.memo<FloatButtonProps>(
  ({
    icon,
    label,
    tooltip,
    badge,
    onClick,
    href,
    target,
    color = 'default',
    size = 'md',
    shape = 'circle',
    disabled = false,
    className,
    classNames,
    style,
  }) => {
    const variant = color === 'default' ? 'default' : 'colored'
    const Component = href ? 'a' : 'button'

    const content = (
      <Component
        {...(href ? { href, target } : { type: 'button' as const, onClick, disabled })}
        data-slot="button"
        title={tooltip}
        className={cn(
          'floatButton_button',
          buttonVariants({ size, shape, variant }),
          color !== 'default' && colorVars[color],
          'relative',
          classNames?.button,
          className,
        )}
        style={style}
      >
        {icon}
        {label && !icon && <span className="text-xs font-medium">{label}</span>}
        {badge !== undefined && (
          <span
            data-slot="badge"
            className={cn(
              'floatButton_badge',
              'absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-error-foreground text-[10px] font-medium flex items-center justify-center',
              classNames?.badge,
            )}
          >
            {badge}
          </span>
        )}
      </Component>
    )

    return content
  },
)

FloatButton.displayName = 'FloatButton'

const FloatButtonGroup = React.memo<FloatButtonGroupProps>(
  ({
    children,
    trigger = 'click',
    icon,
    closeIcon,
    open: controlledOpen,
    onOpenChange,
    shape = 'circle',
    color = 'primary',
    size = 'md',
    placement = 'top',
    className,
    classNames,
    style,
  }) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const setOpen = useCallback(
      (v: boolean) => {
        if (controlledOpen === undefined) setInternalOpen(v)
        onOpenChange?.(v)
      },
      [controlledOpen, onOpenChange],
    )

    const placementClasses = {
      top: 'flex-col-reverse gap-3 bottom-0',
      bottom: 'flex-col gap-3 top-0',
      left: 'flex-row-reverse gap-3 right-0',
      right: 'flex-row gap-3 left-0',
    }

    const openIcon = icon ?? <Plus className="w-5 h-5" />
    const closedIcon = closeIcon ?? <X className="w-5 h-5" />

    return (
      <div
        data-slot="group"
        className={cn('floatButton_group', 'relative inline-flex', classNames?.group, className)}
        style={style}
        onMouseEnter={trigger === 'hover' ? () => setOpen(true) : undefined}
        onMouseLeave={trigger === 'hover' ? () => setOpen(false) : undefined}
      >
        <FloatButton
          icon={
            <span className={cn('transition-transform duration-200', isOpen && 'rotate-45')}>
              {isOpen ? closedIcon : openIcon}
            </span>
          }
          color={color}
          size={size}
          shape={shape}
          onClick={trigger === 'click' ? () => setOpen(!isOpen) : undefined}
        />

        {isOpen && (
          <div className={cn('absolute flex items-center', placementClasses[placement])}>
            {React.Children.map(children, (child, idx) => {
              if (!React.isValidElement(child)) return child
              return (
                <div
                  key={idx}
                  className="animate-in fade-in zoom-in-75"
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both', animationDuration: '150ms' }}
                >
                  {React.cloneElement(child as React.ReactElement<FloatButtonProps>, {
                    size: (child as React.ReactElement<FloatButtonProps>).props.size || size,
                    shape: (child as React.ReactElement<FloatButtonProps>).props.shape || shape,
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)

FloatButtonGroup.displayName = 'FloatButtonGroup'

const BackTop = React.memo<BackTopProps>(
  ({
    visibilityHeight = 400,
    onClick,
    icon,
    size = 'md',
    shape = 'circle',
    color = 'default',
    ...props
  }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      if (typeof window === 'undefined') return
      const handleScroll = () => setVisible(window.scrollY >= visibilityHeight)
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [visibilityHeight])

    const handleClick = useCallback(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      onClick?.()
    }, [onClick])

    if (!visible) return null

    return (
      <FloatButton
        icon={icon ?? <ArrowUp className="w-5 h-5" />}
        tooltip="Back to top"
        onClick={handleClick}
        size={size}
        shape={shape}
        color={color}
        {...props}
      />
    )
  },
)

BackTop.displayName = 'BackTop'

export type * from './types'
export { FloatButton, FloatButtonGroup, BackTop }
export default FloatButton
