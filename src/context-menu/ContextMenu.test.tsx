import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContextMenu } from './index'
import type { ContextMenuItem } from './types'

describe('ContextMenu', () => {
  const defaultItems: ContextMenuItem[] = [
    { key: '1', label: 'Copy', shortcut: 'Ctrl+C' },
    { key: '2', label: 'Paste', shortcut: 'Ctrl+V' },
    { key: 'sep1', separator: true },
    { key: '3', label: 'Delete' },
  ]

  it('should render trigger element', () => {
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )
    expect(screen.getByText('Right click me')).toBeInTheDocument()
  })

  it('should render with data-slot attribute on root', () => {
    const { container } = render(
      <ContextMenu items={defaultItems}>
        <div>Trigger</div>
      </ContextMenu>
    )
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('should apply custom className to root', () => {
    const { container } = render(
      <ContextMenu items={defaultItems} className="custom-menu">
        <div>Trigger</div>
      </ContextMenu>
    )
    const root = container.querySelector('[data-slot="root"]')
    expect(root).toHaveClass('custom-menu')
  })

  it('should apply classNames API to component parts', () => {
    const { container } = render(
      <ContextMenu
        items={defaultItems}
        classNames={{
          root: 'custom-root',
          content: 'custom-content',
          item: 'custom-item',
        }}
      >
        <div>Trigger</div>
      </ContextMenu>
    )
    expect(container.querySelector('[data-slot="root"]')).toHaveClass('custom-root')
  })

  it('should open menu on right-click', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    const trigger = screen.getByText('Right click me')
    await user.pointer({ keys: '[MouseRight>]', target: trigger })

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })
  })

  it('should render menu items when open', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      expect(screen.getByText('Copy')).toBeInTheDocument()
      expect(screen.getByText('Paste')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  it('should render shortcuts', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      expect(screen.getByText('Ctrl+C')).toBeInTheDocument()
      expect(screen.getByText('Ctrl+V')).toBeInTheDocument()
    })
  })

  it('should render separators', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator).toBeInTheDocument()
  })

  it('should call onClick when item is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const items: ContextMenuItem[] = [
      { key: '1', label: 'Action', onClick: handleClick },
    ]

    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })
    await waitFor(() => screen.getByText('Action'))
    await user.click(screen.getByText('Action'))

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render disabled items', async () => {
    const user = userEvent.setup()
    const items: ContextMenuItem[] = [
      { key: '1', label: 'Enabled' },
      { key: '2', label: 'Disabled', disabled: true },
    ]

    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      const disabledItem = screen.getByText('Disabled').closest('[role="menuitem"]')
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('should not trigger onClick for disabled items', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const items: ContextMenuItem[] = [
      { key: '1', label: 'Disabled', disabled: true, onClick: handleClick },
    ]

    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })
    await waitFor(() => screen.getByText('Disabled'))
    await user.click(screen.getByText('Disabled'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should render items with icons', async () => {
    const user = userEvent.setup()
    const items: ContextMenuItem[] = [
      { key: '1', label: 'With Icon', icon: <span data-testid="icon">📋</span> },
    ]

    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })
    await waitFor(() => {
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })

  it('should support different colors', () => {
    const colors = ['default', 'primary', 'error', 'success'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <ContextMenu items={defaultItems} color={color}>
          <div>Trigger {color}</div>
        </ContextMenu>
      )
      expect(screen.getByText(`Trigger ${color}`)).toBeInTheDocument()
      unmount()
    })
  })

  it('should handle controlled open state', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    const { rerender } = render(
      <ContextMenu items={defaultItems} open={false} onOpenChange={handleOpenChange}>
        <div>Trigger</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Trigger') })

    expect(handleOpenChange).toHaveBeenCalledWith(true)

    rerender(
      <ContextMenu items={defaultItems} open={true} onOpenChange={handleOpenChange}>
        <div>Trigger</div>
      </ContextMenu>
    )

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })
  })

  it('should not open when disabled', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems} disabled>
        <div>Trigger</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Trigger') })

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('should render nested submenus', async () => {
    const user = userEvent.setup()
    const items: ContextMenuItem[] = [
      {
        key: '1',
        label: 'More Options',
        children: [
          { key: '1-1', label: 'Nested Item 1' },
          { key: '1-2', label: 'Nested Item 2' },
        ],
      },
    ]

    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      expect(screen.getByText('More Options')).toBeInTheDocument()
    })
  })

  it('should have proper ARIA attributes', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      const menu = screen.getByRole('menu')
      expect(menu).toHaveAttribute('role', 'menu')
      expect(menu).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  it('should render item labels with data-slot', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    const labels = document.querySelectorAll('[data-slot="item-label"]')
    expect(labels.length).toBeGreaterThan(0)
  })

  it('should close menu on item click', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    // Click an item - it should close the menu
    await user.click(screen.getByText('Copy'))

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('should close menu on Escape key', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={defaultItems}>
        <div>Right click me</div>
      </ContextMenu>
    )

    await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Right click me') })
    await waitFor(() => screen.getByRole('menu'))

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })
})
