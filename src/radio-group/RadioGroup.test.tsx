import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RadioGroup from '../radio-group';
import Radio from '../radio';

describe('RadioGroup', () => {
  it('renders children radios', () => {
    render(
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <RadioGroup label="Select an Option">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(screen.getByText('Select an Option')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(
      <RadioGroup helperText="Choose one option">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(screen.getByText('Choose one option')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(
      <RadioGroup error="Please select an option">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(
      <RadioGroup error="Error message" helperText="Helper text">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders with vertical orientation by default', () => {
    const { container } = render(
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
      </RadioGroup>
    );

    const group = container.querySelector('[class*="flex-col"]');
    expect(group).toBeInTheDocument();
  });

  it('renders with horizontal orientation', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal">
        <Radio label="Option 1" />
        <Radio label="Option 2" />
      </RadioGroup>
    );

    const group = container.querySelector('[class*="flex-row"]');
    expect(group).toBeInTheDocument();
  });

  it('sets role="radiogroup" on container', () => {
    const { container } = render(
      <RadioGroup>
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(container.firstChild).toHaveAttribute('role', 'radiogroup');
  });

  it('forwards ref to container element', () => {
    const ref = { current: null };
    render(
      <RadioGroup ref={ref}>
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup className="custom-class">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    const { container } = render(
      <RadioGroup
        classNames={{
          root: 'custom-root',
          group: 'custom-group',
          label: 'custom-label',
        }}
        label="Test"
      >
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through HTML attributes', () => {
    render(
      <RadioGroup data-testid="radio-group">
        <Radio label="Option 1" />
      </RadioGroup>
    );

    expect(screen.getByTestId('radio-group')).toBeInTheDocument();
  });

  it('renders multiple radios with proper spacing', () => {
    const { container } = render(
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
      </RadioGroup>
    );

    const group = container.querySelector('[class*="gap-2"]');
    expect(group).toBeInTheDocument();
  });

  it('renders horizontal layout with proper spacing', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal">
        <Radio label="Option 1" />
        <Radio label="Option 2" />
      </RadioGroup>
    );

    const group = container.querySelector('[class*="gap-4"]');
    expect(group).toBeInTheDocument();
  });

  it('groups radios together for single selection', async () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <Radio name="choice" label="Option 1" value="1" />
        <Radio name="choice" label="Option 2" value="2" />
        <Radio name="choice" label="Option 3" value="3" />
      </RadioGroup>
    );

    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'choice');
    });
  });
});
