'use client'

import { cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '../utils'
import { colorVars } from '../variants'
import type { DividerProps } from './types'

/**
 * Class variance authority configuration for the Divider component
 * Defines style variants for orientation, line style, and text alignment
 */
const dividerVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
  },
})

/**
 * Text alignment styles for the label within the divider
 * Defines the width distribution of divider lines before and after the label
 * Uses design tokens for customizability
 */
const textAlignClasses = {
  left: {
    before: 'w-(--divider-left-before-width)',
    after: 'w-(--divider-left-after-width)',
  },
  center: {
    before: 'w-(--divider-center-before-width)',
    after: 'w-(--divider-center-after-width)',
  },
  right: {
    before: 'w-(--divider-right-before-width)',
    after: 'w-(--divider-right-after-width)',
  },
}

/**
 * Divider Component
 *
 * A visual separator that can be used to divide content sections.
 * Supports horizontal and vertical orientations, different line styles,
 * color variants, and optional label text.
 *
 * @component
 * @example
 * // Basic horizontal divider
 * <Divider />
 *
 * @example
 * // Divider with text label
 * <Divider>Section Title</Divider>
 *
 * @example
 * // Colored divider
 * <Divider color="primary" />
 *
 * @example
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * @example
 * // Dashed divider with left-aligned text
 * <Divider variant="dashed" textAlign="left" color="accent">
 *   Options
 * </Divider>
 *
 * @param {DividerProps} props - Component props
 * @returns {JSX.Element} Rendered divider component
 */
const Divider = React.memo<DividerProps>(
  ({
    orientation = 'horizontal',
    variant = 'solid',
    color = 'default',
    children,
    textAlign = 'center',
    spacing,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const hasText = Boolean(children)

    /**
     * Render horizontal divider
     * Supports optional text label with configurable alignment
     */
    if (orientation === 'horizontal') {
      if (hasText) {
        return (
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            role="separator"
            aria-orientation="horizontal"
            data-slot="root"
            className={cn(
              'divider_root',
              'flex items-center gap-(--divider-gap) text-sm',
              colorVars[color],
              'text-slot',
              className,
              classNames?.root,
            )}
            style={spacing ? { margin: spacing } : undefined}
            {...props}
          >
            <div
              data-slot="line"
              className={cn(
                'divider_line',
                'border-t border-slot',
                dividerVariants({ variant }),
                textAlignClasses[textAlign].before,
                classNames?.line,
              )}
            />
            <span
              data-slot="label"
              className={cn(
                'divider_label',
                'whitespace-nowrap flex-shrink-0',
                classNames?.label,
              )}
            >
              {children}
            </span>
            <div
              data-slot="line"
              className={cn(
                'divider_line',
                'border-t border-slot',
                dividerVariants({ variant }),
                textAlignClasses[textAlign].after,
                classNames?.line,
              )}
            />
          </div>
        )
      }

      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          role="separator"
          aria-orientation="horizontal"
          data-slot="root"
          className={cn(
            'divider_root',
            'border-t border-slot',
            colorVars[color],
            dividerVariants({ orientation, variant }),
            className,
            classNames?.root,
          )}
          style={spacing ? { margin: spacing } : undefined}
          {...props}
        />
      )
    }

    /**
     * Render vertical divider
     * Text labels are not supported in vertical orientation
     */

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        data-slot="root"
        className={cn(
          'divider_root',
          'inline-block w-px border-l self-stretch border-slot',
          colorVars[color],
          dividerVariants({ variant }),
          className,
          classNames?.root,
        )}
        style={spacing ? { margin: spacing } : undefined}
        {...props}
      />
    )
  },
)

Divider.displayName = 'Divider'

export type * from './types'
export default Divider
