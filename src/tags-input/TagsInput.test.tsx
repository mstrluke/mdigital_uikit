import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TagsInput from './index'

describe('TagsInput', () => {
  it('renders with label', () => {
    render(<TagsInput label="Tags" />)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders data-slot="root"', () => {
    const { container } = render(<TagsInput />)
    expect(container.querySelector('[data-slot="root"]')).toBeInTheDocument()
  })

  it('renders default tags', () => {
    render(<TagsInput defaultValue={['React', 'Vue']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('adds tag on Enter', () => {
    const onChange = vi.fn()
    render(<TagsInput onChange={onChange} />)
    const input = screen.getByPlaceholderText('Add tag...')
    fireEvent.change(input, { target: { value: 'Svelte' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(['Svelte'])
  })

  it('removes tag on X click', () => {
    const onChange = vi.fn()
    render(<TagsInput defaultValue={['React', 'Vue']} onChange={onChange} />)
    const removeButtons = screen.getAllByLabelText(/Remove/)
    fireEvent.click(removeButtons[0])
    expect(onChange).toHaveBeenCalledWith(['Vue'])
  })

  it('removes last tag on Backspace when input empty', () => {
    const onChange = vi.fn()
    render(<TagsInput defaultValue={['React', 'Vue']} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Backspace' })
    expect(onChange).toHaveBeenCalledWith(['React'])
  })

  it('prevents duplicates by default', () => {
    const onChange = vi.fn()
    render(<TagsInput defaultValue={['React']} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'React' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects maxTags', () => {
    const onChange = vi.fn()
    render(<TagsInput defaultValue={['A', 'B']} maxTags={2} onChange={onChange} />)
    // Input should not be rendered when at max
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<TagsInput error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<TagsInput helperText="Press Enter to add" />)
    expect(screen.getByText('Press Enter to add')).toBeInTheDocument()
  })

  it('clears all tags on clear click', () => {
    const onChange = vi.fn()
    render(<TagsInput defaultValue={['A', 'B']} clearable onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Clear all tags'))
    expect(onChange).toHaveBeenCalledWith([])
  })
})
