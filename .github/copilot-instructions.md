# AI Coding Instructions for React + Vite + TypeScript Project

## Architecture Overview
This is a simple Single Page Application (SPA) built with React 19, Vite, and TypeScript. Key components:
- `src/App.tsx`: Main component with local state (useState for counter), renders UI with button interaction.
- `src/main.tsx`: Entry point using React 18's createRoot API to render App in StrictMode.
- Data flow: Local state management via React hooks; no external state libraries or APIs yet.

Project uses Vite for fast development (HMR) and build optimization. Base path set to `/re-01-test-app/` for GitHub Pages deployment.

## Critical Workflows
- **Development**: `npm run dev` starts Vite dev server with HMR.
- **Build**: `npm run build` compiles TypeScript and bundles with Vite; includes base path for Pages.
- **Test**: `npm run test` runs Vitest in CI mode (no watch). `npm run test:coverage` generates coverage reports.
- **Lint**: `npm run lint` checks code with ESLint (React + TypeScript rules).
- **CI/CD**: GitHub Actions workflow (`.github/workflows/ci.yml`) tests on Node 24.x, lints, builds, and deploys to Pages on main branch push.

## Project-Specific Conventions
- **Testing**: Use Vitest with @testing-library/react, jsdom environment, globals enabled. Tests in `src/*.test.tsx`. Coverage configured for `src/**/*.{ts,tsx}` only, excluding test files. JUnit output for CI.
- **Configuration**: Test config extends Vite config in `vitest.config.ts`. Base path in `vite.config.ts` for Pages.
- **File Structure**: Source in `src/`, config files at root. No complex folder structure yet.
- **Dependencies**: Minimal; add to devDependencies for tools, dependencies for runtime.

## Integration Points
- **GitHub Pages**: Deployed from `dist/` with base path. Workflow handles artifact upload and deployment.
- **External Dependencies**: React 19, Vite 7, TypeScript. No external APIs or services.

## Examples
- Add new component: Create `src/NewComponent.tsx`, export default, import in `App.tsx`.
- Add test: Create `src/NewComponent.test.tsx`, use `render(<NewComponent />)`, assert with screen queries.
- Update build: Modify `vite.config.ts` for plugins or base path changes.

Focus on maintaining 100% test coverage for components. Use TypeScript strictly for type safety.