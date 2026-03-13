import type { Meta, StoryObj } from "@storybook/react";
import { User, Building2, Camera, Bell, Star } from "lucide-react";
import { Avatar, AvatarGroup } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
    fallback: {
      control: "text",
      description: "Fallback text (initials) when image fails to load",
    },
    name: {
      control: "text",
      description: "User name - auto-generates initials",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Avatar size",
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "Avatar shape",
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "away", "busy"],
      description: "Status indicator",
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
      description: "Background color for fallback",
    },
    bordered: {
      control: "boolean",
      description: "Show border/ring around avatar",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic Examples

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
    size: "md",
    shape: "circle",
  },
};

export const WithNameAutoInitials: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Avatar name="John Doe" size="lg" />
      <Avatar name="Alice" size="lg" />
      <Avatar name="Robert James Smith" size="lg" />
      <Avatar name="李明" size="lg" />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Avatar
        icon={<User className="w-full h-full" />}
        size="lg"
        color="primary"
      />
      <Avatar
        icon={<Building2 className="w-full h-full" />}
        size="lg"
        color="secondary"
      />
      <Avatar
        icon={<Camera className="w-full h-full" />}
        size="lg"
        color="accent"
      />
      <Avatar
        icon={<Star className="w-full h-full" />}
        size="lg"
        color="warning"
      />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="text-center">
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          status="online"
          size="lg"
        />
        <p className="text-xs mt-2 text-text-secondary">Online</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=4" status="away" size="lg" />
        <p className="text-xs mt-2 text-text-secondary">Away</p>
      </div>
      <div className="text-center">
        <Avatar src="https://i.pravatar.cc/150?img=5" status="busy" size="lg" />
        <p className="text-xs mt-2 text-text-secondary">Busy</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://i.pravatar.cc/150?img=6"
          status="offline"
          size="lg"
        />
        <p className="text-xs mt-2 text-text-secondary">Offline</p>
      </div>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <Avatar src="https://i.pravatar.cc/150?img=12" badge={3} size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=13" badge={99} size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=14" badge="99+" size="lg" />
      <Avatar
        fallback="JD"
        badge={<Bell className="w-3 h-3" />}
        size="lg"
        color="primary"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Avatar src="https://i.pravatar.cc/150?img=18" disabled size="lg" />
      <Avatar fallback="JD" disabled size="lg" color="primary" />
    </div>
  ),
};

export const AvatarGroupWithMax: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=26" />
      <Avatar src="https://i.pravatar.cc/150?img=27" />
      <Avatar src="https://i.pravatar.cc/150?img=28" />
      <Avatar src="https://i.pravatar.cc/150?img=29" />
      <Avatar src="https://i.pravatar.cc/150?img=30" />
      <Avatar src="https://i.pravatar.cc/150?img=31" />
    </AvatarGroup>
  ),
};

export const TeamMembers: Story = {
  render: () => (
    <div className="space-y-3">
      {[
        {
          name: "Alice Smith",
          role: "Product Manager",
          status: "online" as const,
          img: 54,
        },
        {
          name: "Mike Johnson",
          role: "Developer",
          status: "away" as const,
          img: 55,
        },
        {
          name: "Sarah Williams",
          role: "Designer",
          status: "busy" as const,
          img: 56,
        },
        {
          name: "Tom King",
          role: "QA Engineer",
          status: "offline" as const,
          img: 57,
        },
      ].map((member) => (
        <div key={member.name} className="flex items-center gap-3">
          <Avatar
            src={`https://i.pravatar.cc/150?img=${member.img}`}
            status={member.status}
            size="md"
          />
          <div>
            <p className="font-medium text-sm">{member.name}</p>
            <p className="text-xs text-text-secondary">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};
