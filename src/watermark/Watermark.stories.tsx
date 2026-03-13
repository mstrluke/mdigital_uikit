import type { Meta, StoryObj } from '@storybook/react'

import Watermark from './index'

const meta: Meta<typeof Watermark> = {
  title: 'Other/Watermark',
  component: Watermark,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Canvas-rendered watermark overlay. Supports text or image watermarks with configurable rotation, gap, font, and opacity.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Watermark>

export const Default: Story = {
  render: () => (
    <Watermark text="Confidential">
      <div className="h-64 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Sensitive Document</h3>
        <p className="text-text-secondary">
          This content is protected with a watermark overlay.
        </p>
      </div>
    </Watermark>
  ),
}

export const MultiLine: Story = {
  render: () => (
    <Watermark text={['Internal Use', 'Do Not Share']}>
      <div className="h-64 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Multi-line Watermark</h3>
        <p className="text-text-secondary">Two lines of watermark text.</p>
      </div>
    </Watermark>
  ),
}

export const CustomStyle: Story = {
  render: () => (
    <Watermark
      text="DRAFT"
      fontSize={20}
      fontColor="rgba(255,0,0,0.1)"
      rotate={-30}
      gap={[80, 80]}
    >
      <div className="h-64 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Draft Document</h3>
        <p className="text-text-secondary">Large red DRAFT watermark.</p>
      </div>
    </Watermark>
  ),
}

export const OpacityLevels: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[0.05, 0.1, 0.2].map((opacity) => (
        <Watermark key={opacity} text="Sample" opacity={opacity}>
          <div className="h-48 p-4 rounded-lg border border-border">
            <h4 className="text-sm font-semibold mb-1">
              Opacity: {opacity}
            </h4>
            <p className="text-xs text-text-secondary">
              {opacity === 0.05
                ? 'Very subtle'
                : opacity === 0.1
                  ? 'Default visibility'
                  : 'More visible'}
            </p>
          </div>
        </Watermark>
      ))}
    </div>
  ),
}

export const DenseGap: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Watermark text="Normal" gap={[100, 100]}>
        <div className="h-56 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold mb-1">Normal Gap</h4>
          <p className="text-xs text-text-secondary">gap: [100, 100]</p>
        </div>
      </Watermark>
      <Watermark text="Dense" gap={[40, 40]}>
        <div className="h-56 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold mb-1">Dense Gap</h4>
          <p className="text-xs text-text-secondary">gap: [40, 40]</p>
        </div>
      </Watermark>
    </div>
  ),
}

export const RotationAngles: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[-45, -22, 0].map((rotate) => (
        <Watermark key={rotate} text="Watermark" rotate={rotate}>
          <div className="h-48 p-4 rounded-lg border border-border">
            <h4 className="text-sm font-semibold mb-1">
              Rotate: {rotate}°
            </h4>
            <p className="text-xs text-text-secondary">
              {rotate === 0 ? 'Horizontal' : `Tilted ${rotate}°`}
            </p>
          </div>
        </Watermark>
      ))}
    </div>
  ),
}

export const RichContent: Story = {
  render: () => (
    <Watermark text="© 2026 Acme Corp" fontColor="rgba(0,0,0,0.06)" fontSize={14} rotate={-20}>
      <div className="p-6 rounded-lg border border-border space-y-4">
        <h3 className="text-lg font-semibold">Quarterly Report</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-md bg-surface">
            <p className="text-2xl font-bold text-primary">$2.4M</p>
            <p className="text-xs text-text-secondary">Revenue</p>
          </div>
          <div className="p-4 rounded-md bg-surface">
            <p className="text-2xl font-bold text-success">+18%</p>
            <p className="text-xs text-text-secondary">Growth</p>
          </div>
          <div className="p-4 rounded-md bg-surface">
            <p className="text-2xl font-bold text-info">1,247</p>
            <p className="text-xs text-text-secondary">Customers</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          This document contains proprietary information. The watermark is rendered via
          a canvas element and cannot be removed by editing the DOM.
        </p>
      </div>
    </Watermark>
  ),
}
