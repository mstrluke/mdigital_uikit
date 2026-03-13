import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/postcss'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      css: {
        ...config.css,
        postcss: {
          plugins: [tailwindcss]
        }
      }
    }
  },
}

export default config
