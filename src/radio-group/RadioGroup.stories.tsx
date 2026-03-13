import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Radio from '../radio'
import RadioGroup from './index'

const meta: Meta<typeof RadioGroup> = {
  title: 'Data Entry/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    label: {
      control: 'text',
      description: 'Group label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Primary: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1')

    return (
      <RadioGroup label="Select an option">
        <Radio
          label="Option 1"
          name="primary"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 2"
          name="primary"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 3"
          name="primary"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </RadioGroup>
    )
  },
}

export const VerticalLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState('email')

    return (
      <RadioGroup label="Contact Method" orientation="vertical">
        <Radio
          label="Email"
          helperText="We'll send updates to your email"
          name="vertical"
          value="email"
          checked={selected === 'email'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Phone"
          helperText="We'll call you for important updates"
          name="vertical"
          value="phone"
          checked={selected === 'phone'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="SMS"
          helperText="Receive text messages"
          name="vertical"
          value="sms"
          checked={selected === 'sms'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </RadioGroup>
    )
  },
}

export const HorizontalLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState('medium')

    return (
      <RadioGroup label="Size" orientation="horizontal">
        <Radio
          label="Small"
          name="horizontal"
          value="small"
          checked={selected === 'small'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Medium"
          name="horizontal"
          value="medium"
          checked={selected === 'medium'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Large"
          name="horizontal"
          value="large"
          checked={selected === 'large'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </RadioGroup>
    )
  },
}

export const WithHelperText: Story = {
  render: () => {
    const [selected, setSelected] = useState('standard')

    return (
      <RadioGroup
        label="Shipping Method"
        helperText="Choose your preferred delivery option"
        orientation="vertical"
      >
        <Radio
          label="Standard Shipping - Free"
          helperText="Delivery in 5-7 business days"
          name="shipping"
          value="standard"
          checked={selected === 'standard'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Express Shipping - $9.99"
          helperText="Delivery in 2-3 business days"
          name="shipping"
          value="express"
          checked={selected === 'express'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Overnight Shipping - $24.99"
          helperText="Next business day delivery"
          name="shipping"
          value="overnight"
          checked={selected === 'overnight'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </RadioGroup>
    )
  },
}

export const WithError: Story = {
  render: () => {
    const [selected, setSelected] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
      setSubmitted(true)
    }

    return (
      <div className="space-y-4 max-w-md">
        <RadioGroup
          label="Select your preference *"
          error={submitted && !selected ? 'Please select an option' : ''}
          orientation="vertical"
        >
          <Radio
            label="Option 1"
            name="error-demo"
            value="option1"
            checked={selected === 'option1'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            label="Option 2"
            name="error-demo"
            value="option2"
            checked={selected === 'option2'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            label="Option 3"
            name="error-demo"
            value="option3"
            checked={selected === 'option3'}
            onChange={(e) => setSelected(e.target.value)}
          />
        </RadioGroup>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </div>
    )
  },
}


export const PaymentMethodExample: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')

    return (
      <div className="max-w-md">
        <RadioGroup
          label="Select Payment Method"
          helperText="Choose how you'd like to pay"
          orientation="vertical"
        >
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
        </RadioGroup>
      </div>
    )
  },
}

export const SubscriptionPlanExample: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro')

    return (
      <div className="max-w-2xl">
        <RadioGroup
          label="Choose Your Plan"
          helperText="Select the plan that best fits your needs"
          orientation="vertical"
        >
          <div className="border border-border rounded-lg p-4">
            <Radio
              label={
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="font-medium">Free</span>
                    <span className="ml-2 text-text-secondary">$0/month</span>
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
                    <span className="ml-2 text-text-secondary">$19/month</span>
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
                    <span className="ml-2 text-text-secondary">$99/month</span>
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
        </RadioGroup>
      </div>
    )
  },
}

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      contactMethod: '',
      frequency: '',
    })
    const [errors, setErrors] = useState({
      contactMethod: '',
      frequency: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      const newErrors = {
        contactMethod: !formData.contactMethod ? 'Please select a contact method' : '',
        frequency: !formData.frequency ? 'Please select a frequency' : '',
      }

      setErrors(newErrors)

      if (!newErrors.contactMethod && !newErrors.frequency) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Preferences</h3>
          <p className="text-sm text-text-secondary">
            Tell us how you'd like to be contacted
          </p>
        </div>

        <RadioGroup
          label="Preferred contact method *"
          error={errors.contactMethod}
          orientation="vertical"
        >
          <Radio
            label="Email"
            helperText="We'll send updates to your email address"
            name="contactMethod"
            value="email"
            checked={formData.contactMethod === 'email'}
            onChange={(e) => {
              setFormData({ ...formData, contactMethod: e.target.value })
              setErrors({ ...errors, contactMethod: '' })
            }}
          />
          <Radio
            label="Phone"
            helperText="We'll call you for important updates"
            name="contactMethod"
            value="phone"
            checked={formData.contactMethod === 'phone'}
            onChange={(e) => {
              setFormData({ ...formData, contactMethod: e.target.value })
              setErrors({ ...errors, contactMethod: '' })
            }}
          />
          <Radio
            label="SMS"
            helperText="Receive text messages for quick updates"
            name="contactMethod"
            value="sms"
            checked={formData.contactMethod === 'sms'}
            onChange={(e) => {
              setFormData({ ...formData, contactMethod: e.target.value })
              setErrors({ ...errors, contactMethod: '' })
            }}
          />
        </RadioGroup>

        <RadioGroup
          label="How often would you like to hear from us? *"
          error={errors.frequency}
          orientation="vertical"
        >
          <Radio
            label="Daily"
            name="frequency"
            value="daily"
            checked={formData.frequency === 'daily'}
            onChange={(e) => {
              setFormData({ ...formData, frequency: e.target.value })
              setErrors({ ...errors, frequency: '' })
            }}
          />
          <Radio
            label="Weekly"
            name="frequency"
            value="weekly"
            checked={formData.frequency === 'weekly'}
            onChange={(e) => {
              setFormData({ ...formData, frequency: e.target.value })
              setErrors({ ...errors, frequency: '' })
            }}
          />
          <Radio
            label="Monthly"
            name="frequency"
            value="monthly"
            checked={formData.frequency === 'monthly'}
            onChange={(e) => {
              setFormData({ ...formData, frequency: e.target.value })
              setErrors({ ...errors, frequency: '' })
            }}
          />
        </RadioGroup>

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Preferences
          </button>
        </div>

        {submitted && (
          <p className="text-sm text-success">Preferences saved successfully!</p>
        )}
      </form>
    )
  },
}

