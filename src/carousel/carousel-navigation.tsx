'use client'

import { Swiper as SwiperType } from 'swiper/types'
import { useEffect, useState } from 'react'
import { cn } from '../utils'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselNavigationProps {
  type: 'next' | 'prev'
  swiper: SwiperType | null
  className?: string
}

export function CarouselNavigation({ type, swiper, className }: CarouselNavigationProps) {
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: false,
  })

  useEffect(() => {
    if (!swiper) return

    const updateSlideState = () => {
      setSlideConfig({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd })
    }

    swiper.on('slideChange', updateSlideState)

    return () => {
      swiper.off('slideChange', updateSlideState)
    }
  }, [swiper])

  if (!swiper) return null
  if (slideConfig.isBeginning && type === 'prev') return null
  if (slideConfig.isEnd && type === 'next') return null

  return (
    <button
      type="button"
      aria-label={type === 'next' ? 'Next slide' : 'Previous slide'}
      onClick={(e) => {
        e.stopPropagation()
        if (type === 'next') {
          swiper?.slideNext()
        } else {
          swiper?.slidePrev()
        }
      }}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background shadow-sm hover:bg-surface transition cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none',
        className
      )}
    >
      {type === 'next' ? <ChevronRight width={18} height={18} aria-hidden="true" /> : <ChevronLeft width={18} height={18} aria-hidden="true" />}
    </button>
  )
}
