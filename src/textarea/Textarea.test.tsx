import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../textarea';

describe('Textarea', () => {
  it('renders with basic props', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Textarea label="Comments" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Textarea size="xs" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('text-xs');

    rerender(<Textarea size="sm" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('text-sm');

    rerender(<Textarea size="md" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('text-base');

    rerender(<Textarea size="lg" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Textarea variant="outline" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('border-border');

    rerender(<Textarea variant="filled" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('bg-surface');
  });

  it('handles controlled value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Textarea value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('handles uncontrolled value changes', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('');

    await user.type(textarea, 'changed');
    expect(textarea.value).toBe('changed');
  });

  it('shows character count when showCount and maxLength are set', () => {
    render(<Textarea showCount maxLength={100} value="Hello" onChange={vi.fn()} />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('respects maxLength attribute', async () => {
    const user = userEvent.setup();
    render(<Textarea maxLength={10} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(textarea, '12345678901234');

    expect(textarea.value.length).toBeLessThanOrEqual(10);
  });

  it('handles different resize options', () => {
    const { rerender } = render(<Textarea resize="none" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('resize-none');

    rerender(<Textarea resize="vertical" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('resize-y');

    rerender(<Textarea resize="horizontal" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('resize-x');

    rerender(<Textarea resize="both" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('resize');
  });

  it('auto-resizes when autoResize is true', () => {
    render(<Textarea autoResize value="Line 1\nLine 2\nLine 3" onChange={vi.fn()} data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('resize-none');
    expect(screen.getByTestId('textarea')).toHaveClass('overflow-hidden');
  });

  it('shows error message', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows warning message', () => {
    render(<Textarea warning="This may be too long" />);
    expect(screen.getByText('This may be too long')).toBeInTheDocument();
  });

  it('shows info message', () => {
    render(<Textarea info="Use markdown formatting" />);
    expect(screen.getByText('Use markdown formatting')).toBeInTheDocument();
  });

  it('shows success message', () => {
    render(<Textarea success="Looks good!" />);
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Textarea helperText="Enter a detailed description" />);
    expect(screen.getByText('Enter a detailed description')).toBeInTheDocument();
  });

  it('positions message at top when messagePosition is top', () => {
    const { container } = render(<Textarea helperText="Helper" messagePosition="top" />);
    const helperElement = screen.getByText('Helper');
    const textareaElement = screen.getByRole('textbox');

    expect(helperElement.compareDocumentPosition(textareaElement)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('sets disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets readOnly state', () => {
    render(<Textarea readOnly />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
  });

  it('sets aria-invalid when error is present', () => {
    render(<Textarea error="Error message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to textarea element', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    render(
      <Textarea
        classNames={{
          root: 'custom-root',
          textarea: 'custom-textarea',
          label: 'custom-label',
        }}
        label="Test"
        data-testid="textarea"
      />
    );

    expect(screen.getByTestId('textarea')).toHaveClass('custom-textarea');
  });

  it('handles fullWidth prop', () => {
    const { rerender } = render(<Textarea fullWidth data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('w-full');

    rerender(<Textarea fullWidth={false} data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('max-w-full');
  });

  it('handles rows attribute', () => {
    render(<Textarea rows={10} data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '10');
  });

  it('handles placeholder attribute', () => {
    render(<Textarea placeholder="Type here..." />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });
});
