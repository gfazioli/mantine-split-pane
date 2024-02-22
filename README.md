# Mantine Split pane Component

<p align="center">

</p>

---

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@gfazioli/mantine-split-pane">
    <img alt="NPM version" src="https://img.shields.io/npm/v/%40gfazioli%2Fmantine-split-pane?style=for-the-badge">
  </a>
  
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@gfazioli/mantine-split-pane">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-split-pane?style=for-the-badge">
  </a>

  <img alt="NPM License" src="https://img.shields.io/npm/l/%40gfazioli%2Fmantine-split-pane?style=for-the-badge">

</p>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
This React component, utilizing Mantine UI, enables users to create a flexible layout with resizable split panes. It supports both vertical and horizontal splitting, allowing the arrangement of content in various configurations. The component seamlessly handles nested split panes, enabling complex layouts with ease.
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

function Demo() {
  return (
    <Split>
      <div><h1>Left pane</h1></div>
      <div><h1>Right pane</h1></div>
    </Split>
  );
}
```


## Props


