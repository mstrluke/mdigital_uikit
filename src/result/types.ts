import type { ComponentSize } from '../types'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '403' | '404' | '500'

export interface ResultClassNames {
  root?: string
  icon?: string
  title?: string
  subtitle?: string
  extra?: string
  content?: string
}

export interface ResultProps {
  status?: ResultStatus
  icon?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  extra?: React.ReactNode
  children?: React.ReactNode
  size?: ComponentSize
  className?: string
  classNames?: ResultClassNames
}
