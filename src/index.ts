/**
 * @mdigital/ui - Main Exports
 * Modern React component library built with Tailwind CSS v4
 */

// Core utilities
export { cn, getValidationStatus, iconSizes, statusMessageVariants } from "./utils";
export * from "./variants";
export type * from "./types";

// Theme management
export { ThemeProvider, useTheme, themeScript } from "./theme";
export type { Theme, ThemeProviderProps, ThemeProviderState } from "./theme";

// Theme presets
export * from "./styles/themes";

// Components with default exports
export { default as Accordion } from "./accordion";
export { default as Alert } from "./alert";
export { default as Anchor } from "./anchor";
export { default as Autocomplete } from "./autocomplete";
export { default as Calendar } from "./calendar";
export { ColorPicker, ColorInput } from "./color-picker";
export { FloatButton, FloatButtonGroup, BackTop } from "./float-button";
export { default as Mentions } from "./mentions";

export { default as QRCode } from "./qr-code";
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";
export { default as Result } from "./result";

export { default as TagsInput } from "./tags-input";
export { default as Tour } from "./tour";
export { Title, Text, Paragraph } from "./typography";
export { default as Watermark } from "./watermark";
export { Avatar, AvatarGroup } from "./avatar";
export { default as Badge } from "./badge";
export { default as Breadcrumbs } from "./breadcrumbs";
export { default as Button } from "./button";
export { default as ButtonGroup } from "./button-group";
export { default as Card } from "./card";
export { default as Carousel } from "./carousel";
export type { CarouselProps, CarouselClassNames } from "./carousel";
export { default as Cascader } from "./cascader";
export { default as Checkbox } from "./checkbox";
export { default as CheckboxGroup } from "./checkbox-group";
export { default as Clipboard } from "./clipboard";
export { default as Collapse } from "./collapse";
export { default as ContextMenu, ContextMenuContent } from "./context-menu";
export { default as Descriptions } from "./descriptions";
export { default as Divider } from "./divider";
export { default as Dropdown } from "./dropdown";

