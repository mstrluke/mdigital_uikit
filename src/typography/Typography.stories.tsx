import type { Meta, StoryObj } from '@storybook/react'

import { Title, Text, Paragraph } from './index'

const meta: Meta<typeof Title> = {
  title: 'General/Typography',
  component: Title,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Title>

export const Titles: Story = {
  render: () => (
    <div className="space-y-3">
      <Title level="h1">Heading 1</Title>
      <Title level="h2">Heading 2</Title>
      <Title level="h3">Heading 3</Title>
      <Title level="h4">Heading 4</Title>
      <Title level="h5">Heading 5</Title>
      <Title level="h6">Heading 6</Title>
    </div>
  ),
}

export const TitleColors: Story = {
  render: () => (
    <div className="space-y-2">
      {(['default', 'primary', 'success', 'error', 'warning', 'info'] as const).map((c) => (
        <Title key={c} level="h4" color={c}>{c} title</Title>
      ))}
    </div>
  ),
}

export const CopyableTitle: Story = {
  render: () => <Title level="h3" copyable>Click the icon to copy this title</Title>,
}

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Text>Default text</Text><br />
      <Text strong>Strong text</Text><br />
      <Text italic>Italic text</Text><br />
      <Text underline>Underlined text</Text><br />
      <Text del>Deleted text</Text><br />
      <Text code>Code text</Text><br />
      <Text mark>Marked text</Text><br />
    </div>
  ),
}

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-2">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <div key={s}><Text size={s}>Text size: {s}</Text></div>
      ))}
    </div>
  ),
}

export const TextColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default text</Text><br />
      <Text color="secondary">Secondary text</Text><br />
      <Text color="tertiary">Tertiary text</Text><br />
      <Text color="primary">Primary text</Text><br />
      <Text color="success">Success text</Text><br />
      <Text color="error">Error text</Text><br />
      <Text color="warning">Warning text</Text><br />
      <Text color="info">Info text</Text><br />
    </div>
  ),
}

export const CopyableText: Story = {
  render: () => <Text copyable>This text can be copied</Text>,
}

export const Paragraphs: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      <Paragraph>
        A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.
      </Paragraph>
      <Paragraph color="secondary" size="sm">
        This is a secondary, smaller paragraph used for supplementary information or descriptions.
      </Paragraph>
    </div>
  ),
}

export const Truncation: Story = {
  render: () => (
    <div className="max-w-xs space-y-4">
      <Text truncate>This is a very long text that will be truncated with an ellipsis when it overflows</Text>
      <Paragraph truncate={2}>
        This paragraph will be truncated after 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </Paragraph>
    </div>
  ),
}
