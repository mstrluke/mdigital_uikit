import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Descriptions from './index'
import type { DescriptionsItem } from './types'

const mockItems: DescriptionsItem[] = [
  { key: 'name', label: 'Name', children: 'John Doe' },
  { key: 'age', label: 'Age', children: '30' },
  { key: 'email', label: 'Email', children: 'john@example.com' },
]

describe('Descriptions', () => {
  it('renders description items', () => {
    render(<Descriptions items={mockItems} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Descriptions items={mockItems} size="xs" />)
    expect(screen.getByText('Name')).toBeInTheDocument()

    rerender(<Descriptions items={mockItems} size="sm" />)
    expect(screen.getByText('Name')).toBeInTheDocument()

    rerender(<Descriptions items={mockItems} size="md" />)
    expect(screen.getByText('Name')).toBeInTheDocument()

    rerender(<Descriptions items={mockItems} size="lg" />)
    expect(screen.getByText('Name')).toBeInTheDocument()

    rerender(<Descriptions items={mockItems} size="xl" />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Descriptions items={mockItems} color={color} />)
      expect(screen.getByText('Name')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Descriptions items={mockItems} variant={variant} />)
      expect(screen.getByText('Name')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders in horizontal layout by default', () => {
    render(<Descriptions items={mockItems} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders in vertical layout', () => {
    render(<Descriptions items={mockItems} layout="vertical" />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('respects column prop for layout', () => {
    render(<Descriptions items={mockItems} column={2} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders items with span', () => {
    const itemsWithSpan: DescriptionsItem[] = [
      { key: '1', label: 'Full Width', children: 'Content', span: 3 },
      { key: '2', label: 'Half', children: 'Content', span: 1 },
    ]
    render(<Descriptions items={itemsWithSpan} column={3} />)
    expect(screen.getByText('Full Width')).toBeInTheDocument()
    expect(screen.getByText('Half')).toBeInTheDocument()
  })

  it('renders with bordered styling', () => {
    const { container } = render(<Descriptions items={mockItems} bordered />)
    const table = container.querySelector('table')
    expect(table).toBeInTheDocument()
  })

  it('renders without border', () => {
    const { container } = render(<Descriptions items={mockItems} bordered={false} />)
    const table = container.querySelector('table')
    expect(table).toBeInTheDocument()
  })

  it('renders with rounded corners', () => {
    render(<Descriptions items={mockItems} rounded />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders without rounded corners', () => {
    render(<Descriptions items={mockItems} rounded={false} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<Descriptions items={mockItems} title="User Information" />)
    expect(screen.getByText('User Information')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders with extra content', () => {
    render(
      <Descriptions
        items={mockItems}
        title="User Information"
        extra={<button>Edit</button>}
      />
    )
    expect(screen.getByText('User Information')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('renders ReactNode as label', () => {
    const itemsWithNodeLabel: DescriptionsItem[] = [
      {
        key: '1',
        label: <span data-testid="custom-label">Custom Label</span>,
        children: 'Content',
      },
    ]
    render(<Descriptions items={itemsWithNodeLabel} />)
    expect(screen.getByTestId('custom-label')).toBeInTheDocument()
  })

  it('renders ReactNode as children', () => {
    const itemsWithNodeChildren: DescriptionsItem[] = [
      {
        key: '1',
        label: 'Status',
        children: <span data-testid="custom-value">Active</span>,
      },
    ]
    render(<Descriptions items={itemsWithNodeChildren} />)
    expect(screen.getByTestId('custom-value')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Descriptions items={mockItems} className="custom-class" />
    )
    const root = container.querySelector('.descriptions_root')
    expect(root).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    render(
      <Descriptions
        items={mockItems}
        classNames={{
          root: 'root-class',
          item: 'item-class',
          label: 'label-class',
          content: 'content-class',
        }}
      />
    )

    const root = screen.getByText('Name').closest('.descriptions_root')
    expect(root).toHaveClass('root-class')
  })

  it('renders with title and extra without table wrapper', () => {
    const { container } = render(
      <Descriptions
        items={mockItems}
        title="Information"
        extra={<button>Action</button>}
      />
    )
    expect(screen.getByText('Information')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    // Should render wrapper div, not table as root
    const wrapper = container.querySelector('.descriptions_root')
    expect(wrapper?.tagName).not.toBe('TABLE')
  })

  it('handles empty items array', () => {
    const { container } = render(<Descriptions items={[]} />)
    const table = container.querySelector('table')
    expect(table).toBeInTheDocument()
  })

  it('forwards ref to table element', () => {
    const ref = { current: null }
    render(<Descriptions items={mockItems} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTableElement)
  })

  it('renders all combinations of layout and variant', () => {
    const layouts = ['horizontal', 'vertical'] as const
    const variants = ['default', 'solid', 'soft'] as const

    layouts.forEach((layout) => {
      variants.forEach((variant) => {
        const { unmount } = render(
          <Descriptions items={mockItems} layout={layout} variant={variant} />
        )
        expect(screen.getByText('Name')).toBeInTheDocument()
        unmount()
      })
    })
  })
})
