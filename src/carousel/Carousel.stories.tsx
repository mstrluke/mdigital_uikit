import type { Meta, StoryObj } from '@storybook/react'
import { SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, EffectCoverflow } from 'swiper/modules'
import Carousel from './index'

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    withArrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    withPagination: {
      control: 'boolean',
      description: 'Show pagination dots',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of slides per view',
    },
    spaceBetween: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Space between slides in pixels',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

// Sample images for the carousel
const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery',
  },
  {
    url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop',
    title: 'Ocean Waves',
    description: 'Peaceful ocean view',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    title: 'Forest Path',
    description: 'Serene forest trail',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    title: 'Desert Sunset',
    description: 'Golden desert landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    title: 'Lake Reflection',
    description: 'Calm lake at dawn',
  },
]

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        withArrows
        withPagination
      >
        {sampleImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-96 bg-surface rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}

export const WithAutoplay: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4 text-sm text-text-secondary">
        This carousel auto-advances every 3 seconds
      </div>
      <Carousel
        withArrows
        withPagination
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {sampleImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-96 bg-surface rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}


export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4 text-sm text-text-secondary">
        Responsive carousel that adapts to screen size: 1 slide on mobile, 2 on tablet, 3 on desktop
      </div>
      <Carousel
        withArrows
        withPagination
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {sampleImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-64 bg-surface rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}


export const ProductShowcase: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <Carousel
        withArrows
        withPagination
        loop
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {[
          { name: 'Product 1', price: '$99.99', image: sampleImages[0].url },
          { name: 'Product 2', price: '$149.99', image: sampleImages[1].url },
          { name: 'Product 3', price: '$199.99', image: sampleImages[2].url },
          { name: 'Product 4', price: '$129.99', image: sampleImages[3].url },
          { name: 'Product 5', price: '$179.99', image: sampleImages[4].url },
        ].map((product, index) => (
          <SwiperSlide key={index}>
            <div className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="w-full h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-primary font-bold text-xl">{product.price}</p>
                <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}

export const TestimonialCarousel: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <Carousel
        withArrows
        withPagination
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {[
          {
            quote: 'This product has completely transformed how we work. Highly recommended!',
            author: 'John Doe',
            role: 'CEO, TechCorp',
          },
          {
            quote: 'Outstanding quality and excellent customer service. Five stars!',
            author: 'Jane Smith',
            role: 'Product Manager, StartupXYZ',
          },
          {
            quote: 'Best investment we made this year. The ROI has been incredible.',
            author: 'Bob Johnson',
            role: 'CTO, Enterprise Inc',
          },
        ].map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-surface rounded-lg border border-border p-8 text-center">
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-lg text-text-primary italic mb-6">{testimonial.quote}</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-text-primary">{testimonial.author}</p>
                <p className="text-sm text-text-secondary">{testimonial.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}

export const CardCarousel: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
      <Carousel
        withArrows
        withPagination
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {[
          { title: 'Getting Started with React', date: 'Jan 15, 2024', category: 'Tutorial' },
          { title: 'Advanced TypeScript Patterns', date: 'Jan 16, 2024', category: 'Guide' },
          { title: 'Building Scalable Applications', date: 'Jan 17, 2024', category: 'Article' },
          { title: 'State Management Best Practices', date: 'Jan 18, 2024', category: 'Tutorial' },
          { title: 'Performance Optimization Tips', date: 'Jan 19, 2024', category: 'Guide' },
        ].map((article, index) => (
          <SwiperSlide key={index}>
            <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-lg transition-shadow h-full">
              <div className="inline-flex px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                {article.category}
              </div>
              <h3 className="font-bold text-lg mb-2 text-text-primary">{article.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{article.date}</p>
              <button className="text-primary hover:underline text-sm font-medium">
                Read More →
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ),
}

