import type { Meta, StoryObj } from '@storybook/react'

import Result from './index'
import Button from '../button'

const meta: Meta<typeof Result> = {
  title: 'Feedback/Result',
  component: Result,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Result>

export const Success: Story = {
  render: () => (
    <Result
      status="success"
      title="Payment Successful"
      subtitle="Your transaction has been processed. A confirmation email will be sent shortly."
      extra={
        <>
          <Button>Go to Dashboard</Button>
          <Button variant="outline">View Receipt</Button>
        </>
      }
    />
  ),
}

export const Error: Story = {
  render: () => (
    <Result
      status="error"
      title="Submission Failed"
      subtitle="Please check your input and try again. If the problem persists, contact support."
      extra={<Button color="error">Try Again</Button>}
    />
  ),
}

export const Warning: Story = {
  render: () => (
    <Result status="warning" title="Account Suspended" subtitle="Your account has been temporarily suspended. Contact support for more details." />
  ),
}

export const Info: Story = {
  render: () => (
    <Result status="info" title="Email Verification Sent" subtitle="We've sent a verification link to your email address. Please check your inbox." />
  ),
}

export const NotFound: Story = {
  render: () => (
    <Result
      status="404"
      subtitle="Sorry, the page you visited does not exist."
      extra={<Button>Back Home</Button>}
    />
  ),
}

export const Forbidden: Story = {
  render: () => (
    <Result
      status="403"
      subtitle="You don't have permission to access this resource."
      extra={<Button variant="outline">Request Access</Button>}
    />
  ),
}

export const ServerError: Story = {
  render: () => (
    <Result
      status="500"
      subtitle="Something went wrong on our end. Please try again later."
      extra={<Button color="error">Refresh</Button>}
    />
  ),
}

export const WithContent: Story = {
  render: () => (
    <Result status="success" title="Order Placed" subtitle="Order #12345 confirmed">
      <div className="bg-surface rounded-lg p-4 text-left">
        <h4 className="font-semibold mb-2">Order Summary</h4>
        <div className="space-y-1 text-sm text-text-secondary">
          <div className="flex justify-between"><span>Widget Pro × 2</span><span>$59.98</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          <div className="flex justify-between font-semibold text-text-primary border-t border-border pt-1 mt-1">
            <span>Total</span><span>$59.98</span>
          </div>
        </div>
      </div>
    </Result>
  ),
}
