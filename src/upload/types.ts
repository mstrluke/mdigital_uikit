import type { ButtonColor, ComponentSize } from '../types'

export type UploadVariant =
  | 'button'
  | 'dropzone'
  | 'dragger'
  | 'picture'
  | 'avatar'

export type UploadSize = ComponentSize

export type UploadColor = ButtonColor

export interface UploadClassNames {
  root?: string
  dropzone?: string
  input?: string
  icon?: string
  text?: string
  hint?: string
  fileList?: string
  fileItem?: string
  progress?: string
}

export interface UploadFile {
  uid: string
  name: string
  size: number
  type: string
  status?: 'uploading' | 'done' | 'error' | 'removed'
  percent?: number
  url?: string
  thumbUrl?: string
  response?: unknown
  error?: unknown
}

export interface UploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'onChange' | 'onError'
  > {
  variant?: UploadVariant
  size?: UploadSize
  color?: UploadColor
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string

  accept?: string
  multiple?: boolean
  /**
   * in bytes
   */
  maxSize?: number
  maxCount?: number
  fileList?: UploadFile[]
  defaultFileList?: UploadFile[]
  showUploadList?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  disabled?: boolean
  buttonText?: string
  dragText?: string
  dragHint?: string
  onChange?: (fileList: UploadFile[]) => void
  onRemove?: (file: UploadFile) => void
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  customRequest?: (options: {
    file: File
    onProgress: (percent: number) => void
    onSuccess: (response: unknown) => void
    onError: (error: unknown) => void
  }) => void
  onError?: (error: string, file: File) => void
  className?: string
  classNames?: UploadClassNames
  ref?: React.Ref<HTMLDivElement>
}
