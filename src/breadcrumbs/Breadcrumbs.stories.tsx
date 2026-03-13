import type { Meta, StoryObj } from '@storybook/react'
import {
  Home,
  ChevronRight,
  Folder,
  FileText,
  Settings,
  User,
  ShoppingCart,
  Package,
  Slash,
} from 'lucide-react'
import Breadcrumb, {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
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
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
    color: 'primary',
    size: 'md',
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', leftIcon: <Home className="w-4 h-4" /> },
      { label: 'Products', href: '/products', leftIcon: <Package className="w-4 h-4" /> },
      { label: 'Shopping Cart', leftIcon: <ShoppingCart className="w-4 h-4" /> },
    ],
    color: 'primary',
  },
}

export const CustomSeparator: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Slash Separator</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics' },
          ]}
          separator={<Slash className="w-4 h-4" />}
          color="primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Dash Separator</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics' },
          ]}
          separator="-"
          color="primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Dot Separator</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics' },
          ]}
          separator="•"
          color="primary"
        />
      </div>
    </div>
  ),
}

export const WithEllipsis: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      {
        label: '',
        ellipsis: true,
        ellipsisItems: [
          { label: 'Level 2', href: '/level2' },
          { label: 'Level 3', href: '/level3' },
          { label: 'Level 4', href: '/level4' },
        ],
      },
      { label: 'Current Page' },
    ],
    color: 'primary',
  },
}

export const ClickableItems: Story = {
  render: () => {
    const handleClick = (label: string) => {
      alert(`Navigating to: ${label}`)
    }

    return (
      <Breadcrumb
        items={[
          { label: 'Home', onClick: () => handleClick('Home') },
          { label: 'Products', onClick: () => handleClick('Products') },
          { label: 'Electronics', onClick: () => handleClick('Electronics') },
          { label: 'Laptops' },
        ]}
        color="primary"
      />
    )
  },
}

export const ManualComposition: Story = {
  render: () => (
    <Breadcrumb color="primary" size="md">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" leftIcon={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products" leftIcon={<Package className="w-4 h-4" />}>
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis
            items={[
              { label: 'Electronics', href: '/products/electronics' },
              { label: 'Computers', href: '/products/computers' },
            ]}
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage leftIcon={<FileText className="w-4 h-4" />}>
            Product Details
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const FileSystemPath: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Simple Path</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', leftIcon: <Home className="w-4 h-4" /> },
            { label: 'Documents', href: '/documents', leftIcon: <Folder className="w-4 h-4" /> },
            { label: 'Projects', href: '/documents/projects', leftIcon: <Folder className="w-4 h-4" /> },
            { label: 'readme.md', leftIcon: <FileText className="w-4 h-4" /> },
          ]}
          color="primary"
          separator={<ChevronRight className="w-4 h-4" />}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Deep Path with Ellipsis</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', leftIcon: <Home className="w-4 h-4" /> },
            { label: 'Documents', href: '/documents', leftIcon: <Folder className="w-4 h-4" /> },
            {
              label: '',
              ellipsis: true,
              ellipsisItems: [
                { label: 'Work', href: '/documents/work' },
                { label: '2024', href: '/documents/work/2024' },
                { label: 'Q1', href: '/documents/work/2024/q1' },
              ],
            },
            { label: 'report.pdf', leftIcon: <FileText className="w-4 h-4" /> },
          ]}
          color="primary"
        />
      </div>
    </div>
  ),
}

export const ECommerce: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Product Page</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', leftIcon: <Home className="w-4 h-4" /> },
            { label: 'Shop', href: '/shop', leftIcon: <ShoppingCart className="w-4 h-4" /> },
            { label: 'Electronics', href: '/shop/electronics' },
            { label: 'Laptops', href: '/shop/electronics/laptops' },
            { label: 'MacBook Pro 16"' },
          ]}
          color="primary"
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Checkout Flow</h3>
        <Breadcrumb
          items={[
            { label: 'Cart', href: '/cart', leftIcon: <ShoppingCart className="w-4 h-4" /> },
            { label: 'Shipping', href: '/checkout/shipping' },
            { label: 'Payment' },
          ]}
          color="success"
          size="md"
        />
      </div>
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {sizes.map((size) => (
          <div key={size}>
            <h3 className="text-sm font-semibold mb-4 uppercase">{size} Size</h3>
            <div className="space-y-3">
              {colors.map((color) => (
                <div key={`${size}-${color}`} className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary w-20 capitalize">{color}</span>
                  <Breadcrumb
                    items={[
                      { label: 'Home', href: '#' },
                      { label: 'Page', href: '#' },
                      { label: 'Current' },
                    ]}
                    color={color}
                    size={size}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

