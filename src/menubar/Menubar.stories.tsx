import type { Meta, StoryObj } from '@storybook/react'
import {
  File,
  FileText,
  FolderOpen,
  Save,
  X,
  Undo,
  Redo,
  Scissors,
  Copy,
  ClipboardPaste,
  Sidebar,
  Terminal,
  Sun,
  Moon,
  Monitor,
  Eye,
  EyeOff,
  WrapText,
  FileCode,
  Image,
  Database,
} from 'lucide-react'
import { useState } from 'react'
import Menubar from './index'
import type { MenubarMenu } from './types'

const meta: Meta<typeof Menubar> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    menus: {
      description: 'Array of menus with their items',
    },
    className: {
      description: 'Custom className for the menubar root',
    },
    classNames: {
      description: 'Custom classNames for specific parts of the menubar',
    },
  },
}

export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', onClick: () => console.log('New File') },
          { key: 'open', label: 'Open...', onClick: () => console.log('Open') },
          { key: 'save', label: 'Save', onClick: () => console.log('Save') },
          { key: 'save-as', label: 'Save As...', onClick: () => console.log('Save As') },
          { key: 'sep1', label: '', separator: true },
          { key: 'exit', label: 'Exit', onClick: () => console.log('Exit') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        items: [
          { key: 'undo', label: 'Undo', onClick: () => console.log('Undo') },
          { key: 'redo', label: 'Redo', onClick: () => console.log('Redo') },
          { key: 'sep1', label: '', separator: true },
          { key: 'cut', label: 'Cut', onClick: () => console.log('Cut') },
          { key: 'copy', label: 'Copy', onClick: () => console.log('Copy') },
          { key: 'paste', label: 'Paste', onClick: () => console.log('Paste') },
        ],
      },
      {
        key: 'view',
        label: 'View',
        items: [
          { key: 'toggle-sidebar', label: 'Toggle Sidebar', onClick: () => console.log('Toggle Sidebar') },
          { key: 'toggle-terminal', label: 'Toggle Terminal', onClick: () => console.log('Toggle Terminal') },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm text-text-secondary">
          Click on any menu to see the items. This is a classic application menubar like VS Code or macOS apps.
        </div>
      </div>
    )
  },
}

