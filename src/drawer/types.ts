import type React from 'react'
import type { ComponentSize } from '../types'

export type DrawerDirection = "bottom" | "top" | "left" | "right";
export type DrawerSize = ComponentSize | "full";

export interface DrawerClassNames {
  overlay?: string;
  content?: string;
  wrapper?: string;
  header?: string;
  title?: string;
  description?: string;
  body?: string;
  footer?: string;
  handle?: string;
  closeButton?: string;
}

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Direction from which drawer slides in
   * @default 'bottom'
   */
  direction?: DrawerDirection;
  /**
   * Whether drawer should be modal (blocking interaction with content behind)
   * @default true
   */
  modal?: boolean;
  /**
   * Whether the drawer can be dismissed by dragging
   * @default true
   */
  dismissible?: boolean;
  /**
   * Snap points for drawer positioning (0-1 values)
   * e.g., [0.5, 1] allows snapping to 50% and 100%
   */
  snapPoints?: (number | string)[];
  children: React.ReactNode;
}

export interface DrawerTriggerProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  /**
   * Whether to render children as child component
   * @default false
   */
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface DrawerContentProps {
  children: React.ReactNode;
  /**
   * Direction from which drawer slides in
   * @default 'bottom'
   */
  direction?: DrawerDirection;
  /**
   * Drawer size
   * @default 'md'
   */
  size?: DrawerSize;
  /**
   * Whether to show a close button in the corner
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * Whether to show the drag handle
   * @default true for bottom/top, false for left/right
   */
  showHandle?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLHeadingElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLParagraphElement>;
  classNames?: DrawerClassNames;
}

export interface DrawerCloseProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  /**
   * Whether to render children as child component
   * @default false
   */
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  classNames?: DrawerClassNames;
}

export interface ComposedDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Direction from which drawer slides in
   * @default 'right'
   */
  direction?: DrawerDirection;
  /**
   * Drawer size
   * @default 'md'
   */
  size?: DrawerSize;
  /**
   * Whether drawer should be modal
   * @default true
   */
  modal?: boolean;
  /**
   * Whether to show a close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to show the drag handle
   * @default true for bottom/top
   */
  showHandle?: boolean;
  /**
   * Whether the drawer can be dismissed
   * @default true
   */
  dismissible?: boolean;
  /**
   * Hide the header section
   * @default false
   */
  hideHeader?: boolean;
  /**
   * Hide the footer section
   * @default false
   */
  hideFooter?: boolean;
  className?: string;
  contentClassName?: string;
  classNames?: DrawerClassNames;
}
