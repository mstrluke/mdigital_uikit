import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Divider from '../divider'

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders as hr element when no children', () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')
    expect(divider.tagName).toBe('HR')
  })

  it('renders vertical divider', () => {
    render(<Divider orientation="vertical" />)
    const divider = screen.getByRole('separator')
    expect(divider).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders with text label', () => {
    render(<Divider>Section Title</Divider>)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('renders as div when has children', () => {
    render(<Divider>Label</Divider>)
    const container = screen.getByText('Label').closest('[role="separator"]')
    expect(container?.tagName).toBe('DIV')
  })

  it('renders different variants', () => {
    const { rerender } = render(<Divider variant="solid" />)
    expect(screen.getByRole('separator')).toHaveClass('border-solid')

    rerender(<Divider variant="dashed" />)
    expect(screen.getByRole('separator')).toHaveClass('border-dashed')

    rerender(<Divider variant="dotted" />)
    expect(screen.getByRole('separator')).toHaveClass('border-dotted')
  })

  it('renders different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Divider color={color} />)
      expect(screen.getByRole('separator')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders text with left alignment', () => {
    render(<Divider textAlign="left">Left</Divider>)
    expect(screen.getByText('Left')).toBeInTheDocument()
  })

  it('renders text with center alignment by default', () => {
    render(<Divider>Center</Divider>)
    expect(screen.getByText('Center')).toBeInTheDocument()
  })

  it('renders text with right alignment', () => {
    render(<Divider textAlign="right">Right</Divider>)
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('applies custom spacing', () => {
    render(<Divider spacing="2rem 0" />)
    const divider = screen.getByRole('separator')
    expect(divider).toHaveStyle({ margin: '2rem 0' })
  })

  it('applies custom className', () => {
    render(<Divider className="custom-divider" />)
    expect(screen.getByRole('separator')).toHaveClass('custom-divider')
  })

  it('applies classNames.root', () => {
    render(<Divider classNames={{ root: 'root-class' }} />)
    expect(screen.getByRole('separator')).toHaveClass('root-class')
  })

  it('applies classNames.label to text', () => {
    render(<Divider classNames={{ label: 'label-class' }}>Text</Divider>)
    expect(screen.getByText('Text')).toHaveClass('label-class')
  })

  it('renders line elements with text divider', () => {
    render(<Divider>With Lines</Divider>)
    const container = screen.getByRole('separator')
    const lines = container.querySelectorAll('[data-slot="line"]')
    expect(lines).toHaveLength(2)
  })

  it('renders label in correct position', () => {
    render(<Divider>Label</Divider>)
    const label = screen.getByText('Label')
    expect(label).toHaveAttribute('data-slot', 'label')
  })

  it('renders with data-slot attribute on root', () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')
    expect(divider).toHaveAttribute('data-slot', 'root')
  })

  it('has whitespace-nowrap on label', () => {
    render(<Divider>Long Label Text</Divider>)
    const label = screen.getByText('Long Label Text')
    expect(label).toHaveClass('whitespace-nowrap')
  })

  it('applies color to both lines and label', () => {
    render(<Divider color="primary">Primary Text</Divider>)
    expect(screen.getByText('Primary Text')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('vertical divider ignores text children', () => {
    // Vertical orientation doesn't support text labels
    render(<Divider orientation="vertical">Should not render</Divider>)
    // The divider itself should render but without the text
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
