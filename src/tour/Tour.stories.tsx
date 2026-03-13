import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BarChart3, Users, Bell, Settings, Zap, Shield } from 'lucide-react'

import Tour from './index'
import Button from '../button'

const meta: Meta<typeof Tour> = {
  title: 'Feedback/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Step-by-step guided tour that highlights elements on the page. Supports multiple placements, sizes, colors, and custom content per step.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tour>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-12 space-y-8">
        <Button id="tour-start" onClick={() => setOpen(true)}>
          Start Tour
        </Button>

        <div className="grid grid-cols-3 gap-6">
          <div id="tour-feature-1" className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Feature 1</h3>
            <p className="text-sm text-text-secondary">
              Dashboard analytics and insights
            </p>
          </div>
          <div id="tour-feature-2" className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Feature 2</h3>
            <p className="text-sm text-text-secondary">
              Team collaboration tools
            </p>
          </div>
          <div id="tour-feature-3" className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Feature 3</h3>
            <p className="text-sm text-text-secondary">
              Real-time notifications
            </p>
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          onFinish={() => alert('Tour complete!')}
          steps={[
            {
              target: '#tour-start',
              title: 'Welcome!',
              description: 'Click here anytime to restart the tour.',
              placement: 'bottom',
            },
            {
              target: '#tour-feature-1',
              title: 'Analytics',
              description:
                'View your dashboard analytics and key metrics here.',
            },
            {
              target: '#tour-feature-2',
              title: 'Collaboration',
              description:
                'Invite team members and work together in real-time.',
            },
            {
              target: '#tour-feature-3',
              title: 'Stay Updated',
              description:
                'Never miss important updates with real-time notifications.',
            },
          ]}
        />
      </div>
    )
  },
}

export const Placements: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-16">
        <div className="flex justify-center">
          <Button id="placement-target" onClick={() => setOpen(true)}>
            Start Placement Tour
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4">
          <div id="pl-top" className="p-4 rounded-lg border border-border text-center text-sm">Top</div>
          <div id="pl-right" className="p-4 rounded-lg border border-border text-center text-sm">Right</div>
          <div id="pl-bottom" className="p-4 rounded-lg border border-border text-center text-sm">Bottom</div>
          <div id="pl-left" className="p-4 rounded-lg border border-border text-center text-sm">Left</div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={[
            { target: '#pl-top', title: 'Top Placement', description: 'Popover appears above the target.', placement: 'top' },
            { target: '#pl-right', title: 'Right Placement', description: 'Popover appears to the right.', placement: 'right' },
            { target: '#pl-bottom', title: 'Bottom Placement', description: 'Popover appears below the target.', placement: 'bottom' },
            { target: '#pl-left', title: 'Left Placement', description: 'Popover appears to the left.', placement: 'left' },
          ]}
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-12 space-y-8">
        <Button id="size-start" onClick={() => setOpen(true)}>
          Start Size Tour
        </Button>

        <div className="grid grid-cols-4 gap-4">
          <div id="size-xs" className="p-4 rounded-lg border border-border text-center">
            <span className="text-xs font-mono">xs</span>
          </div>
          <div id="size-sm" className="p-4 rounded-lg border border-border text-center">
            <span className="text-sm font-mono">sm</span>
          </div>
          <div id="size-md" className="p-4 rounded-lg border border-border text-center">
            <span className="text-base font-mono">md</span>
          </div>
          <div id="size-lg" className="p-4 rounded-lg border border-border text-center">
            <span className="text-lg font-mono">lg</span>
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={[
            { target: '#size-xs', title: 'Extra Small', description: 'Compact popover for tight spaces.' },
            { target: '#size-sm', title: 'Small', description: 'Slightly larger with more breathing room.' },
            { target: '#size-md', title: 'Medium', description: 'Default size. Works for most use cases.' },
            { target: '#size-lg', title: 'Large', description: 'Maximum readability with generous padding.' },
          ]}
          size="md"
        />
      </div>
    )
  },
}

export const Colors: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'>('primary')

    return (
      <div className="p-12 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {(['default', 'primary', 'success', 'warning', 'error', 'info'] as const).map((c) => (
            <Button
              key={c}
              size="sm"
              variant={color === c ? 'solid' : 'outline'}
              color={c === 'default' ? undefined : c}
              onClick={() => { setColor(c); setOpen(true) }}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div id="color-1" className="p-5 rounded-lg border border-border">
            <h4 className="font-medium text-sm mb-1">Step 1</h4>
            <p className="text-xs text-text-secondary">First step content</p>
          </div>
          <div id="color-2" className="p-5 rounded-lg border border-border">
            <h4 className="font-medium text-sm mb-1">Step 2</h4>
            <p className="text-xs text-text-secondary">Second step content</p>
          </div>
          <div id="color-3" className="p-5 rounded-lg border border-border">
            <h4 className="font-medium text-sm mb-1">Step 3</h4>
            <p className="text-xs text-text-secondary">Third step content</p>
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          color={color}
          steps={[
            { target: '#color-1', title: 'Colored Tour', description: `This tour uses the "${color}" color theme.` },
            { target: '#color-2', title: 'Consistent Theming', description: 'All steps share the same color.' },
            { target: '#color-3', title: 'Done!', description: 'The color prop applies to buttons, progress indicators, and highlight.' },
          ]}
        />
      </div>
    )
  },
}

