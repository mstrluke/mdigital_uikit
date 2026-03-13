import type { Meta, StoryObj } from '@storybook/react'
import { Home, User, Settings, Bell, ShoppingCart, Mail, Calendar, FileText } from 'lucide-react'
import { useState } from 'react'
import Tabs from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
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
      description: 'Tab size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft', 'pill'],
      description: 'Visual style variant',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const basicTabs = [
  {
    key: 'home',
    label: 'Home',
    content: <div className="p-4">Welcome to the home section. This is where your main content lives.</div>,
  },
  {
    key: 'profile',
    label: 'Profile',
    content: <div className="p-4">View and edit your profile information here.</div>,
  },
  {
    key: 'settings',
    label: 'Settings',
    content: <div className="p-4">Manage your account settings and preferences.</div>,
  },
]

const tabsWithIcons = [
  {
    key: 'home',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    content: <div className="p-4">Welcome to the home section. This is where your main content lives.</div>,
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <User className="w-4 h-4" />,
    content: <div className="p-4">View and edit your profile information here.</div>,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    content: <div className="p-4">Manage your account settings and preferences.</div>,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-4 h-4" />,
    content: <div className="p-4">View your recent notifications and alerts.</div>,
  },
]

export const Default: Story = {
  args: {
    items: basicTabs,
    color: 'primary',
    size: 'md',
    variant: 'default',
  },
}


export const WithIcons: Story = {
  args: {
    items: tabsWithIcons,
    color: 'primary',
    variant: 'default',
  },
}

export const IconsOnly: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: '',
        icon: <Home className="w-5 h-5" />,
        content: <div className="p-4">Home content</div>,
      },
      {
        key: 'user',
        label: '',
        icon: <User className="w-5 h-5" />,
        content: <div className="p-4">User profile content</div>,
      },
      {
        key: 'settings',
        label: '',
        icon: <Settings className="w-5 h-5" />,
        content: <div className="p-4">Settings content</div>,
      },
      {
        key: 'notifications',
        label: '',
        icon: <Bell className="w-5 h-5" />,
        content: <div className="p-4">Notifications content</div>,
      },
    ],
    color: 'primary',
    variant: 'pill',
  },
}

export const WithDisabledTabs: Story = {
  args: {
    items: [
      {
        key: 'active1',
        label: 'Active',
        content: <div className="p-4">This tab is active and clickable.</div>,
      },
      {
        key: 'disabled',
        label: 'Disabled',
        content: <div className="p-4">This content is not accessible.</div>,
        disabled: true,
      },
      {
        key: 'active2',
        label: 'Another Active',
        content: <div className="p-4">This tab is also active.</div>,
      },
    ],
    color: 'primary',
  },
}

export const WithDefaultActive: Story = {
  args: {
    items: basicTabs,
    defaultActiveKey: 'settings',
    color: 'primary',
  },
}

export const ControlledMode: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('home')

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveKey('home')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Go to Home
          </button>
          <button
            onClick={() => setActiveKey('profile')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Go to Profile
          </button>
          <button
            onClick={() => setActiveKey('settings')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Go to Settings
          </button>
        </div>
        <div className="text-sm text-text-secondary">
          Current tab: <strong>{activeKey}</strong>
        </div>
        <Tabs
          items={basicTabs}
          activeKey={activeKey}
          onChange={setActiveKey}
          color="primary"
        />
      </div>
    )
  },
}

