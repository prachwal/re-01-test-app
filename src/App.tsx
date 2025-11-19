import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

declare const __APP_VERSION__: string;
declare const __HAS_DOCS__: boolean;
declare const __HAS_COVERAGE__: boolean;

/**
 * Main application component.
 * Displays a counter with increment functionality and links to Vite and React documentation.
 */
function App() {
  const [count, setCount] = useState(0);

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
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
      </p>
    </>
  );
}

export default App;