export { default as FetchingOverlay } from "./fetching-overlay";
export type { FetchingOverlayProps } from "./fetching-overlay";
export { default as FloatInput } from "./float-input";
export { default as Grid } from "./grid";
export { default as Image } from "./image";
export { default as Input } from "./input";
export { default as InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
export { default as InputOTP } from "./input-otp";
export { default as InputPassword } from "./input-password";
export { default as Kbd } from "./kbd";
export { default as Link } from "./link";
export { default as Menubar } from "./menubar";
export { NavigationMenu } from "./navigation-menu";
export {
  default as Modal,
  Modal as ModalRoot,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
} from "./modal";
export { default as MultiSelect } from "./multi-select";
export { default as Notification } from "./notification";
export { default as NumberInput } from "./number-input";
export { default as Pagination } from "./pagination";
export { default as Progress } from "./progress";
export { default as Radio } from "./radio";
export { default as RadioGroup } from "./radio-group";
export { default as Rating } from "./rating";
export { default as ScrollArea } from "./scroll-area";
export { default as Select } from "./select";
export { default as Skeleton } from "./skeleton";
export { default as Slider } from "./slider";
export { default as Spinner } from "./spinner";
export { default as Stepper } from "./stepper";
export { default as Switch } from "./switch";
export {
  default as Table,
  TableCell,
  TableHeaderCell,
  TableRow,
  TableSkeleton,
  TableActions,
  EditableCell,
} from "./table";
export { default as Tabs } from "./tabs";
export { default as Tag } from "./tag";
export { default as Textarea } from "./textarea";
export { default as Timeline } from "./timeline";
export { ToastProvider, useToast } from "./toast";
export { default as Toggle } from "./toggle";
export { default as ToggleGroup } from "./toggle-group";
export { default as Tooltip, TooltipProvider } from "./tooltip";
export { default as Tree } from "./tree";
export { default as TreeSelect } from "./tree-select";
export { default as Upload } from "./upload";

// Components with named exports only
export {
  Command,
  CommandModal,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";

export { DatePicker, RangePicker, TimePicker } from "./date-picker";

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./popover";

export { Transfer } from "./transfer";

// Hooks
export { useDebounce } from "./hooks/useDebounce";
export { useThrottle } from "./hooks/useThrottle";
export { useControllable } from "./hooks/useControllable";
export { useMediaQuery } from "./hooks/useMediaQuery";
export { useRipple, RippleContainer } from "./hooks/useRipple";
export { useMenuNavigation } from "./hooks";

export type {
  AccordionClassNames,
  AccordionProps,
  AccordionItem,
} from "./accordion/types";
export type { AlertProps, AlertVariant, AlertClassNames } from "./alert/types";
export type { AnchorProps, AnchorItem, AnchorClassNames } from "./anchor/types";
export type {
  FloatButtonProps,
  FloatButtonGroupProps,
  BackTopProps,
  FloatButtonClassNames,
} from "./float-button/types";
export type { MentionsProps, MentionOption, MentionsClassNames } from "./mentions/types";

export type { QRCodeProps, QRCodeClassNames, QRModuleStyle, QRFinderStyle, QRCodeErrorLevel, QRCodeStatus } from "./qr-code/types";
export type { ResultProps, ResultStatus, ResultClassNames } from "./result/types";

export type { TagsInputProps, TagsInputClassNames } from "./tags-input/types";
export type { TourProps, TourStep, TourClassNames } from "./tour/types";
export type {
  TitleProps,
  TextProps,
  ParagraphProps,
  TypographyLevel,
  TextSize,
} from "./typography/types";
export type { WatermarkProps, WatermarkClassNames } from "./watermark/types";
export type { AutocompleteProps, AutocompleteOption, AutocompleteClassNames } from "./autocomplete/types";
export type { CalendarProps, CalendarClassNames } from "./calendar/types";
export type {
  ColorPickerProps,
  ColorInputProps,
  ColorPickerClassNames,
  ColorFormat,
} from "./color-picker/types";
export type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./resizable/types";
export type {
  AvatarClassNames,
  AvatarGroupClassNames,
  AvatarProps,
  AvatarGroupProps,
} from "./avatar/types";
export type { BadgeProps } from "./badge/types";
export type {
  BreadcrumbsClassNames,
  BreadcrumbProps,
  BreadcrumbItemData,
} from "./breadcrumbs/types";
export type {
  ButtonClassNames,
  ButtonProps,
  ButtonVariant,
  ButtonShape,
  ButtonSize,
} from "./button/types";
export type {
  ButtonGroupClassNames,
  ButtonGroupProps,
} from "./button-group/types";
export type {
  CardClassNames,
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardActionProps,
  CardImageProps,
} from "./card/types";
export type {
  CascaderClassNames,
  CascaderProps,
  CascaderOption,
} from "./cascader/types";
export type {
  CheckboxClassNames,
  CheckboxProps,
  CheckboxColor,
  CheckboxSize,
} from "./checkbox/types";
export type {
  CheckboxGroupClassNames,
  CheckboxGroupProps as CheckboxGroupComponentProps,
} from "./checkbox-group/types";
export type { ClipboardClassNames, ClipboardProps } from "./clipboard/types";
export type { CollapseClassNames, CollapseProps } from "./collapse/types";
export type {
  ContextMenuClassNames,
  ContextMenuProps,
  ContextMenuItem,
} from "./context-menu/types";
export type {
  DescriptionsClassNames,
  DescriptionsProps,
  DescriptionsItem,
} from "./descriptions/types";
export type { DividerProps } from "./divider/types";
export type {
  DropdownClassNames,
  DropdownProps,
  DropdownItem,
} from "./dropdown/types";

export type { FloatInputClassNames, FloatInputProps } from "./float-input/types";
export type { GridProps } from "./grid/types";
export type { ImageClassNames, ImageProps } from "./image/types";
export type { InputClassNames, InputProps } from "./input/types";
export type {
  InputGroupClassNames,
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupInputProps,
} from "./input-group/types";
export type { InputOTPClassNames, InputOTPProps } from "./input-otp/types";
export type {
  InputPasswordClassNames,
  PasswordInputProps,
} from "./input-password/types";
export type { KbdProps } from "./kbd/types";
export type { LinkClassNames, LinkProps } from "./link/types";
export type {
  MenubarClassNames,
  MenubarProps,
  MenubarMenu,
  MenubarItem,
} from "./menubar/types";
export type { ModalClassNames, ComposedModalProps } from "./modal/types";
export type {
  MultiSelectClassNames,
  MultiSelectProps,
} from "./multi-select/types";
export type {
  NavigationMenuClassNames,
  NavigationMenuProps,
  NavigationMenuItem as NavigationMenuItemType,
  NavigationMenuChildItem,
} from "./navigation-menu/types";
export type {
  NotificationClassNames,
  NotificationProps,
} from "./notification/types";
export type { NumberInputClassNames, NumberInputProps } from "./number-input/types";
export type { PaginationClassNames, PaginationProps } from "./pagination/types";
export type {
  ProgressClassNames,
  ProgressProps,
  ProgressType,
  ProgressVariant,
  ProgressOrientation,
  ProgressSize,
} from "./progress/types";
export type { RadioClassNames, RadioProps } from "./radio/types";
export type {
  RadioGroupClassNames,
  RadioGroupProps as RadioGroupComponentProps,
} from "./radio-group/types";
export type { RatingClassNames, RatingProps } from "./rating/types";
export type { ScrollAreaClassNames, ScrollAreaProps } from "./scroll-area/types";
export type { SelectClassNames, SelectProps } from "./select/types";
export type { SkeletonProps } from "./skeleton/types";
export type { SliderClassNames, SliderProps } from "./slider/types";
export type { SpinnerProps } from "./spinner/types";
export type {
  StepperClassNames,
  StepperProps,
  StepItem,
} from "./stepper/types";
export type { SwitchClassNames, SwitchProps } from "./switch/types";
export type { TableClassNames, TableProps } from "./table/types";
export type { TabsClassNames, TabsProps, TabItem } from "./tabs/types";
export type { TagClassNames, TagProps } from "./tag/types";
export type { TextareaClassNames, TextareaProps } from "./textarea/types";
export type { TimelineClassNames, TimelineProps, TimelineItem } from "./timeline/types";
export type {
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastContextValue,
} from "./toast/types";
export type { ToggleClassNames, SingleToggleProps } from "./toggle/types";
export type {
  ToggleGroupClassNames,
  ToggleGroupProps,
} from "./toggle-group/types";
export type { TooltipClassNames, TooltipProps } from "./tooltip/types";
export type { TreeClassNames, TreeProps, TreeNode } from "./tree/types";
export type {
  TreeSelectClassNames,
  TreeSelectProps,
} from "./tree-select/types";
export type { UploadClassNames, UploadProps, UploadFile } from "./upload/types";
export type { CommandClassNames } from "./command/types";
export type {
  DatePickerClassNames,
  DatePickerProps,
  RangePickerProps,
  TimePickerProps,
} from "./date-picker/types";
export type {
  DrawerClassNames,
  DrawerProps,
  DrawerTriggerProps,
  DrawerOverlayProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  ComposedDrawerProps,
} from "./drawer/types";
export type { PopoverClassNames } from "./popover/types";
export type {
  TransferClassNames,
  TransferProps,
  TransferItem,
} from "./transfer/types";
