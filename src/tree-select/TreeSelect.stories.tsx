import type { Meta, StoryObj } from '@storybook/react'
import {
  Folder,
  File,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Database,
  Settings,
  Users,
  Globe,
  Flag,
  Building,
  MapPin,
  Tag,
} from 'lucide-react'
import { useState } from 'react'
import TreeSelect from './index'

const meta: Meta<typeof TreeSelect> = {
  title: 'Data Entry/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the tree select',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    checkable: {
      control: 'boolean',
      description: 'Show checkboxes for selection',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tree select',
    },
    showLine: {
      control: 'boolean',
      description: 'Show connecting lines',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show custom icons',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width component',
    },
    defaultExpandAll: {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
  },
}

export default meta
type Story = StoryObj<typeof TreeSelect>

// File system data
const fileSystemData = [
  {
    key: 'documents',
    label: 'Documents',
    icon: <Folder className="w-4 h-4 text-blue-500" />,
    children: [
      {
        key: 'work',
        label: 'Work',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'report.pdf', label: 'Annual Report.pdf', icon: <FileText className="w-4 h-4 text-red-500" />, isLeaf: true },
          { key: 'presentation.pptx', label: 'Presentation.pptx', icon: <FileText className="w-4 h-4 text-orange-500" />, isLeaf: true },
        ],
      },
      {
        key: 'personal',
        label: 'Personal',
        icon: <Folder className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'resume.pdf', label: 'Resume.pdf', icon: <FileText className="w-4 h-4 text-red-500" />, isLeaf: true },
          { key: 'cover-letter.docx', label: 'Cover Letter.docx', icon: <FileText className="w-4 h-4 text-blue-600" />, isLeaf: true },
        ],
      },
    ],
  },
  {
    key: 'media',
    label: 'Media',
    icon: <Folder className="w-4 h-4 text-blue-500" />,
    children: [
      { key: 'vacation.jpg', label: 'Vacation.jpg', icon: <Image className="w-4 h-4 text-green-500" />, isLeaf: true },
      { key: 'video.mp4', label: 'Video.mp4', icon: <Video className="w-4 h-4 text-red-500" />, isLeaf: true },
      { key: 'music.mp3', label: 'Music.mp3', icon: <Music className="w-4 h-4 text-purple-500" />, isLeaf: true },
    ],
  },
]

