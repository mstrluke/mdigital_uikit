import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '**/*.stories.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        '**/*.stories.tsx',
        '**/*.d.ts',
        '**/types.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
        'dist/**',
        'node_modules/**',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    css: false,
  },
})
