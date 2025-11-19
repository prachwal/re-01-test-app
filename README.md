# React + TypeScript + Vite App

A modern Single Page Application (SPA) built with React 19, Vite, and TypeScript. Features fast development with Hot Module Replacement (HMR), comprehensive testing with Vitest, and automated deployment to GitHub Pages.

## Features

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Vitest** for unit testing with coverage reports
- **ESLint** for code linting
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

## Testing

Tests are written with Vitest and @testing-library/react. Coverage is configured for TypeScript/React files only.

- Run tests: `npm run test`
- Run with coverage: `npm run test:coverage`
- Test files: `src/*.test.tsx`
- Coverage reports: Generated in `coverage/` directory

## Deployment

The app is automatically deployed to GitHub Pages on pushes to the `main` branch via GitHub Actions.

- Base path: `/re-01-test-app/` (configured for GitHub Pages)
- Workflow: `.github/workflows/ci.yml`
- Live demo: [https://prachwal.github.io/re-01-test-app/](https://prachwal.github.io/re-01-test-app/)

## Project Structure

```
src/
├── App.tsx          # Main component with counter
├── App.test.tsx     # Tests for App component
├── main.tsx         # App entry point
├── main.test.tsx    # Tests for main entry
├── test/
│   └── setup.ts     # Test setup (Jest DOM)
├── assets/          # Static assets
└── index.css        # Global styles

.github/
├── workflows/ci.yml # GitHub Actions pipeline
└── copilot-instructions.md # AI coding guidelines

vite.config.ts       # Vite configuration
vitest.config.ts     # Vitest configuration
package.json         # Dependencies and scripts
```

## Adding Components

1. Create `src/NewComponent.tsx`:
   ```tsx
   import React from 'react'

   const NewComponent: React.FC = () => {
     return <div>New Component</div>
   }

   export default NewComponent
   ```

2. Import in `App.tsx`:
   ```tsx
   import NewComponent from './NewComponent'
   ```

3. Add test in `src/NewComponent.test.tsx`:
   ```tsx
   import { render, screen } from '@testing-library/react'
   import NewComponent from './NewComponent'

   test('renders component', () => {
     render(<NewComponent />)
     expect(screen.getByText('New Component')).toBeInTheDocument()
   })
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
])
```

## Contributing

1. Follow the existing code style and conventions
2. Add tests for new features
3. Ensure 100% test coverage for components
4. Run `npm run lint` before committing
