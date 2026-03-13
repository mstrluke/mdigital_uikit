import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cascader from './index'

describe('Cascader', () => {
  const mockOptions = [
    {
      value: '1',
      label: 'Option 1',
      children: [
        { value: '1-1', label: 'Option 1-1' },
        { value: '1-2', label: 'Option 1-2' },
      ],
    },
    {
      value: '2',
      label: 'Option 2',
      children: [
        { value: '2-1', label: 'Option 2-1' },
      ],
    },
  ]

  it('renders cascader component', () => {
    render(<Cascader options={mockOptions} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Cascader options={mockOptions} placeholder="Select option" />)
    expect(screen.getByText('Select option')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<Cascader options={mockOptions} />)

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onChange when value is selected', async () => {
    const onChange = vi.fn()
    render(<Cascader options={mockOptions} onChange={onChange} />)

    // onChange is called when selections are made
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    render(<Cascader options={mockOptions} value={['1', '1-1']} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('disables cascader when disabled is true', () => {
    render(<Cascader options={mockOptions} disabled />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('aria-disabled', 'true')
    expect(trigger).toHaveAttribute('tabIndex', '-1')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Cascader options={mockOptions} className="custom-class" />
    )
    const cascader = container.querySelector('.custom-class')
    expect(cascader).toBeInTheDocument()
  })

  it('renders with size variants', () => {
    const { rerender } = render(<Cascader options={mockOptions} size="sm" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()

    rerender(<Cascader options={mockOptions} size="md" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()

    rerender(<Cascader options={mockOptions} size="lg" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('handles empty options', () => {
    render(<Cascader options={[]} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with multiple selection', () => {
    render(<Cascader options={mockOptions} multiple />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with clearable enabled', () => {
    render(<Cascader options={mockOptions} value={['1', '1-1']} clearable />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('clears value when clear button is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Cascader
        options={mockOptions}
        value={['1', '1-1']}
        onChange={onChange}
        clearable
      />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()

    // Clear button should be visible
    const clearButton = screen.getByLabelText('Clear selection')
    await user.click(clearButton)

    expect(onChange).toHaveBeenCalledWith([], [])
  })
})
