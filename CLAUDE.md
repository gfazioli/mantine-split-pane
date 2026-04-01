# CLAUDE.md

## Project
**@gfazioli/mantine-split-pane** — A Mantine 9 React component library providing resizable split pane layouts with 7 resizer variants, context-based prop inheritance, responsive orientation, and dynamic pane generation.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run ESLint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API (props, types, exports), always run `yarn clean && yarn build` before `yarn test`, because `yarn docgen` needs the fresh build output.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
```
package/src/
├── Split.tsx                    # Root factory component (orientation, context provider)
├── Split.context.ts             # SplitContextProvider — cascades resizer props
├── Split.module.css             # Root container styles
├── Split.errors.ts              # Error definitions
├── Split.test.tsx               # Component tests
├── Split.story.tsx              # Storybook stories
├── types.ts                     # Shared type definitions
├── index.ts                     # Public exports
├── Pane/
│   ├── SplitPane.tsx            # Pane component (sizing constraints, imperative ref)
│   ├── SplitPane.module.css
│   ├── SplitPane.story.tsx
│   └── index.ts
├── Resizer/
│   ├── SplitResizer.tsx         # Draggable/keyboard-navigable divider (7 variants)
│   ├── SplitResizer.module.css
│   ├── SplitResizer.story.tsx
│   └── index.ts
├── Dynamic/
│   ├── SplitDynamic.tsx         # Helper function to generate Pane+Resizer from config
│   └── index.ts
└── hooks/
    ├── use-split-resizer-orientation.ts  # Responsive orientation hook
    └── use-responsive-value.ts           # Generic responsive value hook
```

**Component Hierarchy:** `Split` (container) -> `Split.Pane` (content) + `Split.Resizer` (drag handle between panes)

### Build Pipeline
Rollup bundles to dual ESM (`dist/esm/`) and CJS (`dist/cjs/`) with `'use client'` banner. CSS modules are hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS is split into `styles.css` and `styles.layer.css` (layered version).

## Component Details

### Components

- **Split** (`Split.tsx`) — Factory component that manages orientation (vertical/horizontal, supports responsive breakpoints). Provides `SplitContextProvider` to cascade resizer props to all child resizers.
- **Split.Pane** (`Pane/SplitPane.tsx`) — Pane with sizing constraints (`initialWidth/Height`, `min/max`, `grow`). Exposes imperative handlers via ref (`resetInitialSize`, `getMinWidth`, etc.).
- **Split.Resizer** (`Resizer/SplitResizer.tsx`) — Draggable/keyboard-navigable divider with 7 variants: `default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`. Inherits props from parent Split context but can override per-instance.
- **Split.Dynamic** (`Dynamic/SplitDynamic.tsx`) — Helper function (not a component) that generates Pane+Resizer arrays from a `PaneConfig[]` array.

### Key Patterns

1. **Mantine Factory Pattern** — All components use `factory<T>()` with `XFactory` types defining `props`, `ref`, `stylesNames`, `vars`. CSS variables use `varsResolver`.
2. **Context-based Prop Inheritance** (`Split.context.ts`) — Resizer props set on `<Split>` cascade to all `<Split.Resizer>` children; individual resizers can override.
3. **Responsive Orientation** (`hooks/use-split-resizer-orientation.ts`) — `orientation` accepts a string or Mantine breakpoint object: `{ base: 'horizontal', sm: 'vertical' }`.
4. **Dynamic Panes** — When conditionally rendering panes, always use unique `key` props on both Pane and Resizer elements.
5. **CSS Variables** — Follow the pattern `--split-{component}-{property}` (e.g., `--split-resizer-size`).

### Resizer Variants

All 7 resizer variants must be listed wherever variant options appear in demos or configurators: `default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`.

### Adding a Resizer Prop

1. Add to `SplitResizerContextProps` in `package/src/Resizer/SplitResizer.tsx`
2. Update `defaultProps` in the same file
3. Add CSS variable to `varsResolver` if styling-related
4. Update context in `package/src/Split.context.ts` only if the prop is NOT already in `SplitResizerContextProps` (e.g., `variant` is added separately because it flows through the factory system)
5. Destructure and pass through in `Split.tsx` (props + context provider value)
6. Run `yarn docgen` to regenerate API docs

### Docs Demos

Each demo in `docs/demos/` exports a `MantineDemo` object consumed by `docs/docs.mdx`. Key points:

- **Configurator demos** have a `controls` array with `initialValue` / `libraryValue` — these must match the actual component defaults in `SplitResizer.tsx:defaultProps`
- **Code strings** (the `const code` template literals) are displayed to users as copyable examples — they must stay in sync with the actual component code above them
- All 7 resizer variants must be listed wherever variant options appear

## Testing
Jest with `jsdom` environment, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Component tests use `@mantine-tests/core` render helper. Tests live alongside components in `package/src/`.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
