import type { Meta, StoryObj } from '@storybook/react'
import ScrollArea from './index'
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../card'

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scrollbar direction',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Scrollbar thickness',
    },
    scrollbarVisibility: {
      control: 'select',
      options: ['auto', 'always', 'hover'],
      description: 'Scrollbar visibility behavior',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height (px or CSS string)',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width (px or CSS string)',
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

// Basic Examples

export const Primary: Story = {
  args: {
    direction: 'vertical',
    size: 'md',
    scrollbarVisibility: 'auto',
    maxHeight: 300,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Long Content</h3>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="mb-4">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
        <p className="mb-4">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
          quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>
        <p>
          Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
          est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.
        </p>
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    size: 'md',
    scrollbarVisibility: 'auto',
    maxWidth: 400,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4 flex gap-4" style={{ width: '800px' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-32 bg-primary/10 border border-primary rounded-lg flex items-center justify-center"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const BothDirections: Story = {
  args: {
    direction: 'both',
    size: 'md',
    scrollbarVisibility: 'auto',
    maxHeight: 300,
    maxWidth: 400,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4" style={{ width: '800px', minHeight: '600px' }}>
        <h3 className="text-lg font-semibold mb-4">Scroll Both Directions</h3>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-24 bg-accent/10 border border-accent rounded-lg flex items-center justify-center"
            >
              Cell {i + 1}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
}

// Sizes

// Real-World Examples

export const WithMaxHeight: Story = {
  render: () => (
    <div className="border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Activity Feed</h3>
        <p className="text-sm text-text-secondary">Recent activities in your workspace</p>
      </div>
      <ScrollArea maxHeight={300}>
        <div className="divide-y divide-border">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 hover:bg-surface-hover transition-colors">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary">U{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">User {i + 1} performed an action</p>
                  <p className="text-xs text-text-secondary mt-1">2 minutes ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

export const WithCards: Story = {
  render: () => (
    <ScrollArea maxHeight={400} className="border border-border rounded-lg p-4">
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card {i + 1}</CardTitle>
              <CardDescription>This is a card inside a scroll area</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const ChatMessages: Story = {
  render: () => (
    <div className="w-full max-w-md border border-border rounded-lg">
      <div className="p-4 border-b border-border bg-surface">
        <h3 className="font-semibold">Chat Messages</h3>
      </div>
      <ScrollArea maxHeight={400} size="sm" scrollbarVisibility="hover">
        <div className="p-4 space-y-4">
          {[
            { user: 'Alice', message: 'Hey! How are you?', time: '10:30 AM' },
            { user: 'You', message: 'I\'m good, thanks! How about you?', time: '10:32 AM', isOwn: true },
            { user: 'Alice', message: 'Doing great! Working on the new project.', time: '10:33 AM' },
            { user: 'You', message: 'Nice! How\'s it going?', time: '10:35 AM', isOwn: true },
            { user: 'Alice', message: 'Pretty well! Should be done by Friday.', time: '10:36 AM' },
            { user: 'You', message: 'Awesome! Let me know if you need any help.', time: '10:38 AM', isOwn: true },
          ].map((msg, i) => (
            <div key={i} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-lg p-3 ${msg.isOwn ? 'bg-primary text-white' : 'bg-surface border border-border'}`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className={`text-xs text-text-secondary mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  ),
}
