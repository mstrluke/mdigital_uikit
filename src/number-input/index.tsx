"use client";

import { cva } from "class-variance-authority";
import { Plus, Minus } from "lucide-react";
import React, { useId, useMemo, useCallback } from "react";
import { useControllable } from '../hooks/useControllable'

import { useRipple, RippleContainer } from "../hooks/useRipple";
import Spinner from "../spinner";

import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from "../utils";
import type { NumberInputProps } from "./types";

const numberInputVariants = cva(
  "w-full placeholder:text-text-secondary/50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface read-only:cursor-default outline-none text-text-primary transition-colors",
  {
    variants: {
      status: {
        default: "bg-background border border-border focus:border-primary",
        error: "bg-background border border-error focus:border-error",
        warning: "bg-background border border-warning focus:border-warning",
        info: "bg-background border border-info focus:border-info",
        success: "bg-background border border-success focus:border-success",
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
      controlsPosition: {
        right: "",
        sides: "",
      },
    },
    defaultVariants: {
      status: "default",
      size: "md",
      fullWidth: true,
      controlsPosition: "right",
    },
  },
);

const controlButtonVariants = cva(
  "flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-7 h-7",
        md: "w-8 h-8",
        lg: "w-10 h-10",
      },
      position: {
        right: "hover:bg-surface-hover",
        sides: "hover:bg-surface-hover",
      },
    },
    defaultVariants: {
      size: "md",
      position: "right",
    },
  },
);

const ControlButton = React.memo<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }>(({ children, disabled, className, ...props }) => {
  const { ripples, onPointerDown, onKeyDown, onAnimationEnd } = useRipple(!disabled)
  return (
    <button className={cn(className, 'relative overflow-hidden')} onPointerDown={onPointerDown} onKeyDown={onKeyDown} disabled={disabled} {...props}>
      {children}
      <RippleContainer ripples={ripples} onAnimationEnd={onAnimationEnd} />
    </button>
  )
});

