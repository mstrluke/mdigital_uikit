'use client'

import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type {
  CardActionProps,
  CardClassNames,
  CardColor,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardImageProps,
  CardProps,
  CardSize,
  CardTitleProps,
  CardVariant,
} from "./types";

interface CardContextValue {
  variant: CardVariant;
  color: CardColor;
  classNames?: CardClassNames;
}

const CardContext = React.createContext<CardContextValue | null>(null);

function useCardContext() {
  return React.useContext(CardContext);
}

const cardVariants = cva("rounded-lg transition-[shadow,transform]", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border border-slot",
      solid: "border border-slot bg-slot text-slot-fg",
      outline: "bg-transparent border border-slot text-text-primary",
      soft: "border-transparent bg-slot-10 text-slot",
      ghost: "border-transparent bg-transparent text-slot",
      elevated: "bg-card text-card-foreground border-transparent shadow-md",
    },
    color: colorVars,
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    hoverable: {
      true: "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
      false: "",
    },
    clickable: {
      true: "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slot focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:shadow-md",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    shadow: "none",
    hoverable: false,
    clickable: false,
  },
});

const sizeClasses: Record<CardSize, string> = {
  xs: "[--card-padding:0.5rem] [--card-content-padding:0.5rem] [--card-footer-padding:0.5rem]",
  sm: "[--card-padding:1rem] [--card-content-padding:1rem] [--card-footer-padding:1rem]",
  md: "[--card-padding:1.5rem] [--card-content-padding:1.5rem] [--card-footer-padding:1.5rem]",
  lg: "[--card-padding:2rem] [--card-content-padding:2rem] [--card-footer-padding:2rem]",
};

const Card = React.memo<CardProps>(
  ({
    className,
    variant = "default",
    color = "default",
    size = "md",
    shadow = "none",
    hoverable = false,
    clickable = false,
    bordered = true,
    loading = false,
    classNames,
    onClick,
    ref,
    children,
    ...props
  }) => {
    const cardContent = loading ? (
      <div className="animate-pulse">
        <div className="p-(--card-padding)">
          <div className="h-4 bg-surface rounded w-3/4 mb-2" />
          <div className="h-3 bg-surface rounded w-1/2" />
        </div>
        <div className="p-(--card-content-padding) pt-0">
          <div className="h-3 bg-surface rounded w-full mb-2" />
          <div className="h-3 bg-surface rounded w-full mb-2" />
          <div className="h-3 bg-surface rounded w-2/3" />
        </div>
      </div>
    ) : (
      children
    );

    const cardClassName = cn(
      "card_root",
      cardVariants({
        variant,
        color,
        shadow,
        hoverable,
        clickable,
      }),
      !bordered && "border-transparent",
      sizeClasses[size],
      classNames?.root,
      className,
    );

    const contextValue = React.useMemo(
      () => ({ variant, color, classNames }),
      [variant, color, classNames],
    );

    if (clickable) {
      return (
        <CardContext.Provider value={contextValue}>
          <div
            ref={ref}
            role="button"
            tabIndex={0}
            className={cardClassName}
            onClick={onClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }}
            data-slot="root"
            {...props}
          >
            {cardContent}
          </div>
        </CardContext.Provider>
      );
    }

    return (
      <CardContext.Provider value={contextValue}>
        <div ref={ref} className={cardClassName} onClick={onClick} data-slot="root" {...props}>
          {cardContent}
        </div>
      </CardContext.Provider>
    );
  },
);
Card.displayName = "Card";

const CardHeader: React.FC<CardHeaderProps> = ({ className, ref, ...props }) => {
  const ctx = useCardContext();
  return (
    <div
      ref={ref}
      className={cn("card_header", "flex flex-col gap-1.5 p-(--card-padding)", ctx?.classNames?.header, className)}
      data-slot="header"
      {...props}
    />
  );
};
CardHeader.displayName = "CardHeader";

const CardTitle: React.FC<CardTitleProps> = ({ className, as: Tag = "h3", ref, ...props }) => {
  const ctx = useCardContext();
  return (
    <Tag
      ref={ref}
      className={cn(
        "card_title",
        "text-lg font-semibold leading-none tracking-tight",
        ctx?.classNames?.title,
        className,
      )}
      data-slot="title"
      {...props}
    />
  );
};
CardTitle.displayName = "CardTitle";

const CardDescription: React.FC<CardDescriptionProps> = ({ className, ref, ...props }) => {
  const ctx = useCardContext();
  const isSolidColored = ctx?.variant === "solid" && ctx?.color !== "default";
  return (
    <p
      ref={ref}
      className={cn(
        "card_description",
        "text-sm",
        isSolidColored ? "text-inherit opacity-80" : "text-text-secondary",
        ctx?.classNames?.description,
        className,
      )}
      data-slot="description"
      {...props}
    />
  );
};
CardDescription.displayName = "CardDescription";

const CardContent: React.FC<CardContentProps> = ({ className, ref, ...props }) => {
  const ctx = useCardContext();
  return (
    <div
      ref={ref}
      className={cn("card_content", "p-(--card-content-padding) pt-0", ctx?.classNames?.content, className)}
      data-slot="content"
      {...props}
    />
  );
};
CardContent.displayName = "CardContent";

const CardFooter: React.FC<CardFooterProps> = ({ className, ref, ...props }) => {
  const ctx = useCardContext();
  return (
    <div
      ref={ref}
      className={cn(
        "card_footer",
        "flex items-center p-(--card-footer-padding) pt-0",
        ctx?.classNames?.footer,
        className,
      )}
      data-slot="footer"
      {...props}
    />
  );
};
CardFooter.displayName = "CardFooter";

const CardAction: React.FC<CardActionProps> = ({ className, ref, ...props }) => {
  const ctx = useCardContext();
  return (
    <div
      ref={ref}
      className={cn("card_action", "ml-auto flex items-center gap-2", ctx?.classNames?.action, className)}
      data-slot="action"
      {...props}
    />
  );
};
CardAction.displayName = "CardAction";

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  auto: "",
};

const objectFitClasses = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
};

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  position = "top",
  aspectRatio = "video",
  objectFit = "cover",
  className,
  ref,
  ...props
}) => {
  const ctx = useCardContext();
  return (
    <div
      className={cn(
        "overflow-hidden",
        position === "top" && "rounded-t-lg",
        position === "bottom" && "rounded-b-lg",
        aspectRatio !== "auto" && aspectRatioClasses[aspectRatio],
      )}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("card_image", "w-full h-full", objectFitClasses[objectFit], ctx?.classNames?.image, className)}
        data-slot="image"
        loading="lazy"
        {...props}
      />
    </div>
  );
};
CardImage.displayName = "CardImage";

const CardWithSubComponents = Object.assign(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Action: CardAction,
  Image: CardImage,
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardImage,
  cardVariants,
};

export type { CardClassNames } from "./types";
export type * from "./types";
export default CardWithSubComponents;
