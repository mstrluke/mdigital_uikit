import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker, ColorInput } from './index'

describe('ColorPicker', () => {
  it('renders data-slot="root"', () => {
    const { container } = render(<ColorPicker />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<ColorPicker label="Background" />)
    expect(screen.getByText('Background')).toBeInTheDocument()
  })

  it('renders color preview', () => {
    const { container } = render(<ColorPicker value="#ff0000" />)
    expect(container.querySelector('[data-slot="preview"]')).toBeInTheDocument()
  })

  it('renders hex input with current value', () => {
    render(<ColorPicker value="#ff0000" />)
    const input = screen.getByDisplayValue('#ff0000')
    expect(input).toBeInTheDocument()
  })

  it('renders swatches', () => {
    const swatches = ['#ff0000', '#00ff00', '#0000ff']
    const { container } = render(<ColorPicker swatches={swatches} />)
    expect(container.querySelector('[data-slot="swatches"]')).toBeInTheDocument()
    expect(container.querySelectorAll('.colorPicker_swatch').length).toBe(3)
  })

  it('calls onChange when swatch clicked', () => {
    const onChange = vi.fn()
    const swatches = ['#ff0000', '#00ff00']
    render(<ColorPicker onChange={onChange} swatches={swatches} />)
    fireEvent.click(screen.getByLabelText('Select color #ff0000'))
    expect(onChange).toHaveBeenCalledWith('#ff0000')
  })

  it('renders without crashing with no props', () => {
    const { container } = render(<ColorPicker />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })
})

describe('ColorInput', () => {
  it('renders with label', () => {
    render(<ColorInput label="Color" />)
    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<ColorInput />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('shows current hex value', () => {
    render(<ColorInput value="#ff5500" />)
    expect(screen.getByText('#ff5500')).toBeInTheDocument()
  })
})
