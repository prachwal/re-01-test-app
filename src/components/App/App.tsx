import { useState, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';

declare const __APP_VERSION__: string;
declare const __HAS_DOCS__: boolean;
declare const __HAS_COVERAGE__: boolean;
declare const __HAS_STORYBOOK__: boolean;

type ThemeVariant = 'light' | 'medium' | 'dark';
type ThemeName = 'standard' | 'nature' | 'sunset' | 'ocean';
type ThemeValue = `${ThemeName}-${ThemeVariant}`;

/**
 * Main application component.
 * Displays a counter with increment functionality and links to Vite and React documentation.
 */
function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<ThemeValue>(() => {
    // Sprawdź zapisany motyw w localStorage
    const savedTheme = localStorage.getItem('app-theme') as ThemeValue | null;
    if (savedTheme) {
      return savedTheme;
    }

    // Sprawdź preferencję systemową
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'standard-dark' : 'standard-light';
  });

  useEffect(() => {
    // Ustaw atrybut data-theme na elemencie HTML
    document.documentElement.setAttribute('data-theme', theme);

    // Zapisz wybrany motyw w localStorage
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Obserwuj zmiany atrybutu data-theme na elemencie HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const newTheme = document.documentElement.getAttribute(
            'data-theme'
          ) as ThemeValue;
          if (newTheme && newTheme !== theme) {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value as ThemeValue;
    setTheme(selectedTheme);
  };

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
