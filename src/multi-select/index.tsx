"use client";

import { Check, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import React from "react";
import { useControllable } from "../hooks/useControllable";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Spinner from "../spinner";
import { useSelectBase } from "../shared/useSelectBase";
import type { FlattenedItem } from "../shared/useSelectBase";
import { cn, iconSizes, statusMessageVariants } from "../utils";
import { colorVars } from "../variants";
import type { MultiSelectOption, MultiSelectProps } from "./types";
import {
  multiSelectGroupVariants,
  multiSelectOptionVariants,
  multiSelectTriggerVariants,
} from "./utils";

const MultiSelect = React.memo<MultiSelectProps>(
  ({
    size = "md",
    label,
    helperText,
    error,
    warning,
    info,
    success,
    options = [],
    placeholder = "Select options",
    loading = false,
    fullWidth = true,
    maxChipsVisible = 3,
    value,
    defaultValue,
    onChange,
    disabled,
    required,
    clearable = false,
    virtualizeThreshold = 50,
    maxDropdownHeight = 300,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const [controlledVal, setCurrentValue] = useControllable<string[]>({
      value,
      defaultValue: defaultValue ?? [],
      onChange,
    });
    const currentValue = controlledVal ?? [];
    const [visibleChipsCount, setVisibleChipsCount] =
      React.useState(maxChipsVisible);

    const handleSelectRef = React.useRef<(optionValue: string) => void>(() => {});

    const {
      // State
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery: _setSearchQuery,
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
    } = useSelectBase<MultiSelectOption>({
      options,
      onSelectOption: (option) => handleSelectRef.current(option.value),
      virtualizeThreshold,
      maxDropdownHeight,
      label,
      idPrefix: "multiselect",
      error,
      warning,
      info,
      success,
      helperText,
    });

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        const newValue = (currentValue || []).includes(optionValue)
          ? (currentValue || []).filter((v) => v !== optionValue)
          : [...(currentValue || []), optionValue];
        setCurrentValue(newValue);
        setHighlightedIndex(-1);
      },
      [currentValue, setCurrentValue, setHighlightedIndex],
    );

    handleSelectRef.current = handleSelect;

    const selectedOptions = React.useMemo(() => {
      const valueSet = new Set(currentValue);
      return options.filter((opt) => valueSet.has(opt.value));
    }, [options, currentValue]);

    const handleRemoveChip = React.useCallback(
      (optionValue: string, e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        const newValue = (currentValue || []).filter((v) => v !== optionValue);
        setCurrentValue(newValue);
      },
      [currentValue, setCurrentValue],
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentValue([]);
      },
      [setCurrentValue],
    );

    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !searchQuery && currentValue.length > 0) {
          e.preventDefault();
          const lastValue = currentValue[currentValue.length - 1];
          handleRemoveChip(lastValue!, e);
        } else {
          handleKeyDown(e);
        }
      },
      [searchQuery, currentValue, handleRemoveChip, handleKeyDown],
    );

    React.useEffect(() => {
      if (selectedOptions.length === 0 || !triggerRef.current) {
        setVisibleChipsCount(maxChipsVisible);
        return;
      }

      const calculateVisibleChips = () => {
        const container = triggerRef.current;
        if (!container) return;

        const hiddenChips = container.querySelectorAll("[data-hidden-chip]");
        if (hiddenChips.length === 0) return;

        const containerWidth = container.offsetWidth;
        const padding =
          size === "sm" ? 12 : size === "md" ? 16 : size === "lg" ? 20 : 24;
        const chevronWidth = 32;
        const gap = 4;
        const plusIndicatorWidth = 50;

        const availableWidth = containerWidth - padding * 2 - chevronWidth;
        let totalWidth = 0;
        let visibleCount = 0;

        for (let i = 0; i < hiddenChips.length; i++) {
          const chip = hiddenChips[i];
          if (!chip) continue;
          const chipWidth = chip.getBoundingClientRect().width;
          const requiredSpace =
            totalWidth + chipWidth + (visibleCount > 0 ? gap : 0);

          const needsPlusIndicator = i < hiddenChips.length - 1;
          const spaceWithIndicator =
            requiredSpace + (needsPlusIndicator ? gap + plusIndicatorWidth : 0);

          if (spaceWithIndicator <= availableWidth) {
            totalWidth = requiredSpace;
            visibleCount++;
          } else {
            break;
          }
        }

        setVisibleChipsCount(Math.max(1, visibleCount));
      };

      const timeoutId = setTimeout(calculateVisibleChips, 0);

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(calculateVisibleChips);
      });

      if (triggerRef.current) {
        resizeObserver.observe(triggerRef.current);
      }

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }, [currentValue.length, size, maxChipsVisible, triggerRef]);

    const handleOptionClick = React.useCallback(
      (optionValue: string) => {
        handleSelect(optionValue);
      },
      [handleSelect],
    );

    const renderOptionsList = (
        <div className="relative" data-slot="multiSelect_dropdown">
          {/* Top scroll indicator */}
          {showTopArrow && (
            <div className="flex items-center justify-center">
              <ChevronUp className="h-4 w-4 text-text-primary" />
            </div>
          )}

          <div
            ref={scrollContainerRef}
            className={cn("overflow-auto relative p-1", classNames?.dropdown)}
            style={{ maxHeight: maxDropdownHeight }}
            role="listbox"
            id={listboxId}
            aria-multiselectable="true"
            aria-labelledby={label ? labelId : undefined}
            onScroll={handleScroll}
          >
            {filteredOptions.length === 0 ? (
              <div
                className={cn(
                  "multiSelect_empty px-3 py-4 text-center text-sm text-text-secondary",
                  classNames?.empty,
                )}
                data-slot="multiSelect_empty"
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

                  if (item?.type === "group") {
                    return (
                      <div
                        key={`group-${virtualItem.index}`}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                        className={multiSelectGroupVariants()}
                      >
                        {item?.data as string}
                      </div>
                    );
                  }

                  const option = item?.data as MultiSelectOption;
                  const isSelected = currentValue.includes(option.value);
                  const selectableIndex = selectableOptions.indexOf(
                    item as FlattenedItem<MultiSelectOption>,
                  );
                  const isHighlighted = selectableIndex === highlightedIndex;

                  return (
                    <div
                      key={option.value}
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
                        "multiSelect_option",
                        multiSelectOptionVariants({
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
                      data-slot="multiSelect_option"
                    >
                      {option.label}
                      {isSelected && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Check
                            className={cn("text-slot", iconSizes[size])}
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
                        className={multiSelectGroupVariants()}
                      >
                        {item.data as string}
                      </div>
                    );
                  }

                  const option = item.data as MultiSelectOption;
                  const isSelected = currentValue.includes(option.value);
                  const selectableIndex = selectableOptions.indexOf(
                    item as FlattenedItem<MultiSelectOption>,
                  );
                  const isHighlighted = selectableIndex === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      data-value={option.value}
                      data-option-index={index}
                      className={cn(
                        "multiSelect_option",
                        multiSelectOptionVariants({
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
                      data-slot="multiSelect_option"
                    >
                      {option.label}
                      {isSelected && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Check className={cn("text-slot", iconSizes[size])} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom scroll indicator */}
          {showBottomArrow && (
            <div className="flex items-center justify-center">
              <ChevronDown className="h-4 w-4 text-text-primary" />
            </div>
          )}
        </div>
    );

    // Trigger button (used in both desktop and mobile)
    const triggerButton = (
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "multiSelect_trigger",
          multiSelectTriggerVariants({ status, size, fullWidth }),
          loading && "opacity-50",
          classNames?.trigger,
          className,
        )}
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={helperMessage ? helperId : undefined}
        data-slot="multiSelect_trigger"
      >
        {selectedOptions.length > 0 && (
          <div className="flex gap-1 shrink-0">
            {selectedOptions.slice(0, visibleChipsCount).map((option) => (
              <span
                key={option.value}
                className={cn(
                  "multiSelect_tag inline-flex items-center gap-1 px-2 bg-slot-10 text-slot rounded text-sm whitespace-nowrap",
                  classNames?.tag,
                )}
                data-slot="multiSelect_tag"
              >
                {option.label}
                <span
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  onClick={(e) => handleRemoveChip(option.value, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRemoveChip(
                        option.value,
                        e as unknown as React.MouseEvent,
                      );
                    }
                  }}
                  className={cn(
                    "multiSelect_tagRemove hover:text-error cursor-pointer",
                    disabled && "pointer-events-none",
                    classNames?.tagRemove,
                  )}
                  aria-disabled={disabled}
                  data-slot="multiSelect_tagRemove"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))}
            {selectedOptions.length > visibleChipsCount && (
              <span className="inline-flex items-center px-2 py-0.5 bg-surface text-text-secondary rounded text-sm whitespace-nowrap">
                +{selectedOptions.length - visibleChipsCount}
              </span>
            )}
          </div>
        )}
        <div
          className="absolute opacity-0 pointer-events-none whitespace-nowrap"
          aria-hidden="true"
        >
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              data-hidden-chip
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slot-10 text-slot rounded text-sm whitespace-nowrap"
            >
              {option.label}
              <X className="h-3 w-3" />
            </span>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          className="bg-transparent outline-none cursor-pointer placeholder:text-text-secondary/50 flex-1 min-w-0 pointer-events-none"
          placeholder={selectedOptions.length > 0 ? "" : placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          onKeyUp={handleKeyUp}
          disabled={disabled || loading}
          readOnly={!isOpen}
          tabIndex={0}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
        />
        <div className="flex items-center gap-1 text-text-secondary">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {clearable && selectedOptions.length > 0 && !disabled && (
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
        className={cn(
          "multiSelect_root relative group",
          colorVars.primary,
          fullWidth ? "w-full" : "inline-block",
          classNames?.root,
        )}
        ref={ref}
        data-slot="multiSelect_root"
        {...props}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>

          <PopoverContent
            className="p-0 w-(--radix-popover-trigger-width)"
            align="start"
            sideOffset={4}
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
              className={cn(
                "multiSelect_label block mb-0.5",
                classNames?.label,
              )}
              data-slot="multiSelect_label"
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
              className={cn(
                "multiSelect_helper",
                statusMessageVariants({ status }),
                classNames?.helper,
              )}
              data-slot="multiSelect_helper"
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

MultiSelect.displayName = "MultiSelect";

export type * from "./types";
export default MultiSelect;
