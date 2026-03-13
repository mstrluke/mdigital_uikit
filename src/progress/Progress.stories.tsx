import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import Progress from "./index";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
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
      description: "Progress bar size (preset)",
    },
    circleSize: {
      control: { type: "number", min: 10, max: 300, step: 2 },
      description: "Custom circle diameter in pixels (overrides size preset)",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 20, step: 0.5 },
      description: "Custom stroke width in pixels (overrides size preset)",
    },
    variant: {
      control: "select",
      options: ["default", "solid", "soft"],
      description: "Visual style variant",
    },
    type: {
      control: "select",
      options: ["line", "circle", "step"],
      description: "Progress type",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Progress bar orientation (line/step only)",
    },
    showProgress: {
      control: "boolean",
      description: "Show progress percentage",
    },
    striped: {
      control: "boolean",
      description: "Striped pattern",
    },
    animated: {
      control: "boolean",
      description: "Animated stripes",
    },
    totalSteps: {
      control: { type: "number", min: 2, max: 10 },
      description: "Total steps for step progress",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    value: 65,
    color: "primary",
    size: "md",
    variant: "solid",
    type: "line",
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <Progress value={35} label="Downloading files..." showProgress />
      <Progress
        value={75}
        label="Installation progress"
        showProgress
        color="success"
      />
      <Progress value={90} label="Almost done" showProgress color="info" />
      <Progress value={100} label="Complete!" showProgress color="success" />
    </div>
  ),
};

export const StepProgress: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Horizontal Steps</h3>
        <div className="space-y-4">
          <Progress value={20} type="step" totalSteps={5} label="Step 1/5" />
          <Progress value={40} type="step" totalSteps={5} label="Step 2/5" />
          <Progress
            value={60}
            type="step"
            totalSteps={5}
            label="Step 3/5"
            color="primary"
          />
          <Progress
            value={80}
            type="step"
            totalSteps={5}
            label="Step 4/5"
            color="info"
          />
          <Progress
            value={100}
            type="step"
            totalSteps={5}
            label="Completed"
            color="success"
          />
        </div>
      </div>
      <div className="flex gap-8">
        <div>
          <h3 className="text-sm font-semibold mb-4">Vertical Steps</h3>
          <div className="flex gap-8" style={{ height: "300px" }}>
            <Progress
              value={20}
              type="step"
              totalSteps={5}
              orientation="vertical"
            />
            <Progress
              value={40}
              type="step"
              totalSteps={5}
              orientation="vertical"
              color="primary"
            />
            <Progress
              value={60}
              type="step"
              totalSteps={5}
              orientation="vertical"
              color="info"
            />
            <Progress
              value={100}
              type="step"
              totalSteps={5}
              orientation="vertical"
              color="success"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StripedAndAnimated: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={65} label="Striped" striped />
      <Progress
        value={65}
        label="Animated Striped"
        striped
        animated
        color="primary"
      />
      <Progress
        value={45}
        label="Animated Warning"
        striped
        animated
        color="warning"
      />
      <Progress
        value={85}
        label="Animated Success"
        striped
        animated
        color="success"
      />
    </div>
  ),
};

export const AnimatedLoading: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="space-y-6">
        <Progress
          value={progress}
          label="Auto-incrementing progress"
          showProgress
          color="primary"
          striped
          animated
        />
        <Progress value={progress} type="circle" color="success" size="lg" />
        <Progress
          value={progress}
          type="step"
          totalSteps={5}
          color="info"
          label="Step Progress"
          showProgress
        />
      </div>
    );
  },
};

