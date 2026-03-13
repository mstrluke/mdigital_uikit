import type { Meta, StoryObj } from '@storybook/react'
import {
  Command,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Option,
  Delete,
  CornerDownLeft,
} from 'lucide-react'
import Kbd from './index'

const meta: Meta<typeof Kbd> = {
  title: 'General/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Keyboard key size',
    },
  },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  args: {
    children: 'K',
  },
}


export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Modifier Keys</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>
            <Option className="size-3" />
          </Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Ctrl</Kbd>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Arrow Keys</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Kbd>
            <ArrowUp className="size-3" />
          </Kbd>
          <Kbd>
            <ArrowDown className="size-3" />
          </Kbd>
          <Kbd>
            <ArrowLeft className="size-3" />
          </Kbd>
          <Kbd>
            <ArrowRight className="size-3" />
          </Kbd>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Action Keys</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Kbd>
            <Delete className="size-3" />
          </Kbd>
          <Kbd>
            <CornerDownLeft className="size-3" />
          </Kbd>
        </div>
      </div>
    </div>
  ),
}

export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Common Shortcuts</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm">Copy</span>
            <div className="flex gap-1">
              <Kbd>
                <Command className="size-3" />
              </Kbd>
              <Kbd>C</Kbd>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm">Paste</span>
            <div className="flex gap-1">
              <Kbd>
                <Command className="size-3" />
              </Kbd>
              <Kbd>V</Kbd>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm">Save</span>
            <div className="flex gap-1">
              <Kbd>
                <Command className="size-3" />
              </Kbd>
              <Kbd>S</Kbd>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm">Undo</span>
            <div className="flex gap-1">
              <Kbd>
                <Command className="size-3" />
              </Kbd>
              <Kbd>Z</Kbd>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm">Redo</span>
            <div className="flex gap-1">
              <Kbd>
                <Command className="size-3" />
              </Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>Z</Kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ApplicationShortcuts: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Search</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">New tab</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>T</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Close tab</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>W</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Open settings</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>,</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Toggle sidebar</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>B</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Zoom in</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>+</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Zoom out</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>-</Kbd>
        </div>
      </div>
    </div>
  ),
}

export const TextEditorShortcuts: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Bold</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>B</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Italic</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>I</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Underline</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>U</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Select all</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>A</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Find</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>F</Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Replace</span>
        <div className="flex gap-1">
          <Kbd>
            <Command className="size-3" />
          </Kbd>
          <Kbd>H</Kbd>
        </div>
      </div>
    </div>
  ),
}

export const ColoredShortcuts: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Quick search</span>
        <div className="flex gap-1">
          <Kbd variant="soft" color="primary">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="primary">
            K
          </Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Save changes</span>
        <div className="flex gap-1">
          <Kbd variant="soft" color="success">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="success">
            S
          </Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Delete item</span>
        <div className="flex gap-1">
          <Kbd variant="soft" color="error">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="error">
            <Delete className="size-3" />
          </Kbd>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="text-sm">Show help</span>
        <div className="flex gap-1">
          <Kbd variant="soft" color="info">
            Shift
          </Kbd>
          <Kbd variant="soft" color="info">
            ?
          </Kbd>
        </div>
      </div>
    </div>
  ),
}

export const InlineDocumentation: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          Press <Kbd>Space</Kbd> to play or pause the video. Use{' '}
          <Kbd>
            <ArrowLeft className="size-3" />
          </Kbd>{' '}
          and{' '}
          <Kbd>
            <ArrowRight className="size-3" />
          </Kbd>{' '}
          to skip forward or backward.
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          To search across the entire app, press{' '}
          <Kbd variant="soft" color="primary">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="primary">
            K
          </Kbd>
          . For advanced filters, use{' '}
          <Kbd variant="soft" color="primary">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="primary">
            Shift
          </Kbd>
          <Kbd variant="soft" color="primary">
            F
          </Kbd>
          .
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          Navigate between tabs using <Kbd>Ctrl</Kbd>
          <Kbd>Tab</Kbd>. Close the current tab with <Kbd>Ctrl</Kbd>
          <Kbd>W</Kbd>.
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          You can quickly save your work by pressing{' '}
          <Kbd variant="soft" color="success">
            <Command className="size-3" />
          </Kbd>
          <Kbd variant="soft" color="success">
            S
          </Kbd>
          , or discard changes with <Kbd>Esc</Kbd>.
        </p>
      </div>
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['solid', 'outline', 'soft'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-4 capitalize">{variant} Variant</h3>
            <div className="space-y-3">
              {sizes.map((size) => (
                <div key={size} className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary w-8 uppercase">{size}</span>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color) => (
                      <Kbd key={`${variant}-${size}-${color}`} variant={variant} color={color} size={size}>
                        ⌘K
                      </Kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

