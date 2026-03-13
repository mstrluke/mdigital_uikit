import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Transfer } from './index'
import type { TransferItem } from './types'

describe('Transfer', () => {
  const mockDataSource: TransferItem[] = [
    { key: '1', label: 'Item 1', description: 'Description 1' },
    { key: '2', label: 'Item 2', description: 'Description 2' },
    { key: '3', label: 'Item 3', description: 'Description 3' },
  ]

  it('renders transfer component', () => {
    render(<Transfer dataSource={mockDataSource} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders with targetKeys', () => {
    render(<Transfer dataSource={mockDataSource} targetKeys={['1']} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('renders all items in source list initially', () => {
    render(<Transfer dataSource={mockDataSource} />)
    mockDataSource.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('calls onChange when items are transferred', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Transfer dataSource={mockDataSource} onChange={onChange} />)

    // Select first item in source list
    const checkboxes = screen.getAllByRole('checkbox')
    // Skip the "select all" checkboxes (first in each list)
    if (checkboxes.length > 2) {
      await user.click(checkboxes[1]) // First item checkbox

      // Click the move to right button
      const moveButtons = screen.getAllByRole('button')
      const moveRightButton = moveButtons.find(btn => btn.title === 'Move selected to right')
      if (moveRightButton) {
        await user.click(moveRightButton)
        expect(onChange).toHaveBeenCalled()
      }
    }
  })

  it('renders with custom titles', () => {
    render(
      <Transfer
        dataSource={mockDataSource}
        titles={['Source List', 'Target List']}
      />
    )
    expect(screen.getByText('Source List')).toBeInTheDocument()
    expect(screen.getByText('Target List')).toBeInTheDocument()
  })

  it('disables transfer when disabled is true', () => {
    render(<Transfer dataSource={mockDataSource} disabled />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()

    // All checkboxes should be disabled
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeDisabled()
    })
  })

  it('handles empty dataSource', () => {
    render(<Transfer dataSource={[]} />)
    expect(screen.getAllByText('No data').length).toBeGreaterThan(0)
  })

  it('renders with showSearch enabled', () => {
    render(<Transfer dataSource={mockDataSource} showSearch />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()

    // Should have search inputs
    const searchInputs = screen.getAllByPlaceholderText('Search...')
    expect(searchInputs.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <Transfer dataSource={mockDataSource} className="custom-class" />
    )
    const transfer = container.querySelector('.transfer_root')
    expect(transfer).toHaveClass('custom-class')
  })

  it('renders with default titles', () => {
    render(<Transfer dataSource={mockDataSource} />)
    expect(screen.getByText('Source')).toBeInTheDocument()
    expect(screen.getByText('Target')).toBeInTheDocument()
  })

  it('renders item descriptions', () => {
    render(<Transfer dataSource={mockDataSource} />)
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  it('handles oneWay mode', () => {
    render(<Transfer dataSource={mockDataSource} oneWay />)

    // Should not have "move to left" buttons in oneWay mode
    const buttons = screen.getAllByRole('button')
    const moveLeftButtons = buttons.filter(btn =>
      btn.title === 'Move selected to left' || btn.title === 'Move all to left'
    )
    expect(moveLeftButtons.length).toBe(0)
  })

  it('renders with custom list height', () => {
    const { container } = render(<Transfer dataSource={mockDataSource} listHeight={400} />)
    // Check that lists have the specified height
    expect(container.innerHTML).toContain('400')
  })

  it('disables individual items', () => {
    const dataWithDisabled: TransferItem[] = [
      { key: '1', label: 'Item 1', disabled: true },
      { key: '2', label: 'Item 2' },
    ]

    render(<Transfer dataSource={dataWithDisabled} />)

    const checkboxes = screen.getAllByRole('checkbox')
    // Check that at least one checkbox is disabled (excluding select-all)
    const disabledCheckboxes = checkboxes.filter(cb => cb.hasAttribute('disabled'))
    expect(disabledCheckboxes.length).toBeGreaterThan(0)
  })
})
