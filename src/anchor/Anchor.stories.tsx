import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'

import Anchor from './index'

const meta: Meta<typeof Anchor> = {
  title: 'Navigation/Anchor',
  component: Anchor,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Anchor>

// ── Helpers ─────────────────────────────────────────────────
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-10 scroll-mt-4">
    <h2 className="text-xl font-semibold text-text-primary mb-3 pb-2 border-b border-border">{title}</h2>
    <div className="text-sm text-text-secondary leading-relaxed space-y-3">{children}</div>
  </section>
)

const Paragraph = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur.
  </p>
)

// ── Documentation Page ──────────────────────────────────────
const docItems = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'installation', label: 'Installation' },
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'select', label: 'Select' },
    ],
  },
  { id: 'theming', label: 'Theming' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'changelog', label: 'Changelog' },
]

export const DocumentationPage: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
      <div className="flex gap-8 h-[500px]">
        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto pr-6" style={{ scrollBehavior: 'smooth' }}>
          <Section id="getting-started" title="Getting Started">
            <p>Welcome to the UI Kit documentation. This guide will walk you through everything you need to know to start building beautiful interfaces.</p>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="installation" title="Installation">
            <p>Install the package using your preferred package manager:</p>
            <pre className="bg-surface rounded-md p-3 font-mono text-xs mt-2">npm install @mdigital_ui/ui</pre>
            <p className="mt-3">Then import the global styles in your entry file:</p>
            <pre className="bg-surface rounded-md p-3 font-mono text-xs mt-2">{`import '@mdigital_ui/ui/styles.css'`}</pre>
            <Paragraph />
          </Section>

          <Section id="components" title="Components">
            <p>The library ships with 70+ production-ready components. Here are the most commonly used ones:</p>
            <Paragraph />
          </Section>

          <Section id="button" title="Button">
            <p>The Button component supports multiple variants, sizes, and colors. It can render as a button or an anchor element.</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-md bg-primary text-white text-xs">Primary</button>
              <button className="px-3 py-1.5 rounded-md border border-border text-text-primary text-xs">Outline</button>
              <button className="px-3 py-1.5 rounded-md text-primary text-xs">Ghost</button>
            </div>
            <Paragraph />
          </Section>

          <Section id="input" title="Input">
            <p>Text input with label, validation states, prefix/suffix icons, and clearable functionality.</p>
            <input className="mt-3 w-full max-w-xs px-3 py-1.5 rounded-md border border-border bg-background text-sm" placeholder="Example input" />
            <Paragraph />
          </Section>

          <Section id="select" title="Select">
            <p>Dropdown selection with search, multi-select, groups, and keyboard navigation.</p>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="theming" title="Theming">
            <p>The design system uses CSS custom properties for all colors, sizes, and spacing. Override them at the root level or scope them to specific sections.</p>
            <pre className="bg-surface rounded-md p-3 font-mono text-xs mt-2">{`:root {\n  --color-primary: #3b82f6;\n  --color-accent: #8b5cf6;\n  --radius-md: 0.375rem;\n}`}</pre>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="api-reference" title="API Reference">
            <p>Every component exports its TypeScript types. Import them alongside the component:</p>
            <pre className="bg-surface rounded-md p-3 font-mono text-xs mt-2">{`import { Button } from '@mdigital_ui/ui'\nimport type { ButtonProps } from '@mdigital_ui/ui'`}</pre>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="changelog" title="Changelog">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-text-primary">v2.4.0 — February 2026</h4>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Added Anchor component with scrollspy</li>
                  <li>Added Tour component with step animations</li>
                  <li>Added QR Code with pattern support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-text-primary">v2.3.0 — January 2026</h4>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>New Statistic and Result components</li>
                  <li>Watermark tamper protection</li>
                  <li>FloatButton group animations</li>
                </ul>
              </div>
            </div>
            <Paragraph />
          </Section>
        </div>

        {/* Sticky anchor navigation */}
        <div className="w-48 shrink-0">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">On this page</p>
          <Anchor
            items={docItems}
            getContainer={() => scrollRef.current!}
            offset={10}
          />
        </div>
      </div>
    )
  },
}

