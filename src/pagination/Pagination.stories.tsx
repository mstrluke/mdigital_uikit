import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Pagination from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: 'number',
      description: 'Total number of items',
    },
    current: {
      control: 'number',
      description: 'Current page number (controlled)',
    },
    defaultCurrent: {
      control: 'number',
      description: 'Default initial page number',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page (controlled)',
    },
    defaultPageSize: {
      control: 'number',
      description: 'Default number of items per page',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    showSizeChanger: {
      control: 'boolean',
      description: 'Show page size selector',
    },
    showQuickJumper: {
      control: 'boolean',
      description: 'Show quick page jumper input',
    },
    showFirstLastButtons: {
      control: 'boolean',
      description: 'Show first and last page navigation buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all interactions',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    total: 100,
    defaultCurrent: 1,
    defaultPageSize: 10,
    color: 'primary',
    size: 'md',
    variant: 'default',
  },
}

export const WithFirstLastButtons: Story = {
  args: {
    total: 200,
    defaultCurrent: 5,
    defaultPageSize: 10,
    color: 'primary',
    showFirstLastButtons: true,
  },
}

export const WithSizeChanger: Story = {
  args: {
    total: 200,
    defaultCurrent: 1,
    defaultPageSize: 10,
    color: 'primary',
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
}

export const WithQuickJumper: Story = {
  args: {
    total: 200,
    defaultCurrent: 1,
    defaultPageSize: 10,
    color: 'primary',
    showQuickJumper: true,
  },
}

export const WithShowTotal: Story = {
  args: {
    total: 200,
    defaultCurrent: 3,
    defaultPageSize: 20,
    color: 'primary',
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
  },
}

export const FullFeatured: Story = {
  args: {
    total: 500,
    defaultCurrent: 5,
    defaultPageSize: 20,
    color: 'primary',
    showSizeChanger: true,
    showQuickJumper: true,
    showFirstLastButtons: true,
    pageSizeOptions: [10, 20, 50, 100],
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  },
}

export const Disabled: Story = {
  args: {
    total: 100,
    defaultCurrent: 3,
    defaultPageSize: 10,
    color: 'primary',
    disabled: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
}

export const ControlledMode: Story = {
  render: () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const total = 200

    const handleChange = (page: number, newPageSize: number) => {
      setCurrent(page)
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize)
      }
    }

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent(1)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            First Page
          </button>
          <button
            onClick={() => setCurrent(Math.ceil(current / 2))}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Jump Back
          </button>
          <button
            onClick={() => setCurrent(Math.ceil(total / pageSize))}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Last Page
          </button>
        </div>
        <div className="text-sm text-text-secondary">
          Current page: <strong>{current}</strong> | Page size: <strong>{pageSize}</strong>
        </div>
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={handleChange}
          onShowSizeChange={handleChange}
          color="primary"
          showSizeChanger
          showQuickJumper
          showFirstLastButtons
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        />
      </div>
    )
  },
}

export const DataTable: Story = {
  render: () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const total = 156

    const data = Array.from({ length: pageSize }, (_, i) => ({
      id: (current - 1) * pageSize + i + 1,
      name: `User ${(current - 1) * pageSize + i + 1}`,
      email: `user${(current - 1) * pageSize + i + 1}@example.com`,
      status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
    }))

    return (
      <div className="space-y-4">
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm">{row.id}</td>
                  <td className="px-4 py-3 text-sm">{row.name}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{row.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      row.status === 'Active' ? 'bg-success/10 text-success' :
                      row.status === 'Inactive' ? 'bg-error/10 text-error' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={(page, size) => {
            setCurrent(page)
            setPageSize(size)
          }}
          color="primary"
          showSizeChanger
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    )
  },
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-4 capitalize">{variant} Variant</h3>
            <div className="space-y-6">
              {sizes.map((size) => (
                <div key={size}>
                  <p className="text-xs text-text-secondary mb-2 uppercase">{size}</p>
                  <div className="space-y-3">
                    {colors.map((color) => (
                      <div key={`${variant}-${size}-${color}`} className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary w-20 capitalize">{color}</span>
                        <Pagination
                          total={100}
                          defaultCurrent={1}
                          defaultPageSize={10}
                          color={color}
                          variant={variant}
                          size={size}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
