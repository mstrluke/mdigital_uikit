import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Upload from './index';

describe('Upload', () => {
  it('renders with default button variant', () => {
    render(<Upload />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Upload label="Upload Files" />);
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
  });

  it('renders dropzone variant', () => {
    render(<Upload variant="dropzone" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders dragger variant', () => {
    render(<Upload variant="dragger" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('accepts file uploads', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    render(<Upload onChange={handleChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      await user.upload(input, file);
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('shows helper text', () => {
    render(<Upload helperText="Max file size: 10MB" />);
    expect(screen.getByText('Max file size: 10MB')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Upload error="File upload failed" />);
    expect(screen.getByText('File upload failed')).toBeInTheDocument();
  });

  it('disables upload when disabled', () => {
    render(<Upload variant="button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('accepts multiple files when multiple is true', () => {
    const { container } = render(<Upload multiple />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('multiple');
  });

  it('restricts file types when accept is provided', () => {
    const { container } = render(<Upload accept="image/*" />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', 'image/*');
  });

  it('applies custom className', () => {
    const { container } = render(<Upload className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('displays uploaded file list when showUploadList is true', async () => {
    const user = userEvent.setup();
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    render(<Upload showUploadList />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      await user.upload(input, file);
      expect(await screen.findByText('test.txt')).toBeInTheDocument();
    }
  });

  it('renders with custom button text', () => {
    render(<Upload variant="button" buttonText="Choose File" />);
    expect(screen.getByText('Choose File')).toBeInTheDocument();
  });

  it('renders with custom drag text', () => {
    render(<Upload variant="dropzone" dragText="Drop files here" />);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('renders avatar variant', () => {
    render(<Upload variant="avatar" />);
    expect(screen.getByLabelText('Upload avatar image')).toBeInTheDocument();
  });

  it('renders picture variant', () => {
    render(<Upload variant="picture" />);
    expect(screen.getByLabelText('Upload picture')).toBeInTheDocument();
  });

  it('supports different list types', () => {
    const { rerender } = render(<Upload listType="text" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Upload listType="picture" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Upload listType="picture-card" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
