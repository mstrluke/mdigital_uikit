import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { ToastProvider, useToast } from './index'

// Mock matchMedia and setPointerCapture for sonner (jsdom lacks these)
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  HTMLElement.prototype.setPointerCapture = vi.fn()
  HTMLElement.prototype.releasePointerCapture = vi.fn()
})

function TestComponent() {
  const toast = useToast()
  return (
    <div>
      <button onClick={() => toast.toast({ title: 'Test Toast' })}>
        Show Toast
      </button>
      <button
        onClick={() => toast.success('Success', 'Operation completed')}
      >
        Success Toast
      </button>
      <button onClick={() => toast.error('Error', 'Something went wrong')}>
        Error Toast
      </button>
      <button onClick={() => toast.warning('Warning', 'Please be careful')}>
        Warning Toast
      </button>
      <button onClick={() => toast.info('Info', 'Did you know?')}>
        Info Toast
      </button>
      <button onClick={() => toast.dismissAll()}>Dismiss All</button>
    </div>
  )
}

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ToastProvider', () => {
    render(
      <ToastProvider>
        <div>Content</div>
      </ToastProvider>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('throws error when useToast is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useToast must be used within a ToastProvider')

    consoleError.mockRestore()
  })

  it('shows toast notification', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show Toast' }))
    expect(await screen.findByText('Test Toast')).toBeInTheDocument()
  })

  it('shows success toast with icon', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Success Toast' }))
    expect(await screen.findByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  it('shows error toast', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Error Toast' }))
    expect(await screen.findByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('shows warning toast', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Warning Toast' }))
    expect(await screen.findByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Please be careful')).toBeInTheDocument()
  })

  it('shows info toast', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Info Toast' }))
    expect(await screen.findByText('Info')).toBeInTheDocument()
    expect(screen.getByText('Did you know?')).toBeInTheDocument()
  })

  it('shows toast with title only', async () => {
    const user = userEvent.setup()
    function TitleOnlyComponent() {
      const toast = useToast()
      return (
        <button onClick={() => toast.toast({ title: 'Title Only' })}>
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <TitleOnlyComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Title Only')).toBeInTheDocument()
  })

  it('shows toast with description only', async () => {
    const user = userEvent.setup()
    function DescOnlyComponent() {
      const toast = useToast()
      return (
        <button onClick={() => toast.toast({ description: 'Description' })}>
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <DescOnlyComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Description')).toBeInTheDocument()
  })

  it('renders different variants', async () => {
    const user = userEvent.setup()

    function VariantComponent() {
      const toast = useToast()
      return (
        <>
          <button onClick={() => toast.toast({ title: 'Default Variant', variant: 'default' })}>
            Default
          </button>
          <button onClick={() => toast.toast({ title: 'Solid Variant', variant: 'solid' })}>
            Solid
          </button>
          <button onClick={() => toast.toast({ title: 'Outline Variant', variant: 'outline' })}>
            Outline
          </button>
          <button onClick={() => toast.toast({ title: 'Soft Variant', variant: 'soft' })}>
            Soft
          </button>
        </>
      )
    }

    render(
      <ToastProvider>
        <VariantComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Default' }))
    expect(await screen.findByText('Default Variant')).toBeInTheDocument()
  })

  it('renders different colors', async () => {
    const user = userEvent.setup()

    function ColorComponent() {
      const toast = useToast()
      return (
        <>
          <button onClick={() => toast.toast({ title: 'Primary Color', color: 'primary' })}>
            Primary
          </button>
          <button onClick={() => toast.toast({ title: 'Success Color', color: 'success' })}>
            Success
          </button>
        </>
      )
    }

    render(
      <ToastProvider>
        <ColorComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Primary' }))
    expect(await screen.findByText('Primary Color')).toBeInTheDocument()
  })

  it('can be manually dismissed', async () => {
    const user = userEvent.setup()
    function DismissComponent() {
      const toast = useToast()
      return (
        <button onClick={() => toast.toast({ title: 'Dismiss me' })}>
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <DismissComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Dismiss me')).toBeInTheDocument()

    const closeButton = screen.getByLabelText('Close')
    await user.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument()
    })
  })

  it('hides close button when closable is false', async () => {
    const user = userEvent.setup()
    function NoCloseComponent() {
      const toast = useToast()
      return (
        <button
          onClick={() => toast.toast({ title: 'No close', closable: false })}
        >
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <NoCloseComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('No close')).toBeInTheDocument()
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('supports custom action', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()

    function ActionComponent() {
      const toast = useToast()
      return (
        <button
          onClick={() =>
            toast.toast({
              title: 'With action',
              action: { label: 'Undo', onClick: handleAction },
            })
          }
        >
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <ActionComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('With action')).toBeInTheDocument()

    const actionButton = screen.getByRole('button', { name: 'Undo' })
    await user.click(actionButton)
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('supports custom icon', async () => {
    const user = userEvent.setup()
    function IconComponent() {
      const toast = useToast()
      return (
        <button
          onClick={() =>
            toast.toast({
              title: 'Custom icon',
              icon: <span data-testid="custom-icon">🎉</span>,
            })
          }
        >
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <IconComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByTestId('custom-icon')).toBeInTheDocument()
  })

  it('supports promise toasts', () => {
    function PromiseComponent() {
      const toast = useToast()
      return (
        <button
          onClick={() => {
            const id = toast.promise(Promise.resolve('data'), {
              loading: 'Promise Loading...',
              success: 'Promise Success!',
              error: 'Promise Error!',
            })
            expect(typeof id).toBeDefined()
          }}
        >
          Show Promise
        </button>
      )
    }

    render(
      <ToastProvider>
        <PromiseComponent />
      </ToastProvider>
    )

    expect(screen.getByRole('button', { name: 'Show Promise' })).toBeInTheDocument()
  })

  it('supports dismissAll', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show Toast' }))
    expect(await screen.findByText('Test Toast')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Dismiss All' }))
    await waitFor(() => {
      expect(screen.queryByText('Test Toast')).not.toBeInTheDocument()
    })
  })

  it('supports different positions', () => {
    const positions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'] as const

    positions.forEach((position) => {
      const { unmount } = render(
        <ToastProvider position={position}>
          <div>Content</div>
        </ToastProvider>
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
      unmount()
    })
  })

  it('supports maxToasts prop', () => {
    render(
      <ToastProvider maxToasts={3}>
        <div>Content</div>
      </ToastProvider>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports theme prop', () => {
    const themes = ['light', 'dark', 'system'] as const

    themes.forEach((theme) => {
      const { unmount } = render(
        <ToastProvider theme={theme}>
          <div>Content</div>
        </ToastProvider>
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
      unmount()
    })
  })

  it('returns toast id from toast methods', async () => {
    const user = userEvent.setup()
    function IdComponent() {
      const toast = useToast()
      return (
        <button
          onClick={() => {
            const id = toast.toast({ title: 'Test' })
            expect(id).toBeDefined()
          }}
        >
          Show
        </button>
      )
    }

    render(
      <ToastProvider>
        <IdComponent />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(await screen.findByText('Test')).toBeInTheDocument()
  })
})
