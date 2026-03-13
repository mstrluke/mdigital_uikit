import type { Meta, StoryObj } from '@storybook/react'
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  Image,
  Music,
  Video,
  Archive,
  Code,
  Database,
  Settings,
  Users,
  Home,
  Box,
  Package,
} from 'lucide-react'
import { useState } from 'react'
import Tree from './index'

const meta: Meta<typeof Tree> = {
  title: 'Data Display/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of tree items',
    },
    checkable: {
      control: 'boolean',
      description: 'Enable checkboxes for items',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable item selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all tree interactions',
    },
    showLine: {
      control: 'boolean',
      description: 'Show connecting lines between items',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show custom icons for items',
    },
    defaultExpandAll: {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tree>

// Basic file tree structure
const fileTreeData = [
  {
    key: 'root',
    label: 'Project Root',
    icon: <Folder className="w-4 h-4 text-blue-500" />,
    children: [
      {
        key: 'src',
        label: 'src',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'components',
            label: 'components',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              {
                key: 'button.tsx',
                label: 'Button.tsx',
                icon: <Code className="w-4 h-4 text-cyan-500" />,
                isLeaf: true,
              },
              {
                key: 'input.tsx',
                label: 'Input.tsx',
                icon: <Code className="w-4 h-4 text-cyan-500" />,
                isLeaf: true,
              },
            ],
          },
          {
            key: 'utils',
            label: 'utils',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              {
                key: 'helpers.ts',
                label: 'helpers.ts',
                icon: <FileText className="w-4 h-4 text-yellow-500" />,
                isLeaf: true,
              },
            ],
          },
        ],
      },
      {
        key: 'public',
        label: 'public',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'assets',
            label: 'assets',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              {
                key: 'logo.png',
                label: 'logo.png',
                icon: <Image className="w-4 h-4 text-green-500" />,
                isLeaf: true,
              },
            ],
          },
        ],
      },
      {
        key: 'package.json',
        label: 'package.json',
        icon: <FileText className="w-4 h-4 text-red-500" />,
        isLeaf: true,
      },
    ],
  },
]

// Organization structure
const organizationData = [
  {
    key: 'company',
    label: 'ACME Corporation',
    icon: <Home className="w-4 h-4 text-purple-500" />,
    children: [
      {
        key: 'engineering',
        label: 'Engineering',
        icon: <Users className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'frontend',
            label: 'Frontend Team',
            icon: <Users className="w-4 h-4 text-cyan-500" />,
            children: [
              {
                key: 'alice',
                label: 'Alice Johnson - Lead',
                isLeaf: true,
              },
              {
                key: 'bob',
                label: 'Bob Smith - Developer',
                isLeaf: true,
              },
            ],
          },
          {
            key: 'backend',
            label: 'Backend Team',
            icon: <Users className="w-4 h-4 text-green-500" />,
            children: [
              {
                key: 'charlie',
                label: 'Charlie Brown - Lead',
                isLeaf: true,
              },
              {
                key: 'david',
                label: 'David Wilson - Developer',
                isLeaf: true,
              },
            ],
          },
        ],
      },
      {
        key: 'design',
        label: 'Design',
        icon: <Users className="w-4 h-4 text-pink-500" />,
        children: [
          {
            key: 'eve',
            label: 'Eve Davis - Design Lead',
            isLeaf: true,
          },
          {
            key: 'frank',
            label: 'Frank Miller - UI Designer',
            isLeaf: true,
          },
        ],
      },
    ],
  },
]

