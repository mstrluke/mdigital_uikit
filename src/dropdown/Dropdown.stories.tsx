import type { Meta, StoryObj } from '@storybook/react'
import {
  Settings,
  User,
  LogOut,
  Mail,
  Bell,
  Download,
  Trash2,
  Edit,
  Copy,
  Share2,
  MoreVertical,
  ChevronDown
} from 'lucide-react'
import Dropdown from './index'
import Button from '../button'
import Badge from '../badge'

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of dropdown items',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Dropdown item size',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Alignment of the dropdown menu',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable dropdown functionality',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width dropdown',
    },
    hover: {
      control: 'boolean',
      description: 'Open on hover instead of click',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of dropdown content',
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const basicItems = [
  { label: 'Profile', value: 'profile', icon: <User className="w-4 h-4" /> },
  { label: 'Settings', value: 'settings', icon: <Settings className="w-4 h-4" /> },
  { label: 'Messages', value: 'messages', icon: <Mail className="w-4 h-4" /> },
  { label: 'Logout', value: 'logout', icon: <LogOut className="w-4 h-4" /> },
]

export const Default: Story = {
  args: {
    items: basicItems,
    children: <Button>Open Dropdown</Button>,
  },
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown
      items={[
        { label: 'Download', value: 'download', icon: <Download className="w-4 h-4" /> },
        { label: 'Edit', value: 'edit', icon: <Edit className="w-4 h-4" /> },
        { label: 'Copy', value: 'copy', icon: <Copy className="w-4 h-4" /> },
        { label: 'Share', value: 'share', icon: <Share2 className="w-4 h-4" /> },
        { label: 'Delete', value: 'delete', icon: <Trash2 className="w-4 h-4" /> },
      ]}
    >
      <Button rightIcon={<ChevronDown className="w-4 h-4" />}>Actions</Button>
    </Dropdown>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown
      items={[
        { label: 'View', value: 'view', icon: <User className="w-4 h-4" /> },
        { label: 'Edit', value: 'edit', icon: <Edit className="w-4 h-4" /> },
        { label: 'Archive', value: 'archive', icon: <Download className="w-4 h-4" />, disabled: true },
        { label: 'Delete', value: 'delete', icon: <Trash2 className="w-4 h-4" />, disabled: true },
      ]}
    >
      <Button rightIcon={<ChevronDown className="w-4 h-4" />}>Options</Button>
    </Dropdown>
  ),
}

export const IconButton: Story = {
  render: () => (
    <Dropdown
      items={[
        { label: 'Edit', value: 'edit', icon: <Edit className="w-4 h-4" /> },
        { label: 'Copy', value: 'copy', icon: <Copy className="w-4 h-4" /> },
        { label: 'Delete', value: 'delete', icon: <Trash2 className="w-4 h-4" /> },
      ]}
    >
      <Button variant="ghost" size="sm">
        <MoreVertical className="w-4 h-4" />
      </Button>
    </Dropdown>
  ),
}

export const HoverTrigger: Story = {
  render: () => (
    <Dropdown
      items={basicItems}
      hover
    >
      <Button variant="ghost">Hover over me</Button>
    </Dropdown>
  ),
}

export const CustomMaxHeight: Story = {
  render: () => {
    const manyItems = Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    }))

    return (
      <Dropdown items={manyItems} maxHeight={200}>
        <Button rightIcon={<ChevronDown className="w-4 h-4" />}>
          Max Height 200px
        </Button>
      </Dropdown>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown items={basicItems}>
        <Button rightIcon={<ChevronDown className="w-4 h-4" />}>Enabled</Button>
      </Dropdown>
      <Dropdown items={basicItems} disabled>
        <Button disabled rightIcon={<ChevronDown className="w-4 h-4" />}>
          Disabled
        </Button>
      </Dropdown>
    </div>
  ),
}

export const CustomRender: Story = {
  render: () => (
    <Dropdown
      render={({ close }) => (
        <div className="p-4 space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-1">User Profile</h4>
            <p className="text-xs text-text-secondary">john@example.com</p>
          </div>
          <div className="space-y-1">
            <button
              className="w-full text-left px-3 py-2 text-sm hover:bg-surface rounded-sm"
              onClick={close}
            >
              View Profile
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm hover:bg-surface rounded-sm"
              onClick={close}
            >
              Account Settings
            </button>
          </div>
          <div className="pt-2 border-t border-border">
            <button
              className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 rounded-sm"
              onClick={close}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    >
      <Button variant="ghost" leftIcon={<User className="w-4 h-4" />}>
        John Doe
      </Button>
    </Dropdown>
  ),
}

export const WithSeparators: Story = {
  render: () => (
    <Dropdown
      render={({ close }) => (
        <div className="py-1">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface"
            onClick={close}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface"
            onClick={close}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="h-px bg-border my-1" />
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface"
            onClick={close}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface"
            onClick={close}
          >
            <Mail className="w-4 h-4" />
            Messages
          </button>
          <div className="h-px bg-border my-1" />
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/10"
            onClick={close}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    >
      <Button variant="ghost" rightIcon={<ChevronDown className="w-4 h-4" />}>
        Menu
      </Button>
    </Dropdown>
  ),
}

export const TableRowActions: Story = {
  render: () => (
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface">
          <tr>
            <th className="text-left px-4 py-3 text-sm font-medium">Name</th>
            <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
            <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
            <th className="text-right px-4 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-3 text-sm">Project {i}</td>
              <td className="px-4 py-3 text-sm">
                <Badge color="success" size="sm">Active</Badge>
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary">2024-01-{10 + i}</td>
              <td className="px-4 py-3 text-right">
                <Dropdown
                  items={[
                    { label: 'Edit', value: 'edit', icon: <Edit className="w-4 h-4" /> },
                    { label: 'Copy', value: 'copy', icon: <Copy className="w-4 h-4" /> },
                    { label: 'Delete', value: 'delete', icon: <Trash2 className="w-4 h-4" /> },
                  ]}
                  position="right"
                  size="sm"
                >
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