export const FileUploadSimulation: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsUploading(false), 1000);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    };

    return (
      <div className="space-y-4">
        <button
          onClick={startUpload}
          disabled={isUploading}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Start Upload"}
        </button>
        <Progress
          value={Math.min(progress, 100)}
          label="Uploading file..."
          showProgress
          color={progress >= 100 ? "success" : "primary"}
          striped
          animated={progress < 100}
        />
        {progress >= 100 && (
          <p className="text-sm text-success">Upload complete!</p>
        )}
      </div>
    );
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            type="step"
            totalSteps={totalSteps}
            color="primary"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-surface border border-border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep(Math.min(totalSteps, currentStep + 1))
            }
            disabled={currentStep === totalSteps}
            className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            {currentStep === totalSteps ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    );
  },
};

export const CustomCircleSizes: Story = {
  name: "Custom Circle Size & Stroke",
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4">
          Inline Text Progress (14-20px)
        </h3>
        <div className="space-y-3">
          <p className="text-sm flex items-center gap-2">
            <Progress
              type="circle"
              value={75}
              circleSize={14}
              strokeWidth={2}
              color="primary"
            />
            Loading user data...
          </p>
          <p className="text-base flex items-center gap-2">
            <Progress
              type="circle"
              value={50}
              circleSize={16}
              strokeWidth={2}
              color="info"
            />
            Processing request
          </p>
          <p className="text-lg flex items-center gap-2">
            <Progress
              type="circle"
              value={100}
              circleSize={20}
              strokeWidth={2.5}
              color="success"
            />
            Upload complete
          </p>
          <p className="text-base flex items-center gap-2">
            <Progress
              type="circle"
              value={30}
              circleSize={18}
              strokeWidth={2}
              color="warning"
            />
            Syncing files (30%)
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">
          Small Indicators (24-40px)
        </h3>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={25}
              circleSize={24}
              strokeWidth={3}
              color="error"
              label="10"
            />
            <span className="text-xs text-text-secondary">24px</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={50}
              circleSize={32}
              strokeWidth={3}
              color="warning"
            />
            <span className="text-xs text-text-secondary">32px</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={75}
              circleSize={40}
              strokeWidth={4}
              color="info"
            />
            <span className="text-xs text-text-secondary">40px</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={100}
              circleSize={48}
              strokeWidth={4}
              color="success"
            />
            <span className="text-xs text-text-secondary">48px</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Custom Large Circles</h3>
        <div className="flex gap-6 items-center flex-wrap">
          <Progress
            type="circle"
            value={65}
            circleSize={100}
            strokeWidth={6}
            color="primary"
          />
          <Progress
            type="circle"
            value={80}
            circleSize={140}
            strokeWidth={10}
            color="accent"
          />
          <Progress
            type="circle"
            value={45}
            circleSize={180}
            strokeWidth={12}
            color="secondary"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">
          Stroke Width Variations (same size)
        </h3>
        <div className="flex gap-6 items-center flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={75}
              circleSize={60}
              strokeWidth={2}
              color="primary"
            />
            <span className="text-xs text-text-secondary">2px stroke</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={75}
              circleSize={60}
              strokeWidth={4}
              color="primary"
            />
            <span className="text-xs text-text-secondary">4px stroke</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={75}
              circleSize={60}
              strokeWidth={6}
              color="primary"
            />
            <span className="text-xs text-text-secondary">6px stroke</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Progress
              type="circle"
              value={75}
              circleSize={60}
              strokeWidth={10}
              color="primary"
            />
            <span className="text-xs text-text-secondary">10px stroke</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorSizeMatrix: Story = {
  render: () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    const variants = ['default', 'solid', 'soft'] as const;

    return (
      <div className="space-y-8">
        {variants.map(variant => (
          <div key={variant} className="space-y-4">
            <h3 className="text-sm font-semibold capitalize">{variant} Variant</h3>
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-sm text-gray-500">Color \ Size</th>
                  {sizes.map(s => (
                    <th key={s} className="p-2 text-center text-sm text-gray-500">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colors.map(c => (
                  <tr key={c}>
                    <td className="p-2 text-sm font-medium">{c}</td>
                    {sizes.map(s => (
                      <td key={s} className="p-2">
                        <Progress color={c} size={s} variant={variant} value={65} className="w-48" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
};
