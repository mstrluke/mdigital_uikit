import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { PasswordInput } from './index'

const meta: Meta<typeof PasswordInput> = {
  title: 'Data Entry/InputPassword',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
      description: 'Visual style variant',
    },
    visibilityToggle: {
      control: 'boolean',
      description: 'Show/hide password toggle button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const Primary: Story = {
  args: {
    placeholder: 'Enter your password',
    size: 'md',
    visibilityToggle: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter password"
        required
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PasswordInput
        label="Valid Password"
        placeholder="Enter password"
        success="Password meets all requirements!"
        defaultValue="SecurePass123!"
      />
      <PasswordInput
        label="Invalid Password"
        placeholder="Enter password"
        error="Password is too weak"
        defaultValue="weak"
      />
      <PasswordInput
        label="Warning"
        placeholder="Enter password"
        warning="Consider using more special characters"
        defaultValue="password123"
      />
      <PasswordInput
        label="Info"
        placeholder="Enter password"
        info="Must be at least 8 characters with uppercase, lowercase, and numbers"
      />
    </div>
  ),
}

export const Clearable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PasswordInput
        clearable
        label="Clearable Password"
        placeholder="Type to see clear button"
        defaultValue="ClearablePassword"
      />
      <PasswordInput
        clearable
        visibilityToggle={false}
        label="Clearable (No Toggle)"
        placeholder="Clear without toggle"
        defaultValue="PasswordValue"
      />
    </div>
  ),
}

export const PasswordStrengthIndicator: Story = {
  render: () => {
    const [password, setPassword] = useState('')

    const getStrength = (pass: string) => {
      if (pass.length === 0) return { level: 'none', text: '', color: '' }
      if (pass.length < 6) return { level: 'weak', text: 'Weak password', color: 'error' }
      if (pass.length < 10) return { level: 'medium', text: 'Medium strength', color: 'warning' }
      if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) return { level: 'medium', text: 'Add uppercase and numbers', color: 'warning' }
      return { level: 'strong', text: 'Strong password!', color: 'success' }
    }

    const strength = getStrength(password)

    return (
      <div className="max-w-md">
        <PasswordInput
          label="Create Password"
          placeholder="Enter secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...(strength.color === 'error' && { error: strength.text })}
          {...(strength.color === 'warning' && { warning: strength.text })}
          {...(strength.color === 'success' && { success: strength.text })}
          clearable
        />
      </div>
    )
  },
}

export const LoginForm: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <div className="max-w-md space-y-4 p-6 border border-border rounded-lg">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Login to your account</h2>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-12 px-4 text-base bg-background border border-border rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-primary transition-colors"
          />
        </div>

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Forgot your password?"
        />

        <button
          className="w-full h-12 bg-primary text-background rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Sign In
        </button>
      </div>
    )
  },
}

export const RegistrationForm: Story = {
  render: () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

    return (
      <div className="max-w-md space-y-4 p-6 border border-border rounded-lg">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Create Account</h2>

        <PasswordInput
          label="Password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Must be at least 8 characters"
          required
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          {...(confirmPassword.length > 0 && !passwordsMatch && { error: 'Passwords do not match' })}
          {...(passwordsMatch && { success: 'Passwords match!' })}
          required
        />
      </div>
    )
  },
}
