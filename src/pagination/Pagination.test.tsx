import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './index'

describe('Pagination', () => {
  it('renders with default props', () => {
    render(<Pagination total={100} />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 1 of 10')).toBeInTheDocument()
  })

  it('renders all page numbers when total pages is small', () => {
    render(<Pagination total={50} defaultPageSize={10} />)
    expect(screen.getByLabelText('Page 1 of 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 2 of 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 3 of 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 4 of 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 5 of 5')).toBeInTheDocument()
  })

  it('renders ellipsis for many pages', () => {
    const { container } = render(<Pagination total={200} defaultPageSize={10} />)
    const ellipsis = container.querySelectorAll('.pagination_ellipsis')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it('disables previous button on first page', () => {
    render(<Pagination total={100} defaultCurrent={1} />)
    const prevButton = screen.getByLabelText('Previous page')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination total={100} defaultPageSize={10} defaultCurrent={10} />)
    const nextButton = screen.getByLabelText('Next page')
    expect(nextButton).toBeDisabled()
  })

  it('handles page change on number click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} onChange={onChange} />)

    const page2 = screen.getByLabelText('Page 2 of 10')
    await user.click(page2)

    expect(onChange).toHaveBeenCalledWith(2, 10)
  })

  it('handles next button click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} defaultCurrent={1} onChange={onChange} />)

    const nextButton = screen.getByLabelText('Next page')
    await user.click(nextButton)

    expect(onChange).toHaveBeenCalledWith(2, 10)
  })

  it('handles previous button click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} defaultCurrent={3} onChange={onChange} />)

    const prevButton = screen.getByLabelText('Previous page')
    await user.click(prevButton)

    expect(onChange).toHaveBeenCalledWith(2, 10)
  })

  it('renders first and last buttons when showFirstLastButtons is true', () => {
    render(<Pagination total={100} showFirstLastButtons />)
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })

  it('handles first button click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} defaultCurrent={5} showFirstLastButtons onChange={onChange} />)

    const firstButton = screen.getByLabelText('First page')
    await user.click(firstButton)

    expect(onChange).toHaveBeenCalledWith(1, 10)
  })

  it('handles last button click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} defaultCurrent={1} showFirstLastButtons onChange={onChange} />)

    const lastButton = screen.getByLabelText('Last page')
    await user.click(lastButton)

    expect(onChange).toHaveBeenCalledWith(10, 10)
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Pagination total={100} size="xs" />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()

    rerender(<Pagination total={100} size="sm" />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()

    rerender(<Pagination total={100} size="md" />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()

    rerender(<Pagination total={100} size="lg" />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Pagination total={100} color={color} />)
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Pagination total={100} variant={variant} />)
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
      unmount()
    })
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(<Pagination total={100} current={1} onChange={onChange} />)

    const page2 = screen.getByLabelText('Page 2 of 10')
    await user.click(page2)

    expect(onChange).toHaveBeenCalledWith(2, 10)

    rerender(<Pagination total={100} current={2} onChange={onChange} />)
    expect(screen.getByLabelText('Page 2 of 10')).toHaveAttribute('aria-current', 'page')
  })

  it('renders page size changer when showSizeChanger is true', () => {
    render(<Pagination total={100} showSizeChanger />)
    expect(screen.getByLabelText('Items per page')).toBeInTheDocument()
  })

  it('handles page size change', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onShowSizeChange = vi.fn()
    render(<Pagination total={100} showSizeChanger onChange={onChange} onShowSizeChange={onShowSizeChange} />)

    const select = screen.getByLabelText('Items per page')
    await user.selectOptions(select, '20')

    expect(onShowSizeChange).toHaveBeenCalledWith(1, 20)
    expect(onChange).toHaveBeenCalledWith(1, 20)
  })

  it('renders custom page size options', () => {
    render(<Pagination total={100} showSizeChanger pageSizeOptions={[5, 15, 25]} />)
    const select = screen.getByLabelText('Items per page')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('5 / page')).toBeInTheDocument()
    expect(screen.getByText('15 / page')).toBeInTheDocument()
    expect(screen.getByText('25 / page')).toBeInTheDocument()
  })

  it('renders quick jumper when showQuickJumper is true', () => {
    render(<Pagination total={100} showQuickJumper />)
    expect(screen.getByText('Go to')).toBeInTheDocument()
    const input = screen.getByRole('spinbutton')
    expect(input).toBeInTheDocument()
  })

  it('handles quick jumper enter key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} showQuickJumper onChange={onChange} />)

    const input = screen.getByRole('spinbutton')
    await user.type(input, '5')
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledWith(5, 10)
  })

  it('renders total info when showTotal is provided', () => {
    render(<Pagination total={100} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`} />)
    expect(screen.getByText('1-10 of 100')).toBeInTheDocument()
  })

  it('disables all interactions when disabled is true', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} disabled onChange={onChange} />)

    const nextButton = screen.getByLabelText('Next page')
    await user.click(nextButton)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies current page styles', () => {
    render(<Pagination total={100} defaultCurrent={1} />)
    const currentPage = screen.getByLabelText('Page 1 of 10')
    expect(currentPage).toHaveAttribute('aria-current', 'page')
  })

  it('applies custom className', () => {
    const { container } = render(<Pagination total={100} className="custom-class" />)
    const root = container.querySelector('.pagination_root')
    expect(root).toHaveClass('custom-class')
  })

  it('applies custom classNames for different parts', () => {
    const { container } = render(
      <Pagination
        total={100}
        classNames={{
          root: 'root-class',
          list: 'list-class',
          button: 'button-class',
          buttonActive: 'active-class',
        }}
      />
    )
    expect(container.querySelector('.root-class')).toBeInTheDocument()
    expect(container.querySelector('.list-class')).toBeInTheDocument()
  })

  it('calculates total pages correctly', () => {
    render(<Pagination total={95} defaultPageSize={10} />)
    expect(screen.getByLabelText('Page 10 of 10')).toBeInTheDocument()
  })

  it('does not navigate beyond page bounds', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination total={100} defaultPageSize={10} defaultCurrent={10} onChange={onChange} />)

    const nextButton = screen.getByLabelText('Next page')
    await user.click(nextButton)

    expect(onChange).not.toHaveBeenCalled()
  })
})
