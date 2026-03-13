import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';

describe('Radio', () => {
  it('renders unchecked by default', () => {
    render(<Radio />);
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
  });

  it('renders with label', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('renders checked when checked prop is true', () => {
    render(<Radio checked onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Radio onChange={handleChange} />);

    await user.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Radio size="xs" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('w-(--checkbox-size-xs)');

    rerender(<Radio size="sm" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('w-(--checkbox-size-sm)');

    rerender(<Radio size="md" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('w-(--checkbox-size-md)');

    rerender(<Radio size="lg" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('w-(--checkbox-size-lg)');
  });

  it('renders in different colors', () => {
    const { rerender } = render(<Radio color="primary" checked onChange={vi.fn()} data-testid="radio" />);
    expect(screen.getByTestId('radio')).toBeInTheDocument();

    rerender(<Radio color="secondary" checked onChange={vi.fn()} data-testid="radio" />);
    expect(screen.getByTestId('radio')).toBeInTheDocument();

    rerender(<Radio color="danger" checked onChange={vi.fn()} data-testid="radio" />);
    expect(screen.getByTestId('radio')).toBeInTheDocument();
  });

  it('disables radio when disabled', () => {
    render(<Radio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('does not call onChange when disabled and clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Radio disabled onChange={handleChange} />);

    await user.click(screen.getByRole('radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows helper text', () => {
    render(<Radio helperText="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Radio error="Please select this option" />);
    expect(screen.getByText('Please select this option')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(<Radio error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Radio error="Error" />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when helper text is present', () => {
    render(<Radio helperText="Helper" />);
    const radio = screen.getByRole('radio');
    const describedBy = radio.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Helper');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Radio ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    render(<Radio className="custom-class" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    render(
      <Radio
        classNames={{
          root: 'custom-root',
          radio: 'custom-radio',
          label: 'custom-label',
        }}
        label="Test"
        data-testid="radio"
      />
    );

    expect(screen.getByTestId('radio')).toHaveClass('custom-radio');
  });

  it('handles label click to select radio', async () => {
    const user = userEvent.setup();
    render(<Radio label="Click me" />);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(screen.getByText('Click me'));
    expect(radio).toBeChecked();
  });

  it('supports name attribute for radio groups', () => {
    render(<Radio name="group1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1');
  });

  it('supports value attribute', () => {
    render(<Radio value="option1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'option1');
  });

  it('renders as circular input', () => {
    render(<Radio data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('rounded-full');
  });

  it('groups radios with same name', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio name="options" label="Option 1" value="1" />
        <Radio name="options" label="Option 2" value="2" />
        <Radio name="options" label="Option 3" value="3" />
      </>
    );

    const radio1 = screen.getByLabelText('Option 1');
    const radio2 = screen.getByLabelText('Option 2');

    await user.click(radio1);
    expect(radio1).toBeChecked();

    await user.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

});