// Media library structure
const mediaLibraryData = [
  {
    key: 'media',
    label: 'Media Library',
    icon: <Box className="w-4 h-4 text-purple-500" />,
    children: [
      {
        key: 'images',
        label: 'Images',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'photos',
            label: 'Photos',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              { key: 'img1', label: 'vacation.jpg', icon: <Image className="w-4 h-4" />, isLeaf: true },
              { key: 'img2', label: 'family.jpg', icon: <Image className="w-4 h-4" />, isLeaf: true },
              { key: 'img3', label: 'birthday.jpg', icon: <Image className="w-4 h-4" />, isLeaf: true },
            ],
          },
          {
            key: 'graphics',
            label: 'Graphics',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              { key: 'logo1', label: 'logo.svg', icon: <Image className="w-4 h-4" />, isLeaf: true },
              { key: 'icon1', label: 'icon-set.png', icon: <Image className="w-4 h-4" />, isLeaf: true },
            ],
          },
        ],
      },
      {
        key: 'videos',
        label: 'Videos',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'vid1', label: 'tutorial.mp4', icon: <Video className="w-4 h-4 text-red-500" />, isLeaf: true },
          { key: 'vid2', label: 'demo.mov', icon: <Video className="w-4 h-4 text-red-500" />, isLeaf: true },
        ],
      },
      {
        key: 'music',
        label: 'Music',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'mus1', label: 'song1.mp3', icon: <Music className="w-4 h-4 text-purple-500" />, isLeaf: true },
          { key: 'mus2', label: 'song2.mp3', icon: <Music className="w-4 h-4 text-purple-500" />, isLeaf: true },
          { key: 'mus3', label: 'album.zip', icon: <Archive className="w-4 h-4 text-yellow-500" />, isLeaf: true },
        ],
      },
      {
        key: 'documents',
        label: 'Documents',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'doc1', label: 'report.pdf', icon: <FileText className="w-4 h-4 text-red-500" />, isLeaf: true },
          { key: 'doc2', label: 'presentation.pptx', icon: <FileText className="w-4 h-4 text-orange-500" />, isLeaf: true },
        ],
      },
    ],
  },
]

// Large dataset for performance testing
const generateLargeDataset = (depth: number, breadth: number, prefix = ''): any[] => {
  if (depth === 0) {
    return Array.from({ length: breadth }, (_, i) => ({
      key: `${prefix}leaf-${i}`,
      label: `Item ${prefix}${i}`,
      isLeaf: true,
    }))
  }

  return Array.from({ length: breadth }, (_, i) => ({
    key: `${prefix}node-${i}`,
    label: `Category ${prefix}${i}`,
    icon: <Folder className="w-4 h-4 text-blue-500" />,
    children: generateLargeDataset(depth - 1, breadth, `${prefix}${i}-`),
  }))
}

export const Default: Story = {
  args: {
    data: fileTreeData,
    size: 'md',
  },
}

export const WithCheckboxes: Story = {
  render: () => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">
            Checked items: {checkedKeys.length}
          </span>
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => setCheckedKeys([])}
          >
            Clear all
          </button>
        </div>
        <div className="border border-border rounded-lg p-4">
          <Tree
            data={fileTreeData}
            checkable
            checkedKeys={checkedKeys}
            onCheck={(keys) => setCheckedKeys(keys)}
            defaultExpandAll
          />
        </div>
        <div className="text-xs text-text-muted">
          Selected keys: {checkedKeys.join(', ')}
        </div>
      </div>
    )
  },
}

export const WithSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">
            Selected: {selectedKeys.length > 0 ? selectedKeys[0] : 'None'}
          </span>
        </div>
        <div className="border border-border rounded-lg p-4">
          <Tree
            data={organizationData}
            selectable
            selectedKeys={selectedKeys}
            onSelect={(keys) => setSelectedKeys(keys)}
            defaultExpandAll
          />
        </div>
      </div>
    )
  },
}

export const ControlledExpansion: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['root'])

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
            onClick={() => setExpandedKeys(['root', 'src', 'components', 'public'])}
          >
            Expand All
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-surface text-text-primary rounded-md hover:bg-surface/80"
            onClick={() => setExpandedKeys([])}
          >
            Collapse All
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-surface text-text-primary rounded-md hover:bg-surface/80"
            onClick={() => setExpandedKeys(['root', 'src'])}
          >
            Expand to Level 2
          </button>
        </div>
        <div className="border border-border rounded-lg p-4">
          <Tree
            data={fileTreeData}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
          />
        </div>
        <div className="text-xs text-text-muted">
          Expanded: {expandedKeys.join(', ')}
        </div>
      </div>
    )
  },
}

