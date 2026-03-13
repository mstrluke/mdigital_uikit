import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ToggleGroup from '../toggle-group';
import type { ToggleGroupOption } from './types';

const mockOptions: ToggleGroupOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('ToggleGroup', () => {
  it('renders toggle buttons from options', () => {
    render(<ToggleGroup options={mockOptions} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('handles single selection mode', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ToggleGroup options={mockOptions} onChange={handleChange} />);

    await user.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('handles multiple selection mode', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ToggleGroup options={mockOptions} multiple onChange={handleChange} />);

    await user.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith(['1']);

    await user.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<ToggleGroup options={mockOptions} size="xs" />);
    const button1 = screen.getByText('Option 1').closest('button');
    expect(button1).toHaveClass('text-xs');

    rerender(<ToggleGroup options={mockOptions} size="sm" />);
    const button2 = screen.getByText('Option 1').closest('button');
    expect(button2).toHaveClass('text-sm');

    rerender(<ToggleGroup options={mockOptions} size="md" />);
    const button3 = screen.getByText('Option 1').closest('button');
    expect(button3).toHaveClass('text-base');

    rerender(<ToggleGroup options={mockOptions} size="lg" />);
    const button4 = screen.getByText('Option 1').closest('button');
    expect(button4).toHaveClass('text-lg');
  });

  it('disables toggle group when disabled', () => {
    render(<ToggleGroup options={mockOptions} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <ToggleGroup options={mockOptions} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles controlled value in single mode', () => {
    const { rerender } = render(
      <ToggleGroup options={mockOptions} value="1" onChange={vi.fn()} />
    );

    expect(screen.getByText('Option 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Option 2').closest('button')).toHaveAttribute('aria-pressed', 'false');

    rerender(<ToggleGroup options={mockOptions} value="2" onChange={vi.fn()} />);

    expect(screen.getByText('Option 1').closest('button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Option 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles controlled value in multiple mode', () => {
    render(
      <ToggleGroup options={mockOptions} multiple value={['1', '2']} onChange={vi.fn()} />
    );

    expect(screen.getByText('Option 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Option 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Option 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders with icons', () => {
    const optionsWithIcons: ToggleGroupOption[] = [
      { label: 'Bold', value: 'bold', icon: <span data-testid="bold-icon">B</span> },
      { label: 'Italic', value: 'italic', icon: <span data-testid="italic-icon">I</span> },
    ];

    render(<ToggleGroup options={optionsWithIcons} />);

    expect(screen.getByTestId('bold-icon')).toBeInTheDocument();
    expect(screen.getByTestId('italic-icon')).toBeInTheDocument();
  });

  it('disables individual options', () => {
    const optionsWithDisabled: ToggleGroupOption[] = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
    ];

    render(<ToggleGroup options={optionsWithDisabled} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('renders with fullWidth', () => {
    const { container } = render(<ToggleGroup options={mockOptions} fullWidth />);
    expect(container.querySelector('.w-full')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<ToggleGroup options={mockOptions} variant="solid" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    rerender(<ToggleGroup options={mockOptions} variant="soft" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    rerender(<ToggleGroup options={mockOptions} variant="default" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
