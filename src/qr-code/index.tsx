"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";

import { cn } from "../utils";
import { colorVars } from "../variants";
import type { QRCodeProps, QRModuleStyle, QRFinderStyle } from "./types";
import type { ComponentColor } from "../types";

// ── QR generation ───────────────────────────────────────────

interface QRMatrix {
  size: number;
  get(row: number, col: number): number;
}

let _createFn: ((text: string, opts?: any) => { modules: QRMatrix }) | null =
  null;

async function loadQRLib(): Promise<boolean> {
  if (_createFn) return true;
  try {
    const mod: any = await import("qrcode");
    _createFn = mod.create || mod.default?.create || null;
    return !!_createFn;
  } catch {
    return false;
  }
}

function createQRMatrixSync(text: string, errorLevel: string): QRMatrix | null {
  if (!_createFn) return null;
  try {
    const result = _createFn(text, { errorCorrectionLevel: errorLevel });
    return result.modules as QRMatrix;
  } catch {
    return null;
  }
}

// ── Resolve computed color from an element's CSS var ────────

function resolveColor(el: Element, varName: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = getComputedStyle(el).getPropertyValue(varName).trim();
    if (!raw) return null;
    // Convert oklch / any CSS color to a canvas-usable string
    const probe = document.createElement("div");
    probe.style.color = raw;
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    return computed || null;
  } catch {
    return null;
  }
}

// ── Hook: read a slot CSS var from an element ref ───────────
// Watches for theme mutations and re-resolves automatically.

function useSlotColor(
  rootRef: React.RefObject<HTMLElement | null>,
  explicitColor: string | undefined,
  slotVar: string,
  fallback: string,
): string {
  const [resolved, setResolved] = useState(explicitColor || fallback);

  useEffect(() => {
    if (explicitColor) {
      setResolved(explicitColor);
      return;
    }

    const update = () => {
      const el = rootRef.current;
      if (!el) return;
      const computed = resolveColor(el, slotVar);
      setResolved(computed || fallback);
    };

    // Initial + delayed resolve (slot vars need the element to be in the DOM)
    update();
    const raf = requestAnimationFrame(update);

    // Re-resolve when theme changes
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [explicitColor, slotVar, fallback, rootRef]);

  return resolved;
}

// ── Finder pattern detection ────────────────────────────────

function isFinderModule(row: number, col: number, size: number): boolean {
  if (row < 7 && col < 7) return true;
  if (row < 7 && col >= size - 7) return true;
  if (row >= size - 7 && col < 7) return true;
  return false;
}

// ── Canvas renderer ─────────────────────────────────────────

function drawCanvasQR(
  canvas: HTMLCanvasElement,
  matrix: QRMatrix,
  pixelSize: number,
  color: string,
  bgColor: string,
  moduleStyle: QRModuleStyle,
  finderStyle: QRFinderStyle,
  iconArea?: { x: number; y: number; w: number; h: number },
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  canvas.width = pixelSize * ratio;
  canvas.height = pixelSize * ratio;
  canvas.style.width = `${pixelSize}px`;
  canvas.style.height = `${pixelSize}px`;
  ctx.scale(ratio, ratio);

  const moduleCount = matrix.size;
  const cellSize = pixelSize / moduleCount;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, pixelSize, pixelSize);

  ctx.fillStyle = color;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!matrix.get(row, col)) continue;

      const x = col * cellSize;
      const y = row * cellSize;

      if (
        iconArea &&
        x + cellSize > iconArea.x &&
        x < iconArea.x + iconArea.w &&
        y + cellSize > iconArea.y &&
        y < iconArea.y + iconArea.h
      ) {
        continue;
      }

      const isFinder = isFinderModule(row, col, moduleCount);

      if (isFinder) {
        drawFinderModule(ctx, x, y, cellSize, finderStyle);
      } else {
        drawDataModule(ctx, x, y, cellSize, moduleStyle);
      }
    }
  }
}

function drawDataModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: QRModuleStyle,
) {
  const gap = size * 0.1;

  switch (style) {
    case "dots": {
      const radius = (size - gap * 2) / 2;
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "rounded": {
      const r = size * 0.3;
      const s = size - gap;
      const ox = x + gap / 2;
      const oy = y + gap / 2;
      ctx.beginPath();
      ctx.moveTo(ox + r, oy);
      ctx.arcTo(ox + s, oy, ox + s, oy + s, r);
      ctx.arcTo(ox + s, oy + s, ox, oy + s, r);
      ctx.arcTo(ox, oy + s, ox, oy, r);
      ctx.arcTo(ox, oy, ox + s, oy, r);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "squares":
    default: {
      ctx.fillRect(x + gap / 2, y + gap / 2, size - gap, size - gap);
      break;
    }
  }
}

function drawFinderModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: QRFinderStyle,
) {
  switch (style) {
    case "dot": {
      const r = size / 2;
      ctx.beginPath();
      ctx.arc(x + r, y + r, r * 0.9, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "rounded": {
      const radius = size * 0.3;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + size, y, x + size, y + size, radius);
      ctx.arcTo(x + size, y + size, x, y + size, radius);
      ctx.arcTo(x, y + size, x, y, radius);
      ctx.arcTo(x, y, x + size, y, radius);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "square":
    default:
      ctx.fillRect(x, y, size, size);
      break;
  }
}

// ── SVG renderer ────────────────────────────────────────────

function buildSVGPaths(
  matrix: QRMatrix,
  cellSize: number,
  moduleStyle: QRModuleStyle,
  finderStyle: QRFinderStyle,
  iconArea?: { x: number; y: number; w: number; h: number },
): string {
  const paths: string[] = [];
  const moduleCount = matrix.size;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!matrix.get(row, col)) continue;

      const x = col * cellSize;
      const y = row * cellSize;

      if (
        iconArea &&
        x + cellSize > iconArea.x &&
        x < iconArea.x + iconArea.w &&
        y + cellSize > iconArea.y &&
        y < iconArea.y + iconArea.h
      ) {
        continue;
      }

      const isFinder = isFinderModule(row, col, moduleCount);
      const style = isFinder ? finderStyle : (moduleStyle as string);
      const gap = cellSize * 0.1;

      if (style === "dots" || style === "dot") {
        const r = (cellSize - (isFinder ? 0 : gap * 2)) / 2;
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        paths.push(
          `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0`,
        );
      } else if (style === "rounded") {
        const r = cellSize * 0.3;
        const s = cellSize - (isFinder ? 0 : gap);
        const ox = x + (isFinder ? 0 : gap / 2);
        const oy = y + (isFinder ? 0 : gap / 2);
        paths.push(
          `M${ox + r},${oy}H${ox + s - r}Q${ox + s},${oy} ${ox + s},${oy + r}V${oy + s - r}Q${ox + s},${oy + s} ${ox + s - r},${oy + s}H${ox + r}Q${ox},${oy + s} ${ox},${oy + s - r}V${oy + r}Q${ox},${oy} ${ox + r},${oy}Z`,
        );
      } else {
        const g = isFinder ? 0 : gap / 2;
        paths.push(
          `M${x + g},${y + g}h${cellSize - g * 2}v${cellSize - g * 2}h${-(cellSize - g * 2)}Z`,
        );
      }
    }
  }

  return paths.join("");
}

// ── Component ───────────────────────────────────────────────

