"use client";

import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React, { useState, useId, useCallback } from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { SwitchProps, SwitchSize } from "./types";

const switchTrackVariants = cva(
  [
    "relative rounded-full cursor-pointer transition-colors",
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
  ],
  {
    variants: {
      color: colorVars,
      size: {
        xs: "w-(--switch-width-xs) h-(--switch-height-xs)",
        sm: "w-(--switch-width-sm) h-(--switch-height-sm)",
        md: "w-(--switch-width-md) h-(--switch-height-md)",
        lg: "w-(--switch-width-lg) h-(--switch-height-lg)",
      },
      hasError: {
        true: "bg-error/30 peer-checked:bg-error peer-focus-visible:ring-error",
        false: "",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      hasError: false,
    },
  },
);

const switchThumbVariants = cva(
  "absolute top-0.5 left-0.5 bg-background rounded-full shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center",
  {
    variants: {
      size: {
        xs: "w-(--switch-thumb-xs) h-(--switch-thumb-xs) peer-checked:translate-x-(--switch-translate-xs)",
        sm: "w-(--switch-thumb-sm) h-(--switch-thumb-sm) peer-checked:translate-x-(--switch-translate-sm)",
        md: "w-(--switch-thumb-md) h-(--switch-thumb-md) peer-checked:translate-x-(--switch-translate-md)",
        lg: "w-(--switch-thumb-lg) h-(--switch-thumb-lg) peer-checked:translate-x-(--switch-translate-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Loader size classes based on switch size
 */
const loaderSizeClasses: Record<SwitchSize, string> = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
};

/**
 * Thumb icon size classes based on switch size
 */
const thumbIconSizeClasses: Record<SwitchSize, string> = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
};

/**
 * Track content size classes
 */
const trackContentSizeClasses: Record<SwitchSize, string> = {
  xs: "text-[7px] px-0.5",
  sm: "text-[8px] px-1",
  md: "text-[9px] px-1",
  lg: "text-[10px] px-1.5",
};

/** Thumb size in px for auto-width calculation */
const thumbSizePx: Record<SwitchSize, number> = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
};

/** Track height classes (without width, for auto-width mode) */
const trackHeightClasses: Record<SwitchSize, string> = {
  xs: "h-(--switch-height-xs)",
  sm: "h-(--switch-height-sm)",
  md: "h-(--switch-height-md)",
  lg: "h-(--switch-height-lg)",
};

/** Thumb size classes (without translate, for auto-width mode) */
const thumbSizeOnlyClasses: Record<SwitchSize, string> = {
  xs: "w-(--switch-thumb-xs) h-(--switch-thumb-xs)",
  sm: "w-(--switch-thumb-sm) h-(--switch-thumb-sm)",
  md: "w-(--switch-thumb-md) h-(--switch-thumb-md)",
  lg: "w-(--switch-thumb-lg) h-(--switch-thumb-lg)",
};

/** Font classes for auto-width sizing (no padding) */
const trackContentFontClasses: Record<SwitchSize, string> = {
  xs: "text-[7px]",
  sm: "text-[8px]",
  md: "text-[9px]",
  lg: "text-[10px]",
};

/** Content padding per side in px (matches trackContentSizeClasses) */
const contentPadPx: Record<SwitchSize, number> = {
  xs: 2,
  sm: 4,
  md: 4,
  lg: 6,
};

const Switch = React.memo<SwitchProps>(
  ({
    color = "primary",
    size = "md",
    label,
    labelPosition = "right",
    helperText,
    error,
    loading = false,
    thumbIcon,
    startContent,
    endContent,
    required,
    labelClassName,
    className,
    classNames,
    disabled,
    checked,
    defaultChecked,
    ref,
    ...props
  }) => {
    const id = useId();
    const inputId = props.id || id;
    const helperId = `switch-helper-${id}`;
    const hasHelperText = !!(helperText || error);

    // Handle uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked ?? false,
    );
    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalChecked(e.target.checked);
        }
        props.onChange?.(e);
      },
      [isControlled, props.onChange],
    );

    const isDisabled = disabled || loading;
    const hasInnerText = !!(startContent || endContent);

    const switchElement = (
      <span
        data-slot="root"
        className={cn(
          "relative inline-flex items-center",
          "switch_root",
          classNames?.root,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          role="switch"
          aria-checked={currentChecked}
          aria-invalid={!!error || undefined}
          aria-describedby={hasHelperText ? helperId : undefined}
          required={required}
          {...props}
          id={inputId}
          disabled={isDisabled}
          checked={currentChecked}
          onChange={handleChange}
        />
        <span
          className={cn(
            hasInnerText
              ? cn(
                  "relative inline-flex rounded-full cursor-pointer transition-colors",
                  "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                  trackHeightClasses[size],
                  colorVars[color],
                  "bg-border peer-checked:bg-slot peer-focus-visible:ring-slot",
                  error &&
                    "bg-error/30 peer-checked:bg-error peer-focus-visible:ring-error",
                )
              : cn(switchTrackVariants({ color, size, hasError: !!error }), "bg-border peer-checked:bg-slot peer-focus-visible:ring-slot"),
            "switch_track",
            classNames?.track,
            className,
          )}
        >
          {/* Auto-width sizing grid (invisible, determines track width) */}
          {hasInnerText && (
            <span className="inline-grid" aria-hidden="true">
              {startContent != null && (
                <span
                  className={cn(
                    "col-start-1 row-start-1 invisible whitespace-nowrap font-medium",
                    trackContentFontClasses[size],
                  )}
                  style={{
                    paddingLeft:
                      thumbSizePx[size] + 4 + contentPadPx[size],
                    paddingRight: contentPadPx[size] + 2,
                  }}
                >
                  {startContent}
                </span>
              )}
              {endContent != null && (
                <span
                  className={cn(
                    "col-start-1 row-start-1 invisible whitespace-nowrap font-medium",
                    trackContentFontClasses[size],
                  )}
                  style={{
                    paddingLeft: contentPadPx[size] + 2,
                    paddingRight:
                      thumbSizePx[size] + 4 + contentPadPx[size],
                  }}
                >
                  {endContent}
                </span>
              )}
            </span>
          )}
          {/* Track content - start (visible when unchecked) */}
          {startContent && (
            <span
              className={cn(
                "absolute right-0.5 top-1/2 -translate-y-1/2 text-background font-medium transition-opacity",
                trackContentSizeClasses[size],
                currentChecked ? "opacity-0" : "opacity-100",
              )}
            >
              {startContent}
            </span>
          )}
          {/* Track content - end (visible when checked) */}
          {endContent && (
            <span
              className={cn(
                "absolute left-0.5 top-1/2 -translate-y-1/2 text-background font-medium transition-opacity",
                trackContentSizeClasses[size],
                currentChecked ? "opacity-100" : "opacity-0",
              )}
            >
              {endContent}
            </span>
          )}
        </span>

        {/* Thumb */}
        <span
          className={cn(
            hasInnerText
              ? cn(
                  "absolute top-0.5 bg-background rounded-full shadow-sm transition-[left] duration-200 ease-in-out flex items-center justify-center",
                  thumbSizeOnlyClasses[size],
                )
              : switchThumbVariants({ size }),
            "switch_thumb",
            classNames?.thumb,
          )}
          style={
            hasInnerText
              ? {
                  left: currentChecked
                    ? `calc(100% - ${thumbSizePx[size] + 2}px)`
                    : "2px",
                }
              : undefined
          }
        >
          {loading ? (
            <Loader2
              className={cn(
                "animate-spin text-text-secondary",
                loaderSizeClasses[size],
              )}
            />
          ) : thumbIcon ? (
            <span
              className={cn(
                "flex items-center justify-center text-text-secondary",
                thumbIconSizeClasses[size],
              )}
            >
              {thumbIcon}
            </span>
          ) : null}
        </span>
      </span>
    );

    // Switch with label and/or helper/error text
    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-center gap-2",
            !isDisabled && "cursor-pointer",
            labelPosition === "left" && "flex-row-reverse",
          )}
        >
          {switchElement}
          {label && (
            <span
              className={cn(
                "text-sm text-text-primary select-none",
                error && "text-error",
                isDisabled && "opacity-50",
                "switch_label",
                classNames?.label,
                labelClassName,
              )}
            >
              {label}
              {required && (
                <span className="text-error ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </span>
          )}
        </label>
        {(helperText || error) && (
          <p
            id={helperId}
            className={cn(
              "mt-1 text-xs",
              labelPosition === "left" ? "text-right" : "text-left",
              error ? "text-error" : "text-text-secondary",
              "switch_description",
              classNames?.description,
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export type * from "./types";
export default Switch;
