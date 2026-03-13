import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { NavigationMenu } from './index'
import type { NavigationMenuItem } from './types'

describe('NavigationMenu', () => {
  const defaultItems: NavigationMenuItem[] = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/about' },
    {
      key: 'products',
      label: 'Products',
      children: [
        { key: 'all', label: 'All Products', description: 'View all products' },
        { key: 'featured', label: 'Featured', description: 'Featured products' },
      ],
    },
  ]

  it('should render navigation menu', () => {
    render(<NavigationMenu items={defaultItems} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(<NavigationMenu items={defaultItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should apply custom className to root', () => {
    const { container } = render(<NavigationMenu items={defaultItems} className="custom-nav" />)
    expect(container.querySelector('[data-slot="root"]')).toHaveClass('custom-nav')
  })

  it('should apply classNames API', () => {
    const { container } = render(
      <NavigationMenu
        items={defaultItems}
        classNames={{
          root: 'custom-root',
          list: 'custom-list',
        }}
      />
    )
    expect(container.querySelector('[data-slot="root"]')).toHaveClass('custom-root')
    expect(container.querySelector('[data-slot="list"]')).toHaveClass('custom-list')
  })

  it('should render with horizontal orientation', () => {
    const { container } = render(<NavigationMenu items={defaultItems} orientation="horizontal" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root).toHaveClass('flex-row')
  })

  it('should render with vertical orientation', () => {
    const { container } = render(<NavigationMenu items={defaultItems} orientation="vertical" />)
    const root = container.querySelector('[data-slot="root"]')
    expect(root).toHaveClass('flex-col')
  })

  it('should render items with links', () => {
    const items: NavigationMenuItem[] = [
      { key: 'home', label: 'Home', href: '/' },
    ]

    render(<NavigationMenu items={items} />)

    const link = screen.getByText('Home').closest('[data-slot="link"]')
    expect(link).toHaveAttribute('href', '/')
  })

  it('should call onClick when item is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const items: NavigationMenuItem[] = [
      { key: 'action', label: 'Action', onClick: handleClick },
    ]

    render(<NavigationMenu items={items} />)

    await user.click(screen.getByText('Action'))

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render disabled items', () => {
    const items: NavigationMenuItem[] = [
      { key: 'disabled', label: 'Disabled', disabled: true },
    ]

    render(<NavigationMenu items={items} />)

    const item = screen.getByText('Disabled')
    expect(item.closest('button')).toBeDisabled()
  })

  it('should open child menu on hover', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu items={defaultItems} />)

    const trigger = screen.getByText('Products')
    await user.hover(trigger)

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument()
    })
  })

  it('should render child menu items with descriptions', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu items={defaultItems} />)

    await user.hover(screen.getByText('Products'))

    await waitFor(() => {
      expect(screen.getByText('View all products')).toBeInTheDocument()
    })
  })

  it('should close child menu on mouse leave', async () => {
    const user = userEvent.setup()
    const { container } = render(<NavigationMenu items={defaultItems} />)

    const trigger = screen.getByText('Products')
    await user.hover(trigger)

    await waitFor(() => screen.getByText('All Products'))

    await user.unhover(trigger)

    // Content goes to hidden state
    await waitFor(() => {
      const content = container.querySelector('[data-slot="content"]')
      expect(content).toHaveAttribute('data-state', 'closed')
    }, { timeout: 300 })
  })

  it('should render items with icons', async () => {
    const user = userEvent.setup()
    const items: NavigationMenuItem[] = [
      {
        key: 'products',
        label: 'Products',
        children: [
          { key: 'item', label: 'Item', icon: <span data-testid="icon">🚀</span> },
        ],
      },
    ]

    render(<NavigationMenu items={items} />)

    await user.hover(screen.getByText('Products'))

    await waitFor(() => {
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })

  it('should have proper ARIA attributes', () => {
    render(<NavigationMenu items={defaultItems} />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')

    const menubar = screen.getByRole('menubar')
    expect(menubar).toBeInTheDocument()
  })

  it('should render with ref', () => {
    const ref = { current: null }
    render(<NavigationMenu items={defaultItems} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('should open child menu on click', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu items={defaultItems} />)

    await user.click(screen.getByText('Products'))

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument()
    })
  })

  it('should close menu on Escape key', async () => {
    const user = userEvent.setup()
    const { container } = render(<NavigationMenu items={defaultItems} />)

    await user.click(screen.getByText('Products'))
    await waitFor(() => screen.getByText('All Products'))

    await user.keyboard('{Escape}')

    // Verify closed state
    const content = container.querySelector('[data-slot="content"]')
    await waitFor(() => {
      expect(content).toHaveAttribute('data-state', 'closed')
    })
  })

  it('should close menu on outside click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <div>
        <NavigationMenu items={defaultItems} />
        <div>Outside</div>
      </div>
    )

    await user.click(screen.getByText('Products'))
    await waitFor(() => screen.getByText('All Products'))

    await user.click(screen.getByText('Outside'))

    // Verify closed state
    const content = container.querySelector('[data-slot="content"]')
    await waitFor(() => {
      expect(content).toHaveAttribute('data-state', 'closed')
    })
  })

  it('should call child item onClick', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const items: NavigationMenuItem[] = [
      {
        key: 'products',
        label: 'Products',
        children: [
          { key: 'item', label: 'Item', onClick: handleClick },
        ],
      },
    ]

    render(<NavigationMenu items={items} />)

    await user.click(screen.getByText('Products'))
    await waitFor(() => screen.getByText('Item'))
    await user.click(screen.getByText('Item'))

    expect(handleClick).toHaveBeenCalled()
  })
})