const QRCode = React.memo<QRCodeProps>(
  ({
    value,
    size = 128,
    color = "default" as ComponentColor,
    fgColor,
    bgColor: bgColorProp,
    errorLevel = "M",
    type = "canvas",
    moduleStyle = "squares",
    finderStyle = "square",
    icon,
    iconSize = 40,
    iconBorderRadius = 4,
    bordered = true,
    status = "active",
    onRefresh,
    refreshText = "Refresh",
    expiredText = "QR code expired",
    className,
    classNames,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const [libLoaded, setLibLoaded] = useState(!!_createFn);

    // Slot system: colorVars sets --_c on the root element.
    // We read --_c (fg) and --color-background (bg) from computed style.
    const resolvedFg = useSlotColor(rootRef, fgColor, "--_c", "#000000");
    const resolvedBg = useSlotColor(
      rootRef,
      bgColorProp,
      "--color-background",
      "#ffffff",
    );

    useEffect(() => {
      if (_createFn) {
        setLibLoaded(true);
        return;
      }
      loadQRLib().then((ok) => setLibLoaded(ok));
    }, []);

    const matrix = useMemo(() => {
      if (!value || !libLoaded) return null;
      return createQRMatrixSync(value, errorLevel);
    }, [value, errorLevel, libLoaded]);

    const iconArea = useMemo(() => {
      if (!icon || !matrix) return undefined;
      const moduleCount = matrix.size;
      const cellSize = size / moduleCount;
      const centerX = (size - iconSize) / 2;
      const centerY = (size - iconSize) / 2;
      const pad = cellSize * 2;
      return {
        x: centerX - pad,
        y: centerY - pad,
        w: iconSize + pad * 2,
        h: iconSize + pad * 2,
      };
    }, [icon, matrix, size, iconSize]);

    const renderCanvas = useCallback(() => {
      if (!canvasRef.current || !matrix || typeof window === "undefined")
        return;
      drawCanvasQR(
        canvasRef.current,
        matrix,
        size,
        resolvedFg,
        resolvedBg,
        moduleStyle,
        finderStyle,
        iconArea,
      );
    }, [
      matrix,
      size,
      resolvedFg,
      resolvedBg,
      moduleStyle,
      finderStyle,
      iconArea,
    ]);

    useEffect(() => {
      if (type === "canvas") renderCanvas();
    }, [type, renderCanvas]);

    const svgContent = useMemo(() => {
      if (type !== "svg" || !matrix) return null;
      const cellSize = size / matrix.size;
      const d = buildSVGPaths(
        matrix,
        cellSize,
        moduleStyle,
        finderStyle,
        iconArea,
      );
      return d;
    }, [type, matrix, size, moduleStyle, finderStyle, iconArea]);

    return (
      <div
        ref={rootRef}
        data-slot="root"
        className={cn(
          "qrCode_root",
          "relative inline-flex flex-col items-center",
          colorVars[color],
          bordered && "p-3 rounded-lg border border-slot bg-background",
          classNames?.root,
          className,
        )}
      >
        {type === "canvas" ? (
          <canvas
            ref={canvasRef}
            data-slot="canvas"
            className={cn("qrCode_canvas", classNames?.canvas)}
            style={{ width: size, height: size }}
          />
        ) : (
          <svg
            data-slot="svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={cn("qrCode_svg", classNames?.svg)}
          >
            <rect width={size} height={size} fill={resolvedBg} />
            {svgContent && <path d={svgContent} fill={resolvedFg} />}
          </svg>
        )}

        {/* Icon overlay */}
        {icon && status === "active" && (
          <div
            data-slot="icon"
            className={cn("qrCode_icon", "absolute", classNames?.icon)}
            style={{
              width: iconSize,
              height: iconSize,
              top: `calc(50% - ${iconSize / 2}px)`,
              left: `calc(50% - ${iconSize / 2}px)`,
              backgroundColor: resolvedBg,
              borderRadius: iconBorderRadius,
              padding: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={icon}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: Math.max(0, iconBorderRadius - 2),
              }}
            />
          </div>
        )}

        {/* Loading overlay */}
        {status === "loading" && (
          <div
            data-slot="overlay"
            className={cn(
              "qrCode_overlay",
              "absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg",
              classNames?.overlay,
            )}
          >
            <div className="w-6 h-6 border-2 border-slot border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Expired overlay */}
        {status === "expired" && (
          <div
            data-slot="overlay"
            className={cn(
              "qrCode_overlay",
              "absolute inset-0 flex flex-col items-center justify-center bg-background/90 rounded-lg gap-2",
              classNames?.overlay,
            )}
          >
            <p className="text-sm text-text-secondary">{expiredText}</p>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="text-sm text-slot hover:opacity-80 font-medium cursor-pointer"
              >
                {refreshText}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

QRCode.displayName = "QRCode";

export type * from "./types";
export default QRCode;
