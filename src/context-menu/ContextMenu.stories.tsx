import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  ClipboardPaste,
  Copy,
  FileEdit,
  FolderOpen,
  Save,
  Scissors,
  Settings,
  Share2,
  Trash2,
} from 'lucide-react'

import ContextMenu from './index'

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContextMenu>

/**
 * Basic example of a context menu with icons and keyboard shortcuts
 */
export const Default: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          key: 'copy',
          label: 'Copy',
          icon: <Copy className="w-4 h-4" />,
          shortcut: 'Ctrl+C',
          onClick: () => alert('Copy clicked'),
        },
        {
          key: 'cut',
          label: 'Cut',
          icon: <Scissors className="w-4 h-4" />,
          shortcut: 'Ctrl+X',
          onClick: () => alert('Cut clicked'),
        },
        {
          key: 'paste',
          label: 'Paste',
          icon: <ClipboardPaste className="w-4 h-4" />,
          shortcut: 'Ctrl+V',
          onClick: () => alert('Paste clicked'),
        },
        {
          key: 'separator-1',
          separator: true,
        },
        {
          key: 'delete',
          label: 'Delete',
          icon: <Trash2 className="w-4 h-4" />,
          onClick: () => alert('Delete clicked'),
        },
      ]}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
        <p className="text-text-secondary">Right click here</p>
      </div>
    </ContextMenu>
  ),
}

/**
 * All 8 color variants available for the context menu
 */
export const ColorVariants: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const

    return (
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <ContextMenu
            key={color}
            color={color}
            items={[
              {
                key: 'copy',
                label: 'Copy',
                icon: <Copy className="w-4 h-4" />,
                shortcut: 'Ctrl+C',
                onClick: () => {},
              },
              {
                key: 'cut',
                label: 'Cut',
                icon: <Scissors className="w-4 h-4" />,
                shortcut: 'Ctrl+X',
                onClick: () => {},
              },
              {
                key: 'paste',
                label: 'Paste',
                icon: <ClipboardPaste className="w-4 h-4" />,
                shortcut: 'Ctrl+V',
                onClick: () => {},
              },
              {
                key: 'separator-1',
                separator: true,
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <Trash2 className="w-4 h-4" />,
                onClick: () => {},
              },
            ]}
          >
            <div className="w-full h-[120px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
              <p className="text-text-secondary text-sm capitalize">Right click — {color}</p>
            </div>
          </ContextMenu>
        ))}
      </div>
    )
  },
}

/**
 * Context menu with nested submenus
 */
export const WithNestedMenu: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          key: 'new',
          label: 'New',
          icon: <FileEdit className="w-4 h-4" />,
          children: [
            {
              key: 'new-file',
              label: 'File',
              onClick: () => alert('New File'),
            },
            {
              key: 'new-folder',
              label: 'Folder',
              icon: <FolderOpen className="w-4 h-4" />,
              onClick: () => alert('New Folder'),
            },
            {
              key: 'separator-new',
              separator: true,
            },
            {
              key: 'new-advanced',
              label: 'Advanced',
              children: [
                {
                  key: 'new-component',
                  label: 'React Component',
                  onClick: () => alert('New React Component'),
                },
                {
                  key: 'new-hook',
                  label: 'Custom Hook',
                  onClick: () => alert('New Custom Hook'),
                },
              ],
            },
          ],
        },
        {
          key: 'open',
          label: 'Open',
          icon: <FolderOpen className="w-4 h-4" />,
          onClick: () => alert('Open clicked'),
        },
        {
          key: 'save',
          label: 'Save',
          icon: <Save className="w-4 h-4" />,
          shortcut: 'Ctrl+S',
          onClick: () => alert('Save clicked'),
        },
        {
          key: 'separator-1',
          separator: true,
        },
        {
          key: 'share',
          label: 'Share',
          icon: <Share2 className="w-4 h-4" />,
          children: [
            {
              key: 'share-email',
              label: 'Email',
              onClick: () => alert('Share via Email'),
            },
            {
              key: 'share-link',
              label: 'Copy Link',
              onClick: () => alert('Copy Link'),
            },
            {
              key: 'share-social',
              label: 'Social Media',
              children: [
                {
                  key: 'share-facebook',
                  label: 'Facebook',
                  onClick: () => alert('Share to Facebook'),
                },
                {
                  key: 'share-twitter',
                  label: 'Twitter',
                  onClick: () => alert('Share to Twitter'),
                },
                {
                  key: 'share-linkedin',
                  label: 'LinkedIn',
                  onClick: () => alert('Share to LinkedIn'),
                },
              ],
            },
          ],
        },
      ]}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
        <p className="text-text-secondary">Right click to see nested menus</p>
      </div>
    </ContextMenu>
  ),
}

