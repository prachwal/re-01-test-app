import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/slices/themeSlice';
import type { RootState, AppDispatch } from '@/store';
import type { ThemeValue } from './types';

/**
 * Hook do zarządzania stanem aplikacji z Redux.
 */
export function useAppState() {
  const count = useSelector((state: RootState) => state.counter.value);
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Obserwuj zmiany atrybutu data-theme na elemencie HTML
    const handleMutation = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const newTheme = document.documentElement.getAttribute(
            'data-theme'
          ) as ThemeValue;
          if (newTheme && newTheme !== theme) {
            dispatch(setTheme(newTheme));
          }
        }
      });
    };

    const observer = new MutationObserver(handleMutation);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [theme, dispatch]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value as ThemeValue;
    dispatch(setTheme(selectedTheme));
  };

  return { count, theme, dispatch, handleThemeChange };
}
