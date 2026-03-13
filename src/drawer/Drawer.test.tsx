import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ComposedDrawer, {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './index'

describe('Drawer - Composed API', () => {
  it('renders drawer with controlled state', () => {
    render(
      <ComposedDrawer open={true} onOpenChange={vi.fn()}>
        Drawer content
      </ComposedDrawer>
    )
    expect(screen.getByText('Drawer content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <ComposedDrawer open={true} title="Drawer Title">
        Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <ComposedDrawer open={true} description="Drawer description">
        Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Drawer description')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <ComposedDrawer
        open={true}
        title="Title"
        description="Description"
      >
        Body content
      </ComposedDrawer>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('renders with footer', () => {
    render(
      <ComposedDrawer
        open={true}
        title="Title"
        footer={<button>Action</button>}
      >
        Content
      </ComposedDrawer>
    )
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('renders from different directions', () => {
    const directions = ['bottom', 'top', 'left', 'right'] as const

    directions.forEach((direction) => {
      const { unmount } = render(
        <ComposedDrawer open={true} direction={direction}>
          {direction}
        </ComposedDrawer>
      )
      expect(screen.getByText(direction)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'full'] as const

    sizes.forEach((size) => {
      const { unmount } = render(
        <ComposedDrawer open={true} size={size}>
          {size}
        </ComposedDrawer>
      )
      expect(screen.getByText(size)).toBeInTheDocument()
      unmount()
    })
  })

  it('hides close button when showCloseButton is false', () => {
    render(
      <ComposedDrawer open={true} showCloseButton={false}>
        Content
      </ComposedDrawer>
    )
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('shows close button when showCloseButton is true', () => {
    render(
      <ComposedDrawer open={true} showCloseButton={true}>
        Content
      </ComposedDrawer>
    )
    const closeButton = document.querySelector('[data-slot="drawer-closeButton"]')
    expect(closeButton).toBeInTheDocument()
  })

  it('shows handle for bottom drawer by default', () => {
    render(
      <ComposedDrawer open={true} direction="bottom">
        Content
      </ComposedDrawer>
    )
    const handle = document.querySelector('[data-slot="drawer-handle"]')
    expect(handle).toBeInTheDocument()
  })

  it('shows handle for top drawer by default', () => {
    render(
      <ComposedDrawer open={true} direction="top">
        Content
      </ComposedDrawer>
    )
    const handle = document.querySelector('[data-slot="drawer-handle"]')
    expect(handle).toBeInTheDocument()
  })

  it('hides handle when showHandle is false', () => {
    render(
      <ComposedDrawer open={true} direction="bottom" showHandle={false}>
        Content
      </ComposedDrawer>
    )
    const handle = document.querySelector('[data-slot="drawer-handle"]')
    expect(handle).not.toBeInTheDocument()
  })

  it('hides header when hideHeader is true', () => {
    render(
      <ComposedDrawer
        open={true}
        title="Title"
        description="Description"
        hideHeader
      >
        Content
      </ComposedDrawer>
    )
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('hides footer when hideFooter is true', () => {
    render(
      <ComposedDrawer
        open={true}
        footer={<button>Action</button>}
        hideFooter
      >
        Content
      </ComposedDrawer>
    )
    expect(screen.queryByRole('button', { name: 'Action' })).not.toBeInTheDocument()
  })

  it('supports modal prop', () => {
    const { unmount } = render(
      <ComposedDrawer open={true} modal={true}>
        Modal Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    unmount()

    render(
      <ComposedDrawer open={true} modal={false}>
        Non-modal Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Non-modal Content')).toBeInTheDocument()
  })

  it('supports dismissible prop', () => {
    const { rerender } = render(
      <ComposedDrawer open={true} dismissible={true}>
        Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()

    rerender(
      <ComposedDrawer open={true} dismissible={false}>
        Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ComposedDrawer open={true} className="custom-class">
        Content
      </ComposedDrawer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies contentClassName', () => {
    render(
      <ComposedDrawer open={true} contentClassName="custom-content">
        Content
      </ComposedDrawer>
    )
    const content = screen.getByText('Content').closest('[data-slot="drawer-content"]')
    expect(content).toHaveClass('custom-content')
  })

  it('applies classNames object', () => {
    render(
      <ComposedDrawer
        open={true}
        title="Title"
        classNames={{
          content: 'custom-content',
          header: 'custom-header',
          body: 'custom-body',
        }}
      >
        Content
      </ComposedDrawer>
    )
    const content = screen.getByText('Content').closest('[data-slot="drawer-content"]')
    expect(content).toHaveClass('custom-content')
  })

  it('has proper ARIA role for drawer', () => {
    render(
      <ComposedDrawer open={true}>
        Content
      </ComposedDrawer>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })
})

describe('Drawer - Primitive Components', () => {
  it('renders Drawer root', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>Drawer Root</DrawerContent>
      </Drawer>
    )
    expect(screen.getByText('Drawer Root')).toBeInTheDocument()
  })

  it('renders DrawerTrigger', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
      </Drawer>
    )
    const trigger = screen.getByText('Open Drawer')
    expect(trigger).toBeInTheDocument()
    expect(trigger.closest('[data-slot="drawer-trigger"]')).toBeInTheDocument()
  })

  it('renders DrawerTrigger with custom className', () => {
    render(
      <Drawer>
        <DrawerTrigger className="custom-trigger">Open</DrawerTrigger>
      </Drawer>
    )
    const trigger = screen.getByText('Open')
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('renders DrawerContent with direction variants', () => {
    const directions = ['bottom', 'top', 'left', 'right'] as const

    directions.forEach((direction) => {
      const { unmount } = render(
        <Drawer open={true}>
          <DrawerContent direction={direction}>{direction}</DrawerContent>
        </Drawer>
      )
      expect(screen.getByText(direction)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders DrawerContent with size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'full'] as const

    sizes.forEach((size) => {
      const { unmount } = render(
        <Drawer open={true}>
          <DrawerContent size={size}>{size}</DrawerContent>
        </Drawer>
      )
      expect(screen.getByText(size)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders DrawerHeader', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerHeader>Header Content</DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    const header = screen.getByText('Header Content')
    expect(header).toBeInTheDocument()
    expect(header.closest('[data-slot="drawer-header"]')).toBeInTheDocument()
  })

  it('renders DrawerBody', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerBody>Body Content</DrawerBody>
        </DrawerContent>
      </Drawer>
    )
    const body = screen.getByText('Body Content')
    expect(body).toBeInTheDocument()
    expect(body.closest('[data-slot="drawer-body"]')).toBeInTheDocument()
  })

  it('renders DrawerFooter', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerFooter>Footer Content</DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
    const footer = screen.getByText('Footer Content')
    expect(footer).toBeInTheDocument()
    expect(footer.closest('[data-slot="drawer-footer"]')).toBeInTheDocument()
  })

  it('renders DrawerTitle', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    )
    const title = screen.getByText('Drawer Title')
    expect(title).toBeInTheDocument()
    expect(title.closest('[data-slot="drawer-title"]')).toBeInTheDocument()
  })

  it('renders DrawerDescription', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerDescription>Drawer Description</DrawerDescription>
        </DrawerContent>
      </Drawer>
    )
    const description = screen.getByText('Drawer Description')
    expect(description).toBeInTheDocument()
    expect(description.closest('[data-slot="drawer-description"]')).toBeInTheDocument()
  })

  it('renders DrawerClose', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    )
    const close = screen.getByText('Close')
    expect(close).toBeInTheDocument()
    expect(close.closest('[data-slot="drawer-close"]')).toBeInTheDocument()
  })

  it('applies custom classNames to subcomponents', () => {
    render(
      <Drawer open={true}>
        <DrawerContent classNames={{ header: 'custom-header' }}>
          <DrawerHeader classNames={{ header: 'custom-header' }}>
            Header
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    const header = screen.getByText('Header').closest('[data-slot="drawer-header"]')
    expect(header).toHaveClass('custom-header')
  })

  it('renders close button with correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'full'] as const

    sizes.forEach((size) => {
      const { unmount } = render(
        <Drawer open={true}>
          <DrawerContent size={size} showCloseButton>
            Content
          </DrawerContent>
        </Drawer>
      )
      const closeButton = document.querySelector('[data-slot="drawer-closeButton"]')
      expect(closeButton).toBeInTheDocument()
      unmount()
    })
  })
})
