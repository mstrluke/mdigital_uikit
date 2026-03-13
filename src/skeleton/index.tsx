"use client";

import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { SkeletonProps } from "./types";

const skeletonVariants = cva("animate-pulse rounded", {
  variants: {
    size: {
      xs: "h-3",
      sm: "h-4",
      md: "h-5",
      lg: "h-6",
    },
    color: colorVars,
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

const Skeleton = React.memo<SkeletonProps>(
  ({ color = "default", size = "md", className, circle = false }) => {
    return (
      <div
        data-slot="root"
        role="status"
        aria-busy="true"
        aria-label="Loading"
        className={cn(
          "skeleton_root",
          skeletonVariants({ size, color }),
          "bg-slot-20",
          circle && "rounded-full aspect-square",
          className,
        )}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

export type * from "./types";
export default Skeleton;
