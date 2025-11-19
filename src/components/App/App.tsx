import { useAppState } from './logic';
import { increment } from '@/store/slices/counterSlice';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

declare const __APP_VERSION__: string;
declare const __HAS_DOCS__: boolean;
declare const __HAS_COVERAGE__: boolean;
declare const __HAS_STORYBOOK__: boolean;

/**
 * Main application component.
 * Displays a counter with increment functionality and links to Vite and React documentation.
 */
function App() {
  const { count, theme, dispatch, handleThemeChange } = useAppState();

  return (
    <>
      <div>
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React v{__APP_VERSION__}</h1>

      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="theme-selector">
        <label htmlFor="theme-select">Choose Theme:</label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          <optgroup label="Standard">
            <option value="standard-light">Light</option>
            <option value="standard-medium">Medium</option>
            <option value="standard-dark">Dark</option>
          </optgroup>
          <optgroup label="Nature">
            <option value="nature-light">Light</option>
            <option value="nature-medium">Medium</option>
            <option value="nature-dark">Dark</option>
          </optgroup>
          <optgroup label="Sunset">
            <option value="sunset-light">Light</option>
            <option value="sunset-medium">Medium</option>
            <option value="sunset-dark">Dark</option>
          </optgroup>
          <optgroup label="Ocean">
            <option value="ocean-light">Light</option>
            <option value="ocean-medium">Medium</option>
            <option value="ocean-dark">Dark</option>
          </optgroup>
        </select>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        {__HAS_DOCS__ && (
          <>
            {' | '}
            <a
              href={`${import.meta.env.BASE_URL}docs/index.html`}
              rel="noreferrer"
              target="_blank"
            >
              Documentation
            </a>
          </>
        )}
        {__HAS_COVERAGE__ && (
          <>
            {' | '}
            <a
              href={`${import.meta.env.BASE_URL}coverage/index.html`}
              rel="noreferrer"
              target="_blank"
            >
              Coverage
            </a>
          </>
        )}
        {__HAS_STORYBOOK__ && (
          <>
            {' | '}
            <a
              href={`${import.meta.env.BASE_URL}storybook/index.html`}
              rel="noreferrer"
              target="_blank"
            >
              Storybook
            </a>
          </>
        )}
      </p>
    </>
  );
}

export default App;
