import { useState, useEffect } from 'react';
import type { ThemeValue } from './types';

/**
 * Hook do zarządzania licznikiem.
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  return { count, setCount };
}

/**
 * Hook do zarządzania motywem aplikacji.
 */
export function useTheme() {
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

  return { theme, setTheme, handleThemeChange };
}
