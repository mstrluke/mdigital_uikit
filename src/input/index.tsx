"use client";

import { cva } from "class-variance-authority";
import React, { useId, useMemo } from "react";

import { X } from "lucide-react";

import Spinner from "../spinner";

import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from "../utils";
import type { InputProps } from "./types";

const inputVariants = cva(
  "w-full placeholder:text-text-secondary/50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface read-only:cursor-default outline-none text-text-primary transition-colors",
  {
    variants: {
      variant: {
        outline: "bg-background border border-border focus:border-primary",
        filled: "bg-surface border border-transparent focus:border-primary",
      },
      status: {
        default: "",
        error: "border-error focus:border-error",
        warning: "border-warning focus:border-warning",
        info: "border-info focus:border-info",
        success: "border-success focus:border-success",
      },
      size: {
        xs: "h-(--input-height-xs) px-(--input-padding-x-xs) text-xs",
        sm: "h-(--input-height-sm) px-(--input-padding-x-sm) text-sm",
        md: "h-(--input-height-md) px-(--input-padding-x-md) text-base",
        lg: "h-(--input-height-lg) px-(--input-padding-x-lg) text-lg",
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
      fullWidth: true,
    },
  },
);

const Input = React.memo<InputProps>(
  ({
    variant = "outline",
    size = "md",
    label,
    error,
    warning,
    info,
    success,
    helperText,
    messagePosition = "bottom",
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    loading = false,
    maxLength,
    showCount = false,
    fullWidth = true,
    className,
    wrapperClassName,
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

    const uniqueId = useId();
    const inputId = props.id || `input-${uniqueId}`;
    const helperId = `input-helper-${uniqueId}`;
    const loadingId = `input-loading-${uniqueId}`;

    const { status, message: helperMessage } = useMemo(
      () => getValidationStatus({ error, warning, info, success, helperText }),
      [error, warning, info, success, helperText],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) setInternalValue(e.target.value);
        onChange?.(e);
      },
      [value, onChange],
    );

    const handleClear = React.useCallback(() => {
      if (value === undefined) setInternalValue("");

      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      onClear?.();
    }, [value, onChange, onClear]);

    const showClear =
      clearable && currentValue && !props.disabled && !props.readOnly;
    const hasRightIcon = rightIcon || showClear || loading;

    // Memoize aria-describedby to avoid array recreation on every render
    const ariaDescribedBy = useMemo(() => {
      const parts: string[] = [];
      if (helperMessage) parts.push(helperId);
      if (loading) parts.push(loadingId);
      return parts.length > 0 ? parts.join(" ") : undefined;
    }, [helperMessage, helperId, loading, loadingId]);

    const wrapperClass = cn(
      "input_wrapper",
      "relative w-full",
      wrapperClassName,
      loading && "opacity-50 cursor-not-allowed",
      classNames?.wrapper,
    );

    const leftIconOffset: Record<string, string> = {
      xs: "left-2",
      sm: "left-2.5",
      md: "left-3",
      lg: "left-3.5",
    };

    const leftIconClass = cn(
      "input_leftIcon",
      "absolute flex items-center h-full top-0 text-text-secondary pointer-events-none",
      leftIconOffset[size],
      classNames?.leftIcon,
    );

    const leftIconPadding: Record<string, string> = {
      xs: "pl-7",
      sm: "pl-8",
      md: "pl-10",
      lg: "pl-11",
    };

    const rightIconPadding: Record<string, string> = {
      xs: "pr-7",
      sm: "pr-8",
      md: "pr-9",
      lg: "pr-10",
    };

    const inputClass = cn(
      "input_input",
      inputVariants({ variant, status, size, fullWidth }),
      !!leftIcon && leftIconPadding[size],
      !!hasRightIcon && rightIconPadding[size],
      className,
      classNames?.input,
    );

    const rightIconOffset: Record<string, string> = {
      xs: "right-2",
      sm: "right-2.5",
      md: "right-3",
      lg: "right-3.5",
    };

    const rightIconClass = cn(
      "input_rightIcon",
      "absolute flex gap-1.5 items-center h-full top-0 text-text-secondary",
      rightIconOffset[size],
      classNames?.rightIcon,
    );

    const clearButtonClass = cn(
      "input_clearButton",
      "flex items-center h-full top-0 text-text-secondary hover:text-text-primary",
      classNames?.clearButton,
    );

    const rootClass = cn(
      "input_root",
      "w-full flex flex-col relative",
      !fullWidth && "inline-block",
      classNames?.root,
    );

    const labelClass = cn(
      "input_label mb-0.5",
      "text-sm font-medium text-text-secondary",
      classNames?.label,
    );

    const helperClass = cn(
      "input_helper mb-0.5",
      statusMessageVariants({ status }),
      status === "error" ? classNames?.error : classNames?.helper,
    );

    const helperBottomClass = cn(
      "input_helper",
      statusMessageVariants({ status }),
      "mt-0.5",
      status === "error" ? classNames?.error : classNames?.helper,
    );

    const iconSize = iconSizes[size];

    const inputElement = (
      <div data-slot="wrapper" className={wrapperClass}>
        {leftIcon && (
          <div
            data-slot="leftIcon"
            className={leftIconClass}
            aria-hidden="true"
          >
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          data-slot="input"
          className={inputClass}
          value={currentValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={status === "error"}
          aria-busy={loading}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        {(rightIcon || showClear || loading) && (
          <div data-slot="rightIcon" className={rightIconClass}>
            {showClear && !loading && (
              <button
                type="button"
                onClick={handleClear}
                data-slot="clearButton"
                className={clearButtonClass}
                aria-label="Clear input"
              >
                <X className={iconSize} aria-hidden="true" />
              </button>
            )}
            {loading ? (
              <>
                <Spinner aria-hidden="true" />
                <span id={loadingId} className="sr-only">
                  Loading
                </span>
              </>
            ) : (
              rightIcon && <span aria-hidden="true">{rightIcon}</span>
            )}
          </div>
        )}
      </div>
    );

    return (
      <div data-slot="root" className={rootClass}>
        <div className="flex gap-2 items-center relative">
          {label && (
            <label htmlFor={inputId} data-slot="label" className={labelClass}>
              {label}
              {props.required && <span className="text-error ml-1">*</span>}
            </label>
          )}
          {helperMessage && messagePosition === "top" && (
            <p id={helperId} data-slot="helper" className={helperClass}>
              {helperMessage}
            </p>
          )}
          {showCount && maxLength && (
            <span className="text-xs text-text-secondary absolute right-0">
              {String(currentValue).length}/{maxLength}
            </span>
          )}
        </div>
        {inputElement}
        {helperMessage && messagePosition === "bottom" && (
          <p id={helperId} data-slot="helper" className={helperBottomClass}>
            {helperMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export type * from "./types";
export default Input;
