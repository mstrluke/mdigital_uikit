import type { Meta, StoryObj } from '@storybook/react'
import {
  Save,
  Download,
  Share,
  Edit,
  Trash2,
  Copy,
  Upload,
  Settings,
  User,
  Mail,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from 'lucide-react'
import { useState } from 'react'
import Button from '../button'
import ButtonGroup from './index'

const meta: Meta<typeof ButtonGroup> = {
  title: 'General/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Vertical layout',
    },
    attached: {
      control: 'boolean',
      description: 'Buttons visually connected',
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Gap size when not attached',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width layout',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size for all buttons',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'link', 'dashed'],
      description: 'Variant for all buttons',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Color for all buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

// Basic Examples

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Basic Horizontal Group</h3>
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">With Icons</h3>
        <ButtonGroup>
          <Button leftIcon={<Save className="size-4" />}>Save</Button>
          <Button leftIcon={<Download className="size-4" />}>Download</Button>
          <Button leftIcon={<Share className="size-4" />}>Share</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Icon Only</h3>
        <ButtonGroup>
          <Button iconOnly leftIcon={<Edit className="size-4" />} />
          <Button iconOnly leftIcon={<Copy className="size-4" />} />
          <Button iconOnly leftIcon={<Trash2 className="size-4" />} />
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Basic Vertical Group</h3>
        <ButtonGroup vertical>
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">With Icons</h3>
        <ButtonGroup vertical>
          <Button leftIcon={<User className="size-4" />}>Profile</Button>
          <Button leftIcon={<Settings className="size-4" />}>Settings</Button>
          <Button leftIcon={<Mail className="size-4" />}>Messages</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

// Real-World Examples

export const TextEditorToolbar: Story = {
  render: () => {
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Rich Text Editor Toolbar</h3>
        <div className="flex gap-2 flex-wrap">
          <ButtonGroup size="sm" variant="outline">
            <Button
              iconOnly
              leftIcon={<Bold className="size-4" />}
              variant={bold ? 'solid' : 'outline'}
              onClick={() => setBold(!bold)}
            />
            <Button
              iconOnly
              leftIcon={<Italic className="size-4" />}
              variant={italic ? 'solid' : 'outline'}
              onClick={() => setItalic(!italic)}
            />
            <Button
              iconOnly
              leftIcon={<Underline className="size-4" />}
              variant={underline ? 'solid' : 'outline'}
              onClick={() => setUnderline(!underline)}
            />
          </ButtonGroup>

          <ButtonGroup size="sm" variant="outline">
            <Button
              iconOnly
              leftIcon={<AlignLeft className="size-4" />}
              variant={align === 'left' ? 'solid' : 'outline'}
              onClick={() => setAlign('left')}
            />
            <Button
              iconOnly
              leftIcon={<AlignCenter className="size-4" />}
              variant={align === 'center' ? 'solid' : 'outline'}
              onClick={() => setAlign('center')}
            />
            <Button
              iconOnly
              leftIcon={<AlignRight className="size-4" />}
              variant={align === 'right' ? 'solid' : 'outline'}
              onClick={() => setAlign('right')}
            />
          </ButtonGroup>

          <ButtonGroup size="sm" variant="outline">
            <Button iconOnly leftIcon={<List className="size-4" />} />
            <Button iconOnly leftIcon={<ListOrdered className="size-4" />} />
          </ButtonGroup>
        </div>
      </div>
    )
  },
}

export const SplitButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Save Actions</h3>
        <ButtonGroup>
          <Button leftIcon={<Save className="size-4" />}>Save</Button>
          <Button iconOnly leftIcon={<ChevronDown className="size-4" />} />
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Share Actions</h3>
        <ButtonGroup color="accent">
          <Button leftIcon={<Share className="size-4" />}>Share</Button>
          <Button iconOnly leftIcon={<ChevronDown className="size-4" />} />
        </ButtonGroup>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Download Options</h3>
        <ButtonGroup variant="outline" color="success">
          <Button leftIcon={<Download className="size-4" />}>Download PDF</Button>
          <Button iconOnly leftIcon={<ChevronDown className="size-4" />} />
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const Pagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3)
    const totalPages = 10

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Pagination</h3>
        <div className="flex justify-center">
          <ButtonGroup variant="outline" size="sm">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
              if (page > totalPages) return null
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'solid' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
        <p className="text-sm text-center text-text-secondary">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    )
  },
}

export const ActionBar: Story = {
  render: () => {
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }

    return (
      <div className="space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold">Document Editor</h3>
        <div className="p-6 border border-border rounded-md bg-surface">
          <p className="text-text-secondary">Your document content goes here...</p>
        </div>
        <div className="flex justify-between items-center">
          <ButtonGroup>
            <Button leftIcon={<Save className="size-4" />} onClick={handleSave} color="success">
              {saved ? 'Saved!' : 'Save'}
            </Button>
            <Button leftIcon={<Upload className="size-4" />}>Export</Button>
            <Button leftIcon={<Download className="size-4" />}>Download</Button>
          </ButtonGroup>
          <ButtonGroup variant="outline">
            <Button>Cancel</Button>
            <Button color="error" leftIcon={<Trash2 className="size-4" />}>
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </div>
    )
  },
}

export const MobileNavigation: Story = {
  render: () => (
    <div className="space-y-4 max-w-xs">
      <h3 className="text-sm font-semibold">Mobile Navigation</h3>
      <ButtonGroup vertical fullWidth variant="ghost">
        <Button leftIcon={<User className="size-4" />}>Profile</Button>
        <Button leftIcon={<Settings className="size-4" />}>Settings</Button>
        <Button leftIcon={<Mail className="size-4" />}>Messages</Button>
        <Button leftIcon={<Share className="size-4" />}>Share</Button>
      </ButtonGroup>
    </div>
  ),
}

export const SegmentedControl: Story = {
  render: () => {
    const [view, setView] = useState<'list' | 'grid' | 'calendar'>('list')
    const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week')

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">View Selector</h3>
          <ButtonGroup size="sm" variant="outline">
            <Button
              variant={view === 'list' ? 'solid' : 'outline'}
              onClick={() => setView('list')}
            >
              List
            </Button>
            <Button
              variant={view === 'grid' ? 'solid' : 'outline'}
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={view === 'calendar' ? 'solid' : 'outline'}
              onClick={() => setView('calendar')}
            >
              Calendar
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Time Period</h3>
          <ButtonGroup size="sm" variant="outline" color="accent">
            <Button
              variant={period === 'day' ? 'solid' : 'outline'}
              onClick={() => setPeriod('day')}
            >
              Day
            </Button>
            <Button
              variant={period === 'week' ? 'solid' : 'outline'}
              onClick={() => setPeriod('week')}
            >
              Week
            </Button>
            <Button
              variant={period === 'month' ? 'solid' : 'outline'}
              onClick={() => setPeriod('month')}
            >
              Month
            </Button>
          </ButtonGroup>
        </div>
      </div>
    )
  },
}