// Location data
const locationData = [
  {
    key: 'world',
    label: 'World',
    icon: <Globe className="w-4 h-4 text-blue-500" />,
    children: [
      {
        key: 'north-america',
        label: 'North America',
        icon: <Flag className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'usa',
            label: 'United States',
            icon: <Flag className="w-4 h-4 text-red-500" />,
            children: [
              { key: 'ny', label: 'New York', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'la', label: 'Los Angeles', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'chicago', label: 'Chicago', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
          {
            key: 'canada',
            label: 'Canada',
            icon: <Flag className="w-4 h-4 text-red-600" />,
            children: [
              { key: 'toronto', label: 'Toronto', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'vancouver', label: 'Vancouver', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
        ],
      },
      {
        key: 'europe',
        label: 'Europe',
        icon: <Flag className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'uk',
            label: 'United Kingdom',
            icon: <Flag className="w-4 h-4 text-blue-600" />,
            children: [
              { key: 'london', label: 'London', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'manchester', label: 'Manchester', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
          {
            key: 'france',
            label: 'France',
            icon: <Flag className="w-4 h-4 text-blue-700" />,
            children: [
              { key: 'paris', label: 'Paris', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'lyon', label: 'Lyon', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
        ],
      },
      {
        key: 'asia',
        label: 'Asia',
        icon: <Flag className="w-4 h-4 text-blue-500" />,
        children: [
          {
            key: 'japan',
            label: 'Japan',
            icon: <Flag className="w-4 h-4 text-red-500" />,
            children: [
              { key: 'tokyo', label: 'Tokyo', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'osaka', label: 'Osaka', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
          {
            key: 'china',
            label: 'China',
            icon: <Flag className="w-4 h-4 text-red-600" />,
            children: [
              { key: 'beijing', label: 'Beijing', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
              { key: 'shanghai', label: 'Shanghai', icon: <MapPin className="w-4 h-4" />, isLeaf: true },
            ],
          },
        ],
      },
    ],
  },
]

// Department data
const departmentData = [
  {
    key: 'company',
    label: 'Company',
    icon: <Building className="w-4 h-4 text-purple-500" />,
    children: [
      {
        key: 'engineering',
        label: 'Engineering',
        icon: <Code className="w-4 h-4 text-blue-500" />,
        children: [
          { key: 'frontend', label: 'Frontend Team', icon: <Users className="w-4 h-4 text-cyan-500" />, isLeaf: true },
          { key: 'backend', label: 'Backend Team', icon: <Users className="w-4 h-4 text-green-500" />, isLeaf: true },
          { key: 'devops', label: 'DevOps Team', icon: <Users className="w-4 h-4 text-orange-500" />, isLeaf: true },
        ],
      },
      {
        key: 'product',
        label: 'Product',
        icon: <Settings className="w-4 h-4 text-purple-500" />,
        children: [
          { key: 'pm', label: 'Product Management', icon: <Users className="w-4 h-4" />, isLeaf: true },
          { key: 'design', label: 'Design Team', icon: <Users className="w-4 h-4" />, isLeaf: true },
        ],
      },
      {
        key: 'marketing',
        label: 'Marketing',
        icon: <Tag className="w-4 h-4 text-pink-500" />,
        children: [
          { key: 'content', label: 'Content Team', icon: <Users className="w-4 h-4" />, isLeaf: true },
          { key: 'social', label: 'Social Media', icon: <Users className="w-4 h-4" />, isLeaf: true },
        ],
      },
    ],
  },
]

// Category data
const categoryData = [
  {
    key: 'electronics',
    label: 'Electronics',
    children: [
      {
        key: 'computers',
        label: 'Computers',
        children: [
          { key: 'laptops', label: 'Laptops', isLeaf: true },
          { key: 'desktops', label: 'Desktops', isLeaf: true },
          { key: 'tablets', label: 'Tablets', isLeaf: true },
        ],
      },
      {
        key: 'mobile',
        label: 'Mobile Devices',
        children: [
          { key: 'smartphones', label: 'Smartphones', isLeaf: true },
          { key: 'accessories', label: 'Accessories', isLeaf: true },
        ],
      },
    ],
  },
  {
    key: 'clothing',
    label: 'Clothing',
    children: [
      {
        key: 'mens',
        label: "Men's Clothing",
        children: [
          { key: 'mens-shirts', label: 'Shirts', isLeaf: true },
          { key: 'mens-pants', label: 'Pants', isLeaf: true },
        ],
      },
      {
        key: 'womens',
        label: "Women's Clothing",
        children: [
          { key: 'womens-dresses', label: 'Dresses', isLeaf: true },
          { key: 'womens-tops', label: 'Tops', isLeaf: true },
        ],
      },
    ],
  },
]

export const Default: Story = {
  args: {
    data: fileSystemData,
    placeholder: 'Select a file',
    size: 'md',
  },
}

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="space-y-4">
        <TreeSelect
          data={locationData}
          value={value}
          onChange={(val) => setValue(val as string)}
          placeholder="Select a city"
          label="City Selector"
          helperText="Choose your preferred city"
        />
        <div className="text-sm text-text-muted">
          Selected: {value || 'None'}
        </div>
      </div>
    )
  },
}

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <TreeSelect
          data={departmentData}
          value={value}
          onChange={(val) => setValue(val as string[])}
          multiple
          placeholder="Select teams"
          label="Team Selection"
          helperText="Select one or more teams"
        />
        <div className="text-sm text-text-muted">
          Selected: {value.length} team(s)
        </div>
      </div>
    )
  },
}

export const WithCheckboxes: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <TreeSelect
          data={fileSystemData}
          value={value}
          onChange={(val) => setValue(val as string[])}
          multiple
          checkable
          placeholder="Select files"
          label="File Selection with Checkboxes"
          helperText="Use checkboxes to select multiple files"
          maxChipsVisible={2}
        />
        <div className="text-sm text-text-muted">
          Selected: {value.length} file(s)
        </div>
      </div>
    )
  },
}

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <TreeSelect
        data={locationData}
        value={value}
        onChange={(val) => setValue(val as string)}
        searchable
        placeholder="Search and select a city"
        label="Searchable City Selector"
        helperText="Type to filter cities"
      />
    )
  },
}

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <TreeSelect
        data={fileSystemData}
        placeholder="Error state"
        label="With Error"
        error="Please select a file"
      />
      <TreeSelect
        data={fileSystemData}
        placeholder="Success state"
        label="With Success"
        success="File selected successfully"
      />
    </div>
  ),
}

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <TreeSelect
        data={fileSystemData}
        disabled
        placeholder="Disabled"
        label="Disabled TreeSelect"
        helperText="This field is disabled"
      />
    </div>
  ),
}

export const FileSystemPicker: Story = {
  render: () => {
    const [selectedFile, setSelectedFile] = useState<string>('')

    return (
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">File Upload</h3>
          <p className="text-sm text-text-muted mb-4">
            Select a file from your virtual file system
          </p>
          <TreeSelect
            data={fileSystemData}
            value={selectedFile}
            onChange={(val) => setSelectedFile(val as string)}
            searchable
            showLine
            placeholder="Choose a file..."
            label="Source File"
            required
          />
        </div>
        {selectedFile && (
          <div className="bg-success/10 border border-success p-4 rounded-lg">
            <p className="text-sm font-medium text-success">
              File selected: {selectedFile}
            </p>
          </div>
        )}
      </div>
    )
  },
}

export const LocationPicker: Story = {
  render: () => {
    const [locations, setLocations] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Shipping Destinations</h3>
          <p className="text-sm text-text-muted mb-4">
            Select cities where you want to ship products
          </p>
          <TreeSelect
            data={locationData}
            value={locations}
            onChange={(val) => setLocations(val as string[])}
            multiple
            checkable
            searchable
            placeholder="Select shipping cities..."
            label="Delivery Locations"
            helperText="Select one or more cities"
            maxChipsVisible={3}
          />
        </div>
        {locations.length > 0 && (
          <div className="bg-surface p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">
              Selected Locations ({locations.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
}
