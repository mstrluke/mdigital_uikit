import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Check } from 'lucide-react';
import Switch from '../switch';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();
  });

  it('renders with label', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Switch label="Accept terms" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders checked when defaultChecked is true', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('handles controlled checked state', () => {
    const { rerender } = render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).not.toBeChecked();

    rerender(<Switch checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange} />);

    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]![0].target.checked).toBe(true);
  });

  it('toggles in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Switch />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();

    await user.click(switchEl);
    expect(switchEl).toBeChecked();

    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });

  it('renders in different sizes', () => {
    const { container, rerender } = render(<Switch size="xs" />);
    expect(container.querySelector('.w-\\(--switch-width-xs\\)')).toBeInTheDocument();

    rerender(<Switch size="sm" />);
    expect(container.querySelector('.w-\\(--switch-width-sm\\)')).toBeInTheDocument();

    rerender(<Switch size="md" />);
    expect(container.querySelector('.w-\\(--switch-width-md\\)')).toBeInTheDocument();

    rerender(<Switch size="lg" />);
    expect(container.querySelector('.w-\\(--switch-width-lg\\)')).toBeInTheDocument();
  });

  it('renders in different colors', () => {
    const { rerender } = render(<Switch color="primary" checked onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();

    rerender(<Switch color="secondary" checked onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();

    rerender(<Switch color="danger" checked onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('disables switch when disabled', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onChange when disabled and clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Switch disabled onChange={handleChange} />);

    await user.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { container } = render(<Switch loading />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('disables switch when loading', () => {
    render(<Switch loading />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('renders thumb icon when provided', () => {
    render(<Switch thumbIcon={<Check data-testid="thumb-icon" />} />);
    expect(screen.getByTestId('thumb-icon')).toBeInTheDocument();
  });

  it('renders start content (visible when unchecked)', () => {
    render(<Switch startContent="OFF" />);
    const matches = screen.getAllByText('OFF');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders end content (visible when checked)', () => {
    render(<Switch endContent="ON" checked onChange={vi.fn()} />);
    const matches = screen.getAllByText('ON');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('auto-sizes track width when inner text is provided', () => {
    const { container } = render(
      <Switch startContent="Inactive" endContent="Active" />,
    );
    const track = container.querySelector('.switch_track');
    expect(track).toBeInTheDocument();
    // Auto-width mode uses inline-flex instead of fixed width
    expect(track).toHaveClass('inline-flex');
    // Should NOT have fixed width class
    expect(track).not.toHaveClass('w-(--switch-width-md)');
  });

  it('uses fixed width when no inner text', () => {
    const { container } = render(<Switch size="md" />);
    const track = container.querySelector('.switch_track');
    expect(track).toHaveClass('w-(--switch-width-md)');
  });

  it('positions thumb dynamically in auto-width mode', () => {
    const { container, rerender } = render(
      <Switch startContent="OFF" endContent="ON" />,
    );
    const thumb = container.querySelector('.switch_thumb') as HTMLElement;
    expect(thumb).toBeInTheDocument();
    expect(thumb.style.left).toBe('2px');

    rerender(
      <Switch startContent="OFF" endContent="ON" checked onChange={vi.fn()} />,
    );
    const thumbChecked = container.querySelector('.switch_thumb') as HTMLElement;
    expect(thumbChecked.style.left).toContain('calc');
  });

  it('shows helper text', () => {
    render(<Switch helperText="This controls the feature" />);
    expect(screen.getByText('This controls the feature')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Switch error="You must accept to continue" />);
    expect(screen.getByText('You must accept to continue')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(<Switch error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders label on left when labelPosition is left', () => {
    const { container } = render(<Switch label="Toggle" labelPosition="left" />);
    const label = container.querySelector('label');
    expect(label).toHaveClass('flex-row-reverse');
  });

  it('renders label on right by default', () => {
    const { container } = render(<Switch label="Toggle" />);
    const label = container.querySelector('label');
    expect(label).not.toHaveClass('flex-row-reverse');
  });

  it('sets aria-checked correctly', () => {
    const { rerender } = render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Switch error="Error" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when helper text is present', () => {
    render(<Switch helperText="Helper" />);
    const switchEl = screen.getByRole('switch');
    const describedBy = switchEl.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Helper');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Switch ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    const { container } = render(<Switch className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies custom classNames object', () => {
    const { container } = render(
      <Switch
        classNames={{
          root: 'custom-root',
          track: 'custom-track',
          thumb: 'custom-thumb',
        }}
      />
    );

    expect(container.querySelector('.custom-root')).toBeInTheDocument();
    expect(container.querySelector('.custom-track')).toBeInTheDocument();
    expect(container.querySelector('.custom-thumb')).toBeInTheDocument();
  });

  it('handles label click to toggle switch', async () => {
    const user = userEvent.setup();
    render(<Switch label="Click me" />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();

    await user.click(screen.getByText('Click me'));
    expect(switchEl).toBeChecked();
  });
});
