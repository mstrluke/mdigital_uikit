import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tag from './index'

describe('Tag', () => {
  it('renders tag with text content', () => {
    render(<Tag>Label</Tag>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Tag size="xs">XS</Tag>)
    expect(screen.getByText('XS')).toBeInTheDocument()

    rerender(<Tag size="sm">SM</Tag>)
    expect(screen.getByText('SM')).toBeInTheDocument()

    rerender(<Tag size="md">MD</Tag>)
    expect(screen.getByText('MD')).toBeInTheDocument()

    rerender(<Tag size="lg">LG</Tag>)
    expect(screen.getByText('LG')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Tag color={color}>{color}</Tag>)
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'outline', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Tag variant={variant}>{variant}</Tag>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders closable tag with close button', () => {
    render(<Tag closable>Closable</Tag>)
    expect(screen.getByRole('button', { name: /remove closable/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Tag closable onClose={onClose}>
        Test
      </Tag>
    )

    const closeButton = screen.getByRole('button', { name: /remove test/i })
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is activated with Enter key', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Tag closable onClose={onClose}>
        Test
      </Tag>
    )

    const closeButton = screen.getByRole('button', { name: /remove test/i })
    closeButton.focus()
    await user.keyboard('{Enter}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is activated with Space key', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Tag closable onClose={onClose}>
        Test
      </Tag>
    )

    const closeButton = screen.getByRole('button', { name: /remove test/i })
    closeButton.focus()
    await user.keyboard(' ')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders with custom icon', () => {
    render(
      <Tag icon={<span data-testid="test-icon">★</span>}>
        Featured
      </Tag>
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('calls onClick when tag is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Tag onClick={onClick}>Clickable</Tag>)

    const tag = screen.getByText('Clickable').parentElement
    await user.click(tag!)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('activates onClick with Enter key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Tag onClick={onClick}>Clickable</Tag>)

    const tag = screen.getByRole('button')
    tag.focus()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('activates onClick with Space key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Tag onClick={onClick}>Clickable</Tag>)

    const tag = screen.getByRole('button')
    tag.focus()
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClose with Delete key when closable', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Tag closable onClose={onClose}>Test</Tag>)

    const tag = screen.getByText('Test').parentElement as HTMLElement
    tag.focus()
    await user.keyboard('{Delete}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose with Backspace key when closable', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Tag closable onClose={onClose}>Test</Tag>)

    const tag = screen.getByText('Test').parentElement as HTMLElement
    tag.focus()
    await user.keyboard('{Backspace}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose with Delete key when disableKeyboardRemoval is true', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Tag closable disableKeyboardRemoval onClose={onClose}>
        Test
      </Tag>
    )

    // With disableKeyboardRemoval, the tag root should not be a button
    const tag = screen.getByText('Test').parentElement
    if (tag) {
      tag.focus()
      await user.keyboard('{Delete}')
    }

    expect(onClose).not.toHaveBeenCalled()
  })

  it('has proper accessibility attributes when clickable', () => {
    render(<Tag onClick={() => {}}>Clickable</Tag>)
    const tag = screen.getByRole('button')

    expect(tag).toHaveAttribute('role', 'button')
    expect(tag).toHaveAttribute('tabIndex', '0')
    expect(tag).toHaveAttribute('aria-label', 'Clickable')
  })

  it('has proper accessibility attributes on close button', () => {
    render(<Tag closable>Test</Tag>)
    const closeButton = screen.getByRole('button', { name: /remove test/i })

    expect(closeButton).toHaveAttribute('aria-label', 'Remove Test')
  })

  it('applies custom className', () => {
    render(<Tag className="custom-class">Test</Tag>)
    const tag = screen.getByText('Test').parentElement
    expect(tag).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    render(
      <Tag
        closable
        classNames={{
          root: 'root-class',
          content: 'content-class',
          closeButton: 'close-class',
        }}
      >
        Test
      </Tag>
    )

    const tag = screen.getByText('Test').parentElement
    expect(tag).toHaveClass('root-class')

    const content = screen.getByText('Test')
    expect(content).toHaveClass('content-class')

    const closeButton = screen.getByRole('button', { name: /remove test/i })
    expect(closeButton).toHaveClass('close-class')
  })

  it('prevents event propagation when close button is clicked', async () => {
    const onClose = vi.fn()
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Tag closable onClose={onClose} onClick={onClick}>
        Test
      </Tag>
    )

    const closeButton = screen.getByRole('button', { name: /remove test/i })
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClick).not.toHaveBeenCalled()
  })
})
