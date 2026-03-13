import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from '../button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders with default variant solid', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button_root')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="solid">Solid</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button variant="soft">Soft</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button variant="dashed">Dashed</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders different colors', () => {
    const colors: Array<'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Button color={color}>{color}</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="xs">XS</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button size="sm">SM</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button size="md">MD</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button size="lg">LG</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders different shapes', () => {
    const { rerender } = render(<Button shape="rounded">Rounded</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button shape="pill">Pill</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button shape="square">Square</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Loading', { selector: '.sr-only' })).toBeInTheDocument()
  })

  it('shows loading spinner with loadingText', () => {
    render(<Button loading loadingText="Please wait...">Submit</Button>)
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('shows spinner on left by default', () => {
    render(<Button loading loadingText="Loading">Button</Button>)
    const spinner = screen.getByRole('button').querySelector('[data-slot="spinner"]')
    expect(spinner).toBeInTheDocument()
  })

  it('shows spinner on right when loadingPosition is right', () => {
    render(<Button loading loadingPosition="right" loadingText="Loading">Button</Button>)
    const spinner = screen.getByRole('button').querySelector('[data-slot="spinner"]')
    expect(spinner).toBeInTheDocument()
  })

  it('renders left icon', () => {
    render(<Button leftIcon={<span data-testid="icon">+</span>}>Add</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders right icon', () => {
    render(<Button rightIcon={<span data-testid="icon">→</span>}>Next</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders icon with iconPlacement left', () => {
    render(<Button icon={<span data-testid="icon">★</span>} iconPlacement="left">Star</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders icon with iconPlacement right', () => {
    render(<Button icon={<span data-testid="icon">★</span>} iconPlacement="right">Star</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('leftIcon takes precedence over icon prop', () => {
    render(
      <Button
        leftIcon={<span data-testid="left">L</span>}
        icon={<span data-testid="icon">I</span>}
      >
        Button
      </Button>
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })

  it('renders fullWidth button', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders iconOnly button', () => {
    render(<Button iconOnly icon={<span data-testid="icon">+</span>} aria-label="Add" />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles pressed state for toggle buttons', () => {
    const { rerender } = render(<Button pressed={false}>Toggle</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')

    rerender(<Button pressed={true}>Toggle</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('applies classNames.root', () => {
    render(<Button classNames={{ root: 'root-class' }}>Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('root-class')
  })

  it('forwards ref to button element', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('disables button when loading', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button loading onClick={handleClick}>Loading</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('sets button type to button by default', () => {
    render(<Button>Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('respects custom button type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('has proper accessibility attributes when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders with ripple effect when enabled', () => {
    render(<Button ripple>Ripple</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
