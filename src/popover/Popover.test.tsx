import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './index'

describe('Popover', () => {
  it('renders popover with trigger and content', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Open Popover')
    expect(trigger).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('renders with controlled state', () => {
    render(
      <Popover open={true} onOpenChange={vi.fn()}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders PopoverTrigger with data-slot attribute', () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
      </Popover>
    )
    const trigger = screen.getByText('Trigger')
    expect(trigger.closest('[data-slot="popover-trigger"]')).toBeInTheDocument()
  })

  it('renders PopoverContent with data-slot attribute', () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    const content = screen.getByText('Content')
    expect(content.closest('[data-slot="popover-content"]')).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const { unmount } = render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent size={size}>{size}</PopoverContent>
        </Popover>
      )
      expect(screen.getByText(size)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different variants', () => {
    const variants = ['default', 'solid', 'soft'] as const

    variants.forEach((variant) => {
      const { unmount } = render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent variant={variant}>{variant}</PopoverContent>
        </Popover>
      )
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different colors', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent color={color}>{color}</PopoverContent>
        </Popover>
      )
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom className to content', () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>
    )
    const content = screen.getByText('Content').closest('[data-slot="popover-content"]')
    expect(content).toHaveClass('custom-class')
    expect(content).toHaveClass('popover_content')
  })

  it('applies classNames object', () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent classNames={{ content: 'custom-content' }}>
          Content
        </PopoverContent>
      </Popover>
    )
    const content = screen.getByText('Content').closest('[data-slot="popover-content"]')
    expect(content).toHaveClass('custom-content')
  })

  it('supports align prop', () => {
    const aligns = ['start', 'center', 'end'] as const

    aligns.forEach((align) => {
      const { unmount } = render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent align={align}>{align}</PopoverContent>
        </Popover>
      )
      expect(screen.getByText(align)).toBeInTheDocument()
      unmount()
    })
  })

  it('supports sideOffset prop', () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent sideOffset={8}>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders PopoverAnchor', () => {
    render(
      <Popover open={true}>
        <PopoverAnchor>Anchor</PopoverAnchor>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    const anchor = screen.getByText('Anchor')
    expect(anchor.closest('[data-slot="popover-anchor"]')).toBeInTheDocument()
  })

  it('closes popover when clicking trigger again', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByText('Toggle')

    await user.click(trigger)
    expect(screen.getByText('Content')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('can contain interactive elements', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <button onClick={handleClick}>Interactive Button</button>
        </PopoverContent>
      </Popover>
    )

    const button = screen.getByRole('button', { name: 'Interactive Button' })
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('combines size, variant, and color props', () => {
    render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent size="lg" variant="solid" color="primary">
          Combined
        </PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Combined')).toBeInTheDocument()
  })

  it('handles onOpenChange callback', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    render(
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText('Trigger'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })
})
