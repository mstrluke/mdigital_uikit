import { describe, expect, it, beforeAll, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

describe('ThemeProvider', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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
  })
  it('renders children', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders with defaultTheme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <div>Light Theme</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Light Theme')).toBeInTheDocument()
  })

  it('renders with dark default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Dark Theme</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Dark Theme')).toBeInTheDocument()
  })

  it('renders with system default theme', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <div>System Theme</div>
      </ThemeProvider>
    )
    expect(screen.getByText('System Theme')).toBeInTheDocument()
  })

  it('applies theme to html element', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>
    )
    // ThemeProvider applies data-theme attribute to document.documentElement
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders multiple nested children', () => {
    render(
      <ThemeProvider>
        <div>
          <span>Child 1</span>
          <span>Child 2</span>
        </div>
      </ThemeProvider>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('works without explicit defaultTheme prop', () => {
    render(
      <ThemeProvider>
        <div>Default Theme</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Default Theme')).toBeInTheDocument()
  })

  it('provides theme context to children', () => {
    const TestComponent = () => {
      const { theme } = useTheme()
      return <div>Current theme: {theme}</div>
    }

    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText(/Current theme:/)).toBeInTheDocument()
  })

  it('provides setTheme function via context', () => {
    const TestComponent = () => {
      const { setTheme } = useTheme()
      return <button onClick={() => setTheme('dark')}>Set Dark</button>
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText('Set Dark')).toBeInTheDocument()
  })

  it('provides resolvedTheme via context', () => {
    const TestComponent = () => {
      const { resolvedTheme } = useTheme()
      return <div>Resolved: {resolvedTheme}</div>
    }

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText(/Resolved:/)).toBeInTheDocument()
  })

  it('supports custom storageKey', () => {
    render(
      <ThemeProvider storageKey="custom-theme">
        <div>Content</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports disableTransitionOnChange', () => {
    render(
      <ThemeProvider disableTransitionOnChange>
        <div>Content</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('throws error when useTheme is used outside provider', () => {
    const TestComponent = () => {
      useTheme()
      return <div>Test</div>
    }

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
  })
})
