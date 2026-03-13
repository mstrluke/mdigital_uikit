import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Clipboard from "./index";

const meta: Meta<typeof Clipboard> = {
  title: "General/Clipboard",
  component: Clipboard,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The text value to copy",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Component size",
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
      description: "Color theme",
    },
    variant: {
      control: "select",
      options: ["default", "solid", "soft"],
      description: "Visual style variant",
    },
    showValue: {
      control: "boolean",
      description: "Display the value text",
    },
    successDuration: {
      control: { type: "number", min: 500, max: 5000, step: 500 },
      description: "Duration of success feedback in milliseconds",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Clipboard>;

export const Primary: Story = {
  args: {
    value: "npm install @your-org/ui",
    size: "md",
    color: "default",
    variant: "default",
    showValue: true,
  },
};

export const WithoutValue: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-text-secondary mb-2">Icon only (no text)</p>
        <Clipboard
          value="This value is hidden but will be copied"
          showValue={false}
        />
      </div>

      <div className="flex gap-2 items-end">
        <Clipboard value="Hidden" showValue={false} size="xs" color="primary" />
        <Clipboard value="Hidden" showValue={false} size="sm" color="success" />
        <Clipboard value="Hidden" showValue={false} size="md" color="warning" />
        <Clipboard value="Hidden" showValue={false} size="lg" color="error" />
      </div>
      <div className="flex gap-2 items-end">
        <Clipboard value="Hidden" size="xs" color="primary" />
        <Clipboard value="Hidden" size="sm" color="success" />
        <Clipboard value="Hidden" size="md" color="warning" />
        <Clipboard value="Hidden" size="lg" color="error" />
      </div>
    </div>
  ),
};

export const WithCallback: Story = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);

    return (
      <div className="space-y-4">
        <Clipboard
          value="Copy me to increment counter"
          onCopy={() => setCopyCount((prev) => prev + 1)}
          color="primary"
        />
        <p className="text-sm text-text-secondary">
          Copied {copyCount} time{copyCount !== 1 ? "s" : ""}
        </p>
      </div>
    );
  },
};

export const InstallationCommands: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">npm</p>
        <Clipboard
          value="npm install @your-org/ui"
          color="error"
          variant="soft"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">yarn</p>
        <Clipboard value="yarn add @your-org/ui" color="info" variant="soft" />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">pnpm</p>
        <Clipboard
          value="pnpm add @your-org/ui"
          color="warning"
          variant="soft"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">bun</p>
        <Clipboard value="bun add @your-org/ui" color="accent" variant="soft" />
      </div>
    </div>
  ),
};

export const CodeSnippets: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">
          Import Statement
        </p>
        <Clipboard
          value="import { Button } from '@your-org/ui'"
          variant="solid"
          color="default"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">
          Environment Variable
        </p>
        <Clipboard
          value="NEXT_PUBLIC_API_URL=https://api.example.com"
          variant="soft"
          color="info"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">
          API Endpoint
        </p>
        <Clipboard
          value="https://api.example.com/v1/users"
          variant="soft"
          color="primary"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">
          Git Command
        </p>
        <Clipboard
          value="git clone https://github.com/username/repo.git"
          variant="soft"
          color="secondary"
        />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [customValue, setCustomValue] = useState("Custom text to copy");
    const [selectedColor, setSelectedColor] = useState<
      "default" | "primary" | "success" | "error"
    >("primary");
    const [selectedVariant, setSelectedVariant] = useState<
      "default" | "solid" | "soft"
    >("soft");

    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Clipboard Customizer
          </h3>

          <div className="space-y-4 p-4 border border-border rounded-lg">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Text to copy
              </label>
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-background border border-border rounded-md outline-none text-text-primary placeholder:text-text-muted focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as any)}
                className="w-full h-10 px-3 text-sm bg-background border border-border rounded-md outline-none text-text-primary focus:border-primary transition-colors"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                className="w-full h-10 px-3 text-sm bg-background border border-border rounded-md outline-none text-text-primary focus:border-primary transition-colors"
              >
                <option value="default">Default</option>
                <option value="solid">Solid</option>
                <option value="soft">Soft</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-2">
            Preview
          </h4>
          <Clipboard
            value={customValue}
            color={selectedColor}
            variant={selectedVariant}
          />
        </div>
      </div>
    );
  },
};

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    const variants = ['default', 'solid', 'soft'] as const
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-sm font-semibold mb-4 capitalize">{variant} Variant</h3>
            <div className="space-y-6">
              {sizes.map((size) => (
                <div key={size}>
                  <p className="text-xs text-text-secondary mb-2 uppercase">{size}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {colors.map((color) => (
                      <Clipboard
                        key={`${variant}-${size}-${color}`}
                        value={`Copy ${color}`}
                        color={color}
                        variant={variant}
                        size={size}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

