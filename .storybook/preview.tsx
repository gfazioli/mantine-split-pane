import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export const parameters = {
  layout: 'padded',
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Mantine color scheme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

export const decorators = [
  (renderStory: any, context: any) => {
    const scheme = (context.globals.theme || 'light') as 'light' | 'dark';
    return <MantineProvider forceColorScheme={scheme}>{renderStory()}</MantineProvider>;
  },
];
