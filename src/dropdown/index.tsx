"use client";

import { cva } from "class-variance-authority";
import React, {
  useCallback,
  useRef,
  useId,
  useState,
  useEffect,
  useMemo,
} from "react";

import { useRipple, RippleContainer } from "../hooks/useRipple";
import { useMenuNavigation } from "../hooks/useMenuNavigation";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "../utils";
import { colorVars } from "../variants";
import type { DropdownProps } from "./types";

const dropdownItemVariants = cva(
  "cursor-pointer select-none text-text-primary transition-colors flex items-center gap-2 rounded-sm outline-none",
  {
    variants: {
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

const DropdownItemDiv: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  disabled?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}> = ({
  children,
  disabled,
  className,
  onKeyDown: externalOnKeyDown,
  ref,
  ...props
}) => {
  const {
    ripples,
    onPointerDown,
    onKeyDown: rippleOnKeyDown,
    onAnimationEnd,
  } = useRipple(!disabled);
  return (
    <div
      ref={ref}
      className={cn(className, "relative overflow-hidden")}
      onPointerDown={onPointerDown}
      onKeyDown={(e) => {
        rippleOnKeyDown(e);
        externalOnKeyDown?.(e);
      }}
      {...props}
    >
      {children}
      <RippleContainer ripples={ripples} onAnimationEnd={onAnimationEnd} />
    </div>
  );
};

const Dropdown = React.memo<DropdownProps>(
  ({
    children,
    items,
    render,
    color = "default",
    size = "md",
    position = "left",
    maxHeight = 300,
    disabled = false,
    fullWidth = false,
    hover = false,
    className,
    classNames,
    onItemClick,
    ref,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const uniqueId = useId();
    const menuId = `dropdown-menu-${uniqueId}`;
    const triggerId = `dropdown-trigger-${uniqueId}`;

    const enabledIndices = useMemo(
      () =>
        items
          ?.map((item, i) => (!item.disabled ? i : -1))
          .filter((i) => i !== -1) || [],
      [items],
    );

    const handleItemClick = useCallback(
      (item: NonNullable<typeof items>[0]) => {
        if (!item.disabled) {
          item.onClick?.();
          if (item.value !== undefined) {
            onItemClick?.(item.value);
          }
          setIsOpen(false);
        }
      },
      [onItemClick],
    );

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleOpen = useCallback(() => {
      if (!disabled) {
        setIsOpen(true);
      }
    }, [disabled]);

    const handleToggle = useCallback(() => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    }, [disabled]);

    const onMenuSelect = useCallback(
      (index: number) => {
        if (items?.[index]) handleItemClick(items[index]);
      },
      [items, handleItemClick],
    );

    const {
      highlightedIndex,
      setHighlightedIndex,
      handleKeyDown,
    } = useMenuNavigation({
      enabledIndices,
      isOpen,
      onClose: handleClose,
      onSelect: onMenuSelect,
      onOpen: handleOpen,
    });

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
        itemRefs.current[highlightedIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [highlightedIndex]);

    const wrappedKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || !items?.length) return;
        handleKeyDown(e);
      },
      [disabled, items, handleKeyDown],
    );

    return (
      <div
        ref={ref}
        data-slot="dropdown"
        className={cn(
          "dropdown_root relative",
          fullWidth ? "w-full" : "inline-block",
          className,
          classNames?.root,
        )}
        onMouseEnter={hover ? handleOpen : undefined}
        onMouseLeave={hover ? handleClose : undefined}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div
              id={triggerId}
              data-slot="dropdown-trigger"
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-controls={isOpen ? menuId : undefined}
              aria-disabled={disabled}
              onClick={hover ? undefined : handleToggle}
              onKeyDown={wrappedKeyDown}
              className={cn(
                "dropdown_trigger flex outline-none",
                !hover && "cursor-pointer",
                fullWidth && "w-full",
                disabled && "opacity-50 cursor-not-allowed",
                classNames?.trigger,
              )}
            >
              {children}
            </div>
          </PopoverTrigger>

          <PopoverContent
            className="p-0 min-w-[140px]"
            align={position === "left" ? "start" : "end"}
            sideOffset={4}
            color={color}
            style={{ maxHeight }}
            onOpenAutoFocus={(e: Event) => e.preventDefault()}
          >
            <div
              ref={menuRef}
              id={menuId}
              data-slot="dropdown-menu"
              role="menu"
              aria-labelledby={triggerId}
              className={cn("dropdown_menu overflow-auto", colorVars[color], classNames?.menu)}
              style={{ maxHeight }}
              onKeyDown={wrappedKeyDown}
            >
              {render
                ? render({ close: handleClose })
                : items?.map((item, idx) => (
                    <DropdownItemDiv
                      key={`${item.value}-${idx}`}
                      ref={(el: HTMLDivElement | null) => {
                        itemRefs.current[idx] = el;
                      }}
                      data-slot="dropdown-item"
                      role="menuitem"
                      tabIndex={item.disabled ? -1 : 0}
                      aria-disabled={item.disabled}
                      disabled={!!item.disabled}
                      className={cn(
                        "dropdown_item",
                        dropdownItemVariants({
                          size,
                          disabled: !!item.disabled,
                        }),
                        !item.disabled && 'hover:bg-slot-10 hover:text-slot focus-visible:bg-slot-10 focus-visible:text-slot',
                        highlightedIndex === idx &&
                          !item.disabled &&
                          'bg-slot-10 text-slot',
                        classNames?.item,
                      )}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => !item.disabled && setHighlightedIndex(idx)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleItemClick(item);
                        }
                      }}
                    >
                      {item.icon && (
                        <span
                          data-slot="dropdown-item-icon"
                          className={cn(
                            "dropdown_itemIcon shrink-0",
                            classNames?.itemIcon,
                          )}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      <span
                        data-slot="dropdown-item-label"
                        className={cn(
                          "dropdown_itemLabel flex-1",
                          classNames?.itemLabel,
                        )}
                      >
                        {item.label}
                      </span>
                    </DropdownItemDiv>
                  ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export type * from "./types";
export default Dropdown;
