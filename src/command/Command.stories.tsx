import type { Meta, StoryObj } from '@storybook/react'
import {
  Command,
  CommandModal,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './index'
import {
  Home,
  User,
  Settings,
  Search,
  Bell,
  Mail,
  Calendar,
  FileText,
  Folder,
  Star,
  Trash,
  Download,
  Upload,
  Edit,
  Copy,
  Share,
  Heart,
  MessageSquare,
} from 'lucide-react'
import { useState } from 'react'

const meta: Meta<typeof Command> = {
  title: 'Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Command palette size',
    },
  },
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2" />
            <span>Search Users</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithShortcuts: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Home className="mr-2" />
            <span>Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2" />
            <span>Search</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2" />
            <span>Settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Files">
          <CommandItem>
            <FileText className="mr-2" />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Folder className="mr-2" />
            <span>New Folder</span>
            <CommandShortcut>⇧⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const MultipleGroups: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem>
            <Home className="mr-2" />
            <span>Home</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Communication">
          <CommandItem>
            <Mail className="mr-2" />
            <span>Messages</span>
          </CommandItem>
          <CommandItem>
            <Bell className="mr-2" />
            <span>Notifications</span>
          </CommandItem>
          <CommandItem>
            <MessageSquare className="mr-2" />
            <span>Comments</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Download className="mr-2" />
            <span>Download</span>
          </CommandItem>
          <CommandItem>
            <Upload className="mr-2" />
            <span>Upload</span>
          </CommandItem>
          <CommandItem>
            <Share className="mr-2" />
            <span>Share</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string>('')

    return (
      <div className="space-y-4">
        <Command className="rounded-lg border border-border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setSelectedItem('Home')}>
                <Home className="mr-2" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => setSelectedItem('Profile')}>
                <User className="mr-2" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem onSelect={() => setSelectedItem('Settings')}>
                <Settings className="mr-2" />
                <span>Settings</span>
              </CommandItem>
              <CommandItem onSelect={() => setSelectedItem('Calendar')}>
                <Calendar className="mr-2" />
                <span>Calendar</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        {selectedItem && (
          <div className="p-4 bg-surface border border-border rounded-lg">
            <p className="text-sm">
              Selected: <strong>{selectedItem}</strong>
            </p>
          </div>
        )}
      </div>
    )
  },
}

export const ModalExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [selectedCommand, setSelectedCommand] = useState('')

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Open Command Palette
        </button>
        <p className="text-sm text-text-secondary">
          Press the button or use keyboard shortcut ⌘K to open
        </p>
        {selectedCommand && (
          <div className="p-4 bg-surface border border-border rounded-lg">
            <p className="text-sm">
              Last selected: <strong>{selectedCommand}</strong>
            </p>
          </div>
        )}
        <CommandModal open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('Calendar')
                  setOpen(false)
                }}
              >
                <Calendar className="mr-2" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('Search Users')
                  setOpen(false)
                }}
              >
                <User className="mr-2" />
                <span>Search Users</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('Settings')
                  setOpen(false)
                }}
              >
                <Settings className="mr-2" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Quick Actions">
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('New File')
                  setOpen(false)
                }}
              >
                <FileText className="mr-2" />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('New Folder')
                  setOpen(false)
                }}
              >
                <Folder className="mr-2" />
                <span>New Folder</span>
                <CommandShortcut>⇧⌘N</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandModal>
      </div>
    )
  },
}

export const FileManager: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <FileText className="mr-2" />
            <span>document.pdf</span>
            <CommandShortcut>2 hours ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2" />
            <span>presentation.pptx</span>
            <CommandShortcut>5 hours ago</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2" />
            <span>spreadsheet.xlsx</span>
            <CommandShortcut>1 day ago</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Upload className="mr-2" />
            <span>Upload File</span>
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Folder className="mr-2" />
            <span>New Folder</span>
            <CommandShortcut>⇧⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Star className="mr-2" />
            <span>View Starred</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Trash className="mr-2" />
            <span>View Trash</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const EditorCommands: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Edit">
          <CommandItem>
            <Edit className="mr-2" />
            <span>Edit</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy className="mr-2" />
            <span>Copy</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy className="mr-2" />
            <span>Paste</span>
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="File">
          <CommandItem>
            <FileText className="mr-2" />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Download className="mr-2" />
            <span>Save</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Download className="mr-2" />
            <span>Save As</span>
            <CommandShortcut>⇧⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View">
          <CommandItem>
            <Search className="mr-2" />
            <span>Find</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2" />
            <span>Find and Replace</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const SearchWithFiltering: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')

    const items = [
      { name: 'Apple', category: 'Fruits' },
      { name: 'Banana', category: 'Fruits' },
      { name: 'Carrot', category: 'Vegetables' },
      { name: 'Broccoli', category: 'Vegetables' },
      { name: 'Chicken', category: 'Meat' },
      { name: 'Beef', category: 'Meat' },
    ]

    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    )

    const groupedItems = filteredItems.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
      },
      {} as Record<string, typeof items>,
    )

    return (
      <Command className="rounded-lg border border-border shadow-md">
        <CommandInput
          placeholder="Search items..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          {filteredItems.length === 0 && <CommandEmpty>No items found.</CommandEmpty>}
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <CommandGroup key={category} heading={category}>
              {categoryItems.map((item) => (
                <CommandItem key={item.name}>
                  <span>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    )
  },
}

