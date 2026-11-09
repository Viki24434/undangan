import { lazy } from 'react';

const loaders = {
  cover: {
    1: () => import('../Cover/Cover1/Cover1'),
    2: () => import('../Cover/Cover2/Cover2'),
    3: () => import('../Cover/PlatinumCover1/PlatinumCover1'),
  },
  hero: {
    1: () => import('../Hero/Hero1/Hero1'),
    2: () => import('../Hero/Hero2/Hero2'),
    3: () => import('../Hero/PlatinumHero1/PlatinumHero1'),
  },
  couple: {
    1: () => import('../Couple/Couple1/Couple1'),
    2: () => import('../Couple/Couple2/Couple2'),
    3: () => import('../Couple/Couple3/Couple3'),
  },
  story: {
    1: () => import('../Story/Story1/Story1'),
    2: () => import('../Story/Story2/Story2'),
  },
  countdown: {
    1: () => import('../Countdown/Countdown1/Countdown1'),
    2: () => import('../Countdown/Countdown2/Countdown2'),
    3: () => import('../Countdown/Countdown3/Countdown3'),
  },
  gallery: {
    0: () => import('./InvitationGallery'),
    1: () => import('../Gallery/Gallery1/Gallery1'),
    2: () => import('../Gallery/Gallery2/Gallery2'),
    3: () => import('../Gallery/Gallery3/Gallery3'),
    4: () => import('../Gallery/Gallery4/Gallery4'),
  },
  gift: {
    1: () => import('../Gift/Gift1/Gift1'),
    2: () => import('../Gift/Gift2/Gift2'),
  },
  wishes: {
    1: () => import('../Wishes/Wishes1/Wishes1'),
    2: () => import('../Wishes/Wishes2/Wishes2'),
  },
};

export const invitationVariants = Object.fromEntries(
  Object.entries(loaders).map(([group, variants]) => [
    group,
    Object.fromEntries(
      Object.entries(variants).map(([value, load]) => [value, lazy(load)]),
    ),
  ]),
);

export function preloadVariants(kind, components) {
  const groups =
    kind === 'wedding'
      ? Object.keys(loaders)
      : ['cover', 'hero', 'countdown', 'gallery', 'wishes'];
  return Promise.all(
    groups.map((group) => {
      const fallback = group === 'gallery' && kind === 'celebration' ? 0 : 2;
      return loaders[group][components[group] ?? fallback]?.();
    }),
  );
}