export const WithCoverImage: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-12 space-y-8">
        <Button id="cover-start" color="primary" onClick={() => setOpen(true)}>
          Start Onboarding
        </Button>

        <div className="grid grid-cols-3 gap-6">
          <div id="cover-analytics" className="p-6 rounded-lg border border-border flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-semibold text-sm">Analytics</h4>
              <p className="text-xs text-text-secondary">Track metrics</p>
            </div>
          </div>
          <div id="cover-team" className="p-6 rounded-lg border border-border flex items-center gap-3">
            <Users className="w-8 h-8 text-success" />
            <div>
              <h4 className="font-semibold text-sm">Team</h4>
              <p className="text-xs text-text-secondary">Manage members</p>
            </div>
          </div>
          <div id="cover-settings" className="p-6 rounded-lg border border-border flex items-center gap-3">
            <Settings className="w-8 h-8 text-warning" />
            <div>
              <h4 className="font-semibold text-sm">Settings</h4>
              <p className="text-xs text-text-secondary">Configure app</p>
            </div>
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          color="primary"
          size="lg"
          steps={[
            {
              target: '#cover-analytics',
              title: 'Analytics Dashboard',
              description: 'Monitor real-time metrics, user engagement, and performance data.',
              cover: (
                <div className="rounded-md bg-primary/5 border border-primary/20 p-4 flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-primary" />
                </div>
              ),
            },
            {
              target: '#cover-team',
              title: 'Team Management',
              description: 'Invite team members, assign roles, and manage permissions.',
              cover: (
                <div className="rounded-md bg-success/5 border border-success/20 p-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-success" />
                </div>
              ),
            },
            {
              target: '#cover-settings',
              title: 'App Settings',
              description: 'Customize your workspace, integrations, and notification preferences.',
              cover: (
                <div className="rounded-md bg-warning/5 border border-warning/20 p-4 flex items-center justify-center">
                  <Settings className="w-12 h-12 text-warning" />
                </div>
              ),
            },
          ]}
        />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(0)

    return (
      <div className="p-12 space-y-6">
        <div className="flex gap-2 items-center">
          <Button onClick={() => { setCurrent(0); setOpen(true) }}>
            Start Tour
          </Button>
          <span className="text-sm text-text-secondary">
            Step: {current + 1} / 3
          </span>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
              Prev
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCurrent(Math.min(2, current + 1))} disabled={current === 2}>
              Next
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div id="ctrl-1" className="p-5 rounded-lg border border-border">Step 1</div>
          <div id="ctrl-2" className="p-5 rounded-lg border border-border">Step 2</div>
          <div id="ctrl-3" className="p-5 rounded-lg border border-border">Step 3</div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          current={current}
          onCurrentChange={setCurrent}
          steps={[
            { target: '#ctrl-1', title: 'Step 1', description: 'Controlled via external state.' },
            { target: '#ctrl-2', title: 'Step 2', description: 'Use onCurrentChange to sync.' },
            { target: '#ctrl-3', title: 'Step 3', description: 'Buttons outside control navigation.' },
          ]}
        />
      </div>
    )
  },
}

export const CustomLabels: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-12 space-y-8">
        <Button id="label-start" onClick={() => setOpen(true)}>
          Iniciar recorrido
        </Button>

        <div className="grid grid-cols-2 gap-6">
          <div id="label-1" className="p-6 rounded-lg border border-border">
            <Zap className="w-6 h-6 text-warning mb-2" />
            <h4 className="font-semibold text-sm">Rendimiento</h4>
          </div>
          <div id="label-2" className="p-6 rounded-lg border border-border">
            <Shield className="w-6 h-6 text-success mb-2" />
            <h4 className="font-semibold text-sm">Seguridad</h4>
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          nextText="Siguiente"
          prevText="Anterior"
          skipText="Omitir"
          finishText="Finalizar"
          showSkip
          showProgress
          steps={[
            { target: '#label-start', title: 'Bienvenido', description: 'Este es un recorrido con etiquetas en español.', placement: 'bottom' },
            { target: '#label-1', title: 'Rendimiento', description: 'Monitorea el rendimiento de tu aplicación.' },
            { target: '#label-2', title: 'Seguridad', description: 'Configura las opciones de seguridad de tu cuenta.' },
          ]}
        />
      </div>
    )
  },
}

export const WithProgressAndSkip: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-12 space-y-8">
        <Button id="prog-start" onClick={() => setOpen(true)}>
          Start Tour with Progress
        </Button>

        <div className="grid grid-cols-4 gap-4">
          <div id="prog-1" className="p-4 rounded-lg border border-border text-center text-sm">
            <Bell className="w-5 h-5 mx-auto mb-1 text-info" />
            Notifications
          </div>
          <div id="prog-2" className="p-4 rounded-lg border border-border text-center text-sm">
            <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
            Team
          </div>
          <div id="prog-3" className="p-4 rounded-lg border border-border text-center text-sm">
            <Settings className="w-5 h-5 mx-auto mb-1 text-warning" />
            Settings
          </div>
          <div id="prog-4" className="p-4 rounded-lg border border-border text-center text-sm">
            <Shield className="w-5 h-5 mx-auto mb-1 text-success" />
            Security
          </div>
        </div>

        <Tour
          open={open}
          onOpenChange={setOpen}
          showProgress
          showSkip
          color="primary"
          onSkip={() => alert('Tour skipped')}
          onFinish={() => alert('Tour finished!')}
          steps={[
            { target: '#prog-1', title: 'Notifications', description: 'Configure how you receive alerts and updates.' },
            { target: '#prog-2', title: 'Team', description: 'Manage your team members and their roles.' },
            { target: '#prog-3', title: 'Settings', description: 'Customize your workspace preferences.' },
            { target: '#prog-4', title: 'Security', description: 'Set up two-factor authentication and security rules.' },
          ]}
        />
      </div>
    )
  },
}
