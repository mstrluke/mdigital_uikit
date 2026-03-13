import type { Meta, StoryObj } from '@storybook/react'
import { User, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react'
import Descriptions from './index'

const meta: Meta<typeof Descriptions> = {
  title: 'Data Display/Descriptions',
  component: Descriptions,
  tags: ['autodocs'],
  argTypes: {
    column: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of columns for layout',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color for labels',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the descriptions',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    bordered: {
      control: 'boolean',
      description: 'Show borders',
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded corners',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
  },
}

export default meta
type Story = StoryObj<typeof Descriptions>

const basicItems = [
  {
    key: 'name',
    label: 'Name',
    children: 'John Doe',
  },
  {
    key: 'email',
    label: 'Email',
    children: 'john.doe@example.com',
  },
  {
    key: 'phone',
    label: 'Phone',
    children: '+1 (555) 123-4567',
  },
  {
    key: 'location',
    label: 'Location',
    children: 'San Francisco, CA',
  },
  {
    key: 'joined',
    label: 'Joined Date',
    children: 'January 15, 2024',
  },
  {
    key: 'status',
    label: 'Status',
    children: <span className="text-success font-semibold">Active</span>,
  },
]

export const Default: Story = {
  args: {
    items: basicItems,
    column: 3,
    color: 'default',
    size: 'md',
    variant: 'default',
    layout: 'horizontal',
    bordered: true,
    rounded: true,
  },
}

export const LayoutComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Horizontal Layout</h3>
        <Descriptions
          items={basicItems}
          column={3}
          layout="horizontal"
          color="primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Vertical Layout</h3>
        <Descriptions
          items={basicItems}
          column={3}
          layout="vertical"
          color="primary"
        />
      </div>
    </div>
  ),
}

export const WithSpan: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Mixed Span (3 columns)</h3>
        <Descriptions
          items={[
            {
              key: 'name',
              label: 'Name',
              children: 'John Doe',
            },
            {
              key: 'email',
              label: 'Email',
              children: 'john.doe@example.com',
            },
            {
              key: 'phone',
              label: 'Phone',
              children: '+1 (555) 123-4567',
            },
            {
              key: 'address',
              label: 'Address',
              children: '123 Main Street, San Francisco, CA 94102',
              span: 2, // Takes 2 columns
            },
            {
              key: 'status',
              label: 'Status',
              children: <span className="text-success font-semibold">Active</span>,
            },
            {
              key: 'bio',
              label: 'Bio',
              children: 'Software engineer with 10+ years of experience in building scalable web applications.',
              span: 3, // Takes full row
            },
          ]}
          column={3}
          color="primary"
        />
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: 'name',
        label: (
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Name
          </span>
        ),
        children: 'John Doe',
      },
      {
        key: 'email',
        label: (
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </span>
        ),
        children: 'john.doe@example.com',
      },
      {
        key: 'phone',
        label: (
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </span>
        ),
        children: '+1 (555) 123-4567',
      },
      {
        key: 'location',
        label: (
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </span>
        ),
        children: 'San Francisco, CA',
      },
      {
        key: 'joined',
        label: (
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Joined
          </span>
        ),
        children: 'January 15, 2024',
      },
      {
        key: 'role',
        label: (
          <span className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Role
          </span>
        ),
        children: 'Senior Developer',
      },
    ],
    column: 3,
    color: 'primary',
  },
}

