import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Mentions from './index'

const users = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Wilson', value: 'bob' },
]

describe('Mentions', () => {
  it('renders with label', () => {
    render(<Mentions label="Comment" options={users} />)
    expect(screen.getByText('Comment')).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<Mentions options={users} />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders textarea', () => {
    render(<Mentions options={users} placeholder="Type here..." />)
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
  })

  it('calls onChange on input', () => {
    const onChange = vi.fn()
    render(<Mentions options={users} onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalledWith('hello')
  })

  it('shows error message', () => {
    render(<Mentions options={users} error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<Mentions options={users} helperText="Use @ to mention" />)
    expect(screen.getByText('Use @ to mention')).toBeInTheDocument()
  })

  it('renders controlled value', () => {
    render(<Mentions options={users} value="Hello @john" />)
    expect(screen.getByDisplayValue('Hello @john')).toBeInTheDocument()
  })

  it('respects disabled state', () => {
    render(<Mentions options={users} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