const NumberInput = React.memo<NumberInputProps>(
  ({
    value,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    precision,
    size = "md",
    label,
    placeholder,
    disabled = false,
    readOnly = false,
    required = false,
    controls = true,
    controlsPosition = "right",
    clampOnBlur = true,
    className,
    classNames,
    error,
    warning,
    info,
    success,
    helperText,
    loading = false,
    fullWidth = true,
    ref,
    id,
    name,
  }) => {
    const [currentValue, setCurrentValue] = useControllable<number | undefined>({ value, defaultValue, onChange });

    const uniqueId = useId();
    const inputId = id || `number-input-${uniqueId}`;
    const helperId = `number-input-helper-${uniqueId}`;

    // Use shared validation status utility - memoized
    const { status, message: helperMessage } = useMemo(
      () => getValidationStatus({ error, warning, info, success, helperText }),
      [error, warning, info, success, helperText],
    );

    // Format number to precision
    const formatValue = useCallback(
      (val: number | undefined): string => {
        if (val === undefined || isNaN(val)) return "";
        if (precision !== undefined) {
          return val.toFixed(precision);
        }
        return String(val);
      },
      [precision],
    );

    // Parse string to number
    const parseValue = useCallback((str: string): number | undefined => {
      if (str === "" || str === "-") return undefined;
      const parsed = parseFloat(str);
      return isNaN(parsed) ? undefined : parsed;
    }, []);

    // Clamp value to min/max
    const clampValue = useCallback(
      (val: number | undefined): number | undefined => {
        if (val === undefined) return undefined;
        let clamped = val;
        if (min !== undefined && clamped < min) clamped = min;
        if (max !== undefined && clamped > max) clamped = max;
        return clamped;
      },
      [min, max],
    );

    // Update value
    const updateValue = useCallback(
      (newValue: number | undefined) => {
        setCurrentValue(newValue);
      },
      [setCurrentValue],
    );

    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow empty, minus sign, and valid numbers
        if (inputValue === "" || inputValue === "-") {
          updateValue(undefined);
          return;
        }

        const parsed = parseValue(inputValue);
        if (parsed === undefined) return  // reject invalid input
        updateValue(parsed);
      },
      [parseValue, updateValue],
    );

    // Handle blur - clamp if needed
    const handleBlur = useCallback(() => {
      if (clampOnBlur && currentValue !== undefined) {
        const clamped = clampValue(currentValue);
        if (clamped !== currentValue) {
          updateValue(clamped);
        }
      }
    }, [clampOnBlur, currentValue, clampValue, updateValue]);

    // Round to avoid floating-point accumulation (0.1 + 0.1 + 0.1 ≠ 0.3)
    const roundStep = useCallback(
      (val: number): number => {
        // Determine decimal places from step (e.g. step=0.1 → 1 decimal)
        const stepStr = String(step)
        const decimals = stepStr.includes('.') ? stepStr.split('.')[1]!.length : 0
        const p = precision !== undefined ? Math.max(precision, decimals) : decimals
        if (p === 0) return val
        const factor = Math.pow(10, p)
        return Math.round(val * factor) / factor
      },
      [step, precision],
    )

    // Increment value
    const handleIncrement = useCallback(() => {
      const newValue = roundStep((currentValue ?? 0) + step);
      const clamped = clampValue(newValue);
      updateValue(clamped);
    }, [currentValue, step, clampValue, updateValue, roundStep]);

    // Decrement value
    const handleDecrement = useCallback(() => {
      const newValue = roundStep((currentValue ?? 0) - step);
      const clamped = clampValue(newValue);
      updateValue(clamped);
    }, [currentValue, step, clampValue, updateValue, roundStep]);

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (readOnly || disabled) return;

        if (e.key === "ArrowUp") {
          e.preventDefault();
          handleIncrement();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          handleDecrement();
        }
      },
      [readOnly, disabled, handleIncrement, handleDecrement],
    );

    // Check if buttons should be disabled
    const isIncrementDisabled = useMemo(() => {
      if (disabled || readOnly || loading) return true;
      if (
        max !== undefined &&
        currentValue !== undefined &&
        currentValue >= max
      )
        return true;
      return false;
    }, [disabled, readOnly, loading, max, currentValue]);

    const isDecrementDisabled = useMemo(() => {
      if (disabled || readOnly || loading) return true;
      if (
        min !== undefined &&
        currentValue !== undefined &&
        currentValue <= min
      )
        return true;
      return false;
    }, [disabled, readOnly, loading, min, currentValue]);

    // Memoize aria-describedby
    const ariaDescribedBy = useMemo(() => {
      return helperMessage ? helperId : undefined;
    }, [helperMessage, helperId]);

    // Memoized className computations
    const rootClass = useMemo(
      () =>
        cn(
          "number-input_root",
          "w-full flex flex-col relative",
          !fullWidth && "inline-block",
          classNames?.root,
        ),
      [fullWidth, classNames?.root],
    );

    const labelClass = useMemo(
      () =>
        cn(
          "number-input_label",
          "text-sm font-medium text-text-secondary mb-0.5",
          classNames?.label,
        ),
      [classNames?.label],
    );

    const wrapperClass = useMemo(
      () =>
        cn(
          "number-input_wrapper",
          "relative flex items-center",
          loading && "opacity-50 cursor-not-allowed",
          controlsPosition === "sides" && "gap-1",
          classNames?.wrapper,
        ),
      [loading, controlsPosition, classNames?.wrapper],
    );

    const inputClass = useMemo(
      () =>
        cn(
          "number-input_input",
          numberInputVariants({ status, size, fullWidth, controlsPosition }),
          controls && controlsPosition === "right" && "pr-16",
          controls && controlsPosition === "sides" && "text-center",
          className,
          classNames?.input,
        ),
      [
        status,
        size,
        fullWidth,
        controlsPosition,
        controls,
        className,
        classNames?.input,
      ],
    );

    const statusBorderColor: Record<string, string> = {
      default: "border-border",
      error: "border-error",
      warning: "border-warning",
      info: "border-info",
      success: "border-success",
    };

    const controlsClass = useMemo(
      () =>
        cn(
          "number-input_controls",
          "flex",
          controlsPosition === "right" &&
            `absolute right-0 top-0 h-full border-l ${statusBorderColor[status] || "border-border"}`,
          controlsPosition === "sides" && "gap-1",
          classNames?.controls,
        ),
      [controlsPosition, classNames?.controls, status],
    );

    const helperClass = useMemo(
      () =>
        cn(
          "number-input_helper",
          statusMessageVariants({ status }),
          "mt-0.5",
          status === "error" ? classNames?.error : classNames?.helper,
        ),
      [status, classNames?.error, classNames?.helper],
    );

    const iconSize = iconSizes[size];

    const incrementButton = (
      <ControlButton
        type="button"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        data-slot="increment"
        className={cn(
          "number-input_increment h-full!",
          controlButtonVariants({ size, position: controlsPosition }),
          controlsPosition === "right" && "",
          classNames?.increment,
        )}
        aria-label="Increment value"
        tabIndex={-1}
      >
        <Plus className={iconSize} aria-hidden="true" />
      </ControlButton>
    );

    const decrementButton = (
      <ControlButton
        type="button"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        data-slot="decrement"
        className={cn(
          "number-input_decrement h-full!",
          controlButtonVariants({ size, position: controlsPosition }),
          controlsPosition === "right" && `border-r ${statusBorderColor[status] || "border-border"}`,
          classNames?.decrement,
        )}
        aria-label="Decrement value"
        tabIndex={-1}
      >
        <Minus className={iconSize} aria-hidden="true" />
      </ControlButton>
    );

    const inputElement = (
      <div data-slot="wrapper" className={wrapperClass}>
        {controls && controlsPosition === "sides" && decrementButton}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          inputMode="decimal"
          data-slot="input"
          className={inputClass}
          value={formatValue(currentValue)}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={status === "error"}
          aria-describedby={ariaDescribedBy}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />
        {controls && controlsPosition === "right" && (
          <div data-slot="controls" className={controlsClass}>
            <div className="flex flex-row h-full">
              {decrementButton}
              {incrementButton}
            </div>
          </div>
        )}
        {controls && controlsPosition === "sides" && incrementButton}
        {loading && (
          <div className="absolute right-3 flex items-center">
            <Spinner aria-hidden="true" />
          </div>
        )}
      </div>
    );

    return (
      <div data-slot="root" className={rootClass}>
        {label && (
          <label htmlFor={inputId} data-slot="label" className={labelClass}>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        {inputElement}
        {helperMessage && (
          <p id={helperId} data-slot="helper" className={helperClass}>
            {helperMessage}
          </p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export type * from "./types";
export default NumberInput;