export const OverflowScrollDemo: Story = {
  name: 'Overflow Scroll (Auto-scroll to Active)',
  render: () => {
    const allTabs = [
      { key: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, content: <div className="p-4">Home content</div> },
      { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, content: <div className="p-4">Profile content</div> },
      { key: 'messages', label: 'Messages', icon: <Mail className="w-4 h-4" />, content: <div className="p-4">Messages content</div> },
      { key: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" />, content: <div className="p-4">Calendar content</div> },
      { key: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" />, content: <div className="p-4">Documents content</div> },
      { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, content: <div className="p-4">Settings content</div> },
      { key: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, content: <div className="p-4">Notifications content</div> },
      { key: 'cart', label: 'Shopping Cart', icon: <ShoppingCart className="w-4 h-4" />, content: <div className="p-4">Cart content</div> },
    ]

    const [activeKey, setActiveKey] = useState('home')

    return (
      <div className="space-y-4 max-w-md">
        <p className="text-sm text-text-secondary">
          Click buttons to jump to off-screen tabs — the tab list scrolls automatically.
        </p>
        <div className="flex flex-wrap gap-2">
          {allTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`px-3 py-1 text-xs rounded ${activeKey === tab.key ? 'bg-primary text-white' : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Tabs items={allTabs} activeKey={activeKey} onChange={setActiveKey} color="primary" />
      </div>
    )
  },
}

export const Dashboard: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <Tabs
        items={[
          {
            key: 'overview',
            label: 'Overview',
            icon: <Home className="w-4 h-4" />,
            content: (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <div className="text-sm text-text-secondary">Total Users</div>
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-xs text-success">+12% from last month</div>
                  </div>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <div className="text-sm text-text-secondary">Revenue</div>
                    <div className="text-2xl font-bold">$45,678</div>
                    <div className="text-xs text-success">+8% from last month</div>
                  </div>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <div className="text-sm text-text-secondary">Active Sessions</div>
                    <div className="text-2xl font-bold">567</div>
                    <div className="text-xs text-error">-3% from last hour</div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: 'users',
            label: 'Users',
            icon: <User className="w-4 h-4" />,
            content: (
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-surface rounded border border-border">
                    <span className="font-medium">John Doe</span>
                    <span className="text-sm text-text-secondary">john@example.com</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded border border-border">
                    <span className="font-medium">Jane Smith</span>
                    <span className="text-sm text-text-secondary">jane@example.com</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded border border-border">
                    <span className="font-medium">Bob Johnson</span>
                    <span className="text-sm text-text-secondary">bob@example.com</span>
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: 'orders',
            label: 'Orders',
            icon: <ShoppingCart className="w-4 h-4" />,
            content: (
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-surface rounded border border-border">
                    <div>
                      <div className="font-medium">Order #1234</div>
                      <div className="text-sm text-text-secondary">2 items</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$89.99</div>
                      <div className="text-xs text-success">Delivered</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded border border-border">
                    <div>
                      <div className="font-medium">Order #1235</div>
                      <div className="text-sm text-text-secondary">5 items</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$234.50</div>
                      <div className="text-xs text-warning">Processing</div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        color="primary"
        variant="default"
        size="md"
      />
    </div>
  ),
}

export const UserSettings: Story = {
  render: () => (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold mb-4">User Settings</h2>
      <Tabs
        items={[
          {
            key: 'profile',
            label: 'Profile',
            icon: <User className="w-4 h-4" />,
            content: (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Software developer passionate about UI/UX design."
                    className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Save Changes
                </button>
              </div>
            ),
          },
          {
            key: 'notifications',
            label: 'Notifications',
            icon: <Bell className="w-4 h-4" />,
            content: (
              <div className="p-6 space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <div>
                    <div className="font-medium">Email notifications</div>
                    <div className="text-sm text-text-secondary">Receive email about your account activity</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <div>
                    <div className="font-medium">Push notifications</div>
                    <div className="text-sm text-text-secondary">Receive push notifications on your device</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <div>
                    <div className="font-medium">SMS notifications</div>
                    <div className="text-sm text-text-secondary">Receive text messages about important updates</div>
                  </div>
                </label>
              </div>
            ),
          },
          {
            key: 'privacy',
            label: 'Privacy',
            icon: <Settings className="w-4 h-4" />,
            content: (
              <div className="p-6 space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <div>
                    <div className="font-medium">Public profile</div>
                    <div className="text-sm text-text-secondary">Make your profile visible to everyone</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <div>
                    <div className="font-medium">Show email</div>
                    <div className="text-sm text-text-secondary">Display your email on your profile</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <div>
                    <div className="font-medium">Activity status</div>
                    <div className="text-sm text-text-secondary">Show when you're online</div>
                  </div>
                </label>
              </div>
            ),
          },
        ]}
        color="primary"
        variant="pill"
        size="md"
      />
    </div>
  ),
}

// Color × Variant Matrix
export const ColorVariantMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft', 'pill'] as const

    return (
      <div className="space-y-8">
        {variants.map((v) => (
          <div key={v}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{v} Variant</h3>
            <div className="space-y-4">
              {colors.map((c) => (
                <Tabs
                  key={c}
                  items={[
                    { key: '1', label: `${c} Tab 1`, content: <div className="p-4">Content for {c} {v} Tab 1</div> },
                    { key: '2', label: `${c} Tab 2`, content: <div className="p-4">Content for {c} {v} Tab 2</div> },
                    { key: '3', label: `${c} Tab 3`, content: <div className="p-4">Content for {c} {v} Tab 3</div> },
                  ]}
                  color={c}
                  variant={v}
                  size="md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// Mobile Responsive Test
export const MobileResponsiveTest: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Many Tabs (Test Overflow & Positioning)</h3>
        <div className="border border-border rounded-lg p-4">
          <Tabs
            items={[
              { key: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, content: <div className="p-4">Home content</div> },
              { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, content: <div className="p-4">Profile content</div> },
              { key: 'messages', label: 'Messages', icon: <Mail className="w-4 h-4" />, content: <div className="p-4">Messages content</div> },
              { key: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" />, content: <div className="p-4">Calendar content</div> },
              { key: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" />, content: <div className="p-4">Documents content</div> },
              { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, content: <div className="p-4">Settings content</div> },
              { key: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, content: <div className="p-4">Notifications content</div> },
              { key: 'cart', label: 'Shopping Cart', icon: <ShoppingCart className="w-4 h-4" />, content: <div className="p-4">Cart content</div> },
            ]}
            color="primary"
            variant="default"
            size="md"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Pills on Mobile</h3>
        <div className="border border-border rounded-lg p-4">
          <Tabs
            items={[
              { key: 'all', label: 'All Items', content: <div className="p-4">All items</div> },
              { key: 'active', label: 'Active', content: <div className="p-4">Active items</div> },
              { key: 'completed', label: 'Completed', content: <div className="p-4">Completed items</div> },
              { key: 'archived', label: 'Archived', content: <div className="p-4">Archived items</div> },
            ]}
            color="primary"
            variant="pill"
            size="md"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Different Sizes (Resize Window to Test)</h3>
        <div className="space-y-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="border border-border rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Size: {size}</div>
              <Tabs
                items={[
                  { key: 'tab1', label: 'Tab One', content: <div className="p-4">Content 1</div> },
                  { key: 'tab2', label: 'Tab Two', content: <div className="p-4">Content 2</div> },
                  { key: 'tab3', label: 'Tab Three', content: <div className="p-4">Content 3</div> },
                  { key: 'tab4', label: 'Tab Four', content: <div className="p-4">Content 4</div> },
                ]}
                color="primary"
                variant="default"
                size={size}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-warning/10 border border-warning rounded">
        <p className="text-sm">
          <strong>Test Instructions:</strong>
          <br />
          1. Resize your browser window to test mobile/tablet/desktop breakpoints
          <br />
          2. Rotate your device (portrait ↔ landscape)
          <br />
          3. Click different tabs and verify the indicator animates smoothly to the correct position
          <br />
          4. Zoom in/out using browser zoom (Cmd/Ctrl + Plus/Minus)
          <br />
          5. Change system font size and verify indicator follows tab
        </p>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

