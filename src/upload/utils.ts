import { cva } from 'class-variance-authority'

import { buttonColorVars } from '../variants'
import { UploadFile } from './types'

export const uploadButtonVariants = cva(
  'inline-flex cursor-pointer outline-none border items-center justify-center gap-2 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-slot bg-slot text-slot-fg hover:bg-slot-90',
  {
    variants: {
      color: buttonColorVars,
      size: {
        xs: 'h-(--button-height-xs) px-(--button-padding-x-xs) text-xs',
        sm: 'h-(--button-height-sm) px-(--button-padding-x-sm) text-sm',
        md: 'h-(--button-height-md) px-(--button-padding-x-md) text-base',
        lg: 'h-(--button-height-lg) px-(--button-padding-x-lg) text-lg',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  },
)

export const uploadDropzoneVariants = cva(
  'relative border-2 border-dashed rounded-lg transition-[colors,border-color] duration-200 cursor-pointer',
  {
    variants: {
      status: {
        default:
          'border-border bg-surface/50 hover:border-primary hover:bg-primary/5',
        dragActive: 'border-primary bg-primary/10',
        error: 'border-error bg-error/5',
        disabled: 'border-border bg-surface/30 cursor-not-allowed opacity-50',
      },
      size: {
        xs: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
    },
  },
)

export const uploadDraggerVariants = cva(
  'relative border-2 border-dashed rounded-lg transition-[colors,border-color] duration-200 cursor-pointer flex flex-col items-center justify-center gap-2',
  {
    variants: {
      status: {
        default:
          'border-border bg-surface/50 hover:border-primary hover:bg-primary/5',
        dragActive: 'border-primary bg-primary/10 scale-[1.02]',
        error: 'border-error bg-error/5',
        disabled: 'border-border bg-surface/30 cursor-not-allowed opacity-50',
      },
      size: {
        xs: 'min-h-[100px] p-3',
        sm: 'min-h-[120px] p-4',
        md: 'min-h-[160px] p-6',
        lg: 'min-h-[200px] p-8',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
    },
  },
)

export const uploadAvatarVariants = cva(
  'relative overflow-hidden rounded-full border-2 border-dashed cursor-pointer transition-[colors,border-color] duration-200 flex items-center justify-center',
  {
    variants: {
      status: {
        default: 'border-border bg-surface/50 hover:border-primary',
        dragActive: 'border-primary bg-primary/10',
        error: 'border-error bg-error/5',
        disabled: 'border-border bg-surface/30 cursor-not-allowed opacity-50',
      },
      size: {
        xs: 'w-12 h-12',
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
    },
  },
)

export const uploadPictureVariants = cva(
  'relative overflow-hidden rounded-md border-2 border-dashed cursor-pointer transition-[colors,border-color] duration-200 flex items-center justify-center',
  {
    variants: {
      status: {
        default: 'border-border bg-surface/50 hover:border-primary',
        dragActive: 'border-primary bg-primary/10',
        error: 'border-error bg-error/5',
        disabled: 'border-border bg-surface/30 cursor-not-allowed opacity-50',
      },
      size: {
        xs: 'w-16 h-16',
        sm: 'w-24 h-24',
        md: 'w-32 h-32',
        lg: 'w-40 h-40',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
    },
  },
)

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const isImageFile = (file: File | UploadFile): boolean => {
  const type = file.type || ''
  return type.startsWith('image/')
}

export const generateUID = (): string => {
  return `upload-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export const matchesAccept = (file: File, accept: string | undefined): boolean => {
  if (!accept) return true

  const fileName = file.name.toLowerCase()
  const mimeType = file.type.toLowerCase()

  const acceptedTypes = accept.split(',').map(t => t.trim())

  return acceptedTypes.some(acceptedType => {
    if (acceptedType.startsWith('.')) {
      return fileName.endsWith(acceptedType.toLowerCase())
    }

    if (acceptedType.endsWith('/*')) {
      const mimePrefix = acceptedType.slice(0, -2)
      return mimeType.startsWith(mimePrefix)
    }

    return mimeType === acceptedType
  })
}
