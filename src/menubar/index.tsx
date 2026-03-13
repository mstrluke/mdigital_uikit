"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";

import { ChevronRight, Check, Circle } from "lucide-react";

import { useMenuNavigation } from "../hooks/useMenuNavigation";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { cn } from "../utils";
import type { MenubarProps, MenubarItem } from "./types";

interface MenuItemsProps {
  items: MenubarItem[];
  classNames?: MenubarProps["classNames"];
  onItemClick: (item: MenubarItem) => void;
  onClose: () => void;
}

const ITEM_CLASS =
  "menubar_item relative flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer transition-colors last:rounded-b-sm first:rounded-t-sm";

const MenuItems = React.memo<MenuItemsProps>(
  ({ items, classNames, onItemClick, onClose }) => {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const hasAnyIcon = useMemo(
      () =>
        items.some(
          (item) =>
            !item.separator &&
            item.type !== "label" &&
            (item.icon || item.type === "checkbox" || item.type === "radio"),
        ),
      [items],
    );

    const enabledIndices = useMemo(
      () =>
        items
          .map((item, i) =>
            !item.separator && item.type !== "label" && !item.disabled ? i : -1,
          )
          .filter((i) => i !== -1),
      [items],
    );

    const onMenuSelect = useCallback(
      (index: number) => {
        const item = items[index];
        if (!item || (item.children && item.children.length > 0)) return;
        onItemClick(item);
      },
      [items, onItemClick],
    );

    const { highlightedIndex, handleKeyDown, highlightFirst } =
      useMenuNavigation({
        enabledIndices,
        isOpen: true,
        onClose,
        onSelect: onMenuSelect,
      });

    // Highlight first item on mount
    useEffect(() => {
      highlightFirst();
    }, [highlightFirst]);

    // Document-level keyboard listener (content is in a portal)
    useEffect(() => {
      const listener = (e: KeyboardEvent) => {
        handleKeyDown(e);
        e.stopImmediatePropagation();
      };
      document.addEventListener("keydown", listener);
      return () => document.removeEventListener("keydown", listener);
    }, [handleKeyDown]);

    return (
      <>
        {items.map((item, idx) => {
          if (item.separator) {
            return (
              <div
                key={item.key || `separator-${idx}`}
                data-slot="separator"
                className={cn(
                  "menubar_separator h-px bg-border my-1 -mx-1",
                  classNames?.separator,
                )}
                role="separator"
              />
            );
          }

          if (item.type === "label") {
            return (
              <div
                key={item.key}
                data-slot="label"
                className={cn(
                  "menubar_label px-3 py-1.5 text-xs font-semibold text-text-secondary mx-1",
                  classNames?.label,
                )}
                role="presentation"
              >
                {item.label}
              </div>
            );
          }

          const isCheckboxOrRadio =
            item.type === "checkbox" || item.type === "radio";
          const hasChildren = item.children && item.children.length > 0;
          const isFocused = highlightedIndex === idx;

          if (hasChildren) {
            return (
              <Popover
                key={item.key}
                open={activeSubmenu === item.key}
                onOpenChange={(open) =>
                  setActiveSubmenu(open ? item.key : null)
                }
              >
                <PopoverTrigger asChild>
                  <div
                    data-slot="item"
                    className={cn(
                      ITEM_CLASS,
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-surface focus-visible:bg-surface focus-visible:outline-none",
                      isFocused && !item.disabled && "bg-surface",
                      classNames?.item,
                    )}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    aria-haspopup="menu"
                    tabIndex={item.disabled ? -1 : 0}
                    onMouseEnter={() =>
                      !item.disabled && setActiveSubmenu(item.key)
                    }
                  >
                    {item.icon ? (
                      <span className="w-4 h-4 shrink-0">{item.icon}</span>
                    ) : (
                      hasAnyIcon && <span className="w-4 h-4 shrink-0" />
                    )}
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-2 shrink-0" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  data-slot="submenu"
                  className={cn(
                    "menubar_submenu min-w-[200px] w-auto p-1 rounded-md",
                    classNames?.submenu,
                  )}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <MenuItems
                    items={item.children!}
                    classNames={classNames}
                    onItemClick={onItemClick}
                    onClose={onClose}
                  />
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <div
              key={item.key}
              data-slot="item"
              className={cn(
                ITEM_CLASS,
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-surface focus-visible:bg-surface focus-visible:outline-none",
                isFocused && !item.disabled && "bg-surface",
                isCheckboxOrRadio && classNames?.checkboxItem,
                item.type === "radio" && classNames?.radioItem,
                classNames?.item,
              )}
              role={
                item.type === "checkbox"
                  ? "menuitemcheckbox"
                  : item.type === "radio"
                    ? "menuitemradio"
                    : "menuitem"
              }
              aria-disabled={item.disabled}
              aria-checked={isCheckboxOrRadio ? item.checked : undefined}
              tabIndex={item.disabled ? -1 : 0}
              onClick={() => !item.disabled && onItemClick(item)}
            >
              {isCheckboxOrRadio && (
                <span className="w-4 h-4 shrink-0">
                  {item.checked && (
                    <>
                      {item.type === "checkbox" && (
                        <Check className="w-4 h-4" />
                      )}
                      {item.type === "radio" && (
                        <Circle className="w-4 h-4 fill-current" />
                      )}
                    </>
                  )}
                </span>
              )}
              {!isCheckboxOrRadio &&
                (item.icon ? (
                  <span className="w-4 h-4 shrink-0">{item.icon}</span>
                ) : (
                  hasAnyIcon && <span className="w-4 h-4 shrink-0" />
                ))}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <span
                  data-slot="shortcut"
                  className={cn(
                    "menubar_shortcut text-xs text-text-secondary ml-auto",
                    classNames?.shortcut,
                  )}
                >
                  {item.shortcut}
                </span>
              )}
            </div>
          );
        })}
      </>
    );
  },
);

