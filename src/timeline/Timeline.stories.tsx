import type { Meta, StoryObj } from '@storybook/react'
import { CheckCircle, Clock, AlertCircle, Package, Truck, Home, XCircle } from 'lucide-react'
import Timeline from './index'
import type { TimelineProps } from './types'

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['left', 'right', 'center'],
      description: 'Layout mode for the timeline',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Timeline orientation',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of timeline elements',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Default color for timeline items',
    },
    pending: {
      control: 'boolean',
      description: 'Show pending indicator at the end',
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the order of items',
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

const basicItems: TimelineProps['items'] = [
  {
    title: 'Project Created',
    description: 'Initial project setup and repository creation',
    timestamp: '2024-01-15',
  },
  {
    title: 'Design Phase',
    description: 'Completed UI/UX design and wireframes',
    timestamp: '2024-01-20',
  },
  {
    title: 'Development Started',
    description: 'Backend API and database schema implementation',
    timestamp: '2024-01-25',
  },
  {
    title: 'Beta Release',
    description: 'Released beta version to selected users',
    timestamp: '2024-02-01',
  },
]

export const Primary: Story = {
  args: {
    items: basicItems,
    size: 'md',
    color: 'primary',
  },
}

export const WithIcons: Story = {
  args: {
    size: 'md',
    items: [
      {
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        timestamp: '10:30 AM',
        icon: <CheckCircle className="w-full h-full text-white" />,
        color: 'success',
      },
      {
        title: 'Processing',
        description: 'Your order is being processed',
        timestamp: '11:00 AM',
        icon: <Clock className="w-full h-full text-white" />,
        color: 'info',
      },
      {
        title: 'Shipped',
        description: 'Your order has been shipped',
        timestamp: '2:30 PM',
        icon: <Package className="w-full h-full text-white" />,
        color: 'primary',
      },
      {
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        timestamp: '4:00 PM',
        icon: <Truck className="w-full h-full text-white" />,
        color: 'warning',
      },
    ],
  },
}


export const Horizontal: Story = {
  parameters: { layout: 'padded' },
  args: {
    orientation: 'horizontal',
    size: 'md',
    color: 'primary',
    items: basicItems,
  },
}

export const HorizontalWithIcons: Story = {
  parameters: { layout: 'padded' },
  args: {
    orientation: 'horizontal',
    size: 'md',
    items: [
      {
        title: 'Order Placed',
        timestamp: 'Jan 28',
        icon: <CheckCircle className="w-full h-full text-white" />,
        color: 'success',
      },
      {
        title: 'Processing',
        timestamp: 'Jan 29',
        icon: <Clock className="w-full h-full text-white" />,
        color: 'info',
      },
      {
        title: 'Shipped',
        timestamp: 'Jan 30',
        icon: <Package className="w-full h-full text-white" />,
        color: 'primary',
      },
      {
        title: 'Delivered',
        timestamp: 'Feb 1',
        icon: <Home className="w-full h-full text-white" />,
        color: 'success',
      },
    ],
  },
}

export const HorizontalPending: Story = {
  parameters: { layout: 'padded' },
  args: {
    orientation: 'horizontal',
    size: 'md',
    pending: true,
    pendingText: 'In Transit',
    items: [
      {
        title: 'Ordered',
        timestamp: 'Mon',
        icon: <CheckCircle className="w-full h-full text-white" />,
        color: 'success',
      },
      {
        title: 'Packed',
        timestamp: 'Tue',
        icon: <Package className="w-full h-full text-white" />,
        color: 'success',
      },
    ],
  },
}


export const ComplexExample: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>
      <Timeline
        mode="left"
        size="md"
        items={[
          {
            title: 'Order Placed',
            description: 'Your order has been successfully placed',
            timestamp: 'Jan 28, 2024 - 10:30 AM',
            icon: <CheckCircle className="w-full h-full text-white" />,
            color: 'success',
          },
          {
            title: 'Payment Confirmed',
            description: 'Payment received and verified',
            timestamp: 'Jan 28, 2024 - 10:31 AM',
            icon: <CheckCircle className="w-full h-full text-white" />,
            color: 'success',
          },
          {
            title: 'Processing Order',
            description: 'Your items are being prepared for shipment',
            timestamp: 'Jan 28, 2024 - 11:00 AM',
            icon: <Package className="w-full h-full text-white" />,
            color: 'info',
          },
          {
            title: 'Shipped',
            description: (
              <div>
                <p>Your package has been shipped</p>
                <p className="text-xs mt-1 font-mono">Tracking: #TRK123456789</p>
              </div>
            ),
            timestamp: 'Jan 29, 2024 - 2:30 PM',
            icon: <Truck className="w-full h-full text-white" />,
            color: 'primary',
          },
          {
            title: 'Out for Delivery',
            description: 'Package is out for delivery to your address',
            timestamp: 'Jan 30, 2024 - 8:00 AM',
            icon: <Truck className="w-full h-full text-white" />,
            color: 'warning',
          },
          {
            title: 'Delivered',
            description: 'Package delivered successfully',
            timestamp: 'Expected: Jan 30, 2024 - 5:00 PM',
            icon: <Home className="w-full h-full text-white" />,
            color: 'default',
          },
        ]}
      />
    </div>
  ),
}

export const WithFailedStep: Story = {
  args: {
    size: 'md',
    items: [
      {
        title: 'Build Started',
        description: 'Starting build process',
        icon: <Clock className="w-full h-full text-white" />,
        color: 'info',
        timestamp: '10:00:00',
      },
      {
        title: 'Dependencies Installed',
        description: 'All packages installed successfully',
        icon: <CheckCircle className="w-full h-full text-white" />,
        color: 'success',
        timestamp: '10:02:15',
      },
      {
        title: 'Build Failed',
        description: 'TypeScript compilation error in src/components/Header.tsx',
        icon: <XCircle className="w-full h-full text-white" />,
        color: 'error',
        timestamp: '10:05:42',
      },
      {
        title: 'Retry Build',
        description: 'Attempting to rebuild after fixing errors',
        icon: <AlertCircle className="w-full h-full text-white" />,
        color: 'warning',
        timestamp: '10:08:00',
      },
    ],
  },
}
