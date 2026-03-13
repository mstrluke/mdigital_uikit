"use client";

import { cva } from "class-variance-authority";
import { ExternalLink } from "lucide-react";
import React from "react";

import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { LinkProps, LinkSize } from "./types";

/**
 * Link variants
 */
const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slot focus-visible:ring-offset-2 focus-visible:ring-offset-background text-slot hover:text-slot-80",
  {
    variants: {
      color: colorVars,
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      underline: {
        always: "underline",
        hover: "no-underline hover:underline",
        none: "no-underline",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      underline: "hover",
      disabled: false,
    },
  },
);

/**
 * Link Component
 */
const Link = React.memo<LinkProps>(({
  children,
  color = "default",
  size = "md",
  underline = "hover",
  external = false,
  showExternalIcon = true,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  classNames,
  href,
  ref,
  onClick,
  ...props
}) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    const showExternalIconRendered = external && showExternalIcon;

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={cn(
          "link_root",
          (leftIcon || rightIcon) && "align-top",
          linkVariants({
            color,
            size,
            underline,
            disabled,
          }),
          classNames?.root,
          className,
        )}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        data-slot="root"
        {...externalProps}
        {...props}
      >
        {leftIcon && (
          <span
            className={cn(
              "link_icon",
              "inline-flex items-center justify-center shrink-0",
              iconSizes[size as LinkSize],
              classNames?.icon,
            )}
            data-slot="icon"
          >
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span
            className={cn(
              "link_icon",
              "inline-flex items-center justify-center shrink-0",
              iconSizes[size as LinkSize],
              classNames?.icon,
            )}
            data-slot="icon"
          >
            {rightIcon}
          </span>
        )}
        {showExternalIconRendered && (
          <ExternalLink
            className={cn(
              "link_externalIcon",
              iconSizes[size as LinkSize],
              classNames?.externalIcon,
            )}
            aria-label="Opens in new tab"
            data-slot="externalIcon"
          />
        )}
      </a>
    );
});

Link.displayName = "Link";

export type * from "./types";
export default Link;
