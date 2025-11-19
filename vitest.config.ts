import { defineConfig } from 'vitest/config';
import { default as baseConfig } from './vite.config';

// https://vite.dev/config/
export default defineConfig({
  ...baseConfig,
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    reporters: ['verbose', 'junit'],
    outputFile: 'junit.xml',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/test/**'],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'public/coverage',
    },
  },
});
