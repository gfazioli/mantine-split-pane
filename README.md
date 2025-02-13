# Mantine Split pane Component

<div align="center">

  ![Image](https://github.com/gfazioli/mantine-split-pane/assets/432181/638a5ca0-040c-4114-a08f-67ce7b24dec5)

</div>

---

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-split-pane?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)


</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.

Utilizing Mantine UI, enables users to create a flexible layout with resizable split panes. It supports both vertical and horizontal splitting, allowing the arrangement of content in various configurations. The component seamlessly handles nested split panes, enabling complex layouts with ease.
With intuitive resizing functionality, users can adjust the size of each pane effortlessly. This component provides a responsive and user-friendly interface for organizing and displaying content in a way that best suits the application's needs.

## Installation

```sh
npm install @gfazioli/mantine-split-pane
```
or 

```sh
yarn add @gfazioli/mantine-split-pane
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-split-pane/styles.css';
```

## Usage

```tsx
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split>
      <Split.Pane>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane>
        <Paper withBorder>
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
```



