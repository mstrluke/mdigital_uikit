'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

import { cn } from '../utils'
import type { WatermarkProps } from './types'

function generateWatermark({
  text,
  image,
  width = 120,
  height = 64,
  rotate = -22,
  gap = [100, 100] as [number, number],
  offset = [0, 0] as [number, number],
  fontSize = 14,
  fontFamily = 'sans-serif',
  fontWeight = 'normal',
  fontColor = 'rgba(0,0,0,0.15)',
  opacity = 1,
}: Omit<WatermarkProps, 'children' | 'className' | 'classNames' | 'zIndex'>): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const ratio = window.devicePixelRatio || 1

    const cellWidth = width + gap[0]
    const cellHeight = height + gap[1]
    canvas.width = cellWidth * ratio
    canvas.height = cellHeight * ratio
    ctx.scale(ratio, ratio)

    ctx.globalAlpha = opacity
    ctx.translate(cellWidth / 2 + offset[0], cellHeight / 2 + offset[1])
    ctx.rotate((rotate * Math.PI) / 180)

    if (image) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, -width / 2, -height / 2, width, height)
        resolve(canvas.toDataURL())
      }
      img.onerror = () => resolve('')
      img.src = image
    } else if (text) {
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      ctx.fillStyle = fontColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const lines = Array.isArray(text) ? text : [text]
      const lineHeight = fontSize * 1.5
      const startY = -((lines.length - 1) * lineHeight) / 2

      lines.forEach((line, i) => {
        ctx.fillText(line, 0, startY + i * lineHeight)
      })
      resolve(canvas.toDataURL())
    } else {
      resolve('')
    }
  })
}

const Watermark = React.memo<WatermarkProps>(
  ({
    children,
    text,
    image,
    width = 120,
    height = 64,
    rotate = -22,
    gap = [100, 100],
    offset = [0, 0],
    fontSize = 14,
    fontFamily = 'sans-serif',
    fontWeight = 'normal',
    fontColor = 'rgba(0,0,0,0.15)',
    opacity = 1,
    zIndex = 10,
    className,
    classNames,
  }) => {
    const [bgImage, setBgImage] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const watermarkRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<MutationObserver | null>(null)

    const render = useCallback(async () => {
      if (typeof window === 'undefined') return
      const dataUrl = await generateWatermark({
        text, image, width, height, rotate, gap, offset, fontSize, fontFamily, fontWeight, fontColor, opacity,
      })
      setBgImage(dataUrl)
    }, [text, image, width, height, rotate, gap, offset, fontSize, fontFamily, fontWeight, fontColor, opacity])

    useEffect(() => { render() }, [render])

    // Tamper protection: re-render if watermark DOM is modified
    useEffect(() => {
      if (!watermarkRef.current || !containerRef.current) return
      observerRef.current = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'childList') {
            const removed = Array.from(m.removedNodes)
            if (removed.includes(watermarkRef.current!)) { render(); return }
          }
          if (m.type === 'attributes' && m.target === watermarkRef.current) { render(); return }
        }
      })
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      })
      return () => observerRef.current?.disconnect()
    }, [render])

    return (
      <div
        ref={containerRef}
        data-slot="root"
        className={cn('watermark_root', 'relative', classNames?.root, className)}
      >
        <div data-slot="content" className={cn('watermark_content', 'relative', classNames?.content)}>
          {children}
        </div>
        {bgImage && (
          <div
            ref={watermarkRef}
            data-slot="watermark"
            className={cn('watermark_layer', 'absolute inset-0 pointer-events-none', classNames?.watermark)}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: 'repeat',
              zIndex,
            }}
          />
        )}
      </div>
    )
  },
)

Watermark.displayName = 'Watermark'

export type * from './types'
export default Watermark
