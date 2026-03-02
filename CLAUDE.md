# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**@gfazioli/mantine-split-pane** — A Mantine-based React component library providing resizable split pane layouts. Current version in `package/package.json`.

## Commands

```bash
yarn dev              # Docs dev server on port 9281
yarn storybook        # Storybook on port 8271
yarn build            # Rollup → ESM + CJS + types + CSS (output: package/dist/)
yarn clean            # Remove package/dist
yarn test             # Full suite: syncpack → prettier → typecheck → lint → jest
yarn jest             # Unit tests only (jest)
yarn jest --testPathPattern=Split.test  # Run a single test file
yarn docgen           # Generate docs/docgen.json from TypeScript types
yarn lint             # ESLint + StyleLint
yarn prettier:write   # Auto-fix formatting
yarn docs:deploy      # Build and deploy docs to GitHub Pages
yarn release:patch    # Bump version, publish to npm, deploy docs
```

## Architecture

### Component Hierarchy

`Split` (container) → `Split.Pane` (content) + `Split.Resizer` (drag handle between panes)

- **Split** (`package/src/Split.tsx`) — Factory component that manages orientation (vertical/horizontal, supports responsive breakpoints). Provides `SplitContextProvider` to cascade resizer props to all child resizers.
- **Split.Pane** (`package/src/Pane/SplitPane.tsx`) — Pane with sizing constraints (`initialWidth/Height`, `min/max`, `grow`). Exposes imperative handlers via ref (`resetInitialSize`, `getMinWidth`, etc.).
- **Split.Resizer** (`package/src/Resizer/SplitResizer.tsx`) — Draggable/keyboard-navigable divider with variants (`default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`). Inherits props from parent Split context but can override per-instance.
- **Split.Dynamic** (`package/src/Dynamic/`) — Helper function (not a component) that generates Pane+Resizer arrays from a `PaneConfig[]` array.

### Key Patterns

1. **Mantine Factory Pattern** — All components use `factory<T>()` with `XFactory` types defining `props`, `ref`, `stylesNames`, `vars`. CSS variables use `varsResolver`.
2. **Context-based Prop Inheritance** (`package/src/Split.context.ts`) — Resizer props set on `<Split>` cascade to all `<Split.Resizer>` children; individual resizers can override.
3. **Responsive Orientation** (`package/src/hooks/use-split-resizer-orientation.ts`) — `orientation` accepts a string or Mantine breakpoint object: `{ base: 'horizontal', sm: 'vertical' }`.
4. **Dynamic Panes** — When conditionally rendering panes, always use unique `key` props on both Pane and Resizer elements.

### Build Pipeline

1. Rollup (`rollup.config.mjs`) → ESM (.mjs) + CJS (.cjs) with source maps
2. `scripts/generate-dts.ts` → TypeScript declarations
3. `scripts/prepare-css.ts` → `styles.css` + `styles.layer.css`
4. CSS Modules scoped with `hash-css-selector` (prefix `me`)

### Workspace Layout

- `package/` — npm package source and build output
- `docs/` — Next.js 15 documentation site with interactive demos (`docs/demos/`)
- `scripts/` — Release, docgen, and build automation

## Code Conventions

- **English only** for all code, comments, commit messages, and docs
- Components: `PascalCase.tsx`, Styles: `ComponentName.module.css`, Hooks: `use-kebab-case.ts`
- CSS variables: `--split-{component}-{property}` (e.g., `--split-resizer-size`)
- Props extend `BoxProps` + `StylesApiProps<TFactory>` from Mantine
- Tests use `@mantine-tests/core` for rendering, live alongside components in `package/src/`
- JSDoc on all public interfaces, exported types, and non-trivial internal functions — always in English

## Docs Demos

Each demo in `docs/demos/` exports a `MantineDemo` object consumed by `docs/docs.mdx`. Key points:

- **Configurator demos** have a `controls` array with `initialValue` / `libraryValue` — these must match the actual component defaults in `SplitResizer.tsx:defaultProps`
- **Code strings** (the `const code` template literals) are displayed to users as copyable examples — they must stay in sync with the actual component code above them
- All 7 resizer variants must be listed wherever variant options appear: `default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`

## Adding a Resizer Prop

1. Add to `SplitResizerContextProps` in `package/src/Resizer/SplitResizer.tsx`
2. Update `defaultProps` in the same file
3. Add CSS variable to `varsResolver` if styling-related
4. Update context in `package/src/Split.context.ts` only if the prop is NOT already in `SplitResizerContextProps` (e.g., `variant` is added separately because it flows through the factory system)
5. Destructure and pass through in `Split.tsx` (props + context provider value)
6. Run `yarn docgen` to regenerate API docs
