"use client";

import { cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import React, { useState, useCallback, useEffect, useId } from "react";

import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { CheckboxProps } from "./types";

function useMergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  const refsRef = React.useRef(refs);
  refsRef.current = refs;

  return useCallback((instance: T | null) => {
    refsRef.current.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  }, []);
}

const checkboxVariants = cva(
  "appearance-none rounded border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        solid:
          "bg-background border-slot-30 checked:bg-slot checked:border-slot indeterminate:bg-slot indeterminate:border-slot",
        outline:
          "bg-background border-slot-30 checked:border-slot indeterminate:border-slot",
        soft:
          "bg-background border-slot-30 checked:bg-slot-10 checked:border-slot indeterminate:bg-slot-10 indeterminate:border-slot",
      },
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
      variant: "solid",
      color: "primary",
      size: "md",
    },
  },
);

const indicatorColors = {
  solid: "text-slot-fg",
  outline: "text-slot",
  soft: "text-slot",
} as const;

const Checkbox = React.memo<CheckboxProps>(
  ({
    variant = "solid",
    color = "primary",
    size = "md",
    label,
    helperText,
    error,
    indeterminate = false,
    className,
    checked,
    defaultChecked,
    ref,
    classNames,
    ...props
  }) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const internalRef = React.useRef<HTMLInputElement>(null);

    const uniqueId = useId();
    const checkboxId = props.id || `checkbox-${uniqueId}`;
    const helperId = `checkbox-helper-${uniqueId}`;
    const hasHelperText = !!(helperText || error);

    const mergedRef = useMergeRefs(ref, internalRef);

    const onChangeRef = React.useRef(props.onChange);
    onChangeRef.current = props.onChange;

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalChecked(event.target.checked);
        }
        onChangeRef.current?.(event);
      },
      [isControlled],
    );

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const checkboxElement = (
      <span className={cn("relative inline-flex", colorVars[color])} data-slot="wrapper">
        <input
          ref={mergedRef}
          type="checkbox"
          className={cn(
            "checkbox_checkbox",
            checkboxVariants({ variant, color, size, error: !!error }),
            "focus-visible:ring-slot",
            className,
            classNames?.checkbox,
          )}
          aria-checked={indeterminate ? "mixed" : isChecked}
          aria-invalid={!!error || undefined}
          aria-describedby={hasHelperText ? helperId : undefined}
          {...props}
          id={checkboxId}
          onChange={onChange}
          checked={isChecked}
          data-slot="checkbox"
        />
        {(isChecked || indeterminate) && (
          <span
            className={cn(
              "checkbox_indicator",
              "absolute inset-0 flex items-center justify-center pointer-events-none",
              classNames?.indicator,
            )}
            data-slot="indicator"
          >
            {indeterminate ? (
              <Minus
                className={cn(iconSizes[size], indicatorColors[variant])}
                strokeWidth={3}
              />
            ) : (
              <Check className={cn(iconSizes[size], indicatorColors[variant])} />
            )}
          </span>
        )}
      </span>
    );

    return (
      <div
        className={cn("checkbox_root", label && "w-full", classNames?.root)}
        data-slot="root"
      >
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex items-center gap-2",
            !props.disabled && "cursor-pointer",
          )}
        >
          {checkboxElement}
          {label && (
            <span
              className={cn(
                "checkbox_label",
                "text-sm text-text-primary select-none",
                error && "text-error",
                props.disabled && "opacity-50",
                classNames?.label,
              )}
              data-slot="label"
            >
              {label}
            </span>
          )}
        </label>
        {(helperText || error) && (
          <p
            id={helperId}
            className={cn(
              "checkbox_description",
              "mt-1 ml-0 text-xs",
              error ? "text-error" : "text-text-secondary",
              classNames?.description,
            )}
            data-slot="description"
          >
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export type * from "./types";
export default Checkbox;
