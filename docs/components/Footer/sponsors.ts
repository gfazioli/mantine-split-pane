export interface Sponsor {
  key: string;
  name: string;
  /** GitHub username — the avatar is resolved as https://github.com/<github>.png */
  github: string;
  /** Optional website to link instead of the GitHub profile */
  href?: string;
}

/**
 * Current GitHub sponsors, shown in the docs footer sponsors wall.
 * Add new sponsors here — the change propagates to every component repo
 * through the usual template propagation flow.
 */
export const sponsors: Sponsor[] = [{ key: 'kastov', name: 'kastov', github: 'kastov' }];
