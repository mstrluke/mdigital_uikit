'use client'

import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import React, { createContext, useContext } from "react";

import { cn } from "../utils";
import type {
  ComposedDrawerProps,
  DrawerBodyProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerDirection,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerProps,
  DrawerSize,
  DrawerTitleProps,
  DrawerTriggerProps,
} from "./types";

// Context to pass direction from Drawer to DrawerContent
const DrawerContext = createContext<{
  direction: DrawerDirection;
}>({ direction: "bottom" });

const drawerContentVariants = cva(
  "fixed bg-background border-border flex flex-col outline-none",
  {
    variants: {
      direction: {
        bottom: "bottom-0 left-0 right-0 border-t rounded-t-xl max-h-[96vh]",
        top: "top-0 left-0 right-0 border-b rounded-b-xl max-h-[96vh]",
        left: "left-0 top-0 bottom-0 border-r max-w-[96vw]",
        right: "right-0 top-0 bottom-0 border-l max-w-[96vw]",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        full: "",
      },
    },
    compoundVariants: [
      // Bottom/Top - height based
      { direction: "bottom", size: "xs", class: "h-1/4" },
      { direction: "bottom", size: "sm", class: "h-1/3" },
      { direction: "bottom", size: "md", class: "h-1/2" },
      { direction: "bottom", size: "lg", class: "h-3/4" },
      { direction: "bottom", size: "full", class: "h-[96vh]" },
      { direction: "top", size: "xs", class: "h-1/4" },
      { direction: "top", size: "sm", class: "h-1/3" },
      { direction: "top", size: "md", class: "h-1/2" },
      { direction: "top", size: "lg", class: "h-3/4" },
      { direction: "top", size: "full", class: "h-[96vh]" },
      // Left/Right - width based
      { direction: "left", size: "xs", class: "w-64" },
      { direction: "left", size: "sm", class: "w-80" },
      { direction: "left", size: "md", class: "w-96" },
      { direction: "left", size: "lg", class: "w-[480px]" },
      { direction: "left", size: "full", class: "w-[96vw]" },
      { direction: "right", size: "xs", class: "w-64" },
      { direction: "right", size: "sm", class: "w-80" },
      { direction: "right", size: "md", class: "w-96" },
      { direction: "right", size: "lg", class: "w-[480px]" },
      { direction: "right", size: "full", class: "w-[96vw]" },
    ],
    defaultVariants: {
      direction: "bottom",
      size: "md",
    },
  },
);

/**
 * Close button size classes
 */
const closeButtonSizeClasses: Record<DrawerSize, string> = {
  xs: "top-2 right-2 p-1 [&_svg]:size-3.5",
  sm: "top-3 right-3 p-1.5 [&_svg]:size-4",
  md: "top-4 right-4 p-1.5 [&_svg]:size-4",
  lg: "top-4 right-4 p-2 [&_svg]:size-5",
  full: "top-5 right-5 p-2 [&_svg]:size-5",
};

/**
 * Padding classes based on size
 */
const paddingClasses: Record<DrawerSize, string> = {
  xs: "p-3",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
  full: "p-6",
};

export function Drawer({
  open,
  onOpenChange,
  direction = "bottom",
  modal = true,
  dismissible = true,
  snapPoints,
  children,
}: DrawerProps) {
  const contextValue = React.useMemo(() => ({ direction }), [direction]);

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        direction={direction}
        modal={modal}
        dismissible={dismissible}
        snapPoints={snapPoints}
      >
        {children}
      </DrawerPrimitive.Root>
    </DrawerContext.Provider>
  );
}

Drawer.displayName = "Drawer";

export const DrawerTrigger = React.memo<DrawerTriggerProps>(
  ({ children, asChild = false, className, ref, ...props }) => {
    return (
      <DrawerPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        className={className}
        data-slot="drawer-trigger"
        {...props}
      >
        {children}
      </DrawerPrimitive.Trigger>
    );
  },
);

DrawerTrigger.displayName = "DrawerTrigger";

export const DrawerPortal = DrawerPrimitive.Portal;

export const DrawerOverlay = React.memo<DrawerOverlayProps>(
  ({ className, ref, classNames, ...props }) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
        "drawer_overlay",
        "fixed inset-0 z-[var(--z-modal)] bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200",
        classNames?.overlay,
        className,
      )}
      data-slot="drawer-overlay"
      {...props}
    />
  ),
);

DrawerOverlay.displayName = "DrawerOverlay";

