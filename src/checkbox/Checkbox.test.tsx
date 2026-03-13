import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders checked when defaultChecked is true', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]![0].target.checked).toBe(true);
  });

  it('toggles in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders in indeterminate state', () => {
    render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('renders in different variants', () => {
    const { rerender } = render(<Checkbox variant="solid" data-testid="checkbox" defaultChecked />);
    expect(screen.getByTestId('checkbox')).toHaveClass('checked:bg-slot');

    rerender(<Checkbox variant="outline" data-testid="checkbox" defaultChecked />);
    expect(screen.getByTestId('checkbox')).not.toHaveClass('checked:bg-slot');

    rerender(<Checkbox variant="soft" data-testid="checkbox" defaultChecked />);
    expect(screen.getByTestId('checkbox')).toHaveClass('checked:bg-slot-10');
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Checkbox size="xs" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('w-(--checkbox-size-xs)');

    rerender(<Checkbox size="sm" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('w-(--checkbox-size-sm)');

    rerender(<Checkbox size="md" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('w-(--checkbox-size-md)');

    rerender(<Checkbox size="lg" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('w-(--checkbox-size-lg)');
  });

  it('renders in different colors', () => {
    const { rerender } = render(<Checkbox color="primary" checked onChange={vi.fn()} data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();

    rerender(<Checkbox color="secondary" checked onChange={vi.fn()} data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();

    rerender(<Checkbox color="danger" checked onChange={vi.fn()} data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  it('disables checkbox when disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not call onChange when disabled and clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox disabled onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows helper text', () => {
    render(<Checkbox helperText="This is required" />);
    expect(screen.getByText('This is required')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Checkbox error="You must accept" />);
    expect(screen.getByText('You must accept')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(<Checkbox error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Checkbox error="Error" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when helper text is present', () => {
    render(<Checkbox helperText="Helper" />);
    const checkbox = screen.getByRole('checkbox');
    const describedBy = checkbox.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Helper');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    render(
      <Checkbox
        classNames={{
          root: 'custom-root',
          checkbox: 'custom-checkbox',
          label: 'custom-label',
        }}
        label="Test"
        data-testid="checkbox"
      />
    );

    expect(screen.getByTestId('checkbox')).toHaveClass('custom-checkbox');
  });

  it('renders check icon when checked', () => {
    const { container } = render(<Checkbox checked onChange={vi.fn()} />);
    const indicator = container.querySelector('[data-slot="indicator"]');
    expect(indicator).toBeInTheDocument();
  });

  it('renders minus icon when indeterminate', () => {
    const { container } = render(<Checkbox indeterminate />);
    const indicator = container.querySelector('[data-slot="indicator"]');
    expect(indicator).toBeInTheDocument();
  });

  it('handles label click to toggle checkbox', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Click me" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(screen.getByText('Click me'));
    expect(checkbox).toBeChecked();
  });

  it('supports name attribute', () => {
    render(<Checkbox name="terms" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'terms');
  });

  it('supports value attribute', () => {
    render(<Checkbox value="yes" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'yes');
  });
});
