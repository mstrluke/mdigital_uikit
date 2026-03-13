import type { Meta, StoryObj } from "@storybook/react";
import {
  Settings,
  User,
  Bell,
  Shield,
  ChevronRight,
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import Accordion from "./index";

const meta: Meta<typeof Accordion> = {
  title: "Data Display/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "Theme color",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Accordion size",
    },
    variant: {
      control: "select",
      options: ["default", "solid", "soft", "bordered", "splitted"],
      description: "Visual style variant",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple panels to be open simultaneously",
    },
    expandIconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of expand icon",
    },
    collapsible: {
      control: "boolean",
      description:
        "Prevent all panels from closing (requires at least one open)",
    },
    destroyOnClose: {
      control: "boolean",
      description: "Unmount content when collapsed",
    },
    showDivider: {
      control: "boolean",
      description: "Show divider between items",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  {
    key: "1",
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy on all items. Items must be in their original condition with tags attached. Please contact our support team to initiate a return.",
  },
  {
    key: "2",
    title: "How long does shipping take?",
    content:
      "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 day delivery.",
  },
  {
    key: "3",
    title: "Do you ship internationally?",
    content:
      "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination.",
  },
];

// Basic Examples

export const Default: Story = {
  args: {
    items: sampleItems,
    color: "default",
    size: "md",
    variant: "default",
  },
};

// Icon Features

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: "1",
        title: "User Profile",
        icon: <User className="w-5 h-5" />,
        content: "Manage your profile settings and personal information.",
      },
      {
        key: "2",
        title: "Notifications",
        icon: <Bell className="w-5 h-5" />,
        content: "Configure your notification preferences.",
      },
      {
        key: "3",
        title: "Security",
        icon: <Shield className="w-5 h-5" />,
        content: "Update your password and security settings.",
      },
      {
        key: "4",
        title: "Settings",
        icon: <Settings className="w-5 h-5" />,
        content: "General application settings.",
      },
    ],
    color: "primary",
    variant: "bordered",
  },
};

export const WithSubtitles: Story = {
  args: {
    items: [
      {
        key: "1",
        title: "Basic Plan",
        subtitle: "$9.99/month",
        icon: <User className="w-5 h-5" />,
        content:
          "Perfect for individuals. Includes 10GB storage, email support, and basic features.",
      },
      {
        key: "2",
        title: "Pro Plan",
        subtitle: "$29.99/month - Most Popular",
        icon: <Shield className="w-5 h-5" />,
        content:
          "For professionals. Includes 100GB storage, priority support, and advanced features.",
        extra: (
          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
            Popular
          </span>
        ),
      },
      {
        key: "3",
        title: "Enterprise Plan",
        subtitle: "Custom pricing",
        icon: <Settings className="w-5 h-5" />,
        content:
          "For large teams. Unlimited storage, dedicated support, and custom integrations.",
      },
    ],
    color: "primary",
    variant: "splitted",
  },
};

export const WithExtraContent: Story = {
  args: {
    items: [
      {
        key: "1",
        title: "Account Settings",
        extra: <span className="text-xs text-success">Active</span>,
        content: "Manage your account preferences and settings.",
      },
      {
        key: "2",
        title: "Billing Information",
        extra: <span className="text-xs text-warning">Action Required</span>,
        content: "Update your payment methods and billing details.",
      },
      {
        key: "3",
        title: "API Access",
        extra: <span className="text-xs text-text-secondary">Disabled</span>,
        content: "Configure API keys and access tokens.",
      },
    ],
    variant: "bordered",
  },
};

// Behavior Options

export const MultipleMode: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultActiveKey: ["1", "3"],
    color: "primary",
    variant: "splitted",
  },
};

// Controlled Mode

export const ControlledMode: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<string | string[]>("1");

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveKey("1")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Open First
          </button>
          <button
            onClick={() => setActiveKey("2")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Open Second
          </button>
          <button
            onClick={() => setActiveKey("3")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Open Third
          </button>
          <button
            onClick={() => setActiveKey("")}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
          >
            Close All
          </button>
        </div>
        <div className="text-sm text-text-secondary">
          Current active key: <strong>{activeKey || "none"}</strong>
        </div>
        <Accordion
          items={sampleItems}
          activeKey={activeKey}
          onChange={setActiveKey}
          color="primary"
          variant="bordered"
        />
      </div>
    );
  },
};


// Real-World Examples

export const FAQ: Story = {
  render: () => (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      <Accordion
        items={[
          {
            key: "1",
            title: "How do I reset my password?",
            content:
              'Click on the "Forgot Password" link on the login page. Enter your email address and we will send you instructions to reset your password.',
          },
          {
            key: "2",
            title: "Can I change my subscription plan?",
            content:
              "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.",
          },
          {
            key: "3",
            title: "What payment methods do you accept?",
            content:
              "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
          },
          {
            key: "4",
            title: "Is my data secure?",
            content:
              "Absolutely. We use industry-standard encryption to protect your data both in transit and at rest. Our infrastructure is regularly audited for security compliance.",
          },
          {
            key: "5",
            title: "Do you offer customer support?",
            content:
              "Yes! We offer 24/7 email support for all plans. Premium and Enterprise plans also include phone support and dedicated account managers.",
          },
        ]}
        color="primary"
        variant="soft"
        expandIcon={(isExpanded) =>
          isExpanded ? (
            <Minus className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )
        }
      />
    </div>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <Accordion
        items={[
          {
            key: "profile",
            title: "Profile Settings",
            subtitle: "Manage your public profile",
            icon: <User className="w-5 h-5" />,
            content: (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-text-secondary">
                      john.doe@example.com
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Edit Profile
                </button>
              </div>
            ),
          },
          {
            key: "notifications",
            title: "Notification Preferences",
            subtitle: "Choose what updates you receive",
            icon: <Bell className="w-5 h-5" />,
            content: (
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Push notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Weekly digest</span>
                </label>
              </div>
            ),
          },
          {
            key: "security",
            title: "Security & Privacy",
            subtitle: "Protect your account",
            icon: <Shield className="w-5 h-5" />,
            extra: <span className="text-xs text-success">Secure</span>,
            content: (
              <div className="space-y-2">
                <p className="text-sm">Two-factor authentication is enabled.</p>
                <button className="text-primary hover:underline text-sm">
                  Manage security settings
                </button>
              </div>
            ),
          },
        ]}
        color="primary"
        variant="splitted"
        defaultActiveKey="profile"
      />
    </div>
  ),
};

// Color × Variant Matrix
export const ColorVariantMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft', 'bordered', 'splitted'] as const

    return (
      <div className="space-y-8">
        {variants.map((v) => (
          <div key={v}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{v}</h3>
            <div className="space-y-2">
              {colors.map((c) => (
                <Accordion
                  key={c}
                  items={[
                    { key: '1', title: `${c} ${v} - Item 1`, content: 'Content 1' },
                    { key: '2', title: `${c} ${v} - Item 2`, content: 'Content 2' },
                  ]}
                  color={c}
                  variant={v}
                  size="md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
};

