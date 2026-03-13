"use client";

import { cva } from "class-variance-authority";
import React, { useId } from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { RadioProps } from "./types";

const radioVariants = cva(
  "appearance-none rounded-full border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      color: colorVars,
      size: {
        xs: "w-(--checkbox-size-xs) h-(--checkbox-size-xs)",
        sm: "w-(--checkbox-size-sm) h-(--checkbox-size-sm)",
        md: "w-(--checkbox-size-md) h-(--checkbox-size-md)",
        lg: "w-(--checkbox-size-lg) h-(--checkbox-size-lg)",
      },
      error: {
        true: "border-error checked:border-error",
        false: "",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
);

const Radio = React.memo<RadioProps>(
  ({
    color = "primary",
    size = "md",
    label,
    helperText,
    error,
    className,
    ref,
    classNames,
    ...props
  }) => {
    const uniqueId = useId();
    const radioId = props.id || `radio-${uniqueId}`;
    const helperId = `radio-helper-${uniqueId}`;
    const hasHelperText = !!(helperText || error);

    const radioElement = (
      <input
        ref={ref}
        type="radio"
        className={cn(
          "radio_radio",
          radioVariants({ color, size, error: !!error }),
          "border-slot-30 checked:border-slot checked:shadow-[inset_0_0_0_2px_var(--color-background),inset_0_0_0_13px_var(--_c)]",
          "focus-visible:ring-slot",
          className,
          classNames?.radio,
        )}
        aria-invalid={!!error || undefined}
        aria-describedby={hasHelperText ? helperId : undefined}
        {...props}
        id={radioId}
      />
    );

    return (
      <div data-slot="root" className={cn("radio_root", "w-full", classNames?.root)}>
        <label
          htmlFor={radioId}
          className={cn(
            "flex items-center gap-2",
            !props.disabled && "cursor-pointer",
          )}
        >
          {radioElement}
          {label && (
            <span
              className={cn(
                "radio_label",
                "text-sm text-text-primary select-none",
                error && "text-error",
                props.disabled && "opacity-50",
                classNames?.label,
              )}
            >
              {label}
            </span>
          )}
        </label>
        {(helperText || error) && (
          <p
            id={helperId}
            className={cn(
              "radio_description",
              "mt-1 ml-0 text-xs",
              error ? "text-error" : "text-text-secondary",
              classNames?.description,
            )}
          >
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";

export type * from "./types";
export default Radio;
