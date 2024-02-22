import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { CodeHighlightTabs } from '@mantinex/shiki';
import { YarnIcon, NpmIcon } from '@mantinex/dev-icons';
import classes from './InstallScript.module.css';

interface InstallScriptProps {
  packages: string;
  dev?: boolean;
}

export function InstallScript({ packages, dev }: InstallScriptProps) {
  // Hello good sir/lady. Seems like you are interested in adding pnpm here.
  // Please do not do that, this contribution is not welcome.
  // https://github.com/mantinedev/mantine/pulls?q=is%3Apr+pnpm

  const [tab, setTab] = useLocalStorage({
    key: 'script-tab',
    defaultValue: 0,
  });

  return (
    <CodeHighlightTabs
      classNames={{ root: classes.root }}
      activeTab={tab}
      onTabChange={setTab}
      code={[
        {
          fileName: 'yarn',
          code: `yarn add ${dev ? '--dev ' : ''}${packages}`,
          language: 'bash',
          icon: <YarnIcon className={classes.icon} size={16} />,
        },
        {
          fileName: 'npm',
          code: `npm install ${dev ? '--save-dev ' : ''}${packages}`,
          language: 'bash',
          icon: <NpmIcon className={classes.icon} size={16} />,
        },
      ]}
    />
  );
}
