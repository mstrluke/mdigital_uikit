import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Collapse from './index'

describe('Collapse', () => {
  it('renders with title', () => {
    render(<Collapse title="Section Title">Content</Collapse>)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('renders collapsed by default', () => {
    render(<Collapse title="Title">Hidden Content</Collapse>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders expanded when defaultOpen is true', () => {
    render(<Collapse title="Title" defaultOpen>Visible Content</Collapse>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles content when clicked', async () => {
    const user = userEvent.setup()
    render(<Collapse title="Title">Content</Collapse>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('calls onChange when toggled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Collapse title="Title" onChange={onChange}>Content</Collapse>)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(onChange).toHaveBeenCalledWith(true)

    await user.click(button)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('respects controlled open state', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Collapse title="Title" open={false} onChange={onChange}>
        Content
      </Collapse>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(onChange).toHaveBeenCalledWith(true)

    // Parent controls the state
    rerender(
      <Collapse title="Title" open={true} onChange={onChange}>
        Content
      </Collapse>
    )

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Collapse title="Title" size="xs">Content</Collapse>)
    expect(screen.getByText('Title')).toBeInTheDocument()

    rerender(<Collapse title="Title" size="sm">Content</Collapse>)
    expect(screen.getByText('Title')).toBeInTheDocument()

    rerender(<Collapse title="Title" size="md">Content</Collapse>)
    expect(screen.getByText('Title')).toBeInTheDocument()

    rerender(<Collapse title="Title" size="lg">Content</Collapse>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Collapse title="Title" color={color}>Content</Collapse>)
      expect(screen.getByText('Title')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Collapse title="Title" variant={variant}>Content</Collapse>)
      expect(screen.getByText('Title')).toBeInTheDocument()
      unmount()
    })
  })

  it('disables interaction when disabled is true', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Collapse title="Title" disabled onChange={onChange}>Content</Collapse>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<Collapse title="Title">Content</Collapse>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded')
    expect(button).toHaveAttribute('aria-controls')

    const region = screen.getByRole('region', { hidden: true })
    expect(region).toHaveAttribute('aria-labelledby')
    expect(region).toHaveAttribute('aria-hidden')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Collapse title="Title" className="custom-class">Content</Collapse>
    )
    const collapse = container.querySelector('.collapse_root')
    expect(collapse).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    render(
      <Collapse
        title="Title"
        classNames={{
          root: 'root-class',
          header: 'header-class',
          content: 'content-class',
          icon: 'icon-class',
        }}
        defaultOpen
      >
        Content
      </Collapse>
    )

    const root = screen.getByText('Title').closest('.collapse_root')
    expect(root).toHaveClass('root-class')

    const button = screen.getByRole('button')
    expect(button).toHaveClass('header-class')
  })

  it('forwards ref to collapse element', () => {
    const ref = { current: null }
    render(<Collapse title="Title" ref={ref}>Content</Collapse>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('rotates chevron icon when expanded', async () => {
    const user = userEvent.setup()
    const { container } = render(<Collapse title="Title">Content</Collapse>)

    const icon = container.querySelector('.collapse_icon')
    expect(icon).not.toHaveClass('rotate-180')

    const button = screen.getByRole('button')
    await user.click(button)

    expect(icon).toHaveClass('rotate-180')
  })

  it('renders ReactNode as title', () => {
    render(
      <Collapse title={<span data-testid="custom-title">Custom Title</span>}>
        Content
      </Collapse>
    )
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })
})