MenuItems.displayName = "MenuItems";

const Menubar = React.memo<MenubarProps>(
  ({ menus, className, classNames, ref }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverMode, setHoverMode] = useState(false);

    const handleMenuClick = useCallback(
      (menuKey: string, disabled?: boolean) => {
        if (disabled) return;
        setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
        setHoverMode(true);
      },
      [],
    );

    const handleMenuHover = useCallback(
      (menuKey: string, disabled?: boolean) => {
        if (disabled) return;
        if (hoverMode && activeMenu !== null) {
          setActiveMenu(menuKey);
        }
      },
      [hoverMode, activeMenu],
    );

    const handleClose = useCallback(() => {
      setActiveMenu(null);
      setHoverMode(false);
    }, []);

    const handleItemClick = useCallback(
      (item: MenubarItem) => {
        if (item.type === "checkbox") {
          item.onCheckedChange?.(!item.checked);
        } else if (item.type === "radio") {
          item.onCheckedChange?.(true);
        } else {
          item.onClick?.();
        }
        if (item.type !== "checkbox" && item.type !== "radio") {
          handleClose();
        }
      },
      [handleClose],
    );

    // Top-level menu switching: ArrowLeft/Right and Escape
    useEffect(() => {
      if (!activeMenu) return;

      const handler = (e: KeyboardEvent) => {
        const currentIndex = menus.findIndex((m) => m.key === activeMenu);

        if (e.key === "ArrowRight") {
          e.preventDefault();
          e.stopImmediatePropagation();
          let next = (currentIndex + 1) % menus.length;
          let attempts = 0;
          while (attempts < menus.length && menus[next]?.disabled) {
            next = (next + 1) % menus.length;
            attempts++;
          }
          const nextMenu = menus[next];
          if (attempts < menus.length && nextMenu && !nextMenu.disabled) {
            setActiveMenu(nextMenu.key);
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          e.stopImmediatePropagation();
          let prev = currentIndex - 1 < 0 ? menus.length - 1 : currentIndex - 1;
          let attempts = 0;
          while (attempts < menus.length && menus[prev]?.disabled) {
            prev = prev - 1 < 0 ? menus.length - 1 : prev - 1;
            attempts++;
          }
          const prevMenu = menus[prev];
          if (attempts < menus.length && prevMenu && !prevMenu.disabled) {
            setActiveMenu(prevMenu.key);
          }
        }
      };

      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [activeMenu, menus]);

    return (
      <div
        ref={ref}
        data-slot="root"
        className={cn(
          "menubar_root flex items-center gap-1 px-2 py-1 bg-background border-b border-border",
          className,
          classNames?.root,
        )}
        role="menubar"
      >
        {menus.map((menu) => (
          <Popover
            key={menu.key}
            open={activeMenu === menu.key}
            onOpenChange={(open) => {
              if (open) {
                setActiveMenu(menu.key);
                setHoverMode(true);
              } else {
                handleClose();
              }
            }}
          >
            <PopoverTrigger asChild>
              <button
                data-slot="trigger"
                className={cn(
                  "menubar_trigger px-3 py-1.5 text-sm rounded-sm transition-colors",
                  menu.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-surface focus-visible:bg-surface focus-visible:outline-none",
                  activeMenu === menu.key && "bg-surface",
                  classNames?.trigger,
                )}
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={activeMenu === menu.key}
                aria-disabled={menu.disabled}
                onClick={() => handleMenuClick(menu.key, menu.disabled)}
                onMouseEnter={() => handleMenuHover(menu.key, menu.disabled)}
              >
                {menu.label}
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              sideOffset={4}
              data-slot="content"
              className={cn(
                "menubar_content min-w-[200px] w-auto p-1 rounded-md",
                classNames?.content,
              )}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('[data-slot="root"]')) {
                  e.preventDefault();
                }
              }}
            >
              <MenuItems
                items={menu.items}
                classNames={classNames}
                onItemClick={handleItemClick}
                onClose={handleClose}
              />
            </PopoverContent>
          </Popover>
        ))}
      </div>
    );
  },
);

Menubar.displayName = "Menubar";

export type * from "./types";
export default Menubar;
