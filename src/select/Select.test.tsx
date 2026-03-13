import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Select from '../select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const groupedOptions = [
  { value: '1', label: 'Apple', group: 'Fruits' },
  { value: '2', label: 'Banana', group: 'Fruits' },
  { value: '3', label: 'Carrot', group: 'Vegetables' },
  { value: '4', label: 'Broccoli', group: 'Vegetables' },
];

describe('Select', () => {
  it('renders with default placeholder', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Select options={mockOptions} placeholder="Choose one" />);
    expect(screen.getByPlaceholderText('Choose one')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select options={mockOptions} label="Select Item" />);
    expect(screen.getByText('Select Item')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Select options={mockOptions} label="Item" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('displays options when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('selects option when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Select options={mockOptions} onChange={handleChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Option 2' }));

    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('displays selected value', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} value="2" onChange={vi.fn()} />);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.value).toBe('Option 2');
  });

  it('handles controlled value', () => {
    const { rerender } = render(<Select options={mockOptions} value="1" onChange={vi.fn()} />);

    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Option 1');

    rerender(<Select options={mockOptions} value="3" onChange={vi.fn()} />);
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Option 3');
  });

  it('handles uncontrolled mode with defaultValue', () => {
    render(<Select options={mockOptions} defaultValue="2" />);
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Option 2');
  });

  it('filters options when searching', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    const input = screen.getByRole('combobox');

    await user.type(input, 'Option 1');

    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 2' })).not.toBeInTheDocument();
  });

  it('shows "No options found" when no matches', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    await user.type(screen.getByRole('combobox'), 'xyz');

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('shows clear button when clearable and has value', () => {
    render(<Select options={mockOptions} value="1" onChange={vi.fn()} clearable />);
    expect(screen.getByLabelText('Clear selection')).toBeInTheDocument();
  });

  it('clears selection when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Select options={mockOptions} value="1" onChange={handleChange} clearable />);

    await user.click(screen.getByLabelText('Clear selection'));
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Select options={mockOptions} size="xs" />);
    expect(screen.getByRole('button')).toHaveClass('text-xs');

    rerender(<Select options={mockOptions} size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(<Select options={mockOptions} size="md" />);
    expect(screen.getByRole('button')).toHaveClass('text-base');

    rerender(<Select options={mockOptions} size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('disables select when disabled', () => {
    render(<Select options={mockOptions} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Select options={mockOptions} loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows error message', () => {
    render(<Select options={mockOptions} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Select options={mockOptions} helperText="Choose your favorite" />);
    expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
  });

  it('renders grouped options', async () => {
    const user = userEvent.setup();
    render(<Select options={groupedOptions} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    const input = screen.getByRole('combobox');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect((input as HTMLInputElement).value).toBe('Option 1');
  });

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies custom classNames', () => {
    render(
      <Select
        options={mockOptions}
        classNames={{
          trigger: 'custom-trigger',
          dropdown: 'custom-dropdown',
        }}
      />
    );

    expect(screen.getByRole('button')).toHaveClass('custom-trigger');
  });

  it('handles fullWidth prop', () => {
    const { rerender } = render(<Select options={mockOptions} fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('w-full');

    rerender(<Select options={mockOptions} fullWidth={false} />);
    expect(screen.getByRole('button')).toHaveClass('max-w-full');
  });

  it('forwards ref to container element', () => {
    const ref = vi.fn();
    render(<Select options={mockOptions} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
