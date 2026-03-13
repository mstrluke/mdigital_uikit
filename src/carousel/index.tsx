'use client'

import React, { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperProps } from 'swiper/react'
import { PaginationOptions, Swiper as SwiperType } from 'swiper/types'

// Swiper styles — also available as separate import: '@mdigital_ui/ui/carousel/styles'
import './styles'

import { cn } from '../utils'
import { CarouselNavigation } from './carousel-navigation'

export interface CarouselClassNames {
  /**
   * Class name for the root container
   */
  root?: string

  /**
   * Class name for the wrapper element
   */
  wrapper?: string

  /**
   * Class name for individual slides
   */
  slide?: string

  /**
   * Class name for the navigation container
   */
  navigation?: string

  /**
   * Class name for navigation buttons
   */
  navButton?: string

  /**
   * Class name for the pagination container
   */
  pagination?: string

  /**
   * Class name for pagination dots
   */
  dot?: string

  /**
   * Class name for active pagination dot
   */
  dotActive?: string
}

export interface CarouselProps extends SwiperProps {
  withArrows?: boolean
  withPagination?: boolean
  children: React.ReactNode
  /**
   * ClassNames for component parts
   */
  classNames?: CarouselClassNames
  /**
   * Accessible label for the carousel
   */
  ariaLabel?: string
}

const pagination: PaginationOptions = {
  clickable: true,
  horizontalClass: 'pagination',
  bulletActiveClass: 'bg-text-primary',
  bulletClass:
    'inline-flex w-2.5 h-2.5 mx-1 rounded-full bg-border opacity-70 transition-[opacity,colors] duration-300 cursor-pointer hover:opacity-100',
}

const Carousel = React.memo<CarouselProps>(
  ({
    withArrows = false,
    withPagination = false,
    children,
    loop = false,
    className,
    classNames,
    modules,
    ariaLabel = 'Carousel',
    ...props
  }) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null)

    return (
      <div
        data-slot="root"
        className={cn(
          'carousel_root',
          'relative h-full group',
          classNames?.root,
          className
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {withArrows && (
          <div className={cn(
            'carousel_navigation',
            'absolute -translate-y-1/2 top-1/2 left-0 flex px-1 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,colors] duration-200',
            classNames?.navigation
          )}>
            <CarouselNavigation
              type="prev"
              swiper={swiper}
              className={cn('carousel_navButton', classNames?.navButton)}
            />
          </div>
        )}

        <Swiper
          loop={loop}
          {...props}
          modules={[...(withPagination ? [Pagination] : []), ...(modules || [])]}
          pagination={withPagination ? pagination : false}
          className={cn('carousel_wrapper', 'relative', classNames?.wrapper)}
          onBeforeInit={(s) => {
            setSwiper(s)
          }}
        >
          {children}
        </Swiper>

        {withArrows && (
          <div className={cn(
            'carousel_navigation',
            'absolute -translate-y-1/2 top-1/2 right-0 flex px-1 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,colors] duration-200',
            classNames?.navigation
          )}>
            <CarouselNavigation
              type="next"
              swiper={swiper}
              className={cn('carousel_navButton', classNames?.navButton)}
            />
          </div>
        )}
      </div>
    )
  },
)

Carousel.displayName = 'Carousel'

export default Carousel
