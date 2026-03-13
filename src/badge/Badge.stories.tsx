import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Bell,
  Mail,
  ShoppingCart,
  Star,
  Check,
  Zap,
  Gift,
  Heart,
  User,
  MessageCircle,
} from "lucide-react";
import Badge from "./index";
import Button from "../button";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "solid", "outline", "soft"],
      description: "Visual style variant",
    },
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
      description: "Badge size",
    },
    shape: {
      control: "select",
      options: ["rounded", "pill", "circle"],
      description: "Badge shape",
    },
    dot: {
      control: "boolean",
      description: "Display as a dot indicator",
    },
    count: {
      control: "number",
      description: "Numeric count to display",
    },
    maxCount: {
      control: "number",
      description: "Maximum count before overflow",
    },
    showZero: {
      control: "boolean",
      description: "Whether to show badge when count is 0",
    },
    placement: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Floating badge placement",
    },
    processing: {
      control: "boolean",
      description: "Show pulsing animation",
    },
    invisible: {
      control: "boolean",
      description: "Hide badge visually",
    },
    standalone: {
      control: "boolean",
      description: "Force non-floating render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Examples

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "solid",
    color: "primary",
    size: "sm",
  },
  render: (args) => <Badge {...args}>Badge</Badge>,
};

// Shape Variants

export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Rounded (default)</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="rounded" variant="outline">
            Outline
          </Badge>
          <Badge shape="rounded" variant="soft">
            Soft
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Pill</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge shape="pill">Pill Badge</Badge>
          <Badge shape="pill" variant="outline">
            Outline
          </Badge>
          <Badge shape="pill" variant="soft">
            Soft
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          Circle (for single chars/numbers)
        </h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge shape="circle">2</Badge>
          <Badge shape="circle" size="md">
            5
          </Badge>
          <Badge shape="circle" size="lg" color="success">
            <Check className="size-3" />
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// With Icons

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Icon + Text</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge icon={<Star />} color="warning">
            Featured
          </Badge>
          <Badge icon={<Check />} color="success">
            Verified
          </Badge>
          <Badge icon={<Zap />} color="accent">
            Pro
          </Badge>
          <Badge icon={<Gift />} color="error">
            Sale
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Icon Only</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge icon={<Heart />} color="error" shape="pill" />
          <Badge icon={<Star />} color="warning" shape="pill" />
          <Badge icon={<Check />} color="success" shape="pill" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Different Sizes</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge icon={<Star />} size="xs" color="warning">
            XS
          </Badge>
          <Badge icon={<Star />} size="sm" color="warning">
            SM
          </Badge>
          <Badge icon={<Star />} size="md" color="warning">
            MD
          </Badge>
          <Badge icon={<Star />} size="lg" color="warning">
            LG
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Count Badges

export const WithCount: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Basic Count</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge count={5}>
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={25}>
            <Mail className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={99}>
            <ShoppingCart className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          Overflow (default max: 99)
        </h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge count={100}>
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={999}>
            <Mail className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Custom maxCount</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge count={15} maxCount={10}>
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={1000} maxCount={999}>
            <Mail className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Show Zero</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge count={0} showZero>
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={0} showZero={false}>
            <Mail className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Dot Badges

export const DotBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Basic Dot</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge dot color="primary" />
          <Badge dot color="success" />
          <Badge dot color="error" />
          <Badge dot color="warning" />
          <Badge dot color="info" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          Dot Sizes (scales with size prop)
        </h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge dot size="xs" color="error" />
          <Badge dot size="sm" color="error" />
          <Badge dot size="md" color="error" />
          <Badge dot size="lg" color="error" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Floating Dot</h3>
        <div className="flex gap-8 flex-wrap items-center">
          <Badge dot color="success">
            <div className="size-10 rounded-full bg-surface flex items-center justify-center">
              <User className="size-5 text-text-secondary" />
            </div>
          </Badge>
          <Badge dot color="warning">
            <div className="size-10 rounded-full bg-surface flex items-center justify-center">
              <User className="size-5 text-text-secondary" />
            </div>
          </Badge>
          <Badge dot color="error">
            <div className="size-10 rounded-full bg-surface flex items-center justify-center">
              <User className="size-5 text-text-secondary" />
            </div>
          </Badge>
        </div>
      </div>
    </div>
  ),
};


// Processing Animation

export const ProcessingAnimation: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Processing Dots</h3>
        <div className="flex gap-8 flex-wrap items-center">
          <Badge dot processing color="success">
            <div className="size-10 rounded-full bg-surface flex items-center justify-center">
              <User className="size-5 text-text-secondary" />
            </div>
          </Badge>
          <Badge dot processing color="primary">
            <div className="size-10 rounded-full bg-surface flex items-center justify-center">
              <User className="size-5 text-text-secondary" />
            </div>
          </Badge>
          <Badge dot processing color="error">
            <Bell className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          Standalone Processing Dot
        </h3>
        <div className="flex gap-4 flex-wrap items-center">
          <Badge dot processing color="success" />
          <Badge dot processing color="warning" />
          <Badge dot processing color="error" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Processing Count Badge</h3>
        <div className="flex gap-8 flex-wrap items-center">
          <Badge count={5} processing color="error">
            <Bell className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Placement Options

