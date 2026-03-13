"use client";

import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { StepItem, StepperProps, StepperVariant } from "./types";

const stepCircleVariants = cva(
  "rounded-full flex items-center justify-center font-medium transition-[colors,transform]",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const stepDotVariants = cva("rounded-full transition-[colors,transform]", {
  variants: {
    size: {
      xs: "w-2 h-2",
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const stepLabelVariants = cva("font-medium", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const stepDescriptionVariants = cva("text-text-secondary", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const connectorVariants = cva("bg-border", {
  variants: {
    size: {
      xs: "h-0.5",
      sm: "h-0.5",
      md: "h-1",
      lg: "h-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const getStepCircleClasses = (
  variant: StepperVariant,
  state: "wait" | "process" | "finish" | "error",
) => {
  const isError = state === "error";
  const isWait = state === "wait";

  if (isError) {
    if (variant === "solid")
      return "bg-error text-error-foreground border-2 border-error";
    if (variant === "soft")
      return "bg-error/10 border-2 border-error/50 text-error";
    return "bg-error/20 border-2 border-error text-error";
  }

  if (isWait) {
    if (variant === "solid") {
      return "bg-slot-20 text-slot-fg opacity-50 border-2 border-slot-20";
    }
    if (variant === "soft") {
      return "bg-slot-10 border-2 border-slot-20 text-text-secondary";
    }
    return "bg-slot-10 border-2 border-slot-20 text-text-secondary";
  }

  // process or finish states
  if (variant === "solid") {
    return "bg-slot text-slot-fg border-2 border-slot";
  }
  if (variant === "soft") {
    return "bg-slot-10 border-2 border-slot-50 text-slot";
  }
  return "bg-slot-20 border-2 border-slot text-slot";
};

const getConnectorClasses = (variant: StepperVariant, isFinished: boolean) => {
  if (!isFinished) return "bg-border/50";

  if (variant === "soft") {
    return "bg-slot-50";
  }
  return "bg-slot";
};

const Stepper = React.memo<StepperProps>(
  ({
    steps,
    currentStep,
    color = "primary",
    size = "md",
    variant = "default",
    orientation = "horizontal",
    type = "numbered",
    status,
    onStepClick,
    className,
    classNames,
  }) => {
    const getStepState = (
      index: number,
      step: StepItem,
    ): "wait" | "process" | "finish" | "error" => {
      if (step.status) return step.status;
      if (index === currentStep && status === "error") return "error";
      if (index < currentStep) return "finish";
      if (index === currentStep) return status || "process";
      return "wait";
    };

    const handleStepClick = (index: number, disabled?: boolean) => {
      if (disabled) return;
      onStepClick?.(index);
    };

    if (orientation === "vertical") {
      return (
        <div
          data-slot="root"
          role="list"
          className={cn(
            "stepper_root",
            "flex flex-col",
            colorVars[color],
            classNames?.root,
            className,
          )}
        >
          {steps.map((step, index) => {
            const state = getStepState(index, step);
            const isClickable = !step.disabled && onStepClick;

            return (
              <div
                key={index}
                role="listitem"
                aria-label={`Step ${index + 1} of ${steps.length}`}
                className={cn(
                  "stepper_step",
                  "flex",
                  state === "process" && classNames?.stepActive,
                  state === "finish" && classNames?.stepCompleted,
                  classNames?.step,
                )}
                {...(index === currentStep && { "aria-current": "step" })}
              >
                <div className="flex flex-col items-center mr-4">
                  <div
                    {...(isClickable && {
                      role: "button",
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStepClick(index, step.disabled);
                        }
                      },
                    })}
                    className={cn(
                      "stepper_icon",
                      stepCircleVariants({ size }),
                      getStepCircleClasses(variant, state),
                      isClickable &&
                        "cursor-pointer hover:scale-105 transition-transform duration-150",
                      step.disabled && "opacity-50 cursor-not-allowed",
                      classNames?.icon,
                    )}
                    onClick={() => handleStepClick(index, step.disabled)}
                  >
                    {step.icon || index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "stepper_connector",
                        "w-0.5 flex-1 my-2",
                        getConnectorClasses(variant, state === "finish"),
                        classNames?.connector,
                      )}
                    />
                  )}
                </div>
                <div
                  className={cn("pb-8", index === steps.length - 1 && "pb-0")}
                >
                  <div
                    className={cn(
                      "stepper_label",
                      stepLabelVariants({ size }),
                      state === "wait"
                        ? "text-text-secondary"
                        : "text-text-primary",
                      state === "error" && "text-error",
                      classNames?.label,
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        "stepper_description",
                        stepDescriptionVariants({ size }),
                        "mt-1",
                        classNames?.description,
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (type === "dots") {
      return (
        <div
          role="list"
          className={cn(
            "stepper_root",
            "flex items-start",
            colorVars[color],
            classNames?.root,
            className,
          )}
        >
          {steps.map((step, index) => {
            const state = getStepState(index, step);
            const isClickable = !step.disabled && onStepClick;
            const prevStep = steps[index - 1];
            const prevState =
              index > 0 && prevStep
                ? getStepState(index - 1, prevStep)
                : "wait";

            return (
              <React.Fragment key={index}>
                <div
                  role="listitem"
                  aria-label={`Step ${index + 1} of ${steps.length}`}
                  className={cn(
                    "stepper_step",
                    "flex flex-col items-center flex-1",
                    index === 0 && "items-start",
                    index === steps.length - 1 && "items-end",
                    state === "process" && classNames?.stepActive,
                    state === "finish" && classNames?.stepCompleted,
                    classNames?.step,
                  )}
                  {...(index === currentStep && { "aria-current": "step" })}
                >
                  <div className="flex items-center w-full">
                    {index > 0 && (
                      <div
                        className={cn(
                          "stepper_connector",
                          "flex-1",
                          connectorVariants({ size }),
                          getConnectorClasses(variant, prevState === "finish"),
                          classNames?.connector,
                        )}
                      />
                    )}
                    <div
                      {...(isClickable && {
                        role: "button",
                        tabIndex: 0,
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleStepClick(index, step.disabled);
                          }
                        },
                      })}
                      className={cn(
                        "stepper_icon",
                        stepDotVariants({ size }),
                        getStepCircleClasses(variant, state),
                        isClickable &&
                          "cursor-pointer hover:scale-105 transition-transform duration-150",
                        step.disabled && "opacity-50 cursor-not-allowed",
                        "flex-shrink-0",
                        classNames?.icon,
                      )}
                      onClick={() => handleStepClick(index, step.disabled)}
                    />
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "stepper_connector",
                          "flex-1",
                          connectorVariants({ size }),
                          getConnectorClasses(variant, state === "finish"),
                          classNames?.connector,
                        )}
                      />
                    )}
                  </div>
                  <div
                    className={cn(
                      "mt-2 px-2",
                      index === 0 && "text-left",
                      index === steps.length - 1 && "text-right",
                      index > 0 && index < steps.length - 1 && "text-center",
                    )}
                  >
                    <div
                      className={cn(
                        "stepper_label",
                        stepLabelVariants({ size }),
                        state === "wait"
                          ? "text-text-secondary"
                          : "text-text-primary",
                        state === "error" && "text-error",
                        classNames?.label,
                      )}
                    >
                      {step.label}
                    </div>
                    {step.description && (
                      <div
                        className={cn(
                          "stepper_description",
                          stepDescriptionVariants({ size }),
                          "mt-1",
                          classNames?.description,
                        )}
                      >
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    return (
      <div
        role="list"
        className={cn(
          "stepper_root",
          "flex items-start",
          colorVars[color],
          classNames?.root,
          className,
        )}
      >
        {steps.map((step, index) => {
          const state = getStepState(index, step);
          const isClickable = !step.disabled && onStepClick;
          const prevStep = steps[index - 1];
          const prevState =
            index > 0 && prevStep ? getStepState(index - 1, prevStep) : "wait";

          return (
            <React.Fragment key={index}>
              <div
                role="listitem"
                aria-label={`Step ${index + 1} of ${steps.length}`}
                className={cn(
                  "stepper_step",
                  "flex flex-col items-center flex-1",
                  index === 0 && "items-start",
                  index === steps.length - 1 && "items-end",
                  state === "process" && classNames?.stepActive,
                  state === "finish" && classNames?.stepCompleted,
                  classNames?.step,
                )}
                {...(index === currentStep && { "aria-current": "step" })}
              >
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className={cn(
                        "stepper_connector",
                        "flex-1",
                        connectorVariants({ size }),
                        getConnectorClasses(variant, prevState === "finish"),
                        classNames?.connector,
                      )}
                    />
                  )}
                  <div
                    {...(isClickable && {
                      role: "button",
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStepClick(index, step.disabled);
                        }
                      },
                    })}
                    className={cn(
                      "stepper_icon",
                      stepCircleVariants({ size }),
                      getStepCircleClasses(variant, state),
                      isClickable &&
                        "cursor-pointer hover:scale-105 transition-transform duration-150",
                      step.disabled && "opacity-50 cursor-not-allowed",
                      "flex-shrink-0",
                      classNames?.icon,
                    )}
                    onClick={() => handleStepClick(index, step.disabled)}
                  >
                    {step.icon || index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "stepper_connector",
                        "flex-1",
                        connectorVariants({ size }),
                        getConnectorClasses(variant, state === "finish"),
                        classNames?.connector,
                      )}
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "mt-2 px-2",
                    index === 0 && "text-left",
                    index === steps.length - 1 && "text-right",
                    index > 0 && index < steps.length - 1 && "text-center",
                  )}
                >
                  <div
                    className={cn(
                      "stepper_label",
                      stepLabelVariants({ size }),
                      state === "wait"
                        ? "text-text-secondary"
                        : "text-text-primary",
                      state === "error" && "text-error",
                      classNames?.label,
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        "stepper_description",
                        stepDescriptionVariants({ size }),
                        "mt-1",
                        classNames?.description,
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export type * from "./types";
export default Stepper;
