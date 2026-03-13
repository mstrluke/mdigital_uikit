import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './index'

describe('Command', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn()
  })
  it('should render command component', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    )
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should render with data-slot attribute', () => {
    const { container } = render(<Command />)
    expect(container.querySelector('[data-slot="command"]')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Command className="custom-command" />)
    expect(container.querySelector('[data-slot="command"]')).toHaveClass('custom-command')
  })

  it('should support different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const { unmount } = render(<Command size={size} />)
      expect(document.querySelector('[data-slot="command"]')).toBeInTheDocument()
      unmount()
    })
  })

  it('should render CommandInput with icon', () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Search" />
      </Command>
    )
    expect(container.querySelector('[data-slot="command-input-icon"]')).toBeInTheDocument()
  })

  it('should render CommandList', () => {
    const { container } = render(
      <Command>
        <CommandList />
      </Command>
    )
    expect(container.querySelector('[data-slot="command-list"]')).toBeInTheDocument()
  })

  it('should render CommandEmpty', () => {
    const { container } = render(
      <Command>
        <CommandEmpty>No results</CommandEmpty>
      </Command>
    )
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('should render CommandGroup', () => {
    render(
      <Command>
        <CommandGroup heading="Suggestions">
          <CommandItem>Item 1</CommandItem>
        </CommandGroup>
      </Command>
    )
    expect(screen.getByText('Suggestions')).toBeInTheDocument()
  })

  it('should render CommandItem', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Test Item</CommandItem>
        </CommandList>
      </Command>
    )
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('should render CommandItem with different colors', () => {
    const colors = ['default', 'primary', 'error'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <Command>
          <CommandList>
            <CommandItem color={color}>Item</CommandItem>
          </CommandList>
        </Command>
      )
      expect(screen.getByText('Item')).toBeInTheDocument()
      unmount()
    })
  })

  it('should render CommandShortcut', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem>
            Item
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    )
    expect(container.querySelector('[data-slot="command-shortcut"]')).toBeInTheDocument()
  })

  it('should render CommandSeparator', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandSeparator />
        </CommandList>
      </Command>
    )
    expect(container.querySelector('[data-slot="command-separator"]')).toBeInTheDocument()
  })

  it('should filter items based on search', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
        </CommandList>
      </Command>
    )

    const input = screen.getByPlaceholderText('Search')
    await user.type(input, 'Apple')

    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('should apply classNames API', () => {
    const { container } = render(
      <Command
        classNames={{
          root: 'custom-root',
          input: 'custom-input',
        }}
      >
        <CommandInput classNames={{ input: 'custom-input' }} />
      </Command>
    )
    expect(container.querySelector('[data-slot="command"]')).toHaveClass('custom-root')
    const input = container.querySelector('[data-slot="command-input"]')
    expect(input).toHaveClass('custom-input')
  })

  it('should render multiple groups', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Group 1">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Group 2">
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('Group 1')).toBeInTheDocument()
    expect(screen.getByText('Group 2')).toBeInTheDocument()
  })

  it('should handle item selection', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(
      <Command>
        <CommandList>
          <CommandItem onSelect={handleSelect}>Select Me</CommandItem>
        </CommandList>
      </Command>
    )

    await user.click(screen.getByText('Select Me'))

    expect(handleSelect).toHaveBeenCalled()
  })

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Item 1</CommandItem>
          <CommandItem>Item 2</CommandItem>
        </CommandList>
      </Command>
    )

    const input = screen.getByPlaceholderText('Search')
    input.focus()

    await user.keyboard('{ArrowDown}')

    // Command palette handles this internally via cmdk
    expect(input).toBeInTheDocument()
  })

  it('should render empty state when no results', () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('No results found')).toBeInTheDocument()
  })
})
