"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ChevronRight } from "lucide-react";

import { useRipple, RippleContainer } from "../hooks/useRipple";
import { useMenuNavigation } from "../hooks/useMenuNavigation";
import { cn } from "../utils";
import { colorVars } from "../variants";
import type {
  ContextMenuContentProps,
  ContextMenuProps,
  ContextMenuSubMenuProps,
} from "./types";

const ContextMenuItemDiv: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    disabled?: boolean;
  }
> = ({ children, disabled, className, ...props }) => {
  const { ripples, onPointerDown, onAnimationEnd } = useRipple(!disabled);
  return (
    <div
      className={cn(className, "relative overflow-hidden")}
      onPointerDown={onPointerDown}
      {...props}
    >
      {children}
      <RippleContainer ripples={ripples} onAnimationEnd={onAnimationEnd} />
    </div>
  );
};

/**
 * Submenu component based on Popover
 */
const ContextMenuSubMenu = ({
  item,
  onClose,
  level,
  classNames,
  color = "default",
  openDelay = 200,
  closeDelay = 300,
}: ContextMenuSubMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleMouseEnter = useCallback(() => {
    if (item.disabled) return;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  }, [item.disabled, openDelay]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!item.disabled && !item.children) {
        e.stopPropagation();
        item.onClick?.();
        onClose();
      }
    },
    [item, onClose],
  );

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-disabled={item.disabled}
          tabIndex={-1}
          data-slot="submenu-trigger"
        >
          <ContextMenuItemDiv
            disabled={!!item.disabled}
            className={cn(
              "contextMenu_item flex items-center justify-between gap-3 px-3 py-2 text-sm cursor-pointer rounded-sm transition-colors mx-1",
              item.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slot-10 hover:text-slot focus-visible:bg-slot-10 focus-visible:text-slot focus-visible:outline-none",
              classNames?.item,
            )}
            onClick={handleClick}
          >
            <div className="flex items-center gap-2 flex-1">
              {item.icon && (
                <span
                  className={cn(
                    "contextMenu_itemIcon shrink-0 w-4 h-4",
                    classNames?.itemIcon,
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span
                className={cn("contextMenu_itemLabel", classNames?.itemLabel)}
              >
                {item.label}
              </span>
            </div>
            {item.children && (
              <ChevronRight className="w-4 h-4 text-text-secondary shrink-0" />
            )}
            {item.shortcut && (
              <span className="text-xs text-text-secondary shrink-0">
                {item.shortcut}
              </span>
            )}
          </ContextMenuItemDiv>
        </div>
      </PopoverPrimitive.Trigger>

      {item.children && (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="right"
            align="start"
            sideOffset={4}
            alignOffset={-4}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2",
              "z-(--z-popover)",
              classNames?.submenu,
            )}
          >
            <ContextMenuContent
              items={item.children}
              onClose={onClose}
              level={level + 1}
              classNames={classNames}
              color={color}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </PopoverPrimitive.Root>
  );
};

ContextMenuSubMenu.displayName = "ContextMenuSubMenu";

/**
 * Context menu content component
 */
const ContextMenuContent = ({
  items,
  onClose,
  level = 0,
  className,
  classNames,
  style,
  color = "default",
  submenuOpenDelay,
  submenuCloseDelay,
  ...props
}: ContextMenuContentProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const enabledIndices = useMemo(
    () =>
      items
        .map((item, i) => (!item.separator && !item.disabled ? i : -1))
        .filter((i) => i !== -1),
    [items],
  );

  const onMenuSelect = useCallback(
    (index: number) => {
      const item = items[index];
      if (item && !item.children) {
        item.onClick?.();
        onClose();
      }
    },
    [items, onClose],
  );

  const { highlightedIndex, handleKeyDown, highlightFirst } = useMenuNavigation(
    {
      enabledIndices,
      isOpen: true,
      onClose,
      onSelect: onMenuSelect,
    },
  );

  // Highlight first item on mount
  useEffect(() => {
    highlightFirst();
  }, [highlightFirst]);

  // Document-level keyboard listener (menu is in a portal, no focus bubbling)
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && level > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
        return;
      }
      handleKeyDown(e);
      e.stopImmediatePropagation();
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [handleKeyDown, level, onClose]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "contextMenu_content min-w-[180px] rounded-md border border-border bg-background shadow-lg py-1",
        colorVars[color],
        level === 0 && "animate-in fade-in-0 zoom-in-95",
        className,
        classNames?.content,
      )}
      style={style}
      role="menu"
      aria-orientation="vertical"
      tabIndex={-1}
      {...props}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return (
            <div
              key={`separator-${index}`}
              className={cn(
                "contextMenu_divider h-px bg-border my-1",
                classNames?.divider,
              )}
              role="separator"
              aria-orientation="horizontal"
              data-slot="separator"
            />
          );
        }

        if (item.children) {
          return (
            <ContextMenuSubMenu
              key={item.key}
              item={item}
              onClose={onClose}
              level={level}
              classNames={classNames}
              color={color}
              openDelay={submenuOpenDelay}
              closeDelay={submenuCloseDelay}
            />
          );
        }

        const isFocused = highlightedIndex === index;

        return (
          <ContextMenuItemDiv
            key={item.key}
            disabled={!!item.disabled}
            className={cn(
              "contextMenu_item flex items-center justify-between gap-3 px-3 py-2 text-sm cursor-pointer rounded-sm transition-colors mx-1",
              item.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slot-10 hover:text-slot focus-visible:bg-slot-10 focus-visible:text-slot focus-visible:outline-none",
              isFocused && !item.disabled && "bg-slot-10 text-slot",
              classNames?.item,
            )}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                onClose();
              }
            }}
            role="menuitem"
            tabIndex={-1}
            aria-disabled={item.disabled}
            data-slot="item"
          >
            <div className="flex items-center gap-2 flex-1">
              {item.icon && (
                <span
                  className={cn(
                    "contextMenu_itemIcon shrink-0 w-4 h-4",
                    classNames?.itemIcon,
                  )}
                  data-slot="item-icon"
                >
                  {item.icon}
                </span>
              )}
              <span
                className={cn("contextMenu_itemLabel", classNames?.itemLabel)}
                data-slot="item-label"
              >
                {item.label}
              </span>
            </div>
            {item.shortcut && (
              <span
                className="text-xs text-text-secondary shrink-0"
                data-slot="shortcut"
              >
                {item.shortcut}
              </span>
            )}
          </ContextMenuItemDiv>
        );
      })}
    </div>
  );
};

