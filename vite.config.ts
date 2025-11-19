import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/re-01-test-app/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "src/variables.scss";`,
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __HAS_DOCS__: JSON.stringify(fs.existsSync('./public/docs')),
    __HAS_COVERAGE__: JSON.stringify(fs.existsSync('./public/coverage')),
    __HAS_STORYBOOK__: JSON.stringify(fs.existsSync('./public/storybook')),
  },
});
