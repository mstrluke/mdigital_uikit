import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Tabs from '../tabs'
import type { TabItem } from './types'

const mockItems: TabItem[] = [
  { key: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { key: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { key: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
]

describe('Tabs', () => {
  it('renders tab list with all items', () => {
    render(<Tabs items={mockItems} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument()
  })

  it('renders first tab as active by default', () => {
    render(<Tabs items={mockItems} />)
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(tab1).toHaveAttribute('tabIndex', '0')
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('renders default active tab when specified', () => {
    render(<Tabs items={mockItems} defaultActiveKey="tab2" />)
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('switches tabs on click', async () => {
    const user = userEvent.setup()
    render(<Tabs items={mockItems} />)

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('calls onChange when tab changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Tabs items={mockItems} onChange={handleChange} />)

    await user.click(screen.getByRole('tab', { name: 'Tab 3' }))
    expect(handleChange).toHaveBeenCalledWith('tab3')
  })

  it('supports controlled mode with activeKey', () => {
    const { rerender } = render(<Tabs items={mockItems} activeKey="tab1" />)
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')

    rerender(<Tabs items={mockItems} activeKey="tab3" />)
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 3')).toBeInTheDocument()
  })

  it('renders disabled tabs', () => {
    const itemsWithDisabled: TabItem[] = [
      { key: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { key: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ]
    render(<Tabs items={itemsWithDisabled} />)

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' })
    expect(disabledTab).toBeDisabled()
    expect(disabledTab).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('does not switch to disabled tab on click', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const itemsWithDisabled: TabItem[] = [
      { key: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { key: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ]
    render(<Tabs items={itemsWithDisabled} onChange={handleChange} />)

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(handleChange).not.toHaveBeenCalled()
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')
  })

  it('renders tabs with icons', () => {
    const itemsWithIcons: TabItem[] = [
      { key: 'tab1', label: 'Tab 1', icon: <span data-testid="icon1">🏠</span>, content: <div>Content 1</div> },
    ]
    render(<Tabs items={itemsWithIcons} />)

    expect(screen.getByTestId('icon1')).toBeInTheDocument()
  })

  it('supports keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Tabs items={mockItems} />)

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    tab1.focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true')
  })

  it('wraps around with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Tabs items={mockItems} />)

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    tab1.focus()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')
  })

  it('supports Home and End keys', async () => {
    const user = userEvent.setup()
    render(<Tabs items={mockItems} />)

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    tab1.focus()

    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Tabs items={mockItems} size="xs" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} size="sm" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} size="md" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} size="lg" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders different variants', () => {
    const { rerender } = render(<Tabs items={mockItems} variant="default" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} variant="solid" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} variant="soft" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()

    rerender(<Tabs items={mockItems} variant="pill" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Tabs items={mockItems} color={color} />)
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom className', () => {
    render(<Tabs items={mockItems} className="custom-tabs" />)
    const root = screen.getByRole('tablist').closest('.tabs_root')
    expect(root).toHaveClass('custom-tabs')
  })

  it('applies classNames.root', () => {
    render(<Tabs items={mockItems} classNames={{ root: 'root-class' }} />)
    const root = screen.getByRole('tablist').closest('.tabs_root')
    expect(root).toHaveClass('root-class')
  })

  it('applies classNames.list', () => {
    render(<Tabs items={mockItems} classNames={{ list: 'list-class' }} />)
    expect(screen.getByRole('tablist')).toHaveClass('list-class')
  })

  it('applies classNames.tab', () => {
    render(<Tabs items={mockItems} classNames={{ tab: 'tab-class' }} />)
    const tabs = screen.getAllByRole('tab')
    tabs.forEach(tab => {
      expect(tab).toHaveClass('tab-class')
    })
  })

  it('applies classNames.tabActive to active tab', () => {
    render(<Tabs items={mockItems} classNames={{ tabActive: 'active-class' }} />)
    const activeTab = screen.getByRole('tab', { name: 'Tab 1' })
    expect(activeTab).toHaveClass('active-class')
  })

  it('applies classNames.panel', () => {
    render(<Tabs items={mockItems} classNames={{ panel: 'panel-class' }} />)
    expect(screen.getByRole('tabpanel')).toHaveClass('panel-class')
  })

  it('has proper ARIA attributes', () => {
    render(<Tabs items={mockItems} />)

    const tablist = screen.getByRole('tablist')
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    const panel = screen.getByRole('tabpanel')

    expect(tab1).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab1.id)
  })

  it('sets correct tabIndex on tabs', () => {
    render(<Tabs items={mockItems} />)

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabIndex', '0')
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabIndex', '-1')
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('tabIndex', '-1')
  })

  it('renders tab panel with animation classes', () => {
    render(<Tabs items={mockItems} />)
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveClass('animate-in', 'fade-in')
  })

  describe('Indicator Positioning', () => {
    // Mock offsetLeft and offsetWidth for layout calculations in jsdom
    beforeEach(() => {
      // Mock HTMLElement.prototype properties
      Object.defineProperties(HTMLElement.prototype, {
        offsetLeft: {
          get() {
            return parseFloat(this.style.marginLeft) || 0
          },
          configurable: true,
        },
        offsetWidth: {
          get() {
            return parseFloat(this.style.width) || 100
          },
          configurable: true,
        },
        offsetHeight: {
          get() {
            return parseFloat(this.style.height) || 40
          },
          configurable: true,
        },
      })
    })

    it('renders indicator element', () => {
      const { container } = render(<Tabs items={mockItems} />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]')
      expect(indicator).toBeInTheDocument()
    })

    it('indicator has proper classes for default variant', () => {
      const { container } = render(<Tabs items={mockItems} variant="default" />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]')
      expect(indicator).toHaveClass('bottom-0', 'h-0.5', 'rounded-full')
    })

    it('indicator has proper classes for pill variant', () => {
      const { container } = render(<Tabs items={mockItems} variant="pill" />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]')
      expect(indicator).toHaveClass('rounded-md', 'shadow-sm', 'top-0.5')
    })

    it('indicator has transform style applied', () => {
      const { container } = render(<Tabs items={mockItems} />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]') as HTMLElement
      expect(indicator?.style.transform).toBeTruthy()
      expect(indicator?.style.width).toBeTruthy()
    })

    it('indicator updates position when tab changes', async () => {
      const user = userEvent.setup()
      const { container } = render(<Tabs items={mockItems} />)
      
      // Mock different positions for tabs
      const tabs = container.querySelectorAll('[role="tab"]')
      ;(tabs[0] as HTMLElement).style.marginLeft = '0px'
      ;(tabs[1] as HTMLElement).style.marginLeft = '120px'
      ;(tabs[2] as HTMLElement).style.marginLeft = '240px'
      
      const indicator = container.querySelector('[data-slot="tabs_indicator"]') as HTMLElement
      const initialTransform = indicator?.style.transform
      
      await act(async () => {
        await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
        await new Promise(resolve => setTimeout(resolve, 50))
      })
      
      const newTransform = indicator?.style.transform
      expect(newTransform).not.toBe(initialTransform)
    })

    it('indicator has transition classes after initialization', async () => {
      const { container } = render(<Tabs items={mockItems} />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]')
      
      // Wait for initialization
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })
      
      expect(indicator).toHaveClass('transition-[transform,width]', 'duration-300', 'ease-out')
    })

    it('indicator respects custom classNames.indicator', () => {
      const { container } = render(
        <Tabs items={mockItems} classNames={{ indicator: 'custom-indicator' }} />
      )
      const indicator = container.querySelector('[data-slot="tabs_indicator"]')
      expect(indicator).toHaveClass('custom-indicator')
    })

    it('indicator has opacity set to 1 when visible', () => {
      const { container } = render(<Tabs items={mockItems} />)
      const indicator = container.querySelector('[data-slot="tabs_indicator"]') as HTMLElement
      expect(indicator?.style.opacity).toBe('1')
    })

    it('indicator width reflects tab width', async () => {
      const user = userEvent.setup()
      const itemsWithDifferentLengths: TabItem[] = [
        { key: 'short', label: 'A', content: <div>Short</div> },
        { key: 'long', label: 'Very Long Tab Label', content: <div>Long</div> },
      ]
      const { container } = render(<Tabs items={itemsWithDifferentLengths} />)
      
      // Mock different widths for tabs
      const tabs = container.querySelectorAll('[role="tab"]')
      ;(tabs[0] as HTMLElement).style.width = '50px'
      ;(tabs[1] as HTMLElement).style.width = '200px'
      
      const indicator = container.querySelector('[data-slot="tabs_indicator"]') as HTMLElement
      
      await act(async () => {
        await user.click(screen.getByRole('tab', { name: 'Very Long Tab Label' }))
        await new Promise(resolve => setTimeout(resolve, 50))
      })
      
      // Indicator should have a width style applied (the exact value depends on the active tab)
      expect(indicator?.style.width).toBeTruthy()
    })
  })
})