// ── Settings Page ───────────────────────────────────────────
const settingsItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'billing', label: 'Billing' },
  { id: 'danger-zone', label: 'Danger Zone' },
]

const SettingsField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
    <span className="text-sm text-text-primary font-medium">{label}</span>
    <div className="text-sm text-text-secondary">{children}</div>
  </div>
)

export const SettingsPage: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
      <div className="flex gap-8 h-[480px] border border-border rounded-lg overflow-hidden bg-background">
        {/* Sidebar nav */}
        <div className="w-52 shrink-0 border-r border-border p-5 pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Settings</h3>
          <Anchor
            items={settingsItems}
            getContainer={() => scrollRef.current!}
            offset={10}
            size="sm"
          />
        </div>

        {/* Scrollable settings panels */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6" style={{ scrollBehavior: 'smooth' }}>
          <Section id="profile" title="Profile">
            <SettingsField label="Display name">John Doe</SettingsField>
            <SettingsField label="Email">john@example.com</SettingsField>
            <SettingsField label="Bio">Senior Frontend Engineer</SettingsField>
            <SettingsField label="Avatar">
              <div className="w-8 h-8 rounded-full bg-primary/20" />
            </SettingsField>
          </Section>

          <Section id="account" title="Account">
            <SettingsField label="Username">@johndoe</SettingsField>
            <SettingsField label="Language">English (US)</SettingsField>
            <SettingsField label="Timezone">UTC-5 Eastern</SettingsField>
            <SettingsField label="Date format">MM/DD/YYYY</SettingsField>
          </Section>

          <Section id="notifications" title="Notifications">
            <SettingsField label="Email notifications">Enabled</SettingsField>
            <SettingsField label="Push notifications">Disabled</SettingsField>
            <SettingsField label="Weekly digest">Every Monday</SettingsField>
            <SettingsField label="Marketing emails">Opt-out</SettingsField>
            <Paragraph />
          </Section>

          <Section id="security" title="Security">
            <SettingsField label="Password">Last changed 30 days ago</SettingsField>
            <SettingsField label="Two-factor auth">Enabled (Authenticator)</SettingsField>
            <SettingsField label="Active sessions">3 devices</SettingsField>
            <SettingsField label="Login history">View all →</SettingsField>
            <Paragraph />
          </Section>

          <Section id="billing" title="Billing">
            <SettingsField label="Current plan">Pro ($29/mo)</SettingsField>
            <SettingsField label="Payment method">Visa •••• 4242</SettingsField>
            <SettingsField label="Next invoice">March 1, 2026</SettingsField>
            <SettingsField label="Usage">847 / 1000 API calls</SettingsField>
            <Paragraph />
          </Section>

          <Section id="danger-zone" title="Danger Zone">
            <div className="rounded-md border border-error/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Delete account</p>
                  <p className="text-xs text-text-secondary">Permanently remove your account and all data</p>
                </div>
                <button className="px-3 py-1.5 rounded-md border border-error text-error text-xs font-medium">Delete</button>
              </div>
            </div>
            <Paragraph />
          </Section>
        </div>
      </div>
    )
  },
}

// ── Blog Article ────────────────────────────────────────────
const articleItems = [
  { id: 'art-intro', label: 'Introduction' },
  { id: 'art-problem', label: 'The Problem' },
  { id: 'art-solution', label: 'Our Solution' },
  { id: 'art-implementation', label: 'Implementation', children: [
    { id: 'art-step-1', label: 'Step 1: Setup' },
    { id: 'art-step-2', label: 'Step 2: Core Logic' },
    { id: 'art-step-3', label: 'Step 3: Polish' },
  ]},
  { id: 'art-results', label: 'Results' },
  { id: 'art-conclusion', label: 'Conclusion' },
]

