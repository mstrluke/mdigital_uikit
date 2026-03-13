import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Avatar, AvatarGroup } from './index'

describe('Avatar', () => {
  it('renders with image src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />)
    const img = screen.getByAltText('User Avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Avatar size="xs" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()

    rerender(<Avatar size="sm" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()

    rerender(<Avatar size="md" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()

    rerender(<Avatar size="lg" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()
  })

  it('renders all shape variants', () => {
    const { rerender } = render(<Avatar shape="circle" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()

    rerender(<Avatar shape="square" name="Test" />)
    expect(screen.getByLabelText(/avatar for test/i)).toBeInTheDocument()
  })

  it('generates initials from name', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('generates initials from single word name', () => {
    render(<Avatar name="John" />)
    expect(screen.getByText('JO')).toBeInTheDocument()
  })

  it('uses fallback text when provided', () => {
    render(<Avatar name="John Doe" fallback="Custom" />)
    expect(screen.getByText('CU')).toBeInTheDocument()
  })

  it('renders custom icon', () => {
    render(<Avatar icon={<span data-testid="custom-icon">🎨</span>} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders status indicator', () => {
    const { rerender } = render(<Avatar name="Test" status="online" />)
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument()

    rerender(<Avatar name="Test" status="offline" />)
    expect(screen.getByLabelText('Status: offline')).toBeInTheDocument()

    rerender(<Avatar name="Test" status="away" />)
    expect(screen.getByLabelText('Status: away')).toBeInTheDocument()

    rerender(<Avatar name="Test" status="busy" />)
    expect(screen.getByLabelText('Status: busy')).toBeInTheDocument()
  })

  it('renders badge with number', () => {
    render(<Avatar name="Test" badge={5} />)
    expect(screen.getByRole('status', { name: '5 notifications' })).toBeInTheDocument()
  })

  it('renders badge with custom content', () => {
    render(<Avatar name="Test" badge="NEW" />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('applies all color variants for fallback', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Avatar name="Test" color={color} />)
      expect(screen.getByText('TE')).toBeInTheDocument()
      unmount()
    })
  })

  it('shows bordered variant', () => {
    const { container } = render(<Avatar name="Test" bordered />)
    const avatar = container.querySelector('.avatar_root')
    expect(avatar).toBeInTheDocument()
  })

  it('shows disabled state', () => {
    render(<Avatar name="Test" disabled />)
    const avatar = screen.getByLabelText(/avatar for test/i).parentElement
    expect(avatar).toHaveAttribute('aria-disabled', 'true')
  })

  it('handles image load error and shows fallback', async () => {
    const onError = vi.fn()
    render(<Avatar src="invalid-image.jpg" name="Test User" onError={onError} />)

    const img = screen.getByAltText('Test User') as HTMLImageElement

    // Simulate error event using fireEvent from testing-library
    fireEvent.error(img)

    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
      expect(screen.getByText('TU')).toBeInTheDocument()
    })
  })

  it('resets error state when src changes', async () => {
    const { rerender } = render(<Avatar src="invalid-image.jpg" name="Test" />)

    const img = screen.getByAltText('Test') as HTMLImageElement
    fireEvent.error(img)

    await waitFor(() => {
      expect(screen.getByText('TE')).toBeInTheDocument()
    })

    rerender(<Avatar src="new-valid-image.jpg" name="Test" />)

    // After src change, should attempt to load new image
    const newImg = screen.getByAltText('Test')
    expect(newImg).toHaveAttribute('src', 'new-valid-image.jpg')
  })

  it('applies custom className', () => {
    render(<Avatar name="Test" className="custom-class" />)
    const avatar = screen.getByLabelText(/avatar for test/i).parentElement
    expect(avatar).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    const { container } = render(
      <Avatar
        src="test.jpg"
        name="Test"
        status="online"
        classNames={{
          root: 'root-class',
          image: 'image-class',
          fallback: 'fallback-class',
          status: 'status-class',
        }}
      />
    )

    const avatar = container.querySelector('[data-slot="root"]')
    expect(avatar).toHaveClass('root-class')

    const img = container.querySelector('[data-slot="image"]')
    expect(img).toHaveClass('image-class')

    const status = container.querySelector('[data-slot="status"]')
    expect(status).toHaveClass('status-class')
  })

  it('forwards ref to avatar element', () => {
    const ref = { current: null }
    render(<Avatar name="Test" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('AvatarGroup', () => {
  it('renders multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>
    )

    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
    expect(screen.getByText('U3')).toBeInTheDocument()
  })

  it('limits visible avatars with max prop', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
      </AvatarGroup>
    )

    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
    expect(screen.queryByText('U3')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('shows total count instead of remaining with showTotal', () => {
    render(
      <AvatarGroup max={2} showTotal>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
      </AvatarGroup>
    )

    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.queryByText('+2')).not.toBeInTheDocument()
  })

  it('renders custom surplus content', () => {
    render(
      <AvatarGroup max={2} renderSurplus={(count) => <div>Custom {count}</div>}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>
    )

    expect(screen.getByText('Custom 1')).toBeInTheDocument()
  })

  it('applies size to all avatars', () => {
    render(
      <AvatarGroup size="lg">
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    )

    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
  })

  it('applies shape to all avatars', () => {
    render(
      <AvatarGroup shape="square">
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    )

    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
  })

  it('applies bordered to all avatars', () => {
    render(
      <AvatarGroup bordered>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    )

    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    )

    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label', 'Avatar group with 2 members')
  })

  it('applies custom className', () => {
    render(
      <AvatarGroup className="custom-class">
        <Avatar name="User 1" />
      </AvatarGroup>
    )

    const group = screen.getByRole('group')
    expect(group).toHaveClass('custom-class')
  })

  it('forwards ref to group element', () => {
    const ref = { current: null }
    render(
      <AvatarGroup ref={ref}>
        <Avatar name="User 1" />
      </AvatarGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
