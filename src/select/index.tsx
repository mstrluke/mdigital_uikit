"use client";

import { cva } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import React from "react";
import { useControllable } from "../hooks/useControllable";

import Spinner from "../spinner";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { colorVars } from "../variants";
import { useSelectBase } from "../shared/useSelectBase";
import type { FlattenedItem } from "../shared/useSelectBase";
import { cn, iconSizes, statusMessageVariants } from "../utils";
import type { SelectOption, SelectProps } from "./types";

const selectTriggerVariants = cva(
  "w-full flex items-center justify-between rounded-md bg-background text-text-primary border focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors",
  {
    variants: {
      status: {
        default: "border-border hover:border-primary/50",
        error: "border-error",
        warning: "border-warning",
        info: "border-info",
        success: "border-success",
      },
      size: {
        xs: "h-(--select-height-xs) px-(--select-padding-x-xs) text-xs gap-1.5",
        sm: "h-(--select-height-sm) px-(--select-padding-x-sm) text-sm gap-2",
        md: "h-(--select-height-md) px-(--select-padding-x-md) text-base gap-2.5",
        lg: "h-(--select-height-lg) px-(--select-padding-x-lg) text-lg gap-3",
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

const selectOptionVariants = cva(
  "relative cursor-pointer select-none px-3 py-2 text-text-primary rounded-sm transition-colors",
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

const selectGroupVariants = cva(
  "px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider bg-surface/50",
);

const Select = React.memo<SelectProps>(
  ({
    size = "md",
    label,
    helperText,
    error,
    warning,
    info,
    success,
    options = [],
    placeholder = "Select an option",
    loading = false,
    fullWidth = true,
    value,
    defaultValue,
    onChange,
    clearable = false,
    disabled,
    required,
    virtualizeThreshold = 50,
    maxDropdownHeight = 300,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const [currentValue, setCurrentValue] = useControllable<string | number>({
      value,
      defaultValue: defaultValue ?? "",
      onChange,
    });

    const {
      // State
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      setHighlightedIndex,
      highlightedIndex,
      showTopArrow,
      showBottomArrow,
      // Refs
      triggerRef,
      inputRef,
      scrollContainerRef,
      // Computed
      filteredOptions,
      selectableOptions,
      shouldVirtualize,
      virtualizer,
      // IDs & validation
      labelId,
      listboxId,
      helperId,
      status,
      helperMessage,
      // Handlers
      handleInputChange,
      handleInputClick,
      handleScroll,
      handleKeyDown,
      handleKeyUp,
      refCallback,
    } = useSelectBase<SelectOption>({
      options,
      onSelectOption: (option) => handleSelect(option.value),
      virtualizeThreshold,
      maxDropdownHeight,
      label,
      idPrefix: "select",
      error,
      warning,
      info,
      success,
      helperText,
    });

    const handleSelect = React.useCallback(
      (optionValue: string | number) => {
        setCurrentValue(optionValue);
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      },
      [setCurrentValue, setIsOpen, setSearchQuery, setHighlightedIndex],
    );

    const selectedOption = React.useMemo(
      () => options.find((opt) => opt.value === currentValue),
      [options, currentValue],
    );
    const displayValue = isOpen ? searchQuery : selectedOption?.label || "";

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentValue("");
        setSearchQuery("");
        setHighlightedIndex(-1);
      },
      [setCurrentValue, setSearchQuery, setHighlightedIndex],
    );

    const handleOptionClick = React.useCallback(
      (optionValue: string | number) => {
        handleSelect(optionValue);
      },
      [handleSelect],
    );

    const renderOptionsList = (
        <div className="relative">
          {/* Top scroll indicator */}
          <div className="flex items-center justify-center h-4">
            {showTopArrow && (
              <ChevronUp className="size-4 text-text-primary animate-in fade-in duration-150" />
            )}
          </div>

          <div
            ref={scrollContainerRef}
            className="overflow-auto relative p-1"
            style={{ maxHeight: maxDropdownHeight }}
            role="listbox"
            id={listboxId}
            aria-labelledby={label ? labelId : undefined}
            onScroll={handleScroll}
          >
            {!filteredOptions.length ? (
              <div
                data-slot="empty"
                className={cn(
                  "select_empty",
                  "px-3 py-4 text-center text-sm text-text-secondary",
                  classNames?.empty,
                )}
              >
                No options found
              </div>
            ) : shouldVirtualize ? (
              <div
                ref={refCallback}
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const item = filteredOptions[virtualItem.index];

                  if (!item) return null;

                  if (item.type === "group") {
                    return (
                      <div
                        key={`group-${virtualItem.index}`}
                        data-slot="group"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                        className={cn(
                          "select_group",
                          selectGroupVariants(),
                          classNames?.group,
                        )}
                      >
                        <span
                          data-slot="groupLabel"
                          className={cn(
                            "select_groupLabel",
                            classNames?.groupLabel,
                          )}
                        >
                          {item.data as string}
                        </span>
                      </div>
                    );
                  }

                  const option = item.data as SelectOption;
                  const isSelected = option.value === currentValue;
                  const selectableIndex = selectableOptions.indexOf(
                    item as FlattenedItem<SelectOption>,
                  );
                  const isHighlighted = selectableIndex === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      data-slot="option"
                      data-value={option.value}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      className={cn(
                        "select_option",
                        selectOptionVariants({
                          selected: isSelected,
                          disabled: !!option.disabled,
                        }),
                        isHighlighted && "bg-surface",
                        classNames?.option,
                        isSelected && classNames?.optionSelected,
                      )}
                      onClick={() =>
                        !option.disabled && handleOptionClick(option.value)
                      }
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                    >
                      {option.label}
                      {isSelected && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Check
                            className={cn(
                              "text-slot animate-in zoom-in-75 duration-150",
                              iconSizes[size],
                            )}
                          />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                {filteredOptions.map((item, index) => {
                  if (item.type === "group") {
                    return (
                      <div
                        key={`group-${index}`}
                        data-slot="group"
                        className={cn(
                          "select_group",
                          selectGroupVariants(),
                          classNames?.group,
                        )}
                      >
                        <span
                          data-slot="groupLabel"
                          className={cn(
                            "select_groupLabel",
                            classNames?.groupLabel,
                          )}
                        >
                          {item.data as string}
                        </span>
                      </div>
                    );
                  }

                  const option = item.data as SelectOption;
                  const isSelected = option.value === currentValue;
                  const selectableIndex = selectableOptions.indexOf(
                    item as FlattenedItem<SelectOption>,
                  );
                  const isHighlighted = selectableIndex === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      data-slot="option"
                      data-value={option.value}
                      data-option-index={index}
                      className={cn(
                        "select_option",
                        selectOptionVariants({
                          selected: isSelected,
                          disabled: !!option.disabled,
                        }),
                        isHighlighted && "bg-surface",
                        classNames?.option,
                        isSelected && classNames?.optionSelected,
                      )}
                      onClick={() =>
                        !option.disabled && handleOptionClick(option.value)
                      }
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                    >
                      {option.label}
                      {isSelected && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Check
                            className={cn(
                              "text-slot animate-in zoom-in-75 duration-150",
                              iconSizes[size],
                            )}
                          />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom scroll indicator */}
          <div className="flex items-center justify-center h-4">
            {showBottomArrow && (
              <ChevronDown className="size-4 text-text-primary animate-in fade-in duration-150" />
            )}
          </div>
        </div>
    );

    // Trigger button (used in both desktop and mobile)
    const triggerButton = (
      <button
        ref={triggerRef}
        type="button"
        data-slot="trigger"
        className={cn(
          "select_trigger",
          selectTriggerVariants({ status, size, fullWidth }),
          loading && "opacity-50",
          className,
          classNames?.trigger,
        )}
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={helperMessage ? helperId : undefined}
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          data-slot="search"
          className={cn(
            "select_search",
            "w-full text-ellipsis flex-1 bg-transparent outline-none cursor-pointer placeholder:text-text-secondary/50",
            classNames?.search,
          )}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={disabled || loading}
          readOnly={!isOpen}
          tabIndex={0}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
        />
        <div
          data-slot="triggerIcon"
          className={cn(
            "select_triggerIcon",
            "flex items-center gap-1 text-text-secondary",
            classNames?.triggerIcon,
          )}
        >
          {clearable && currentValue && !disabled && !loading && (
            <span
              role="button"
              tabIndex={-1}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
              className="hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Clear selection"
            >
              <X className={iconSizes[size]} />
            </span>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <>
              {isOpen ? (
                <Search className={iconSizes[size]} />
              ) : (
                <ChevronDown className={iconSizes[size]} />
              )}
            </>
          )}
        </div>
      </button>
    );

    const selectElement = (
      <div
        data-slot="root"
        className={cn(
          "select_root",
          "relative group",
          colorVars.primary,
          fullWidth ? "w-full" : "inline-block",
          classNames?.root,
        )}
        ref={ref}
        {...props}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>

          <PopoverContent
            data-slot="dropdown"
            className={cn(
              "select_dropdown",
              "p-0 w-[var(--radix-popover-trigger-width)]",
              classNames?.dropdown,
            )}
            align="start"
            onOpenAutoFocus={(e: Event) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
          >
            {renderOptionsList}
          </PopoverContent>
        </Popover>
      </div>
    );

    return (
      <div className={cn("w-full flex flex-col", !fullWidth && "inline-block")}>
        <div className="flex gap-2 items-center">
          {label && (
            <label
              id={labelId}
              data-slot="label"
              className={cn("select_label", "block mb-0.5", classNames?.label)}
            >
              <span className="text-sm font-medium text-text-secondary">
                {label}
                {required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
          )}
          {helperMessage && (
            <p
              id={helperId}
              data-slot="helper"
              className={cn(
                "select_helper",
                statusMessageVariants({ status }),
                classNames?.helper,
              )}
            >
              {helperMessage}
            </p>
          )}
        </div>
        {selectElement}
      </div>
    );
  },
);

Select.displayName = "Select";

export type * from "./types";
export default Select;
