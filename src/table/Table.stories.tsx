import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import Table from './index'
import type { ColumnDef } from '@tanstack/react-table'
import Badge from '../badge'
import Button from '../button'
import Dropdown from '../dropdown'

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^$' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'line', 'ghost'],
      description: 'Table visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Table size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Table color theme',
    },
    striped: {
      control: 'boolean',
      description: 'Striped rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Hover effect on rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders to cells',
    },
    enableSorting: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    enableFiltering: {
      control: 'boolean',
      description: 'Enable column filtering',
    },
    enablePagination: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    enableRowSelection: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    enableExpandable: {
      control: 'boolean',
      description: 'Enable expandable rows',
    },
    enableActions: {
      control: 'boolean',
      description: 'Show table action toolbar',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

// Sample Data Types
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  department: string
  joinDate: string
  salary?: number
  pin?: boolean
}

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  sku: string
  rating: number
}

interface Order {
  id: string
  customer: string
  product: string
  quantity: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  shippingAddress: string
}

// Sample Data
const userData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-01-15',
    salary: 95000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Sales',
    joinDate: '2021-06-20',
    salary: 85000,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Developer',
    status: 'inactive',
    department: 'Engineering',
    joinDate: '2023-03-10',
    salary: 75000,
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Designer',
    status: 'active',
    department: 'Design',
    joinDate: '2022-08-05',
    salary: 72000,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Developer',
    status: 'pending',
    department: 'Engineering',
    joinDate: '2024-01-12',
    salary: 78000,
  },
]

const productData: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 150,
    status: 'in_stock',
    sku: 'WM-2024-001',
    rating: 4.5,
  },
  {
    id: 'P002',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 89.99,
    stock: 8,
    status: 'low_stock',
    sku: 'MK-2024-002',
    rating: 4.8,
  },
  {
    id: 'P003',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 12.99,
    stock: 0,
    status: 'out_of_stock',
    sku: 'UC-2024-003',
    rating: 4.2,
  },
  {
    id: 'P004',
    name: 'Monitor Stand',
    category: 'Furniture',
    price: 45.99,
    stock: 75,
    status: 'in_stock',
    sku: 'MS-2024-004',
    rating: 4.6,
  },
  {
    id: 'P005',
    name: 'Laptop Bag',
    category: 'Accessories',
    price: 34.99,
    stock: 12,
    status: 'low_stock',
    sku: 'LB-2024-005',
    rating: 4.4,
  },
]

const orderData: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    product: 'Wireless Mouse',
    quantity: 2,
    total: 59.98,
    status: 'delivered',
    date: '2024-01-15',
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    product: 'Mechanical Keyboard',
    quantity: 1,
    total: 89.99,
    status: 'shipped',
    date: '2024-01-16',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    product: 'USB-C Cable',
    quantity: 3,
    total: 38.97,
    status: 'processing',
    date: '2024-01-17',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Williams',
    product: 'Monitor Stand',
    quantity: 1,
    total: 45.99,
    status: 'pending',
    date: '2024-01-18',
    shippingAddress: '321 Elm St, Houston, TX 77001',
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Brown',
    product: 'Laptop Bag',
    quantity: 2,
    total: 69.98,
    status: 'cancelled',
    date: '2024-01-19',
    shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
  },
]

// Generate large dataset for virtualization
const largeUserData: User[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Manager', 'Developer', 'Designer'][i % 4],
  status: (['active', 'inactive', 'pending'] as const)[i % 3],
  department: ['Engineering', 'Sales', 'Design', 'Marketing'][i % 4],
  joinDate: new Date(2020 + (i % 5), (i % 12), (i % 28) + 1).toISOString().split('T')[0],
  salary: 50000 + Math.floor(Math.random() * 100000),
}))

// Basic Columns
const basicColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const colorMap = {
        active: 'success' as const,
        inactive: 'error' as const,
        pending: 'warning' as const,
      }
      return (
        <Badge color={colorMap[status]} variant="subtle">
          {status}
        </Badge>
      )
    },
  },
]

// Sortable Columns
const sortableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        Name
        <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        Email
        <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        Department
        <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        Join Date
        <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
]

// Editable Columns
const editableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    editable: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    editable: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    editable: true,
  },
]

// Columns with Actions
const columnsWithActions: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const colorMap = {
        active: 'success' as const,
        inactive: 'error' as const,
        pending: 'warning' as const,
      }
      return (
        <Badge color={colorMap[status]} variant="subtle">
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Dropdown
        trigger={
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        }
        items={[
          { id: 'view', label: 'View Details', icon: <Eye className="w-4 h-4" /> },
          { id: 'edit', label: 'Edit', icon: <Edit className="w-4 h-4" /> },
          { id: 'delete', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, danger: true },
        ]}
        onSelect={(id) => alert(`Action: ${id}`)}
      />
    ),
  },
]

