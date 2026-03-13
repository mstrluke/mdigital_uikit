import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './index'

describe('Badge', () => {
  it('renders standalone badge with text content', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders with default variant and color', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('badge_root')
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Badge size="xs">XS</Badge>)
    expect(screen.getByText('XS')).toBeInTheDocument()

    rerender(<Badge size="sm">SM</Badge>)
    expect(screen.getByText('SM')).toBeInTheDocument()

    rerender(<Badge size="md">MD</Badge>)
    expect(screen.getByText('MD')).toBeInTheDocument()

    rerender(<Badge size="lg">LG</Badge>)
    expect(screen.getByText('LG')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Badge color={color}>{color}</Badge>)
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all shape variants', () => {
    const { rerender } = render(<Badge shape="rounded">Rounded</Badge>)
    expect(screen.getByText('Rounded')).toBeInTheDocument()

    rerender(<Badge shape="pill">Pill</Badge>)
    expect(screen.getByText('Pill')).toBeInTheDocument()

    rerender(<Badge shape="circle">C</Badge>)
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'outline', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders count badge', () => {
    render(<Badge count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('shows count overflow with maxCount', () => {
    render(<Badge count={150} maxCount={99} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('does not render when count is 0 and showZero is false', () => {
    const { container } = render(<Badge count={0} />)
    expect(container.textContent).toBe('')
  })

  it('renders when count is 0 and showZero is true', () => {
    render(<Badge count={0} showZero />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders floating badge over children', () => {
    render(
      <Badge count={3}>
        <button>Notifications</button>
      </Badge>
    )
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders dot indicator', () => {
    const { container } = render(<Badge dot />)
    const badge = container.querySelector('.badge_root')
    expect(badge).toBeInTheDocument()
  })

  it('renders dot with processing animation', () => {
    const { container } = render(<Badge dot processing />)
    const badge = container.querySelector('.badge_root')
    expect(badge).toHaveClass('animate-pulse')
  })

  it('renders with custom icon', () => {
    render(
      <Badge icon={<span data-testid="test-icon">★</span>}>
        Featured
      </Badge>
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('applies all placement positions for floating badge', () => {
    const placements = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const
    placements.forEach((placement) => {
      const { unmount } = render(
        <Badge count={1} placement={placement}>
          <div>Content</div>
        </Badge>
      )
      expect(screen.getByText('1')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies offset to floating badge', () => {
    render(
      <Badge count={1} offset={[10, -5]}>
        <div>Content</div>
      </Badge>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('hides badge when invisible prop is true', () => {
    const { container } = render(<Badge invisible>Hidden</Badge>)
    const badge = container.querySelector('.badge_root')
    expect(badge).toHaveClass('opacity-0', 'scale-0')
  })

  it('renders standalone mode with children as badge content', () => {
    render(<Badge standalone>Standalone</Badge>)
    expect(screen.getByText('Standalone')).toBeInTheDocument()
  })

  it('renders content prop over count', () => {
    render(<Badge count={10} content="NEW" />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
    expect(screen.queryByText('10')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('custom-class')
  })

  it('applies wrapperClassName when floating', () => {
    const { container } = render(
      <Badge count={1} wrapperClassName="wrapper-class">
        <div>Content</div>
      </Badge>
    )
    const wrapper = container.querySelector('.wrapper-class')
    expect(wrapper).toBeInTheDocument()
  })

  it('forwards ref to badge element', () => {
    const ref = { current: null }
    render(<Badge ref={ref}>Test</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
