import type { ComponentColor, ComponentSize } from "../types";

export type AccordionVariant =
  | "default"
  | "solid"
  | "soft"
  | "bordered"
  | "splitted";

export type AccordionSize = ComponentSize;

export interface AccordionClassNames {
  root?: string;
  item?: string;
  trigger?: string;
  content?: string;
  icon?: string;
}

export interface AccordionItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  /**
   * Custom icon for the item (displayed before title)
   */
  icon?: React.ReactNode;
  /**
   * Subtitle displayed below title
   */
  subtitle?: React.ReactNode;
  /**
   * Extra content displayed on the right side of the header (before expand icon)
   */
  extra?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];

  /**
   * @default 'default'
   */
  color?: ComponentColor;

  /**
   * @default 'md'
   */
  size?: AccordionSize;

  /**
   * Visual style variant
   * - default: subtle background on hover
   * - solid: filled background
   * - soft: light colored background
   * - bordered: outline border only
   * - splitted: separated cards with gap
   * @default 'default'
   */
  variant?: AccordionVariant;

  /**
   * Default active keys (uncontrolled)
   */
  defaultActiveKey?: string | string[];

  activeKey?: string | string[];

  onChange?: (activeKey: string | string[]) => void;

  /**
   * @default false
   */
  multiple?: boolean;

  expandIcon?:
    | React.ReactNode
    | ((isExpanded: boolean) => React.ReactNode)
    | false;

  /**
   * @default 'right'
   */
  expandIconPosition?: "left" | "right";

  /**
   * Whether panels can be collapsed by clicking their header.
   * When false, at least one panel must remain open.
   * Only applies when multiple is false.
   * @default true
   */
  collapsible?: boolean;

  /**
   * Unmount content when panel is collapsed (for performance)
   * @default false
   */
  destroyOnClose?: boolean;

  /**
   * Show divider between items (only for non-splitted variants)
   * @default true
   */
  showDivider?: boolean;

  className?: string;
  itemClassName?: string;
  classNames?: AccordionClassNames;
  ref?: React.Ref<HTMLDivElement>;
}
