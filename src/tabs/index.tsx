"use client";

import { cva } from "class-variance-authority";
import React, {
  useState,
  useId,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { TabsColor, TabsProps } from "./types";

// Use useLayoutEffect on client, useEffect on server (SSR safe)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Component colors for compound variants
const componentColors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;

const tabListVariants = cva("flex relative", {
  variants: {
    size: {
      xs: "gap-(--tabs-gap-xs)",
      sm: "gap-(--tabs-gap-sm)",
      md: "gap-(--tabs-gap-md)",
      lg: "gap-(--tabs-gap-lg)",
    },
    variant: {
      default: "border-b",
      solid: "border-b",
      soft: "border-b",
      pill: "bg-surface p-0.5 rounded-lg border border-border gap-0 w-fit",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const tabItemVariants = cva(
  "relative z-[1] font-medium transition-colors duration-200 ease-out cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-slot/50 focus-visible:rounded-sm",
  {
    variants: {
      size: {
        xs: "text-xs px-(--tabs-padding-x-xs) py-(--tabs-padding-y-xs)",
        sm: "text-sm px-(--tabs-padding-x-sm) py-(--tabs-padding-y-sm)",
        md: "text-base px-(--tabs-padding-x-md) py-(--tabs-padding-y-md)",
        lg: "text-lg px-(--tabs-padding-x-lg) py-(--tabs-padding-y-lg)",
      },
      variant: {
        default: "pb-2 -mb-px",
        solid: "pb-2 -mb-px",
        soft: "pb-2 -mb-px",
        pill: "rounded-md",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        error: "",
        warning: "",
        info: "",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Inactive states (all variants)
      ...componentColors.map((color) => ({
        color: color as TabsColor,
        active: false as const,
        className: "text-text-secondary hover:text-text-primary",
      })),

      // Active pill variant - uses foreground text
      ...componentColors.map((color) => ({
        variant: "pill" as const,
        color: color as TabsColor,
        active: true as const,
        className: "text-slot-fg",
      })),

      // Active default/solid/soft variants - uses accent text
      ...componentColors.map((color) => ({
        variant: "default" as const,
        color: color as TabsColor,
        active: true as const,
        className: "text-slot",
      })),
      ...componentColors.map((color) => ({
        variant: "solid" as const,
        color: color as TabsColor,
        active: true as const,
        className: "text-slot",
      })),
      ...componentColors.map((color) => ({
        variant: "soft" as const,
        color: color as TabsColor,
        active: true as const,
        className: "text-slot",
      })),

      // Inactive pill variant hover
      ...componentColors.map((color) => ({
        variant: "pill" as const,
        color: color as TabsColor,
        active: false as const,
        className: "bg-transparent hover:bg-background/50",
      })),
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
      color: "primary",
      active: false,
    },
  },
);

const Tabs = React.memo<TabsProps>(
  ({
    items,
    defaultActiveKey,
    activeKey: controlledActiveKey,
    color = "primary",
    size = "md",
    variant = "default",
    onChange,
    className,
    classNames,
  }) => {
    const [internalActiveKey, setInternalActiveKey] = useState(
      defaultActiveKey || items[0]?.key || "",
    );
    const tabListRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>(
      {},
    );
    const [hasInitialized, setHasInitialized] = useState(false);

    // Generate unique IDs for accessibility
    const uniqueId = useId();

    const activeKey =
      controlledActiveKey !== undefined
        ? controlledActiveKey
        : internalActiveKey;

    // Measure and position the sliding indicator
    const updateIndicatorPosition = useCallback(() => {
      const activeTab = tabRefs.current.get(activeKey);
      const tabList = tabListRef.current;
      if (!activeTab || !tabList) return;

      // Use offsetLeft for parent-relative positioning (more reliable than getBoundingClientRect)
      const left = activeTab.offsetLeft;
      const width = activeTab.offsetWidth;
      const height = activeTab.offsetHeight;

      const isPill = variant === "pill";

      if (isPill) {
        // For pill variant, account for padding (SSR-safe guard)
        let paddingLeft = 0;
        if (typeof window !== "undefined") {
          const computedStyle = window.getComputedStyle(tabList);
          paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        }
        
        setIndicatorStyle({
          transform: `translateX(${left - paddingLeft}px)`,
          width: `${width}px`,
          height: `${height}px`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          transform: `translateX(${left}px)`,
          width: `${width}px`,
          opacity: 1,
        });
      }

      // Enable transitions after initial positioning
      if (!hasInitialized) {
        requestAnimationFrame(() => setHasInitialized(true));
      }
    }, [activeKey, variant, hasInitialized]);

    useIsomorphicLayoutEffect(() => {
      updateIndicatorPosition();
    }, [updateIndicatorPosition, items, size]);

    // Scroll the active tab into view when it changes
    useEffect(() => {
      const activeTab = tabRefs.current.get(activeKey);
      if (activeTab?.scrollIntoView) {
        activeTab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: hasInitialized ? "smooth" : "auto" });
      }
    }, [activeKey, hasInitialized]);

    // Handle window resize and orientation changes (SSR-safe)
    useEffect(() => {
      if (typeof window === "undefined") return;

      const handleResize = () => {
        requestAnimationFrame(() => {
          updateIndicatorPosition();
        });
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }, [updateIndicatorPosition]);

    // Observe tab list resize (handles mobile reflows, font size changes, etc.)
    useEffect(() => {
      const tabList = tabListRef.current;
      if (!tabList || typeof ResizeObserver === 'undefined') return;

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          updateIndicatorPosition();
        });
      });

      resizeObserver.observe(tabList);

      return () => {
        resizeObserver.disconnect();
      };
    }, [updateIndicatorPosition]);

    const handleTabClick = useCallback(
      (key: string, disabled?: boolean) => {
        if (disabled) return;

        if (controlledActiveKey === undefined) {
          setInternalActiveKey(key);
        }
        onChange?.(key);

        // Focus the newly active tab
        requestAnimationFrame(() => {
          const btn = tabRefs.current.get(key);
          btn?.focus();
        });
      },
      [controlledActiveKey, onChange],
    );

    // Handle keyboard navigation (arrow keys, Home, End)
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
        const enabledIndices = items
          .map((item, i) => (!item.disabled ? i : -1))
          .filter((i): i is number => i !== -1);
        const currentEnabledIndex = enabledIndices.indexOf(currentIndex);

        let newIndex: number | undefined;

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            newIndex =
              enabledIndices[
                currentEnabledIndex > 0
                  ? currentEnabledIndex - 1
                  : enabledIndices.length - 1
              ];
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            newIndex =
              enabledIndices[
                currentEnabledIndex < enabledIndices.length - 1
                  ? currentEnabledIndex + 1
                  : 0
              ];
            break;
          case "Home":
            event.preventDefault();
            newIndex = enabledIndices[0];
            break;
          case "End":
            event.preventDefault();
            newIndex = enabledIndices[enabledIndices.length - 1];
            break;
        }

        if (newIndex !== undefined) {
          const newItem = items[newIndex];
          if (newItem) {
            handleTabClick(newItem.key);
            // Focus the new tab
            const btn = tabRefs.current.get(newItem.key);
            btn?.focus();
          }
        }
      },
      [items, handleTabClick],
    );

    const activeItem = items.find((item) => item.key === activeKey);
    const isPill = variant === "pill";

    return (
      <div
        data-slot="tabs_root"
        className={cn("tabs_root w-full", colorVars[color], classNames?.root, className)}
      >
        <div
          ref={tabListRef}
          role="tablist"
          aria-orientation="horizontal"
          data-slot="tabs_list"
          className={cn(
            "tabs_list overflow-x-auto",
            tabListVariants({ size, variant }),
            variant !== "pill" && "border-border",
            classNames?.list,
          )}
        >
          {/* Sliding indicator */}
          <span
            data-slot="tabs_indicator"
            className={cn(
              "tabs_indicator absolute pointer-events-none",
              isPill
                ? cn("rounded-md shadow-sm top-0.5", "bg-slot")
                : cn("bottom-0 h-0.5 rounded-full", "bg-slot"),
              hasInitialized
                ? "transition-[transform,width] duration-300 ease-out"
                : "",
              classNames?.indicator,
            )}
            style={indicatorStyle}
            aria-hidden="true"
          />

          {items.map((item, index) => {
            const isActive = item.key === activeKey;
            const tabId = `tab-${uniqueId}-${item.key}`;
            const panelId = `panel-${uniqueId}-${item.key}`;

            return (
              <button
                key={item.key}
                ref={(el) => {
                  if (el) tabRefs.current.set(item.key, el);
                  else tabRefs.current.delete(item.key);
                }}
                id={tabId}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                data-slot="tabs_tab"
                className={cn(
                  "tabs_tab",
                  tabItemVariants({
                    size,
                    variant,
                    color,
                    active: isActive,
                  }),
                  item.disabled && "opacity-50 cursor-not-allowed",
                  classNames?.tab,
                  isActive && classNames?.tabActive,
                )}
                onClick={() => handleTabClick(item.key, item.disabled)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={item.disabled}
              >
                {item.icon && <span aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>

        {activeItem?.content && (
          <div
            id={`panel-${uniqueId}-${activeItem.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${uniqueId}-${activeItem.key}`}
            data-slot="tabs_panel"
            className={cn(
              "tabs_panel",
              "py-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
              classNames?.panel,
            )}
          >
            {activeItem?.content}
          </div>
        )}
      </div>
    );
  },
);

Tabs.displayName = "Tabs";

export type { TabsClassNames } from "./types";
export type * from "./types";
export default Tabs;
