import type { ComponentProps } from 'react'
import type { Group, Panel, Separator } from 'react-resizable-panels'

export type ResizablePanelGroupProps = ComponentProps<typeof Group>
export type ResizablePanelProps = ComponentProps<typeof Panel>

export interface ResizableHandleProps extends ComponentProps<typeof Separator> {
  withHandle?: boolean
}
