import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Kbd from './index'

describe('Kbd', () => {
  it('renders keyboard key text', () => {
    render(<Kbd>Ctrl</Kbd>)
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Kbd size="xs">XS</Kbd>)
    expect(screen.getByText('XS')).toBeInTheDocument()

    rerender(<Kbd size="sm">SM</Kbd>)
    expect(screen.getByText('SM')).toBeInTheDocument()

    rerender(<Kbd size="md">MD</Kbd>)
    expect(screen.getByText('MD')).toBeInTheDocument()

    rerender(<Kbd size="lg">LG</Kbd>)
    expect(screen.getByText('LG')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Kbd color={color}>{color}</Kbd>)
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['solid', 'outline', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Kbd variant={variant}>{variant}</Kbd>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders with default outline variant', () => {
    const { container } = render(<Kbd>Test</Kbd>)
    const kbd = container.querySelector('.kbd_root')
    expect(kbd).toBeInTheDocument()
  })

  it('renders multiple keys in sequence', () => {
    render(
      <div>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>C</Kbd>
      </div>
    )
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
  })

  it('renders with icon content', () => {
    render(
      <Kbd>
        <span data-testid="arrow-icon">→</span>
      </Kbd>
    )
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Kbd className="custom-class">Test</Kbd>)
    const kbd = screen.getByText('Test')
    expect(kbd).toHaveClass('custom-class')
  })

  it('renders as kbd element', () => {
    const { container } = render(<Kbd>Test</Kbd>)
    const kbd = container.querySelector('kbd')
    expect(kbd).toBeInTheDocument()
  })

  it('has pointer-events-none class by default', () => {
    const { container } = render(<Kbd>Test</Kbd>)
    const kbd = container.querySelector('.kbd_root')
    expect(kbd).toHaveClass('pointer-events-none')
  })

  it('renders combination keys', () => {
    render(
      <div>
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>K</Kbd>
      </div>
    )
    expect(screen.getByText('⌘')).toBeInTheDocument()
    expect(screen.getByText('Shift')).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('applies all color and variant combinations', () => {
    const colors = ['default', 'primary', 'secondary'] as const
    const variants = ['solid', 'outline', 'soft'] as const

    colors.forEach((color) => {
      variants.forEach((variant) => {
        const { unmount } = render(
          <Kbd color={color} variant={variant}>
            {color}-{variant}
          </Kbd>
        )
        expect(screen.getByText(`${color}-${variant}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  it('accepts and passes through HTML attributes', () => {
    render(<Kbd data-testid="test-kbd" title="Keyboard shortcut">Ctrl</Kbd>)
    const kbd = screen.getByTestId('test-kbd')
    expect(kbd).toHaveAttribute('title', 'Keyboard shortcut')
  })
})
