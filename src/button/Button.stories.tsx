import type { Meta, StoryObj } from "@storybook/react";
import {
  Search,
  ArrowRight,
  Plus,
  Trash2,
  Settings,
  Download,
  Heart,
  Share2,
  Edit,
  Mail,
  Check,
  Star,
  Volume2,
  VolumeX,
  Bold,
  Italic,
  Underline,
  ExternalLink,
  Bell,
  BellOff,
  Bookmark,
} from "lucide-react";
import React from "react";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "General/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "soft", "dashed", "link", "ghost"],
      description: "Visual style variant",
    },
    color: {
      control: "select",
      options: [
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
      description: "Button size",
    },
    shape: {
      control: "select",
      options: ["rounded", "pill", "square"],
      description: "Button shape",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    loadingPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of loading spinner",
    },
    iconPlacement: {
      control: "select",
      options: ["left", "right"],
      description: "Position of icon (when using icon prop)",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
    iconOnly: {
      control: "boolean",
      description: "Icon-only button (square)",
    },
    asChild: {
      control: "boolean",
      description: "Render as child element (polymorphic)",
    },
    pressed: {
      control: "boolean",
      description: "Toggle/pressed state",
    },
    ripple: {
      control: "boolean",
      description: "Enable ripple effect on click",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic Examples

export const Default: Story = {
  args: {
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "md",
  },
};

// With Icons

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">leftIcon / rightIcon</h3>
        <div className="flex gap-4 flex-wrap">
          <Button leftIcon={<Search className="w-4 h-4" />}>Search</Button>
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Next</Button>
          <Button
            leftIcon={<Download className="w-4 h-4" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Download
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          icon + iconPlacement (shorthand)
        </h3>
        <div className="flex gap-4 flex-wrap">
          <Button icon={<Search className="w-4 h-4" />}>Search</Button>
          <Button
            icon={<ArrowRight className="w-4 h-4" />}
            iconPlacement="right"
          >
            Next
          </Button>
          <Button icon={<Mail className="w-4 h-4" />} iconPlacement="left">
            Send Email
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">
          leftIcon/rightIcon override icon prop
        </h3>
        <div className="flex gap-4 flex-wrap">
          <Button
            icon={<Heart className="w-4 h-4" />}
            leftIcon={<Star className="w-4 h-4" />}
          >
            Star wins (leftIcon overrides icon)
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button iconOnly size="sm">
        <Plus className="w-4 h-4" />
      </Button>
      <Button iconOnly variant="outline">
        <Edit className="w-5 h-5" />
      </Button>
      <Button iconOnly variant="soft" color="error">
        <Trash2 className="w-5 h-5" />
      </Button>
      <Button iconOnly variant="ghost">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  ),
};

// Loading States

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button loading>Loading</Button>
      <Button loading loadingText="Saving...">Save</Button>
      <Button loading loadingPosition="right" loadingText="Sending...">Send</Button>
      <Button iconOnly loading size="md" />
    </div>
  ),
};

// Disabled States

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="soft">
        Disabled Soft
      </Button>
      <Button disabled variant="ghost">
        Disabled Ghost
      </Button>
      <Button disabled iconOnly>
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  ),
};

// Full Width

export const FullWidth: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline">
        Full Width Outline
      </Button>
      <Button fullWidth variant="soft" leftIcon={<Mail className="w-4 h-4" />}>
        Subscribe to Newsletter
      </Button>
    </div>
  ),
};

// Real-World Examples

export const ActionBar: Story = {
  render: () => (
    <div className="flex gap-2 p-4 bg-surface rounded-lg border border-border">
      <Button
        variant="solid"
        color="primary"
        leftIcon={<Plus className="w-4 h-4" />}
      >
        Add New
      </Button>
      <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
        Export
      </Button>
      <Button variant="ghost" leftIcon={<Settings className="w-4 h-4" />}>
        Settings
      </Button>
      <div className="flex-1" />
      <Button
        variant="soft"
        color="error"
        leftIcon={<Trash2 className="w-4 h-4" />}
      >
        Delete
      </Button>
    </div>
  ),
};

export const FormActions: Story = {
  render: () => (
    <div className="flex gap-2 justify-end p-4 border-t border-border">
      <Button variant="ghost">Cancel</Button>
      <Button variant="outline">Save Draft</Button>
      <Button variant="solid" color="primary">
        Submit
      </Button>
    </div>
  ),
};

// Toggle / Pressed State

export const ToggleButton: Story = {
  render: () => {
    const [muted, setMuted] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);
    const [notifs, setNotifs] = React.useState(true);

    return (
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Toggle buttons use <code>aria-pressed</code> for accessibility.
          The label stays constant — screen readers announce the pressed state.
        </p>
        <div>
          <h3 className="text-sm font-semibold mb-2">Interactive Toggles</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <Button
              pressed={muted}
              onClick={() => setMuted(!muted)}
              variant={muted ? "solid" : "outline"}
              leftIcon={muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            >
              Mute
            </Button>
            <Button
              pressed={bookmarked}
              onClick={() => setBookmarked(!bookmarked)}
              variant={bookmarked ? "soft" : "outline"}
              color={bookmarked ? "warning" : "primary"}
              leftIcon={<Bookmark className="w-4 h-4" />}
            >
              Bookmark
            </Button>
            <Button
              pressed={notifs}
              onClick={() => setNotifs(!notifs)}
              variant={notifs ? "solid" : "ghost"}
              color={notifs ? "success" : "primary"}
              leftIcon={notifs ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            >
              Notifications
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Formatting Toolbar</h3>
          <div className="flex gap-1 p-1 bg-surface rounded-lg border border-border">
            <ToggleFormatButton icon={<Bold className="w-4 h-4" />} label="Bold" />
            <ToggleFormatButton icon={<Italic className="w-4 h-4" />} label="Italic" />
            <ToggleFormatButton icon={<Underline className="w-4 h-4" />} label="Underline" />
          </div>
        </div>
      </div>
    );
  },
};

function ToggleFormatButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [active, setActive] = React.useState(false);
  return (
    <Button
      pressed={active}
      onClick={() => setActive(!active)}
      variant={active ? "soft" : "ghost"}
      iconOnly
      size="sm"
      aria-label={label}
    >
      {icon}
    </Button>
  );
}

// Combined Features

export const CombinedFeatures: Story = {
  render: () => {
    const [following, setFollowing] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(42);

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold mb-2">Social Card Actions</h3>
        <div className="p-4 bg-surface rounded-lg border border-border max-w-sm">
          <p className="text-sm mb-4">
            Combining ripple, toggle, and icons in a real-world scenario.
          </p>
          <div className="flex gap-2">
            <Button
              ripple
              pressed={liked}
              onClick={() => {
                setLiked(!liked);
                setLikeCount((c) => (liked ? c - 1 : c + 1));
              }}
              variant={liked ? "soft" : "outline"}
              color={liked ? "error" : "primary"}
              size="sm"
              leftIcon={<Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />}
            >
              {likeCount}
            </Button>
            <Button
              ripple
              pressed={following}
              onClick={() => setFollowing(!following)}
              variant={following ? "solid" : "outline"}
              color={following ? "primary" : "primary"}
              size="sm"
              leftIcon={following ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            >
              {following ? "Following" : "Follow"}
            </Button>
            <Button
              ripple
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Color × Size Matrix

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const variants = ['solid', 'outline', 'soft', 'dashed', 'link', 'ghost'] as const;
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
                          <Button color={color} variant={variant} size={size}>Button</Button>
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
