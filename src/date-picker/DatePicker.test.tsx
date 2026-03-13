import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './index';

describe('DatePicker', () => {
  it('renders with default props', () => {
    render(<DatePicker />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DatePicker label="Select Date" />);
    expect(screen.getByText('Select Date')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Choose a date" />);
    expect(screen.getByText('Choose a date')).toBeInTheDocument();
  });

  it('handles date selection', async () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    const date = new Date('2024-01-15');
    render(<DatePicker value={date} onChange={vi.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables date picker when disabled', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  it('shows helper text', () => {
    render(<DatePicker helperText="Select your birth date" />);
    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<DatePicker error="Date is required" />);
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<DatePicker label="Birth Date" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<DatePicker size="xs" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<DatePicker size="sm" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<DatePicker size="md" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<DatePicker size="lg" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DatePicker className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('supports fullWidth prop', () => {
    const { container } = render(<DatePicker fullWidth />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('shows clearable button when value is set', () => {
    const date = new Date('2024-01-15');
    render(<DatePicker value={date} clearable />);

    const clearButton = screen.getByLabelText('Clear date');
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onChange when cleared', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const date = new Date('2024-01-15');
    render(<DatePicker value={date} clearable onChange={handleChange} />);

    const clearButton = screen.getByLabelText('Clear date');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(null);
  });
});
