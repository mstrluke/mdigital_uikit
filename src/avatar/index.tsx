'use client'

import { cva } from "class-variance-authority";
import { User } from "lucide-react";
import React, { useState, useEffect } from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { AvatarGroupProps, AvatarProps, AvatarSize } from "./types";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center font-medium select-none shrink-0 bg-slot-10 text-slot",
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-8 text-sm",
        md: "size-10 text-base",
        lg: "size-12 text-lg",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
      color: colorVars,
      bordered: {
        true: "ring-2 ring-background",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      color: "default",
      bordered: false,
      disabled: false,
    },
  },
);

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
};

const statusColorClasses = {
  online: "bg-success",
  offline: "bg-border",
  away: "bg-warning",
  busy: "bg-error",
};

const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: "min-w-3 h-3 text-[8px]",
  sm: "min-w-4 h-4 text-[10px]",
  md: "min-w-5 h-5 text-xs",
  lg: "min-w-6 h-6 text-xs",
};

const overlapClasses: Record<AvatarSize, string> = {
  xs: "-space-x-1",
  sm: "-space-x-1.5",
  md: "-space-x-2",
  lg: "-space-x-2.5",
};

function getInitialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  const firstWord = words[0];
  if (words.length === 1 && firstWord) {
    return firstWord.slice(0, 2).toUpperCase();
  }

  const lastWord = words[words.length - 1];
  const firstInitial = firstWord?.[0] ?? "";
  const lastInitial = lastWord?.[0] ?? "";
  return (firstInitial + lastInitial).toUpperCase();
}

function getInitials(name: string | undefined, fallback: string | undefined): string {
  if (fallback) return fallback.slice(0, 2).toUpperCase();
  if (name) return getInitialsFromName(name);
  return "";
}

const DefaultUserIcon = () => (
  <User className="size-[60%] text-text-secondary" aria-hidden="true" />
);

const Avatar = React.memo<AvatarProps>(
  ({
    src,
    alt = "",
    fallback,
    name,
    size = "md",
    shape = "circle",
    status,
    color = "default",
    bordered = false,
    icon,
    badge,
    disabled = false,
    className,
    classNames,
    onError,
    ref,
    ...props
  }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false);
    }, [src]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setImageError(true);
      onError?.(e);
    };

    const showImage = src && !imageError;
    const initials = getInitials(name, fallback);
    const showFallback = !showImage && (initials || icon);
    const showDefaultIcon = !showImage && !showFallback;

    return (
      <div
        ref={ref}
        className={cn(
          "avatar_root",
          avatarVariants({
            size,
            shape,
            color: showImage ? "default" : color,
            bordered,
            disabled,
          }),
          !badge && !status && "overflow-hidden",
          classNames?.root,
          className,
        )}
        aria-disabled={disabled || undefined}
        data-slot="root"
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || name || "User avatar"}
            onError={handleImageError}
            className={cn(
              "avatar_image",
              "size-full object-cover",
              shape === "circle" ? "rounded-full" : "rounded-lg",
              classNames?.image,
            )}
            loading="lazy"
            data-slot="image"
          />
        )}

        {showFallback &&
          (icon ? (
            <span
              className={cn(
                "avatar_fallback",
                "flex items-center justify-center size-[60%]",
                classNames?.fallback,
              )}
              data-slot="fallback"
            >
              {icon}
            </span>
          ) : (
            <span
              className={cn("avatar_fallback", classNames?.fallback)}
              aria-label={`Avatar for ${name || initials}`}
              data-slot="fallback"
            >
              {initials}
            </span>
          ))}

        {showDefaultIcon && <DefaultUserIcon />}

        {status && (
          <span
            className={cn(
              "avatar_status",
              "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
              statusSizeClasses[size],
              statusColorClasses[status],
              classNames?.status,
            )}
            aria-label={`Status: ${status}`}
            data-slot="status"
          />
        )}

        {badge && (
          <span
            className={cn(
              "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-error text-background font-medium px-1",
              badgeSizeClasses[size],
            )}
            aria-label={typeof badge === "number" ? `${badge} notifications` : undefined}
            role={typeof badge === "number" ? "status" : undefined}
          >
            {badge}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

const AvatarGroup = React.memo<AvatarGroupProps>(
  ({
    children,
    max,
    size = "md",
    shape = "circle",
    showTotal = false,
    renderSurplus,
    bordered = false,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const childrenArray = React.Children.toArray(children);
    const total = childrenArray.length;
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max && total > max ? total - max : 0;
    const surplusDisplay = showTotal ? total : remainingCount;

    return (
      <div
        ref={ref}
        className={cn(
          "avatarGroup_root",
          "flex items-center",
          overlapClasses[size],
          classNames?.root,
          className,
        )}
        role="group"
        aria-label={`Avatar group with ${total} members`}
        data-slot="root"
        {...props}
      >
        {visibleChildren.map((child, index) => {
          if (React.isValidElement<AvatarProps>(child)) {
            return React.cloneElement(child, {
              key: child.key ?? index,
              size: child.props.size ?? size,
              shape: child.props.shape ?? shape,
              bordered: child.props.bordered ?? bordered ?? true,
              className: cn(child.props.className),
            });
          }
          return child;
        })}

        {remainingCount > 0 &&
          (renderSurplus ? (
            renderSurplus(surplusDisplay)
          ) : (
            <div
              className={cn(
                "avatarGroup_overflow",
                avatarVariants({
                  size,
                  shape,
                  color: "default",
                  bordered: true,
                }),
                "bg-surface/80 backdrop-blur-sm overflow-hidden",
                classNames?.overflow,
              )}
              aria-label={
                showTotal
                  ? `${total} total members`
                  : `${remainingCount} more members`
              }
              data-slot="overflow"
            >
              <span className="text-text-secondary font-medium">
                {showTotal ? total : `+${remainingCount}`}
              </span>
            </div>
          ))}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export type * from "./types";
export { Avatar, AvatarGroup };
export default Avatar;
