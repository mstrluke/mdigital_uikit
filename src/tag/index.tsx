'use client'

import { cva } from 'class-variance-authority';
import React from 'react';

import { X } from 'lucide-react';

import { cn } from '../utils';
import { colorVars } from '../variants';
import type { TagProps } from './types';

/**
 * Class variance authority configuration for the Tag component
 * Defines style variants for color, variant, and size
 */
const tagVariants = cva('inline-flex items-center gap-1.5 whitespace-nowrap rounded font-medium transition-colors', {
  variants: {
    variant: {
      default: 'bg-slot border border-slot text-slot-fg',
      solid: 'bg-slot border border-slot text-slot-fg hover:bg-slot-90',
      outline: 'border border-slot text-slot hover:bg-slot-10',
      soft: 'bg-slot-10 text-slot',
    },
    color: colorVars,
    size: {
      xs: 'text-[10px] px-1.5 py-0.5',
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-2.5 py-1',
      lg: 'text-base px-3 py-1.5',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'sm',
  },
});

/**
 * Icon and close button size variants for different tag sizes
 */
const iconSizeClasses = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

/**
 * Tag Component
 *
 * An interactive badge variant that can be used for labels, categories, or removable items.
 * Supports multiple variants, colors, sizes, icons, and close functionality.
 *
 * @component
 * @example
 * // Basic tag
 * <Tag>Label</Tag>
 *
 * @example
 * // Tag with close button
 * <Tag closable onClose={(e) => console.log('Tag removed')}>
 *   Removable Tag
 * </Tag>
 *
 * @example
 * // Tag with icon
 * <Tag icon={<Star />} color="warning">
 *   Featured
 * </Tag>
 *
 * @example
 * // Different variants
 * <Tag variant="outline" color="success">Outline Tag</Tag>
 * <Tag variant="soft" color="info">Soft Tag</Tag>
 *
 * @example
 * // Disable keyboard removal (Backspace/Delete on tag)
 * <Tag closable disableKeyboardRemoval onClose={(e) => console.log('Tag removed')}>
 *   No keyboard removal
 * </Tag>
 *
 * @example
 * // Tag with keyboard removal enabled (focus on tag and press Delete/Backspace)
 * <Tag closable onClose={(e) => console.log('Tag removed')}>
 *   Press Delete or Backspace to remove
 * </Tag>
 *
 * @param {TagProps} props - Component props
 * @returns {JSX.Element} Rendered tag component
 */
const Tag = React.memo<TagProps>(({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'sm',
  closable = false,
  onClose,
  icon,
  className,
  classNames,
  onClick,
  disableKeyboardRemoval = false,
  ...props
}) => {
    /**
     * Handles the close button click event
     * Stops event propagation to prevent triggering parent onClick handlers
     *
     * @param {React.MouseEvent<HTMLButtonElement>} e - Mouse event
     */
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClose?.(e);
    };

    /**
     * Handles keyboard events for the close button
     * Always responds to Enter/Space for activation (accessibility requirement)
     *
     * @param {React.KeyboardEvent<HTMLButtonElement>} e - Keyboard event
     */
    const handleCloseKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Always allow Enter/Space for activation (accessibility requirement)
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onClose?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    /**
     * Handles keyboard events for the tag
     * Removes tag when Delete or Backspace is pressed (takes priority)
     * Activates onClick when Enter or Space is pressed
     *
     * @param {React.KeyboardEvent<HTMLSpanElement>} e - Keyboard event
     */
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      // Handle deletion for closable tags (takes priority over onClick)
      if (!disableKeyboardRemoval && closable && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        e.stopPropagation();
        onClose?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
        return;
      }

      // Handle activation for clickable tags
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.stopPropagation();
        onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
      }
    };

    return (
      <span
        className={cn(
          'tag_root',
          tagVariants({ variant, color, size }),
          (onClick || closable) && 'cursor-pointer',
          (onClick || (!disableKeyboardRemoval && closable)) &&
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ring-offset-background',
          classNames?.root,
          className
        )}
        onClick={onClick}
        onKeyDown={onClick || (!disableKeyboardRemoval && closable) ? handleTagKeyDown : undefined}
        role={onClick || (!disableKeyboardRemoval && closable) ? 'button' : undefined}
        tabIndex={onClick || (!disableKeyboardRemoval && closable) ? 0 : undefined}
        aria-label={
          (onClick || (!disableKeyboardRemoval && closable)) && typeof children === 'string' ? children : undefined
        }
        data-slot='root'
        {...props}
      >
        {icon && (
          <span className={cn('inline-flex items-center justify-center flex-shrink-0', iconSizeClasses[size])}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon, {
                  className: cn('w-full h-full', (icon.props as { className?: string }).className),
                } as React.HTMLAttributes<HTMLElement>)
              : icon}
          </span>
        )}
        <span
          className={cn('tag_content', classNames?.content)}
          data-slot='content'
        >
          {children}
        </span>
        {closable && (
          <button
            type='button'
            onClick={handleClose}
            onKeyDown={handleCloseKeyDown}
            className={cn(
              'tag_closeButton',
              'inline-flex items-center justify-center flex-shrink-0 cursor-pointer rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1',
              iconSizeClasses[size],
              classNames?.closeButton
            )}
            aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove tag'}
            tabIndex={disableKeyboardRemoval ? 0 : -1}
            data-slot='closeButton'
          >
            <X className='w-full h-full' />
          </button>
        )}
      </span>
    );
});

Tag.displayName = 'Tag';

export type * from './types';
export default Tag;
