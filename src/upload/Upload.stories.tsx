import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Upload from './index'
import type { UploadFile } from './types'

const meta: Meta<typeof Upload> = {
  title: 'Data Entry/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['button', 'dropzone', 'dragger', 'picture', 'avatar'],
      description: 'Upload UI variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Component size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Button color (for button variant)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    showUploadList: {
      control: 'boolean',
      description: 'Show uploaded files list',
    },
    listType: {
      control: 'select',
      options: ['text', 'picture', 'picture-card'],
      description: 'List display type',
    },
  },
}

export default meta
type Story = StoryObj<typeof Upload>

export const Primary: Story = {
  args: {
    variant: 'button',
    size: 'md',
    buttonText: 'Upload File',
  },
}

export const MultipleFiles: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Multiple Files Upload"
          variant="dropzone"
          multiple
          fileList={fileList}
          onChange={setFileList}
          dragText="Click or drag files here"
          dragHint="Support for multiple file uploads"
        />
      </div>
    )
  },
}

export const FileTypeRestrictions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Upload
        label="Images Only"
        variant="dropzone"
        accept="image/*"
        dragText="Upload images"
        dragHint="Only image files (PNG, JPG, GIF, etc.)"
      />
      <Upload
        label="PDFs Only"
        variant="dropzone"
        accept="application/pdf"
        dragText="Upload PDF"
        dragHint="Only PDF files"
      />
    </div>
  ),
}

export const SizeLimits: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Size Limit: 5MB"
          variant="dropzone"
          multiple
          maxSize={5 * 1024 * 1024}
          fileList={fileList}
          onChange={setFileList}
          onError={(error) => alert(error)}
          dragText="Upload files (max 5MB)"
          dragHint="Files must be smaller than 5MB"
        />
      </div>
    )
  },
}

export const FileCountLimit: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Maximum 3 Files"
          variant="dropzone"
          multiple
          maxCount={3}
          fileList={fileList}
          onChange={setFileList}
          onError={(error) => alert(error)}
          dragText="Upload up to 3 files"
          dragHint="Maximum 3 files allowed"
        />
        <p className="text-sm text-text-muted">
          Uploaded: {fileList.length} / 3 files
        </p>
      </div>
    )
  },
}

export const UploadProgress: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const customRequest = ({
      file,
      onProgress,
      onSuccess,
      onError,
    }: {
      file: File
      onProgress: (percent: number) => void
      onSuccess: (response: any) => void
      onError: (error: any) => void
    }) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress > 100) progress = 100
        onProgress(Math.floor(progress))

        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            if (Math.random() > 0.3) {
              onSuccess({ url: 'https://example.com/file' })
            } else {
              onError('Upload failed')
            }
          }, 500)
        }
      }, 500)
    }

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Upload with Progress"
          variant="dropzone"
          multiple
          fileList={fileList}
          onChange={setFileList}
          customRequest={customRequest}
          dragText="Upload files to see progress"
          dragHint="Real-time upload progress indicators"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Upload disabled variant="button" buttonText="Disabled Button" />
      <Upload
        disabled
        variant="dropzone"
        dragText="Disabled Dropzone"
        dragHint="Cannot interact"
      />
    </div>
  ),
}

export const AvatarUpload: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-4">
          <Upload
            variant="avatar"
            size="lg"
            accept="image/*"
            fileList={fileList}
            onChange={setFileList}
            maxSize={2 * 1024 * 1024}
            onError={(error) => alert(error)}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">
              Profile Picture
            </p>
            <p className="text-xs text-text-muted">
              Click to upload (max 2MB)
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const DraggerVariant: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Drag and Drop Area"
          variant="dragger"
          multiple
          fileList={fileList}
          onChange={setFileList}
          dragText="Click or drag files to this area to upload"
          dragHint="Support for single or bulk upload. Strictly prohibited from uploading sensitive data."
        />
      </div>
    )
  },
}

export const ControlledExample: Story = {
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Upload
          label="Controlled Upload"
          variant="dropzone"
          multiple
          fileList={fileList}
          onChange={setFileList}
          maxSize={5 * 1024 * 1024}
          onError={(error) => alert(error)}
          dragText="Upload files"
          dragHint="Fully controlled component"
        />
        <div className="text-sm text-text-muted">
          Files uploaded: {fileList.length}
        </div>
        <button
          onClick={() => setFileList([])}
          disabled={fileList.length === 0}
          className="px-4 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All Files
        </button>
      </div>
    )
  },
}
