import type { ButtonColor, ComponentSize } from "../types";

export type SwitchColor = ButtonColor;

export type SwitchSize = ComponentSize;

export type SwitchLabelPosition = "left" | "right";

export interface SwitchClassNames {
  root?: string;
  track?: string;
  thumb?: string;
  label?: string;
  description?: string;
}

export interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "ref"
  > {
  /**
   * @default 'primary'
   */
  color?: SwitchColor;
  /**
   * @default 'md'
   */
  size?: SwitchSize;
  label?: React.ReactNode;
  /**
   * @default 'right'
   */
  labelPosition?: SwitchLabelPosition;
  helperText?: string;
  error?: string;
  /**
   * @default false
   */
  loading?: boolean;
  thumbIcon?: React.ReactNode;
  /**
   * Content to show on the left side of track (visible when unchecked)
   */
  startContent?: React.ReactNode;
  /**
   * Content to show on the right side of track (visible when checked)
   */
  endContent?: React.ReactNode;
  /**
   * Shows an asterisk next to the label
   * @default false
   */
  required?: boolean;
  labelClassName?: string;
  className?: string;
  classNames?: SwitchClassNames;
  ref?: React.Ref<HTMLInputElement>;
}