ContextMenuContent.displayName = "ContextMenuContent";

/**
 * ContextMenu component based on Popover
 */
const ContextMenu = React.memo(
  ({
    children,
    items,
    className,
    classNames,
    disabled = false,
    onOpenChange,
    open: controlledOpen,
    color = "default",
    submenuOpenDelay,
    submenuCloseDelay,
  }: ContextMenuProps) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [position, setPosition] = useState<DOMRect | null>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange],
    );

    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;

        e.preventDefault();
        e.stopPropagation();

        setPosition({
          width: 0,
          height: 0,
          x: e.clientX,
          y: e.clientY,
          top: e.clientY,
          left: e.clientX,
          right: e.clientX,
          bottom: e.clientY,
          toJSON: () => {},
        } as DOMRect);

        setOpen(true);
      },
      [disabled, setOpen],
    );

    const handleClose = useCallback(() => {
      setOpen(false);
      setPosition(null);
    }, [setOpen]);

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
        {position && (
          <PopoverPrimitive.Anchor
            virtualRef={{
              current: {
                getBoundingClientRect: () => position,
              },
            }}
          />
        )}
        <div
          onContextMenu={handleContextMenu}
          className={cn(
            "contextMenu_root inline-block",
            className,
            classNames?.root,
          )}
          role="presentation"
          data-slot="root"
        >
          {children}
        </div>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="start"
            sideOffset={0}
            alignOffset={0}
            onOpenAutoFocus={(e: Event) => e.preventDefault()}
            onCloseAutoFocus={(e: Event) => e.preventDefault()}
            onEscapeKeyDown={handleClose}
            onPointerDownOutside={handleClose}
            onInteractOutside={handleClose}
            className="z-[var(--z-popover)]"
          >
            <ContextMenuContent
              items={items}
              onClose={handleClose}
              classNames={classNames}
              color={color}
              submenuOpenDelay={submenuOpenDelay}
              submenuCloseDelay={submenuCloseDelay}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

ContextMenu.displayName = "ContextMenu";

export type * from "./types";
export { ContextMenu, ContextMenuContent };
export default ContextMenu;
