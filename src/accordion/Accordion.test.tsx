import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from './index'
import type { AccordionItem } from './types'

const mockItems: AccordionItem[] = [
  {
    key: '1',
    title: 'Section 1',
    content: 'Content 1',
  },
  {
    key: '2',
    title: 'Section 2',
    content: 'Content 2',
  },
  {
    key: '3',
    title: 'Section 3',
    content: 'Content 3',
  },
]

describe('Accordion', () => {
  it('renders accordion items', () => {
    render(<Accordion items={mockItems} />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('renders all panels collapsed by default', () => {
    render(<Accordion items={mockItems} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('expands panel when clicked', async () => {
    const user = userEvent.setup()
    render(<Accordion items={mockItems} />)

    const button = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses other panels in single mode', async () => {
    const user = userEvent.setup()
    render(<Accordion items={mockItems} />)

    const button1 = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    const button2 = screen.getByText('Section 2').closest('button') as HTMLButtonElement

    await user.click(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'true')

    await user.click(button2)
    expect(button1).toHaveAttribute('aria-expanded', 'false')
    expect(button2).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows multiple panels open in multiple mode', async () => {
    const user = userEvent.setup()
    render(<Accordion items={mockItems} multiple />)

    const button1 = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    const button2 = screen.getByText('Section 2').closest('button') as HTMLButtonElement

    await user.click(button1)
    await user.click(button2)

    expect(button1).toHaveAttribute('aria-expanded', 'true')
    expect(button2).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onChange when panel is toggled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Accordion items={mockItems} onChange={onChange} />)

    await user.click(screen.getByText('Section 1'))
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('renders with defaultActiveKey', () => {
    render(<Accordion items={mockItems} defaultActiveKey="1" />)
    const button = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('respects controlled activeKey', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Accordion items={mockItems} activeKey="1" onChange={onChange} />
    )

    const button1 = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    const button2 = screen.getByText('Section 2').closest('button') as HTMLButtonElement

    expect(button1).toHaveAttribute('aria-expanded', 'true')

    await user.click(button2)
    expect(onChange).toHaveBeenCalledWith('2')

    rerender(<Accordion items={mockItems} activeKey="2" onChange={onChange} />)
    const button2After = screen.getByText('Section 2').closest('button') as HTMLButtonElement
    expect(button2After).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Accordion items={mockItems} size="xs" />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()

    rerender(<Accordion items={mockItems} size="sm" />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()

    rerender(<Accordion items={mockItems} size="md" />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()

    rerender(<Accordion items={mockItems} size="lg" />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Accordion items={mockItems} color={color} />)
      expect(screen.getByText('Section 1')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'soft', 'bordered', 'splitted'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Accordion items={mockItems} variant={variant} />)
      expect(screen.getByText('Section 1')).toBeInTheDocument()
      unmount()
    })
  })

  it('disables specified items', async () => {
    const itemsWithDisabled: AccordionItem[] = [
      ...mockItems,
      { key: '4', title: 'Disabled', content: 'Content', disabled: true },
    ]
    const user = userEvent.setup()
    render(<Accordion items={itemsWithDisabled} />)

    const disabledButton = screen.getByText('Disabled').closest('button') as HTMLButtonElement
    expect(disabledButton).toBeDisabled()

    await user.click(disabledButton)
    expect(disabledButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders items with icons', () => {
    const itemsWithIcons: AccordionItem[] = [
      {
        key: '1',
        title: 'With Icon',
        content: 'Content',
        icon: <span data-testid="icon">★</span>,
      },
    ]
    render(<Accordion items={itemsWithIcons} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders items with subtitle', () => {
    const itemsWithSubtitle: AccordionItem[] = [
      {
        key: '1',
        title: 'Title',
        content: 'Content',
        subtitle: 'Subtitle text',
      },
    ]
    render(<Accordion items={itemsWithSubtitle} />)
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
  })

  it('renders items with extra content', () => {
    const itemsWithExtra: AccordionItem[] = [
      {
        key: '1',
        title: 'Title',
        content: 'Content',
        extra: <span data-testid="extra">Extra</span>,
      },
    ]
    render(<Accordion items={itemsWithExtra} />)
    expect(screen.getByTestId('extra')).toBeInTheDocument()
  })

  it('hides expand icon when expandIcon is false', () => {
    const { container } = render(<Accordion items={mockItems} expandIcon={false} />)
    const chevron = container.querySelector('svg')
    expect(chevron).not.toBeInTheDocument()
  })

  it('renders custom expand icon', () => {
    render(
      <Accordion items={mockItems} expandIcon={<span data-testid="custom-icon">+</span>} />
    )
    expect(screen.getAllByTestId('custom-icon')).toHaveLength(mockItems.length)
  })

  it('renders expand icon function', () => {
    render(
      <Accordion
        items={mockItems}
        expandIcon={(isExpanded) => (
          <span data-testid="icon">{isExpanded ? '-' : '+'}</span>
        )}
      />
    )
    const icons = screen.getAllByTestId('icon')
    expect(icons).toHaveLength(mockItems.length)
  })

  it('renders expand icon on left when expandIconPosition is left', () => {
    render(<Accordion items={mockItems} expandIconPosition="left" />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
  })

  it('prevents collapsing when collapsible is false', async () => {
    const user = userEvent.setup()
    render(<Accordion items={mockItems} defaultActiveKey="1" collapsible={false} />)

    const button = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    await user.click(button)

    // Should stay expanded
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('destroys content when destroyOnClose is true', async () => {
    const user = userEvent.setup()
    render(<Accordion items={mockItems} defaultActiveKey="1" destroyOnClose collapsible />)

    const button = screen.getByText('Section 1').closest('button') as HTMLButtonElement
    expect(screen.getByText('Content 1')).toBeInTheDocument()

    await user.click(button)
    // Content should be removed from DOM
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Accordion items={mockItems} className="custom-class" />
    )
    const accordion = container.querySelector('.accordion_root')
    expect(accordion).toHaveClass('custom-class')
  })

  it('applies itemClassName to all items', () => {
    const { container } = render(
      <Accordion items={mockItems} itemClassName="item-class" />
    )
    const items = container.querySelectorAll('.accordion_item')
    items.forEach((item) => {
      expect(item).toHaveClass('item-class')
    })
  })

  it('forwards ref to accordion element', () => {
    const ref = { current: null }
    render(<Accordion items={mockItems} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('has proper accessibility attributes', () => {
    render(<Accordion items={mockItems} />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded')
      expect(button).toHaveAttribute('aria-controls')
    })

    const regions = screen.getAllByRole('region', { hidden: true })
    expect(regions.length).toBeGreaterThan(0)
  })
})
