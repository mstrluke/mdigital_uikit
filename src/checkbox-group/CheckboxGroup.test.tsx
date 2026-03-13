import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CheckboxGroup from '../checkbox-group';
import Checkbox from '../checkbox';

describe('CheckboxGroup', () => {
  it('renders children checkboxes', () => {
    render(
      <CheckboxGroup>
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <CheckboxGroup label="Select Options">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Select Options')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(
      <CheckboxGroup helperText="Select all that apply">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Select all that apply')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(
      <CheckboxGroup error="Please select at least one option">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Please select at least one option')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(
      <CheckboxGroup error="Error message" helperText="Helper text">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders with vertical orientation by default', () => {
    const { container } = render(
      <CheckboxGroup>
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
      </CheckboxGroup>
    );

    const group = container.querySelector('[data-slot="group"]');
    expect(group).toHaveClass('flex-col');
  });

  it('renders with horizontal orientation', () => {
    const { container } = render(
      <CheckboxGroup orientation="horizontal">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
      </CheckboxGroup>
    );

    const group = container.querySelector('[data-slot="group"]');
    expect(group).toHaveClass('flex-row');
  });

  it('sets role="group" on container', () => {
    const { container } = render(
      <CheckboxGroup>
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveAttribute('role', 'group');
  });

  it('sets aria-labelledby when label is present', () => {
    render(
      <CheckboxGroup label="Options">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    const group = screen.getByRole('group');
    const labelId = group.getAttribute('aria-labelledby');

    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)).toHaveTextContent('Options');
  });

  it('sets aria-describedby when helper text is present', () => {
    render(
      <CheckboxGroup helperText="Helper">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    const group = screen.getByRole('group');
    const describedBy = group.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Helper');
  });

  it('sets aria-describedby when error is present', () => {
    render(
      <CheckboxGroup error="Error message">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    const group = screen.getByRole('group');
    const describedBy = group.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Error message');
  });

  it('forwards ref to container element', () => {
    const ref = { current: null };
    render(
      <CheckboxGroup ref={ref}>
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(
      <CheckboxGroup className="custom-class">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom classNames object', () => {
    const { container } = render(
      <CheckboxGroup
        classNames={{
          root: 'custom-root',
          group: 'custom-group',
          label: 'custom-label',
        }}
        label="Test"
      >
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveClass('custom-root');
    const group = container.querySelector('[data-slot="group"]');
    expect(group).toHaveClass('custom-group');
  });

  it('passes through HTML attributes', () => {
    render(
      <CheckboxGroup data-testid="checkbox-group">
        <Checkbox label="Option 1" />
      </CheckboxGroup>
    );

    expect(screen.getByTestId('checkbox-group')).toBeInTheDocument();
  });

  it('renders multiple checkboxes with proper spacing', () => {
    const { container } = render(
      <CheckboxGroup>
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </CheckboxGroup>
    );

    const group = container.querySelector('[data-slot="group"]');
    expect(group).toHaveClass('gap-2');
  });

  it('renders horizontal layout with proper spacing', () => {
    const { container } = render(
      <CheckboxGroup orientation="horizontal">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
      </CheckboxGroup>
    );

    const group = container.querySelector('[data-slot="group"]');
    expect(group).toHaveClass('gap-4');
  });
});