// Product Columns
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = row.original.stock
      return (
        <span className={stock < 10 ? 'text-error font-semibold' : ''}>
          {stock}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const colorMap = {
        in_stock: 'success' as const,
        low_stock: 'warning' as const,
        out_of_stock: 'error' as const,
      }
      const labelMap = {
        in_stock: 'In Stock',
        low_stock: 'Low Stock',
        out_of_stock: 'Out of Stock',
      }
      return (
        <Badge color={colorMap[status]} variant="subtle">
          {labelMap[status]}
        </Badge>
      )
    },
  },
]

// Order Columns
const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'quantity',
    header: 'Qty',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const colorMap = {
        pending: 'warning' as const,
        processing: 'info' as const,
        shipped: 'primary' as const,
        delivered: 'success' as const,
        cancelled: 'error' as const,
      }
      return (
        <Badge color={colorMap[status]} variant="subtle">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
]

// Pinnable Columns
const pinnableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    pin: 'left',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    pin: 'left',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ row }) => `$${row.original.salary?.toLocaleString()}`,
    pin: 'right',
  },
]

// Stories
export const Primary: Story = {
  args: {
    data: userData,
    columns: basicColumns,
    variant: 'outline',
    size: 'md',
    hoverable: true,
  },
}

export const SortableColumns: Story = {
  render: () => (
    <Table
      data={userData}
      columns={sortableColumns}
      enableSorting
    />
  ),
}

export const SelectableRows: Story = {
  render: function SelectableRowsExample() {
    const [selectedRows, setSelectedRows] = useState<User[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Table
          data={userData}
          columns={basicColumns}
          enableRowSelection
          enableMultiRowSelection
          onSelectionChange={setSelectedRows}
        />
        <div className="p-4 bg-surface rounded-md">
          <h3 className="font-semibold text-text-primary mb-2">
            Selected Rows: {selectedRows.length}
          </h3>
          {selectedRows.length > 0 && (
            <div className="space-y-1">
              {selectedRows.map((row) => (
                <p key={row.id} className="text-sm text-text-secondary">
                  {row.name} - {row.email}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const WithPagination: Story = {
  render: () => (
    <Table
      data={userData}
      columns={basicColumns}
      enablePagination
      pageSize={3}
      pageSizeOptions={[3, 5, 10]}
    />
  ),
}

export const LoadingState: Story = {
  render: () => (
    <Table data={[]} columns={basicColumns} loading loadingRows={5} />
  ),
}

export const ExpandableRows: Story = {
  render: () => (
    <Table
      data={userData}
      columns={basicColumns}
      enableExpandable
      expandedContent={(row) => (
        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-text-muted" />
                <span>{row.original.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-text-muted" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Additional Details</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-text-muted">Department:</span>{' '}
                <span className="font-medium">{row.original.department}</span>
              </p>
              <p>
                <span className="text-text-muted">Join Date:</span>{' '}
                <span className="font-medium">{row.original.joinDate}</span>
              </p>
              <p>
                <span className="text-text-muted">Role:</span>{' '}
                <span className="font-medium">{row.original.role}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    />
  ),
}

export const EditableCells: Story = {
  render: function EditableCellsExample() {
    const [data, setData] = useState(userData)

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-surface/50 rounded-md">
          <p className="text-sm text-text-secondary">
            Click on Name, Email, or Department cells to edit them
          </p>
        </div>
        <Table
          data={data}
          columns={editableColumns}
          onCellEdit={(event) => {
            const newData = [...data]
            newData[event.rowIndex] = {
              ...newData[event.rowIndex],
              [event.columnId]: event.value,
            }
            setData(newData)
          }}
        />
      </div>
    )
  },
}

export const VirtualizedTable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-surface/50 rounded-md">
        <p className="text-sm text-text-secondary">
          This table contains 1000 rows using virtualization for optimal performance. Only visible rows are rendered.
        </p>
      </div>
      <Table
        data={largeUserData}
        columns={basicColumns}
        enableVirtualization
        size="sm"
      />
    </div>
  ),
}

export const CompleteExample: Story = {
  render: function CompleteTableExample() {
    const [selectedRows, setSelectedRows] = useState<User[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Table
          data={userData}
          columns={sortableColumns}
          enableSorting
          enableRowSelection
          enablePagination
          enableActions
          striped
          hoverable
          pageSize={5}
          pageSizeOptions={[5, 10, 20]}
          onSelectionChange={setSelectedRows}
          onRowClick={(row) => console.log('Row clicked:', row)}
        />
        {selectedRows.length > 0 && (
          <div className="p-4 bg-primary/10 rounded-md">
            <h3 className="font-semibold text-text-primary mb-2">
              {selectedRows.length} user{selectedRows.length > 1 ? 's' : ''} selected
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="primary">
                Export Selected
              </Button>
              <Button size="sm" variant="ghost">
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  },
}
