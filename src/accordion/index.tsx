'use client'

import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useId, useLayoutEffect, useRef, useState } from "react";

import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { AccordionItem as AccordionItemType, AccordionProps, AccordionSize } from "./types";

const accordionContainerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-0 divide-y divide-border rounded-lg overflow-hidden",
      solid: "space-y-0 divide-y divide-border/50 rounded-lg overflow-hidden",
      soft: "space-y-0 divide-y divide-border/30 rounded-lg overflow-hidden",
      bordered: "space-y-0 divide-y border border-slot rounded-lg overflow-hidden",
      splitted: "space-y-2",
    },
    color: colorVars,
    showDivider: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "default", showDivider: false, class: "divide-y-0" },
    { variant: "solid", showDivider: false, class: "divide-y-0" },
    { variant: "soft", showDivider: false, class: "divide-y-0" },
    { variant: "bordered", showDivider: false, class: "divide-y-0" },
    { variant: "bordered", color: "default", class: "divide-border" },
  ],
  defaultVariants: {
    variant: "default",
    color: "default",
    showDivider: true,
  },
});

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "bg-transparent",
      solid: "bg-slot text-slot-fg",
      soft: "bg-slot-10",
      bordered: "bg-transparent border-slot-20",
      splitted: "border rounded-lg overflow-hidden border-slot",
    },
    color: colorVars,
  },
  compoundVariants: [
    { variant: "soft", color: "default", class: "bg-surface/50" },
    { variant: "bordered", color: "default", class: "border-border" },
  ],
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

const accordionHeaderVariants = cva(
  [
    "flex items-center w-full text-left font-medium text-text-primary touch-manipulation",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-slot",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        xs: "px-(--accordion-padding-x-xs) py-(--accordion-padding-y-xs) text-xs gap-2",
        sm: "px-(--accordion-padding-x-sm) py-(--accordion-padding-y-sm) text-sm gap-2",
        md: "px-(--accordion-padding-x-md) py-(--accordion-padding-y-md) text-base gap-3",
        lg: "px-(--accordion-padding-x-lg) py-(--accordion-padding-y-lg) text-lg gap-3",
      },
      color: colorVars,
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer hover:bg-surface/50",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
      disabled: false,
    },
  },
);

