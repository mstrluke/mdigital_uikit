"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../utils";
import type {
  ComposedModalProps,
  ModalClassNames,
  ModalColor,
  ModalSize,
} from "./types";

function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger
      data-slot="modal-trigger"
      className={cn("modal_trigger", className)}
      {...props}
    />
  );
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />;
}

function ModalClose({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="modal-close"
      className={cn("modal_close", className)}
      {...props}
    />
  );
}

const modalOverlayVariants = cva(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[var(--z-modal)] backdrop-blur-sm",
  {
    variants: {
      opacity: {
        light: "bg-overlay/20",
        medium: "bg-overlay/40",
        heavy: "bg-overlay/80",
      },
    },
    defaultVariants: {
      opacity: "medium",
    },
  },
);

function ModalOverlay({
  className,
  opacity = "medium",
  classNames,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  opacity?: "light" | "medium" | "heavy";
  classNames?: ModalClassNames;
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "modal_overlay",
        modalOverlayVariants({ opacity }),
        classNames?.overlay,
        className,
      )}

      {...props}
    />
  );
}

const modalContentVariants = cva(
  "bg-background will-change-[transform,_opacity] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[var(--z-modal)] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-md border duration-200",
  {
    variants: {
      size: {
        xs: "max-w-(--modal-max-width-xs) gap-(--modal-gap-xs) p-(--modal-padding-xs) sm:max-w-(--modal-max-width-xs)",
        sm: "max-w-(--modal-max-width-sm) gap-(--modal-gap-sm) p-(--modal-padding-sm) sm:max-w-(--modal-max-width-sm)",
        md: "max-w-(--modal-max-width-md) gap-(--modal-gap-md) p-(--modal-padding-md) sm:max-w-(--modal-max-width-md)",
        lg: "max-w-(--modal-max-width-lg) gap-(--modal-gap-lg) p-(--modal-padding-lg) sm:max-w-(--modal-max-width-lg)",
      },
      color: {
        default: "border-border",
        primary: "border-primary border-l-4",
        secondary: "border-secondary border-l-4",
        accent: "border-accent border-l-4",
        success: "border-success border-l-4",
        error: "border-error border-l-4",
        warning: "border-warning border-l-4",
        info: "border-info border-l-4",
      },
      centered: {
        true: "text-center",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
      centered: false,
    },
  },
);

const modalCloseVariants = cva(
  "absolute right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden cursor-pointer disabled:pointer-events-none text-text-secondary hover:text-text-primary [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "top-3 [&_svg]:size-3.5",
        sm: "top-3 [&_svg]:size-3.5",
        md: "top-4 [&_svg]:size-4",
        lg: "top-6 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function ModalContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  color = "default",
  centered = false,
  classNames,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  size?: ModalSize;
  color?: ModalColor;
  centered?: boolean;
  classNames?: ModalClassNames;
}) {
  return (
    <ModalPortal data-slot="modal-portal">
      <ModalOverlay classNames={classNames} />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(
          "modal_content",
          modalContentVariants({ size, color, centered }),
          classNames?.content,
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="modal-close"
            className={cn(
              "modal_closeButton",
              modalCloseVariants({ size }),
              classNames?.closeButton,
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

const modalHeaderVariants = cva("flex flex-col text-text-primary", {
  variants: {
    size: {
      xs: "gap-1.5",
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ModalHeader = React.memo<
  React.ComponentProps<"div"> & {
    size?: ModalSize;
    classNames?: ModalClassNames;
  }
>(function ModalHeader({ className, size = "md", classNames, ...props }) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "modal_header",
        modalHeaderVariants({ size }),
        classNames?.header,
        className,
      )}
      {...props}
    />
  );
});

ModalHeader.displayName = 'ModalHeader'

const modalFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end",
  {
    variants: {
      size: {
        xs: "gap-1.5",
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const ModalFooter = React.memo<
  React.ComponentProps<"div"> & {
    size?: ModalSize;
    classNames?: ModalClassNames;
  }
>(function ModalFooter({ className, size = "md", classNames, ...props }) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "modal_footer",
        modalFooterVariants({ size }),
        classNames?.footer,
        className,
      )}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter'

const modalTitleVariants = cva("leading-none font-semibold text-text-primary", {
  variants: {
    size: {
      xs: "text-base",
      sm: "text-base",
      md: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ModalTitle = React.memo<
  React.ComponentProps<typeof DialogPrimitive.Title> & {
    size?: ModalSize;
    classNames?: ModalClassNames;
  }
>(function ModalTitle({ className, size = "md", classNames, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn(
        "modal_title",
        modalTitleVariants({ size }),
        classNames?.title,
        className,
      )}
      {...props}
    />
  );
});

ModalTitle.displayName = 'ModalTitle'

const modalDescriptionVariants = cva("text-text-secondary", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ModalDescription = React.memo<
  React.ComponentProps<typeof DialogPrimitive.Description> & {
    size?: ModalSize;
    classNames?: ModalClassNames;
  }
>(function ModalDescription({ className, size = "md", classNames, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn(
        "modal_description",
        modalDescriptionVariants({ size }),
        classNames?.description,
        className,
      )}
      {...props}
    />
  );
});

ModalDescription.displayName = 'ModalDescription'

function ComposedModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  color = "default",
  centered = false,
  showCloseButton = true,
  hideHeader = false,
  hideFooter = false,
  onInteractOutside,
  onEscapeKeyDown,
  className,
  contentClassName,
  classNames,
}: ComposedModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        size={size}
        color={color}
        centered={centered}
        showCloseButton={showCloseButton}
        onInteractOutside={onInteractOutside}
        onEscapeKeyDown={onEscapeKeyDown}
        className={contentClassName}
        classNames={classNames}
      >
        {!hideHeader && (title || description) && (
          <ModalHeader
            size={size}
            className={className}
            classNames={classNames}
          >
            {title && (
              <ModalTitle size={size} classNames={classNames}>
                {title}
              </ModalTitle>
            )}
            {description && (
              <ModalDescription size={size} classNames={classNames}>
                {description}
              </ModalDescription>
            )}
          </ModalHeader>
        )}
        <div className={cn("modal_body", classNames?.body)}>{children}</div>
        {!hideFooter && footer && (
          <ModalFooter size={size} classNames={classNames}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export type * from "./types";
export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
export default ComposedModal;
