"use client";

import { cva } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

import { useRipple, RippleContainer } from "../hooks/useRipple";
import { cn, iconSizes } from "../utils";
import { colorVars } from "../variants";
import type { ClipboardProps } from "./types";

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback using ClipboardItem API (works in iframes / insecure contexts with user gesture)
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    const blob = new Blob([text], { type: "text/plain" });
    await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
    return;
  }
  // Last resort: textarea + Selection API (no deprecated execCommand)
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.cssText = "position:fixed;opacity:0;left:-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const selection = document.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(textarea);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    // execCommand is deprecated but still the only sync fallback in old browsers
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

const clipboardVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md font-medium transition-colors cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background relative overflow-hidden",
  {
    variants: {
      size: {
        xs: "px-1.5 py-1 text-xs",
        sm: "px-2 py-1.5 text-xs",
        md: "px-2.5 py-2 text-sm",
        lg: "px-3.5 py-2 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const getClipboardStyles = (color: string, variant: string) => {
  const baseColor = colorVars[color as keyof typeof colorVars] || colorVars.default

  if (variant === 'solid') {
    return cn(baseColor, 'bg-slot border-slot text-slot-fg hover:bg-slot-90')
  }
  if (variant === 'soft') {
    return cn(baseColor, 'bg-slot-10 border-slot-30 text-slot hover:bg-slot-20')
  }
  // default variant
  return cn(baseColor, 'bg-background border-slot text-slot hover:bg-slot-10')
}

const Clipboard = React.memo<ClipboardProps>(
  ({
    value,
    color = "default",
    size = "md",
    variant = "default",
    showValue = true,
    successDuration = 2000,
    disabled = false,
    onCopy,
    className,
    classNames,
    ref,
  }) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isMountedRef = useRef(true);
    const { ripples, onPointerDown: ripplePointerDown, onKeyDown: rippleKeyDown, onAnimationEnd: rippleAnimationEnd } = useRipple(!disabled);

    // Cleanup timeout on unmount to prevent memory leak
    useEffect(() => {
      return () => {
        isMountedRef.current = false;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    const handleCopy = async () => {
      if (disabled) return;

      try {
        await copyToClipboard(value);
        if (isMountedRef.current) setCopied(true);
        onCopy?.();

        // Clear any existing timer before setting a new one
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) setCopied(false);
        }, successDuration);
      } catch {
        // Copy failed - user can try again
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCopy();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleCopy}
        onPointerDown={ripplePointerDown}
        onKeyDown={(e) => { rippleKeyDown(e); handleKeyDown(e); }}
        aria-label={
          copied
            ? "Copied to clipboard"
            : `Copy ${showValue ? value : "to clipboard"}`
        }
        aria-disabled={disabled}
        aria-live="polite"
        className={cn(
          clipboardVariants({ size }),
          getClipboardStyles(color, variant),
          colorVars[color],
          'focus-visible:ring-slot',
          disabled && "opacity-50 cursor-not-allowed",
          !showValue && "aspect-square justify-center",
          "clipboard_root",
          classNames?.root,
          className,
        )}
        data-slot="root"
      >
        {showValue && (
          <span
            className={cn(
              "font-mono truncate clipboard_input",
              classNames?.input,
            )}
            data-slot="input"
          >
            {value}
          </span>
        )}
        {copied ? (
          <Check
            className={cn(
              iconSizes[size],
              "shrink-0 clipboard_button animate-in zoom-in-75 duration-200",
              classNames?.button,
            )}
            data-slot="icon"
          />
        ) : (
          <Copy
            className={cn(
              iconSizes[size],
              "shrink-0 clipboard_button",
              classNames?.button,
            )}
            data-slot="icon"
          />
        )}
        <RippleContainer ripples={ripples} onAnimationEnd={rippleAnimationEnd} />
      </div>
    );
  },
);

Clipboard.displayName = "Clipboard";

export type * from "./types";
export default Clipboard;
