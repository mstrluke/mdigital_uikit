import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InputOTP from './index'

const meta: Meta<typeof InputOTP> = {
  title: 'Data Entry/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of OTP input fields',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Input field size',
    },
    type: {
      control: 'select',
      options: ['text', 'number'],
      description: 'Input type (affects mobile keyboard)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus first input on mount',
    },
    messagePosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position of validation message',
    },
  },
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const Primary: Story = {
  args: {
    length: 6,
    size: 'md',
    placeholder: 'Enter OTP',
  },
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <InputOTP
        label="Valid Code"
        length={6}
        value="123456"
        success="Code verified successfully!"
      />
      <InputOTP
        label="Invalid Code"
        length={6}
        value="12345"
        error="Invalid verification code"
      />
      <InputOTP
        label="Warning"
        length={6}
        value="111111"
        warning="Code expires in 30 seconds"
      />
      <InputOTP
        label="Info"
        length={6}
        info="Enter the code from your authenticator app"
      />
    </div>
  ),
}

export const ControlledComponent: Story = {
  render: () => {
    const [otp, setOtp] = useState('')

    return (
      <div className="max-w-md space-y-4">
        <InputOTP
          label="Controlled OTP Input"
          length={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          helperText={`Current value: ${otp || '(empty)'}`}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setOtp('123456')}
            className="px-4 py-2 bg-primary text-background rounded-md text-sm font-medium hover:bg-primary/90"
          >
            Set "123456"
          </button>
          <button
            onClick={() => setOtp('')}
            className="px-4 py-2 bg-surface text-text-primary border border-border rounded-md text-sm font-medium hover:bg-surface/80"
          >
            Clear
          </button>
        </div>
      </div>
    )
  },
}

export const WithCompletion: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleComplete = (value: string) => {
      setSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        setCompleted(true)
        setSubmitting(false)
      }, 1000)
    }

    return (
      <div className="max-w-md">
        <InputOTP
          label="Enter Verification Code"
          length={6}
          onComplete={handleComplete}
          disabled={submitting}
          {...(completed && { success: 'Code verified successfully!' })}
          {...(submitting && { info: 'Verifying code...' })}
          helperText={!submitting && !completed ? 'Code will be verified automatically' : undefined}
        />
      </div>
    )
  },
}

export const EmailVerification: Story = {
  render: () => {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState(false)

    const handleComplete = (value: string) => {
      setError(undefined)
      // Simulate verification
      setTimeout(() => {
        if (value === '123456') {
          setSuccess(true)
        } else {
          setError('Invalid code. Please try again.')
          setOtp('')
        }
      }, 500)
    }

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Verify Your Email</h2>
          <p className="text-sm text-text-secondary mt-1">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        <InputOTP
          label="Verification Code"
          length={6}
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
          autoFocus
          type="number"
          pattern="[0-9]"
          error={error}
          success={success ? 'Email verified successfully!' : undefined}
        />

        {!success && (
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => alert('Resending code...')}
          >
            Didn't receive the code? Resend
          </button>
        )}
      </div>
    )
  },
}

export const TwoFactorAuth: Story = {
  render: () => {
    const [otp, setOtp] = useState('')
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)

    const handleComplete = (value: string) => {
      setVerifying(true)
      // Simulate 2FA verification
      setTimeout(() => {
        setVerifying(false)
        if (value === '654321') {
          setVerified(true)
        }
      }, 1500)
    }

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Two-Factor Authentication</h2>
          <p className="text-sm text-text-secondary mt-1">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <InputOTP
          label="Authentication Code"
          length={6}
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
          autoFocus
          type="number"
          pattern="[0-9]"
          disabled={verifying || verified}
          {...(verifying && { info: 'Verifying code...' })}
          {...(verified && { success: 'Authentication successful!' })}
        />

        <div className="text-xs text-text-secondary">
          Tip: Use "654321" to test successful verification
        </div>
      </div>
    )
  },
}

export const SMSVerification: Story = {
  render: () => {
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(60)

    // Countdown timer
    useState(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    })

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Phone Verification</h2>
          <p className="text-sm text-text-secondary mt-1">
            Enter the 4-digit code sent to +1 (555) 123-4567
          </p>
        </div>

        <InputOTP
          label="SMS Code"
          length={4}
          value={otp}
          onChange={setOtp}
          autoFocus
          type="number"
          pattern="[0-9]"
          size="lg"
          {...(timeLeft === 0 && { warning: 'Code expired. Please request a new one.' })}
          helperText={timeLeft > 0 ? `Code expires in ${timeLeft}s` : undefined}
        />

        <div className="flex justify-between items-center">
          <button
            className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={timeLeft > 0}
            onClick={() => {
              setTimeLeft(60)
              setOtp('')
            }}
          >
            Resend Code
          </button>
          <span className="text-xs text-text-secondary">
            {timeLeft > 0 ? `Resend available in ${timeLeft}s` : 'You can resend now'}
          </span>
        </div>
      </div>
    )
  },
}

export const ComplexExample: Story = {
  render: () => {
    const [step, setStep] = useState<'phone' | 'verify'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | undefined>()

    const handleSendCode = () => {
      if (phone.length === 10) {
        setStep('verify')
      }
    }

    const handleVerify = (value: string) => {
      setError(undefined)
      // Simulate verification
      setTimeout(() => {
        if (value === '123456') {
          alert('Phone verified successfully!')
        } else {
          setError('Invalid code. Please try again.')
          setOtp('')
        }
      }, 500)
    }

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Phone Verification</h2>
          <p className="text-sm text-text-secondary mt-1">
            {step === 'phone'
              ? 'Enter your phone number to receive a verification code'
              : 'Enter the code we sent to your phone'}
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="(555) 123-4567"
                className="w-full h-12 px-4 text-base bg-background border border-border rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={handleSendCode}
              disabled={phone.length !== 10}
              className="w-full h-12 bg-primary text-background rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send Code
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <InputOTP
              label="Verification Code"
              length={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
              autoFocus
              type="number"
              pattern="[0-9]"
              error={error}
              helperText="Use '123456' to test"
            />
            <button
              onClick={() => setStep('phone')}
              className="text-sm text-primary hover:underline"
            >
              Change phone number
            </button>
          </div>
        )}
      </div>
    )
  },
}
