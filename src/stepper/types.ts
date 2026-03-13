import type { ReactNode } from 'react'
import type { ComponentColor, ComponentSize } from '../types'

export type StepperColor = ComponentColor

export type StepperSize = ComponentSize

export type StepperVariant = 'default' | 'solid' | 'soft'

export type StepperOrientation = 'horizontal' | 'vertical'

export type StepperType = 'numbered' | 'dots'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export interface StepperClassNames {
  root?: string
  step?: string
  stepActive?: string
  stepCompleted?: string
  icon?: string
  label?: string
  description?: string
  connector?: string
}

export interface StepItem {
  /**
   * Label to display for the step
   */
  label: string

  /**
   * Optional description text
   */
  description?: string

  /**
   * Custom icon to display instead of number
   */
  icon?: ReactNode

  /**
   * Custom status for this specific step
   */
  status?: StepStatus

  /**
   * Whether this step is disabled
   */
  disabled?: boolean
}

export interface StepperProps {
  /**
   * Array of step configurations
   */
  steps: StepItem[]

  /**
   * Current active step index (0-based)
   */
  currentStep: number

  /**
   * Theme color
   */
  color?: StepperColor

  /**
   * Size variant
   */
  size?: StepperSize

  /**
   * Visual style variant
   */
  variant?: StepperVariant

  /**
   * Layout orientation
   */
  orientation?: StepperOrientation

  /**
   * Stepper type - numbered circles or dots
   */
  type?: StepperType

  /**
   * Overall status (applies to current step if step doesn't have custom status)
   */
  status?: StepStatus

  /**
   * Click handler for step navigation
   */
  onStepClick?: (index: number) => void

  /**
   * Additional CSS class
   */
  className?: string

  /**
   * Custom class names for different elements
   */
  classNames?: StepperClassNames
}
