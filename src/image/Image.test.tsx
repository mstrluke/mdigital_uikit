import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Image from './index'

describe('Image', () => {
  it('renders image with src and alt', () => {
    render(<Image src="https://example.com/image.jpg" alt="Test Image" />)
    const img = screen.getByAltText('Test Image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('has lazy loading by default', () => {
    render(<Image src="https://example.com/image.jpg" alt="Test" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('uses eager loading when fetchPriority is high', () => {
    render(<Image src="https://example.com/image.jpg" alt="Test" fetchPriority="high" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('allows explicit loading prop override', () => {
    render(<Image src="https://example.com/image.jpg" alt="Test" fetchPriority="high" loading="lazy" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('applies fetchPriority attribute', () => {
    const { rerender } = render(
      <Image src="test.jpg" alt="Test" fetchPriority="high" />
    )
    let img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('fetchPriority', 'high')

    rerender(<Image src="test.jpg" alt="Test" fetchPriority="low" />)
    img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('fetchPriority', 'low')

    rerender(<Image src="test.jpg" alt="Test" fetchPriority="auto" />)
    img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('fetchPriority', 'auto')
  })

  it('renders with blur placeholder when withBlur is true', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test" withBlur />
    )
    const placeholder = container.querySelector('.image_placeholder')
    expect(placeholder).toBeInTheDocument()
  })

  it('applies width and height to image', () => {
    render(<Image src="test.jpg" alt="Test" width={300} height={200} />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('width', '300')
    expect(img).toHaveAttribute('height', '200')
  })

  it('applies width and height to blur wrapper', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test" withBlur width={300} height={200} />
    )
    const root = container.querySelector('.image_root')
    expect(root).toHaveStyle({ width: '300px', height: '200px' })
  })

  it('shows fallback image on error when fallbackSrc provided', async () => {
    render(<Image src="invalid-image.jpg" alt="Test" fallbackSrc="/fallback.png" />)
    const img = screen.getByAltText('Test')

    fireEvent.error(img)

    await waitFor(() => {
      expect(img).toHaveAttribute('src', '/fallback.png')
    })
  })

  it('keeps img in DOM with error class when no fallbackSrc provided and primary fails', async () => {
    render(<Image src="invalid-image.jpg" alt="Test" />)
    const img = screen.getByAltText('Test')

    fireEvent.error(img)

    await waitFor(() => {
      expect(img).toHaveClass('image_error')
    })
  })

  it('returns null when both primary and fallback fail', async () => {
    const { container } = render(<Image src="invalid-image.jpg" alt="Test" fallbackSrc="/fallback.png" />)
    const img = screen.getByAltText('Test')

    // First error - switches to fallback
    fireEvent.error(img)

    await waitFor(() => {
      expect(img).toHaveAttribute('src', '/fallback.png')
    })

    // Second error - fallback fails
    fireEvent.error(img)

    await waitFor(() => {
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  it('applies custom className to img element', () => {
    render(<Image src="test.jpg" alt="Test" className="custom-class" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    const { container } = render(
      <Image
        src="test.jpg"
        alt="Test"
        withBlur
        classNames={{
          root: 'root-class',
          image: 'image-class',
          placeholder: 'placeholder-class',
          error: 'error-class',
        }}
      />
    )

    const root = container.querySelector('.image_root')
    expect(root).toHaveClass('root-class')

    const img = screen.getByAltText('Test')
    expect(img).toHaveClass('image-class')

    const placeholder = container.querySelector('.image_placeholder')
    expect(placeholder).toHaveClass('placeholder-class')
  })

  it('applies error className when image fails to load', async () => {
    const { container } = render(
      <Image
        src="invalid.jpg"
        alt="Test"
        classNames={{ error: 'error-class' }}
      />
    )

    const img = screen.getByAltText('Test')
    fireEvent.error(img)

    await waitFor(() => {
      expect(img).toHaveClass('image_error')
      expect(img).toHaveClass('error-class')
    })
  })

  it('handles image load completion', async () => {
    render(<Image src="test.jpg" alt="Test" withBlur />)
    const img = screen.getByAltText('Test')

    // Simulate load event
    Object.defineProperty(img, 'complete', { value: true })
    fireEvent.load(img)

    await waitFor(() => {
      // The component should handle the load state internally
      expect(img).toBeInTheDocument()
    })
  })

  it('passes through standard img attributes', () => {
    render(
      <Image
        src="test.jpg"
        alt="Test"
        title="Test Title"
        data-testid="custom-img"
      />
    )

    const img = screen.getByTestId('custom-img')
    expect(img).toHaveAttribute('title', 'Test Title')
  })

  it('renders without wrapper when withBlur is false', () => {
    const { container } = render(<Image src="test.jpg" alt="Test" />)
    const root = container.querySelector('.image_root')
    expect(root).not.toBeInTheDocument()
    // img is rendered directly
    const img = screen.getByAltText('Test')
    expect(img.tagName).toBe('IMG')
  })

  it('renders wrapper with relative position when withBlur is true', () => {
    const { container } = render(<Image src="test.jpg" alt="Test" withBlur />)
    const root = container.querySelector('.image_root')
    expect(root).toHaveClass('relative')
  })

  it('has proper transition classes on image', () => {
    render(<Image src="test.jpg" alt="Test" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveClass('transition-opacity')
  })

  it('placeholder has pulse animation', () => {
    const { container } = render(<Image src="test.jpg" alt="Test" withBlur />)
    const placeholder = container.querySelector('.image_placeholder')
    expect(placeholder).toHaveClass('animate-pulse')
  })

  it('handles missing alt text gracefully', () => {
    // TypeScript would prevent this, but testing runtime behavior
    render(<Image src="test.jpg" alt="" />)
    const imgs = document.querySelectorAll('img')
    expect(imgs.length).toBeGreaterThan(0)
  })
})
