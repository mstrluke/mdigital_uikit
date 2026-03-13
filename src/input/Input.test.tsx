import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Search, Mail } from 'lucide-react';
import Input from '../input';

describe('Input', () => {
  it('renders with basic props', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Username" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Input size="xs" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-xs');

    rerender(<Input size="sm" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-sm');

    rerender(<Input size="md" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-base');

    rerender(<Input size="lg" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-border');

    rerender(<Input variant="filled" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('bg-surface');
  });

  it('handles controlled value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { rerender } = render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('handles uncontrolled value changes', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');

    await user.type(input, 'changed');
    expect(input.value).toBe('changed');
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<Search data-testid="left-icon" />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input rightIcon={<Mail data-testid="right-icon" />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('shows clear button when clearable and has value', async () => {
    const user = userEvent.setup();
    render(<Input clearable value="text" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(<Input clearable onClear={handleClear} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'text');

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('does not show clear button when disabled', () => {
    render(<Input clearable value="text" onChange={vi.fn()} disabled />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('does not show clear button when readOnly', () => {
    render(<Input clearable value="text" onChange={vi.fn()} readOnly />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(<Input loading />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows warning message', () => {
    render(<Input warning="This value may be incorrect" />);
    expect(screen.getByText('This value may be incorrect')).toBeInTheDocument();
  });

  it('shows info message', () => {
    render(<Input info="This is helpful information" />);
    expect(screen.getByText('This is helpful information')).toBeInTheDocument();
  });

  it('shows success message', () => {
    render(<Input success="Looks good!" />);
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('positions message at top when messagePosition is top', () => {
    const { container } = render(<Input helperText="Helper" messagePosition="top" />);
    const helperElement = screen.getByText('Helper');
    const inputElement = screen.getByRole('textbox');

    expect(helperElement.compareDocumentPosition(inputElement)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('shows character count when showCount and maxLength are set', () => {
    render(<Input showCount maxLength={10} value="test" onChange={vi.fn()} />);
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('respects maxLength attribute', async () => {
    const user = userEvent.setup();
    render(<Input maxLength={5} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, '12345678');

    expect(input.value.length).toBeLessThanOrEqual(5);
  });

  it('sets disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets readOnly state', () => {
    render(<Input readOnly />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input error="Error message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-busy when loading', () => {
    render(<Input loading />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-busy', 'true');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    render(
      <Input
        classNames={{
          root: 'custom-root',
          wrapper: 'custom-wrapper',
          input: 'custom-input',
          label: 'custom-label',
        }}
        label="Test"
        data-testid="input"
      />
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-input');
  });

  it('handles fullWidth prop', () => {
    const { rerender } = render(<Input fullWidth={true} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('w-full');

    rerender(<Input fullWidth={false} data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('max-w-full');
  });
});
