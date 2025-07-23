import type { Preview } from '@storybook/react-vite';

import '@mantine/core/styles.css';

import React from 'react';
import { MantineProvider } from '@mantine/core';

export const decorators = [
  (renderStory: any) => <MantineProvider>{renderStory()}</MantineProvider>,
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
