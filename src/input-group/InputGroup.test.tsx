import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputGroup, { InputGroupInput, InputGroupAddon } from './index';
import { DollarSign } from 'lucide-react';

describe('InputGroup', () => {
  it('renders with input and addons', () => {
    render(
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="username" />
      </InputGroup>
    );

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
  });

  it('renders input with prefix and suffix', () => {
    render(
      <InputGroup>
        <InputGroupAddon><DollarSign /></InputGroupAddon>
        <InputGroupInput placeholder="amount" />
        <InputGroupAddon>.00</InputGroupAddon>
      </InputGroup>
    );

    expect(screen.getByPlaceholderText('amount')).toBeInTheDocument();
    expect(screen.getByText('.00')).toBeInTheDocument();
  });

  it('applies custom className to root', () => {
    const { container } = render(
      <InputGroup className="custom-class">
        <InputGroupInput />
      </InputGroup>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies custom classNames object', () => {
    const { container } = render(
      <InputGroup
        classNames={{
          root: 'custom-root',
          addon: 'custom-addon',
          input: 'custom-input',
        }}
      >
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput />
      </InputGroup>
    );

    expect(container.querySelector('.custom-root')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <InputGroup size="xs">
        <InputGroupInput placeholder="test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();

    rerender(
      <InputGroup size="sm">
        <InputGroupInput placeholder="test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();

    rerender(
      <InputGroup size="md">
        <InputGroupInput placeholder="test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();

    rerender(
      <InputGroup size="lg">
        <InputGroupInput placeholder="test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('renders input with disabled state', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="test" disabled />
      </InputGroup>
    );

    expect(screen.getByPlaceholderText('test')).toBeDisabled();
  });

  it('renders input with different types', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Email" type="email" />
      </InputGroup>
    );

    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('passes size to children components', () => {
    render(
      <InputGroup size="lg">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="test" />
      </InputGroup>
    );

    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('renders addon with custom className', () => {
    render(
      <InputGroup>
        <InputGroupAddon className="custom-addon">$</InputGroupAddon>
        <InputGroupInput />
      </InputGroup>
    );

    const addon = screen.getByText('$');
    expect(addon).toHaveClass('custom-addon');
  });

  it('renders input with custom className', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="test" className="custom-input" />
      </InputGroup>
    );

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveClass('custom-input');
  });
});
