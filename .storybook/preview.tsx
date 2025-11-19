import type { Preview } from '@storybook/react';
import '../src/index.scss';

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
        items: [
          { value: 'standard-light', icon: 'sun', title: 'Standard Light' },
          { value: 'standard-dark', icon: 'moon', title: 'Standard Dark' },
          { value: 'sepia-light', icon: 'eye', title: 'Sepia Light' },
          { value: 'sepia-dark', icon: 'eyeclose', title: 'Sepia Dark' },
          { value: 'ocean-light', icon: 'waterdrop', title: 'Ocean Light' },
          { value: 'ocean-dark', icon: 'droplet', title: 'Ocean Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <div id="root" data-theme={theme}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
