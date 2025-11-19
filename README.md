# React + TypeScript + Vite App

[![Build](https://github.com/prachwal/re-01-test-app/actions/workflows/ci.yml/badge.svg)](https://github.com/prachwal/re-01-test-app/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/prachwal/re-01-test-app)](https://github.com/prachwal/re-01-test-app/releases)
[![License](https://img.shields.io/github/license/prachwal/re-01-test-app)](https://github.com/prachwal/re-01-test-app/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/prachwal/re-01-test-app)](https://github.com/prachwal/re-01-test-app/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/prachwal/re-01-test-app)](https://github.com/prachwal/re-01-test-app/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/prachwal/re-01-test-app)](https://github.com/prachwal/re-01-test-app/commits)

A modern Single Page Application (SPA) built with React 19, Vite, and TypeScript. Features dynamic CSS themes (standard, sepia, ocean in light/medium/dark variants), Storybook for component development, SCSS/Sass for styling, comprehensive testing with Vitest, automated deployment to GitHub Pages, and TypeDoc-generated documentation.

## Features

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Path Aliases**: `@/` resolves to `src/` for cleaner imports
- **Dynamic CSS Themes**: Standard, sepia, and ocean themes with light/medium/dark variants, selectable via UI or auto-detected from `prefers-color-scheme`
- **SCSS/Sass**: Preprocessed styles with mixins and loops for efficient theme management
- **Storybook**: Interactive component development environment with theme toolbar
- **Vitest** for unit testing with coverage reports
- **ESLint** for code linting
- **TypeDoc**: Auto-generated API documentation
- **GitHub Actions** CI/CD pipeline
- **GitHub Pages** deployment with base path support

## Getting Started

### Prerequisites

- Node.js 24.x (latest LTS recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prachwal/re-01-test-app.git
   cd re-01-test-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the app.

## Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run test:coverage` - Run tests with coverage report
- `npm run type-check` - Run TypeScript type checking
- `npm run docs` - Generate TypeDoc documentation
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for static hosting

## Testing

Tests are written with Vitest and @testing-library/react. Coverage is configured for TypeScript/React files only.

- Run tests: `npm run test`
- Run with coverage: `npm run test:coverage`
- Test files: `src/*.test.tsx`
- Coverage reports: Generated in `coverage/` directory

## Themes

The app supports dynamic CSS themes: standard, sepia, and ocean, each with light, medium, and dark variants. Themes are managed via SCSS maps and mixins, applied using `data-theme` attribute on the `<html>` element.

- Select theme in the app UI (persisted in localStorage)
- Auto-detects `prefers-color-scheme` for initial theme
- Storybook includes a theme toolbar for testing components across themes

## Storybook

Storybook is configured for component development and testing.

- Run Storybook: `npm run storybook`
- Access at: [http://localhost:6006](http://localhost:6006)
- Built stories are hosted at: `/storybook/` on GitHub Pages

## Documentation

API documentation is auto-generated using TypeDoc.

- Generate docs: `npm run docs`
- View docs: Open `public/docs/index.html` or visit `/docs/` on GitHub Pages

## Deployment

The app is automatically deployed to GitHub Pages on pushes to the `main` branch via GitHub Actions.

- Base path: `/re-01-test-app/` (configured for GitHub Pages)
- Workflow: `.github/workflows/ci.yml`
- Live demo: [https://prachwal.github.io/re-01-test-app/](https://prachwal.github.io/re-01-test-app/)

## Project Structure

```
src/
├── styles/
│   ├── variables.scss       # Color variables and design tokens
│   ├── themes.scss          # Theme maps, mixins, and dynamic theme generation
│   ├── base.scss            # Base styles (:root, body, typography, links)
│   ├── components.scss      # Component styles (buttons, cards, selectors)
│   └── index.scss           # Main SCSS entry point importing all modules
├── components/
│   ├── App/
│   │   ├── App.tsx          # Main component (presentation only, uses hooks from logic.ts)
│   │   ├── logic.ts         # Custom hooks (useCounter, useTheme) for business logic
│   │   ├── types.ts         # TypeScript types (ThemeValue, etc.)
│   │   └── App.test.tsx     # Tests for App component and hooks
│   └── index.ts             # Component exports
├── index.scss               # Global SCSS styles (imports from styles/)
├── main.tsx                 # App entry point
├── main.test.tsx            # Tests for main entry
├── test/
│   └── setup.ts             # Test setup (polyfills for jsdom)
├── assets/                  # Static assets
└── vite-env.d.ts            # Vite type definitions

.storybook/
├── main.ts                  # Storybook configuration
└── preview.tsx              # Storybook preview setup with theme decorator

.github/
├── workflows/ci.yml         # GitHub Actions pipeline
└── copilot-instructions.md  # AI coding guidelines

public/
├── docs/                    # Generated TypeDoc documentation
├── storybook/               # Built Storybook (after build-storybook)
└── coverage/                # Test coverage reports

vite.config.ts               # Vite configuration
vitest.config.ts             # Vitest configuration
package.json                 # Dependencies and scripts
LICENSE                      # MIT License
```

## Adding Components

1. Create `src/NewComponent.tsx`:

   ```tsx
   import React from 'react';

   const NewComponent: React.FC = () => {
     return <div>New Component</div>;
   };

   export default NewComponent;
   ```

2. Import in `App.tsx`:

   ```tsx
   import NewComponent from '@/components/NewComponent';
   ```

3. Add test in `src/NewComponent.test.tsx`:

   ```tsx
   import { render, screen } from '@testing-library/react';
   import NewComponent from './NewComponent';

   test('renders component', () => {
     render(<NewComponent />);
     expect(screen.getByText('New Component')).toBeInTheDocument();
   });
   ```

## ESLint Configuration

The project uses ESLint with React and TypeScript rules. For production apps, consider enabling type-aware rules:

```js
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Enable type-checked rules
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Follow the existing code style and conventions
2. Add tests for new features
3. Ensure 100% test coverage for components
4. Run `npm run lint` before committing
