import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import InputOTP from '../input-otp';

describe('InputOTP', () => {
  it('renders with default 6 slots', () => {
    render(<InputOTP />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('renders with custom length', () => {
    render(<InputOTP length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('renders with label', () => {
    render(<InputOTP label="Verification Code" />);
    expect(screen.getByText('Verification Code')).toBeInTheDocument();
  });

  it('handles single character input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<InputOTP length={4} onChange={handleChange} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0]!, '5');

    expect(handleChange).toHaveBeenCalledWith('5');
  });

  it('auto-focuses next input after entering character', async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0]!, '1');
    await user.type(inputs[1]!, '2');
    await user.type(inputs[2]!, '3');

    expect(inputs[3]).toHaveFocus();
  });

  it('calls onComplete when all fields are filled', async () => {
    const user = userEvent.setup();
    const handleComplete = vi.fn();

    render(<InputOTP length={4} onComplete={handleComplete} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0]!, '1');
    await user.type(inputs[1]!, '2');
    await user.type(inputs[2]!, '3');
    await user.type(inputs[3]!, '4');

    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('handles backspace to move to previous input', async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0]!, '1');
    await user.type(inputs[1]!, '2');

    expect(inputs[2]).toHaveFocus();

    await user.keyboard('{Backspace}');
    expect(inputs[1]).toHaveFocus();
  });

  it('handles arrow key navigation', async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} />);

    const inputs = screen.getAllByRole('textbox');
    inputs[1]!.focus();

    await user.keyboard('{ArrowRight}');
    expect(inputs[2]).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(inputs[1]).toHaveFocus();
  });

  it('handles paste with full OTP code', async () => {
    const user = userEvent.setup();
    const handleComplete = vi.fn();

    render(<InputOTP length={4} onComplete={handleComplete} />);

    const inputs = screen.getAllByRole('textbox');
    inputs[0]!.focus();

    await user.paste('1234');

    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('handles paste with partial OTP code', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<InputOTP length={6} onChange={handleChange} />);

    const inputs = screen.getAllByRole('textbox');
    inputs[0]!.focus();

    await user.paste('123');

    expect(handleChange).toHaveBeenCalledWith('123');
  });

  it('validates pattern when provided', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<InputOTP length={4} pattern="[0-9]" onChange={handleChange} />);

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0]!, 'a');

    expect(handleChange).not.toHaveBeenCalled();

    await user.type(inputs[0]!, '5');
    expect(handleChange).toHaveBeenCalledWith('5');
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<InputOTP size="xs" length={2} />);
    expect(screen.getAllByRole('textbox')[0]).toHaveClass('text-xs');

    rerender(<InputOTP size="sm" length={2} />);
    expect(screen.getAllByRole('textbox')[0]).toHaveClass('text-sm');

    rerender(<InputOTP size="md" length={2} />);
    expect(screen.getAllByRole('textbox')[0]).toHaveClass('text-base');

    rerender(<InputOTP size="lg" length={2} />);
    expect(screen.getAllByRole('textbox')[0]).toHaveClass('text-lg');
  });

  it('disables all inputs when disabled', () => {
    render(<InputOTP length={4} disabled />);
    const inputs = screen.getAllByRole('textbox');

    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('auto-focuses first input when autoFocus is true', () => {
    render(<InputOTP length={4} autoFocus />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveFocus();
  });

  it('shows error message', () => {
    render(<InputOTP error="Invalid code" />);
    expect(screen.getByText('Invalid code')).toBeInTheDocument();
  });

  it('shows warning message', () => {
    render(<InputOTP warning="Code expires soon" />);
    expect(screen.getByText('Code expires soon')).toBeInTheDocument();
  });

  it('shows info message', () => {
    render(<InputOTP info="Check your email" />);
    expect(screen.getByText('Check your email')).toBeInTheDocument();
  });

  it('shows success message', () => {
    render(<InputOTP success="Code verified" />);
    expect(screen.getByText('Code verified')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<InputOTP helperText="Enter the 6-digit code" />);
    expect(screen.getByText('Enter the 6-digit code')).toBeInTheDocument();
  });

  it('positions message at top when messagePosition is top', () => {
    const { container } = render(<InputOTP helperText="Helper" messagePosition="top" />);
    const helperElement = screen.getByText('Helper');
    const wrapperElement = container.querySelector('[data-slot="inputOTP_wrapper"]');

    expect(helperElement.compareDocumentPosition(wrapperElement!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('handles controlled value', () => {
    const { rerender } = render(<InputOTP value="12" onChange={vi.fn()} />);

    const inputs = screen.getAllByRole('textbox');
    expect((inputs[0] as HTMLInputElement).value).toBe('1');
    expect((inputs[1] as HTMLInputElement).value).toBe('2');

    rerender(<InputOTP value="1234" onChange={vi.fn()} />);
    expect((inputs[2] as HTMLInputElement).value).toBe('3');
    expect((inputs[3] as HTMLInputElement).value).toBe('4');
  });

  it('applies custom classNames', () => {
    render(
      <InputOTP
        classNames={{
          root: 'custom-root',
          wrapper: 'custom-wrapper',
          slot: 'custom-slot',
        }}
      />
    );

    const slots = screen.getAllByRole('textbox');
    expect(slots[0]).toHaveClass('custom-slot');
  });

  it('sets inputMode based on type prop', () => {
    const { rerender } = render(<InputOTP type="number" />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('inputMode', 'numeric');

    rerender(<InputOTP type="text" />);
    expect(inputs[0]).toHaveAttribute('inputMode', 'text');
  });

  it('forwards ref to container element', () => {
    const ref = vi.fn();
    render(<InputOTP ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