export const BlogArticle: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
      <div className="flex gap-10 h-[520px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4" style={{ scrollBehavior: 'smooth' }}>
          <div className="mb-8">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Engineering Blog</span>
            <h1 className="text-2xl font-bold text-text-primary mt-1">Building a Design System from Scratch</h1>
            <p className="text-sm text-text-secondary mt-2">Feb 18, 2026 · 8 min read</p>
          </div>

          <Section id="art-intro" title="Introduction">
            <p>
              Design systems are more than component libraries. They encode decisions about visual language,
              interaction patterns, and engineering standards that keep a product consistent as it scales.
            </p>
            <Paragraph />
          </Section>

          <Section id="art-problem" title="The Problem">
            <p>
              Our app had 12 different button styles, 4 modal implementations, and spacing values that
              ranged from 3px to 17px with no rhyme or reason. Every new feature introduced visual debt.
            </p>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="art-solution" title="Our Solution">
            <p>
              We built a token-based design system with CSS custom properties at its foundation. Every
              color, size, radius, and shadow is a semantic token that maps to a role, not a raw value.
            </p>
            <Paragraph />
          </Section>

          <Section id="art-implementation" title="Implementation">
            <p>The build was split into three phases over six weeks.</p>
            <Paragraph />
          </Section>

          <Section id="art-step-1" title="Step 1: Token Foundation">
            <p>We defined 48 semantic color tokens, 4 size scales, and a spacing system based on a 4px grid.</p>
            <pre className="bg-surface rounded-md p-3 font-mono text-xs mt-2">{`--color-primary: oklch(0.65 0.24 265);\n--color-surface: oklch(0.97 0 0);\n--spacing-unit: 4px;`}</pre>
            <Paragraph />
          </Section>

          <Section id="art-step-2" title="Step 2: Core Components">
            <p>
              Button, Input, Select, Modal, and Toast were built first — they covered 80% of UI patterns.
              Each component uses CVA for variant composition and supports the full token system.
            </p>
            <Paragraph />
            <Paragraph />
          </Section>

          <Section id="art-step-3" title="Step 3: Polish & Documentation">
            <p>
              We added Storybook stories for every component, wrote AGENTS.md documentation, ran accessibility
              audits, and built a performance test suite covering mount times and re-render benchmarks.
            </p>
            <Paragraph />
          </Section>

          <Section id="art-results" title="Results">
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="p-3 rounded-md bg-surface text-center">
                <div className="text-2xl font-bold text-primary">70+</div>
                <div className="text-xs text-text-secondary mt-1">Components</div>
              </div>
              <div className="p-3 rounded-md bg-surface text-center">
                <div className="text-2xl font-bold text-success">1582</div>
                <div className="text-xs text-text-secondary mt-1">Tests passing</div>
              </div>
              <div className="p-3 rounded-md bg-surface text-center">
                <div className="text-2xl font-bold text-accent">40%</div>
                <div className="text-xs text-text-secondary mt-1">Less CSS shipped</div>
              </div>
            </div>
            <Paragraph />
          </Section>

          <Section id="art-conclusion" title="Conclusion">
            <p>
              A design system is never "done" — it evolves with your product. But having a solid foundation
              of tokens, components, and conventions makes every future feature cheaper to build and more
              consistent for users.
            </p>
            <Paragraph />
            <Paragraph />
          </Section>
        </div>

        {/* Right-side TOC */}
        <div className="w-44 shrink-0 pt-14">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Contents</p>
          <Anchor
            items={articleItems}
            getContainer={() => scrollRef.current!}
            offset={10}
            size="xs"
          />
        </div>
      </div>
    )
  },
}

// ── Sizes comparison ────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-16">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="text-xs font-medium text-text-secondary mb-3 uppercase">{size}</p>
          <Anchor
            items={[
              { id: 'a', label: 'Introduction' },
              { id: 'b', label: 'Getting Started' },
              { id: 'c', label: 'Components', children: [
                { id: 'd', label: 'Button' },
                { id: 'e', label: 'Input' },
              ]},
              { id: 'f', label: 'API Docs' },
            ]}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
}
