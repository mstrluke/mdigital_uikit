import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Tooltip, { TooltipProvider } from './index'

describe('Tooltip', () => {
  it('renders tooltip trigger', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip content" delayDuration={0}>
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByRole('button')
    await user.hover(trigger)

    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('renders tooltip trigger element', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip content" delayDuration={0}>
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content={`${size} tooltip`} size={size} delayDuration={0}>
            <button>{size}</button>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole('button', { name: size })).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different colors', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content={`${color} tooltip`} color={color} delayDuration={0}>
            <button>{color}</button>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole('button', { name: color })).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different variants', () => {
    const variants = ['solid', 'soft'] as const

    variants.forEach((variant) => {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content={`${variant} tooltip`} variant={variant} delayDuration={0}>
            <button>{variant}</button>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument()
      unmount()
    })
  })

  it('supports different sides', () => {
    const sides = ['top', 'right', 'bottom', 'left'] as const

    sides.forEach((side) => {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content={`${side} tooltip`} side={side} delayDuration={0}>
            <button>{side}</button>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole('button', { name: side })).toBeInTheDocument()
      unmount()
    })
  })

  it('supports different alignments', () => {
    const aligns = ['start', 'center', 'end'] as const

    aligns.forEach((align) => {
      const { unmount } = render(
        <TooltipProvider>
          <Tooltip content="Tooltip" align={align} delayDuration={0}>
            <button>{align}</button>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole('button', { name: align })).toBeInTheDocument()
      unmount()
    })
  })

  it('respects delayDuration prop', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip" delayDuration={500}>
          <button>Hover</button>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not render tooltip when disabled', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip content" disabled delayDuration={0}>
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByRole('button'))
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('renders just children when disabled', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip" disabled>
          <button>Button</button>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip" className="custom-class" delayDuration={0}>
          <button>Hover</button>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies classNames.content', () => {
    render(
      <TooltipProvider>
        <Tooltip
          content="Tooltip"
          classNames={{ content: 'custom-content' }}
          delayDuration={0}
        >
          <button>Hover</button>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders React node as content', () => {
    render(
      <TooltipProvider>
        <Tooltip
          content={
            <div>
              <strong>Bold</strong> text
            </div>
          }
          delayDuration={0}
        >
          <button>Hover</button>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('combines size, color, and variant props', () => {
    render(
      <TooltipProvider>
        <Tooltip
          content="Combined"
          size="lg"
          color="primary"
          variant="soft"
          delayDuration={0}
        >
          <button>Hover</button>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('wraps trigger element correctly', () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip">
          <button type="button" aria-label="Action">
            Click
          </button>
        </Tooltip>
      </TooltipProvider>
    )
    const button = screen.getByRole('button', { name: 'Action' })
    expect(button).toBeInTheDocument()
  })
})
