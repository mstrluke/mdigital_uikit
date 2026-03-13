"use client";

import React from "react";
import { cn, getValidationStatus, statusMessageVariants } from "../utils";
import type { DatePickerClassNames } from "./types";

interface PickerWrapperProps {
  label?: string;
  error?: string;
  warning?: string;
  info?: string;
  success?: string;
  helperText?: string;
  messagePosition?: "top" | "bottom";
  required?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  classNames?: DatePickerClassNames;
}

export const PickerWrapper = ({
  label,
  error,
  warning,
  info,
  success,
  helperText,
  messagePosition = "bottom",
  required = false,
  fullWidth = true,
  children,
  classNames,
}: PickerWrapperProps) => {
  const uniqueId = React.useId();
  const helperId = `picker-helper-${uniqueId}`;
  const { status, message: helperMessage } = getValidationStatus({
    error,
    warning,
    info,
    success,
    helperText,
  });

  return (
    <div
      className={cn(
        "w-full flex flex-col relative",
        !fullWidth && "inline-block",
      )}
    >
      <div className="flex gap-2 items-center relative">
        {label && (
          <label
            className={cn(
              "datePicker_label mb-0.5",
              "text-sm font-medium text-text-secondary",
              classNames?.label,
            )}
            data-slot="label"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        {helperMessage && messagePosition === "top" && (
          <p
            id={helperId}
            className={cn(
              "datePicker_helper mb-0.5",
              statusMessageVariants({ status }),
              classNames?.helper,
            )}
            data-slot="helper"
          >
            {helperMessage}
          </p>
        )}
      </div>
      {children}
      {helperMessage && messagePosition === "bottom" && (
        <p
          id={helperId}
          className={cn(
            "datePicker_helper",
            "mt-0.5",
            statusMessageVariants({ status }),
            classNames?.helper,
          )}
          data-slot="helper"
        >
          {helperMessage}
        </p>
      )}
    </div>
  );
};
