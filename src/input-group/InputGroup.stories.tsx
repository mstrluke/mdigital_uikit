import type { Meta, StoryObj } from '@storybook/react'
import {
  Search,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  AtSign,
  Hash,
} from 'lucide-react'
import InputGroup, { InputGroupInput, InputGroupAddon } from './index'

const meta: Meta<typeof InputGroup> = {
  title: 'Data Entry/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'InputGroup automatically positions addons based on their order in children. Addons before the input appear on the left, addons after appear on the right.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Primary: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter text..." />
      <InputGroupAddon>
        <Search size={16} />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const BasicUsage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* Right addon - addon comes after input */}
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search size={16} />
        </InputGroupAddon>
      </InputGroup>

      {/* Left addon - addon comes before input */}
      <InputGroup>
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Email address" />
      </InputGroup>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <User size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Username" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
        <InputGroupInput type="email" placeholder="Email address" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Lock size={16} />
        </InputGroupAddon>
        <InputGroupInput type="password" placeholder="Password" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Phone size={16} />
        </InputGroupAddon>
        <InputGroupInput type="tel" placeholder="Phone number" />
      </InputGroup>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <span className="text-sm font-medium">https://</span>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Enter amount" />
        <InputGroupAddon>
          <span className="text-sm font-medium">USD</span>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <span className="text-sm">@</span>
        </InputGroupAddon>
        <InputGroupInput placeholder="username" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <DollarSign size={16} />
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="0.00" />
      </InputGroup>
    </div>
  ),
}

export const WithButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <button
            type="button"
            className="px-3 py-1 bg-primary text-background rounded text-sm font-medium hover:bg-primary/90 pointer-events-auto"
          >
            Search
          </button>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Enter email..." />
        <InputGroupAddon>
          <button
            type="button"
            className="px-3 py-1 bg-success text-background rounded text-sm font-medium hover:bg-success/90 pointer-events-auto"
          >
            Send
          </button>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <button
            type="button"
            className="px-3 py-1 bg-surface border border-border rounded text-sm font-medium hover:bg-surface/80 pointer-events-auto"
          >
            Select
          </button>
        </InputGroupAddon>
        <InputGroupInput placeholder="Choose file..." />
      </InputGroup>
    </div>
  ),
}

export const BothSides: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <Search size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search products..." />
        <InputGroupAddon>
          <span className="text-xs text-text-secondary">Ctrl+K</span>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Globe size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="example" />
        <InputGroupAddon>
          <span className="text-sm">.com</span>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <DollarSign size={16} />
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="0.00" />
        <InputGroupAddon>
          <select className="text-sm bg-transparent outline-none cursor-pointer pointer-events-auto">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const SearchExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <Search size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search products..." />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search size={16} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <button
            type="button"
            className="px-3 py-1.5 bg-primary text-background rounded text-sm font-medium hover:bg-primary/90 pointer-events-auto"
          >
            Search
          </button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const RegistrationForm: Story = {
  render: () => (
    <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Create Account
      </h2>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Full Name
        </label>
        <InputGroup>
          <InputGroupAddon>
            <User size={16} />
          </InputGroupAddon>
          <InputGroupInput placeholder="John Doe" />
        </InputGroup>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Email
        </label>
        <InputGroup>
          <InputGroupAddon>
            <Mail size={16} />
          </InputGroupAddon>
          <InputGroupInput type="email" placeholder="john@example.com" />
        </InputGroup>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Username
        </label>
        <InputGroup>
          <InputGroupAddon>
            <AtSign size={16} />
          </InputGroupAddon>
          <InputGroupInput placeholder="johndoe" />
        </InputGroup>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Password
        </label>
        <InputGroup>
          <InputGroupAddon>
            <Lock size={16} />
          </InputGroupAddon>
          <InputGroupInput type="password" placeholder="Create password" />
        </InputGroup>
      </div>

      <button
        type="button"
        className="w-full h-12 bg-primary text-background rounded-md font-medium hover:bg-primary/90"
      >
        Sign Up
      </button>
    </div>
  ),
}

