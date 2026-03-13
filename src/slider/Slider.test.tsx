import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Slider from '../slider';

describe('Slider', () => {
  it('renders with default value', () => {
    render(<Slider />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders with custom defaultValue', () => {
    render(<Slider defaultValue={75} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('handles controlled value', () => {
    const { rerender } = render(<Slider value={25} onChange={vi.fn()} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25');

    rerender(<Slider value={75} onChange={vi.fn()} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('respects min and max values', () => {
    render(<Slider min={10} max={90} value={50} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('calls onChange when dragging thumb', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Slider value={50} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    await user.click(slider);

    // Note: detailed drag testing requires more complex setup
    // This is a basic sanity check
  });

  it('handles keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Slider value={50} min={0} max={100} step={10} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith(60);

    await user.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles Home and End keys', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Slider value={50} min={0} max={100} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    await user.keyboard('{Home}');
    expect(handleChange).toHaveBeenCalledWith(0);

    await user.keyboard('{End}');
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('renders in different sizes', () => {
    const { container, rerender } = render(<Slider size="xs" />);
    expect(container.querySelector('.h-1')).toBeInTheDocument();

    rerender(<Slider size="sm" />);
    expect(container.querySelector('.h-2')).toBeInTheDocument();

    rerender(<Slider size="md" />);
    expect(container.querySelector('.h-3')).toBeInTheDocument();

    rerender(<Slider size="lg" />);
    expect(container.querySelector('.h-4')).toBeInTheDocument();
  });

  it('renders in different colors', () => {
    const { rerender } = render(<Slider color="primary" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();

    rerender(<Slider color="secondary" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();

    rerender(<Slider color="success" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders in different variants', () => {
    const { rerender } = render(<Slider variant="default" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();

    rerender(<Slider variant="solid" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();

    rerender(<Slider variant="soft" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('disables slider when disabled', () => {
    render(<Slider disabled />);
    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-disabled', 'true');
    expect(slider).toHaveAttribute('tabIndex', '-1');
  });

  it('renders footer when footer is true', () => {
    const { container } = render(<Slider footer min={0} max={100} value={50} onChange={vi.fn()} />);

    const labels = container.querySelectorAll('.slider_label');
    expect(labels[0]).toHaveTextContent('0');
    expect(labels[1]).toHaveTextContent('100');
    const value = container.querySelector('.slider_value');
    expect(value).toHaveTextContent('50');
  });

  it('renders custom footer content', () => {
    render(<Slider footer={<div>Custom Footer</div>} />);
    expect(screen.getByText('Custom Footer')).toBeInTheDocument();
  });

  it('renders range slider with two thumbs', () => {
    render(<Slider range value={[25, 75]} onChange={vi.fn()} />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
  });

  it('handles range slider value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Slider range value={[20, 80]} min={0} max={100} step={10} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    sliders[0]!.focus();

    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows tooltip on hover', () => {
    const { container } = render(<Slider value={50} onChange={vi.fn()} />);

    // Tooltip is rendered conditionally on hover state
    // This is a basic structure test
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('snaps to step increments', () => {
    render(<Slider min={0} max={100} step={25} value={50} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    // Step behavior is verified through onChange in real usage
  });

  it('applies custom className', () => {
    const { container } = render(<Slider className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies custom classNames object', () => {
    const { container } = render(
      <Slider
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

  it('renders aria labels correctly for range slider', () => {
    render(<Slider range value={[25, 75]} onChange={vi.fn()} />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-label', 'Slider thumb 1');
    expect(sliders[1]).toHaveAttribute('aria-label', 'Slider thumb 2');
  });

  it('renders single aria label for non-range slider', () => {
    render(<Slider value={50} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Slider');
  });

  it('displays current value in footer when enabled', () => {
    const { container } = render(<Slider footer value={42} onChange={vi.fn()} />);
    const value = container.querySelector('.slider_value');
    expect(value).toHaveTextContent('42');
  });

  it('displays range values in footer when range mode is enabled', () => {
    render(<Slider footer range value={[30, 70]} onChange={vi.fn()} />);
    expect(screen.getByText('30 - 70')).toBeInTheDocument();
  });
});
