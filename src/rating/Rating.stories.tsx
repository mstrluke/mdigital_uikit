import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Rating from './index'

const meta: Meta<typeof Rating> = {
  title: 'Data Entry/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Current rating value',
    },
    defaultValue: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Default rating value (uncontrolled)',
    },
    count: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Number of stars',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Allow half-star ratings',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      description: 'Star color',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Star size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'soft'],
      description: 'Visual style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Primary: Story = {
  args: {
    value: 3.5,
    allowHalf: true,
    color: 'warning',
    size: 'md',
  },
}

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(3)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">Rate this:</span>
          <Rating value={rating} onChange={setRating} />
          <span className="text-sm text-text-secondary">
            {rating > 0 ? `${rating} out of 5 stars` : 'No rating yet'}
          </span>
        </div>
        <button
          onClick={() => setRating(0)}
          className="px-4 py-2 bg-surface border border-border rounded text-sm"
        >
          Clear Rating
        </button>
      </div>
    )
  },
}

export const InteractiveWithHalfStars: Story = {
  render: () => {
    const [rating, setRating] = useState(3.5)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">Your rating:</span>
          <Rating value={rating} onChange={setRating} allowHalf size="lg" />
          <span className="text-sm text-text-secondary">
            {rating > 0 ? `${rating} / 5.0` : 'Not rated'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRating(5)}
            className="px-3 py-1 bg-success text-white rounded text-sm"
          >
            5 Stars
          </button>
          <button
            onClick={() => setRating(3.5)}
            className="px-3 py-1 bg-primary text-white rounded text-sm"
          >
            3.5 Stars
          </button>
          <button
            onClick={() => setRating(0)}
            className="px-3 py-1 bg-surface border border-border rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    )
  },
}

export const ProductReview: Story = {
  render: () => {
    const [rating, setRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
      if (rating > 0) {
        setSubmitted(true)
      }
    }

    const handleReset = () => {
      setRating(0)
      setSubmitted(false)
    }

    return (
      <div className="max-w-md p-6 border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Rate this product</h3>
        <p className="text-sm text-text-secondary">
          Share your experience with other customers
        </p>

        {!submitted ? (
          <>
            <div className="flex items-center gap-4">
              <Rating value={rating} onChange={setRating} size="lg" allowHalf />
              {rating > 0 && (
                <span className="text-sm font-medium">{rating} stars</span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
            >
              Submit Rating
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success rounded text-sm text-success">
              Thank you for your rating!
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Your rating:</span>
              <Rating value={rating} readOnly allowHalf />
              <span className="text-sm font-medium">{rating} stars</span>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-primary hover:underline"
            >
              Change rating
            </button>
          </div>
        )}
      </div>
    )
  },
}

export const RatingWithReviews: Story = {
  render: () => {
    const reviews = [
      { stars: 5, count: 245, percentage: 70 },
      { stars: 4, count: 68, percentage: 19 },
      { stars: 3, count: 21, percentage: 6 },
      { stars: 2, count: 11, percentage: 3 },
      { stars: 1, count: 7, percentage: 2 },
    ]
    const averageRating = 4.5
    const totalReviews = 352

    return (
      <div className="max-w-2xl p-6 border border-border rounded-lg space-y-6">
        <div className="flex items-start gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{averageRating}</div>
            <Rating value={averageRating} allowHalf readOnly size="lg" />
            <div className="text-sm text-text-secondary mt-2">
              {totalReviews} reviews
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {reviews.map((review) => (
              <div key={review.stars} className="flex items-center gap-3">
                <span className="text-sm w-6">{review.stars}</span>
                <Rating value={1} count={1} readOnly size="xs" />
                <div className="flex-1 bg-surface rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-warning"
                    style={{ width: `${review.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-12 text-right">
                  {review.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

