"use client";

import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import React, { useId, useMemo } from "react";

import Spinner from "../spinner";

import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from "../utils";
import type { FloatInputProps } from "./types";

const floatInputVariants = cva(
  "peer w-full placeholder:text-transparent rounded-md disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface read-only:cursor-default outline-none text-text-primary transition-[border-color] duration-200 border border-border focus-visible:border-primary bg-background",
  {
    variants: {
      status: {
        default: "",
        error: "border-error focus-visible:border-error",
        warning: "border-warning focus-visible:border-warning",
        info: "border-info focus-visible:border-info",
        success: "border-success focus-visible:border-success",
      },
      size: {
        xs: "h-9 pt-3.5 px-2 text-xs",
        sm: "h-10 pt-4 px-3 text-sm",
        md: "h-12 pt-5 px-3 text-base",
        lg: "h-14 pt-5 px-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "max-w-full",
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
      fullWidth: true,
    },
  },
);

const floatLabelVariants = cva(
  "absolute pointer-events-none transition-[top,font-size,color] duration-200 text-text-secondary origin-left",
  {
    variants: {
      size: {
        xs: "left-2 text-xs top-2.5 peer-focus:top-1 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px]",
        sm: "left-3 text-sm top-2.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]",
        md: "left-3 text-base top-3 peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs",
        lg: "left-4 text-lg top-3.5 peer-focus:top-2.5 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs",
      },
      status: {
        default: "",
        error: "peer-focus:text-error",
        warning: "peer-focus:text-warning",
        info: "peer-focus:text-info",
        success: "peer-focus:text-success",
      },
      hasLeftIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        hasLeftIcon: true,
        className: "left-8",
      },
      {
        size: "sm",
        hasLeftIcon: true,
        className: "left-10",
      },
      {
        size: "md",
        hasLeftIcon: true,
        className: "left-10",
      },
      {
        size: "lg",
        hasLeftIcon: true,
        className: "left-10",
      },
    ],
    defaultVariants: {
      size: "md",
      status: "default",
      hasLeftIcon: false,
    },
  },
);

const FloatInput = React.memo<FloatInputProps>(
  ({
    size = "md",
    label,
    error,
    warning,
    info,
    success,
    helperText,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    loading = false,
    fullWidth = true,
    className,
    classNames,
    value,
    onChange,
    ref,
    ...props
  }) => {
    const [internalValue, setInternalValue] = React.useState(props.defaultValue ?? '');
    const currentValue = value !== undefined ? value : internalValue;

    const uniqueId = useId();
    const inputId = props.id || `float-input-${uniqueId}`;
    const helperId = `float-input-helper-${uniqueId}`;
    const loadingId = `float-input-loading-${uniqueId}`;
    const labelId = `float-input-label-${uniqueId}`;

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
      if (value === undefined) setInternalValue('');
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

    // Memoize expensive className computations
    const rootClass = useMemo(
      () =>
        cn(
          "float-input_root",
          "w-full flex flex-col relative",
          !fullWidth && "inline-block",
          classNames?.root,
        ),
      [fullWidth, classNames?.root],
    );

    const wrapperClass = useMemo(
      () =>
        cn(
          "float-input_wrapper",
          "relative w-full",
          loading && "opacity-50 cursor-not-allowed",
          classNames?.wrapper,
        ),
      [loading, classNames?.wrapper],
    );

    const leftIconClass = useMemo(() => {
      const sizeClasses = {
        xs: "left-2",
        sm: "left-3",
        md: "left-3",
        lg: "left-4",
      };
      return cn(
        "float-input_leftIcon",
        "absolute flex items-center h-full top-0 text-text-secondary",
        sizeClasses[size],
        classNames?.leftIcon,
      );
    }, [size, classNames?.leftIcon]);

    const inputClass = useMemo(() => {
      const leftPadding = leftIcon
        ? {
            xs: "pl-8",
            sm: "pl-10",
            md: "pl-10",
            lg: "pl-11",
          }[size]
        : "";

      const rightPadding = hasRightIcon
        ? {
            xs: "pr-8",
            sm: "pr-8",
            md: "pr-8",
            lg: "pr-10",
          }[size]
        : "";

      return cn(
        "float-input_input",
        floatInputVariants({ status, size, fullWidth }),
        leftPadding,
        rightPadding,
        className,
        classNames?.input,
      );
    }, [
      status,
      size,
      fullWidth,
      leftIcon,
      hasRightIcon,
      className,
      classNames?.input,
    ]);

    const labelClass = useMemo(
      () =>
        cn(
          "float-input_label",
          floatLabelVariants({ size, status, hasLeftIcon: !!leftIcon }),
          classNames?.label,
        ),
      [size, status, leftIcon, classNames?.label],
    );

    const rightIconClass = useMemo(() => {
      const sizeClasses = {
        xs: "right-2",
        sm: "right-3",
        md: "right-3",
        lg: "right-4",
      };
      return cn(
        "float-input_rightIcon",
        "absolute flex gap-2 items-center h-full top-0 text-text-secondary",
        sizeClasses[size],
        classNames?.rightIcon,
      );
    }, [size, classNames?.rightIcon]);

    const clearButtonClass = useMemo(
      () =>
        cn(
          "float-input_clearButton",
          "flex items-center h-full top-0 text-text-secondary hover:text-text-primary transition-colors",
          classNames?.clearButton,
        ),
      [classNames?.clearButton],
    );

    const helperClass = useMemo(
      () =>
        cn(
          "float-input_helper",
          statusMessageVariants({ status }),
          "mt-0.5",
          status === "error" ? classNames?.error : classNames?.helper,
        ),
      [status, classNames?.error, classNames?.helper],
    );

    const iconSize = iconSizes[size];

    return (
      <div data-slot="root" className={rootClass}>
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
            placeholder=" "
            aria-invalid={status === "error"}
            aria-busy={loading}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={labelId}
            {...props}
          />
          <label
            id={labelId}
            htmlFor={inputId}
            data-slot="label"
            className={labelClass}
          >
            {label}
            {props.required && <span className="text-error ml-0.5">*</span>}
          </label>
          {(hasRightIcon || rightIcon) && (
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
                  <Spinner aria-hidden="true" size={size} />
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
        {helperMessage && (
          <p id={helperId} data-slot="helper" className={helperClass}>
            {helperMessage}
          </p>
        )}
      </div>
    );
  },
);

FloatInput.displayName = "FloatInput";

export type * from "./types";
export default FloatInput;