/**
 * Context menu with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          key: 'copy',
          label: 'Copy',
          icon: <Copy className="w-4 h-4" />,
          shortcut: 'Ctrl+C',
          onClick: () => alert('Copy clicked'),
        },
        {
          key: 'cut',
          label: 'Cut (Disabled)',
          icon: <Scissors className="w-4 h-4" />,
          shortcut: 'Ctrl+X',
          disabled: true,
          onClick: () => alert('This should not appear'),
        },
        {
          key: 'paste',
          label: 'Paste (Disabled)',
          icon: <ClipboardPaste className="w-4 h-4" />,
          shortcut: 'Ctrl+V',
          disabled: true,
          onClick: () => alert('This should not appear'),
        },
        {
          key: 'separator-1',
          separator: true,
        },
        {
          key: 'delete',
          label: 'Delete',
          icon: <Trash2 className="w-4 h-4" />,
          onClick: () => alert('Delete clicked'),
        },
      ]}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
        <p className="text-text-secondary">
          Right click to see disabled items
        </p>
      </div>
    </ContextMenu>
  ),
}

/**
 * Context menu without icons
 */
export const WithoutIcons: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          key: 'option1',
          label: 'Option 1',
          onClick: () => alert('Option 1'),
        },
        {
          key: 'option2',
          label: 'Option 2',
          onClick: () => alert('Option 2'),
        },
        {
          key: 'option3',
          label: 'Option 3',
          onClick: () => alert('Option 3'),
        },
        {
          key: 'separator-1',
          separator: true,
        },
        {
          key: 'settings',
          label: 'Settings',
          onClick: () => alert('Settings'),
        },
      ]}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
        <p className="text-text-secondary">Simple menu without icons</p>
      </div>
    </ContextMenu>
  ),
}

/**
 * Disabled context menu
 */
export const Disabled: Story = {
  render: () => (
    <ContextMenu
      disabled={true}
      items={[
        {
          key: 'copy',
          label: 'Copy',
          icon: <Copy className="w-4 h-4" />,
          onClick: () => alert('Copy clicked'),
        },
        {
          key: 'paste',
          label: 'Paste',
          icon: <ClipboardPaste className="w-4 h-4" />,
          onClick: () => alert('Paste clicked'),
        },
      ]}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md bg-surface">
        <p className="text-text-secondary">
          Context menu is disabled (right click won&apos;t work)
        </p>
      </div>
    </ContextMenu>
  ),
}

/**
 * Context menu on text
 */
export const OnText: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          key: 'copy',
          label: 'Copy',
          icon: <Copy className="w-4 h-4" />,
          shortcut: 'Ctrl+C',
          onClick: () => {
            navigator.clipboard.writeText('Sample text to copy')
            alert('Text copied to clipboard')
          },
        },
        {
          key: 'separator-1',
          separator: true,
        },
        {
          key: 'select-all',
          label: 'Select All',
          shortcut: 'Ctrl+A',
          onClick: () => alert('Select All'),
        },
      ]}
    >
      <div className="w-[400px] p-6 border border-border rounded-md bg-surface">
        <h3 className="text-lg font-semibold mb-2">Sample Text</h3>
        <p className="text-text-secondary">
          Right-click on this text to see the context menu. You can copy, select
          all, or perform other text operations.
        </p>
      </div>
    </ContextMenu>
  ),
}

/**
 * Multiple items with context menu
 */
export const MultipleItems: Story = {
  render: () => (
    <div className="flex gap-4">
      <ContextMenu
        items={[
          {
            key: 'edit',
            label: 'Edit',
            icon: <FileEdit className="w-4 h-4" />,
            onClick: () => alert('Edit Item 1'),
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => alert('Delete Item 1'),
          },
        ]}
      >
        <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-primary rounded-md bg-primary/5">
          <p className="text-primary font-semibold">Item 1</p>
        </div>
      </ContextMenu>

      <ContextMenu
        items={[
          {
            key: 'edit',
            label: 'Edit',
            icon: <FileEdit className="w-4 h-4" />,
            onClick: () => alert('Edit Item 2'),
          },
          {
            key: 'settings',
            label: 'Settings',
            icon: <Settings className="w-4 h-4" />,
            onClick: () => alert('Settings Item 2'),
          },
          {
            key: 'separator-1',
            separator: true,
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => alert('Delete Item 2'),
          },
        ]}
      >
        <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-success rounded-md bg-success/5">
          <p className="text-success font-semibold">Item 2</p>
        </div>
      </ContextMenu>

      <ContextMenu
        items={[
          {
            key: 'share',
            label: 'Share',
            icon: <Share2 className="w-4 h-4" />,
            onClick: () => alert('Share Item 3'),
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => alert('Delete Item 3'),
          },
        ]}
      >
        <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-error rounded-md bg-error/5">
          <p className="text-error font-semibold">Item 3</p>
        </div>
      </ContextMenu>
    </div>
  ),
}