export const DisabledNodes: Story = {
  render: () => {
    const dataWithDisabled = [
      {
        key: 'root',
        label: 'Project Files',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'src',
            label: 'src (locked)',
            icon: <Folder className="w-4 h-4 text-gray-400" />,
            disabled: true,
            children: [
              { key: 'file1', label: 'index.ts', disabled: true, isLeaf: true },
            ],
          },
          {
            key: 'public',
            label: 'public',
            icon: <Folder className="w-4 h-4 text-blue-500" />,
            children: [
              { key: 'file2', label: 'logo.png', isLeaf: true },
              { key: 'file3', label: 'readme.txt (read-only)', disabled: true, isLeaf: true },
            ],
          },
        ],
      },
    ]

    return (
      <div className="border border-border rounded-lg p-4">
        <Tree data={dataWithDisabled} checkable defaultExpandAll />
      </div>
    )
  },
}

export const OrganizationChart: Story = {
  render: () => (
    <div className="border border-border rounded-lg p-4">
      <Tree data={organizationData} showLine defaultExpandAll />
    </div>
  ),
}

export const MediaLibrary: Story = {
  render: () => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Files to Export</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">
              {checkedKeys.length} files selected
            </span>
            {checkedKeys.length > 0 && (
              <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                Export
              </button>
            )}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 max-h-96 overflow-auto">
          <Tree
            data={mediaLibraryData}
            checkable
            checkedKeys={checkedKeys}
            onCheck={(keys) => setCheckedKeys(keys)}
            showIcon
            defaultExpandedKeys={['media', 'images']}
          />
        </div>
      </div>
    )
  },
}

export const SearchableTree: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])

    // Filter tree based on search
    const filterTree = (nodes: any[], query: string): any[] => {
      if (!query) return nodes

      const matchingKeys = new Set<string>()
      const checkNode = (node: any): boolean => {
        const matches = node.label.toLowerCase().includes(query.toLowerCase())
        const childMatches = node.children
          ? node.children.some((child: any) => checkNode(child))
          : false

        if (matches || childMatches) {
          matchingKeys.add(node.key)
          if (node.children) {
            node.children.forEach((child: any) => checkNode(child))
          }
          return true
        }
        return false
      }

      nodes.forEach((node) => checkNode(node))

      const filtered = nodes
        .map((node) => {
          if (!matchingKeys.has(node.key)) return null
          return {
            ...node,
            children: node.children
              ? filterTree(node.children, query)
              : undefined,
          }
        })
        .filter(Boolean)

      return filtered as any[]
    }

    const filteredData = filterTree(fileTreeData, searchQuery)

    // Auto-expand when searching
    const handleSearch = (value: string) => {
      setSearchQuery(value)
      if (value) {
        // Expand all nodes when searching
        const allKeys: string[] = []
        const collectKeys = (nodes: any[]) => {
          nodes.forEach((node) => {
            allKeys.push(node.key)
            if (node.children) collectKeys(node.children)
          })
        }
        collectKeys(filteredData)
        setExpandedKeys(allKeys)
      } else {
        setExpandedKeys([])
      }
    }

    return (
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 pl-10 border border-border rounded-md outline-none focus:border-primary"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        </div>
        <div className="border border-border rounded-lg p-4">
          {filteredData.length > 0 ? (
            <Tree
              data={filteredData}
              expandedKeys={expandedKeys}
              onExpand={setExpandedKeys}
            />
          ) : (
            <div className="text-center py-8 text-text-muted">
              No results found
            </div>
          )}
        </div>
      </div>
    )
  },
}

