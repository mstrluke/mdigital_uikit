import { cva } from "class-variance-authority";
import type { ProgressVariant, ProgressSize } from "./types";

export const circleSizes = {
  xs: { size: 60, strokeWidth: 4 },
  sm: { size: 80, strokeWidth: 6 },
  md: { size: 120, strokeWidth: 8 },
  lg: { size: 160, strokeWidth: 10 },
};

export const progressContainerVariants = cva("w-full rounded-full overflow-hidden", {
  variants: {
    size: {
      xs: "h-1",
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const progressBarVariants = cva(
  "h-full transition-[width,height] duration-300 ease-in-out rounded-full",
  {
    variants: {
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const getBackgroundColorClasses = (variant: ProgressVariant): string => {
  if (variant === 'soft') return 'bg-slot-10'
  if (variant === 'solid') return 'bg-slot-20'
  return 'bg-slot-10' // default variant
};

export const getBarColorClasses = (variant: ProgressVariant): string => {
  if (variant === 'default') return 'bg-slot-20 border border-slot'
  if (variant === 'solid') return 'bg-slot'
  return 'bg-slot-50' // soft variant
};

export const getCircleStrokeClasses = (variant: ProgressVariant): string => {
  if (variant === 'soft') return 'stroke-slot-50'
  return 'stroke-slot' // default and solid
};

export const getCircleTrailClasses = (variant: ProgressVariant): string => {
  if (variant === 'soft') return 'stroke-slot-10'
  if (variant === 'solid') return 'stroke-slot-20'
  return 'stroke-slot-10' // default variant
};

export function getVerticalWidthClass(size: ProgressSize): string {
  switch (size) {
    case "xs":
      return "w-1";
    case "sm":
      return "w-2";
    case "md":
      return "w-3";
    case "lg":
      return "w-4";
    default:
      return "w-3";
  }
}

export function getStripedStyle(striped: boolean, isCompleted: boolean = true) {
  if (!striped || !isCompleted) return {};
  return {
    backgroundImage:
      "linear-gradient(45deg, var(--overlay-stripe) 25%, transparent 25%, transparent 50%, var(--overlay-stripe) 50%, var(--overlay-stripe) 75%, transparent 75%, transparent)",
    backgroundSize: "1rem 1rem",
  };
}
