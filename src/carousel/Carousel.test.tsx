import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Carousel from './index'

// Mock Swiper since it requires browser environment
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}))

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
  EffectFade: {},
  EffectCube: {},
  EffectFlip: {},
  EffectCoverflow: {},
}))

describe('Carousel', () => {
  it('renders carousel component', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    )
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  it('renders all slides', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    )
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Carousel className="custom-carousel">
        <div>Slide 1</div>
      </Carousel>
    )
    expect(container.querySelector('.custom-carousel')).toBeInTheDocument()
  })

  it('handles autoplay prop', () => {
    render(
      <Carousel autoplay>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    )
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  it('handles loop prop', () => {
    render(
      <Carousel loop>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    )
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  it('handles pagination prop', () => {
    render(
      <Carousel pagination>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    )
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  it('handles navigation prop', () => {
    render(
      <Carousel navigation>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    )
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })

  it('renders with different effects', () => {
    const effects = ['slide', 'fade', 'cube', 'flip', 'coverflow'] as const
    effects.forEach((effect) => {
      const { unmount } = render(
        <Carousel effect={effect}>
          <div>Slide 1</div>
        </Carousel>
      )
      expect(screen.getByTestId('swiper')).toBeInTheDocument()
      unmount()
    })
  })

  it('handles single slide', () => {
    render(
      <Carousel>
        <div>Only Slide</div>
      </Carousel>
    )
    expect(screen.getByText('Only Slide')).toBeInTheDocument()
  })
})
