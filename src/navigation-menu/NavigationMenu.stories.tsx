import type { Meta, StoryObj } from '@storybook/react'
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart,
  Package,
  ShoppingCart,
  CreditCard,
  BookOpen,
  HelpCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Code,
  Database,
  Cloud,
  Layers,
  Zap,
  Shield
} from 'lucide-react'
import { NavigationMenu } from './index'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of navigation menu items',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Menu orientation',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        href: '/',
      },
      {
        key: 'products',
        label: 'Products',
        children: [
          {
            key: 'analytics',
            label: 'Analytics',
            description: 'Get insights into your data with powerful analytics tools',
            icon: <BarChart className="w-5 h-5" />,
            href: '/products/analytics',
          },
          {
            key: 'commerce',
            label: 'E-Commerce',
            description: 'Build and manage your online store with ease',
            icon: <ShoppingCart className="w-5 h-5" />,
            href: '/products/commerce',
          },
          {
            key: 'payments',
            label: 'Payments',
            description: 'Accept payments securely from customers worldwide',
            icon: <CreditCard className="w-5 h-5" />,
            href: '/products/payments',
          },
        ],
      },
      {
        key: 'resources',
        label: 'Resources',
        children: [
          {
            key: 'documentation',
            label: 'Documentation',
            description: 'Comprehensive guides and API references',
            icon: <BookOpen className="w-5 h-5" />,
            href: '/resources/docs',
          },
          {
            key: 'support',
            label: 'Support',
            description: 'Get help from our support team',
            icon: <HelpCircle className="w-5 h-5" />,
            href: '/resources/support',
          },
        ],
      },
      {
        key: 'about',
        label: 'About',
        href: '/about',
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: <Home className="w-4 h-4" />,
        href: '/',
      },
      {
        key: 'products',
        label: 'Products',
        icon: <Package className="w-4 h-4" />,
        children: [
          {
            key: 'analytics',
            label: 'Analytics Platform',
            description: 'Real-time data analysis and visualization',
            icon: <BarChart className="w-5 h-5" />,
            href: '/products/analytics',
          },
          {
            key: 'database',
            label: 'Database Solutions',
            description: 'Scalable cloud database infrastructure',
            icon: <Database className="w-5 h-5" />,
            href: '/products/database',
          },
          {
            key: 'cloud',
            label: 'Cloud Services',
            description: 'Deploy and scale your applications globally',
            icon: <Cloud className="w-5 h-5" />,
            href: '/products/cloud',
          },
        ],
      },
      {
        key: 'developers',
        label: 'Developers',
        icon: <Code className="w-4 h-4" />,
        children: [
          {
            key: 'api',
            label: 'API Reference',
            description: 'Complete API documentation and examples',
            icon: <FileText className="w-5 h-5" />,
            href: '/developers/api',
          },
          {
            key: 'sdk',
            label: 'SDK & Libraries',
            description: 'Official SDKs for popular languages',
            icon: <Layers className="w-5 h-5" />,
            href: '/developers/sdk',
          },
        ],
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
        href: '/settings',
      },
    ],
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: <Home className="w-4 h-4" />,
        href: '/',
      },
      {
        key: 'team',
        label: 'Team',
        icon: <Users className="w-4 h-4" />,
        children: [
          {
            key: 'members',
            label: 'Team Members',
            description: 'Manage your team and permissions',
            icon: <Users className="w-5 h-5" />,
            href: '/team/members',
          },
          {
            key: 'roles',
            label: 'Roles & Permissions',
            description: 'Configure access control and roles',
            icon: <Shield className="w-5 h-5" />,
            href: '/team/roles',
          },
        ],
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: <BarChart className="w-4 h-4" />,
        children: [
          {
            key: 'analytics',
            label: 'Analytics',
            description: 'View detailed analytics and metrics',
            icon: <BarChart className="w-5 h-5" />,
            href: '/reports/analytics',
          },
          {
            key: 'performance',
            label: 'Performance',
            description: 'Monitor system performance',
            icon: <Zap className="w-5 h-5" />,
            href: '/reports/performance',
          },
        ],
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
        href: '/settings',
      },
    ],
  },
}

