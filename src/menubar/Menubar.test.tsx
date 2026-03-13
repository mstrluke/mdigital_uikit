import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Menubar from './index'
import type { MenubarMenu, MenubarItem } from './types'

describe('Menubar', () => {
  const defaultMenus: MenubarMenu[] = [
    {
      key: 'file',
      label: 'File',
      items: [
        { key: 'new', label: 'New', shortcut: 'Ctrl+N' },
        { key: 'open', label: 'Open', shortcut: 'Ctrl+O' },
        { key: 'sep1', separator: true },
        { key: 'exit', label: 'Exit' },
      ],
    },
    {
      key: 'edit',
      label: 'Edit',
      items: [
        { key: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
        { key: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
      ],
    },
  ]

  it('should render menubar', () => {
    render(<Menubar menus={defaultMenus} />)
    expect(screen.getByRole('menubar')).toBeInTheDocument()
  })

  it('should render menu triggers', () => {
    render(<Menubar menus={defaultMenus} />)
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('should apply custom className to root', () => {
    const { container } = render(<Menubar menus={defaultMenus} className="custom-menubar" />)
    expect(container.querySelector('[data-slot="root"]')).toHaveClass('custom-menubar')
  })

  it('should apply classNames API', () => {
    const { container } = render(
      <Menubar
        menus={defaultMenus}
        classNames={{
          root: 'custom-root',
          trigger: 'custom-trigger',
        }}
      />
    )
    expect(container.querySelector('[data-slot="root"]')).toHaveClass('custom-root')
  })

  it('should open menu on click', async () => {
    const user = userEvent.setup()
    render(<Menubar menus={defaultMenus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => {
      expect(screen.getByText('New')).toBeInTheDocument()
    })
  })

  it('should render menu items', async () => {
    const user = userEvent.setup()
    render(<Menubar menus={defaultMenus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => {
      expect(screen.getByText('New')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('Exit')).toBeInTheDocument()
    })
  })

  it('should render shortcuts', async () => {
    const user = userEvent.setup()
    render(<Menubar menus={defaultMenus} />)

    await user.click(screen.getByText('Edit'))

    await waitFor(() => {
      expect(screen.getByText('Ctrl+C')).toBeInTheDocument()
      expect(screen.getByText('Ctrl+V')).toBeInTheDocument()
    })
  })

  it('should call onClick when item is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [{ key: 'new', label: 'New', onClick: handleClick }],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('File'))
    await waitFor(() => screen.getByText('New'))
    await user.click(screen.getByText('New'))

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render disabled menu triggers', () => {
    const menus: MenubarMenu[] = [
      { key: 'file', label: 'File', items: [], disabled: true },
    ]

    render(<Menubar menus={menus} />)

    const trigger = screen.getByText('File')
    expect(trigger).toHaveAttribute('aria-disabled', 'true')
  })

  it('should render disabled items', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [{ key: 'disabled', label: 'Disabled', disabled: true }],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => {
      const disabledItem = screen.getByText('Disabled').closest('[role="menuitem"]')
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('should render checkbox items', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'view',
        label: 'View',
        items: [{ key: 'sidebar', label: 'Sidebar', type: 'checkbox', checked: true }],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('View'))

    await waitFor(() => {
      const item = screen.getByText('Sidebar').closest('[role="menuitemcheckbox"]')
      expect(item).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('should render radio items', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'theme',
        label: 'Theme',
        items: [{ key: 'dark', label: 'Dark', type: 'radio', checked: true }],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('Theme'))

    await waitFor(() => {
      const item = screen.getByText('Dark').closest('[role="menuitemradio"]')
      expect(item).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('should render label items', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'recent', label: 'Recent Files', type: 'label' },
          { key: 'file1', label: 'File 1' },
        ],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => {
      expect(screen.getByText('Recent Files')).toBeInTheDocument()
    })
  })

  it('should render separators', async () => {
    const user = userEvent.setup()
    render(<Menubar menus={defaultMenus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => screen.getByText('New'))

    const separator = document.querySelector('[data-slot="separator"]')
    expect(separator).toBeInTheDocument()
  })

  it('should have proper ARIA attributes', () => {
    render(<Menubar menus={defaultMenus} />)

    const menubar = screen.getByRole('menubar')
    expect(menubar).toBeInTheDocument()

    const triggers = screen.getAllByRole('menuitem')
    expect(triggers.length).toBe(2) // File and Edit
  })

  it('should render with ref', () => {
    const ref = { current: null }
    render(<Menubar menus={defaultMenus} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should render items with icons', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [{ key: 'new', label: 'New', icon: <span data-testid="icon">📄</span> }],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('File'))
    await waitFor(() => {
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })

  it('should support nested submenus', async () => {
    const user = userEvent.setup()
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          {
            key: 'export',
            label: 'Export',
            children: [
              { key: 'pdf', label: 'As PDF' },
              { key: 'html', label: 'As HTML' },
            ],
          },
        ],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('File'))

    await waitFor(() => {
      expect(screen.getByText('Export')).toBeInTheDocument()
    })
  })

  it('should toggle checkbox on click', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const menus: MenubarMenu[] = [
      {
        key: 'view',
        label: 'View',
        items: [
          {
            key: 'sidebar',
            label: 'Sidebar',
            type: 'checkbox',
            checked: false,
            onCheckedChange: handleChange,
          },
        ],
      },
    ]

    render(<Menubar menus={menus} />)

    await user.click(screen.getByText('View'))
    await waitFor(() => screen.getByText('Sidebar'))
    await user.click(screen.getByText('Sidebar'))

    expect(handleChange).toHaveBeenCalledWith(true)
  })
})
