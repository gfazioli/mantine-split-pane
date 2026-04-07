# Mantine Split Pane Component

<img alt="Mantine Split Pane" src="https://github.com/gfazioli/mantine-split-pane/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-split-pane?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

A Mantine 9 React component for resizable split pane layouts with 7 resizer variants, context-based prop inheritance, responsive orientation, and dynamic pane generation.

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.
> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-split-pane/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Features

- Separate `Split.Pane` (content) and `Split.Resizer` (drag handle) architecture
- 7 resizer variants: `default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`
- Initial sizes in pixels or percentages with min/max constraints
- `grow` property to let specific panes expand to fill available space
- Horizontal and vertical orientation, including responsive breakpoints
- Context-based prop inheritance: resizer props set on `Split` cascade to all children
- Per-resizer overrides for full control
- Snap points for common pane sizes during drag and keyboard resizing
- `autoResizers` mode to automatically insert resizers between panes
- `Split.Dynamic` helper to generate panes from a configuration array
- Resize lifecycle events (`onResizeStart`, `onResizing`, `onResizeEnd`) on both pane and resizer
- Keyboard accessible: focusable resizer with configurable `step` and `shiftStep`
- Container resize tracking with drag ratio preservation

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

      <Split.Resizer />

      <Split.Pane>
        <Paper withBorder>
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
```

### Auto Resizers

Use the `autoResizers` prop to automatically insert resizers between panes:

```tsx
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split autoResizers>
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

      <Split.Pane>
        <Paper withBorder>
          <h1>Pane 3</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
```

### Snap Points

Use `snapPoints` and `snapTolerance` to snap a resizer to common pane sizes in pixels while dragging or using the keyboard:

```tsx
import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  return (
    <Split autoResizers snapPoints={[200, 400, 600]} snapTolerance={20}>
      <Split.Pane initialWidth={240}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 1</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane initialWidth={320}>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 2</h1>
        </Paper>
      </Split.Pane>

      <Split.Pane grow>
        <Paper withBorder w="100%" mih="100%">
          <h1>Pane 3</h1>
        </Paper>
      </Split.Pane>
    </Split>
  );
}
```

`snapPoints` and `snapTolerance` are also available on `Split.Resizer` for per-divider overrides. With `autoResizers`, the generated resizers inherit these values from `Split`.

### Dynamic Panes

You can also use `Split.Dynamic` to create panes from a configuration array:

```tsx
import { Split, PaneConfig } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';

function Demo() {
  const panes: PaneConfig[] = [
    {
      id: 'sidebar',
      initialWidth: 200,
      minWidth: 150,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Sidebar</h1>
        </Paper>
      ),
    },
    {
      id: 'main',
      grow: true,
      content: (
        <Paper withBorder w="100%" h="100%">
          <h1>Main Content</h1>
        </Paper>
      ),
    },
  ];

  return (
    <Split>
      {Split.Dynamic({ panes })}
    </Split>
  );
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long-term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up-to-date, and growing for everyone.

---
https://github.com/user-attachments/assets/2e45af2b-60c7-4cb3-9b9a-6cf0e710af1c

---
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-split-pane&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-split-pane&Timeline)
