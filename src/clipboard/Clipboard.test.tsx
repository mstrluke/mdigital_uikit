import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Clipboard from './index'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
})

describe('Clipboard', () => {
  it('renders with value displayed', () => {
    render(<Clipboard value="Copy this" />)
    expect(screen.getByText('Copy this')).toBeInTheDocument()
  })

  it('copies text to clipboard when clicked', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')

    render(<Clipboard value="Copy this" />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(writeText).toHaveBeenCalledWith('Copy this')
  })

  it('calls onCopy callback on successful copy', async () => {
    const onCopy = vi.fn()
    const user = userEvent.setup()

    render(<Clipboard value="Copy this" onCopy={onCopy} />)

    const button = screen.getByRole('button')
    await user.click(button)

    await vi.waitFor(() => {
      expect(onCopy).toHaveBeenCalled()
    })
  })

  it('renders as button by default', () => {
    render(<Clipboard value="Copy this" />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Clipboard value="Copy this" className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles copy failure gracefully', async () => {
    const user = userEvent.setup()

    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(
      new Error('Copy failed')
    )

    render(<Clipboard value="Copy this" />)

    const button = screen.getByRole('button')
    await user.click(button)

    // Component silently handles errors, should still render
    expect(button).toBeInTheDocument()
  })

  it('hides value when showValue is false', () => {
    render(<Clipboard value="Copy this" showValue={false} />)
    expect(screen.queryByText('Copy this')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows success state after copy', async () => {
    const user = userEvent.setup()
    render(<Clipboard value="Copy this" />)

    const button = screen.getByRole('button')
    await user.click(button)

    // Component changes aria-label after successful copy
    await vi.waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Copied to clipboard')
    })
  })

  it('disables clipboard when disabled prop is true', () => {
    render(<Clipboard value="Copy this" disabled />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('tabIndex', '-1')
  })
})
