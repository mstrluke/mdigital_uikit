import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useId } from "react";

import { useMenuNavigation } from "../hooks/useMenuNavigation";
import { getValidationStatus } from "../utils";

interface SelectBaseOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

interface UseSelectBaseConfig<O extends SelectBaseOption> {
  options: O[];
  /** Called when the user presses Enter on a highlighted option (or clicks one via the hook's helpers). */
  onSelectOption: (option: O) => void;
  virtualizeThreshold?: number;
  maxDropdownHeight?: number;
  label?: string;
  idPrefix: string; // 'select' or 'multiselect'
  error?: string | boolean;
  warning?: string | boolean;
  info?: string | boolean;
  success?: string | boolean;
  helperText?: string;
}

export interface FlattenedItem<O extends SelectBaseOption> {
  type: "option" | "group";
  data: O | string;
}


export function useSelectBase<O extends SelectBaseOption>(
  config: UseSelectBaseConfig<O>,
) {
  const {
    options,
    virtualizeThreshold = 50,
    maxDropdownHeight = 300,
    label,
    idPrefix,
    error,
    warning,
    info,
    success,
    helperText,
  } = config;

  // -- IDs / validation -------------------------------------------------------
  const uniqueId = useId();
  const labelId = `${idPrefix}-label-${uniqueId}`;
  const listboxId = `${idPrefix}-listbox-${uniqueId}`;
  const helperId = `${idPrefix}-helper-${uniqueId}`;

  const { status, message: helperMessage } = getValidationStatus({
    error,
    warning,
    info,
    success,
    helperText,
  });

  // -- State ------------------------------------------------------------------
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setParentNode] = React.useState<HTMLDivElement | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showTopArrow, setShowTopArrow] = React.useState(false);
  const [showBottomArrow, setShowBottomArrow] = React.useState(false);

  // -- Refs -------------------------------------------------------------------
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Store onSelectOption in a ref so handleKeyDown doesn't depend on it
  const onSelectRef = React.useRef(config.onSelectOption);
  React.useEffect(() => {
    onSelectRef.current = config.onSelectOption;
  }, [config.onSelectOption]);

  // -- Memos ------------------------------------------------------------------
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, O[]> = {};
    const ungrouped: O[] = [];

    options.forEach((option) => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group]!.push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [options]);

  const flattenedOptions = React.useMemo(() => {
    const items: Array<FlattenedItem<O>> = [];

    groupedOptions.ungrouped.forEach((option) => {
      items.push({ type: "option", data: option });
    });

    Object.entries(groupedOptions.groups).forEach(
      ([groupName, groupOptions]) => {
        items.push({ type: "group", data: groupName });
        (groupOptions as O[]).forEach((option) => {
          items.push({ type: "option", data: option });
        });
      },
    );

    return items;
  }, [groupedOptions]);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return flattenedOptions;

    const query = searchQuery.toLowerCase();
    const matchingOptions = new Set(
      flattenedOptions.filter(
        (item) =>
          item.type === "option" &&
          (item.data as O).label.toLowerCase().includes(query),
      ),
    );

    // Build set of group names that have matching options - O(n)
    const matchingGroups = new Set<string>();
    for (const item of flattenedOptions) {
      if (item.type === "option" && matchingOptions.has(item)) {
        const group = (item.data as O).group;
        if (group) matchingGroups.add(group);
      }
    }

    return flattenedOptions.filter((item) => {
      if (item.type === "group") {
        return matchingGroups.has(item.data as string);
      }
      return matchingOptions.has(item);
    });
  }, [flattenedOptions, searchQuery]);

  const selectableOptions = React.useMemo(
    () =>
      filteredOptions.filter(
        (item) => item.type === "option" && !(item.data as O).disabled,
      ),
    [filteredOptions],
  );

  const enabledIndices = React.useMemo(
    () => Array.from({ length: selectableOptions.length }, (_, i) => i),
    [selectableOptions.length],
  );

  const handleMenuClose = React.useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    inputRef.current?.blur();
  }, []);

  const onMenuSelect = React.useCallback(
    (index: number) => {
      const item = selectableOptions[index];
      if (item) {
        onSelectRef.current(item.data as O);
      }
    },
    [selectableOptions],
  );

  const {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown: menuHandleKeyDown,
  } = useMenuNavigation({
    enabledIndices,
    isOpen,
    onClose: handleMenuClose,
    onSelect: onMenuSelect,
    onOpen: () => setIsOpen(true),
    loop: false,
  });

  // Reset highlight when filtered options change (e.g. search query changes)
  React.useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions, setHighlightedIndex]);

  // Wrap the hook's handler: Space must type in the search input, not select
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (isOpen && e.key === " ") {
        e.stopPropagation();
        return;
      }
      menuHandleKeyDown(e);
    },
    [isOpen, menuHandleKeyDown],
  );

  // Prevent Space keyup from bubbling to the <button> trigger (native button
  // activation fires on keyup, which would toggle the Popover closed).
  const handleKeyUp = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (isOpen && e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isOpen],
  );

  const shouldVirtualize = filteredOptions.length > virtualizeThreshold;

  // -- Virtualizer ------------------------------------------------------------
  // Use the single scrollContainerRef as the virtualizer scroll element.
  // No separate inner scroll container — avoids nested scroll conflicts.
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 40,
    enabled: shouldVirtualize,
    overscan: 10,
  });

  const virtualizerRef = React.useRef(virtualizer);
  React.useEffect(() => {
    virtualizerRef.current = virtualizer;
  }, [virtualizer]);

  // Legacy refCallback kept for API compat — just updates parentNode for
  // any external consumers, but virtualizer now uses scrollContainerRef.
  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      setParentNode(node);
    }
  }, []);

  // -- Handlers ---------------------------------------------------------------
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setIsOpen(true);
    },
    [],
  );

  const handleInputClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(true);
    },
    [],
  );

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const { scrollTop, scrollHeight, clientHeight } = element;

      setShowTopArrow(scrollTop > 0);
      setShowBottomArrow(scrollTop + clientHeight < scrollHeight - 1);
    },
    [],
  );

  // Scroll highlighted option into view
  React.useEffect(() => {
    if (highlightedIndex < 0) return;
    const option = selectableOptions[highlightedIndex];
    if (!option) return;

    const optionIndex = filteredOptions.indexOf(option);
    if (optionIndex < 0) return;

    if (shouldVirtualize) {
      virtualizerRef.current.scrollToIndex(optionIndex, { align: "auto" });
    } else {
      // Non-virtualized: find the DOM element and scroll it into view
      const container = scrollContainerRef.current;
      if (container) {
        const el = container.querySelector(`[data-option-index="${optionIndex}"]`) as HTMLElement;
        el?.scrollIntoView?.({ block: "nearest" });
      }
    }
  }, [highlightedIndex, selectableOptions, filteredOptions, shouldVirtualize]);

  // -- Effects ----------------------------------------------------------------
  // Check initial scroll state when dropdown opens
  React.useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        const element = scrollContainerRef.current;
        if (element) {
          const { scrollTop, scrollHeight, clientHeight } = element;
          setShowTopArrow(scrollTop > 0);
          setShowBottomArrow(scrollTop + clientHeight < scrollHeight - 1);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    } else {
      setShowTopArrow(false);
      setShowBottomArrow(false);
      return undefined;
    }
  }, [isOpen, filteredOptions, shouldVirtualize]);

  // -- Return -----------------------------------------------------------------
  return {
    // State
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    highlightedIndex,
    setHighlightedIndex,
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
    maxDropdownHeight,
    label,

    // IDs & validation
    uniqueId,
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
  };
}
