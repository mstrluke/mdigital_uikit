'use client'

import { cva } from "class-variance-authority";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";

import type { ComponentColor } from "../types";
import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { CascaderOption, CascaderSize } from "./types";

export const cascaderMenuVariants = cva(
  "overflow-auto rounded-md border bg-background w-[200px] max-h-[300px]",
  {
    variants: {
      size: {
        xs: "w-[160px]",
        sm: "w-[180px]",
        md: "w-[200px]",
        lg: "w-[220px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const cascaderItemVariants = cva(
  "relative cursor-pointer select-none text-text-primary transition-colors flex items-center gap-2 w-full",
  {
    variants: {
      size: {
        xs: "px-2 py-1 text-xs min-h-[28px]",
        sm: "px-2.5 py-1.5 text-sm min-h-[32px]",
        md: "px-3 py-2 text-base min-h-[36px]",
        lg: "px-3.5 py-2.5 text-lg min-h-[44px]",
      },
      disabled: { true: "opacity-50 cursor-not-allowed", false: "hover:bg-surface" },
      active: { true: "bg-surface", false: "" },
      selected: { true: "font-medium", false: "" },
    },
    defaultVariants: { size: "md", disabled: false, active: false, selected: false },
  },
);

export interface CascaderMenuProps {
  activeMenus: CascaderOption[][]
  selectedPath: string[]
  hoveredPath: number[]
  focusedIndex: { level: number; index: number } | null
  selectedPathSet: Set<string>
  selectionStateMap: Map<string, { checked: boolean; indeterminate: boolean }> | null
  size: CascaderSize
  color: ComponentColor
  multiple: boolean
  expandTrigger: 'click' | 'hover'
  emptyContent: React.ReactNode
  onItemClick: (option: CascaderOption, level: number) => void
  onItemHover: (option: CascaderOption, level: number, index: number) => void
  classNames?: {
    dropdown?: string
    menu?: string
    option?: string
  }
  menuRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const CascaderMenu = ({
  activeMenus,
  selectedPath,
  hoveredPath,
  focusedIndex,
  selectedPathSet,
  selectionStateMap,
  size,
  color,
  multiple,
  expandTrigger,
  emptyContent,
  onItemClick,
  onItemHover,
  classNames,
  menuRefs,
}: CascaderMenuProps) => {
  return (
    <div className={cn("flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:border-r-0 [&>*:not(:last-child)]:rounded-r-none cascader_dropdown", colorVars[color], classNames?.dropdown)} data-slot="dropdown">
      {activeMenus.map((menu, level) => (
        <div
          key={level}
          ref={(el) => { menuRefs.current[level] = el }}
          role="listbox"
          className={cn(cascaderMenuVariants({ size }), "border-border cascader_menu", classNames?.menu)}
          data-slot="menu"
        >
          {menu.length === 0 ? (
            <div className="px-3 py-6 text-center text-text-secondary text-sm">{emptyContent}</div>
          ) : (
            menu.map((option, index) => {
              const isActive = selectedPath[level] === option.value || (expandTrigger === "hover" && hoveredPath[level] === index);
              const isFocused = focusedIndex?.level === level && focusedIndex?.index === index;
              const currentPath = selectedPath.slice(0, level);
              const fullPath = [...currentPath, option.value];
              const selectionState = multiple && selectionStateMap
                ? selectionStateMap.get(fullPath.join('\0')) ?? { checked: false, indeterminate: false }
                : null;
              const isLeafSelected =
                !multiple &&
                selectedPathSet.has(fullPath.join('\0')) &&
                (!option.children || option.children.length === 0);

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isLeafSelected || (selectionState?.checked ?? false)}
                  aria-disabled={option.disabled}
                  className={cn(
                    cascaderItemVariants({ size, disabled: !!option.disabled, active: isActive || isFocused, selected: isLeafSelected }),
                    isLeafSelected && 'bg-slot-10 text-slot',
                    "cascader_option",
                    classNames?.option,
                  )}
                  onClick={() => onItemClick(option, level)}
                  onMouseEnter={() => onItemHover(option, level, index)}
                  data-slot="option"
                >
                  {multiple && (
                    <div className={cn("w-4 h-4 border rounded flex items-center justify-center shrink-0", selectionState?.checked ? 'bg-slot border-slot' : "border-border")}>
                      {selectionState?.checked && <Check className="h-3 w-3 text-background" />}
                      {selectionState?.indeterminate && !selectionState?.checked && <div className={cn("w-2 h-0.5 bg-slot")} />}
                    </div>
                  )}
                  <span className="flex-1 truncate">{option.label}</span>
                  <span className={cn("shrink-0 flex items-center", iconSizes[size])}>
                    {option.loading && <Loader2 className={cn("animate-spin", iconSizes[size])} />}
                    {!option.loading && option.children && option.children.length > 0 && <ChevronRight className={iconSizes[size]} />}
                    {!option.loading && isLeafSelected && <Check className={cn(iconSizes[size], colorVars[color], 'text-slot')} />}
                  </span>
                </div>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
};
