import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Timeline from './index'
import type { TimelineItem } from './types'

const mockItems: TimelineItem[] = [
  {
    key: '1',
    title: 'Task Completed',
    description: 'The task was successfully completed',
    timestamp: '2024-01-01 10:00',
  },
  {
    key: '2',
    title: 'Review Started',
    description: 'Code review is in progress',
    timestamp: '2024-01-01 11:00',
  },
  {
    key: '3',
    title: 'Deployed',
    description: 'Changes deployed to production',
    timestamp: '2024-01-01 12:00',
  },
]

describe('Timeline', () => {
  it('renders timeline items', () => {
    render(<Timeline items={mockItems} />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
    expect(screen.getByText('Review Started')).toBeInTheDocument()
    expect(screen.getByText('Deployed')).toBeInTheDocument()
  })

  it('renders item descriptions', () => {
    render(<Timeline items={mockItems} />)
    expect(screen.getByText('The task was successfully completed')).toBeInTheDocument()
    expect(screen.getByText('Code review is in progress')).toBeInTheDocument()
    expect(screen.getByText('Changes deployed to production')).toBeInTheDocument()
  })

  it('renders item timestamps', () => {
    render(<Timeline items={mockItems} />)
    expect(screen.getByText('2024-01-01 10:00')).toBeInTheDocument()
    expect(screen.getByText('2024-01-01 11:00')).toBeInTheDocument()
    expect(screen.getByText('2024-01-01 12:00')).toBeInTheDocument()
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Timeline items={mockItems} size="xs" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()

    rerender(<Timeline items={mockItems} size="sm" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()

    rerender(<Timeline items={mockItems} size="md" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()

    rerender(<Timeline items={mockItems} size="lg" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Timeline items={mockItems} color={color} />)
      expect(screen.getByText('Task Completed')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders in left mode by default', () => {
    render(<Timeline items={mockItems} />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
  })

  it('renders in right mode', () => {
    render(<Timeline items={mockItems} mode="right" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
  })

  it('renders in center mode', () => {
    render(<Timeline items={mockItems} mode="center" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
  })

  it('renders in horizontal orientation', () => {
    render(<Timeline items={mockItems} orientation="horizontal" />)
    expect(screen.getByText('Task Completed')).toBeInTheDocument()
    expect(screen.getByText('Review Started')).toBeInTheDocument()
    expect(screen.getByText('Deployed')).toBeInTheDocument()
  })

  it('renders center mode with alternating layout', () => {
    const { container } = render(<Timeline items={mockItems} mode="center" />)
    const items = container.querySelectorAll('.timeline_item')
    expect(items.length).toBe(3)
  })

  it('renders timestamp as date on opposite side', () => {
    const { container } = render(<Timeline items={mockItems} />)
    const dates = container.querySelectorAll('.timeline_date')
    expect(dates.length).toBe(3)
    expect(dates[0]?.textContent).toBe('2024-01-01 10:00')
  })

  it('renders items with custom colors', () => {
    const itemsWithColors: TimelineItem[] = [
      { key: '1', title: 'Success', color: 'success' },
      { key: '2', title: 'Error', color: 'error' },
      { key: '3', title: 'Warning', color: 'warning' },
    ]
    render(<Timeline items={itemsWithColors} />)
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders items with custom icons', () => {
    const itemsWithIcons: TimelineItem[] = [
      {
        key: '1',
        title: 'With Icon',
        icon: <span data-testid="custom-icon">✓</span>,
      },
    ]
    render(<Timeline items={itemsWithIcons} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders items with custom dot elements', () => {
    const itemsWithDots: TimelineItem[] = [
      {
        key: '1',
        title: 'Custom Dot',
        dot: <div data-testid="custom-dot">●</div>,
      },
    ]
    render(<Timeline items={itemsWithDots} />)
    expect(screen.getByTestId('custom-dot')).toBeInTheDocument()
  })

  it('renders pending indicator', () => {
    render(<Timeline items={mockItems} pending />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom pending text', () => {
    render(<Timeline items={mockItems} pending pendingText="Processing..." />)
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('renders items in reverse order', () => {
    const { container } = render(<Timeline items={mockItems} reverse />)
    const items = container.querySelectorAll('.timeline_item')
    const firstTitle = items[0]?.querySelector('.timeline_title')
    expect(firstTitle?.textContent).toBe('Deployed')
  })

  it('renders without descriptions', () => {
    const itemsWithoutDesc: TimelineItem[] = [
      { key: '1', title: 'Title Only' },
    ]
    render(<Timeline items={itemsWithoutDesc} />)
    expect(screen.getByText('Title Only')).toBeInTheDocument()
  })

  it('renders without timestamps', () => {
    const itemsWithoutTime: TimelineItem[] = [
      { key: '1', title: 'No Timestamp', description: 'Description' },
    ]
    render(<Timeline items={itemsWithoutTime} />)
    expect(screen.getByText('No Timestamp')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Timeline items={mockItems} className="custom-class" />
    )
    const timeline = container.querySelector('.timeline_root')
    expect(timeline).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    render(
      <Timeline
        items={mockItems}
        classNames={{
          root: 'root-class',
          item: 'item-class',
          content: 'content-class',
          title: 'title-class',
        }}
      />
    )

    const root = screen.getByText('Task Completed').closest('.timeline_root')
    expect(root).toHaveClass('root-class')
  })

  it('forwards ref to timeline element', () => {
    const ref = { current: null }
    render(<Timeline items={mockItems} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders timeline with all modes', () => {
    const modes = ['left', 'right', 'center'] as const
    modes.forEach((mode) => {
      const { unmount } = render(<Timeline items={mockItems} mode={mode} />)
      expect(screen.getByText('Task Completed')).toBeInTheDocument()
      unmount()
    })
  })

  it('handles empty items array', () => {
    const { container } = render(<Timeline items={[]} />)
    const timeline = container.querySelector('.timeline_root')
    expect(timeline).toBeInTheDocument()
  })

  it('renders ReactNode as title', () => {
    const itemsWithNodeTitle: TimelineItem[] = [
      {
        key: '1',
        title: <span data-testid="custom-title">Custom Title</span>,
      },
    ]
    render(<Timeline items={itemsWithNodeTitle} />)
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })

  it('renders ReactNode as description', () => {
    const itemsWithNodeDesc: TimelineItem[] = [
      {
        key: '1',
        title: 'Title',
        description: <span data-testid="custom-desc">Custom Description</span>,
      },
    ]
    render(<Timeline items={itemsWithNodeDesc} />)
    expect(screen.getByTestId('custom-desc')).toBeInTheDocument()
  })
})