export const DrawerContent = React.memo<DrawerContentProps>(
  ({
    children,
    direction: directionProp,
    size = "md",
    showCloseButton = false,
    showHandle,
    className,
    ref,
    classNames,
  }) => {
    const { direction: contextDirection } = useContext(DrawerContext);
    const direction = directionProp ?? contextDirection;

    // Default showHandle based on direction
    const shouldShowHandle =
      showHandle ?? (direction === "bottom" || direction === "top");

    const isHorizontal = direction === "left" || direction === "right";

    return (
      <DrawerPortal>
        <DrawerOverlay classNames={classNames} />
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(
            "drawer_content",
            drawerContentVariants({ direction, size }),
            paddingClasses[size],
            "z-[var(--z-modal)]",
            classNames?.content,
            className,
          )}
          data-slot="drawer-content"
        >
          {/* Handle for bottom drawer */}
          {shouldShowHandle && direction === "bottom" && (
            <div
              className={cn(
                "drawer_handle",
                "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border mb-4",
                classNames?.handle
              )}
              data-slot="drawer-handle"
            />
          )}

          {/* Handle for top drawer */}
          {shouldShowHandle && direction === "top" && (
            <div
              className={cn(
                "drawer_handle",
                "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border mb-4 order-last mt-auto",
                classNames?.handle
              )}
              data-slot="drawer-handle"
            />
          )}

          {/* Handle for left drawer */}
          {shouldShowHandle && direction === "left" && (
            <div
              className={cn(
                "drawer_handle",
                "absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-full bg-border",
                classNames?.handle
              )}
              data-slot="drawer-handle"
            />
          )}

          {/* Handle for right drawer */}
          {shouldShowHandle && direction === "right" && (
            <div
              className={cn(
                "drawer_handle",
                "absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-full bg-border",
                classNames?.handle
              )}
              data-slot="drawer-handle"
            />
          )}

          {/* Close button */}
          {showCloseButton && (
            <DrawerPrimitive.Close
              className={cn(
                "drawer_closeButton",
                "absolute rounded-md opacity-70 transition-opacity hover:opacity-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "text-text-secondary hover:text-text-primary hover:bg-surface",
                closeButtonSizeClasses[size],
                classNames?.closeButton,
              )}
              data-slot="drawer-closeButton"
            >
              <X />
              <span className="sr-only">Close</span>
            </DrawerPrimitive.Close>
          )}

          {/* Content wrapper */}
          <div
            className={cn(
              "drawer_wrapper",
              "flex flex-col flex-1 min-h-0",
              isHorizontal && "overflow-y-auto",
              showCloseButton && "pt-6",
              classNames?.wrapper,
            )}
            data-slot="drawer-wrapper"
          >
            {children}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    );
  },
);

DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = React.memo<DrawerHeaderProps>(
  ({ children, className, ref, classNames, ...props }) => {
    return (
      <div
        ref={ref}
        className={cn(
          "drawer_header",
          "flex flex-col gap-1.5 mb-4 shrink-0",
          classNames?.header,
          className
        )}
        data-slot="drawer-header"
        {...props}
      >
        {children}
      </div>
    );
  },
);

DrawerHeader.displayName = "DrawerHeader";

export const DrawerBody = React.memo<DrawerBodyProps>(
  ({ children, className, ref, classNames, ...props }) => {
    return (
      <div
        ref={ref}
        className={cn(
          "drawer_body",
          "flex-1 overflow-y-auto min-h-0",
          classNames?.body,
          className
        )}
        data-slot="drawer-body"
        {...props}
      >
        {children}
      </div>
    );
  },
);

DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = React.memo<DrawerFooterProps>(
  ({ children, className, ref, classNames, ...props }) => {
    return (
      <div
        ref={ref}
        className={cn(
          "drawer_footer",
          "flex gap-2 mt-auto pt-4 shrink-0",
          classNames?.footer,
          className
        )}
        data-slot="drawer-footer"
        {...props}
      >
        {children}
      </div>
    );
  },
);

DrawerFooter.displayName = "DrawerFooter";

export const DrawerTitle = React.memo<DrawerTitleProps>(
  ({ children, className, ref, classNames, ...props }) => {
    return (
      <DrawerPrimitive.Title
        ref={ref}
        className={cn(
          "drawer_title",
          "text-lg font-semibold text-text-primary",
          classNames?.title,
          className
        )}
        data-slot="drawer-title"
        {...props}
      >
        {children}
      </DrawerPrimitive.Title>
    );
  },
);

DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.memo<DrawerDescriptionProps>(
  ({ children, className, ref, classNames, ...props }) => {
    return (
      <DrawerPrimitive.Description
        ref={ref}
        className={cn(
          "drawer_description",
          "text-sm text-text-secondary",
          classNames?.description,
          className
        )}
        data-slot="drawer-description"
        {...props}
      >
        {children}
      </DrawerPrimitive.Description>
    );
  },
);

DrawerDescription.displayName = "DrawerDescription";

export const DrawerClose = React.memo<DrawerCloseProps>(
  ({ children, asChild = false, className, ref, ...props }) => {
    return (
      <DrawerPrimitive.Close
        ref={ref}
        asChild={asChild}
        className={className}
        data-slot="drawer-close"
        {...props}
      >
        {children}
      </DrawerPrimitive.Close>
    );
  },
);

DrawerClose.displayName = "DrawerClose";

/**
 * ComposedDrawer - A convenience component that combines all drawer parts
 */
export function ComposedDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  direction = "right",
  size = "md",
  modal = true,
  showCloseButton = true,
  showHandle,
  dismissible = true,
  hideHeader = false,
  hideFooter = false,
  className,
  contentClassName,
  classNames,
}: ComposedDrawerProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
      modal={modal}
      dismissible={dismissible}
    >
      <DrawerContent
        direction={direction}
        size={size}
        showCloseButton={showCloseButton}
        showHandle={showHandle}
        className={contentClassName}
        classNames={classNames}
      >
        {!hideHeader && (title || description) && (
          <DrawerHeader className={className} classNames={classNames}>
            {title && <DrawerTitle classNames={classNames}>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription classNames={classNames}>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <DrawerBody classNames={classNames}>{children}</DrawerBody>
        {!hideFooter && footer && <DrawerFooter classNames={classNames}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

ComposedDrawer.displayName = "ComposedDrawer";

export type * from "./types";
export default ComposedDrawer;
