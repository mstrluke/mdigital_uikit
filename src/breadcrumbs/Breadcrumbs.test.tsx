import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Breadcrumb, { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './index'

describe('Breadcrumb', () => {
  const basicItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
  ]

  it('renders with items prop', () => {
    render(<Breadcrumb items={basicItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders with manual children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('has proper ARIA navigation attributes', () => {
    render(<Breadcrumb items={basicItems} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
  })

  it('marks last item as current page', () => {
    render(<Breadcrumb items={basicItems} />)
    const currentPage = screen.getByText('Details')
    expect(currentPage).toHaveAttribute('aria-current', 'page')
  })

  it('renders links for non-last items', () => {
    render(<Breadcrumb items={basicItems} />)
    const homeLink = screen.getByText('Home')
    expect(homeLink.tagName).toBe('A')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('handles onClick for breadcrumb items', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const items = [
      { label: 'Home', onClick },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={items} />)

    const homeLink = screen.getByText('Home')
    await user.click(homeLink)

    expect(onClick).toHaveBeenCalled()
  })

  it('renders default chevron separator', () => {
    const { container } = render(<Breadcrumb items={basicItems} />)
    const separators = container.querySelectorAll('.breadcrumbs_separator')
    expect(separators.length).toBe(2) // One less than total items
  })

  it('renders custom separator', () => {
    render(<Breadcrumb items={basicItems} separator="/" />)
    expect(screen.getAllByText('/')).toHaveLength(2)
  })

  it('renders all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<Breadcrumb items={basicItems} size={size} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Breadcrumb items={basicItems} color={color} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders with left icons', () => {
    const items = [
      { label: 'Home', href: '/', leftIcon: <span data-testid="home-icon">🏠</span> },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={items} />)
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })

  it('renders with right icons', () => {
    const items = [
      { label: 'Home', href: '/', rightIcon: <span data-testid="arrow-icon">→</span> },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={items} />)
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
  })

  it('renders ellipsis for truncated breadcrumbs', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: '...', ellipsis: true, ellipsisItems: [] },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Breadcrumb items={basicItems} className="custom-class" />)
    const root = container.querySelector('.breadcrumbs_root')
    expect(root).toHaveClass('custom-class')
  })

  it('applies custom classNames for different parts', () => {
    const { container } = render(
      <Breadcrumb
        items={basicItems}
        classNames={{
          root: 'root-class',
          list: 'list-class',
          item: 'item-class',
          link: 'link-class',
          separator: 'separator-class',
          current: 'current-class',
        }}
      />
    )
    expect(container.querySelector('.root-class')).toBeInTheDocument()
    expect(container.querySelector('.list-class')).toBeInTheDocument()
  })

  it('renders BreadcrumbLink as anchor when href is provided', () => {
    render(
      <BreadcrumbLink href="/test">Test</BreadcrumbLink>
    )
    const link = screen.getByText('Test')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders BreadcrumbLink as button when only onClick is provided', () => {
    const onClick = vi.fn()
    render(
      <BreadcrumbLink onClick={onClick}>Test</BreadcrumbLink>
    )
    const link = screen.getByText('Test')
    expect(link.tagName).toBe('BUTTON')
  })

  it('renders BreadcrumbLink as span when neither href nor onClick', () => {
    render(
      <BreadcrumbLink>Test</BreadcrumbLink>
    )
    const link = screen.getByText('Test')
    expect(link.tagName).toBe('SPAN')
  })

  it('prevents default on link click when onClick is provided', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <BreadcrumbLink href="/test" onClick={onClick}>Test</BreadcrumbLink>
    )

    const link = screen.getByText('Test')
    await user.click(link)

    expect(onClick).toHaveBeenCalled()
  })

  it('renders BreadcrumbPage with icons', () => {
    render(
      <BreadcrumbPage
        leftIcon={<span data-testid="left">←</span>}
        rightIcon={<span data-testid="right">→</span>}
      >
        Current
      </BreadcrumbPage>
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('renders custom separator component', () => {
    render(
      <BreadcrumbSeparator>|</BreadcrumbSeparator>
    )
    expect(screen.getByText('|')).toBeInTheDocument()
  })

  it('applies hover styles to links', () => {
    render(<Breadcrumb items={basicItems} />)
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('hover:underline')
  })
})
