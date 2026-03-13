import type { Meta, StoryObj } from '@storybook/react'
import {
  User,
  CreditCard,
  Check,
  ShoppingCart,
  Package,
  Truck,
  Home,
  FileText,
  Mail,
  Settings,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import Stepper from './index'
import type { StepItem } from './types'

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: 'number',
      description: 'Current active step index (0-based)',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Theme color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    type: {
      control: 'select',
      options: ['numbered', 'dots'],
      description: 'Step indicator type',
    },
    status: {
      control: 'select',
      options: ['wait', 'process', 'finish', 'error'],
      description: 'Overall status for current step',
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

const basicSteps: StepItem[] = [
  { label: 'Step 1', description: 'First step description' },
  { label: 'Step 2', description: 'Second step description' },
  { label: 'Step 3', description: 'Third step description' },
  { label: 'Step 4', description: 'Fourth step description' },
]

const checkoutSteps: StepItem[] = [
  { label: 'Cart', description: 'Review your items', icon: <ShoppingCart className="w-5 h-5" /> },
  { label: 'Shipping', description: 'Enter shipping details', icon: <Truck className="w-5 h-5" /> },
  { label: 'Payment', description: 'Complete payment', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Confirm', description: 'Order confirmation', icon: <Check className="w-5 h-5" /> },
]

const registrationSteps: StepItem[] = [
  { label: 'Account', description: 'Create your account', icon: <User className="w-5 h-5" /> },
  { label: 'Profile', description: 'Complete your profile', icon: <FileText className="w-5 h-5" /> },
  { label: 'Verify', description: 'Verify your email', icon: <Mail className="w-5 h-5" /> },
  { label: 'Done', description: 'Start using the app', icon: <Check className="w-5 h-5" /> },
]

export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    color: 'primary',
    size: 'md',
    variant: 'default',
    orientation: 'horizontal',
    type: 'numbered',
  },
}


export const WithIcons: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    color: 'primary',
  },
}

export const DotsType: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-semibold mb-4">Dots - Primary</h3>
        <Stepper
          steps={basicSteps}
          currentStep={1}
          type="dots"
          color="primary"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Dots - Success</h3>
        <Stepper
          steps={[
            { label: 'Start', description: 'Begin the process' },
            { label: 'Middle', description: 'Process in progress' },
            { label: 'End', description: 'Complete the process' },
          ]}
          currentStep={1}
          type="dots"
          color="success"
        />
      </div>
    </div>
  ),
}

export const VerticalOrientation: Story = {
  args: {
    orientation: "horizontal"
  },

  render: () => (
    <div className="space-y-8">
      <div className="max-w-md">
        <h3 className="text-sm font-semibold mb-4">Vertical - Numbered</h3>
        <Stepper
          steps={registrationSteps}
          currentStep={1}
          orientation="vertical"
          color="primary"
        />
      </div>
    </div>
  )
}

export const VerticalWithDetails: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h3 className="text-sm font-semibold mb-4">Setup Process</h3>
      <Stepper
        steps={[
          {
            label: 'Create Account',
            description: 'Sign up with your email and create a secure password',
          },
          {
            label: 'Verify Email',
            description: 'Check your inbox and verify your email address',
          },
          {
            label: 'Complete Profile',
            description: 'Add your personal information and preferences',
          },
          {
            label: 'Choose Plan',
            description: 'Select a subscription plan that fits your needs',
          },
        ]}
        currentStep={1}
        orientation="vertical"
        color="accent"
        size="md"
      />
    </div>
  ),
}

export const ClickableSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1)

    return (
      <div className="space-y-4">
        <div className="text-sm text-text-secondary">
          Click on any completed step to navigate back
        </div>
        <Stepper
          steps={checkoutSteps}
          currentStep={currentStep}
          onStepClick={(index) => {
            if (index <= currentStep) {
              setCurrentStep(index)
            }
          }}
          color="primary"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-border text-text-primary rounded hover:bg-border/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(checkoutSteps.length - 1, currentStep + 1))}
            disabled={currentStep === checkoutSteps.length - 1}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    )
  },
}

export const InteractiveCheckout: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)

    const steps: StepItem[] = [
      {
        label: 'Shopping Cart',
        description: 'Review your items',
        icon: <ShoppingCart className="w-5 h-5" />,
      },
      {
        label: 'Shipping Info',
        description: 'Enter delivery address',
        icon: <Truck className="w-5 h-5" />,
      },
      {
        label: 'Payment',
        description: 'Complete payment',
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: 'Confirmation',
        description: 'Order confirmed',
        icon: <Check className="w-5 h-5" />,
      },
    ]

    const stepContent = [
      <div key="cart" className="p-6 bg-surface rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Product 1</span>
            <span className="font-medium">$29.99</span>
          </div>
          <div className="flex justify-between">
            <span>Product 2</span>
            <span className="font-medium">$49.99</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>$79.98</span>
          </div>
        </div>
      </div>,
      <div key="shipping" className="p-6 bg-surface rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-border rounded"
          />
          <input
            type="text"
            placeholder="Street Address"
            className="w-full px-3 py-2 border border-border rounded"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="px-3 py-2 border border-border rounded"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="px-3 py-2 border border-border rounded"
            />
          </div>
        </div>
      </div>,
      <div key="payment" className="p-6 bg-surface rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-3 py-2 border border-border rounded"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-3 py-2 border border-border rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              className="px-3 py-2 border border-border rounded"
            />
          </div>
        </div>
      </div>,
      <div key="confirmation" className="p-6 bg-success/10 rounded-lg border border-success">
        <div className="flex items-center gap-3 mb-4">
          <Check className="w-6 h-6 text-success" />
          <h3 className="text-lg font-semibold text-success">Order Confirmed!</h3>
        </div>
        <p className="text-text-secondary">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
      </div>,
    ]

    return (
      <div className="max-w-2xl space-y-6">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          color="success"
          size="md"
        />
        <div className="min-h-[200px]">
          {stepContent[currentStep]}
        </div>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-border text-text-primary rounded hover:bg-border/80"
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-success text-white rounded hover:bg-success/90 ml-auto"
            >
              {currentStep === steps.length - 2 ? 'Complete Order' : 'Continue'}
            </button>
          )}
        </div>
      </div>
    )
  },
}

export const OnboardingFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)

    const steps: StepItem[] = [
      { label: 'Welcome', description: 'Get started', icon: <Home className="w-5 h-5" /> },
      { label: 'Profile', description: 'Tell us about yourself', icon: <User className="w-5 h-5" /> },
      { label: 'Preferences', description: 'Customize your experience', icon: <Settings className="w-5 h-5" /> },
      { label: 'Complete', description: 'You\'re all set!', icon: <Check className="w-5 h-5" /> },
    ]

    return (
      <div className="max-w-3xl">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
          color="primary"
          size="lg"
        />
        <div className="mt-6 flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-border text-text-primary rounded hover:bg-border/80"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    )
  },
}

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    const simpleSteps: StepItem[] = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];

    return (
      <div className="space-y-6">
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
                    <Stepper steps={simpleSteps} currentStep={1} color={c} size={s} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
