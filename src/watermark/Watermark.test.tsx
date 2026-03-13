import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Watermark from './index'

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    scale: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    set fillStyle(_v: any) {},
    set font(_v: any) {},
    set textAlign(_v: any) {},
    set textBaseline(_v: any) {},
    set globalAlpha(_v: any) {},
    translate: vi.fn(),
    rotate: vi.fn(),
  }) as any
  HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mock')
})

describe('Watermark', () => {
  it('renders children', () => {
    render(<Watermark text="Confidential"><p>Secret content</p></Watermark>)
    expect(screen.getByText('Secret content')).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<Watermark text="Test"><div>Content</div></Watermark>)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders content slot', () => {
    const { container } = render(<Watermark text="Test"><div>Content</div></Watermark>)
    expect(container.querySelector('[data-slot="content"]')).toBeInTheDocument()
  })

  it('renders without text or image', () => {
    const { container } = render(<Watermark><div>Content</div></Watermark>)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })
})
