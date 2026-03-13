import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Notification from './index'

describe('Notification', () => {
  it('renders with title only', () => {
    render(<Notification title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with description only', () => {
    render(<Notification description="Test Description" />)
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(<Notification title="Title" description="Description" />)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders with children content', () => {
    render(
      <Notification title="Title">
        <div data-testid="custom-content">Custom Content</div>
      </Notification>
    )
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('has proper ARIA alert attributes', () => {
    const { container } = render(<Notification title="Alert" />)
    const alert = container.querySelector('[role="alert"]')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveAttribute('aria-live', 'polite')
    expect(alert).toHaveAttribute('aria-atomic', 'true')
  })

  it('renders close button when onClose is provided', () => {
    render(<Notification title="Test" onClose={vi.fn()} />)
    expect(screen.getByLabelText('Close notification')).toBeInTheDocument()
  })

  it('hides close button by default when no onClose', () => {
    render(<Notification title="Test" />)
    expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument()
  })

  it('shows close button when closable is explicitly true', () => {
    render(<Notification title="Test" closable />)
    expect(screen.getByLabelText('Close notification')).toBeInTheDocument()
  })

  it('hides close button when closable is false', () => {
    render(<Notification title="Test" closable={false} />)
    expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Notification title="Test" onClose={onClose} />)

    const closeButton = screen.getByLabelText('Close notification')
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Notification title="Test" color={color} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<Notification title="Test" size={size} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'outline', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Notification title="Test" variant={variant} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders action button when provided', () => {
    const action = {
      label: 'Undo',
      onClick: vi.fn(),
    }
    render(<Notification title="Test" action={action} />)
    expect(screen.getByText('Undo')).toBeInTheDocument()
  })

  it('calls action onClick when action button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const action = {
      label: 'Undo',
      onClick,
    }
    render(<Notification title="Test" action={action} />)

    const actionButton = screen.getByText('Undo')
    await user.click(actionButton)

    expect(onClick).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Notification title="Test" className="custom-class" />)
    const root = container.querySelector('.notification_root')
    expect(root).toHaveClass('custom-class')
  })

  it('applies custom classNames for different parts', () => {
    const { container } = render(
      <Notification
        title="Title"
        description="Description"
        classNames={{
          root: 'root-class',
          content: 'content-class',
          title: 'title-class',
          description: 'description-class',
          closeButton: 'close-class',
          icon: 'icon-class',
        }}
      />
    )
    expect(container.querySelector('.root-class')).toBeInTheDocument()
    expect(container.querySelector('.content-class')).toBeInTheDocument()
    expect(container.querySelector('.title-class')).toBeInTheDocument()
    expect(container.querySelector('.description-class')).toBeInTheDocument()
  })

  it('renders with success color for success notifications', () => {
    const { container } = render(<Notification title="Success" color="success" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders with error color for error notifications', () => {
    const { container } = render(<Notification title="Error" color="error" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders with warning color for warning notifications', () => {
    const { container } = render(<Notification title="Warning" color="warning" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders with info color for info notifications', () => {
    const { container } = render(<Notification title="Info" color="info" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders outline variant with border', () => {
    const { container } = render(<Notification title="Test" variant="outline" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders soft variant with subtle background', () => {
    const { container } = render(<Notification title="Test" variant="soft" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders solid variant with strong colors', () => {
    const { container } = render(<Notification title="Test" variant="solid" />)
    const root = container.querySelector('.notification_root')
    expect(root).toBeInTheDocument()
  })

  it('renders action button as underlined link', () => {
    const action = {
      label: 'Learn More',
      onClick: vi.fn(),
    }
    render(<Notification title="Test" action={action} />)
    const actionButton = screen.getByText('Learn More')
    expect(actionButton).toHaveClass('underline')
  })
})
