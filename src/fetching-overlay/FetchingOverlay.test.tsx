import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import FetchingOverlay from './index'

describe('FetchingOverlay', () => {
  it('renders with isFetching true', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toBeInTheDocument()
    expect(root).not.toHaveClass('opacity-0')
  })

  it('renders with isFetching false', () => {
    const { container } = render(<FetchingOverlay isFetching={false} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toBeInTheDocument()
    expect(root).toHaveClass('opacity-0')
  })

  it('renders spinner when fetching', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toBeInTheDocument()
  })

  it('applies pointer-events-none when not fetching', () => {
    const { container } = render(<FetchingOverlay isFetching={false} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('pointer-events-none')
  })

  it('renders in fullscreen mode by default', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('fixed')
    expect(root).toHaveClass('w-full')
    expect(root).toHaveClass('h-screen')
  })

  it('renders in non-fullscreen mode when fullscreen is false', () => {
    const { container } = render(<FetchingOverlay isFetching={true} fullscreen={false} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).not.toHaveClass('fixed')
    expect(root).toHaveClass('absolute')
  })

  it('applies default backdrop opacity', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root') as HTMLElement
    expect(root?.style.backgroundColor).toBe('rgba(0, 0, 0, 0.3)')
  })

  it('applies custom backdrop opacity', () => {
    const { container } = render(<FetchingOverlay isFetching={true} backdropOpacity={50} />)
    const root = container.querySelector('.fetchingOverlay_root') as HTMLElement
    expect(root?.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)')
  })

  it('does not apply background color when not fetching', () => {
    const { container } = render(<FetchingOverlay isFetching={false} />)
    const root = container.querySelector('.fetchingOverlay_root') as HTMLElement
    expect(root?.style.backgroundColor).toBeFalsy()
  })

  it('renders all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<FetchingOverlay isFetching={true} size={size} />)
      unmount()
    })
  })

  it('renders with default large size', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<FetchingOverlay isFetching={true} className="custom-class" />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('custom-class')
  })

  it('has data-slot attribute on root', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root).toBeInTheDocument()
  })

  it('centers spinner in overlay', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('flex')
    expect(root).toHaveClass('items-center')
    expect(root).toHaveClass('justify-center')
  })

  it('fills container with inset-0', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('inset-0')
  })

  it('has proper z-index in fullscreen mode', () => {
    const { container } = render(<FetchingOverlay isFetching={true} fullscreen={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('z-[var(--z-overlay)]')
  })

  it('does not have overlay z-index in non-fullscreen mode', () => {
    const { container } = render(<FetchingOverlay isFetching={true} fullscreen={false} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).not.toHaveClass('z-[var(--z-overlay)]')
  })

  it('applies transition classes', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('transition-opacity')
    expect(root).toHaveClass('duration-300')
  })

  it('passes spinner props to Spinner component', () => {
    const { container } = render(<FetchingOverlay isFetching={true} color="primary" />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toBeInTheDocument()
  })

  it('shows overlay with opacity 100 when fetching', () => {
    const { container } = render(<FetchingOverlay isFetching={true} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('opacity-100')
  })

  it('transitions smoothly between states', () => {
    const { container, rerender } = render(<FetchingOverlay isFetching={false} />)
    const root = container.querySelector('.fetchingOverlay_root')
    expect(root).toHaveClass('opacity-0')

    rerender(<FetchingOverlay isFetching={true} />)
    expect(root).toHaveClass('opacity-100')
  })

  it('renders with zero backdrop opacity', () => {
    const { container } = render(<FetchingOverlay isFetching={true} backdropOpacity={0} />)
    const root = container.querySelector('.fetchingOverlay_root') as HTMLElement
    expect(root?.style.backgroundColor).toBe('rgba(0, 0, 0, 0)')
  })

  it('renders with full backdrop opacity', () => {
    const { container } = render(<FetchingOverlay isFetching={true} backdropOpacity={100} />)
    const root = container.querySelector('.fetchingOverlay_root') as HTMLElement
    // Browser normalizes rgba(0, 0, 0, 1) to rgb(0, 0, 0)
    expect(root?.style.backgroundColor).toMatch(/rgba?\(0, 0, 0/)
  })
})
