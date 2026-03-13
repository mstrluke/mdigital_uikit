import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Link from './index'

describe('Link', () => {
  it('renders link with text', () => {
    render(<Link href="/test">Click here</Link>)
    const link = screen.getByRole('link', { name: /Click here/ })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Link href="/test" onClick={handleClick}>Link</Link>)

    await user.click(screen.getByRole('link'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Link href="#" color={color}>{color}</Link>)
      expect(screen.getByRole('link')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Link href="#" size="xs">XS</Link>)
    expect(screen.getByRole('link')).toHaveClass('text-xs')

    rerender(<Link href="#" size="sm">SM</Link>)
    expect(screen.getByRole('link')).toHaveClass('text-sm')

    rerender(<Link href="#" size="md">MD</Link>)
    expect(screen.getByRole('link')).toHaveClass('text-base')

    rerender(<Link href="#" size="lg">LG</Link>)
    expect(screen.getByRole('link')).toHaveClass('text-lg')
  })

  it('renders with hover underline by default', () => {
    render(<Link href="#">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('no-underline')
  })

  it('renders with always underline', () => {
    render(<Link href="#" underline="always">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('underline')
  })

  it('renders with no underline', () => {
    render(<Link href="#" underline="none">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('no-underline')
  })

  it('opens external links in new tab', () => {
    render(<Link href="https://example.com" external>External</Link>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows external icon for external links', () => {
    render(<Link href="https://example.com" external>External</Link>)
    const icon = screen.getByLabelText('Opens in new tab')
    expect(icon).toBeInTheDocument()
  })

  it('hides external icon when showExternalIcon is false', () => {
    render(<Link href="https://example.com" external showExternalIcon={false}>External</Link>)
    expect(screen.queryByLabelText('Opens in new tab')).not.toBeInTheDocument()
  })

  it('disables link when disabled prop is true', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Link href="/test" disabled onClick={handleClick}>Disabled</Link>)

    const link = screen.getByText('Disabled')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).not.toHaveAttribute('href')

    await user.click(link)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('has reduced opacity when disabled', () => {
    render(<Link href="#" disabled>Disabled</Link>)
    expect(screen.getByText('Disabled')).toHaveClass('opacity-50')
  })

  it('prevents default on disabled link click', async () => {
    const user = userEvent.setup()
    render(<Link href="/test" disabled>Disabled</Link>)

    const link = screen.getByText('Disabled')
    await user.click(link)
    // Link should not navigate (no href attribute)
    expect(link).not.toHaveAttribute('href')
  })

  it('renders with left icon', () => {
    render(
      <Link href="#" leftIcon={<span data-testid="left-icon">←</span>}>
        Back
      </Link>
    )
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    render(
      <Link href="#" rightIcon={<span data-testid="right-icon">→</span>}>
        Next
      </Link>
    )
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('renders with both left and right icons', () => {
    render(
      <Link
        href="#"
        leftIcon={<span data-testid="left">←</span>}
        rightIcon={<span data-testid="right">→</span>}
      >
        Link
      </Link>
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Link href="#" className="custom-link">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('custom-link')
  })

  it('applies classNames.root', () => {
    render(<Link href="#" classNames={{ root: 'root-class' }}>Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('root-class')
  })

  it('applies classNames.icon to icons', () => {
    render(
      <Link href="#" leftIcon={<span>←</span>} classNames={{ icon: 'icon-class' }}>
        Link
      </Link>
    )
    const iconContainer = screen.getByRole('link').querySelector('[data-slot="icon"]')
    expect(iconContainer).toHaveClass('icon-class')
  })

  it('applies classNames.externalIcon', () => {
    render(
      <Link href="https://example.com" external classNames={{ externalIcon: 'external-class' }}>
        External
      </Link>
    )
    const externalIcon = screen.getByRole('link').querySelector('[data-slot="externalIcon"]')
    expect(externalIcon).toHaveClass('external-class')
  })

  it('forwards ref to anchor element', () => {
    const ref = { current: null }
    render(<Link href="#" ref={ref}>Link</Link>)
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })

  it('has focus-visible ring styles', () => {
    render(<Link href="#">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('focus-visible:ring-2')
  })

  it('has pointer cursor when not disabled', () => {
    render(<Link href="#">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('cursor-pointer')
  })

  it('has not-allowed cursor when disabled', () => {
    render(<Link href="#" disabled>Link</Link>)
    expect(screen.getByText('Link')).toHaveClass('cursor-not-allowed')
  })
})