export const WithShortcuts: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', shortcut: 'Ctrl+N', onClick: () => console.log('New File') },
          { key: 'open', label: 'Open...', shortcut: 'Ctrl+O', onClick: () => console.log('Open') },
          { key: 'save', label: 'Save', shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
          { key: 'save-as', label: 'Save As...', shortcut: 'Ctrl+Shift+S', onClick: () => console.log('Save As') },
          { key: 'sep1', label: '', separator: true },
          { key: 'exit', label: 'Exit', shortcut: 'Alt+F4', onClick: () => console.log('Exit') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        items: [
          { key: 'undo', label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
          { key: 'redo', label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => console.log('Redo') },
          { key: 'sep1', label: '', separator: true },
          { key: 'cut', label: 'Cut', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
          { key: 'copy', label: 'Copy', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
          { key: 'paste', label: 'Paste', shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
        ],
      },
      {
        key: 'view',
        label: 'View',
        items: [
          { key: 'toggle-sidebar', label: 'Toggle Sidebar', shortcut: 'Ctrl+B', onClick: () => console.log('Toggle Sidebar') },
          { key: 'toggle-terminal', label: 'Toggle Terminal', shortcut: 'Ctrl+`', onClick: () => console.log('Toggle Terminal') },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm text-text-secondary">
          Notice the keyboard shortcuts displayed on the right side of each menu item.
        </div>
      </div>
    )
  },
}

export const WithCheckboxItems: Story = {
  render: () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [wordWrap, setWordWrap] = useState(false)

    const menus: MenubarMenu[] = [
      {
        key: 'view',
        label: 'View',
        items: [
          {
            key: 'show-sidebar',
            label: 'Show Sidebar',
            type: 'checkbox',
            checked: showSidebar,
            onCheckedChange: setShowSidebar,
          },
          {
            key: 'show-status-bar',
            label: 'Show Status Bar',
            type: 'checkbox',
            checked: showStatusBar,
            onCheckedChange: setShowStatusBar,
          },
          {
            key: 'word-wrap',
            label: 'Word Wrap',
            type: 'checkbox',
            checked: wordWrap,
            onCheckedChange: setWordWrap,
          },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 space-y-2 text-sm">
          <p className="font-medium">Current Settings:</p>
          <p className="text-text-secondary">Sidebar: {showSidebar ? 'Visible' : 'Hidden'}</p>
          <p className="text-text-secondary">Status Bar: {showStatusBar ? 'Visible' : 'Hidden'}</p>
          <p className="text-text-secondary">Word Wrap: {wordWrap ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>
    )
  },
}

export const WithRadioItems: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

    const menus: MenubarMenu[] = [
      {
        key: 'view',
        label: 'View',
        items: [
          {
            key: 'theme-label',
            label: 'Theme',
            type: 'label',
          },
          {
            key: 'theme-light',
            label: 'Light',
            type: 'radio',
            checked: theme === 'light',
            onCheckedChange: () => setTheme('light'),
          },
          {
            key: 'theme-dark',
            label: 'Dark',
            type: 'radio',
            checked: theme === 'dark',
            onCheckedChange: () => setTheme('dark'),
          },
          {
            key: 'theme-system',
            label: 'System',
            type: 'radio',
            checked: theme === 'system',
            onCheckedChange: () => setTheme('system'),
          },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm">
          <p className="font-medium">Current Theme:</p>
          <p className="text-text-secondary capitalize">{theme}</p>
        </div>
      </div>
    )
  },
}

export const WithSubmenus: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', shortcut: 'Ctrl+N', onClick: () => console.log('New File') },
          {
            key: 'open-recent',
            label: 'Open Recent',
            children: [
              { key: 'file1', label: 'project-1.tsx', onClick: () => console.log('Open file1') },
              { key: 'file2', label: 'project-2.tsx', onClick: () => console.log('Open file2') },
              { key: 'file3', label: 'project-3.tsx', onClick: () => console.log('Open file3') },
              { key: 'sep1', label: '', separator: true },
              { key: 'clear', label: 'Clear Recent Files', onClick: () => console.log('Clear') },
            ],
          },
          { key: 'sep1', label: '', separator: true },
          { key: 'save', label: 'Save', shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
          { key: 'exit', label: 'Exit', onClick: () => console.log('Exit') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        items: [
          {
            key: 'find',
            label: 'Find',
            children: [
              { key: 'find-file', label: 'Find in Files', shortcut: 'Ctrl+Shift+F', onClick: () => console.log('Find in Files') },
              { key: 'find-next', label: 'Find Next', shortcut: 'F3', onClick: () => console.log('Find Next') },
              { key: 'find-prev', label: 'Find Previous', shortcut: 'Shift+F3', onClick: () => console.log('Find Previous') },
            ],
          },
          {
            key: 'replace',
            label: 'Replace',
            children: [
              { key: 'replace-file', label: 'Replace in Files', shortcut: 'Ctrl+H', onClick: () => console.log('Replace in Files') },
              { key: 'replace-next', label: 'Replace Next', onClick: () => console.log('Replace Next') },
            ],
          },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm text-text-secondary">
          Hover over items with arrows to see submenus. Nested menu support for complex navigation.
        </div>
      </div>
    )
  },
}

export const DisabledMenus: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', onClick: () => console.log('New File') },
          { key: 'open', label: 'Open...', onClick: () => console.log('Open') },
          { key: 'save', label: 'Save', disabled: true, onClick: () => console.log('Save') },
          { key: 'save-as', label: 'Save As...', disabled: true, onClick: () => console.log('Save As') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        disabled: true,
        items: [
          { key: 'undo', label: 'Undo', onClick: () => console.log('Undo') },
          { key: 'redo', label: 'Redo', onClick: () => console.log('Redo') },
        ],
      },
      {
        key: 'view',
        label: 'View',
        items: [
          { key: 'toggle-sidebar', label: 'Toggle Sidebar', onClick: () => console.log('Toggle Sidebar') },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm text-text-secondary">
          The Edit menu is completely disabled. Save and Save As items are disabled in the File menu.
        </div>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', icon: <FileText className="w-4 h-4" />, shortcut: 'Ctrl+N', onClick: () => console.log('New File') },
          { key: 'open', label: 'Open...', icon: <FolderOpen className="w-4 h-4" />, shortcut: 'Ctrl+O', onClick: () => console.log('Open') },
          { key: 'save', label: 'Save', icon: <Save className="w-4 h-4" />, shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
          { key: 'sep1', label: '', separator: true },
          { key: 'exit', label: 'Exit', icon: <X className="w-4 h-4" />, shortcut: 'Alt+F4', onClick: () => console.log('Exit') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        items: [
          { key: 'undo', label: 'Undo', icon: <Undo className="w-4 h-4" />, shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
          { key: 'redo', label: 'Redo', icon: <Redo className="w-4 h-4" />, shortcut: 'Ctrl+Y', onClick: () => console.log('Redo') },
          { key: 'sep1', label: '', separator: true },
          { key: 'cut', label: 'Cut', icon: <Scissors className="w-4 h-4" />, shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
          { key: 'copy', label: 'Copy', icon: <Copy className="w-4 h-4" />, shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
          { key: 'paste', label: 'Paste', icon: <ClipboardPaste className="w-4 h-4" />, shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
        ],
      },
      {
        key: 'view',
        label: 'View',
        items: [
          { key: 'toggle-sidebar', label: 'Toggle Sidebar', icon: <Sidebar className="w-4 h-4" />, shortcut: 'Ctrl+B', onClick: () => console.log('Toggle Sidebar') },
          { key: 'toggle-terminal', label: 'Toggle Terminal', icon: <Terminal className="w-4 h-4" />, shortcut: 'Ctrl+`', onClick: () => console.log('Toggle Terminal') },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 text-sm text-text-secondary">
          All menu items include lucide-react icons for better visual recognition.
        </div>
      </div>
    )
  },
}

export const CodeEditorMenubar: Story = {
  render: () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [showMinimap, setShowMinimap] = useState(false)
    const [wordWrap, setWordWrap] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')

    const menus: MenubarMenu[] = [
      {
        key: 'file',
        label: 'File',
        items: [
          { key: 'new', label: 'New File', icon: <FileText className="w-4 h-4" />, shortcut: 'Ctrl+N', onClick: () => console.log('New File') },
          {
            key: 'new-from-template',
            label: 'New from Template',
            icon: <File className="w-4 h-4" />,
            children: [
              { key: 'react', label: 'React Component', icon: <FileCode className="w-4 h-4" />, onClick: () => console.log('React Component') },
              { key: 'html', label: 'HTML File', icon: <FileCode className="w-4 h-4" />, onClick: () => console.log('HTML File') },
              { key: 'css', label: 'CSS File', icon: <FileCode className="w-4 h-4" />, onClick: () => console.log('CSS File') },
            ],
          },
          { key: 'open', label: 'Open File...', icon: <FolderOpen className="w-4 h-4" />, shortcut: 'Ctrl+O', onClick: () => console.log('Open') },
          {
            key: 'open-recent',
            label: 'Open Recent',
            children: [
              { key: 'file1', label: 'Button.tsx', onClick: () => console.log('Open Button.tsx') },
              { key: 'file2', label: 'Input.tsx', onClick: () => console.log('Open Input.tsx') },
              { key: 'file3', label: 'Modal.tsx', onClick: () => console.log('Open Modal.tsx') },
              { key: 'sep1', label: '', separator: true },
              { key: 'clear', label: 'Clear Recent Files', onClick: () => console.log('Clear') },
            ],
          },
          { key: 'sep1', label: '', separator: true },
          { key: 'save', label: 'Save', icon: <Save className="w-4 h-4" />, shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
          { key: 'save-as', label: 'Save As...', shortcut: 'Ctrl+Shift+S', onClick: () => console.log('Save As') },
          { key: 'sep2', label: '', separator: true },
          { key: 'exit', label: 'Exit', icon: <X className="w-4 h-4" />, shortcut: 'Alt+F4', onClick: () => console.log('Exit') },
        ],
      },
      {
        key: 'edit',
        label: 'Edit',
        items: [
          { key: 'undo', label: 'Undo', icon: <Undo className="w-4 h-4" />, shortcut: 'Ctrl+Z', onClick: () => console.log('Undo') },
          { key: 'redo', label: 'Redo', icon: <Redo className="w-4 h-4" />, shortcut: 'Ctrl+Y', onClick: () => console.log('Redo') },
          { key: 'sep1', label: '', separator: true },
          { key: 'cut', label: 'Cut', icon: <Scissors className="w-4 h-4" />, shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
          { key: 'copy', label: 'Copy', icon: <Copy className="w-4 h-4" />, shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
          { key: 'paste', label: 'Paste', icon: <ClipboardPaste className="w-4 h-4" />, shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
          { key: 'sep2', label: '', separator: true },
          {
            key: 'find',
            label: 'Find',
            children: [
              { key: 'find-file', label: 'Find in Files', shortcut: 'Ctrl+Shift+F', onClick: () => console.log('Find in Files') },
              { key: 'find-next', label: 'Find Next', shortcut: 'F3', onClick: () => console.log('Find Next') },
              { key: 'find-prev', label: 'Find Previous', shortcut: 'Shift+F3', onClick: () => console.log('Find Previous') },
            ],
          },
          {
            key: 'replace',
            label: 'Replace',
            children: [
              { key: 'replace-file', label: 'Replace in Files', shortcut: 'Ctrl+H', onClick: () => console.log('Replace in Files') },
              { key: 'replace-all', label: 'Replace All', onClick: () => console.log('Replace All') },
            ],
          },
        ],
      },
      {
        key: 'view',
        label: 'View',
        items: [
          {
            key: 'appearance',
            label: 'Appearance',
            type: 'label',
          },
          {
            key: 'show-sidebar',
            label: 'Show Sidebar',
            icon: showSidebar ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />,
            type: 'checkbox',
            checked: showSidebar,
            onCheckedChange: setShowSidebar,
            shortcut: 'Ctrl+B',
          },
          {
            key: 'show-minimap',
            label: 'Show Minimap',
            type: 'checkbox',
            checked: showMinimap,
            onCheckedChange: setShowMinimap,
          },
          { key: 'sep1', label: '', separator: true },
          {
            key: 'editor',
            label: 'Editor',
            type: 'label',
          },
          {
            key: 'word-wrap',
            label: 'Word Wrap',
            icon: <WrapText className="w-4 h-4" />,
            type: 'checkbox',
            checked: wordWrap,
            onCheckedChange: setWordWrap,
            shortcut: 'Alt+Z',
          },
          { key: 'sep2', label: '', separator: true },
          {
            key: 'theme-label',
            label: 'Theme',
            type: 'label',
          },
          {
            key: 'theme-light',
            label: 'Light',
            icon: <Sun className="w-4 h-4" />,
            type: 'radio',
            checked: theme === 'light',
            onCheckedChange: () => setTheme('light'),
          },
          {
            key: 'theme-dark',
            label: 'Dark',
            icon: <Moon className="w-4 h-4" />,
            type: 'radio',
            checked: theme === 'dark',
            onCheckedChange: () => setTheme('dark'),
          },
          {
            key: 'theme-system',
            label: 'System',
            icon: <Monitor className="w-4 h-4" />,
            type: 'radio',
            checked: theme === 'system',
            onCheckedChange: () => setTheme('system'),
          },
          { key: 'sep3', label: '', separator: true },
          { key: 'toggle-terminal', label: 'Toggle Terminal', icon: <Terminal className="w-4 h-4" />, shortcut: 'Ctrl+`', onClick: () => console.log('Toggle Terminal') },
        ],
      },
    ]

    return (
      <div>
        <Menubar menus={menus} />
        <div className="p-8 border-t border-border bg-surface/30 min-h-[300px]">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Code Editor Simulation</h3>
            <p className="text-sm text-text-secondary mb-4">
              Complete menubar for a code editor with all interactive features.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">View Settings:</p>
              <ul className="space-y-1 text-text-secondary">
                <li>Sidebar: {showSidebar ? 'Visible' : 'Hidden'}</li>
                <li>Minimap: {showMinimap ? 'Visible' : 'Hidden'}</li>
                <li>Word Wrap: {wordWrap ? 'Enabled' : 'Disabled'}</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Appearance:</p>
              <ul className="space-y-1 text-text-secondary">
                <li>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
