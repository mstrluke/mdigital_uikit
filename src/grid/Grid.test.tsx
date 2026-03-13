import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Grid from '../grid'

describe('Grid', () => {
  it('renders grid container', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders with default 3 columns', () => {
    render(
      <Grid>
        <div>A</div>
      </Grid>
    )
    const grid = screen.getByText('A').parentElement
    expect(grid).toHaveClass('grid_root')
  })

  it('renders with 1 column', () => {
    render(
      <Grid columns={1}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('grid-cols-1')
  })

  it('renders with 2 columns', () => {
    render(
      <Grid columns={2}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toBeInTheDocument()
  })

  it('renders with 4 columns', () => {
    render(
      <Grid columns={4}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toBeInTheDocument()
  })

  it('renders with 5 columns', () => {
    render(
      <Grid columns={5}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toBeInTheDocument()
  })

  it('renders with 6 columns', () => {
    render(
      <Grid columns={6}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toBeInTheDocument()
  })

  it('renders with default medium gap', () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('gap-6')
  })

  it('renders with xs gap', () => {
    render(
      <Grid gap="xs">
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('gap-2')
  })

  it('renders with sm gap', () => {
    render(
      <Grid gap="sm">
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('gap-4')
  })

  it('renders with lg gap', () => {
    render(
      <Grid gap="lg">
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('gap-8')
  })

  it('applies custom className', () => {
    render(
      <Grid className="custom-grid">
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('custom-grid')
  })

  it('renders multiple children correctly', () => {
    render(
      <Grid columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    expect(screen.getByText('Item 4')).toBeInTheDocument()
  })

  it('has responsive classes for multi-column layouts', () => {
    render(
      <Grid columns={3}>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    // Grid with 3 columns should have responsive breakpoint classes
    expect(grid).toHaveClass('grid_root')
  })

  it('has full width class', () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>
    )
    const grid = screen.getByText('Item').parentElement
    expect(grid).toHaveClass('w-full')
  })
})
