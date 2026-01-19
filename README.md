# Mantine Split Pane Component

<img alt="Mantine Split Pane" src="https://github.com/gfazioli/mantine-split-pane/blob/master/logo.png" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-split-pane?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-split-pane)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-split-pane?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.


[Mantine Split](https://gfazioli.github.io/mantine-split-pane/) extension for building flexible, resizable layouts composed of multiple panes. In v2, the architecture separates pane content (Split.Pane) from the resizing control (Split.Resizer), making the resizer a first-class, customizable element placed between panes. 

Developers can define initial sizes in pixels or percentages, enforce min/max constraints, and use the grow property to let specific panes expand to fill available space. Orientation supports horizontal and vertical layouts, including responsive breakpoints, while the resizer can inherit global props from Split or be configured per instance, including a gradient variant with hover styles. 

The component exposes resize lifecycle events on both the pane and resizer—delivering current width/height for one or both adjacent panes—enabling persistence of layouts via localStorage and real‑time UI feedback. Accessibility is built in: the resizer is focusable and supports keyboard resizing with configurable step and shiftStep values. Overall, it offers a clear JSX structure and a robust API for multi‑pane, highly controllable split views in Mantine applications.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-split-pane/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

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
## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
https://github.com/user-attachments/assets/2e45af2b-60c7-4cb3-9b9a-6cf0e710af1c

---
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-split-pane&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-split-pane&Timeline)
