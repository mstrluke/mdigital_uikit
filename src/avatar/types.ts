import type { ComponentSize } from "../types";

/**
 * Size variants for Avatar component
 */
export type AvatarSize = ComponentSize;

/**
 * Shape variants for Avatar component
 */
export type AvatarShape = "circle" | "square";

/**
 * Status indicator states for Avatar
 */
export type AvatarStatus = "online" | "offline" | "away" | "busy";

/**
 * Color variants for Avatar background (used with fallback/initials)
 */
export type AvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface AvatarClassNames {
  root?: string;
  image?: string;
  fallback?: string;
  status?: string;
}

export interface AvatarGroupClassNames {
  root?: string;
  overflow?: string;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;

  /**
   * Fallback text (initials) when image fails to load
   * If not provided, will try to generate from `name` prop
   */
  fallback?: string;

  /**
   * User's name - used to auto-generate initials if fallback not provided
   */
  name?: string;

  /**
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * @default 'circle'
   */
  shape?: AvatarShape;

  status?: AvatarStatus;

  /**
   * @default 'default'
   */
  color?: AvatarColor;

  /**
   * @default false
   */
  bordered?: boolean;

  /**
   * Custom icon to show as fallback instead of initials
   */
  icon?: React.ReactNode;

  /**
   * Badge content (number, icon, or custom element)
   * Displayed at top-right corner
   */
  badge?: React.ReactNode;

  /**
   * @default false
   */
  disabled?: boolean;

  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  className?: string;
  classNames?: AvatarClassNames;
  ref?: React.Ref<HTMLDivElement>;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;

  /**
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * @default 'circle'
   */
  shape?: AvatarShape;

  /**
   * @default false
   */
  showTotal?: boolean;

  renderSurplus?: (surplus: number) => React.ReactNode;

  /**
   * @default false
   */
  bordered?: boolean;

  className?: string;
  classNames?: AvatarGroupClassNames;
  ref?: React.Ref<HTMLDivElement>;
}
