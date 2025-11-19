import type { Preview } from '@storybook/react';
import React from 'react';
import '@/styles/index.scss';

type ThemeVariant = 'light' | 'medium' | 'dark';
type ThemeName = 'standard' | 'nature' | 'sunset' | 'ocean';
type ThemeValue = `${ThemeName}-${ThemeVariant}`;

const themeOptions: { value: ThemeValue; title: string; icon: string }[] = [
  // Standard
  { value: 'standard-light', title: 'Standard Light', icon: 'sun' },
  { value: 'standard-medium', title: 'Standard Medium', icon: 'circle' },
  { value: 'standard-dark', title: 'Standard Dark', icon: 'moon' },
  // Nature
  { value: 'nature-light', title: 'Nature Light', icon: 'circle' },
  { value: 'nature-medium', title: 'Nature Medium', icon: 'circle' },
  { value: 'nature-dark', title: 'Nature Dark', icon: 'circle' },
  // Sunset
  { value: 'sunset-light', title: 'Sunset Light', icon: 'circle' },
  { value: 'sunset-medium', title: 'Sunset Medium', icon: 'circle' },
  { value: 'sunset-dark', title: 'Sunset Dark', icon: 'circle' },
  // Ocean
  { value: 'ocean-light', title: 'Ocean Light', icon: 'circle' },
  { value: 'ocean-medium', title: 'Ocean Medium', icon: 'circle' },
  { value: 'ocean-dark', title: 'Ocean Dark', icon: 'circle' },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'standard-light',
      toolbar: {
        icon: 'circlehollow',
        items: themeOptions,
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ThemeValue) || 'standard-light';
      React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
      return <Story />;
    },
  ],
};

export default preview;
