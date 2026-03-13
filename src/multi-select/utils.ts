import { cva } from "class-variance-authority";

export const multiSelectTriggerVariants = cva(
  "w-full flex items-center justify-between rounded-md bg-background text-text-primary border focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer gap-1",
  {
    variants: {
      status: {
        default: "border-border",
        error: "border-error",
        warning: "border-warning",
        info: "border-info",
        success: "border-success",
      },
      size: {
        xs: "h-(--select-height-xs) px-(--select-padding-x-xs) text-xs",
        sm: "h-(--select-height-sm) px-(--select-padding-x-sm) text-sm",
        md: "h-(--select-height-md) px-(--select-padding-x-md) text-base",
        lg: "h-(--select-height-lg) px-(--select-padding-x-lg) text-lg",
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

export const multiSelectDropdownVariants = cva(
  "absolute z-[var(--z-dropdown)] mt-1 overflow-auto rounded-md border border-border bg-background",
);

export const multiSelectOptionVariants = cva(
  "relative cursor-pointer select-none px-3 py-2 text-text-primary rounded-sm",
  {
    variants: {
      selected: {
        true: "bg-slot-10 text-slot font-medium",
        false: "hover:bg-surface",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
);

export const multiSelectGroupVariants = cva(
  "px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider bg-surface",
);
