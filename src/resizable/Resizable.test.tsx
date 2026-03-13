import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './index'

describe('Resizable', () => {
  it('renders panel group', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector('[data-slot="resizable-group"]')).toBeInTheDocument()
  })

  it('renders panels', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panels = container.querySelectorAll('[data-slot="resizable-panel"]')
    expect(panels.length).toBe(2)
  })

  it('renders handle', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument()
  })

  it('renders vertical layout', () => {
    const { container } = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50}>Top</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Bottom</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector('[data-slot="resizable-group"]')).toBeInTheDocument()
  })

  it('renders handle with grip', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>A</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument()
  })
})
