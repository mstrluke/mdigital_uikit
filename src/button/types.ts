import type {
  ComponentVariantExtended,
  ButtonColor as SharedButtonColor,
  ComponentSize,
} from "../types";

export type ButtonVariant = ComponentVariantExtended | "soft";

export type ButtonColor = SharedButtonColor;

export type ButtonSize = ComponentSize;

export type ButtonShape = "rounded" | "pill" | "square";

export interface ButtonClassNames {
  root?: string;
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  spinner?: string;
  ripple?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: ButtonVariant;
  /**
   * Theme color
   * @default 'primary'
   */
  color?: ButtonColor;
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Button shape
   * @default 'rounded'
   */
  shape?: ButtonShape;
  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display while loading (replaces children)
   */
  loadingText?: string;
  /**
   * Position of loading spinner when loadingText is provided
   * @default 'left'
   */
  loadingPosition?: "left" | "right";
  /**
   * Icon element (use with iconPlacement for position control)
   * When both icon and leftIcon/rightIcon are provided, leftIcon/rightIcon take precedence
   */
  icon?: React.ReactNode;
  /**
   * Position of the icon prop
   * @default 'left'
   */
  iconPlacement?: "left" | "right";
  /**
   * Icon to display on the left side (takes precedence over icon + iconPlacement)
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side (takes precedence over icon + iconPlacement)
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether button takes full width of container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether this is an icon-only button (square aspect ratio)
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Render as child element (polymorphic). When true, button styles are
   * merged onto the single child element (e.g. <a>, <Link>).
   * @default false
   */
  asChild?: boolean;
  /**
   * Toggle/pressed state for toggle buttons. When provided, renders
   * aria-pressed and a visual pressed indicator.
   */
  pressed?: boolean;
  /**
   * Enable Material-style ripple effect on click.
   * Uses only transform + opacity for 60fps GPU-composited animation.
   * @default false
   */
  ripple?: boolean;
  classNames?: ButtonClassNames;
  ref?: React.Ref<HTMLButtonElement>;
}
