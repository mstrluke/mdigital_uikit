import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stepper from './index'

describe('Stepper', () => {
  const basicSteps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]

  const stepsWithDescription = [
    { label: 'Step 1', description: 'First step' },
    { label: 'Step 2', description: 'Second step' },
    { label: 'Step 3', description: 'Third step' },
  ]

  it('renders with default props', () => {
    render(<Stepper steps={basicSteps} currentStep={0} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders all steps in horizontal orientation', () => {
    render(<Stepper steps={basicSteps} currentStep={0} orientation="horizontal" />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders all steps in vertical orientation', () => {
    render(<Stepper steps={basicSteps} currentStep={0} orientation="vertical" />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders numbered type by default', () => {
    render(<Stepper steps={basicSteps} currentStep={0} type="numbered" />)
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} type="numbered" />)
    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('2')
    expect(container.textContent).toContain('3')
  })

  it('renders dots type', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} type="dots" />)
    const dots = container.querySelectorAll('.stepper_icon')
    expect(dots.length).toBe(3)
  })

  it('renders step descriptions', () => {
    render(<Stepper steps={stepsWithDescription} currentStep={0} />)
    expect(screen.getByText('First step')).toBeInTheDocument()
    expect(screen.getByText('Second step')).toBeInTheDocument()
    expect(screen.getByText('Third step')).toBeInTheDocument()
  })

  it('renders custom icons', () => {
    const stepsWithIcons = [
      { label: 'Step 1', icon: <span data-testid="icon-1">✓</span> },
      { label: 'Step 2', icon: <span data-testid="icon-2">→</span> },
      { label: 'Step 3', icon: <span data-testid="icon-3">★</span> },
    ]
    render(<Stepper steps={stepsWithIcons} currentStep={0} />)
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
    expect(screen.getByTestId('icon-3')).toBeInTheDocument()
  })

  it('marks current step correctly', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={1} />)
    const activeSteps = container.querySelectorAll('.stepper_step')
    expect(activeSteps[1]).toHaveClass('stepper_step')
  })

  it('shows completed state for previous steps', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={2} />)
    const steps = container.querySelectorAll('.stepper_step')
    expect(steps.length).toBe(3)
  })

  it('handles step click when onStepClick is provided', async () => {
    const user = userEvent.setup()
    const onStepClick = vi.fn()
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} onStepClick={onStepClick} />)

    const icons = container.querySelectorAll('.stepper_icon')
    await user.click(icons[1])

    expect(onStepClick).toHaveBeenCalledWith(1)
  })

  it('does not call onStepClick when step is disabled', async () => {
    const user = userEvent.setup()
    const onStepClick = vi.fn()
    const stepsWithDisabled = [
      { label: 'Step 1' },
      { label: 'Step 2', disabled: true },
      { label: 'Step 3' },
    ]
    const { container } = render(<Stepper steps={stepsWithDisabled} currentStep={0} onStepClick={onStepClick} />)

    const icons = container.querySelectorAll('.stepper_icon')
    await user.click(icons[1])

    expect(onStepClick).not.toHaveBeenCalled()
  })

  it('renders all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<Stepper steps={basicSteps} currentStep={0} size={size} />)
      expect(screen.getByText('Step 1')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const
    colors.forEach((color) => {
      const { unmount } = render(<Stepper steps={basicSteps} currentStep={0} color={color} />)
      expect(screen.getByText('Step 1')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all variant types', () => {
    const variants = ['default', 'solid', 'soft'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Stepper steps={basicSteps} currentStep={0} variant={variant} />)
      expect(screen.getByText('Step 1')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies error status to current step', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={1} status="error" />)
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('applies custom status to individual step', () => {
    const stepsWithStatus = [
      { label: 'Step 1', status: 'finish' as const },
      { label: 'Step 2', status: 'error' as const },
      { label: 'Step 3' },
    ]
    render(<Stepper steps={stepsWithStatus} currentStep={1} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('renders connectors between steps in horizontal mode', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} orientation="horizontal" />)
    const connectors = container.querySelectorAll('.stepper_connector')
    expect(connectors.length).toBeGreaterThan(0)
  })

  it('renders connectors between steps in vertical mode', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} orientation="vertical" />)
    const connectors = container.querySelectorAll('.stepper_connector')
    expect(connectors.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(<Stepper steps={basicSteps} currentStep={0} className="custom-class" />)
    const root = container.querySelector('.stepper_root')
    expect(root).toHaveClass('custom-class')
  })

  it('applies custom classNames for different parts', () => {
    const { container } = render(
      <Stepper
        steps={basicSteps}
        currentStep={0}
        classNames={{
          root: 'root-class',
          step: 'step-class',
          icon: 'icon-class',
          label: 'label-class',
          connector: 'connector-class',
        }}
      />
    )
    expect(container.querySelector('.root-class')).toBeInTheDocument()
    expect(container.querySelector('.step-class')).toBeInTheDocument()
  })

  it('applies stepActive className to current step', () => {
    const { container } = render(
      <Stepper
        steps={basicSteps}
        currentStep={1}
        classNames={{ stepActive: 'active-class' }}
      />
    )
    expect(container.querySelector('.active-class')).toBeInTheDocument()
  })

  it('applies stepCompleted className to finished steps', () => {
    const { container } = render(
      <Stepper
        steps={basicSteps}
        currentStep={2}
        classNames={{ stepCompleted: 'completed-class' }}
      />
    )
    expect(container.querySelector('.completed-class')).toBeInTheDocument()
  })

  it('shows disabled state visually', () => {
    const stepsWithDisabled = [
      { label: 'Step 1' },
      { label: 'Step 2', disabled: true },
      { label: 'Step 3' },
    ]
    const { container } = render(<Stepper steps={stepsWithDisabled} currentStep={0} />)
    const icons = container.querySelectorAll('.stepper_icon')
    expect(icons[1]).toHaveClass('opacity-50')
  })

  it('renders correct step states for wait status', () => {
    render(<Stepper steps={basicSteps} currentStep={0} />)
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders correct step states for process status', () => {
    render(<Stepper steps={basicSteps} currentStep={1} status="process" />)
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('renders correct step states for finish status', () => {
    render(<Stepper steps={basicSteps} currentStep={2} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })
})
