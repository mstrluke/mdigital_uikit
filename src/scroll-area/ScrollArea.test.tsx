import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScrollArea from '../scroll-area'

describe('ScrollArea', () => {
  it('renders scroll area with children', () => {
    render(
      <ScrollArea>
        <div>Scrollable content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Scrollable content')).toBeInTheDocument()
  })

  it('renders with default vertical direction', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveClass('overflow-y-auto')
  })

  it('renders horizontal scroll area', () => {
    render(
      <ScrollArea direction="horizontal">
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveClass('overflow-x-auto')
  })

  it('renders both direction scroll area', () => {
    render(
      <ScrollArea direction="both">
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveClass('overflow-auto')
  })

  it('applies maxHeight style', () => {
    render(
      <ScrollArea maxHeight={300}>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveStyle({ maxHeight: '300px' })
  })

  it('applies maxHeight with string value', () => {
    render(
      <ScrollArea maxHeight="20rem">
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveStyle({ maxHeight: '20rem' })
  })

  it('applies maxWidth style', () => {
    render(
      <ScrollArea maxWidth={500}>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveStyle({ maxWidth: '500px' })
  })

  it('applies maxWidth with string value', () => {
    render(
      <ScrollArea maxWidth="30rem">
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveStyle({ maxWidth: '30rem' })
  })

  it('renders with xs size', () => {
    render(
      <ScrollArea size="xs">
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with sm size', () => {
    render(
      <ScrollArea size="sm">
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with md size by default', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with lg size', () => {
    render(
      <ScrollArea size="lg">
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with auto scrollbar visibility by default', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with always visible scrollbar', () => {
    render(
      <ScrollArea scrollbarVisibility="always">
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with hover visible scrollbar', () => {
    render(
      <ScrollArea scrollbarVisibility="hover">
        <div>Content</div>
      </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies custom className to root', () => {
    render(
      <ScrollArea className="custom-scroll">
        <div>Content</div>
      </ScrollArea>
    )
    const root = screen.getByText('Content').parentElement?.parentElement
    expect(root).toHaveClass('custom-scroll')
  })

  it('applies classNames.root', () => {
    render(
      <ScrollArea classNames={{ root: 'root-class' }}>
        <div>Content</div>
      </ScrollArea>
    )
    const root = screen.getByText('Content').parentElement?.parentElement
    expect(root).toHaveClass('root-class')
  })

  it('applies classNames.viewport', () => {
    render(
      <ScrollArea classNames={{ viewport: 'viewport-class' }}>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveClass('viewport-class')
  })

  it('forwards ref to root element', () => {
    const ref = { current: null }
    render(
      <ScrollArea ref={ref}>
        <div>Content</div>
      </ScrollArea>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('has overflow-hidden on root', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const root = screen.getByText('Content').parentElement?.parentElement
    expect(root).toHaveClass('overflow-hidden')
  })

  it('has relative positioning on root', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const root = screen.getByText('Content').parentElement?.parentElement
    expect(root).toHaveClass('relative')
  })

  it('injects style tag for scrollbar customization', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const styleTags = document.head.querySelectorAll('style')
    const hasScrollStyle = Array.from(styleTags).some(s => s.textContent?.includes('scrollbar'))
    expect(hasScrollStyle).toBe(true)
  })

  it('viewport has data-slot attribute', () => {
    render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveAttribute('data-slot', 'viewport')
  })

  it('merges custom style prop with computed styles', () => {
    render(
      <ScrollArea style={{ padding: '1rem' }} maxHeight={200}>
        <div>Content</div>
      </ScrollArea>
    )
    const viewport = screen.getByText('Content').parentElement
    expect(viewport).toHaveStyle({ padding: '1rem', maxHeight: '200px' })
  })
})
