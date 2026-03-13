import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Card from './index'

describe('Card', () => {
  it('renders basic card', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with default variant', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('.card_root')
    expect(card).toHaveClass('card_root')
  })

  it('renders different variants', () => {
    const variants: Array<'default' | 'solid' | 'outline' | 'soft' | 'ghost' | 'elevated'> = [
      'default', 'solid', 'outline', 'soft', 'ghost', 'elevated'
    ]

    variants.forEach(variant => {
      const { unmount } = render(<Card variant={variant}>{variant}</Card>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Card color={color}>{color}</Card>)
      expect(screen.getByText(color)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const { unmount } = render(<Card size={size}>{size}</Card>)
      expect(screen.getByText(size)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different shadow levels', () => {
    const { rerender } = render(<Card shadow="none">No shadow</Card>)
    expect(screen.getByText('No shadow')).toBeInTheDocument()

    rerender(<Card shadow="sm">Small shadow</Card>)
    expect(screen.getByText('Small shadow')).toBeInTheDocument()

    rerender(<Card shadow="md">Medium shadow</Card>)
    expect(screen.getByText('Medium shadow')).toBeInTheDocument()

    rerender(<Card shadow="lg">Large shadow</Card>)
    expect(screen.getByText('Large shadow')).toBeInTheDocument()
  })

  it('renders hoverable card', () => {
    render(<Card hoverable>Hoverable</Card>)
    expect(screen.getByText('Hoverable')).toBeInTheDocument()
  })

  it('renders clickable card with button role', () => {
    render(<Card clickable>Clickable</Card>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events on clickable card', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Card clickable onClick={handleClick}>Click me</Card>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events on clickable card', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Card clickable onClick={handleClick}>Press me</Card>)

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)

    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('renders without border when bordered is false', () => {
    render(<Card bordered={false}>No border</Card>)
    expect(screen.getByText('No border')).toBeInTheDocument()
  })

  it('renders loading skeleton', () => {
    const { container } = render(<Card loading>Content</Card>)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>)
    const card = container.querySelector('.card_root')
    expect(card).toHaveClass('custom-card')
  })

  it('applies classNames.root', () => {
    const { container } = render(<Card classNames={{ root: 'root-class' }}>Content</Card>)
    const card = container.querySelector('.card_root')
    expect(card).toHaveClass('root-class')
  })

  it('forwards ref to card element', () => {
    const ref = { current: null }
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('Card.Header', () => {
  it('renders card header', () => {
    render(
      <Card>
        <Card.Header>Header content</Card.Header>
      </Card>
    )
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('applies custom className to header', () => {
    render(
      <Card>
        <Card.Header className="custom-header">Header</Card.Header>
      </Card>
    )
    expect(screen.getByText('Header')).toHaveClass('custom-header')
  })
})

describe('Card.Title', () => {
  it('renders card title as h3 by default', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
      </Card>
    )
    const title = screen.getByText('Card Title')
    expect(title.tagName).toBe('H3')
  })

  it('renders title with custom heading level', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title as="h1">Custom Title</Card.Title>
        </Card.Header>
      </Card>
    )
    const title = screen.getByText('Custom Title')
    expect(title.tagName).toBe('H1')
  })

  it('applies custom className to title', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title className="custom-title">Title</Card.Title>
        </Card.Header>
      </Card>
    )
    expect(screen.getByText('Title')).toHaveClass('custom-title')
  })
})

describe('Card.Description', () => {
  it('renders card description', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Description>Card description text</Card.Description>
        </Card.Header>
      </Card>
    )
    expect(screen.getByText('Card description text')).toBeInTheDocument()
  })

  it('applies custom className to description', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Description className="custom-desc">Description</Card.Description>
        </Card.Header>
      </Card>
    )
    expect(screen.getByText('Description')).toHaveClass('custom-desc')
  })
})

describe('Card.Content', () => {
  it('renders card content', () => {
    render(
      <Card>
        <Card.Content>Main content here</Card.Content>
      </Card>
    )
    expect(screen.getByText('Main content here')).toBeInTheDocument()
  })

  it('applies custom className to content', () => {
    render(
      <Card>
        <Card.Content className="custom-content">Content</Card.Content>
      </Card>
    )
    expect(screen.getByText('Content')).toHaveClass('custom-content')
  })
})

describe('Card.Footer', () => {
  it('renders card footer', () => {
    render(
      <Card>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies custom className to footer', () => {
    render(
      <Card>
        <Card.Footer className="custom-footer">Footer</Card.Footer>
      </Card>
    )
    expect(screen.getByText('Footer')).toHaveClass('custom-footer')
  })
})

describe('Card.Action', () => {
  it('renders card action container', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Action>
            <button>Edit</button>
          </Card.Action>
        </Card.Header>
      </Card>
    )
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })
})

describe('Card.Image', () => {
  it('renders card image', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test image" />
      </Card>
    )
    const img = screen.getByAltText('Test image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })

  it('renders image with default video aspect ratio', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('renders image with custom aspect ratio', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" aspectRatio="square" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('renders image with custom object fit', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" objectFit="contain" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('renders image at top position by default', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('renders image at bottom position', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" position="bottom" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('applies lazy loading to images', () => {
    render(
      <Card>
        <Card.Image src="/test.jpg" alt="Test" />
      </Card>
    )
    expect(screen.getByAltText('Test')).toHaveAttribute('loading', 'lazy')
  })
})

describe('Card - Full composition', () => {
  it('renders complete card with all sub-components', () => {
    render(
      <Card>
        <Card.Image src="/hero.jpg" alt="Hero" />
        <Card.Header>
          <Card.Title>Article Title</Card.Title>
          <Card.Description>A brief description</Card.Description>
          <Card.Action>
            <button>Share</button>
          </Card.Action>
        </Card.Header>
        <Card.Content>Main article content goes here</Card.Content>
        <Card.Footer>
          <button>Read More</button>
        </Card.Footer>
      </Card>
    )

    expect(screen.getByAltText('Hero')).toBeInTheDocument()
    expect(screen.getByText('Article Title')).toBeInTheDocument()
    expect(screen.getByText('A brief description')).toBeInTheDocument()
    expect(screen.getByText('Main article content goes here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Read More' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument()
  })
})
