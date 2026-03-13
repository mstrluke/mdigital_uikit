import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tree from './index'
import type { TreeNode } from './types'

const mockData: TreeNode[] = [
  {
    key: '1',
    label: 'Parent 1',
    children: [
      { key: '1-1', label: 'Child 1-1' },
      { key: '1-2', label: 'Child 1-2' },
    ],
  },
  {
    key: '2',
    label: 'Parent 2',
    children: [
      {
        key: '2-1',
        label: 'Child 2-1',
        children: [
          { key: '2-1-1', label: 'Grandchild 2-1-1' },
        ],
      },
    ],
  },
  { key: '3', label: 'Leaf Node' },
]

describe('Tree', () => {
  it('renders tree nodes', () => {
    render(<Tree data={mockData} />)
    expect(screen.getByText('Parent 1')).toBeInTheDocument()
    expect(screen.getByText('Parent 2')).toBeInTheDocument()
    expect(screen.getByText('Leaf Node')).toBeInTheDocument()
  })

  it('does not show children nodes when collapsed', () => {
    render(<Tree data={mockData} />)
    expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument()
    expect(screen.queryByText('Child 1-2')).not.toBeInTheDocument()
  })

  it('expands node on click', async () => {
    const user = userEvent.setup()
    render(<Tree data={mockData} />)

    const expandButton = screen.getAllByRole('button')[0]
    await user.click(expandButton)

    expect(screen.getByText('Child 1-1')).toBeInTheDocument()
    expect(screen.getByText('Child 1-2')).toBeInTheDocument()
  })

  it('collapses expanded node on click', async () => {
    const user = userEvent.setup()
    render(<Tree data={mockData} defaultExpandedKeys={['1']} />)

    expect(screen.getByText('Child 1-1')).toBeInTheDocument()

    const expandButton = screen.getAllByRole('button')[0]
    await user.click(expandButton)

    expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument()
  })

  it('renders all nodes with defaultExpandAll', () => {
    render(<Tree data={mockData} defaultExpandAll />)
    expect(screen.getByText('Child 1-1')).toBeInTheDocument()
    expect(screen.getByText('Child 1-2')).toBeInTheDocument()
    expect(screen.getByText('Child 2-1')).toBeInTheDocument()
    expect(screen.getByText('Grandchild 2-1-1')).toBeInTheDocument()
  })

  it('calls onExpand when node is expanded', async () => {
    const onExpand = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} onExpand={onExpand} />)

    const expandButton = screen.getAllByRole('button')[0]
    await user.click(expandButton)

    expect(onExpand).toHaveBeenCalledWith(['1'])
  })

  it('renders checkboxes when checkable is true', () => {
    render(<Tree data={mockData} checkable defaultExpandAll />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  it('checks node when checkbox is clicked', async () => {
    const onCheck = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} checkable onCheck={onCheck} />)

    const checkbox = screen.getAllByRole('checkbox')[2]
    await user.click(checkbox)

    expect(onCheck).toHaveBeenCalled()
  })

  it('checks all child nodes when parent is checked', async () => {
    const onCheck = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} checkable onCheck={onCheck} />)

    const parentCheckbox = screen.getAllByRole('checkbox')[0]
    await user.click(parentCheckbox)

    expect(onCheck).toHaveBeenCalledWith(
      expect.arrayContaining(['1-1', '1-2']),
      expect.objectContaining({ checked: true })
    )
  })

  it('activates checkbox with keyboard', async () => {
    const onCheck = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} checkable onCheck={onCheck} />)

    const checkbox = screen.getAllByRole('checkbox')[2]
    checkbox.focus()
    await user.keyboard('{Enter}')

    expect(onCheck).toHaveBeenCalled()
  })

  it('handles node selection', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} onSelect={onSelect} />)

    await user.click(screen.getByText('Leaf Node'))

    expect(onSelect).toHaveBeenCalledWith(
      ['3'],
      expect.objectContaining({ selected: true })
    )
  })

  it('deselects node when clicked again', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} onSelect={onSelect} defaultSelectedKeys={['3']} />)

    await user.click(screen.getByText('Leaf Node'))

    expect(onSelect).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ selected: false })
    )
  })

  it('does not select when selectable is false', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} selectable={false} onSelect={onSelect} />)

    await user.click(screen.getByText('Leaf Node'))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('renders all size variants', () => {
    const { rerender } = render(<Tree data={mockData} size="xs" />)
    expect(screen.getByText('Parent 1')).toBeInTheDocument()

    rerender(<Tree data={mockData} size="sm" />)
    expect(screen.getByText('Parent 1')).toBeInTheDocument()

    rerender(<Tree data={mockData} size="md" />)
    expect(screen.getByText('Parent 1')).toBeInTheDocument()

    rerender(<Tree data={mockData} size="lg" />)
    expect(screen.getByText('Parent 1')).toBeInTheDocument()
  })

  it('renders custom icons', () => {
    const dataWithIcons: TreeNode[] = [
      {
        key: '1',
        label: 'Item',
        icon: <span data-testid="custom-icon">📁</span>,
      },
    ]
    render(<Tree data={dataWithIcons} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('hides icons when showIcon is false', () => {
    const dataWithIcons: TreeNode[] = [
      {
        key: '1',
        label: 'Item',
        icon: <span data-testid="custom-icon">📁</span>,
      },
    ]
    render(<Tree data={dataWithIcons} showIcon={false} />)
    expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument()
  })

  it('disables entire tree when disabled is true', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={mockData} disabled onSelect={onSelect} />)

    await user.click(screen.getByText('Leaf Node'))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('disables individual nodes', async () => {
    const dataWithDisabled: TreeNode[] = [
      { key: '1', label: 'Enabled' },
      { key: '2', label: 'Disabled', disabled: true },
    ]
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<Tree data={dataWithDisabled} onSelect={onSelect} />)

    await user.click(screen.getByText('Disabled'))
    expect(onSelect).not.toHaveBeenCalled()

    await user.click(screen.getByText('Enabled'))
    expect(onSelect).toHaveBeenCalled()
  })

  it('treats isLeaf nodes as leaf nodes without expand icon', () => {
    const dataWithLeaf: TreeNode[] = [
      {
        key: '1',
        label: 'Leaf Parent',
        isLeaf: true,
        children: [{ key: '1-1', label: 'Child' }],
      },
    ]
    render(<Tree data={dataWithLeaf} />)

    // Should not have expand button since isLeaf is true
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders with showLine for connecting lines', () => {
    render(<Tree data={mockData} showLine defaultExpandAll />)
    expect(screen.getByText('Child 1-1')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Tree data={mockData} className="custom-class" />)
    const tree = container.querySelector('.tree_root')
    expect(tree).toHaveClass('custom-class')
  })

  it('applies classNames API to sub-elements', () => {
    render(
      <Tree
        data={mockData}
        classNames={{
          root: 'root-class',
          node: 'node-class',
          nodeContent: 'content-class',
          label: 'label-class',
        }}
      />
    )

    const tree = screen.getByText('Parent 1').closest('.tree_root')
    expect(tree).toHaveClass('root-class')
  })

  it('handles controlled expandedKeys', async () => {
    const onExpand = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Tree data={mockData} expandedKeys={[]} onExpand={onExpand} />
    )

    const expandButton = screen.getAllByRole('button')[0]
    await user.click(expandButton)

    expect(onExpand).toHaveBeenCalledWith(['1'])

    // Simulate parent updating expandedKeys
    rerender(<Tree data={mockData} expandedKeys={['1']} onExpand={onExpand} />)

    expect(screen.getByText('Child 1-1')).toBeInTheDocument()
  })

  it('shows indeterminate state for parent checkboxes', async () => {
    const user = userEvent.setup()
    render(<Tree data={mockData} checkable defaultExpandAll />)

    // Check one child
    const childCheckbox = screen.getByText('Child 1-1')
      .closest('.tree_nodeContent')
      ?.querySelector('[role="checkbox"]')

    if (childCheckbox) {
      await user.click(childCheckbox)
    }

    // Parent should show indeterminate state
    const parentCheckbox = screen.getByText('Parent 1')
      .closest('.tree_nodeContent')
      ?.querySelector('[role="checkbox"]')

    expect(parentCheckbox).toHaveAttribute('aria-checked', 'mixed')
  })
})
