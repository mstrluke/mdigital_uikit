"use client";

import { cva } from "class-variance-authority";
import React, { useId, useMemo } from "react";

import { cn, getValidationStatus, statusMessageVariants } from "../utils";
import type { TextareaProps } from "./types";

const textareaVariants = cva(
  "w-full rounded-md focus:border-primary transition-colors text-text-primary placeholder:text-text-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface read-only:cursor-default outline-none",
  {
    variants: {
      variant: {
        outline: "bg-background border border-border",
        filled: "bg-surface border border-transparent",
      },
      status: {
        default: "",
        error: "border-error focus:border-error",
        warning: "border-warning focus:border-warning",
        info: "border-info focus:border-info",
        success: "border-success focus:border-success",
      },
      size: {
        xs: "min-h-(--textarea-min-height-xs) p-(--textarea-padding-xs) text-xs",
        sm: "min-h-(--textarea-min-height-sm) p-(--textarea-padding-sm) text-sm",
        md: "min-h-(--textarea-min-height-md) p-(--textarea-padding-md) text-base",
        lg: "min-h-(--textarea-min-height-lg) p-(--textarea-padding-lg) text-lg",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      fullWidth: {
        true: "w-full",
        false: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      status: "default",
      size: "md",
      resize: "vertical",
      fullWidth: true,
    },
  },
);

const Textarea = React.memo<TextareaProps>(
  ({
    variant = "outline",
    size = "md",
    label,
    helperText,
    messagePosition = "bottom",
    error,
    warning,
    info,
    success,
    resize = "vertical",
    showCount = false,
    maxLength,
    autoResize = false,
    fullWidth = true,
    className,
    classNames,
    value,
    onChange,
    ref,
    ...props
  }) => {
    const [internalValue, setInternalValue] = React.useState(
      props.defaultValue ?? "",
    );
    const currentValue = value !== undefined ? value : internalValue;
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    const currentLength = String(currentValue).length;

    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref],
    );

    // Generate unique IDs for accessibility
    const uniqueId = useId();
    const textareaId = props.id || `textarea-${uniqueId}`;
    const helperId = `textarea-helper-${uniqueId}`;

    const { status, message: helperMessage } = useMemo(
      () =>
        getValidationStatus({
          error,
          warning,
          info,
          success,
          helperText,
        }),
      [error, warning, info, success, helperText],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (value === undefined) setInternalValue(e.target.value);
        onChange?.(e);
      },
      [value, onChange],
    );

    React.useEffect(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [currentValue, autoResize]);

    const textareaElement = (
      <textarea
        ref={mergedRef}
        id={textareaId}
        className={cn(
          "textarea_textarea",
          textareaVariants({
            variant,
            status,
            size,
            resize: autoResize ? "none" : resize,
            fullWidth,
          }),
          autoResize && "overflow-hidden",
          className,
          classNames?.textarea,
        )}
        maxLength={maxLength}
        value={currentValue}
        onChange={handleChange}
        aria-invalid={status === "error"}
        aria-describedby={helperMessage ? helperId : undefined}
        {...props}
      />
    );

    return (
      <div
        data-slot="root"
        className={cn(
          "textarea_root",
          "w-full flex flex-col relative",
          !fullWidth && "inline-block",
          classNames?.root,
        )}
      >
        <div
          className={cn(
            "textarea_wrapper",
            "flex gap-2 items-center relative",
            classNames?.wrapper,
          )}
        >
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                "textarea_label mb-0.5",
                "text-sm font-medium text-text-secondary",
                classNames?.label,
              )}
            >
              {label}
              {props.required && (
                <span
                  className={cn(
                    "textarea_error",
                    "text-error ml-1",
                    classNames?.error,
                  )}
                >
                  *
                </span>
              )}
            </label>
          )}
          {helperMessage && messagePosition === "top" && (
            <p
              id={helperId}
              className={cn(
                "textarea_helper mb-0.5",
                statusMessageVariants({ status }),
                classNames?.helper,
              )}
            >
              {helperMessage}
            </p>
          )}
          {showCount && maxLength && (
            <span
              className={cn(
                "textarea_counter mb-0.5",
                "text-xs text-text-secondary absolute right-0",
                classNames?.counter,
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        {textareaElement}
        {helperMessage && messagePosition === "bottom" && (
          <p
            id={helperId}
            className={cn(
              "textarea_helper",
              statusMessageVariants({ status }),
              "mt-0.5",
              classNames?.helper,
            )}
          >
            {helperMessage}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export type * from "./types";
export default Textarea;
