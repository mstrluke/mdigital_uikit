import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Alert from './index'

describe('Alert', () => {
  it('renders with title', () => {
    render(<Alert title="Warning" />)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(<Alert description="Something happened" />)
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('renders title and description together', () => {
    render(<Alert title="Error" description="File not found" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('File not found')).toBeInTheDocument()
  })

  it('has role="alert"', () => {
    render(<Alert title="Test" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<Alert title="Test" />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('shows close button when closable', () => {
    render(<Alert title="Test" closable />)
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument()
  })

  it('hides on close click', () => {
    const onClose = vi.fn()
    render(<Alert title="Test" closable onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close alert'))
    expect(onClose).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not show close button by default', () => {
    render(<Alert title="Test" />)
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Alert><span>Custom content</span></Alert>)
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>} title="Test" />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('hides icon when icon={null}', () => {
    const { container } = render(<Alert icon={null} title="Test" />)
    expect(container.querySelector('[data-slot="icon"]')).not.toBeInTheDocument()
  })
})
