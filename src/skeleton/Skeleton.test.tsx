import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skeleton from '../skeleton'

describe('Skeleton', () => {
  it('renders skeleton element', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toBeInTheDocument()
  })

  it('has animate-pulse class for loading animation', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('renders with xs size', () => {
    const { container } = render(<Skeleton size="xs" />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('h-3')
  })

  it('renders with sm size', () => {
    const { container } = render(<Skeleton size="sm" />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('h-4')
  })

  it('renders with md size by default', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('h-5')
  })

  it('renders with lg size', () => {
    const { container } = render(<Skeleton size="lg" />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('h-6')
  })

  it('renders with different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { container, unmount } = render(<Skeleton color={color} />)
      const skeleton = container.querySelector('[data-slot="root"]')
      expect(skeleton).toBeInTheDocument()
      unmount()
    })
  })

  it('renders as rounded rectangle by default', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('rounded')
  })

  it('renders as circle when circle prop is true', () => {
    const { container } = render(<Skeleton circle />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('rounded-full')
    expect(skeleton).toHaveClass('aspect-square')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('custom-skeleton')
  })

  it('has skeleton_root class', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('skeleton_root')
  })

  it('can be used for text loading placeholder', () => {
    const { container } = render(
      <div>
        <Skeleton size="lg" className="w-48 mb-2" />
        <Skeleton size="md" className="w-64 mb-1" />
        <Skeleton size="sm" className="w-32" />
      </div>
    )
    const skeletons = container.querySelectorAll('[data-slot="root"]')
    expect(skeletons).toHaveLength(3)
  })

  it('can be used for avatar loading placeholder', () => {
    const { container } = render(<Skeleton circle size="lg" className="w-12 h-12" />)
    const skeleton = container.querySelector('[data-slot="root"]')
    expect(skeleton).toHaveClass('rounded-full')
  })
})
