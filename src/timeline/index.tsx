"use client";

import { cva } from "class-variance-authority";
import React from "react";

import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { TimelineProps } from "./types";

const dotVariants = cva(
  "rounded-full shrink-0 flex items-center justify-center z-10 bg-slot",
  {
    variants: {
      size: {
        xs: "w-2 h-2",
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
      color: colorVars,
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  },
);

const connectorSizes = {
  xs: { vertical: "w-px", horizontal: "h-px" },
  sm: { vertical: "w-px", horizontal: "h-px" },
  md: { vertical: "w-0.5", horizontal: "h-0.5" },
  lg: { vertical: "w-0.5", horizontal: "h-0.5" },
} as const;

const trackWidths = {
  xs: "w-4",
  sm: "w-5",
  md: "w-6",
  lg: "w-7",
} as const;

const contentSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const timestampSizes = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const iconDotSizes = {
  xs: "w-5 h-5",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
} as const;



const dotRowHeights = {
  xs: "min-h-5",
  sm: "min-h-6",
  md: "min-h-8",
  lg: "min-h-10",
} as const;

const Timeline = React.memo<TimelineProps>(
  ({
    items,
    mode = "left",
    orientation = "vertical",
    size = "md",
    color = "default",
    pending = false,
    pendingText = "Loading...",
    reverse = false,
    className,
    classNames,
    ref,
  }) => {
    const isHorizontal = orientation === "horizontal";
    const displayItems = reverse ? [...items].reverse() : items;

    const renderDot = (
      item: (typeof displayItems)[number],
      itemColor: typeof color,
    ) => {
      if (item.dot) {
        return (
          <div
            className={cn("timeline_dot", "shrink-0 z-10", classNames?.dot)}
            data-slot="dot"
          >
            {item.dot}
          </div>
        );
      }

      if (item.icon) {
        return (
          <div
            className={cn(
              "timeline_dot",
              "rounded-full shrink-0 flex items-center justify-center z-10 bg-slot text-slot-fg",
              colorVars[itemColor],
              iconDotSizes[size],
              classNames?.dot,
            )}
            data-slot="dot"
          >
            <span
              className={cn(
                "timeline_icon",
                "flex items-center justify-center",
                iconSizes[size],
                classNames?.icon,
              )}
              data-slot="icon"
            >
              {item.icon}
            </span>
          </div>
        );
      }

      return (
        <div
          className={cn(
            "timeline_dot",
            dotVariants({ size, color: itemColor }),
            classNames?.dot,
          )}
          data-slot="dot"
        />
      );
    };

    const renderContent = (
      item: (typeof displayItems)[number],
      align: "left" | "right",
    ) => (
      <div
        className={cn(
          "timeline_content",
          contentSizes[size],
          align === "right" ? "text-right" : "text-left",
          classNames?.content,
        )}
        data-slot="content"
      >
        <div
          className={cn(
            "timeline_title",
            "font-semibold text-text-primary -mt-1",
            item.description && "mb-1",
            classNames?.title,
          )}
          data-slot="title"
        >
          {item.title}
        </div>
        {item.description && (
          <div
            className={cn(
              "timeline_description",
              "text-text-secondary",
              classNames?.description,
            )}
            data-slot="description"
          >
            {item.description}
          </div>
        )}
      </div>
    );

    const renderDate = (
      item: (typeof displayItems)[number],
      align: "left" | "right",
    ) => {
      if (!item.timestamp) return null;
      return (
        <div
          className={cn(
            "timeline_date",
            "text-text-secondary",
            timestampSizes[size],
            align === "right" ? "text-right" : "text-left",
            classNames?.date,
          )}
          data-slot="date"
        >
          {item.timestamp}
        </div>
      );
    };

    // === VERTICAL ===

    const renderVerticalItem = (
      item: (typeof displayItems)[number],
      index: number,
    ) => {
      const isLast = index === displayItems.length - 1 && !pending;
      const itemColor = item.color || color;
      const contentOnRight =
        mode === "left" || (mode === "center" && index % 2 === 0);

      return (
        <div
          key={item.key ?? index}
          className={cn(
            "timeline_item",
            "grid grid-cols-[1fr_auto_1fr]",
            classNames?.item,
          )}
          data-slot="item"
        >
          {/* Left column */}
          <div className="pb-8 pr-4">
            {contentOnRight
              ? renderDate(item, "right")
              : renderContent(item, "right")}
          </div>

          {/* Track */}
          <div
            className={cn(
              "timeline_track",
              "relative flex flex-col items-center",
              trackWidths[size],
            )}
          >
            {renderDot(item, itemColor)}
            {!isLast && (
              <div
                className={cn(
                  "timeline_connector",
                  "flex-1 bg-border",
                  connectorSizes[size].vertical,
                  classNames?.connector,
                )}
                data-slot="connector"
              />
            )}
          </div>

          {/* Right column */}
          <div className="pb-8 pl-4">
            {contentOnRight
              ? renderContent(item, "left")
              : renderDate(item, "left")}
          </div>
        </div>
      );
    };

    const renderVerticalPending = () => {
      const pendingIndex = displayItems.length;
      const contentOnRight =
        mode === "left" || (mode === "center" && pendingIndex % 2 === 0);

      return (
        <div
          className={cn(
            "timeline_item",
            "grid grid-cols-[1fr_auto_1fr]",
            classNames?.item,
          )}
          data-slot="item"
        >
          <div className="pr-4">
            {!contentOnRight && (
              <div
                className={cn(
                  "text-text-secondary text-right",
                  contentSizes[size],
                )}
              >
                {pendingText}
              </div>
            )}
          </div>

          <div
            className={cn(
              "timeline_track",
              "relative flex flex-col items-center",
              trackWidths[size],
            )}
          >
            <div
              className={cn(
                "timeline_dot",
                dotVariants({ size, color: "default" }),
                "animate-pulse",
                classNames?.dot,
              )}
              data-slot="dot"
            />
          </div>

          <div className="pl-4">
            {contentOnRight && (
              <div
                className={cn(
                  "text-text-secondary",
                  contentSizes[size],
                  classNames?.content,
                )}
              >
                {pendingText}
              </div>
            )}
          </div>
        </div>
      );
    };

    // === HORIZONTAL ===

    const renderHorizontalItem = (
      item: (typeof displayItems)[number],
      index: number,
    ) => {
      const isFirst = index === 0;
      const isLast = index === displayItems.length - 1 && !pending;
      const itemColor = item.color || color;

      return (
        <div
          key={item.key ?? index}
          className={cn(
            "timeline_item",
            "flex-1 flex flex-col items-center min-w-0",
            classNames?.item,
          )}
          data-slot="item"
        >
          {/* Date above */}
          <div
            className={cn(
              "timeline_date",
              "text-text-secondary text-center mb-2",
              timestampSizes[size],
              classNames?.date,
            )}
            data-slot="date"
          >
            {item.timestamp || "\u00A0"}
          </div>

          {/* Dot row */}
          <div className={cn("flex items-center w-full", dotRowHeights[size])}>
            <div
              className={cn(
                "flex-1",
                !isFirst && cn("bg-border", connectorSizes[size].horizontal),
              )}
            />
            {renderDot(item, itemColor)}
            <div
              className={cn(
                "flex-1",
                !isLast && cn("bg-border", connectorSizes[size].horizontal),
              )}
            />
          </div>

          {/* Content below */}
          <div
            className={cn(
              "timeline_content",
              "text-center mt-1.5",
              contentSizes[size],
              classNames?.content,
            )}
            data-slot="content"
          >
            <div
              className={cn(
                "timeline_title",
                "font-semibold text-text-primary",
                item.description && "mb-1",
                classNames?.title,
              )}
              data-slot="title"
            >
              {item.title}
            </div>
            {item.description && (
              <div
                className={cn(
                  "timeline_description",
                  "text-text-secondary",
                  classNames?.description,
                )}
                data-slot="description"
              >
                {item.description}
              </div>
            )}
          </div>
        </div>
      );
    };

    const renderHorizontalPending = () => (
      <div
        className={cn(
          "timeline_item",
          "flex-1 flex flex-col items-center min-w-0",
          classNames?.item,
        )}
        data-slot="item"
      >
        <div
          className={cn(
            "text-text-secondary text-center mb-2",
            timestampSizes[size],
          )}
        >
          {"\u00A0"}
        </div>

        <div className={cn("flex items-center w-full", dotRowHeights[size])}>
          <div
            className={cn("flex-1 bg-border", connectorSizes[size].horizontal)}
          />
          <div
            className={cn(
              "timeline_dot",
              dotVariants({ size, color: "default" }),
              "animate-pulse",
              classNames?.dot,
            )}
            data-slot="dot"
          />
          <div className="flex-1 h-0" />
        </div>

        <div
          className={cn(
            "timeline_content",
            "text-center mt-1.5 text-text-secondary",
            contentSizes[size],
            classNames?.content,
          )}
          data-slot="content"
        >
          {pendingText}
        </div>
      </div>
    );

    // === RENDER ===

    if (isHorizontal) {
      return (
        <div
          ref={ref}
          className={cn(
            "timeline_root",
            "relative flex w-full",
            classNames?.root,
            className,
          )}
          data-slot="root"
        >
          {displayItems.map((item, index) => renderHorizontalItem(item, index))}
          {pending && renderHorizontalPending()}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("timeline_root", "relative", classNames?.root, className)}
        data-slot="root"
      >
        {displayItems.map((item, index) => renderVerticalItem(item, index))}
        {pending && renderVerticalPending()}
      </div>
    );
  },
);

Timeline.displayName = "Timeline";

export type * from "./types";
export default Timeline;
