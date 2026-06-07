/**
 * Mantine Extensions components, split into the same four categories used by the
 * Mantine Extensions Hub (https://mantine-extensions.vercel.app):
 * Layout, Data display, Inputs & Navigation, Effects & Animations.
 */

export interface MantineComponentLink {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
}

export const mantineComponentsLayout: MantineComponentLink[] = [
  {
    key: 'scene',
    title: 'Scene',
    href: 'https://gfazioli.github.io/mantine-scene',
    newWindow: true,
  },
  {
    key: 'split-pane',
    title: 'Split Pane',
    href: 'https://gfazioli.github.io/mantine-split-pane',
    newWindow: true,
  },
  {
    key: 'window',
    title: 'Window',
    href: 'https://gfazioli.github.io/mantine-window',
    newWindow: true,
  },
];

export const mantineComponentsDataDisplay: MantineComponentLink[] = [
  {
    key: 'audio',
    title: 'Audio',
    href: 'https://gfazioli.github.io/mantine-audio',
    newWindow: true,
  },
  {
    key: 'book',
    title: 'Book',
    href: 'https://gfazioli.github.io/mantine-book',
    newWindow: true,
    new: true,
  },
  {
    key: 'clock',
    title: 'Clock',
    href: 'https://gfazioli.github.io/mantine-clock',
    newWindow: true,
  },
  {
    key: 'compare',
    title: 'Compare',
    href: 'https://gfazioli.github.io/mantine-compare',
    newWindow: true,
  },
  {
    key: 'json-tree',
    title: 'JSON Tree',
    href: 'https://gfazioli.github.io/mantine-json-tree',
    newWindow: true,
  },
  { key: 'led', title: 'LED', href: 'https://gfazioli.github.io/mantine-led', newWindow: true },
  {
    key: 'list-view-table',
    title: 'List View Table',
    href: 'https://gfazioli.github.io/mantine-list-view-table',
    newWindow: true,
  },
  {
    key: 'qr-code',
    title: 'QR Code',
    href: 'https://gfazioli.github.io/mantine-qr-code',
    newWindow: true,
  },
  {
    key: 'rings-progress',
    title: 'Rings Progress',
    href: 'https://gfazioli.github.io/mantine-rings-progress',
    newWindow: true,
  },
  {
    key: 'video',
    title: 'Video',
    href: 'https://gfazioli.github.io/mantine-video',
    newWindow: true,
  },
];

export const mantineComponentsInputsNavigation: MantineComponentLink[] = [
  {
    key: 'depth-select',
    title: 'Depth Select',
    href: 'https://gfazioli.github.io/mantine-depth-select',
    newWindow: true,
  },
  {
    key: 'lens-select',
    title: 'Lens Select',
    href: 'https://gfazioli.github.io/mantine-lens-select',
    newWindow: true,
  },
  {
    key: 'onboarding-tour',
    title: 'Onboarding Tour',
    href: 'https://gfazioli.github.io/mantine-onboarding-tour',
    newWindow: true,
  },
  {
    key: 'picker',
    title: 'Picker',
    href: 'https://gfazioli.github.io/mantine-picker',
    newWindow: true,
  },
  {
    key: 'select-stepper',
    title: 'Select Stepper',
    href: 'https://gfazioli.github.io/mantine-select-stepper',
    newWindow: true,
  },
];

export const mantineComponentsEffectsAnimations: MantineComponentLink[] = [
  {
    key: 'border-animate',
    title: 'Border Animate',
    href: 'https://gfazioli.github.io/mantine-border-animate',
    newWindow: true,
  },
  { key: 'flip', title: 'Flip', href: 'https://gfazioli.github.io/mantine-flip', newWindow: true },
  {
    key: 'marquee',
    title: 'Marquee',
    href: 'https://gfazioli.github.io/mantine-marquee',
    newWindow: true,
  },
  { key: 'mask', title: 'Mask', href: 'https://gfazioli.github.io/mantine-mask', newWindow: true },
  {
    key: 'parallax',
    title: 'Parallax',
    href: 'https://gfazioli.github.io/mantine-parallax',
    newWindow: true,
  },
  {
    key: 'reflection',
    title: 'Reflection',
    href: 'https://gfazioli.github.io/mantine-reflection',
    newWindow: true,
  },
  {
    key: 'spinner',
    title: 'Spinner',
    href: 'https://gfazioli.github.io/mantine-spinner',
    newWindow: true,
  },
  {
    key: 'text-animate',
    title: 'Text Animate',
    href: 'https://gfazioli.github.io/mantine-text-animate',
    newWindow: true,
  },
];

export const mantineComponentCategories = [
  { key: 'layout', title: 'Layout', links: mantineComponentsLayout },
  { key: 'data-display', title: 'Data display', links: mantineComponentsDataDisplay },
  {
    key: 'inputs-navigation',
    title: 'Inputs & Navigation',
    links: mantineComponentsInputsNavigation,
  },
  {
    key: 'effects-animations',
    title: 'Effects & Animations',
    links: mantineComponentsEffectsAnimations,
  },
] as const;