const accordionContentVariants = cva("text-text-secondary", {
  variants: {
    size: {
      xs: "px-(--accordion-padding-x-xs) pb-(--accordion-padding-y-xs) text-xs",
      sm: "px-(--accordion-padding-x-sm) pb-(--accordion-padding-y-sm) text-sm",
      md: "px-(--accordion-padding-x-md) pb-(--accordion-padding-y-md) text-base",
      lg: "px-(--accordion-padding-x-lg) pb-(--accordion-padding-y-lg) text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const getIconColor = (_color: AccordionProps["color"], isExpanded: boolean) => {
  if (!isExpanded) return "text-text-secondary";
  return "text-slot";
};

interface AccordionItemComponentProps {
  item: AccordionItemType;
  isActive: boolean;
  baseId: string;
  size: AccordionSize;
  color: NonNullable<AccordionProps["color"]>;
  variant: NonNullable<AccordionProps["variant"]>;
  isSolidColored: boolean;
  expandIcon: AccordionProps["expandIcon"];
  expandIconPosition: NonNullable<AccordionProps["expandIconPosition"]>;
  destroyOnClose: boolean;
  onToggle: (key: string, disabled?: boolean) => void;
  classNames?: AccordionProps["classNames"];
  itemClassName?: string;
}

const AccordionItemComponent = React.memo<AccordionItemComponentProps>(
  ({
    item,
    isActive: isItemActive,
    baseId,
    size,
    color,
    variant,
    isSolidColored,
    expandIcon,
    expandIconPosition,
    destroyOnClose,
    onToggle,
    classNames,
    itemClassName,
  }) => {
    const headerId = `${baseId}-header-${item.key}`;
    const panelId = `${baseId}-panel-${item.key}`;
    const panelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prevActiveRef = useRef(isItemActive);
    const cachedHeightRef = useRef<number>(0);
    const animRef = useRef<Animation | null>(null);

    // Pre-measure on hover so click has zero reflow cost
    const handlePointerEnter = useCallback(() => {
      if (contentRef.current) {
        cachedHeightRef.current = contentRef.current.scrollHeight;
      }
    }, []);

    // Set initial height before first paint (no animation on mount)
    useLayoutEffect(() => {
      if (panelRef.current) {
        panelRef.current.style.height = isItemActive ? "auto" : "0";
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // WAAPI animation — browser pre-computes full path, cancellable on rapid clicks
    useLayoutEffect(() => {
      const panel = panelRef.current;
      const content = contentRef.current;
      if (!panel || !content) return;

      const wasActive = prevActiveRef.current;
      prevActiveRef.current = isItemActive;
      if (isItemActive === wasActive) return;

      if (animRef.current) animRef.current.cancel();

      const height = cachedHeightRef.current || content.scrollHeight;
      cachedHeightRef.current = 0;

      // Check for prefers-reduced-motion
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReducedMotion ? 0 : 200;

      const anim = panel.animate(
        isItemActive
          ? [{ height: "0px" }, { height: `${height}px` }]
          : [{ height: `${height}px` }, { height: "0px" }],
        { duration, easing: "ease-out", fill: "forwards" },
      );

      anim.onfinish = () => {
        panel.style.height = isItemActive ? "auto" : "0";
        anim.cancel();
      };

      animRef.current = anim;
    }, [isItemActive]);

    const renderExpandIcon = (isExpanded: boolean) => {
      if (expandIcon === false) return null;

      if (typeof expandIcon === "function") {
        return expandIcon(isExpanded);
      }

      if (expandIcon) {
        return (
          <span
            className={cn(
              "shrink-0 transition-transform duration-300",
              isExpanded && "rotate-180",
            )}
          >
            {expandIcon}
          </span>
        );
      }

      return (
        <ChevronDown
          className={cn(
            "shrink-0 transition-transform duration-300",
            isExpanded && "rotate-180",
            isSolidColored ? "text-inherit" : getIconColor(color, isExpanded),
            iconSizes[size],
          )}
        />
      );
    };

    return (
      <div
        data-slot="item"
        className={cn(
          "accordion_item",
          accordionItemVariants({ variant, color }),
          item.disabled && "opacity-50",
          classNames?.item,
          itemClassName,
        )}
      >
        <button
          type="button"
          id={headerId}
          aria-expanded={isItemActive}
          aria-controls={panelId}
          aria-disabled={item.disabled}
          disabled={item.disabled}
          onClick={() => onToggle(item.key, item.disabled)}
          onPointerEnter={handlePointerEnter}
          data-slot="trigger"
          className={cn(
            "accordion_trigger",
            accordionHeaderVariants({
              size,
              color,
              disabled: item.disabled,
            }),
            classNames?.trigger,
          )}
        >
          {expandIconPosition === "left" && renderExpandIcon(isItemActive)}

          {item.icon && (
            <span
              data-slot="icon"
              className={cn(
                "accordion_icon",
                "shrink-0",
                isSolidColored ? "text-inherit" : getIconColor(color, isItemActive),
                classNames?.icon,
              )}
            >
              {item.icon}
            </span>
          )}

          <div className="flex-1 min-w-0">
            <div
              className={cn(
                !isSolidColored &&
                  isItemActive &&
                  color !== "default" &&
                  "text-slot",
              )}
            >
              {item.title}
            </div>
            {item.subtitle && (
              <div className={cn(
                "font-normal mt-0.5",
                isSolidColored ? "text-inherit opacity-80" : "text-text-secondary",
              )}>
                {item.subtitle}
              </div>
            )}
          </div>

          {item.extra && (
            <span className={cn(
              "shrink-0",
              isSolidColored ? "text-inherit opacity-80" : "text-text-secondary",
            )}>
              {item.extra}
            </span>
          )}

          {expandIconPosition === "right" && renderExpandIcon(isItemActive)}
        </button>

        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          aria-hidden={!isItemActive}
          className="overflow-hidden"
          style={{ contain: "content" }}
        >
          <div ref={contentRef}>
            {(!destroyOnClose || isItemActive) && (
              <div
                data-slot="content"
                className={cn(
                  "accordion_content",
                  accordionContentVariants({ size }),
                  isSolidColored && "text-inherit opacity-90",
                  classNames?.content,
                )}
              >
                {item.content}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

AccordionItemComponent.displayName = "AccordionItem";

const Accordion = React.memo<AccordionProps>(
  ({
    items,
    color = "default",
    size = "md",
    variant = "default",
    defaultActiveKey,
    activeKey: controlledActiveKey,
    onChange,
    multiple = false,
    expandIcon,
    expandIconPosition = "right",
    collapsible = true,
    destroyOnClose = false,
    showDivider = true,
    className,
    itemClassName,
    classNames,
    ref,
  }) => {
    const isSolidColored = variant === "solid" && color !== "default";
    const baseId = useId();
    const [internalActiveKey, setInternalActiveKey] = useState<
      string | string[]
    >(
      defaultActiveKey
        ? multiple && !Array.isArray(defaultActiveKey)
          ? [defaultActiveKey]
          : defaultActiveKey
        : multiple
          ? []
          : "",
    );

    const activeKey =
      controlledActiveKey !== undefined
        ? controlledActiveKey
        : internalActiveKey;

    const isActive = useCallback((key: string) => {
      if (Array.isArray(activeKey)) {
        return activeKey.includes(key);
      }
      return activeKey === key;
    }, [activeKey]);

    const handleToggle = useCallback((key: string, disabled?: boolean) => {
      if (disabled) return;

      let newActiveKey: string | string[];

      if (multiple) {
        const currentKeys = Array.isArray(activeKey)
          ? activeKey
          : activeKey
            ? [activeKey]
            : [];
        newActiveKey = currentKeys.includes(key)
          ? currentKeys.filter((k) => k !== key)
          : [...currentKeys, key];
      } else {
        if (!collapsible && activeKey === key) {
          return;
        }
        newActiveKey = activeKey === key ? "" : key;
      }

      if (controlledActiveKey === undefined) {
        setInternalActiveKey(newActiveKey);
      }
      onChange?.(newActiveKey);
    }, [multiple, activeKey, collapsible, controlledActiveKey, onChange]);

    return (
      <div
        ref={ref}
        data-slot="root"
        className={cn(
          "accordion_root",
          accordionContainerVariants({
            variant,
            color,
            showDivider: showDivider && variant !== "splitted",
          }),
          classNames?.root,
          className,
        )}
      >
        {items.map((item) => (
          <AccordionItemComponent
            key={item.key}
            item={item}
            isActive={isActive(item.key)}
            baseId={baseId}
            size={size as AccordionSize}
            color={color}
            variant={variant}
            isSolidColored={isSolidColored}
            expandIcon={expandIcon}
            expandIconPosition={expandIconPosition}
            destroyOnClose={destroyOnClose}
            onToggle={handleToggle}
            classNames={classNames}
            itemClassName={itemClassName}
          />
        ))}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";

export type * from "./types";
export default Accordion;
