import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Lock } from "lucide-react";
import Input from "./index";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "Data Entry/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Input size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    clearable: {
      control: "boolean",
      description: "Show clear button",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width input",
    },
    showCount: {
      control: "boolean",
      description: "Show character count",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input leftIcon={<Search size={16} />} placeholder="Search..." />
      <Input leftIcon={<Mail size={16} />} placeholder="Email address" />
      <Input
        leftIcon={<Lock size={16} />}
        placeholder="Password"
        type="password"
      />
      <Input rightIcon={<Mail size={16} />} placeholder="With right icon" />
      <Input leftIcon={<Search size={16} />} rightIcon={<Mail size={16} />} placeholder="Both icons" />
    </div>
  ),
};

export const IconSizes: Story = {
  name: 'Icons at All Sizes',
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="xs" leftIcon={<Search size={12} />} rightIcon={<Mail size={12} />} placeholder="Extra small with icons" />
      <Input size="sm" leftIcon={<Search size={14} />} rightIcon={<Mail size={14} />} placeholder="Small with icons" />
      <Input size="md" leftIcon={<Search size={16} />} rightIcon={<Mail size={16} />} placeholder="Medium with icons" />
      <Input size="lg" leftIcon={<Search size={20} />} rightIcon={<Mail size={20} />} placeholder="Large with icons" />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        clearable
        placeholder="Type to see clear button"
        defaultValue="Clear me"
      />
      <Input
        clearable
        leftIcon={<Search size={16} />}
        placeholder="Searchable with clear"
        defaultValue="Search term"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input loading placeholder="Loading..." />
      <Input
        loading
        leftIcon={<Search size={16} />}
        placeholder="Searching..."
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Success"
        placeholder="Valid input"
        success="Input is valid!"
        defaultValue="valid@email.com"
      />
      <Input
        label="Error"
        placeholder="Invalid input"
        error="This field is required"
      />
      <Input
        label="Warning"
        placeholder="Warning input"
        warning="This value might be incorrect"
        defaultValue="suspicious value"
      />
      <Input
        label="Info"
        placeholder="Info input"
        info="Please use lowercase letters only"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Email"
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Bio"
        placeholder="Tell us about yourself"
        maxLength={100}
        showCount
        defaultValue="Hello world"
      />
      <Input
        label="Tweet"
        placeholder="What's happening?"
        maxLength={280}
        showCount
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    defaultValue: 'Disabled value',
  },
};

export const ComplexExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Email Address"
        type="email"
        leftIcon={<Mail size={16} />}
        clearable
        placeholder="your.email@example.com"
        helperText="We'll send confirmation to this email"
        required
      />
      <Input
        label="Password"
        type="password"
        leftIcon={<Lock size={16} />}
        placeholder="Enter secure password"
        maxLength={50}
        showCount
        helperText="Must contain at least 8 characters"
      />
    </div>
  ),
};
