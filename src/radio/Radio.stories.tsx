import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Radio from './index'

const meta: Meta<typeof Radio> = {
  title: 'Data Entry/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Radio size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below radio',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    label: 'Radio option',
    name: 'default',
  },
}


export const WithLabels: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1')

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Radio
          label="Option 1"
          name="options"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 2"
          helperText="This is a helpful description for option 2"
          name="options"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 3"
          helperText="This is a helpful description for option 3"
          name="options"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled (checked)',
    name: 'disabled',
    disabled: true,
    checked: true,
  },
}

export const WithError: Story = {
  render: () => {
    const [selected, setSelected] = useState('')

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Radio
          label="Option 1"
          name="error-example"
          value="option1"
          error={!selected && 'Please select an option'}
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 2"
          name="error-example"
          value="option2"
          error={!selected && 'Please select an option'}
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 3"
          name="error-example"
          value="option3"
          error={!selected && 'Please select an option'}
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    )
  },
}

export const PaymentMethodExample: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')

    return (
      <div className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Select Payment Method</h3>
        <div className="space-y-3">
          <Radio
            label="Credit Card"
            helperText="Pay with Visa, Mastercard, or American Express"
            name="payment"
            value="credit-card"
            checked={paymentMethod === 'credit-card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Radio
            label="PayPal"
            helperText="Secure payment through PayPal"
            name="payment"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Radio
            label="Bank Transfer"
            helperText="Direct bank transfer (may take 2-3 business days)"
            name="payment"
            value="bank-transfer"
            checked={paymentMethod === 'bank-transfer'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Radio
            label="Cryptocurrency"
            helperText="Pay with Bitcoin or Ethereum"
            name="payment"
            value="crypto"
            disabled
          />
        </div>
      </div>
    )
  },
}

export const ShippingOptionsExample: Story = {
  render: () => {
    const [shipping, setShipping] = useState('standard')

    return (
      <div className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Shipping Method</h3>
        <div className="space-y-3">
          <Radio
            label="Standard Shipping - Free"
            helperText="Delivery in 5-7 business days"
            name="shipping"
            value="standard"
            color="success"
            checked={shipping === 'standard'}
            onChange={(e) => setShipping(e.target.value)}
          />
          <Radio
            label="Express Shipping - $9.99"
            helperText="Delivery in 2-3 business days"
            name="shipping"
            value="express"
            color="info"
            checked={shipping === 'express'}
            onChange={(e) => setShipping(e.target.value)}
          />
          <Radio
            label="Overnight Shipping - $24.99"
            helperText="Next business day delivery"
            name="shipping"
            value="overnight"
            color="warning"
            checked={shipping === 'overnight'}
            onChange={(e) => setShipping(e.target.value)}
          />
        </div>
      </div>
    )
  },
}

export const SubscriptionPlanExample: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro')

    return (
      <div className="space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold">Choose Your Plan</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <Radio
              label={
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="font-medium">Free</span>
                    <span className="ml-2 text-muted-foreground">$0/month</span>
                  </div>
                </div>
              }
              helperText="Basic features for personal use"
              name="plan"
              value="free"
              checked={plan === 'free'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>

          <div className="border border-primary rounded-lg p-4 bg-primary/5">
            <Radio
              label={
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="font-medium">Pro</span>
                    <span className="ml-2 text-muted-foreground">$19/month</span>
                  </div>
                  <span className="px-2 py-1 text-xs bg-primary text-white rounded">
                    Popular
                  </span>
                </div>
              }
              helperText="Advanced features and priority support"
              name="plan"
              value="pro"
              color="primary"
              checked={plan === 'pro'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>

          <div className="border border-border rounded-lg p-4">
            <Radio
              label={
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="font-medium">Enterprise</span>
                    <span className="ml-2 text-muted-foreground">$99/month</span>
                  </div>
                </div>
              }
              helperText="Custom solutions with dedicated support"
              name="plan"
              value="enterprise"
              checked={plan === 'enterprise'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  },
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                {sizes.map(size => (
                  <th key={size} className="p-2 text-center text-sm text-gray-500">{size}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map(color => (
                <tr key={color}>
                  <td className="p-2 text-sm font-medium">{color}</td>
                  {sizes.map(size => (
                    <td key={size} className="p-2">
                      <Radio color={color} size={size} label={color} name={`radio-${color}-${size}`} defaultChecked />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
}


