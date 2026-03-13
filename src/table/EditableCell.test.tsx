import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableCell } from './EditableCell'

describe('EditableCell', () => {
  const mockProps = {
    value: 'Test value',
    onValueChange: vi.fn(),
  }

  it('renders cell value', () => {
    render(<EditableCell {...mockProps} />)
    expect(screen.getByText('Test value')).toBeInTheDocument()
  })

  it('enters edit mode on click', async () => {
    const user = userEvent.setup()
    render(<EditableCell {...mockProps} />)

    const cell = screen.getByText('Test value')
    await user.click(cell)

    const input = screen.getByDisplayValue('Test value')
    expect(input).toBeInTheDocument()
  })

  it('saves value on Enter key', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    
    render(<EditableCell {...mockProps} onValueChange={onValueChange} />)

    const cell = screen.getByText('Test value')
    await user.click(cell)

    const input = screen.getByDisplayValue('Test value')
    await user.clear(input)
    await user.type(input, 'New value{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('New value')
  })

  it('cancels edit on Escape key', async () => {
    const user = userEvent.setup()
    render(<EditableCell {...mockProps} />)

    const cell = screen.getByText('Test value')
    await user.click(cell)

    const input = screen.getByDisplayValue('Test value')
    await user.clear(input)
    await user.type(input, 'New value{Escape}')

    expect(screen.getByText('Test value')).toBeInTheDocument()
  })

  it('saves on blur', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    
    render(<EditableCell {...mockProps} onValueChange={onValueChange} />)

    const cell = screen.getByText('Test value')
    await user.click(cell)

    const input = screen.getByDisplayValue('Test value')
    await user.clear(input)
    await user.type(input, 'New value')
    await user.tab()

    expect(onValueChange).toHaveBeenCalledWith('New value')
  })

  it('handles empty value', () => {
    const { container } = render(<EditableCell {...mockProps} value="" />)
    const cell = container.querySelector('.table_editableCell')
    expect(cell).toBeInTheDocument()
  })

  it('renders all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<EditableCell {...mockProps} size={size} />)
      expect(screen.getByText('Test value')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom className', () => {
    render(<EditableCell {...mockProps} className="custom-class" />)
    const container = screen.getByText('Test value').parentElement
    expect(container).toHaveClass('custom-class')
  })
})
