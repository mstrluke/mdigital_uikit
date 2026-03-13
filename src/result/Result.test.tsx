import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Result from './index'

describe('Result', () => {
  it('renders data-slot="root"', () => {
    const { container } = render(<Result />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders default title for status', () => {
    render(<Result status="success" />)
    expect(screen.getByText('Successfully Done')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<Result title="Payment Complete" />)
    expect(screen.getByText('Payment Complete')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<Result subtitle="Your order has been placed" />)
    expect(screen.getByText('Your order has been placed')).toBeInTheDocument()
  })

  it('renders extra content', () => {
    render(<Result extra={<button>Go Home</button>} />)
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Result><p>Additional details</p></Result>)
    expect(screen.getByText('Additional details')).toBeInTheDocument()
  })

  it('renders 404 status', () => {
    render(<Result status="404" />)
    expect(screen.getByText('404 — Page Not Found')).toBeInTheDocument()
  })

  it('renders 403 status', () => {
    render(<Result status="403" />)
    expect(screen.getByText('403 — Access Denied')).toBeInTheDocument()
  })

  it('renders 500 status', () => {
    render(<Result status="500" />)
    expect(screen.getByText('500 — Server Error')).toBeInTheDocument()
  })

  it('renders custom icon', () => {
    render(<Result icon={<span data-testid="custom-icon">🎉</span>} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})
