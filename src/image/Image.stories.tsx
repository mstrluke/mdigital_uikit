import type { Meta, StoryObj } from '@storybook/react'
import Image from './index'

const meta: Meta<typeof Image> = {
  title: 'General/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    width: {
      control: 'number',
      description: 'Image width in pixels',
    },
    height: {
      control: 'number',
      description: 'Image height in pixels',
    },
    withBlur: {
      control: 'boolean',
      description: 'Enable blur placeholder while loading',
    },
    fallbackSrc: {
      control: 'text',
      description: 'Fallback image URL on error',
    },
    fetchPriority: {
      control: 'select',
      options: ['auto', 'high', 'low'],
      description: 'Fetch priority hint',
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop',
    alt: 'Sample image',
    width: 400,
    height: 300,
  },
}

export const WithLoadingAnimation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Loading Animation (withBlur)</h3>
        <p className="text-xs text-text-secondary mb-3">
          Shows a pulse animation placeholder while the image loads, then fades in.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=500&fit=crop"
          alt="Image with loading animation"
          width={800}
          height={500}
          withBlur
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Without Loading Animation</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=500&fit=crop"
          alt="Image without loading"
          width={800}
          height={500}
          className="rounded-lg"
        />
      </div>
    </div>
  ),
}

export const ObjectFitVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">object-cover</h4>
        <div className="h-48 rounded-lg border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">object-contain</h4>
        <div className="h-48 rounded-lg border overflow-hidden bg-surface">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit contain"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">object-fill</h4>
        <div className="h-48 rounded-lg border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit fill"
            className="w-full h-full object-fill"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">object-none</h4>
        <div className="h-48 rounded-lg border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit none"
            className="w-full h-full object-none"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">object-scale-down</h4>
        <div className="h-48 rounded-lg border overflow-hidden bg-surface">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit scale down"
            className="w-full h-full object-scale-down"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">object-cover + object-top</h4>
        <div className="h-48 rounded-lg border overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop"
            alt="Object fit cover top"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small (200x150)</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=150&fit=crop"
          alt="Small image"
          width={200}
          height={150}
          withBlur
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Medium (400x300)</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&h=300&fit=crop"
          alt="Medium image"
          width={400}
          height={300}
          withBlur
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Large (800x600)</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&h=600&fit=crop"
          alt="Large image"
          width={800}
          height={600}
          withBlur
          className="rounded-lg"
        />
      </div>
    </div>
  ),
}

export const WithRoundedCorners: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <h4 className="text-xs font-semibold mb-2">None</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=200&fit=crop"
          alt="No rounding"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-2">rounded-md</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=300&h=200&fit=crop"
          alt="Medium rounding"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-2">rounded-xl</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=300&h=200&fit=crop"
          alt="XL rounding"
          width={300}
          height={200}
          className="rounded-xl"
        />
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-2">rounded-full</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220801-eef408f95d71?w=200&h=200&fit=crop"
          alt="Full rounding"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
    </div>
  ),
}

export const ErrorHandling: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">With Fallback Image</h3>
        <Image
          src="https://this-will-fail.invalid/nope.jpg"
          alt="With fallback"
          width={400}
          height={300}
          fallbackSrc="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Without Fallback (no broken icon)</h3>
        <div className="h-[300px] w-[400px] rounded-lg border border-dashed border-border flex items-center justify-center text-text-secondary text-sm">
          <Image
            src="https://this-will-fail.invalid/nope.jpg"
            alt="No fallback"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  ),
}

export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        'photo-1682687220742-aba13b6e50ba',
        'photo-1682687220063-4742bd7fd538',
        'photo-1682687221038-404cb8830901',
        'photo-1682687982501-1e58ab814714',
        'photo-1682687982298-c7514a167088',
        'photo-1682687982167-d7fb3ed8541d',
        'photo-1682687982141-0143020ed57a',
        'photo-1682687220801-eef408f95d71',
      ].map((id, index) => (
        <div key={id} className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={`https://images.unsplash.com/${id}?w=300&h=300&fit=crop`}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      ))}
    </div>
  ),
}

export const ProductImages: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="border rounded-lg overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
            alt="Wireless headphones"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold">Wireless Headphones</h4>
          <p className="text-sm text-text-secondary mt-1">Premium sound quality</p>
          <p className="text-lg font-bold mt-2">$199.99</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
            alt="Smart watch"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold">Smart Watch</h4>
          <p className="text-sm text-text-secondary mt-1">Track your fitness goals</p>
          <p className="text-lg font-bold mt-2">$299.99</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop"
            alt="Designer sunglasses"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold">Designer Sunglasses</h4>
          <p className="text-sm text-text-secondary mt-1">UV protection included</p>
          <p className="text-lg font-bold mt-2">$149.99</p>
        </div>
      </div>
    </div>
  ),
}

export const FetchPriority: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">High Priority (Above the fold)</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=400&fit=crop"
          alt="High priority image"
          width={800}
          height={400}
          withBlur
          fetchPriority="high"
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Low Priority (Below the fold)</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=400&fit=crop"
          alt="Low priority image"
          width={800}
          height={400}
          withBlur
          fetchPriority="low"
          className="rounded-lg"
        />
      </div>
    </div>
  ),
}

export const ResponsiveImages: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Full Width Responsive</h3>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=600&fit=crop"
          alt="Full width image"
          className="rounded-lg w-full h-auto"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Responsive Grid</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={`https://images.unsplash.com/photo-16826872${20000 + id * 10000}?w=400&h=300&fit=crop`}
                alt={`Responsive image ${id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
