'use client'

import { cva } from "class-variance-authority";
import React, { memo } from "react";

import { cn } from "../utils";
import type {
  InputGroupAddonProps,
  InputGroupClassNames,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupSize,
} from "./types";

const inputGroupVariants = cva(
  "relative flex items-center w-full bg-background border border-border rounded-md transition-colors focus-within:border-primary",
  {
    variants: {
      size: {
        xs: "h-(--input-height-xs)",
        sm: "h-(--input-height-sm)",
        md: "h-(--input-height-md)",
        lg: "h-(--input-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const inputGroupInputVariants = cva(
  "flex-1 w-full h-full bg-transparent outline-none text-text-primary placeholder:text-text-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed read-only:cursor-default",
  {
    variants: {
      size: {
        xs: "px-(--input-padding-x-xs) text-xs",
        sm: "px-(--input-padding-x-sm) text-sm",
        md: "px-(--input-padding-x-md) text-base",
        lg: "px-(--input-padding-x-lg) text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const inputGroupAddonVariants = cva(
  "flex items-center gap-2 text-text-secondary shrink-0",
  {
    variants: {
      size: {
        xs: "last:pr-2 pl-2 text-xs",
        sm: "last:pr-2.5 pl-2.5 text-sm",
        md: "last:pr-3 pl-3 text-base",
        lg: "last:pr-4 pl-4 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const InputGroup = memo<InputGroupProps>(
  ({ children, size = "md", className, classNames, 'aria-label': ariaLabel }) => {
    return (
      <div
        data-slot="inputGroup_root"
        className={cn(
          "inputGroup_root",
          inputGroupVariants({ size }),
          classNames?.root,
          className,
        )}
        aria-label={ariaLabel}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const displayName = (child.type as { displayName?: string })
              ?.displayName;
            if (
              displayName === "InputGroupInput" ||
              displayName === "InputGroupAddon"
            ) {
              return React.cloneElement(
                child as React.ReactElement<{
                  size?: InputGroupSize;
                  classNames?: InputGroupClassNames;
                }>,
                { size, classNames },
              );
            }
          }
          return child;
        })}
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

export const InputGroupInput = memo<InputGroupInputProps>(
  ({ className, size = "md", classNames, ref, ...props }) => {
    return (
      <input
        ref={ref}
        data-slot="inputGroup_input"
        className={cn(
          "inputGroup_input",
          inputGroupInputVariants({ size }),
          classNames?.input,
          className,
        )}
        {...props}
      />
    );
  },
);

InputGroupInput.displayName = "InputGroupInput";

export const InputGroupAddon = memo<InputGroupAddonProps>(
  ({ children, size = "md", className, classNames }) => {
    return (
      <div
        data-slot="inputGroup_addon"
        className={cn(
          "inputGroup_addon",
          inputGroupAddonVariants({ size }),
          classNames?.addon,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

InputGroupAddon.displayName = "InputGroupAddon";

export type { InputGroupClassNames } from "./types";
export type * from "./types";
export default InputGroup;
