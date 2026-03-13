import type { Meta, StoryObj } from "@storybook/react";
import { Check, X, Sun, Moon, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import Switch from "./index";

const meta: Meta<typeof Switch> = {
  title: "Data Entry/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
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
      description: "Switch size",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the label",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    helperText: {
      control: "text",
      description: "Helper text below switch",
    },
    error: {
      control: "text",
      description: "Error message",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const LabelPosition: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3">
            Label on Right (Default)
          </h3>
          <Switch
            label="Enable notifications"
            labelPosition="right"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Label on Left</h3>
          <Switch
            label="Enable notifications"
            labelPosition="left"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
      </div>
    );
  },
};

export const WithThumbIcon: Story = {
  render: () => {
    const [states, setStates] = useState({
      check: true,
      moon: false,
      bell: true,
    });

    return (
      <div className="space-y-4">
        <Switch
          label="With check icon"
          size="lg"
          thumbIcon={
            states.check ? (
              <Check className="size-full" />
            ) : (
              <X className="size-full" />
            )
          }
          checked={states.check}
          onChange={(e) => setStates({ ...states, check: e.target.checked })}
        />
        <Switch
          label="Dark mode toggle"
          size="lg"
          color="secondary"
          thumbIcon={
            states.moon ? (
              <Moon className="size-full" />
            ) : (
              <Sun className="size-full" />
            )
          }
          checked={states.moon}
          onChange={(e) => setStates({ ...states, moon: e.target.checked })}
        />
        <Switch
          label="Notifications"
          size="lg"
          color="accent"
          thumbIcon={
            states.bell ? (
              <Bell className="size-full" />
            ) : (
              <BellOff className="size-full" />
            )
          }
          checked={states.bell}
          onChange={(e) => setStates({ ...states, bell: e.target.checked })}
        />
      </div>
    );
  },
};

export const WithTrackContent: Story = {
  render: () => {
    const [states, setStates] = useState({
      onOff: true,
      yesNo: false,
      icons: true,
    });

    return (
      <div className="space-y-4">
        <Switch
          label="ON/OFF labels"
          size="lg"
          startContent="OFF"
          endContent="ON"
          checked={states.onOff}
          onChange={(e) => setStates({ ...states, onOff: e.target.checked })}
        />
        <Switch
          label="Yes/No labels"
          size="lg"
          color="success"
          startContent="NO"
          endContent="YES"
          checked={states.yesNo}
          onChange={(e) => setStates({ ...states, yesNo: e.target.checked })}
        />
        <Switch
          label="Icon content"
          size="lg"
          color="secondary"
          startContent={<Moon className="size-3" />}
          endContent={<Sun className="size-3" />}
          checked={states.icons}
          onChange={(e) => setStates({ ...states, icons: e.target.checked })}
        />
      </div>
    );
  },
};

export const WithLabels: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Switch
          label="Enable notifications"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Switch
          label="Email notifications"
          helperText="Receive email updates about your account activity"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Switch
          label="Push notifications"
          helperText="Get push notifications on your mobile device"
          checked={!checked}
          onChange={(e) => setChecked(!e.target.checked)}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4 max-w-md">
        <Switch
          label="Accept terms and conditions"
          required
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Switch
          label="I agree to the privacy policy"
          helperText="You must agree to continue"
          required
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled (unchecked)" disabled />
      <Switch label="Disabled (checked)" disabled checked />
      <Switch
        label="Disabled with helper text"
        helperText="This switch cannot be toggled"
        disabled
        checked
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Loading (unchecked)" loading />
      <Switch label="Loading (checked)" loading checked />
      <Switch
        label="Loading with helper text"
        helperText="Please wait while we save your settings"
        loading
        checked
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Switch
          label="Accept terms and conditions"
          error="You must accept the terms to continue"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Switch
          label="Enable two-factor authentication"
          helperText="Enhance your account security"
          error={
            !checked
              ? "Two-factor authentication is required for admin users"
              : undefined
          }
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
    });

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">User Settings</h3>
          <div className="space-y-4">
            <Switch
              label="Enable notifications"
              helperText="Receive updates about your account activity"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.checked })
              }
            />
            <Switch
              label="Dark mode"
              helperText="Use dark theme throughout the application"
              size="lg"
              thumbIcon={
                settings.darkMode ? (
                  <Moon className="size-full" />
                ) : (
                  <Sun className="size-full" />
                )
              }
              checked={settings.darkMode}
              onChange={(e) =>
                setSettings({ ...settings, darkMode: e.target.checked })
              }
            />
            <Switch
              label="Auto-save"
              helperText="Automatically save your work every 5 minutes"
              checked={settings.autoSave}
              onChange={(e) =>
                setSettings({ ...settings, autoSave: e.target.checked })
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                {sizes.map(size => (
                  <th key={size} className="p-2 text-center text-sm text-gray-500" colSpan={2}>{size}</th>
                ))}
              </tr>
              <tr>
                <th className="p-2"></th>
                {sizes.map(size => (
                  <>
                    <th key={`${size}-off`} className="p-2 text-center text-xs text-gray-400">off</th>
                    <th key={`${size}-on`} className="p-2 text-center text-xs text-gray-400">on</th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map(color => (
                <tr key={color}>
                  <td className="p-2 text-sm font-medium">{color}</td>
                  {sizes.map(size => (
                    <>
                      <td key={`${size}-off`} className="p-2">
                        <Switch color={color} size={size} />
                      </td>
                      <td key={`${size}-on`} className="p-2">
                        <Switch color={color} size={size} defaultChecked />
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
};
