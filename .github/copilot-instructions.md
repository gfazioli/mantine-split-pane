# Mantine Split Pane - AI Coding Agent Instructions

## Project Overview

This is **@gfazioli/mantine-split-pane**, a React component library built on [Mantine v7+](https://mantine.dev) that provides flexible, resizable split pane layouts. The architecture separates pane content (`Split.Pane`) from resizing controls (`Split.Resizer`), making the resizer a first-class, customizable element.

## Architecture

### Component Structure
- **`Split`** - Main container component (factory pattern)
  - Provides context via `SplitContextProvider`
  - Manages orientation (vertical/horizontal, with responsive breakpoints)
  - Passes default props to all child Resizers
- **`Split.Pane`** - Content container with sizing constraints
  - Supports `initialWidth/Height`, `minWidth/Height`, `maxWidth/Height`
  - `grow` prop fills available space
  - Exposes resize events: `onResizeStart`, `onResizing`, `onResizeEnd`
  - Uses `forwardRef` to expose imperative handlers
- **`Split.Resizer`** - Interactive resize control
  - Positioned **between** panes (not inside them)
  - Variants: `default`, `filled`, `outline`, `transparent`, `gradient`, `dotted`, `dashed`
  - Supports keyboard navigation with `step`/`shiftStep` for accessibility
  - Can override parent `Split` props per instance

### Key Patterns

1. **React Context for Props Inheritance**
   - Global resizer props set on `<Split>` cascade to all `<Split.Resizer>` children
   - Individual resizers can override specific props
   - See [Split.context.ts](package/src/Split.context.ts)

2. **Factory Pattern (Mantine's Approach)**
   - All components use `factory<T>()` from `@mantine/core`
   - Type definitions follow `XFactory` convention with `props`, `ref`, `stylesNames`, `vars`
   - CSS variables defined via `varsResolver` functions

3. **Responsive Orientation**
   - `orientation` accepts string or breakpoint object: `{ base: 'horizontal', sm: 'vertical' }`
   - Uses `useSplitResizerOrientation` hook wrapping Mantine's `useMatches`

4. **Dynamic Child Rendering with Keys**
   - When conditionally rendering panes, **always use unique `key` props** on both `Split.Pane` and `Split.Resizer`
   - For dynamic layouts, build element arrays with proper keys before rendering
   - See `AnotherConditionalRender` and `ImprovedConditionalRender` in [Split.story.tsx](package/src/Split.story.tsx) for examples

## Development Workflow

### Monorepo Structure
- **`package/`** - Source code and publishable package
  - `src/` - Component source
  - `dist/` - Build output (ESM + CJS)
- **`docs/`** - Next.js documentation site (port 9281)
- **`scripts/`** - Build automation and release tooling

### Common Commands
```bash
# Development
yarn dev              # Start docs dev server on port 9281
yarn storybook        # Storybook on port 8271

# Building
yarn clean            # Remove package/dist
yarn build            # Rollup → ESM + CJS + types + CSS

# Testing
yarn test             # Syncpack + Prettier + TypeCheck + Lint + Jest
yarn jest             # Unit tests with @mantine-tests/core

# Release (major/minor/patch)
yarn release:patch    # Bump version, build, publish to npm, deploy docs
```

### Build Pipeline
1. **Rollup** ([rollup.config.mjs](rollup.config.mjs)) - Dual ESM/CJS output with source maps
2. **PostCSS** - CSS modules with scoped class names (hash-css-selector)
3. **TypeScript** - Generated via custom `scripts/generate-dts.ts` (not tsc)
4. **CSS Preparation** - `scripts/prepare-css.ts` handles layer variants

### Documentation Generation
- Run `yarn docgen` to generate [docs/docgen.json](docs/docgen.json) from TypeScript types
- Props tables in docs are auto-generated from this file

## Code Conventions

### Language
- **Always use English** for all code, comments, documentation, commit messages, and PR descriptions
- Variable names, function names, types, and interfaces must be in English
- Code comments and JSDoc must be in English
- Storybook stories and demos must use English

### File Naming
- Components: `PascalCase.tsx` (e.g., `Split.tsx`, `SplitPane.tsx`)
- Styles: `ComponentName.module.css`
- Hooks: `use-kebab-case.ts`
- Types: Co-located with components

### TypeScript Patterns
- Export types separately: `export type SplitProps`, `export type SplitFactory`
- Props interfaces extend `BoxProps` from Mantine for style props
- Use `StylesApiProps<TFactory>` for themeable components
- Refs combine element type with custom handlers: `HTMLDivElement & SplitPaneHandlers`

### CSS Modules
- Use CSS custom properties (CSS variables) for theming
- Variable naming: `--split-{component}-{property}` (e.g., `--split-resizer-size`)
- Scoped class names generated via `hash-css-selector` with prefix 'me'

### Testing
- Use `@mantine-tests/core` for rendering
- Keep tests focused on rendering and prop validation
- Tests in `package/src/` alongside components

## Storybook Examples

When creating conditional/dynamic pane layouts:
- **Bad**: Wrapping resizer + pane in `.map()` without keys → React warnings
- **Good**: Use `flatMap()` or build element array with unique keys for all elements
- **Best**: Separate data (array of pane configs) from rendering logic

Example from [Split.story.tsx](package/src/Split.story.tsx#L874):
```tsx
const panes = [
  { id: 'paperA', position: paperAPosition, element: <PaperA /> },
  { id: 'paperB', position: paperBPosition, element: <PaperB /> }
];
// Filter, then build element array with resizers
leftPanes.forEach(pane => {
  elements.push(
    <Split.Pane key={pane.id}>{pane.element}</Split.Pane>,
    <Split.Resizer key={`resizer-after-${pane.id}`} />
  );
});
```

## Publishing

Release process is automated via [scripts/release.ts](scripts/release.ts):
1. Pulls latest changes and checks git status is clean
2. Increments version (major/minor/patch)
3. Rebuilds package
4. Copies README, LICENSE, CODE_OF_CONDUCT, CONTRIBUTING to `package/`
5. Publishes to npm with `--access public`
6. Creates git tag and GitHub release
7. Deploys docs via `gh-pages`

Version in `package/package.json` is the source of truth (currently 2.5.9).

## Common Tasks

### Adding a new prop to Split.Resizer
1. Add to `SplitResizerContextProps` interface in [Resizer/SplitResizer.tsx](package/src/Resizer/SplitResizer.tsx)
2. Update `defaultProps` object
3. Add CSS variable to `varsResolver` if styling-related
4. Update context in [Split.context.ts](package/src/Split.context.ts) if it should cascade
5. Run `yarn docgen` to update documentation

### Creating a new story
- Add to [package/src/Split.story.tsx](package/src/Split.story.tsx)
- Export function matching story name
- Use descriptive names that explain the feature being demonstrated
- Include comments for complex patterns

### Debugging responsive orientation
- Check `useSplitResizerOrientation` hook in [hooks/use-split-resizer-orientation.ts](package/src/hooks/use-split-resizer-orientation.ts)
- Mantine's `useMatches` resolves breakpoint objects
- Default orientation is `'vertical'`

## External Dependencies

- **Mantine v7+** (peer dependency) - Core UI framework
- **React 18/19** (peer dependency)
- **Rollup** - Bundling (ESM + CJS)
- **PostCSS** - CSS processing
- **Next.js 15** - Documentation site
- **Storybook 8** - Component development

## Accessibility

- Resizer is keyboard navigable (focusable `UnstyledButton`)
- Arrow keys resize with `step` increment (default configurable per component)
- Shift+Arrow uses `shiftStep` for larger jumps
- Double-click resizer triggers `onDoubleClick` (can reset to initial size)