export const UserProfile: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <Descriptions
          items={[
            {
              key: 'name',
              label: 'Full Name',
              children: 'John Michael Doe',
            },
            {
              key: 'username',
              label: 'Username',
              children: '@johndoe',
            },
            {
              key: 'email',
              label: 'Email Address',
              children: 'john.doe@example.com',
            },
            {
              key: 'phone',
              label: 'Phone Number',
              children: '+1 (555) 123-4567',
            },
            {
              key: 'location',
              label: 'Location',
              children: 'San Francisco, California, USA',
            },
            {
              key: 'timezone',
              label: 'Timezone',
              children: 'Pacific Time (PT)',
            },
            {
              key: 'role',
              label: 'Role',
              children: <span className="inline-flex px-2 py-1 bg-primary/10 text-primary rounded text-sm">Senior Developer</span>,
            },
            {
              key: 'department',
              label: 'Department',
              children: 'Engineering',
            },
            {
              key: 'joined',
              label: 'Joined Date',
              children: 'January 15, 2024',
            },
            {
              key: 'bio',
              label: 'Bio',
              children: 'Passionate software engineer with 10+ years of experience in building scalable web applications and leading development teams.',
              span: 3,
            },
          ]}
          column={3}
          color="primary"
          layout="horizontal"
        />
      </div>
    </div>
  ),
}

export const OrderDetails: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <Descriptions
          items={[
            {
              key: 'orderId',
              label: 'Order ID',
              children: <span className="font-mono">#ORD-2024-0001</span>,
            },
            {
              key: 'status',
              label: 'Status',
              children: <span className="inline-flex px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">Delivered</span>,
            },
            {
              key: 'date',
              label: 'Order Date',
              children: 'January 15, 2024',
            },
            {
              key: 'customer',
              label: 'Customer',
              children: 'John Doe',
            },
            {
              key: 'email',
              label: 'Email',
              children: 'john.doe@example.com',
            },
            {
              key: 'phone',
              label: 'Phone',
              children: '+1 (555) 123-4567',
            },
            {
              key: 'shipping',
              label: 'Shipping Address',
              children: '123 Main Street, Apt 4B, San Francisco, CA 94102',
              span: 2,
            },
            {
              key: 'payment',
              label: 'Payment Method',
              children: 'Credit Card (**** 4242)',
            },
            {
              key: 'subtotal',
              label: 'Subtotal',
              children: (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  249.99
                </span>
              ),
            },
            {
              key: 'shipping-cost',
              label: 'Shipping',
              children: (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  10.00
                </span>
              ),
            },
            {
              key: 'tax',
              label: 'Tax',
              children: (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  25.00
                </span>
              ),
            },
            {
              key: 'total',
              label: 'Total',
              children: (
                <span className="flex items-center gap-1 font-bold text-lg">
                  <DollarSign className="w-5 h-5" />
                  284.99
                </span>
              ),
            },
            {
              key: 'notes',
              label: 'Order Notes',
              children: 'Please leave the package at the front door. Ring the doorbell upon delivery.',
              span: 3,
            },
          ]}
          column={3}
          color="accent"
          layout="horizontal"
        />
      </div>
    </div>
  ),
}

export const CompanyInfo: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Company Information</h2>
      <Descriptions
        items={[
          {
            key: 'name',
            label: 'Company Name',
            children: 'TechCorp Solutions Inc.',
          },
          {
            key: 'industry',
            label: 'Industry',
            children: 'Software Development',
          },
          {
            key: 'founded',
            label: 'Founded',
            children: '2010',
          },
          {
            key: 'employees',
            label: 'Employees',
            children: '500-1000',
          },
          {
            key: 'revenue',
            label: 'Annual Revenue',
            children: '$50M - $100M',
          },
          {
            key: 'headquarters',
            label: 'Headquarters',
            children: 'San Francisco, CA',
          },
          {
            key: 'website',
            label: 'Website',
            children: (
              <a href="https://example.com" className="text-primary hover:underline">
                www.techcorp.com
              </a>
            ),
          },
          {
            key: 'email',
            label: 'Contact Email',
            children: 'contact@techcorp.com',
          },
          {
            key: 'phone',
            label: 'Phone',
            children: '+1 (555) 987-6543',
          },
          {
            key: 'description',
            label: 'Description',
            children:
              'TechCorp Solutions is a leading provider of enterprise software solutions, specializing in cloud-based applications, AI-powered analytics, and digital transformation services.',
            span: 3,
          },
        ]}
        column={3}
        color="secondary"
        layout="vertical"
      />
    </div>
  ),
}