export const Placement: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Count Badge Placements</h3>
        <div className="flex gap-12 flex-wrap items-center">
          <div className="text-center">
            <Badge count={5} placement="top-right">
              <div className="size-12 rounded-lg bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">top-right</p>
          </div>
          <div className="text-center">
            <Badge count={5} placement="top-left">
              <div className="size-12 rounded-lg bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">top-left</p>
          </div>
          <div className="text-center">
            <Badge count={5} placement="bottom-right">
              <div className="size-12 rounded-lg bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">bottom-right</p>
          </div>
          <div className="text-center">
            <Badge count={5} placement="bottom-left">
              <div className="size-12 rounded-lg bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">bottom-left</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Dot Badge Placements</h3>
        <div className="flex gap-12 flex-wrap items-center">
          <div className="text-center">
            <Badge dot color="success" placement="top-right">
              <div className="size-10 rounded-full bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">top-right</p>
          </div>
          <div className="text-center">
            <Badge dot color="success" placement="top-left">
              <div className="size-10 rounded-full bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">top-left</p>
          </div>
          <div className="text-center">
            <Badge dot color="success" placement="bottom-right">
              <div className="size-10 rounded-full bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">bottom-right</p>
          </div>
          <div className="text-center">
            <Badge dot color="success" placement="bottom-left">
              <div className="size-10 rounded-full bg-surface border border-border" />
            </Badge>
            <p className="text-xs text-text-secondary mt-2">bottom-left</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Custom Content

export const CustomContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Custom Badge Content</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <Badge content="NEW" color="success">
            <div className="size-12 rounded-lg bg-surface border border-border" />
          </Badge>
          <Badge content="HOT" color="error">
            <div className="size-12 rounded-lg bg-surface border border-border" />
          </Badge>
          <Badge content={<Zap className="size-3" />} color="warning">
            <div className="size-12 rounded-lg bg-surface border border-border" />
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Invisible State

export const InvisibleBadge: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="space-y-4">
        <Button onClick={() => setVisible(!visible)}>
          Toggle Badge ({visible ? "Visible" : "Hidden"})
        </Button>
        <div className="flex gap-8 items-center">
          <Badge count={5} invisible={!visible}>
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge dot color="success" invisible={!visible}>
            <User className="size-6 text-text-secondary" />
          </Badge>
        </div>
        <p className="text-sm text-text-secondary">
          The invisible prop hides the badge with a scale/opacity transition
          while keeping it in the DOM.
        </p>
      </div>
    );
  },
};

// Standalone Mode

export const StandaloneMode: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Normal (floating)</h3>
        <Badge count={5}>
          <span className="text-text-primary">Messages</span>
        </Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Standalone (no floating)</h3>
        <div className="flex items-center gap-2">
          <span className="text-text-primary">Messages</span>
          <Badge count={5} standalone />
        </div>
      </div>
    </div>
  ),
};

// Color Matrix


// Real-World Examples

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Status Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="soft" color="success">
            Active
          </Badge>
          <Badge variant="soft" color="warning">
            Pending
          </Badge>
          <Badge variant="soft" color="error">
            Inactive
          </Badge>
          <Badge variant="soft" color="info">
            Draft
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Notification Icons</h3>
        <div className="flex gap-6 items-center">
          <Badge count={12} color="error">
            <Bell className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={5} color="primary">
            <Mail className="size-6 text-text-secondary" />
          </Badge>
          <Badge count={3} color="warning">
            <ShoppingCart className="size-6 text-text-secondary" />
          </Badge>
          <Badge dot processing color="success">
            <MessageCircle className="size-6 text-text-secondary" />
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Feature Tags</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" color="primary" shape="pill">
            React
          </Badge>
          <Badge variant="outline" color="accent" shape="pill">
            TypeScript
          </Badge>
          <Badge variant="outline" color="success" shape="pill">
            Tailwind
          </Badge>
          <Badge variant="outline" color="info" shape="pill">
            Storybook
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Priority Levels</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="solid" color="error" size="xs">
            Critical
          </Badge>
          <Badge variant="solid" color="warning" size="xs">
            High
          </Badge>
          <Badge variant="solid" color="info" size="xs">
            Medium
          </Badge>
          <Badge variant="solid" color="default" size="xs">
            Low
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">
          Online Status (with processing)
        </h3>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <Badge dot processing color="success">
              <div className="size-10 rounded-full bg-surface border border-border flex items-center justify-center">
                <User className="size-5 text-text-secondary" />
              </div>
            </Badge>
            <p className="text-xs text-text-secondary mt-2">Online</p>
          </div>
          <div className="text-center">
            <Badge dot color="warning">
              <div className="size-10 rounded-full bg-surface border border-border flex items-center justify-center">
                <User className="size-5 text-text-secondary" />
              </div>
            </Badge>
            <p className="text-xs text-text-secondary mt-2">Away</p>
          </div>
          <div className="text-center">
            <Badge dot color="default">
              <div className="size-10 rounded-full bg-surface border border-border flex items-center justify-center">
                <User className="size-5 text-text-secondary" />
              </div>
            </Badge>
            <p className="text-xs text-text-secondary mt-2">Offline</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Promo Badges</h3>
        <div className="flex gap-4 flex-wrap items-start">
          <div className="relative">
            <Badge
              content="NEW"
              color="success"
              placement="top-left"
              shape="pill"
            >
              <div className="p-4 bg-surface rounded-lg border border-border">
                <p className="font-medium">Product Card</p>
                <p className="text-sm text-text-secondary">$29.99</p>
              </div>
            </Badge>
          </div>
          <div className="relative">
            <Badge
              icon={<Zap />}
              content="PRO"
              color="accent"
              placement="top-right"
              shape="pill"
            >
              <div className="p-4 bg-surface rounded-lg border border-border">
                <p className="font-medium">Premium Feature</p>
                <p className="text-sm text-text-secondary">Unlock now</p>
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Color × Size Matrix

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const variants = ['default', 'solid', 'outline', 'soft'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{variant}</h3>
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
                          <Badge color={color} variant={variant} size={size}>Badge</Badge>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
