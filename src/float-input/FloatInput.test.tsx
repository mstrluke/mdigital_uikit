import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Mail, Lock } from 'lucide-react';
import FloatInput from '../float-input';

describe('FloatInput', () => {
  it('renders with floating label', () => {
    render(<FloatInput label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<FloatInput label="Password" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<FloatInput label="Test" size="xs" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-xs');

    rerender(<FloatInput label="Test" size="sm" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-sm');

    rerender(<FloatInput label="Test" size="md" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-base');

    rerender(<FloatInput label="Test" size="lg" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-lg');
  });

  it('handles controlled value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<FloatInput label="Name" value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('handles uncontrolled value changes', async () => {
    const user = userEvent.setup();
    render(<FloatInput label="Name" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');

    await user.type(input, 'changed');
    expect(input.value).toBe('changed');
  });

  it('renders left icon', () => {
    render(<FloatInput label="Email" leftIcon={<Mail data-testid="left-icon" />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<FloatInput label="Password" rightIcon={<Lock data-testid="right-icon" />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('shows clear button when clearable and has value', () => {
    render(<FloatInput label="Search" clearable value="text" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(<FloatInput label="Search" clearable onClear={handleClear} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'text');

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('does not show clear button when disabled', () => {
    render(<FloatInput label="Input" clearable value="text" onChange={vi.fn()} disabled />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('does not show clear button when readOnly', () => {
    render(<FloatInput label="Input" clearable value="text" onChange={vi.fn()} readOnly />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(<FloatInput label="Input" loading />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<FloatInput label="Email" error="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('shows warning message', () => {
    render(<FloatInput label="Input" warning="This may be incorrect" />);
    expect(screen.getByText('This may be incorrect')).toBeInTheDocument();
  });

  it('shows info message', () => {
    render(<FloatInput label="Input" info="Helpful information" />);
    expect(screen.getByText('Helpful information')).toBeInTheDocument();
  });

  it('shows success message', () => {
    render(<FloatInput label="Input" success="Looks good!" />);
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<FloatInput label="Email" helperText="We'll never share your email" />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('sets disabled state', () => {
    render(<FloatInput label="Input" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets readOnly state', () => {
    render(<FloatInput label="Input" readOnly />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('sets aria-invalid when error is present', () => {
    render(<FloatInput label="Input" error="Error message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-busy when loading', () => {
    render(<FloatInput label="Input" loading />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-busy', 'true');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<FloatInput label="Input" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<FloatInput label="Input" className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    render(
      <FloatInput
        label="Test"
        classNames={{
          root: 'custom-root',
          wrapper: 'custom-wrapper',
          input: 'custom-input',
          label: 'custom-label',
        }}
        data-testid="input"
      />
    );

    expect(screen.getByTestId('input')).toHaveClass('custom-input');
  });

  it('handles fullWidth prop', () => {
    const { rerender } = render(<FloatInput label="Input" fullWidth data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('w-full');

    rerender(<FloatInput label="Input" fullWidth={false} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('max-w-full');
  });

  it('uses placeholder for floating label functionality', () => {
    render(<FloatInput label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', ' ');
  });

  it('sets aria-labelledby correctly', () => {
    render(<FloatInput label="Email" />);
    const input = screen.getByRole('textbox');
    const labelId = input.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)).toBeInTheDocument();
  });

  it('adjusts left icon spacing based on size', () => {
    const { container, rerender } = render(
      <FloatInput label="Test" size="xs" leftIcon={<Mail />} data-testid="input" />
    );
    expect(screen.getByTestId('input')).toHaveClass('pl-8');

    rerender(<FloatInput label="Test" size="sm" leftIcon={<Mail />} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('pl-10');

    rerender(<FloatInput label="Test" size="md" leftIcon={<Mail />} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('pl-10');

    rerender(<FloatInput label="Test" size="lg" leftIcon={<Mail />} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('pl-11');
  });

  it('adjusts right icon spacing when icons are present', () => {
    render(<FloatInput label="Test" rightIcon={<Lock />} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('pr-8');
  });
});
