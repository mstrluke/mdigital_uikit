export interface RadioGroupClassNames {
  root?: string
  label?: string
  group?: string
  item?: string
  helper?: string
  error?: string
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  label?: string
  helperText?: string
  error?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
  classNames?: RadioGroupClassNames
  ref?: React.Ref<HTMLDivElement>
}
