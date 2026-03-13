import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from './index'

describe('Calendar', () => {
  it('renders current month', () => {
    render(<Calendar />)
    const now = new Date()
    const monthName = now.toLocaleString('en', { month: 'long' })
    expect(screen.getByText(new RegExp(monthName))).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders day names', () => {
    render(<Calendar />)
    expect(screen.getByText('Su')).toBeInTheDocument()
    expect(screen.getByText('Mo')).toBeInTheDocument()
    expect(screen.getByText('Fr')).toBeInTheDocument()
  })

  it('navigates to next month', () => {
    render(<Calendar defaultMonth={new Date(2025, 0, 1)} />)
    expect(screen.getByText('January 2025')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Next month'))
    expect(screen.getByText('February 2025')).toBeInTheDocument()
  })

  it('navigates to previous month', () => {
    render(<Calendar defaultMonth={new Date(2025, 1, 1)} />)
    expect(screen.getByText('February 2025')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText('January 2025')).toBeInTheDocument()
  })

  it('calls onChange when a day is clicked', () => {
    const onChange = vi.fn()
    render(<Calendar defaultMonth={new Date(2025, 0, 1)} onChange={onChange} />)
    fireEvent.click(screen.getByText('15'))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange.mock.calls[0][0].getDate()).toBe(15)
  })

  it('marks selected date with aria-selected', () => {
    render(<Calendar value={new Date(2025, 0, 10)} defaultMonth={new Date(2025, 0, 1)} />)
    const btn = screen.getByText('10')
    expect(btn).toHaveAttribute('aria-selected', 'true')
  })

  it('disables dates via disabledDates', () => {
    const onChange = vi.fn()
    render(
      <Calendar
        defaultMonth={new Date(2025, 0, 1)}
        onChange={onChange}
        disabledDates={(d) => d.getDate() === 5}
      />,
    )
    const btn = screen.getByText('5')
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects weekStartsOn', () => {
    render(<Calendar weekStartsOn={1} />)
    const headers = screen.getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Mo')
  })
})
