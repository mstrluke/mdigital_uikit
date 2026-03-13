import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../button'
import ButtonGroup from '../button-group'

describe('ButtonGroup', () => {
  it('renders button group with role group', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders all child buttons', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Third' })).toBeInTheDocument()
  })

  it('renders horizontal by default', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('flex-row')
  })

  it('renders vertical when vertical prop is true', () => {
    render(
      <ButtonGroup vertical>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('flex-col')
  })

  it('applies size prop to all child buttons', () => {
    render(
      <ButtonGroup size="sm">
        <Button>Small 1</Button>
        <Button>Small 2</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
    })
  })

  it('applies variant prop to all child buttons', () => {
    render(
      <ButtonGroup variant="outline">
        <Button>Outline 1</Button>
        <Button>Outline 2</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('applies color prop to all child buttons', () => {
    render(
      <ButtonGroup color="primary">
        <Button>Primary 1</Button>
        <Button>Primary 2</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('applies shape prop to all child buttons', () => {
    render(
      <ButtonGroup shape="pill">
        <Button>Pill 1</Button>
        <Button>Pill 2</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('child button props override group props', () => {
    render(
      <ButtonGroup size="sm" variant="solid">
        <Button size="lg">Large Override</Button>
        <Button variant="outline">Outline Override</Button>
      </ButtonGroup>
    )
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('disables all buttons when disabled prop is true', () => {
    render(
      <ButtonGroup disabled>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('respects individual button disabled state even when group is not disabled', () => {
    render(
      <ButtonGroup>
        <Button disabled>Disabled</Button>
        <Button>Enabled</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Enabled' })).not.toBeDisabled()
  })

  it('renders fullWidth group', () => {
    render(
      <ButtonGroup fullWidth>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('w-full')
  })

  it('renders attached buttons by default', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toBeInTheDocument()
  })

  it('renders separated buttons with gap when attached is false', () => {
    render(
      <ButtonGroup attached={false} gap="md">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('gap-2')
  })

  it('renders with small gap', () => {
    render(
      <ButtonGroup attached={false} gap="sm">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('gap-1')
  })

  it('renders with large gap', () => {
    render(
      <ButtonGroup attached={false} gap="lg">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group).toHaveClass('gap-3')
  })

  it('applies custom className', () => {
    render(
      <ButtonGroup className="custom-group">
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toHaveClass('custom-group')
  })

  it('applies classNames.root', () => {
    render(
      <ButtonGroup classNames={{ root: 'root-class' }}>
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toHaveClass('root-class')
  })

  it('applies classNames.button to all buttons', () => {
    render(
      <ButtonGroup classNames={{ button: 'button-class' }}>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('button-class')
    })
  })

  it('forwards ref to group element', () => {
    const ref = { current: null }
    render(
      <ButtonGroup ref={ref}>
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles aria-label for accessibility', () => {
    render(
      <ButtonGroup aria-label="Action buttons">
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group', { name: 'Action buttons' })).toBeInTheDocument()
  })
})
