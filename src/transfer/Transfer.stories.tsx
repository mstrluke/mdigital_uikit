import type { Meta, StoryObj } from '@storybook/react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Star,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Database,
  Settings,
  Shield,
  Globe,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { Transfer } from './index'
import type { TransferItem } from './types'

const meta: Meta<typeof Transfer> = {
  title: 'Data Entry/Transfer',
  component: Transfer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the transfer component',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search boxes',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show select all checkboxes',
    },
    oneWay: {
      control: 'boolean',
      description: 'Only allow moving items to the right',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the transfer',
    },
    listHeight: {
      control: 'number',
      description: 'Height of the lists',
    },
  },
}

export default meta
type Story = StoryObj<typeof Transfer>

// Basic data
const basicData: TransferItem[] = [
  { key: '1', label: 'Item 1' },
  { key: '2', label: 'Item 2' },
  { key: '3', label: 'Item 3' },
  { key: '4', label: 'Item 4' },
  { key: '5', label: 'Item 5' },
  { key: '6', label: 'Item 6' },
  { key: '7', label: 'Item 7' },
  { key: '8', label: 'Item 8' },
]

// User data
const userData: TransferItem[] = [
  { key: 'user1', label: 'Alice Johnson', description: 'Frontend Developer' },
  { key: 'user2', label: 'Bob Smith', description: 'Backend Developer' },
  { key: 'user3', label: 'Charlie Brown', description: 'DevOps Engineer' },
  { key: 'user4', label: 'Diana Prince', description: 'UI/UX Designer' },
  { key: 'user5', label: 'Eve Davis', description: 'Product Manager' },
  { key: 'user6', label: 'Frank Miller', description: 'QA Engineer' },
  { key: 'user7', label: 'Grace Lee', description: 'Data Scientist' },
  { key: 'user8', label: 'Henry Wilson', description: 'Security Specialist' },
  { key: 'user9', label: 'Ivy Chen', description: 'Mobile Developer' },
  { key: 'user10', label: 'Jack Turner', description: 'Tech Lead' },
]

// Feature data
const featureData: TransferItem[] = [
  { key: 'auth', label: 'Authentication', description: 'User login and registration' },
  { key: 'dashboard', label: 'Dashboard', description: 'Analytics and metrics' },
  { key: 'reporting', label: 'Reporting', description: 'Generate reports' },
  { key: 'notifications', label: 'Notifications', description: 'Email and push notifications' },
  { key: 'search', label: 'Search', description: 'Full-text search' },
  { key: 'export', label: 'Export', description: 'Export data to CSV/Excel' },
  { key: 'api', label: 'API Access', description: 'REST API endpoints' },
  { key: 'webhooks', label: 'Webhooks', description: 'Event-driven webhooks' },
  { key: 'sso', label: 'SSO', description: 'Single sign-on integration' },
  { key: 'audit', label: 'Audit Logs', description: 'Track user actions' },
]

// File data
const fileData: TransferItem[] = [
  { key: 'doc1', label: 'Project Proposal.pdf', description: '2.5 MB • PDF' },
  { key: 'doc2', label: 'Annual Report.docx', description: '1.2 MB • Word' },
  { key: 'img1', label: 'Logo Design.png', description: '450 KB • Image' },
  { key: 'img2', label: 'Hero Banner.jpg', description: '1.8 MB • Image' },
  { key: 'vid1', label: 'Tutorial Video.mp4', description: '25 MB • Video' },
  { key: 'music1', label: 'Background Music.mp3', description: '4.5 MB • Audio' },
  { key: 'code1', label: 'main.tsx', description: '15 KB • TypeScript' },
  { key: 'code2', label: 'styles.css', description: '8 KB • CSS' },
]

// Permission data
const permissionData: TransferItem[] = [
  { key: 'read', label: 'Read', description: 'View content' },
  { key: 'write', label: 'Write', description: 'Create and edit content' },
  { key: 'delete', label: 'Delete', description: 'Remove content' },
  { key: 'share', label: 'Share', description: 'Share with others' },
  { key: 'admin', label: 'Admin', description: 'Full administrative access' },
  { key: 'export_data', label: 'Export Data', description: 'Download data exports' },
  { key: 'manage_users', label: 'Manage Users', description: 'Add/remove users' },
  { key: 'billing', label: 'Billing', description: 'Access billing settings' },
]

// Large dataset
const generateLargeDataset = (count: number): TransferItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    label: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }))
}

export const Default: Story = {
  args: {
    dataSource: basicData,
    titles: ['Source', 'Target'],
    size: 'md',
  },
}


export const WithSearch: Story = {
  render: () => (
    <Transfer
      dataSource={userData}
      showSearch
      searchPlaceholder="Search users..."
      titles={['Available Users', 'Selected Users']}
      listHeight={300}
    />
  ),
}

export const WithDefaultSelection: Story = {
  render: () => (
    <Transfer
      dataSource={userData}
      defaultTargetKeys={['user1', 'user3', 'user5']}
      titles={['Available Users', 'Selected Users']}
      showSearch
    />
  ),
}

