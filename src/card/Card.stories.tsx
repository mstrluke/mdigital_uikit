import type { Meta, StoryObj } from '@storybook/react'
import {
  Settings,
  Bell,
  User,
  CreditCard,
  Check,
  ArrowRight,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  MoreHorizontal,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  CardImage,
} from './index'
import Button from '../button'
import Badge from '../badge'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'solid', 'outline', 'soft', 'ghost', 'elevated'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Semantic color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Padding size',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Shadow level',
    },
    hoverable: {
      control: 'boolean',
      description: 'Hover effect',
    },
    clickable: {
      control: 'boolean',
      description: 'Clickable with a11y',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

// Basic Examples

export const Default: Story = {
  args: {
    variant: 'default',
    color: 'default',
    size: 'md',
    shadow: 'none',
    hoverable: false,
    clickable: false,
    bordered: true,
    loading: false,
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Clickable: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Clickable cards have proper keyboard accessibility (Tab, Enter, Space)
      </p>
      <div className="grid grid-cols-3 gap-4">
        <Card clickable onClick={() => alert('Settings clicked!')}>
          <CardHeader>
            <Settings className="size-8 mb-2 text-primary" />
            <CardTitle>Settings</CardTitle>
            <CardDescription>Click or press Enter</CardDescription>
          </CardHeader>
        </Card>
        <Card clickable hoverable onClick={() => alert('Notifications clicked!')}>
          <CardHeader>
            <Bell className="size-8 mb-2 text-info" />
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Clickable + Hoverable</CardDescription>
          </CardHeader>
        </Card>
        <Card clickable color="primary" onClick={() => alert('Profile clicked!')}>
          <CardHeader>
            <User className="size-8 mb-2 text-accent" />
            <CardTitle>Profile</CardTitle>
            <CardDescription>With color accent</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card loading className="w-[300px]" />
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Loaded Card</CardTitle>
          <CardDescription>Content is ready</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This card has finished loading.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Real-World Examples

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden" hoverable>
      <div className="relative">
        <CardImage
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
          alt="Premium Headphones"
          aspectRatio="video"
        />
        <Badge color="error" className="absolute top-2 left-2">
          Sale
        </Badge>
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white">
          <Heart className="size-4" />
        </button>
      </div>
      <CardHeader>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="size-4 fill-warning text-warning" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(128)</span>
        </div>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>Wireless noise-canceling</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">$299</span>
          <span className="text-sm text-muted-foreground line-through">$399</span>
          <Badge color="success" size="xs">25% OFF</Badge>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button fullWidth leftIcon={<ShoppingCart className="size-4" />}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="size-8 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>john.doe@example.com</CardDescription>
          </div>
          <CardAction>
            <Button size="sm" variant="ghost" iconOnly leftIcon={<MoreHorizontal className="size-4" />} />
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">127</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1.2K</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold">453</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button fullWidth variant="outline">View Profile</Button>
        <Button fullWidth>Follow</Button>
      </CardFooter>
    </Card>
  ),
}

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[400px]" variant="soft" color="info">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Bell className="size-5 mt-0.5" />
          <div className="flex-1">
            <CardTitle className="text-base">New Message</CardTitle>
            <CardDescription>You have a new message from Sarah</CardDescription>
          </div>
          <CardAction>
            <Button size="xs" variant="ghost">Dismiss</Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          "Hey! Just wanted to check in about the project deadline. Are we still on track?"
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline">Reply</Button>
        <Button size="sm">Mark as Read</Button>
      </CardFooter>
    </Card>
  ),
}

export const StatsCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card size="sm">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$45,231</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-success">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl">2,345</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-success">+15.2% from last month</p>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-3xl">3.24%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-error">-2.5% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const ErrorCard: Story = {
  render: () => (
    <Card className="w-[400px]" variant="soft" color="error">
      <CardHeader>
        <CardTitle>Payment Failed</CardTitle>
        <CardDescription>There was a problem processing your payment</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Your card was declined. Please check your card details and try again.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button color="error">Try Again</Button>
      </CardFooter>
    </Card>
  ),
}

export const SuccessCard: Story = {
  render: () => (
    <Card className="w-[400px]" variant="soft" color="success">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Check className="size-5" />
          <CardTitle>Payment Successful</CardTitle>
        </div>
        <CardDescription>Your payment has been processed</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Thank you for your purchase! A confirmation email has been sent.
        </p>
      </CardContent>
      <CardFooter>
        <Button color="success" fullWidth>
          View Order
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const DashboardCard: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Dashboard</CardTitle>
            <CardDescription>Overview of your current projects</CardDescription>
          </div>
          <CardAction>
            <Button size="sm" variant="outline">View All</Button>
            <Button size="sm">New Project</Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: 'Website Redesign', due: '5 days', status: 'In Progress', statusColor: 'warning' },
            { name: 'Mobile App', due: '12 days', status: 'Planning', statusColor: 'info' },
            { name: 'Marketing Campaign', due: '2 days', status: 'Completed', statusColor: 'success' },
          ].map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between p-4 border border-border rounded-md"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-muted-foreground">Due in {project.due}</p>
              </div>
              <Badge
                color={project.statusColor as 'warning' | 'info' | 'success'}
                variant="soft"
              >
                {project.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-sm text-muted-foreground">3 active projects</p>
        <Button size="sm" variant="link">
          View Analytics
          <ArrowRight className="size-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const PricingCard: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[280px]">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>For individuals</CardDescription>
          <p className="text-3xl font-bold mt-2">$9<span className="text-sm font-normal">/mo</span></p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {['5 Projects', '10GB Storage', 'Basic Support'].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" fullWidth>Get Started</Button>
        </CardFooter>
      </Card>

      <Card className="w-[280px]" variant="outline" color="primary">
        <CardHeader>
          <Badge color="primary" className="w-fit mb-2">Popular</Badge>
          <CardTitle>Pro</CardTitle>
          <CardDescription>For teams</CardDescription>
          <p className="text-3xl font-bold mt-2">$29<span className="text-sm font-normal">/mo</span></p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button color="primary" fullWidth>Get Started</Button>
        </CardFooter>
      </Card>

      <Card className="w-[280px]">
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <CardDescription>For large teams</CardDescription>
          <p className="text-3xl font-bold mt-2">Custom</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Integrations'].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" fullWidth>Contact Sales</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'outline', 'soft'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-4 capitalize">{variant} Variant</h3>
            <div className="space-y-6">
              {sizes.map((size) => (
                <div key={size}>
                  <p className="text-xs text-text-secondary mb-3 uppercase">{size} Size</p>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                      <Card
                        key={`${variant}-${size}-${color}`}
                        variant={variant}
                        color={color}
                        size={size}
                        className="w-full"
                      >
                        <CardHeader>
                          <CardTitle className="text-sm capitalize">{color}</CardTitle>
                          <CardDescription className="text-xs">{variant}</CardDescription>
                        </CardHeader>
                      </Card>
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
