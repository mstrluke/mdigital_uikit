"use client";

import React from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { ProgressProps } from "./types";
import {
  circleSizes,
  progressContainerVariants,
  progressBarVariants,
  getBackgroundColorClasses,
  getBarColorClasses,
  getCircleStrokeClasses,
  getCircleTrailClasses,
  getVerticalWidthClass,
  getStripedStyle,
} from "./styles";

// Shared label and progress percentage component
interface ProgressLabelProps {
  label?: string;
  showProgress: boolean;
  clampedValue: number;
  classNames?: ProgressProps["classNames"];
}

const ProgressLabel: React.FC<ProgressLabelProps> = ({
  label,
  showProgress,
  clampedValue,
  classNames,
}) => {
  if (!label) return null;

  return (
    <div className="flex items-center justify-between mb-2 text-sm text-text-primary">
      <span className={cn("progress_label", classNames?.label)}>{label}</span>
      {showProgress && (
        <span
          className={cn("font-medium", "progress_value", classNames?.value)}
        >
          {clampedValue}%
        </span>
      )}
    </div>
  );
};

// Circle progress component
interface CircleProgressProps
  extends Pick<
    ProgressProps,
    | "size"
    | "circleSize"
    | "strokeWidth"
    | "color"
    | "variant"
    | "label"
    | "className"
    | "classNames"
  > {
  clampedValue: number;
  progressLabel: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  size = "md",
  circleSize: customCircleSize,
  strokeWidth: customStrokeWidth,
  color = "primary",
  variant = "default",
  label,
  className,
  classNames,
  clampedValue,
  progressLabel,
}) => {
  const preset = circleSizes[size];
  const circleSize = customCircleSize ?? preset.size;
  const strokeWidth = customStrokeWidth ?? preset.strokeWidth;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center",
        colorVars[color],
        "progress_root",
        className,
        classNames?.root,
      )}
    >
      <div
        className="relative"
        style={{ width: circleSize, height: circleSize }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={progressLabel}
        aria-live="polite"
      >
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={cn(
              getCircleTrailClasses(variant),
              "progress_track",
              classNames?.track,
            )}
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn(
              getCircleStrokeClasses(variant),
              "transition-[stroke-dashoffset] duration-300 ease-in-out",
              "progress_fill",
              classNames?.fill,
            )}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label ? (
            <div
              className={cn(
                "p-2 text-text-secondary",
                "progress_label",
                classNames?.label,
              )}
              style={{
                fontSize: `${Math.floor(circleSize / Math.floor(label.length * 1.5))}px`,
              }}
            >
              {label}
            </div>
          ) : (
            <span
              className={cn(
                "text-text-primary font-semibold",
                "progress_value",
                classNames?.value,
              )}
              style={{ fontSize: circleSize / 5 }}
            >
              {clampedValue}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Step progress component
interface StepProgressProps
  extends Pick<
    ProgressProps,
    | "orientation"
    | "size"
    | "color"
    | "variant"
    | "label"
    | "showProgress"
    | "striped"
    | "animated"
    | "className"
    | "classNames"
    | "totalSteps"
  > {
  clampedValue: number;
  progressLabel: string;
}

const StepProgress: React.FC<StepProgressProps> = ({
  orientation = "horizontal",
  size = "md",
  color = "primary",
  variant = "default",
  label,
  showProgress = false,
  striped = false,
  animated = false,
  className,
  classNames,
  totalSteps = 5,
  clampedValue,
  progressLabel,
}) => {
  const currentStep = Math.ceil((clampedValue / 100) * totalSteps);

  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "h-full flex flex-col",
          colorVars[color],
          "progress_root",
          className,
          classNames?.root,
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={progressLabel}
        aria-live="polite"
      >
        <ProgressLabel
          label={label}
          showProgress={showProgress}
          clampedValue={clampedValue}
          classNames={classNames}
        />
        <div
          className={cn(
            "flex-1 rounded-full overflow-hidden flex flex-col-reverse gap-1",
            getVerticalWidthClass(size),
            "progress_track",
            classNames?.track,
          )}
        >
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;

            return (
              <div
                key={index}
                className={cn(
                  "w-full rounded-full transition-[width,height] flex-1",
                  isCompleted
                    ? getBarColorClasses(variant)
                    : getBackgroundColorClasses(variant),
                  animated && striped && "progress-shimmer",
                  "progress_fill",
                  classNames?.fill,
                )}
                style={getStripedStyle(striped, isCompleted)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal step progress
  return (
    <div
      data-slot="root"
      className={cn(
        "w-full",
        colorVars[color],
        "progress_root",
        className,
        classNames?.root,
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={progressLabel}
      aria-live="polite"
    >
      <ProgressLabel
        label={label}
        showProgress={showProgress}
        clampedValue={clampedValue}
        classNames={classNames}
      />
      <div
        className={cn(
          "w-full rounded-full overflow-hidden flex gap-1",
          progressContainerVariants({ size }),
          "progress_track",
          classNames?.track,
        )}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <div
              key={index}
              className={cn(
                "h-full rounded-full transition-[width,height] flex-1",
                isCompleted
                  ? getBarColorClasses(variant)
                  : getBackgroundColorClasses(variant),
                animated && striped && "progress-shimmer",
                "progress_fill",
                classNames?.fill,
              )}
              style={getStripedStyle(striped, isCompleted)}
            />
          );
        })}
      </div>
    </div>
  );
};

// Line progress component
interface LineProgressProps
  extends Pick<
    ProgressProps,
    | "orientation"
    | "size"
    | "color"
    | "variant"
    | "label"
    | "showProgress"
    | "striped"
    | "animated"
    | "className"
    | "classNames"
  > {
  clampedValue: number;
  progressLabel: string;
}

const LineProgress: React.FC<LineProgressProps> = ({
  orientation = "horizontal",
  size = "md",
  color = "primary",
  variant = "default",
  label,
  showProgress = false,
  striped = false,
  animated = false,
  className,
  classNames,
  clampedValue,
  progressLabel,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "h-full flex flex-col",
          colorVars[color],
          "progress_root",
          className,
          classNames?.root,
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={progressLabel}
        aria-live="polite"
      >
        <ProgressLabel
          label={label}
          showProgress={showProgress}
          clampedValue={clampedValue}
          classNames={classNames}
        />
        <div
          className={cn(
            "flex-1 rounded-full overflow-hidden flex flex-col justify-end",
            getVerticalWidthClass(size),
            getBackgroundColorClasses(variant),
            "progress_track",
            classNames?.track,
          )}
        >
          <div
            className={cn(
              "w-full transition-[width,height] duration-300 ease-in-out rounded-full",
              getBarColorClasses(variant),
              animated && striped && "progress-shimmer",
              "progress_fill",
              classNames?.fill,
            )}
            style={{
              height: `${clampedValue}%`,
              ...getStripedStyle(striped),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        colorVars[color],
        "progress_root",
        className,
        classNames?.root,
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={progressLabel}
      aria-live="polite"
    >
      <ProgressLabel
        label={label}
        showProgress={showProgress}
        clampedValue={clampedValue}
        classNames={classNames}
      />
      <div
        className={cn(
          progressContainerVariants({ size }),
          getBackgroundColorClasses(variant),
          "progress_track",
          classNames?.track,
        )}
      >
        <div
          className={cn(
            progressBarVariants({ size }),
            getBarColorClasses(variant),
            animated && striped && "progress-shimmer",
            "progress_fill",
            classNames?.fill,
          )}
          style={{
            width: `${clampedValue}%`,
            ...getStripedStyle(striped),
          }}
        />
      </div>
    </div>
  );
};

// Main Progress component - thin wrapper that delegates to sub-components
const Progress = React.memo<ProgressProps>(
  ({
    value,
    color = "primary",
    size = "md",
    circleSize: customCircleSize,
    strokeWidth: customStrokeWidth,
    variant = "default",
    type = "line",
    orientation = "horizontal",
    showProgress = false,
    label,
    striped = false,
    animated = false,
    className,
    classNames,
    totalSteps = 5,
    "aria-label": ariaLabel,
  }) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const progressLabel = ariaLabel || label || "Progress";

    if (type === "circle") {
      return (
        <CircleProgress
          size={size}
          circleSize={customCircleSize}
          strokeWidth={customStrokeWidth}
          color={color}
          variant={variant}
          label={label}
          className={className}
          classNames={classNames}
          clampedValue={clampedValue}
          progressLabel={progressLabel}
        />
      );
    }

    if (type === "step") {
      return (
        <StepProgress
          orientation={orientation}
          size={size}
          color={color}
          variant={variant}
          label={label}
          showProgress={showProgress}
          striped={striped}
          animated={animated}
          className={className}
          classNames={classNames}
          totalSteps={totalSteps}
          clampedValue={clampedValue}
          progressLabel={progressLabel}
        />
      );
    }

    return (
      <LineProgress
        orientation={orientation}
        size={size}
        color={color}
        variant={variant}
        label={label}
        showProgress={showProgress}
        striped={striped}
        animated={animated}
        className={className}
        classNames={classNames}
        clampedValue={clampedValue}
        progressLabel={progressLabel}
      />
    );
  },
);

Progress.displayName = "Progress";

export type * from "./types";
export default Progress;