export const ControlledSelection: Story = {
  render: () => {
    const [targetKeys, setTargetKeys] = useState<string[]>(['user2', 'user4'])

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md"
            onClick={() => setTargetKeys(['user1', 'user2', 'user3'])}
          >
            Select First 3
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md"
            onClick={() => setTargetKeys(userData.slice(0, 5).map(u => u.key))}
          >
            Select First 5
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-surface text-text-primary rounded-md"
            onClick={() => setTargetKeys([])}
          >
            Clear All
          </button>
        </div>
        <Transfer
          dataSource={userData}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          titles={['Available', 'Selected']}
          showSearch
        />
        <div className="text-sm text-text-muted">
          Selected: {targetKeys.length} user(s)
        </div>
      </div>
    )
  },
}

export const OneWayTransfer: Story = {
  render: () => (
    <Transfer
      dataSource={featureData}
      oneWay
      titles={['Available Features', 'Enabled Features']}
      showSearch
      label="Feature Selection"
      helperText="Select features to enable (one-way only)"
    />
  ),
}

export const WithDisabledItems: Story = {
  render: () => {
    const dataWithDisabled: TransferItem[] = [
      { key: '1', label: 'Item 1', description: 'Available' },
      { key: '2', label: 'Item 2 (locked)', description: 'Disabled', disabled: true },
      { key: '3', label: 'Item 3', description: 'Available' },
      { key: '4', label: 'Item 4 (locked)', description: 'Disabled', disabled: true },
      { key: '5', label: 'Item 5', description: 'Available' },
      { key: '6', label: 'Item 6', description: 'Available' },
    ]

    return (
      <Transfer
        dataSource={dataWithDisabled}
        titles={['Source', 'Target']}
        listHeight={250}
      />
    )
  },
}





export const TeamAssignment: Story = {
  render: () => {
    const [assignedUsers, setAssignedUsers] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Project Team Assignment</h3>
          <p className="text-sm text-text-muted">
            Select team members for the new project
          </p>
        </div>
        <Transfer
          dataSource={userData}
          targetKeys={assignedUsers}
          onChange={(keys) => setAssignedUsers(keys)}
          titles={['Available Members', 'Project Team']}
          showSearch
          searchPlaceholder="Search members..."
          render={(item) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {item.label.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.label}</div>
                <div className="text-xs text-text-muted truncate">{item.description}</div>
              </div>
            </div>
          )}
          footer={({ direction }) => (
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">
                {direction === 'left' ? 'Available' : 'Assigned'}
              </span>
              <span className="text-xs font-medium">
                {direction === 'left'
                  ? userData.length - assignedUsers.length
                  : assignedUsers.length} members
              </span>
            </div>
          )}
        />
        {assignedUsers.length > 0 && (
          <div className="bg-success/10 border border-success p-4 rounded-lg">
            <p className="text-sm font-medium text-success">
              {assignedUsers.length} team member(s) assigned to project
            </p>
          </div>
        )}
      </div>
    )
  },
}

export const PermissionManager: Story = {
  render: () => {
    const [grantedPermissions, setGrantedPermissions] = useState<string[]>(['read'])

    return (
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">User Permissions</h3>
          <p className="text-sm text-text-muted">
            Grant or revoke permissions for user: john.doe@example.com
          </p>
        </div>
        <Transfer
          dataSource={permissionData}
          targetKeys={grantedPermissions}
          onChange={(keys) => setGrantedPermissions(keys)}
          titles={['Available Permissions', 'Granted Permissions']}
          showSearch={false}
          render={(item) => (
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-text-muted">{item.description}</div>
              </div>
            </div>
          )}
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            disabled={grantedPermissions.length === 0}
          >
            Save Permissions
          </button>
          <button
            className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-surface/80"
            onClick={() => setGrantedPermissions(['read'])}
          >
            Reset to Default
          </button>
        </div>
      </div>
    )
  },
}

export const FileTransfer: Story = {
  render: () => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])

    const getFileIcon = (key: string) => {
      if (key.startsWith('doc')) return <FileText className="w-5 h-5 text-blue-500" />
      if (key.startsWith('img')) return <Image className="w-5 h-5 text-green-500" />
      if (key.startsWith('vid')) return <Video className="w-5 h-5 text-red-500" />
      if (key.startsWith('music')) return <Music className="w-5 h-5 text-purple-500" />
      if (key.startsWith('code')) return <Code className="w-5 h-5 text-cyan-500" />
      return <FileText className="w-5 h-5" />
    }

    return (
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">File Upload</h3>
          <p className="text-sm text-text-muted">
            Select files to upload to the cloud
          </p>
        </div>
        <Transfer
          dataSource={fileData}
          targetKeys={selectedFiles}
          onChange={(keys) => setSelectedFiles(keys)}
          titles={['Local Files', 'Upload Queue']}
          showSearch
          searchPlaceholder="Search files..."
          oneWay
          render={(item) => (
            <div className="flex items-center gap-3">
              {getFileIcon(item.key)}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.label}</div>
                <div className="text-xs text-text-muted">{item.description}</div>
              </div>
            </div>
          )}
          footer={({ direction }) => (
            <div className="text-xs text-text-muted">
              {direction === 'left'
                ? `${fileData.length - selectedFiles.length} files`
                : `${selectedFiles.length} files • Ready to upload`}
            </div>
          )}
        />
        {selectedFiles.length > 0 && (
          <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center justify-center gap-2">
            <Truck className="w-4 h-4" />
            Upload {selectedFiles.length} File(s)
          </button>
        )}
      </div>
    )
  },
}





