'use client'

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import { ChevronDown, Loader2, X } from "lucide-react";
import React from "react";


import { cn, getValidationStatus, iconSizes, statusMessageVariants } from "../utils";
import { colorVars } from "../variants";
import type { CascaderOption, CascaderProps, CascaderSize } from "./types";
import { CascaderMenu } from "./CascaderMenu";

const cascaderTriggerVariants = cva(
  "flex items-center justify-between gap-2 rounded-md border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      status: {
        default: "bg-background border-border hover:border-primary/50",
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
      fullWidth: { true: "w-full", false: "max-w-full" },
    },
    defaultVariants: { status: "default", size: "md", fullWidth: true },
  },
);

const tagSizeClasses: Record<CascaderSize, string> = {
  xs: "text-[10px] px-1 py-0",
  sm: "text-xs px-1.5 py-0.5",
  md: "text-sm px-2 py-0.5",
  lg: "text-sm px-2.5 py-1",
};

const Cascader = React.memo<CascaderProps>(
  ({
    options,
    value,
    defaultValue,
    onChange,
    onSelect,
    placeholder = "Please select",
    label,
    helperText,
    messagePosition = "bottom",
    color = "default",
    size = "md",
    placement = "bottomLeft",
    disabled = false,
    loading = false,
    error,
    warning,
    info,
    success,
    fullWidth = true,
    expandTrigger = "hover",
    multiple = false,
    maxTagCount = 3,
    clearable = true,
    showPath = true,
    pathSeparator = " / ",
    changeOnSelect = false,
    loadData,
    displayRender,
    tagRender,
    emptyContent = "No options",
    className,
    classNames,
    required,
    ref,
    onOpenChange,
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string[] | string[][]>(defaultValue || []);
    const currentValue = value !== undefined ? value : internalValue;
    const [activeMenus, setActiveMenus] = React.useState<CascaderOption[][]>([options]);
    const [hoveredPath, setHoveredPath] = React.useState<number[]>([]);
    const [selectedPath, setSelectedPath] = React.useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<{ level: number; index: number } | null>(null);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const menuRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const normalizedValue: string[][] = React.useMemo(() => {
      if (multiple) {
        return Array.isArray(currentValue[0]) ? (currentValue as string[][]) : [];
      }
      return Array.isArray(currentValue) && currentValue.length > 0 && !Array.isArray(currentValue[0])
        ? [currentValue as string[]]
        : [];
    }, [currentValue, multiple]);

    const selectedPathSet = React.useMemo(() => {
      const set = new Set<string>();
      for (const path of normalizedValue) set.add(path.join('\0'));
      return set;
    }, [normalizedValue]);

    const selectionStateMap = React.useMemo(() => {
      if (!multiple) return null;
      const map = new Map<string, { checked: boolean; indeterminate: boolean }>();

      const collectLeafPaths = (option: CascaderOption, basePath: string[]): string[][] => {
        const paths: string[][] = [];
        const fullPath = [...basePath, option.value];
        if (!option.children || option.children.length === 0) {
          paths.push(fullPath);
        } else {
          for (const child of option.children) paths.push(...collectLeafPaths(child, fullPath));
        }
        return paths;
      };

      const computeForOption = (option: CascaderOption, basePath: string[]) => {
        const key = [...basePath, option.value].join('\0');
        if (!option.children || option.children.length === 0) {
          map.set(key, { checked: selectedPathSet.has(key), indeterminate: false });
        } else {
          for (const child of option.children) computeForOption(child, [...basePath, option.value]);
          const leafPaths = collectLeafPaths(option, basePath);
          let selectedCount = 0;
          for (const lp of leafPaths) { if (selectedPathSet.has(lp.join('\0'))) selectedCount++ }
          map.set(key, { checked: selectedCount === leafPaths.length && leafPaths.length > 0, indeterminate: selectedCount > 0 && selectedCount < leafPaths.length });
        }
      };

      for (const option of options) computeForOption(option, []);
      return map;
    }, [normalizedValue, multiple, options, selectedPathSet]);

    const { status, message: helperMessage } = getValidationStatus({
      error, warning, info, success, helperText,
    });

    const expandToPath = React.useCallback((path: string[]) => {
      const menus: CascaderOption[][] = [options];
      let currentOptions = options;
      for (const val of path) {
        const option = currentOptions.find((opt) => opt.value === val);
        if (option?.children && option.children.length > 0) { menus.push(option.children); currentOptions = option.children }
      }
      setActiveMenus(menus);
    }, [options]);

    const handleOpenChange = React.useCallback((open: boolean) => {
      if (disabled || loading) return;
      setIsOpen(open);
      onOpenChange?.(open);
      if (open) {
        setActiveMenus([options]);
        setHoveredPath([]);
        setFocusedIndex(null);
        if (normalizedValue.length > 0 && !multiple) {
          setSelectedPath(normalizedValue[0] || []);
          expandToPath(normalizedValue[0] || []);
        } else {
          setSelectedPath([]);
        }
      }
    }, [disabled, loading, options, normalizedValue, multiple, onOpenChange, expandToPath]);

    const getSelectedOptions = React.useCallback((path: string[]): CascaderOption[] => {
      const selected: CascaderOption[] = [];
      let currentOptions = options;
      for (const val of path) {
        const option = currentOptions.find((opt) => opt.value === val);
        if (option) { selected.push(option); currentOptions = option.children || [] }
      }
      return selected;
    }, [options]);

    const isPathSelected = React.useCallback((path: string[]): boolean => {
      return normalizedValue.some((sp) => sp.length === path.length && sp.every((val, idx) => val === path[idx]));
    }, [normalizedValue]);

    const getAllLeafPaths = React.useCallback((option: CascaderOption, currentPath: string[]): string[][] => {
      const paths: string[][] = [];
      const fullPath = [...currentPath, option.value];
      if (!option.children || option.children.length === 0) { paths.push(fullPath) }
      else { option.children.forEach((child) => { paths.push(...getAllLeafPaths(child, fullPath)) }) }
      return paths;
    }, []);

    const handleItemClick = React.useCallback(async (option: CascaderOption, level: number) => {
      if (option.disabled) return;
      const newPath = [...selectedPath.slice(0, level), option.value];
      setSelectedPath(newPath);

      if (loadData && !option.children && !option.isLeaf && !option.loading) {
        const selectedOpts = getSelectedOptions(newPath);
        try { await loadData(selectedOpts) } catch { /* consumer handles */ }
        return;
      }

      const hasChildren = option.children && option.children.length > 0;
      const isLeaf = !hasChildren;

      if (hasChildren && !multiple) {
        setActiveMenus((prev) => [...prev.slice(0, level + 1), option.children!]);
        if (changeOnSelect) {
          const selectedOpts = getSelectedOptions(newPath);
          if (value === undefined) setInternalValue(newPath);
          onChange?.(newPath, selectedOpts);
        }
      } else if (hasChildren && multiple) {
        const leafPaths = getAllLeafPaths(option, selectedPath.slice(0, level));
        const allSelected = leafPaths.every((path) => isPathSelected(path));
        let newValue: string[][];
        if (allSelected) {
          newValue = normalizedValue.filter((sp) => !leafPaths.some((lp) => lp.length === sp.length && lp.every((v, i) => v === sp[i])));
        } else {
          newValue = [...normalizedValue, ...leafPaths.filter((path) => !isPathSelected(path))];
        }
        const newSelectedOptions = newValue.map((path) => getSelectedOptions(path));
        if (value === undefined) setInternalValue(newValue);
        onChange?.(newValue, newSelectedOptions);
        setActiveMenus((prev) => [...prev.slice(0, level + 1), option.children!]);
      } else if (isLeaf) {
        if (multiple) {
          let newValue: string[][];
          if (isPathSelected(newPath)) {
            newValue = normalizedValue.filter((path) => !(path.length === newPath.length && path.every((val, idx) => val === newPath[idx])));
          } else {
            newValue = [...normalizedValue, newPath];
          }
          const newSelectedOptions = newValue.map((path) => getSelectedOptions(path));
          if (value === undefined) setInternalValue(newValue);
          onChange?.(newValue, newSelectedOptions);
        } else {
          const selectedOpts = getSelectedOptions(newPath);
          if (value === undefined) setInternalValue(newPath);
          onChange?.(newPath, selectedOpts);
          onSelect?.(newPath, selectedOpts);
          handleOpenChange(false);
        }
      }
    }, [selectedPath, value, onChange, onSelect, getSelectedOptions, multiple, isPathSelected, normalizedValue, getAllLeafPaths, changeOnSelect, loadData, handleOpenChange]);

    const handleItemHover = React.useCallback((option: CascaderOption, level: number, index: number) => {
      if (expandTrigger !== "hover" || option.disabled) return;
      setHoveredPath((prev) => [...prev.slice(0, level), index]);
      setSelectedPath((prev) => [...prev.slice(0, level), option.value]);
      if (option.children && option.children.length > 0) {
        setActiveMenus((prev) => [...prev.slice(0, level + 1), option.children!]);
      } else {
        setActiveMenus((prev) => prev.slice(0, level + 1));
      }
    }, [expandTrigger]);

    const handleClear = React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      const emptyValue = multiple ? [] : [];
      if (value === undefined) setInternalValue(emptyValue);
      onChange?.(emptyValue, []);
    }, [value, onChange, multiple]);

    const removeSelection = React.useCallback((pathToRemove: string[], e: React.MouseEvent) => {
      e.stopPropagation();
      if (!multiple) return;
      const newValue = normalizedValue.filter((path) => !(path.length === pathToRemove.length && path.every((val, idx) => val === pathToRemove[idx])));
      const newSelectedOptions = newValue.map((path) => getSelectedOptions(path));
      setInternalValue(newValue);
      onChange?.(newValue, newSelectedOptions);
    }, [multiple, normalizedValue, value, onChange, getSelectedOptions]);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); handleOpenChange(true) }
        return;
      }
      switch (e.key) {
        case "Escape": e.preventDefault(); handleOpenChange(false); break;
        case "ArrowDown":
          e.preventDefault();
          if (focusedIndex === null) { setFocusedIndex({ level: 0, index: 0 }) }
          else { const m = activeMenus[focusedIndex.level]; if (m && focusedIndex.index < m.length - 1) setFocusedIndex({ ...focusedIndex, index: focusedIndex.index + 1 }) }
          break;
        case "ArrowUp": e.preventDefault(); if (focusedIndex && focusedIndex.index > 0) setFocusedIndex({ ...focusedIndex, index: focusedIndex.index - 1 }); break;
        case "ArrowRight":
          e.preventDefault();
          if (focusedIndex) { const m = activeMenus[focusedIndex.level]; const o = m?.[focusedIndex.index]; if (o?.children?.length) { setActiveMenus((prev) => [...prev.slice(0, focusedIndex.level + 1), o.children!]); setFocusedIndex({ level: focusedIndex.level + 1, index: 0 }) } }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (focusedIndex && focusedIndex.level > 0) { const pl = focusedIndex.level - 1; setActiveMenus((prev) => prev.slice(0, focusedIndex.level)); setFocusedIndex({ level: pl, index: hoveredPath[pl] ?? 0 }) }
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex) { const m = activeMenus[focusedIndex.level]; const o = m?.[focusedIndex.index]; if (o) handleItemClick(o, focusedIndex.level) }
          break;
      }
    }, [isOpen, focusedIndex, activeMenus, handleOpenChange, handleItemClick, hoveredPath]);

    const displayValue = React.useMemo(() => {
      if (normalizedValue.length === 0) return null;
      if (displayRender) {
        if (multiple) {
          return displayRender(normalizedValue.map((path) => getSelectedOptions(path).map((opt) => opt.label)), normalizedValue.map((path) => getSelectedOptions(path)));
        }
        const so = getSelectedOptions(normalizedValue[0] || []);
        return displayRender(so.map((opt) => opt.label), so);
      }
      if (!multiple) {
        const so = getSelectedOptions(normalizedValue[0] || []);
        const labels = so.map((opt) => opt.label);
        return showPath ? labels.join(pathSeparator) : labels[labels.length - 1] || null;
      }
      return null;
    }, [normalizedValue, displayRender, getSelectedOptions, multiple, showPath, pathSeparator]);

    const showClearButton = clearable && normalizedValue.length > 0 && normalizedValue[0]?.[0] && !disabled && !loading;

    const renderTriggerContent = () => {
      if (multiple && normalizedValue.length > 0) {
        const visibleTags = normalizedValue.slice(0, maxTagCount);
        const remainingCount = normalizedValue.length - maxTagCount;
        return (
          <div className="flex-1 flex flex-wrap gap-1 items-center min-h-0 overflow-hidden">
            {visibleTags.map((path, idx) => {
              const selectedOpts = getSelectedOptions(path);
              const tagLabel = showPath ? selectedOpts.map((o) => o.label).join(pathSeparator) : selectedOpts[selectedOpts.length - 1]?.label || "";
              if (tagRender) return <React.Fragment key={idx}>{tagRender({ label: tagLabel, value: path, closable: !disabled, onClose: () => removeSelection(path, { stopPropagation: () => {} } as React.MouseEvent) })}</React.Fragment>;
              return (
                <span key={idx} className={cn("inline-flex items-center gap-1 rounded whitespace-nowrap", colorVars[color], 'bg-slot-10 text-slot', tagSizeClasses[size])}>
                  <span className="truncate max-w-[150px]">{tagLabel}</span>
                  {!disabled && <button type="button" onClick={(e) => removeSelection(path, e)} className="hover:text-error shrink-0"><X className="h-3 w-3" /></button>}
                </span>
              );
            })}
            {remainingCount > 0 && <span className={cn("inline-flex items-center bg-surface text-text-secondary rounded whitespace-nowrap", tagSizeClasses[size])}>+{remainingCount}</span>}
          </div>
        );
      }
      return <span className={cn("truncate flex-1", !displayValue && "text-text-secondary")}>{displayValue || placeholder}</span>;
    };

    const popoverSide = placement.startsWith("top") ? "top" : "bottom";
    const popoverAlign = placement.endsWith("Right") ? "end" : "start";

    return (
      <div className={cn("flex flex-col", fullWidth ? "w-full" : "inline-block")}>
        <div className="flex gap-2 items-center mb-0.5">
          {label && <label className="text-sm font-medium text-text-secondary">{label}{required && <span className="text-error ml-1">*</span>}</label>}
          {helperMessage && messagePosition === "top" && (
            <span className={statusMessageVariants({ status })}>{helperMessage}</span>
          )}
        </div>
        <div ref={containerRef} className={cn("relative cascader_root", fullWidth ? "w-full" : "inline-block", classNames?.root)} data-slot="root">
          <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverPrimitive.Trigger asChild>
              <div
                ref={ref}
                className={cn(cascaderTriggerVariants({ status, size, fullWidth }), colorVars[color], 'focus-visible:ring-slot', disabled && "opacity-50 cursor-not-allowed", loading && "opacity-50 pointer-events-none", "cascader_trigger", classNames?.trigger, className)}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-disabled={disabled}
                aria-label={label || placeholder}
                data-slot="trigger"
              >
                {renderTriggerContent()}
                <div className="flex items-center gap-1 text-text-secondary shrink-0">
                  {loading && <Loader2 className={cn("animate-spin text-text-secondary", iconSizes[size])} />}
                  {!loading && showClearButton && <button type="button" onClick={handleClear} className="hover:text-text-primary" aria-label="Clear selection"><X className={iconSizes[size]} /></button>}
                  {!loading && <ChevronDown className={cn("transition-transform", iconSizes[size], isOpen && "rotate-180")} />}
                </div>
              </div>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
              <PopoverPrimitive.Content
                side={popoverSide}
                align={popoverAlign}
                sideOffset={4}
                className="z-[var(--z-popover)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 duration-200"
              >
                <CascaderMenu
                  activeMenus={activeMenus}
                  selectedPath={selectedPath}
                  hoveredPath={hoveredPath}
                  focusedIndex={focusedIndex}
                  selectedPathSet={selectedPathSet}
                  selectionStateMap={selectionStateMap}
                  size={size}
                  color={color}
                  multiple={multiple}
                  expandTrigger={expandTrigger}
                  emptyContent={emptyContent}
                  onItemClick={handleItemClick}
                  onItemHover={handleItemHover}
                  classNames={classNames}
                  menuRefs={menuRefs}
                />
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          </PopoverPrimitive.Root>
        </div>
        {helperMessage && messagePosition === "bottom" && (
          <span className={cn(statusMessageVariants({ status }), "mt-0.5")}>{helperMessage}</span>
        )}
      </div>
    );
  },
);

Cascader.displayName = "Cascader";

export type * from "./types";
export default Cascader;
