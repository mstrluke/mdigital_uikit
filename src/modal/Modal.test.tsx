import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ComposedModal, {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from './index'

describe('Modal - Composed API', () => {
  it('renders modal with controlled state', () => {
    render(
      <ComposedModal open={true} onOpenChange={vi.fn()}>
        Modal content
      </ComposedModal>
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <ComposedModal open={true} title="Test Title">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <ComposedModal open={true} description="Test description">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <ComposedModal
        open={true}
        title="Modal Title"
        description="Modal Description"
      >
        Body content
      </ComposedModal>
    )
    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal Description')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('renders with footer', () => {
    render(
      <ComposedModal
        open={true}
        title="Title"
        footer={<button>Action</button>}
      >
        Content
      </ComposedModal>
    )
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const { rerender } = render(
      <ComposedModal open={true} size="xs">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()

    rerender(
      <ComposedModal open={true} size="sm">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()

    rerender(
      <ComposedModal open={true} size="md">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()

    rerender(
      <ComposedModal open={true} size="lg">
        Content
      </ComposedModal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders different colors', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <ComposedModal open={true} color={color}>
          {color}
        </ComposedModal>
      )
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('applies centered prop', () => {
    render(
      <ComposedModal open={true} centered>
        Centered
      </ComposedModal>
    )
    expect(screen.getByText('Centered')).toBeInTheDocument()
  })

  it('hides close button when showCloseButton is false', () => {
    render(
      <ComposedModal open={true} showCloseButton={false}>
        Content
      </ComposedModal>
    )
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('shows close button by default', () => {
    render(
      <ComposedModal open={true}>
        Content
      </ComposedModal>
    )
    const closeButtons = document.querySelectorAll('[data-slot="modal-close"]')
    expect(closeButtons.length).toBeGreaterThan(0)
  })

  it('hides header when hideHeader is true', () => {
    render(
      <ComposedModal
        open={true}
        title="Title"
        description="Description"
        hideHeader
      >
        Content
      </ComposedModal>
    )
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('hides footer when hideFooter is true', () => {
    render(
      <ComposedModal
        open={true}
        footer={<button>Action</button>}
        hideFooter
      >
        Content
      </ComposedModal>
    )
    expect(screen.queryByRole('button', { name: 'Action' })).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ComposedModal open={true} className="custom-header">
        Content
      </ComposedModal>
    )
    const modal = screen.getByText('Content').closest('[data-slot="modal-content"]')
    expect(modal).toBeInTheDocument()
  })

  it('applies contentClassName', () => {
    render(
      <ComposedModal open={true} contentClassName="custom-content">
        Content
      </ComposedModal>
    )
    const content = screen.getByText('Content').closest('[data-slot="modal-content"]')
    expect(content).toHaveClass('custom-content')
  })

  it('applies classNames object', () => {
    render(
      <ComposedModal
        open={true}
        title="Title"
        classNames={{
          content: 'custom-content',
          header: 'custom-header',
          title: 'custom-title',
          body: 'custom-body',
        }}
      >
        Content
      </ComposedModal>
    )
    const content = screen.getByText('Content').closest('[data-slot="modal-content"]')
    expect(content).toHaveClass('custom-content')
  })

  it('has proper ARIA role for modal content', () => {
    render(
      <ComposedModal open={true}>
        Content
      </ComposedModal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })
})

describe('Modal - Primitive Components', () => {
  it('renders Modal root', () => {
    render(
      <Modal open={true}>
        <div>Modal Root</div>
      </Modal>
    )
    expect(screen.getByText('Modal Root')).toBeInTheDocument()
  })

  it('renders ModalTrigger with custom className', () => {
    render(
      <Modal>
        <ModalTrigger className="custom-trigger">
          Open Modal
        </ModalTrigger>
      </Modal>
    )
    const trigger = screen.getByText('Open Modal')
    expect(trigger).toHaveClass('modal_trigger')
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('renders ModalContent with size variants', () => {
    const { rerender } = render(
      <Modal open={true}>
        <ModalContent size="xs">XS</ModalContent>
      </Modal>
    )
    expect(screen.getByText('XS')).toBeInTheDocument()

    rerender(
      <Modal open={true}>
        <ModalContent size="sm">SM</ModalContent>
      </Modal>
    )
    expect(screen.getByText('SM')).toBeInTheDocument()

    rerender(
      <Modal open={true}>
        <ModalContent size="md">MD</ModalContent>
      </Modal>
    )
    expect(screen.getByText('MD')).toBeInTheDocument()

    rerender(
      <Modal open={true}>
        <ModalContent size="lg">LG</ModalContent>
      </Modal>
    )
    expect(screen.getByText('LG')).toBeInTheDocument()
  })

  it('renders ModalContent with color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    colors.forEach((color) => {
      const { unmount } = render(
        <Modal open={true}>
          <ModalContent color={color}>{color}</ModalContent>
        </Modal>
      )
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders ModalContent with centered prop', () => {
    render(
      <Modal open={true}>
        <ModalContent centered>Centered</ModalContent>
      </Modal>
    )
    expect(screen.getByText('Centered')).toBeInTheDocument()
  })

  it('renders ModalHeader', () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalHeader>Header Content</ModalHeader>
        </ModalContent>
      </Modal>
    )
    const header = screen.getByText('Header Content')
    expect(header).toBeInTheDocument()
    expect(header.closest('[data-slot="modal-header"]')).toBeInTheDocument()
  })

  it('renders ModalTitle', () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalTitle>Modal Title</ModalTitle>
        </ModalContent>
      </Modal>
    )
    const title = screen.getByText('Modal Title')
    expect(title).toBeInTheDocument()
    expect(title.closest('[data-slot="modal-title"]')).toBeInTheDocument()
  })

  it('renders ModalDescription', () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalDescription>Modal Description</ModalDescription>
        </ModalContent>
      </Modal>
    )
    const description = screen.getByText('Modal Description')
    expect(description).toBeInTheDocument()
    expect(description.closest('[data-slot="modal-description"]')).toBeInTheDocument()
  })

  it('renders ModalFooter', () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalFooter>Footer Content</ModalFooter>
        </ModalContent>
      </Modal>
    )
    const footer = screen.getByText('Footer Content')
    expect(footer).toBeInTheDocument()
    expect(footer.closest('[data-slot="modal-footer"]')).toBeInTheDocument()
  })

  it('renders ModalClose', () => {
    render(
      <Modal open={true}>
        <ModalContent showCloseButton={false}>
          <ModalClose>Close Button</ModalClose>
        </ModalContent>
      </Modal>
    )
    const close = screen.getByText('Close Button')
    expect(close).toBeInTheDocument()
    expect(close.closest('[data-slot="modal-close"]')).toBeInTheDocument()
  })

  it('applies custom classNames to subcomponents', () => {
    render(
      <Modal open={true}>
        <ModalContent classNames={{ header: 'custom-header' }}>
          <ModalHeader classNames={{ header: 'custom-header' }}>
            Header
          </ModalHeader>
        </ModalContent>
      </Modal>
    )
    const header = screen.getByText('Header').closest('[data-slot="modal-header"]')
    expect(header).toHaveClass('custom-header')
  })
})
