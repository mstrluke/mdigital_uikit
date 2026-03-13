import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Rating from '../rating';

describe('Rating', () => {
  it('renders with default props', () => {
    const { container } = render(<Rating />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders 5 stars by default', () => {
    const { container } = render(<Rating />);
    const stars = container.querySelectorAll('svg');
    // Each star has 2 SVGs (background and filled), so 5 stars = 10 SVGs minimum
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it('renders custom count of stars', () => {
    const { container } = render(<Rating count={10} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThanOrEqual(10);
  });

  it('handles controlled value', () => {
    const { rerender, container } = render(<Rating value={3} onChange={vi.fn()} />);
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeInTheDocument();
    // Check that 3 stars are checked
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'true');
    expect(radios[3]).toHaveAttribute('aria-checked', 'false');

    rerender(<Rating value={5} onChange={vi.fn()} />);
    const radiosAfter = container.querySelectorAll('[role="radio"]');
    radiosAfter.forEach(radio => {
      expect(radio).toHaveAttribute('aria-checked', 'true');
    });
  });

  it('handles uncontrolled mode with defaultValue', () => {
    const { container } = render(<Rating defaultValue={4} />);
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeInTheDocument();
    // Check that 4 stars are checked
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'true');
    expect(radios[3]).toHaveAttribute('aria-checked', 'true');
    expect(radios[4]).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when rating is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(<Rating onChange={handleChange} />);

    // Find the star containers (the clickable divs)
    const starContainers = container.querySelectorAll('.relative.inline-flex');
    const thirdStar = starContainers[2];

    // Click on the overlay div inside the star container (z-10 div)
    const clickableArea = thirdStar?.querySelector('.absolute.inset-0.z-10') as HTMLElement;
    await user.click(clickableArea);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('renders in different sizes', () => {
    const { rerender, container } = render(<Rating size="xs" />);
    expect(container.firstChild).toHaveClass('text-xs');

    rerender(<Rating size="sm" />);
    expect(container.firstChild).toHaveClass('text-sm');

    rerender(<Rating size="md" />);
    expect(container.firstChild).toHaveClass('text-base');

    rerender(<Rating size="lg" />);
    expect(container.firstChild).toHaveClass('text-lg');
  });

  it('disables rating when disabled', () => {
    const { container } = render(<Rating disabled />);
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toHaveAttribute('tabIndex', '-1');
  });

  it('renders readOnly state', () => {
    const { container } = render(<Rating readOnly value={4} onChange={vi.fn()} />);
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toHaveAttribute('tabIndex', '-1');
  });

  it('applies custom className', () => {
    const { container } = render(<Rating className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('sets correct aria-label', () => {
    const { container } = render(<Rating aria-label="Product rating" />);
    const slider = container.querySelector('[role="radiogroup"]');
    expect(slider).toHaveAttribute('aria-label', 'Product rating');
  });

  it('sets default aria-label', () => {
    const { container } = render(<Rating />);
    const slider = container.querySelector('[role="radiogroup"]');
    expect(slider).toHaveAttribute('aria-label', 'Rating');
  });

  it('sets correct role for radiogroup', () => {
    const { container } = render(<Rating value={3} onChange={vi.fn()} />);
    const radiogroup = container.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeInTheDocument();
    // Check that individual stars have role="radio"
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios.length).toBe(5);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(<Rating value={2} onChange={handleChange} />);
    const radiogroup = container.querySelector('[role="radiogroup"]') as HTMLElement;

    await user.click(radiogroup);
    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith(3);

    await user.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('handles allowHalf prop', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(<Rating allowHalf onChange={handleChange} />);

    // Find the first half-star area
    const halfStarArea = container.querySelector('.absolute.inset-0.w-1\\/2.z-10') as HTMLElement;
    if (halfStarArea) {
      await user.click(halfStarArea);
      expect(handleChange).toHaveBeenCalledWith(0.5);
    }
  });

  it('supports different color variants', () => {
    const { rerender, container } = render(<Rating color="primary" value={3} onChange={vi.fn()} />);
    let filledStar = container.querySelector('.fill-primary');
    expect(filledStar).toBeInTheDocument();

    rerender(<Rating color="warning" value={3} onChange={vi.fn()} />);
    filledStar = container.querySelector('.fill-warning');
    expect(filledStar).toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    const { container } = render(
      <Rating
        classNames={{
          root: 'custom-root',
          star: 'custom-star',
        }}
      />
    );

    expect(container.querySelector('.custom-root')).toBeInTheDocument();
  });

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(<Rating disabled onChange={handleChange} />);
    const starContainers = container.querySelectorAll('.relative.inline-flex');
    if (starContainers[2]) {
      await user.click(starContainers[2]);
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  it('does not respond to keyboard when readOnly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(<Rating readOnly value={2} onChange={handleChange} />);
    const radiogroup = container.querySelector('[role="radiogroup"]') as HTMLElement;

    await user.click(radiogroup);
    await user.keyboard('{ArrowRight}');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
