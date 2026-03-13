import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRight, Download, ExternalLink as ExternalLinkIcon, Github } from 'lucide-react'
import Link from './index'

const meta: Meta<typeof Link> = {
  title: 'General/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Link color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Link size',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Underline behavior',
    },
    external: {
      control: 'boolean',
      description: 'Whether the link is external',
    },
    showExternalIcon: {
      control: 'boolean',
      description: 'Show external link icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Link>

// Basic Examples

export const Primary: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link Example',
    color: 'primary',
    size: 'md',
  },
}


// Underline Variants

export const WithUnderline: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-text-secondary mb-2">Always underlined</p>
        <Link href="#" underline="always" color="primary">
          This link is always underlined
        </Link>
      </div>
      <div>
        <p className="text-sm text-text-secondary mb-2">Underline on hover (default)</p>
        <Link href="#" underline="hover" color="primary">
          Hover to see underline
        </Link>
      </div>
      <div>
        <p className="text-sm text-text-secondary mb-2">No underline</p>
        <Link href="#" underline="none" color="primary">
          This link has no underline
        </Link>
      </div>
    </div>
  ),
}

// External Links

export const External: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Link href="https://example.com" external>
        External Link (with icon)
      </Link>
      <Link href="https://example.com" external showExternalIcon={false}>
        External Link (no icon)
      </Link>
      <Link href="https://github.com" external color="primary">
        Visit GitHub
      </Link>
      <Link href="https://docs.example.com" external color="info">
        Read Documentation
      </Link>
    </div>
  ),
}

// With Icons

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Link href="#" leftIcon={<Github />} color="primary">
        GitHub Repository
      </Link>
      <Link href="#" rightIcon={<ArrowRight />} color="primary">
        Learn More
      </Link>
      <Link href="#" leftIcon={<Download />} color="success">
        Download File
      </Link>
      <Link href="#" leftIcon={<ExternalLinkIcon />} rightIcon={<ArrowRight />} color="accent">
        With Both Icons
      </Link>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true,
    children: 'Disabled Link',
    color: 'primary',
  },
}

// In Context

export const InParagraph: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <p className="text-base leading-relaxed">
        This is a paragraph of text with an{' '}
        <Link href="#" color="primary">
          inline link
        </Link>{' '}
        that flows naturally within the content. You can also include{' '}
        <Link href="https://example.com" external>
          external links
        </Link>{' '}
        that open in new tabs.
      </p>
      <p className="text-base leading-relaxed">
        Links can have different{' '}
        <Link href="#" color="success">
          colors
        </Link>
        , different{' '}
        <Link href="#" underline="always" color="error">
          underline styles
        </Link>
        , and can include{' '}
        <Link href="#" leftIcon={<Github />} color="primary">
          icons
        </Link>{' '}
        for better visual context.
      </p>
    </div>
  ),
}

// Real-World Examples

export const NavigationLinks: Story = {
  render: () => (
    <nav className="flex gap-6">
      <Link href="#" underline="none">
        Home
      </Link>
      <Link href="#" underline="none">
        Products
      </Link>
      <Link href="#" underline="none">
        About
      </Link>
      <Link href="#" underline="none">
        Contact
      </Link>
    </nav>
  ),
}

export const FooterLinks: Story = {
  render: () => (
    <footer className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <div className="flex flex-col gap-2">
            <Link href="#" size="sm" underline="none">
              Features
            </Link>
            <Link href="#" size="sm" underline="none">
              Pricing
            </Link>
            <Link href="#" size="sm" underline="none">
              Documentation
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <div className="flex flex-col gap-2">
            <Link href="#" size="sm" underline="none">
              About
            </Link>
            <Link href="#" size="sm" underline="none">
              Blog
            </Link>
            <Link href="#" size="sm" underline="none">
              Careers
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <div className="flex flex-col gap-2">
            <Link href="#" size="sm" underline="none">
              Support
            </Link>
            <Link href="#" size="sm" underline="none">
              Contact
            </Link>
            <Link href="#" size="sm" underline="none">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
}

export const CallToActionLinks: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-6 bg-surface rounded-lg">
        <h2 className="text-xl font-bold mb-2">Get Started Today</h2>
        <p className="text-text-secondary mb-4">
          Sign up for free and explore all features.
        </p>
        <Link href="#" rightIcon={<ArrowRight />} color="primary" size="lg">
          Start Free Trial
        </Link>
      </div>
      <div className="p-6 bg-surface rounded-lg">
        <h2 className="text-xl font-bold mb-2">Download Our App</h2>
        <p className="text-text-secondary mb-4">
          Available on iOS and Android.
        </p>
        <Link href="#" leftIcon={<Download />} color="success" size="lg">
          Download Now
        </Link>
      </div>
    </div>
  ),
}

export const DocumentationLinks: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Getting Started</h3>
        <p className="text-sm text-text-secondary mb-3">
          Learn how to install and configure the library.
        </p>
        <Link href="#" rightIcon={<ArrowRight />} color="primary" size="sm">
          Read Guide
        </Link>
      </div>
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-2">API Reference</h3>
        <p className="text-sm text-text-secondary mb-3">
          Comprehensive API documentation with examples.
        </p>
        <Link href="https://api.example.com" external color="info" size="sm">
          View API Docs
        </Link>
      </div>
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-2">GitHub Repository</h3>
        <p className="text-sm text-text-secondary mb-3">
          Contribute or report issues on GitHub.
        </p>
        <Link href="https://github.com" leftIcon={<Github />} external color="primary" size="sm">
          View on GitHub
        </Link>
      </div>
    </div>
  ),
}

