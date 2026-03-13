import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Toggle from '../toggle';

describe('Toggle', () => {
  it('renders with basic props', () => {
    render(<Toggle>Toggle content</Toggle>);
    expect(screen.getByText('Toggle content')).toBeInTheDocument();
  });

  it('renders unpressed by default', () => {
    render(<Toggle>Button</Toggle>);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('handles controlled pressed state', () => {
    const { rerender } = render(<Toggle pressed={false} onChange={vi.fn()}>Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');

    rerender(<Toggle pressed={true} onChange={vi.fn()}>Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Toggle onChange={handleChange}>Toggle</Toggle>);

    await user.click(screen.getByRole('button'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('toggles in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Toggle>Toggle</Toggle>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Toggle size="xs">Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('text-xs');

    rerender(<Toggle size="sm">Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(<Toggle size="md">Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('text-base');

    rerender(<Toggle size="lg">Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('renders in different variants', () => {
    const { rerender } = render(<Toggle variant="solid">Toggle</Toggle>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Toggle variant="soft">Toggle</Toggle>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Toggle variant="default">Toggle</Toggle>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables toggle when disabled', () => {
    render(<Toggle disabled>Toggle</Toggle>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Toggle disabled onChange={handleChange}>Toggle</Toggle>);

    await user.click(screen.getByRole('button'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with icon', () => {
    render(<Toggle icon={<span data-testid="icon">Icon</span>}>Toggle</Toggle>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toggle className="custom-class">Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
