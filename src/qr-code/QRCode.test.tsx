import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import QRCode from './index'

// Mock canvas context for jsdom
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    scale: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    arcTo: vi.fn(),
    closePath: vi.fn(),
    set fillStyle(_v: any) {},
    set font(_v: any) {},
    set textAlign(_v: any) {},
    set textBaseline(_v: any) {},
    set globalAlpha(_v: any) {},
    translate: vi.fn(),
    rotate: vi.fn(),
    toDataURL: vi.fn().mockReturnValue('data:image/png;base64,'),
  }) as any
  HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,')
})

describe('QRCode', () => {
  it('renders data-slot="root"', () => {
    const { container } = render(<QRCode value="https://example.com" />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders canvas', () => {
    const { container } = render(<QRCode value="test" />)
    expect(container.querySelector('[data-slot="canvas"]')).toBeInTheDocument()
  })

  it('shows expired overlay', () => {
    render(<QRCode value="test" status="expired" />)
    expect(screen.getByText('QR code expired')).toBeInTheDocument()
  })

  it('shows refresh button when expired', () => {
    const onRefresh = vi.fn()
    render(<QRCode value="test" status="expired" onRefresh={onRefresh} />)
    expect(screen.getByText('Refresh')).toBeInTheDocument()
  })

  it('shows loading overlay', () => {
    const { container } = render(<QRCode value="test" status="loading" />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders without border', () => {
    const { container } = render(<QRCode value="test" bordered={false} />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).not.toContain('border-slot')
  })

  // ── Slot-based color system tests ──────────────────────────

  it('applies colorVars slot classes for default color', () => {
    const { container } = render(<QRCode value="test" />)
    const root = container.querySelector('[data-slot="root"]')
    // default colorVars sets --_c to text-primary
    expect(root?.className).toContain('--_c:var(--color-text-primary)')
  })

  it('applies colorVars slot classes for primary', () => {
    const { container } = render(<QRCode value="test" color="primary" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).toContain('--_c:var(--color-primary)')
  })

  it('applies colorVars slot classes for success', () => {
    const { container } = render(<QRCode value="test" color="success" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).toContain('--_c:var(--color-success)')
  })

  it('applies colorVars slot classes for error', () => {
    const { container } = render(<QRCode value="test" color="error" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).toContain('--_c:var(--color-error)')
  })

  it('uses border-slot when bordered', () => {
    const { container } = render(<QRCode value="test" color="primary" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).toContain('border-slot')
  })

  it('does not apply border-slot when not bordered', () => {
    const { container } = render(<QRCode value="test" color="primary" bordered={false} />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root?.className).not.toContain('border-slot')
  })

  it('accepts explicit fgColor override', () => {
    const { container } = render(<QRCode value="test" fgColor="#ff0000" />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('accepts explicit bgColor override', () => {
    const { container } = render(<QRCode value="test" bgColor="#00ff00" />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })
})
