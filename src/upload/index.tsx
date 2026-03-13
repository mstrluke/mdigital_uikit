'use client'

import React from 'react'

import {
  AlertCircle,
  CheckCircle,
  File,
  Image as ImageIcon,
  Loader2,
  Upload as UploadIcon,
  X,
} from 'lucide-react'

import { useRipple, RippleContainer } from '../hooks/useRipple'
import {
  cn,
  getValidationStatus,
  iconSizes,
  statusMessageVariants,
} from '../utils'
import type { UploadFile, UploadProps } from './types'
import {
  formatFileSize,
  generateUID,
  isImageFile,
  matchesAccept,
  uploadAvatarVariants,
  uploadButtonVariants,
  uploadDraggerVariants,
  uploadDropzoneVariants,
  uploadPictureVariants,
} from './utils'

const Upload = React.memo<UploadProps>(
  ({
    variant = 'button',
    size = 'md',
    color = 'primary',
    label,
    helperText,
    error,
    warning,
    info,
    success,
    accept,
    multiple = false,
    maxSize,
    maxCount,
    fileList,
    defaultFileList = [],
    showUploadList = true,
    listType = 'text',
    disabled = false,
    buttonText = 'Upload File',
    dragText = 'Click or drag file to this area to upload',
    dragHint = 'Support for a single or bulk upload',
    onChange,
    onRemove,
    beforeUpload,
    customRequest,
    onError,
    className,
    classNames,
    ref,
    ...props
  }) => {
    const [internalFileList, setInternalFileList] =
      React.useState<UploadFile[]>(defaultFileList)
    const [dragActive, setDragActive] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const prevFileListRef = React.useRef<UploadFile[]>([])
    const isMountedRef = React.useRef(true)

    React.useEffect(() => {
      isMountedRef.current = true
      return () => { isMountedRef.current = false }
    }, [])
    const { ripples, onPointerDown: ripplePointerDown, onKeyDown: rippleKeyDown, onAnimationEnd: rippleAnimationEnd } = useRipple(!disabled)

    const currentFileList = fileList !== undefined ? fileList : internalFileList

    const { status, message: helperMessage } = getValidationStatus({
      error,
      warning,
      info,
      success,
      helperText,
    })


    const handleFiles = React.useCallback(
      async (files: FileList | null) => {
        if (!files || files.length === 0) return

        const newFiles: UploadFile[] = []
        let acceptedSoFar = 0

        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          if (!file) continue

          if (!matchesAccept(file, accept)) {
            const errorMsg = `File type not accepted`
            onError?.(errorMsg, file)
            continue
          }

          if (maxCount && currentFileList.length + acceptedSoFar >= maxCount) {
            const errorMsg = `Maximum ${maxCount} file${maxCount > 1 ? 's' : ''} allowed`
            onError?.(errorMsg, file)
            continue
          }

          if (maxSize && file.size > maxSize) {
            const errorMsg = `File size exceeds ${formatFileSize(maxSize)}`
            onError?.(errorMsg, file)
            continue
          }

          if (beforeUpload) {
            const shouldUpload = await beforeUpload(file)
            if (!shouldUpload) continue
          }

          const uploadFile: UploadFile = {
            uid: generateUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'uploading',
            percent: 0,
          }

          newFiles.push(uploadFile)
          acceptedSoFar++

          if (customRequest) {
            customRequest({
              file,
              onProgress: (percent) => {
                if (!isMountedRef.current) return
                setInternalFileList((prev) =>
                  prev.map((f) =>
                    f.uid === uploadFile.uid ? { ...f, percent } : f,
                  ),
                )
              },
              onSuccess: (response) => {
                if (!isMountedRef.current) return
                setInternalFileList((prev) =>
                  prev.map((f) =>
                    f.uid === uploadFile.uid
                      ? {
                          ...f,
                          status: 'done' as const,
                          percent: 100,
                          response,
                        }
                      : f,
                  ),
                )
              },
              onError: (err) => {
                if (!isMountedRef.current) return
                setInternalFileList((prev) =>
                  prev.map((f) =>
                    f.uid === uploadFile.uid
                      ? { ...f, status: 'error' as const, error: err }
                      : f,
                  ),
                )
              },
            })
          } else {
            if (file && isImageFile(file)) {
              uploadFile.thumbUrl = URL.createObjectURL(file)
            }
            uploadFile.status = 'done'
            uploadFile.percent = 100
          }
        }

        const updatedList = multiple
          ? [...currentFileList, ...newFiles]
          : newFiles

        if (fileList === undefined) {
          setInternalFileList(updatedList)
        }
        onChange?.(updatedList)
      },
      [
        accept,
        maxCount,
        maxSize,
        beforeUpload,
        customRequest,
        onError,
        multiple,
        currentFileList,
        fileList,
        onChange,
      ],
    )

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files)
        // Reset input value to allow uploading the same file again
        e.target.value = ''
      },
      [handleFiles],
    )

    const handleRemove = React.useCallback(
      (file: UploadFile) => {
        // Revoke object URL to prevent memory leak
        if (file.thumbUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(file.thumbUrl)
        }
        const updatedList = currentFileList.filter((f) => f.uid !== file.uid)
        if (fileList === undefined) {
          setInternalFileList(updatedList)
        }
        onRemove?.(file)
        onChange?.(updatedList)
      },
      [currentFileList, fileList, onRemove, onChange],
    )

    /**
     * Track fileList changes and revoke blob URLs for removed files.
     * This handles the case where a controlled fileList prop is updated
     * externally without calling handleRemove.
     */
    React.useEffect(() => {
      const prevFileList = prevFileListRef.current

      // Find files that were removed (existed in prev but not in current)
      prevFileList.forEach((prevFile) => {
        const stillExists = currentFileList.some((file) => file.uid === prevFile.uid)
        if (!stillExists && prevFile.thumbUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(prevFile.thumbUrl)
        }
      })

      // Update ref for next comparison
      prevFileListRef.current = currentFileList
    }, [currentFileList])

    /**
     * Cleanup object URLs on component unmount to prevent memory leaks.
     */
    React.useEffect(() => {
      return () => {
        // Use ref to get the latest fileList at unmount time
        prevFileListRef.current.forEach((file) => {
          if (file.thumbUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(file.thumbUrl)
          }
        })
      }
    }, [])

    const handleClick = React.useCallback(() => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }, [disabled])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      },
      [disabled],
    )

    const handleDragEnter = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(true)
    }, [])

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
    }, [])

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (!disabled) {
          handleFiles(e.dataTransfer.files)
        }
      },
      [disabled, handleFiles],
    )

    const renderFileList = () => {
      if (!showUploadList || currentFileList.length === 0) return null

      if (listType === 'picture-card') {
        return (
          <div
            data-slot="upload_fileList"
            className={cn('upload_fileList', 'flex flex-wrap gap-2 mt-2', classNames?.fileList)}
          >
            {currentFileList.map((file) => (
              <div
                key={file.uid}
                data-slot="upload_fileItem"
                className={cn(
                  'upload_fileItem',
                  'relative w-24 h-24 rounded-md border border-border overflow-hidden group',
                  classNames?.fileItem,
                )}
              >
                {file.thumbUrl ? (
                  <img
                    src={file.thumbUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface">
                    <File className="w-8 h-8 text-text-secondary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-overlay/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(file)}
                    className="text-background hover:text-error transition-colors"
                  >
                    <X className={iconSizes[size]} />
                  </button>
                </div>
                {file.status === 'uploading' && (
                  <div className="absolute inset-0 bg-overlay/30 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-background animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }

      return (
        <div
          data-slot="upload_fileList"
          className={cn('upload_fileList', 'mt-2 space-y-1', classNames?.fileList)}
        >
          {currentFileList.map((file) => (
            <div
              key={file.uid}
              data-slot="upload_fileItem"
              className={cn(
                'upload_fileItem',
                'flex items-center justify-between p-2 rounded-md bg-surface hover:bg-surface/80 transition-colors',
                classNames?.fileItem,
              )}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {listType === 'picture' && file.thumbUrl ? (
                  <img
                    src={file.thumbUrl}
                    alt={file.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <File
                    className={cn('text-text-secondary shrink-0', iconSizes[size])}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatFileSize(file.size)}
                    {file.status === 'uploading' &&
                      file.percent !== undefined && (
                        <span> - {file.percent}%</span>
                      )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === 'uploading' && (
                  <Loader2
                    className={cn('text-primary animate-spin', iconSizes[size])}
                  />
                )}
                {file.status === 'done' && (
                  <CheckCircle
                    className={cn('text-success', iconSizes[size])}
                  />
                )}
                {file.status === 'error' && (
                  <AlertCircle className={cn('text-error', iconSizes[size])} />
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(file)}
                  className="text-text-secondary hover:text-error transition-colors"
                >
                  <X className={iconSizes[size]} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    }

    const currentFile = currentFileList[0]

    const renderUploadArea = () => {
      const dragStatus = dragActive
        ? 'dragActive'
        : disabled
          ? 'disabled'
          : status === 'error'
            ? 'error'
            : 'default'

      switch (variant) {
        case 'button':
          return (
            <button
              type="button"
              onClick={handleClick}
              onPointerDown={ripplePointerDown}
              onKeyDown={rippleKeyDown}
              disabled={disabled}
              data-slot="upload_dropzone"
              className={cn(
                'upload_dropzone',
                uploadButtonVariants({ color, size }),
                'relative overflow-hidden',
                classNames?.dropzone,
                className,
              )}
            >
              <UploadIcon
                data-slot="upload_icon"
                className={cn('upload_icon', iconSizes[size], classNames?.icon)}
              />
              <span
                data-slot="upload_text"
                className={cn('upload_text', classNames?.text)}
              >
                {buttonText}
              </span>
              <RippleContainer ripples={ripples} onAnimationEnd={rippleAnimationEnd} />
            </button>
          )

        case 'dropzone':
          return (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Upload file${multiple ? 's' : ''}`}
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-slot="upload_dropzone"
              className={cn(
                'upload_dropzone',
                uploadDropzoneVariants({ status: dragStatus, size }),
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none',
                classNames?.dropzone,
                className,
              )}
            >
              <div className="flex items-center gap-3">
                <UploadIcon
                  data-slot="upload_icon"
                  className={cn(
                    'upload_icon',
                    'text-text-secondary',
                    iconSizes[size],
                    classNames?.icon,
                  )}
                />
                <div>
                  <p
                    data-slot="upload_text"
                    className={cn(
                      'upload_text',
                      'text-sm text-text-primary font-medium',
                      classNames?.text,
                    )}
                  >
                    {dragText}
                  </p>
                  {dragHint && (
                    <p
                      data-slot="upload_hint"
                      className={cn(
                        'upload_hint',
                        'text-xs text-text-secondary mt-0.5',
                        classNames?.hint,
                      )}
                    >
                      {dragHint}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )

        case 'dragger':
          return (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Upload file${multiple ? 's' : ''}`}
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-slot="upload_dropzone"
              className={cn(
                'upload_dropzone',
                uploadDraggerVariants({ status: dragStatus, size }),
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none',
                classNames?.dropzone,
                className,
              )}
            >
              <UploadIcon
                data-slot="upload_icon"
                className={cn('upload_icon', 'w-10 h-10 text-primary', classNames?.icon)}
              />
              <p
                data-slot="upload_text"
                className={cn(
                  'upload_text',
                  'text-base font-medium text-text-primary',
                  classNames?.text,
                )}
              >
                {dragText}
              </p>
              {dragHint && (
                <p
                  data-slot="upload_hint"
                  className={cn(
                    'upload_hint',
                    'text-sm text-text-secondary',
                    classNames?.hint,
                  )}
                >
                  {dragHint}
                </p>
              )}
            </div>
          )

        case 'avatar':
          return (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label="Upload avatar image"
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-slot="upload_dropzone"
              className={cn(
                'upload_dropzone',
                uploadAvatarVariants({ status: dragStatus, size }),
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none',
                classNames?.dropzone,
                className,
              )}
            >
              {currentFile?.thumbUrl ? (
                <img
                  src={currentFile.thumbUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon
                  data-slot="upload_icon"
                  className={cn(
                    'upload_icon',
                    'w-8 h-8 text-text-secondary',
                    classNames?.icon,
                  )}
                />
              )}
            </div>
          )

        case 'picture':
          return (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label="Upload picture"
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-slot="upload_dropzone"
              className={cn(
                'upload_dropzone',
                uploadPictureVariants({ status: dragStatus, size }),
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none',
                classNames?.dropzone,
                className,
              )}
            >
              {currentFile?.thumbUrl ? (
                <img
                  src={currentFile.thumbUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon
                  data-slot="upload_icon"
                  className={cn(
                    'upload_icon',
                    'w-8 h-8 text-text-secondary',
                    classNames?.icon,
                  )}
                />
              )}
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        data-slot="upload_root"
        className={cn('upload_root', 'w-full', classNames?.root)}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          data-slot="upload_input"
          className={cn('upload_input', 'hidden', classNames?.input)}
          {...props}
        />

        {label && (
          <label className="block mb-1">
            <span className="text-sm font-medium text-text-secondary">{label}</span>
          </label>
        )}

        {renderUploadArea()}
        {renderFileList()}

        {helperMessage && (
          <p className={cn(statusMessageVariants({ status }), 'mt-1')}>
            {helperMessage}
          </p>
        )}
      </div>
    )
  },
)

Upload.displayName = 'Upload'

export type { UploadClassNames } from './types'
export type * from './types'
export default Upload
