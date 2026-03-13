'use client'

import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type {
  BadgePlacement,
  BadgeProps,
  BadgeSize,
} from "./types";

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-slot border border-slot text-slot-fg",
        solid: "bg-slot border border-slot text-slot-fg hover:bg-slot-90",
        outline: "border border-slot text-slot hover:bg-slot-10",
        soft: "bg-slot-10 text-slot",
      },
      color: colorVars,
      size: {
        xs: "text-(length:--badge-font-size-xs) px-(--badge-padding-x-xs) py-(--badge-padding-y-xs)",
        sm: "text-(length:--badge-font-size-sm) px-(--badge-padding-x-sm) py-(--badge-padding-y-sm)",
        md: "text-(length:--badge-font-size-md) px-(--badge-padding-x-md) py-(--badge-padding-y-md)",
        lg: "text-(length:--badge-font-size-lg) px-(--badge-padding-x-lg) py-(--badge-padding-y-lg)",
      },
      shape: {
        rounded: "rounded",
        pill: "rounded-full",
        circle: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "sm",
      shape: "rounded",
    },
  },
);

const dotSizeClasses: Record<BadgeSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
};

const iconSizeClasses: Record<BadgeSize, string> = {
  xs: "size-2.5",
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

const placementClasses: Record<BadgePlacement, string> = {
  "top-right": "top-0 right-0 -translate-y-1/2 translate-x-1/2",
  "top-left": "top-0 left-0 -translate-y-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0 translate-y-1/2 translate-x-1/2",
  "bottom-left": "bottom-0 left-0 translate-y-1/2 -translate-x-1/2",
};

const Badge = React.memo<BadgeProps>(({
  children,
  color = "primary",
  variant = "solid",
  size = "sm",
  shape = "rounded",
  dot = false,
  count,
  maxCount = 99,
  showZero = false,
  icon,
  placement = "top-right",
  offset,
  processing = false,
  invisible = false,
  standalone = false,
  content,
  className,
  wrapperClassName,
  ref,
}) => {
    const getDisplayCount = () => {
      if (count === undefined) return null;
      if (count === 0 && !showZero) return null;
      if (count > maxCount) return `${maxCount}+`;
      return count;
    };

    const displayCount = getDisplayCount();

    const isFloatingMode =
      children && (count !== undefined || dot || content) && !standalone;

    if (
      count !== undefined &&
      count === 0 &&
      !showZero &&
      !children &&
      !content
    ) {
      return null;
    }

    const offsetStyles = offset
      ? {
          "--badge-offset-x": `${offset[0]}px`,
          "--badge-offset-y": `${offset[1]}px`,
        }
      : undefined;

    const renderBadge = (badgeContent: React.ReactNode) => {
      const isIconOnly = !!icon && badgeContent == null && !dot;

      return (
      <span
        ref={ref}
        data-slot="root"
        className={cn(
          "badge_root",
          badgeVariants({ variant, color, size, shape }),
          dot && [dotSizeClasses[size], "min-w-0", "rounded-full"],
          isIconOnly && "aspect-square",
          processing && "animate-pulse",
          invisible && "opacity-0 scale-0",
          "z-10",
          className,
        )}
        style={{
          ...(dot ? { padding: 0 } : undefined),
          ...(offsetStyles as React.CSSProperties),
        }}
      >
        {!dot && (
          <>
            {icon && (
              <span
                className={cn(
                  "inline-flex items-center justify-center shrink-0",
                  iconSizeClasses[size],
                  badgeContent && "mr-1",
                )}
              >
                {React.isValidElement(icon)
                  ? React.cloneElement(
                      icon as React.ReactElement<{ className?: string }>,
                      {
                        className: cn(
                          "w-full h-full",
                          (icon as React.ReactElement<{ className?: string }>)
                            .props.className,
                        ),
                      },
                    )
                  : icon}
              </span>
            )}
            {badgeContent}
          </>
        )}
      </span>
      );
    };

    const renderProcessingRing = () =>
      processing &&
      dot &&
      !invisible && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping bg-slot-50",
            colorVars[color],
          )}
        />
      );

    if (isFloatingMode) {
      const floatingContent = content ?? displayCount;

      if (count !== undefined && count === 0 && !showZero && !dot && !content) {
        return (
          <span className={cn("relative inline-flex", wrapperClassName)}>
            {children}
          </span>
        );
      }

      return (
        <span className={cn("relative inline-flex", wrapperClassName)}>
          {children}
          <span
            className={cn(
              "absolute",
              placementClasses[placement],
              offset &&
                "translate-x-[calc(var(--tw-translate-x)+var(--badge-offset-x,0px))] translate-y-[calc(var(--tw-translate-y)+var(--badge-offset-y,0px))]",
            )}
            style={offsetStyles as React.CSSProperties}
          >
            <span className="relative inline-flex">
              {renderBadge(floatingContent)}
              {renderProcessingRing()}
            </span>
          </span>
        </span>
      );
    }

    const standaloneContent =
      content ?? (count !== undefined ? displayCount : children);

    if (dot && processing) {
      return (
        <span className={cn("relative inline-flex", wrapperClassName)}>
          {renderBadge(null)}
          {renderProcessingRing()}
        </span>
      );
    }

    return renderBadge(standaloneContent);
});

Badge.displayName = "Badge";

export type * from "./types";
export default Badge;
