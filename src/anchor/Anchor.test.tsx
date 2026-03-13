import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Anchor from './index'

const items = [
  { id: 'intro', label: 'Introduction' },
  { id: 'install', label: 'Installation' },
  { id: 'usage', label: 'Usage', children: [
    { id: 'basic', label: 'Basic Usage' },
  ]},
]

describe('Anchor', () => {
  it('renders data-slot="root"', () => {
    const { container } = render(<Anchor items={items} />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders all links', () => {
    render(<Anchor items={items} />)
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Installation')).toBeInTheDocument()
    expect(screen.getByText('Usage')).toBeInTheDocument()
    expect(screen.getByText('Basic Usage')).toBeInTheDocument()
  })

  it('renders links with correct hrefs', () => {
    render(<Anchor items={items} />)
    expect(screen.getByText('Introduction').closest('a')).toHaveAttribute('href', '#intro')
    expect(screen.getByText('Installation').closest('a')).toHaveAttribute('href', '#install')
  })

  it('has navigation role', () => {
    render(<Anchor items={items} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders indicator element', () => {
    const { container } = render(<Anchor items={items} />)
    expect(container.querySelector('[data-slot="indicator"]')).toBeInTheDocument()
  })
})
