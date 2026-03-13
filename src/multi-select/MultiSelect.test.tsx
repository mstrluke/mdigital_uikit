import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MultiSelect from '../multi-select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

describe('MultiSelect', () => {
  it('renders with default placeholder', () => {
    render(<MultiSelect options={mockOptions} />);
    expect(screen.getByPlaceholderText('Select options')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<MultiSelect options={mockOptions} label="Select Items" />);
    expect(screen.getByText('Select Items')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<MultiSelect options={mockOptions} label="Items" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('displays options when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
  });

  it('selects multiple options', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Option 1' }));
    await user.click(screen.getByRole('option', { name: 'Option 2' }));

    expect(handleChange).toHaveBeenCalledWith(['1']);
    expect(handleChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('deselects option when clicking selected option', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} value={['1', '2']} onChange={handleChange} />);

    const trigger = screen.getByRole('button', { name: /option/i });
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Option 1' }));

    expect(handleChange).toHaveBeenCalledWith(['2']);
  });

  it('displays selected values as chips', () => {
    render(<MultiSelect options={mockOptions} value={['1', '2']} onChange={vi.fn()} />);

    const chips = screen.getAllByText(/Option [12]/);
    expect(chips.length).toBeGreaterThanOrEqual(2);
    expect(chips[0]).toBeInTheDocument();
    expect(chips[1]).toBeInTheDocument();
  });

  it('removes chip when X button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} value={['1', '2']} onChange={handleChange} />);

    const chips = screen.getAllByText(/Option \d/);
    const firstChip = chips[0]?.closest('[data-slot="multiSelect_tag"]');
    const removeButton = firstChip?.querySelector('[data-slot="multiSelect_tagRemove"]') as HTMLElement;

    await user.click(removeButton);

    expect(handleChange).toHaveBeenCalledWith(['2']);
  });

  it('shows +N indicator when more chips than maxChipsVisible', () => {
    render(
      <MultiSelect
        options={mockOptions}
        value={['1', '2', '3', '4']}
        onChange={vi.fn()}
        maxChipsVisible={2}
      />
    );

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('shows clear button when clearable and has selections', () => {
    render(<MultiSelect options={mockOptions} value={['1']} onChange={vi.fn()} clearable />);
    expect(screen.getByLabelText('Clear selection')).toBeInTheDocument();
  });

  it('clears all selections when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} value={['1', '2']} onChange={handleChange} clearable />);

    await user.click(screen.getByLabelText('Clear selection'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('handles Backspace to remove last chip', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<MultiSelect options={mockOptions} value={['1', '2']} onChange={handleChange} />);

    const trigger = screen.getByRole('button', { name: /option/i });
    await user.click(trigger);

    const input = screen.getByPlaceholderText('');
    await user.type(input, '{Backspace}');

    expect(handleChange).toHaveBeenCalledWith(['1']);
  });

  it('filters options when searching', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    const input = screen.getByPlaceholderText('Select options');
    await user.type(input, 'Option 1');

    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 2' })).not.toBeInTheDocument();
  });

  it('shows "No options found" when no matches', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    await user.type(screen.getByPlaceholderText('Select options'), 'xyz');

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<MultiSelect options={mockOptions} size="xs" />);
    expect(screen.getByRole('button')).toHaveClass('text-xs');

    rerender(<MultiSelect options={mockOptions} size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(<MultiSelect options={mockOptions} size="md" />);
    expect(screen.getByRole('button')).toHaveClass('text-base');

    rerender(<MultiSelect options={mockOptions} size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('disables select when disabled', () => {
    render(<MultiSelect options={mockOptions} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<MultiSelect options={mockOptions} loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows error message', () => {
    render(<MultiSelect options={mockOptions} error="Please select at least one" />);
    expect(screen.getByText('Please select at least one')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<MultiSelect options={mockOptions} helperText="Select all that apply" />);
    expect(screen.getByText('Select all that apply')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    const { rerender } = render(<MultiSelect options={mockOptions} value={['1']} onChange={vi.fn()} />);

    expect(screen.getAllByText('Option 1')[0]).toBeInTheDocument();

    rerender(<MultiSelect options={mockOptions} value={['1', '2']} onChange={vi.fn()} />);
    expect(screen.getAllByText('Option 2')[0]).toBeInTheDocument();
  });

  it('handles uncontrolled mode with defaultValue', () => {
    render(<MultiSelect options={mockOptions} defaultValue={['1', '2']} />);

    expect(screen.getAllByText('Option 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Option 2')[0]).toBeInTheDocument();
  });

  it('sets aria-multiselectable on listbox', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('applies custom classNames', () => {
    render(
      <MultiSelect
        options={mockOptions}
        classNames={{
          trigger: 'custom-trigger',
          tag: 'custom-tag',
        }}
        value={['1']}
        onChange={vi.fn()}
      />
    );

    const trigger = screen.getByRole('button', { name: /option/i });
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('handles fullWidth prop', () => {
    const { rerender } = render(<MultiSelect options={mockOptions} fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('w-full');

    rerender(<MultiSelect options={mockOptions} fullWidth={false} />);
    expect(screen.getByRole('button')).toHaveClass('max-w-full');
  });

  it('forwards ref to container element', () => {
    const ref = vi.fn();
    render(<MultiSelect options={mockOptions} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
