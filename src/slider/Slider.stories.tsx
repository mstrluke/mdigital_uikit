import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Slider from './index'

const meta: Meta<typeof Slider> = {
  title: 'Data Entry/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current slider value',
    },
    defaultValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Default slider value (uncontrolled)',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Slider size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    footer: {
      control: 'boolean',
      description: 'Show min/max footer',
    },
    range: {
      control: 'boolean',
      description: 'Enable range mode (two thumbs)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation',
    },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  args: {
    defaultValue: 50,
    color: 'primary',
    size: 'md',
    footer: true,
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(50)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Adjust value</label>
          <span className="text-sm font-semibold text-primary">{value}</span>
        </div>
        <Slider value={value} onChange={setValue} footer />
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 bg-surface border border-border rounded text-sm"
          >
            Min
          </button>
          <button
            onClick={() => setValue(50)}
            className="px-3 py-1 bg-surface border border-border rounded text-sm"
          >
            50
          </button>
          <button
            onClick={() => setValue(100)}
            className="px-3 py-1 bg-surface border border-border rounded text-sm"
          >
            Max
          </button>
        </div>
      </div>
    )
  },
}

export const WithCustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(25)

    return (
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Temperature: {value}°C
          </label>
          <Slider
            value={value}
            onChange={setValue}
            min={-10}
            max={50}
            footer
            color="warning"
          />
        </div>
      </div>
    )
  },
}

export const RangeSlider: Story = {
  render: () => {
    const [range, setRange] = useState<number[]>([25, 75])

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Select range</label>
          <span className="text-sm font-semibold text-primary">
            {range[0]} - {range[1]}
          </span>
        </div>
        <Slider value={range} onChange={setRange} range footer />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Disabled slider</label>
        <Slider defaultValue={50} disabled footer />
      </div>
    </div>
  ),
}

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(70)

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Volume</label>
          <span className="text-sm font-semibold">{volume}%</span>
        </div>
        <Slider
          value={volume}
          onChange={setVolume}
          color="primary"
          size="lg"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setVolume(Math.max(0, volume - 10))}
            className="flex-1 px-3 py-2 bg-surface border border-border rounded text-sm"
          >
            -10
          </button>
          <button
            onClick={() => setVolume(volume === 0 ? 70 : 0)}
            className="flex-1 px-3 py-2 bg-surface border border-border rounded text-sm"
          >
            {volume === 0 ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={() => setVolume(Math.min(100, volume + 10))}
            className="flex-1 px-3 py-2 bg-surface border border-border rounded text-sm"
          >
            +10
          </button>
        </div>
      </div>
    )
  },
}

export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<number[]>([100, 500])
    const products = [
      { name: 'Product A', price: 50 },
      { name: 'Product B', price: 150 },
      { name: 'Product C', price: 300 },
      { name: 'Product D', price: 450 },
      { name: 'Product E', price: 600 },
    ]

    const filteredProducts = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    return (
      <div className="max-w-md space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Filter by Price</h3>
          <Slider
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={1000}
            step={50}
            range
            footer
            color="success"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Products</span>
            <span className="text-text-secondary">
              {filteredProducts.length} of {products.length}
            </span>
          </div>
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 bg-surface rounded border border-border"
              >
                <span className="text-sm">{product.name}</span>
                <span className="text-sm font-medium">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const MultipleSliders: Story = {
  render: () => {
    const [volume, setVolume] = useState(70)
    const [bass, setBass] = useState(50)
    const [treble, setTreble] = useState(50)
    const [balance, setBalance] = useState(50)

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-6">
        <h3 className="text-lg font-semibold">Audio Settings</h3>

        <div>
          <label className="text-sm font-medium mb-2 block">Volume: {volume}%</label>
          <Slider value={volume} onChange={setVolume} color="primary" />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Bass: {bass}%</label>
          <Slider value={bass} onChange={setBass} color="success" />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Treble: {treble}%</label>
          <Slider value={treble} onChange={setTreble} color="info" />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Balance: {balance < 50 ? `L${50 - balance}` : balance > 50 ? `R${balance - 50}` : 'Center'}
          </label>
          <Slider value={balance} onChange={setBalance} color="warning" />
        </div>

        <button
          onClick={() => {
            setVolume(70)
            setBass(50)
            setTreble(50)
            setBalance(50)
          }}
          className="w-full px-4 py-2 bg-surface border border-border rounded text-sm"
        >
          Reset to Defaults
        </button>
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState(50)

    return (
      <div className="h-64 flex items-center gap-8">
        <Slider value={value} onChange={setValue} orientation="vertical" footer color="primary" />
        <Slider defaultValue={30} orientation="vertical" footer color="success" />
        <Slider defaultValue={70} orientation="vertical" footer color="info" />
        <Slider defaultValue={50} orientation="vertical" footer color="warning" disabled />
      </div>
    )
  },
}

export const AudioMixer: Story = {
  render: () => {
    const [channels, setChannels] = useState([70, 50, 60, 80, 45])
    const labels = ['Vocals', 'Guitar', 'Bass', 'Drums', 'Keys']

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Audio Mixer</h3>
        <div className="h-48 flex items-end gap-6">
          {channels.map((val, i) => (
            <div key={labels[i]} className="flex flex-col items-center gap-2 h-full">
              <Slider
                value={val}
                onChange={(v) => {
                  const next = [...channels]
                  next[i] = v as number
                  setChannels(next)
                }}
                orientation="vertical"
                color="primary"
                size="sm"
              />
              <span className="text-xs text-text-secondary">{labels[i]}</span>
              <span className="text-xs font-medium">{val}%</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setChannels([70, 50, 60, 80, 45])}
          className="w-full px-4 py-2 bg-surface border border-border rounded text-sm"
        >
          Reset
        </button>
      </div>
    )
  },
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    const variants = ['default', 'solid', 'soft'] as const;

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant} className="space-y-4">
            <h3 className="text-sm font-semibold capitalize">{variant} Variant</h3>
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                  {sizes.map(s => (
                    <th key={s} className="p-2 text-center text-sm text-gray-500">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colors.map(c => (
                  <tr key={c}>
                    <td className="p-2 text-sm font-medium">{c}</td>
                    {sizes.map(s => (
                      <td key={s} className="p-2">
                        <Slider color={c} size={s} variant={variant} defaultValue={50} className="w-40" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
}
