import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PasswordInput from '../input-password';

describe('PasswordInput', () => {
  it('renders as password input by default', () => {
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
    // Note: testing-library can't see hidden password inputs, check via DOM
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('password');
  });

  it('renders with label', () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('toggles visibility when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput value="secret123" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('secret123') as HTMLInputElement;
    expect(input.type).toBe('password');

    const toggleButton = screen.getByLabelText('Show password');
    await user.click(toggleButton);

    expect(input.type).toBe('text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('hides visibility toggle when visibilityToggle is false', () => {
    render(<PasswordInput visibilityToggle={false} />);
    expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender, container } = render(<PasswordInput size="xs" />);
    expect(container.querySelector('input')).toHaveClass('text-xs');

    rerender(<PasswordInput size="sm" />);
    expect(container.querySelector('input')).toHaveClass('text-sm');

    rerender(<PasswordInput size="md" />);
    expect(container.querySelector('input')).toHaveClass('text-base');

    rerender(<PasswordInput size="lg" />);
    expect(container.querySelector('input')).toHaveClass('text-lg');
  });

  it('handles controlled value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<PasswordInput value="pass" onChange={handleChange} />);

    const input = screen.getByDisplayValue('pass');
    await user.type(input, 'word');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('shows error message', () => {
    render(<PasswordInput error="Password is required" />);
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<PasswordInput helperText="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('disables input when disabled', () => {
    const { container } = render(<PasswordInput disabled />);

    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });

  it('supports clearable functionality', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(<PasswordInput clearable value="password123" onChange={vi.fn()} onClear={handleClear} />);

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<PasswordInput loading />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<PasswordInput ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom classNames', () => {
    const { container } = render(
      <PasswordInput
        classNames={{
          input: 'custom-input',
          toggleButton: 'custom-toggle',
        }}
      />
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-input');
  });

  it('sets aria-invalid when error is present', () => {
    const { container } = render(<PasswordInput error="Invalid password" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('persists password visibility state across re-renders', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<PasswordInput value="password" onChange={vi.fn()} />);

    const toggleButton = screen.getByLabelText('Show password');
    await user.click(toggleButton);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('text');

    rerender(<PasswordInput value="password123" onChange={vi.fn()} />);
    expect(input.type).toBe('text');
  });

  it('shows validation messages with different statuses', () => {
    const { rerender } = render(<PasswordInput warning="Weak password" />);
    expect(screen.getByText('Weak password')).toBeInTheDocument();

    rerender(<PasswordInput info="Password requirements" />);
    expect(screen.getByText('Password requirements')).toBeInTheDocument();

    rerender(<PasswordInput success="Strong password" />);
    expect(screen.getByText('Strong password')).toBeInTheDocument();
  });
});
