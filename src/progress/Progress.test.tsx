import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Progress from '../progress'

describe('Progress', () => {
  it('renders progress bar with value', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveAttribute('aria-valuenow', '50')
  })

  it('has correct aria attributes', () => {
    render(<Progress value={75} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
    expect(progress).toHaveAttribute('aria-valuenow', '75')
  })

  it('clamps value to 0-100 range', () => {
    const { rerender } = render(<Progress value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')

    rerender(<Progress value={-10} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('renders with default line type', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders as circle type', () => {
    render(<Progress value={50} type="circle" />)
    const progress = screen.getByRole('progressbar')
    expect(progress.querySelector('svg')).toBeInTheDocument()
  })

  it('renders as step type', () => {
    render(<Progress value={50} type="step" totalSteps={5} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const { unmount } = render(<Progress value={50} size={size} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different colors', () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info'> = [
      'default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'
    ]

    colors.forEach(color => {
      const { unmount } = render(<Progress value={50} color={color} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders different variants', () => {
    const { rerender } = render(<Progress value={50} variant="default" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    rerender(<Progress value={50} variant="solid" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    rerender(<Progress value={50} variant="soft" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows label when provided', () => {
    render(<Progress value={50} label="Loading..." />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows progress percentage when showProgress is true', () => {
    render(<Progress value={65} label="Progress" showProgress />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('does not show progress percentage by default', () => {
    render(<Progress value={65} label="Progress" />)
    expect(screen.queryByText('65%')).not.toBeInTheDocument()
  })

  it('renders horizontal orientation by default', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders vertical orientation', () => {
    render(<Progress value={50} orientation="vertical" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders striped progress bar', () => {
    render(<Progress value={50} striped />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders animated striped progress bar', () => {
    render(<Progress value={50} striped animated />)
    const progressFill = screen.getByRole('progressbar').querySelector('.progress_fill')
    expect(progressFill).toHaveClass('progress-shimmer')
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-progress" />)
    const root = screen.getByRole('progressbar').closest('.progress_root')
    expect(root).toHaveClass('custom-progress')
  })

  it('applies classNames.root', () => {
    render(<Progress value={50} classNames={{ root: 'root-class' }} />)
    const root = screen.getByRole('progressbar').closest('.progress_root')
    expect(root).toHaveClass('root-class')
  })

  it('applies classNames.track', () => {
    render(<Progress value={50} classNames={{ track: 'track-class' }} />)
    const track = screen.getByRole('progressbar').querySelector('.progress_track')
    expect(track).toHaveClass('track-class')
  })

  it('applies classNames.fill', () => {
    render(<Progress value={50} classNames={{ fill: 'fill-class' }} />)
    const fill = screen.getByRole('progressbar').querySelector('.progress_fill')
    expect(fill).toHaveClass('fill-class')
  })

  it('uses aria-label when provided', () => {
    render(<Progress value={50} aria-label="Custom progress label" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Custom progress label')
  })

  it('defaults aria-label to "Progress" when no label provided', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress')
  })

  it('uses label as aria-label when provided', () => {
    render(<Progress value={50} label="File upload" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'File upload')
  })

  describe('Circle Progress', () => {
    it('renders circle with SVG', () => {
      render(<Progress value={50} type="circle" />)
      const svg = screen.getByRole('progressbar').querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('shows percentage in center by default', () => {
      render(<Progress value={75} type="circle" />)
      expect(screen.getByText('75%')).toBeInTheDocument()
    })

    it('shows label in center when provided', () => {
      render(<Progress value={50} type="circle" label="Loading" />)
      expect(screen.getByText('Loading')).toBeInTheDocument()
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })

    it('accepts custom circleSize', () => {
      render(<Progress value={50} type="circle" circleSize={100} />)
      const svg = screen.getByRole('progressbar').querySelector('svg')
      expect(svg).toHaveAttribute('width', '100')
      expect(svg).toHaveAttribute('height', '100')
    })

    it('accepts custom strokeWidth', () => {
      render(<Progress value={50} type="circle" strokeWidth={4} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('Step Progress', () => {
    it('renders step progress with 5 steps by default', () => {
      render(<Progress value={50} type="step" />)
      const fills = screen.getByRole('progressbar').querySelectorAll('.progress_fill')
      expect(fills).toHaveLength(5)
    })

    it('renders custom number of steps', () => {
      render(<Progress value={50} type="step" totalSteps={8} />)
      const fills = screen.getByRole('progressbar').querySelectorAll('.progress_fill')
      expect(fills).toHaveLength(8)
    })

    it('calculates correct current step', () => {
      render(<Progress value={40} type="step" totalSteps={5} />)
      // 40% of 5 steps = 2 steps completed
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders vertical step progress', () => {
      render(<Progress value={50} type="step" orientation="vertical" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })
})
