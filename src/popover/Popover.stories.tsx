import type { Meta, StoryObj } from '@storybook/react'
import { Settings, User, LogOut, Mail, Calendar, X } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from './index'
import Button from '../button'
import { useState } from 'react'

const meta: Meta<typeof Popover> = {
  title: 'Data Display/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    modal: {
      control: 'boolean',
      description: 'Whether to render in modal mode',
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Popover Title</h4>
          <p className="text-sm text-text-secondary">
            This is a simple popover with some content inside.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Edit Profile</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Edit Profile</h4>
              <p className="text-xs text-text-secondary">
                Update your profile information
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-border rounded-md"
                placeholder="Enter your name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost">Cancel</Button>
              <Button size="sm" color="primary">Save</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const UserMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" leftIcon={<User />}>
          John Doe
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="p-3 border-b border-border">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-text-secondary">john@example.com</p>
        </div>
        <div className="p-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface rounded-sm">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface rounded-sm">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface rounded-sm">
            <Mail className="w-4 h-4" />
            Messages
          </button>
          <div className="h-px bg-border my-1" />
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const DatePicker: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" leftIcon={<Calendar />}>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">
                {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-xs font-medium text-center p-2 text-text-secondary">
                  {day}
                </div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(today.getFullYear(), today.getMonth(), day))}
                  className="text-sm p-2 hover:bg-surface rounded-md text-center"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const ControlledPopover: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setOpen(true)}>Open Popover</Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Close Popover</Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>Toggle Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Controlled Popover</h4>
              <p className="text-sm text-text-secondary">
                This popover can be controlled programmatically
              </p>
              <Button size="sm" fullWidth onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
}

export const WithCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 p-1 hover:bg-surface rounded-sm"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="space-y-2 pr-6">
            <h4 className="font-medium text-sm">Popover with Close Button</h4>
            <p className="text-sm text-text-secondary">
              Click the X button to close this popover
            </p>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const RichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>View Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-base mb-1">Feature Overview</h4>
            <p className="text-sm text-text-secondary">
              Learn more about this powerful feature
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <div>
                <h5 className="font-medium text-sm">Easy to Use</h5>
                <p className="text-xs text-text-secondary">Simple and intuitive interface</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <div>
                <h5 className="font-medium text-sm">Powerful Features</h5>
                <p className="text-xs text-text-secondary">Everything you need in one place</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <div>
                <h5 className="font-medium text-sm">Fast Performance</h5>
                <p className="text-xs text-text-secondary">Optimized for speed</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" color="primary" fullWidth>Get Started</Button>
            <Button size="sm" variant="outline" fullWidth>Learn More</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const NoPortal: Story = {
  render: () => (
    <div className="relative p-6 rounded-lg border border-border overflow-hidden" style={{ height: 200 }}>
      <p className="text-sm text-text-secondary mb-4">
        The popover renders <strong>inline</strong> (no portal) so it's clipped by this
        container's <code>overflow: hidden</code>. Useful when you need the popover to participate
        in the parent's stacking context.
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm">No Portal</Button>
        </PopoverTrigger>
        <PopoverContent portal={false}>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Inline Popover</h4>
            <p className="text-sm text-text-secondary">
              This content is rendered without a React Portal.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const ColorVariantMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft'] as const

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-4 capitalize">{variant} Variant</h3>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <Popover key={`${variant}-${color}`}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {color}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent color={color} variant={variant}>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm capitalize">{color}</h4>
                      <p className="text-sm text-text-secondary">
                        {variant} variant popover
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

