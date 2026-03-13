import { cva } from 'class-variance-authority'

export const cellVariants = cva('text-left transition-colors', {
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
