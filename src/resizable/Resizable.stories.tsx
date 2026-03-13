import type { Meta, StoryObj } from '@storybook/react'

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './index'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Layout/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-2xl rounded-lg border border-border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-48 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-48 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="max-w-md rounded-lg border border-border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-24 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Top</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-36 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Bottom</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-2xl rounded-lg border border-border">
      <ResizablePanel defaultSize={30}>
        <div className="flex h-48 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-48 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-3xl rounded-lg border border-border">
      <ResizablePanel defaultSize={20} minSize={10}>
        <div className="flex h-48 items-center justify-center p-4 bg-surface/50">
          <span className="text-sm font-medium text-text-secondary">Nav</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>
        <div className="flex h-48 items-center justify-center p-4">
          <span className="font-semibold text-text-primary">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-48 items-center justify-center p-4 bg-surface/50">
          <span className="text-sm font-medium text-text-secondary">Inspector</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="max-w-2xl rounded-lg border border-border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-64 items-center justify-center p-6">
          <span className="font-semibold text-text-primary">Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold text-text-primary">Top Right</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold text-text-primary">Bottom Right</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
