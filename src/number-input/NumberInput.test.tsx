import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import NumberInput from '../number-input';

describe('NumberInput', () => {
  it('renders with default props', () => {
    render(<NumberInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<NumberInput label="Quantity" />);
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<NumberInput label="Amount" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders increment and decrement buttons by default', () => {
    render(<NumberInput />);
    expect(screen.getByLabelText('Increment value')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrement value')).toBeInTheDocument();
  });

  it('hides controls when controls is false', () => {
    render(<NumberInput controls={false} />);
    expect(screen.queryByLabelText('Increment value')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Decrement value')).not.toBeInTheDocument();
  });

  it('increments value when increment button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={5} onChange={handleChange} step={1} />);

    await user.click(screen.getByLabelText('Increment value'));
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('decrements value when decrement button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={5} onChange={handleChange} step={1} />);

    await user.click(screen.getByLabelText('Decrement value'));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('handles custom step value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={10} onChange={handleChange} step={5} />);

    await user.click(screen.getByLabelText('Increment value'));
    expect(handleChange).toHaveBeenCalledWith(15);
  });

  it('respects min value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={0} onChange={handleChange} min={0} />);

    const decrementButton = screen.getByLabelText('Decrement value');
    expect(decrementButton).toBeDisabled();
  });

  it('respects max value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={10} onChange={handleChange} max={10} />);

    const incrementButton = screen.getByLabelText('Increment value');
    expect(incrementButton).toBeDisabled();
  });

  it('clamps value on blur when clampOnBlur is true', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={15} onChange={handleChange} min={0} max={10} clampOnBlur />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('handles arrow up key press', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={5} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard('{ArrowUp}');

    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('handles arrow down key press', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput value={5} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard('{ArrowDown}');

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('handles direct number input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '42');

    expect(handleChange).toHaveBeenCalledWith(4);
    expect(handleChange).toHaveBeenCalledWith(42);
  });

  it('formats value with precision', () => {
    render(<NumberInput value={3.14159} precision={2} onChange={vi.fn()} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('3.14');
  });

  it('renders controls on right side by default', () => {
    const { container } = render(<NumberInput controlsPosition="right" />);
    const controls = container.querySelector('[data-slot="controls"]');
    expect(controls).toBeInTheDocument();
  });

  it('renders controls on both sides when controlsPosition is sides', () => {
    render(<NumberInput controlsPosition="sides" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('renders in different sizes', () => {
    const { rerender, container } = render(<NumberInput size="xs" />);
    expect(container.querySelector('input')).toHaveClass('text-xs');

    rerender(<NumberInput size="sm" />);
    expect(container.querySelector('input')).toHaveClass('text-sm');

    rerender(<NumberInput size="md" />);
    expect(container.querySelector('input')).toHaveClass('text-base');

    rerender(<NumberInput size="lg" />);
    expect(container.querySelector('input')).toHaveClass('text-lg');
  });

  it('disables input and buttons when disabled', () => {
    render(<NumberInput disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByLabelText('Increment value')).toBeDisabled();
    expect(screen.getByLabelText('Decrement value')).toBeDisabled();
  });

  it('disables buttons when readOnly', () => {
    render(<NumberInput readOnly />);

    expect(screen.getByLabelText('Increment value')).toBeDisabled();
    expect(screen.getByLabelText('Decrement value')).toBeDisabled();
  });

  it('shows error message', () => {
    render(<NumberInput error="Value must be positive" />);
    expect(screen.getByText('Value must be positive')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<NumberInput helperText="Enter quantity" />);
    expect(screen.getByText('Enter quantity')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<NumberInput loading />);

    expect(screen.getByLabelText('Increment value')).toBeDisabled();
    expect(screen.getByLabelText('Decrement value')).toBeDisabled();
  });

  it('handles uncontrolled mode with defaultValue', async () => {
    const user = userEvent.setup();
    render(<NumberInput defaultValue={10} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('10');

    await user.click(screen.getByLabelText('Increment value'));
    expect(input.value).toBe('11');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<NumberInput ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom classNames', () => {
    const { container } = render(
      <NumberInput
        classNames={{
          input: 'custom-input',
          increment: 'custom-increment',
          decrement: 'custom-decrement',
        }}
      />
    );

    expect(container.querySelector('input')).toHaveClass('custom-input');
  });

  it('sets aria attributes correctly', () => {
    render(<NumberInput value={5} min={0} max={10} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-valuemin', '0');
    expect(input).toHaveAttribute('aria-valuemax', '10');
    expect(input).toHaveAttribute('aria-valuenow', '5');
  });

  it('handles fullWidth prop', () => {
    const { rerender, container } = render(<NumberInput fullWidth />);
    expect(container.querySelector('input')).toHaveClass('w-full');

    rerender(<NumberInput fullWidth={false} />);
    expect(container.querySelector('input')).toHaveClass('max-w-full');
  });
});