export const DisabledItems: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: <Home className="w-4 h-4" />,
        href: '/',
      },
      {
        key: 'products',
        label: 'Products',
        icon: <Package className="w-4 h-4" />,
        children: [
          {
            key: 'analytics',
            label: 'Analytics',
            description: 'Get insights into your data',
            icon: <BarChart className="w-5 h-5" />,
            href: '/products/analytics',
          },
          {
            key: 'beta',
            label: 'Beta Features',
            description: 'Coming soon - Early access features',
            icon: <Zap className="w-5 h-5" />,
            disabled: true,
          },
        ],
      },
      {
        key: 'enterprise',
        label: 'Enterprise',
        icon: <Building className="w-4 h-4" />,
        disabled: true,
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
        href: '/settings',
      },
    ],
  },
}

export const LinksOnly: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        href: '/',
      },
      {
        key: 'about',
        label: 'About',
        href: '/about',
      },
      {
        key: 'services',
        label: 'Services',
        href: '/services',
      },
      {
        key: 'portfolio',
        label: 'Portfolio',
        href: '/portfolio',
      },
      {
        key: 'blog',
        label: 'Blog',
        href: '/blog',
      },
      {
        key: 'contact',
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
}

export const Complex: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: <Home className="w-4 h-4" />,
        href: '/',
      },
      {
        key: 'products',
        label: 'Products',
        icon: <Package className="w-4 h-4" />,
        children: [
          {
            key: 'analytics',
            label: 'Analytics Platform',
            description: 'Real-time data analysis and business intelligence',
            icon: <BarChart className="w-5 h-5" />,
            href: '/products/analytics',
          },
          {
            key: 'ecommerce',
            label: 'E-Commerce Suite',
            description: 'Complete solution for online stores',
            icon: <ShoppingCart className="w-5 h-5" />,
            href: '/products/ecommerce',
          },
          {
            key: 'payments',
            label: 'Payment Gateway',
            description: 'Secure payment processing worldwide',
            icon: <CreditCard className="w-5 h-5" />,
            href: '/products/payments',
          },
          {
            key: 'cloud',
            label: 'Cloud Infrastructure',
            description: 'Scalable hosting and deployment',
            icon: <Cloud className="w-5 h-5" />,
            href: '/products/cloud',
          },
          {
            key: 'beta',
            label: 'Beta Program',
            description: 'Early access to new features (Coming Soon)',
            icon: <Zap className="w-5 h-5" />,
            disabled: true,
          },
        ],
      },
      {
        key: 'developers',
        label: 'Developers',
        icon: <Code className="w-4 h-4" />,
        children: [
          {
            key: 'documentation',
            label: 'Documentation',
            description: 'Comprehensive guides and tutorials',
            icon: <BookOpen className="w-5 h-5" />,
            href: '/developers/docs',
          },
          {
            key: 'api',
            label: 'API Reference',
            description: 'Complete API documentation',
            icon: <FileText className="w-5 h-5" />,
            href: '/developers/api',
          },
          {
            key: 'sdk',
            label: 'SDKs & Libraries',
            description: 'Official libraries for all platforms',
            icon: <Layers className="w-5 h-5" />,
            href: '/developers/sdk',
          },
          {
            key: 'graphql',
            label: 'GraphQL API',
            description: 'Flexible GraphQL endpoint (Beta)',
            icon: <Database className="w-5 h-5" />,
            href: '/developers/graphql',
            disabled: true,
          },
        ],
      },
      {
        key: 'company',
        label: 'Company',
        icon: <Building className="w-4 h-4" />,
        children: [
          {
            key: 'about',
            label: 'About Us',
            description: 'Learn about our mission and values',
            icon: <Building className="w-5 h-5" />,
            href: '/company/about',
          },
          {
            key: 'blog',
            label: 'Blog',
            description: 'Latest news and updates',
            icon: <Globe className="w-5 h-5" />,
            href: '/company/blog',
          },
          {
            key: 'contact',
            label: 'Contact',
            description: 'Get in touch with our team',
            icon: <Mail className="w-5 h-5" />,
            href: '/company/contact',
          },
          {
            key: 'careers',
            label: 'Careers',
            description: 'Join our growing team',
            icon: <Users className="w-5 h-5" />,
            href: '/company/careers',
          },
        ],
      },
      {
        key: 'enterprise',
        label: 'Enterprise',
        icon: <Shield className="w-4 h-4" />,
        disabled: true,
      },
      {
        key: 'support',
        label: 'Support',
        icon: <HelpCircle className="w-4 h-4" />,
        href: '/support',
      },
    ],
  },
}
