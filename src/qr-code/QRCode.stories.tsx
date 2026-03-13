import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import QRCode from './index'
import Button from '../button'
import type { QRCodeColor } from './types'

const meta: Meta<typeof QRCode> = {
  title: 'Data Display/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof QRCode>

export const Default: Story = {
  args: { value: 'https://example.com' },
}

export const Colors: Story = {
  render: () => {
    const colors: QRCodeColor[] = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info']
    return (
      <div className="flex flex-wrap gap-4">
        {colors.map((c) => (
          <div key={c} className="text-center space-y-2">
            <QRCode value="https://example.com" color={c} size={120} moduleStyle="dots" />
            <p className="text-xs text-text-secondary capitalize">{c}</p>
          </div>
        ))}
      </div>
    )
  },
}

export const ColorsSolid: Story = {
  name: 'Colors (rounded)',
  render: () => {
    const colors: QRCodeColor[] = ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info']
    return (
      <div className="flex flex-wrap gap-4">
        {colors.map((c) => (
          <div key={c} className="text-center space-y-2">
            <QRCode value="https://example.com" color={c} size={120} moduleStyle="rounded" finderStyle="rounded" />
            <p className="text-xs text-text-secondary capitalize">{c}</p>
          </div>
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <QRCode value="https://example.com" size={80} />
      <QRCode value="https://example.com" size={128} />
      <QRCode value="https://example.com" size={200} />
    </div>
  ),
}

export const ModuleStyles: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" moduleStyle="squares" size={140} />
        <p className="text-xs text-text-secondary">Squares</p>
      </div>
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" moduleStyle="dots" size={140} />
        <p className="text-xs text-text-secondary">Dots</p>
      </div>
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" moduleStyle="rounded" size={140} />
        <p className="text-xs text-text-secondary">Rounded</p>
      </div>
    </div>
  ),
}

export const FinderStyles: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" finderStyle="square" moduleStyle="dots" size={140} />
        <p className="text-xs text-text-secondary">Square finders + dots</p>
      </div>
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" finderStyle="rounded" moduleStyle="dots" size={140} />
        <p className="text-xs text-text-secondary">Rounded finders + dots</p>
      </div>
      <div className="text-center space-y-2">
        <QRCode value="https://example.com" finderStyle="dot" moduleStyle="dots" size={140} />
        <p className="text-xs text-text-secondary">Dot finders + dots</p>
      </div>
    </div>
  ),
}

export const ExplicitColors: Story = {
  name: 'Explicit fgColor/bgColor',
  render: () => (
    <div className="flex gap-4">
      <QRCode value="https://example.com" fgColor="#3b82f6" moduleStyle="dots" />
      <QRCode value="https://example.com" fgColor="#22c55e" bgColor="#f0fdf4" moduleStyle="rounded" />
      <QRCode value="https://example.com" fgColor="#8b5cf6" bgColor="#faf5ff" moduleStyle="dots" finderStyle="rounded" />
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <QRCode
        value="https://example.com"
        icon="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
        iconSize={36}
        moduleStyle="dots"
        finderStyle="rounded"
        color="info"
        size={160}
        errorLevel="H"
      />
      <QRCode
        value="https://github.com"
        icon="https://github.githubassets.com/favicons/favicon-dark.svg"
        iconSize={32}
        iconBorderRadius={8}
        moduleStyle="rounded"
        size={160}
        errorLevel="H"
      />
    </div>
  ),
}

export const SVGType: Story = {
  render: () => (
    <div className="flex gap-4">
      <QRCode value="https://example.com" type="svg" moduleStyle="squares" />
      <QRCode value="https://example.com" type="svg" moduleStyle="dots" color="error" />
      <QRCode value="https://example.com" type="svg" moduleStyle="rounded" finderStyle="rounded" color="accent" />
    </div>
  ),
}

export const Expired: Story = {
  render: () => {
    const [status, setStatus] = useState<'active' | 'expired'>('expired')
    return (
      <div className="space-y-4">
        <QRCode value="https://example.com" status={status} onRefresh={() => setStatus('active')} moduleStyle="dots" color="primary" />
        <Button size="sm" onClick={() => setStatus('expired')} variant="outline">Expire it</Button>
      </div>
    )
  },
}

export const Loading: Story = {
  args: { value: 'https://example.com', status: 'loading', color: 'primary' },
}

export const NoBorder: Story = {
  args: { value: 'https://example.com', bordered: false, moduleStyle: 'dots', color: 'primary' },
}

export const ErrorLevels: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['L', 'M', 'Q', 'H'] as const).map((level) => (
        <div key={level} className="text-center space-y-2">
          <QRCode value="https://example.com" errorLevel={level} size={110} moduleStyle="dots" color="primary" />
          <p className="text-xs text-text-secondary">Level {level}</p>
        </div>
      ))}
    </div>
  ),
}
