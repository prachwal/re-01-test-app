import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeValue } from '../../components/App/types';

interface ThemeState {
  currentTheme: ThemeValue;
}

export const getInitialTheme = (): ThemeValue => {
  // Sprawdź zapisany motyw w localStorage
  const savedTheme = localStorage.getItem('app-theme') as ThemeValue | null;
  if (savedTheme) {
    return savedTheme;
  }

  // Sprawdź preferencję systemową
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'standard-dark' : 'standard-light';
};

const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeValue>) => {
      state.currentTheme = action.payload;
      // Ustaw atrybut data-theme na elemencie HTML
      document.documentElement.setAttribute('data-theme', action.payload);
      // Zapisz wybrany motyw w localStorage
      localStorage.setItem('app-theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
