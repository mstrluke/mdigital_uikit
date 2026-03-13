import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Spinner from '../spinner'

describe('Spinner', () => {
  it('renders spinner with default props', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders with custom label', () => {
    render(<Spinner label="Please wait" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Please wait')
    expect(screen.getByText('Please wait')).toBeInTheDocument()
  })

  it('renders without visible label by default', () => {
    render(<Spinner />)
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
  })

  it('displays label text when provided', () => {
    render(<Spinner label="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('renders with xs size', () => {
    render(<Spinner size="xs" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with sm size by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with md size', () => {
    render(<Spinner size="md" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with lg size', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Spinner color={color} />)
      expect(screen.getByRole('status')).toBeInTheDocument()
      unmount()
    })
  })

  it('has animate-spin class', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('has rounded-full class for circular shape', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('rounded-full')
  })

  it('applies custom className to root', () => {
    render(<Spinner className="custom-spinner" />)
    const root = screen.getByRole('status').parentElement
    expect(root).toHaveClass('custom-spinner')
  })

  it('has proper accessibility role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
