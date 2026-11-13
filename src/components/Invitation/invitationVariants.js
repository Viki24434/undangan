import { lazy } from 'react';

const loaders = {
  cover: {
    1: () => import('../Cover/Cover1/Cover1'),
    2: () => import('../Cover/Cover2/Cover2'),
    3: () => import('../Cover/PlatinumCover1/PlatinumCover1'),
    4: () => import('../Cover/Cover4/Cover4'),
  },
  hero: {
    1: () => import('../Hero/Hero1/Hero1'),
    2: () => import('../Hero/Hero2/Hero2'),
    3: () => import('../Hero/PlatinumHero1/PlatinumHero1'),
    4: () => import('../Hero/Hero4/Hero4'),
  },
  couple: {
    1: () => import('../Couple/Couple1/Couple1'),
    2: () => import('../Couple/Couple2/Couple2'),
    3: () => import('../Couple/Couple3/Couple3'),
    4: () => import('../Couple/Couple4/Couple4'),
  },
  story: {
    1: () => import('../Story/Story1/Story1'),
    2: () => import('../Story/Story2/Story2'),
    3: () => import('../Story/Story3/Story3'),
  },
  countdown: {
    1: () => import('../Countdown/Countdown1/Countdown1'),
    2: () => import('../Countdown/Countdown2/Countdown2'),
    3: () => import('../Countdown/Countdown3/Countdown3'),
    4: () => import('../Countdown/Countdown4/Countdown4'),
  },
  gallery: {
    0: () => import('./InvitationGallery'),
    1: () => import('../Gallery/Gallery1/Gallery1'),
    2: () => import('../Gallery/Gallery2/Gallery2'),
    3: () => import('../Gallery/Gallery3/Gallery3'),
    4: () => import('../Gallery/Gallery4/Gallery4'),
    5: () => import('../Gallery/Gallery5/Gallery5'),
  },
  gift: {
    1: () => import('../Gift/Gift1/Gift1'),
    2: () => import('../Gift/Gift2/Gift2'),
    3: () => import('../Gift/Gift3/Gift3'),
  },
  wishes: {
    1: () => import('../Wishes/Wishes1/Wishes1'),
    2: () => import('../Wishes/Wishes2/Wishes2'),
    3: () => import('../Wishes/Wishes3/Wishes3'),
  },
  intro: {
    1: () => import('../Intro/Intro1/Intro1'),
    2: () => import('../Intro/Intro2/Intro2'),
    3: () => import('../Intro/Intro3/Intro3'),
  },
  closing: {
    1: () => import('../Closing/Closing1/Closing1'),
    2: () => import('../Closing/Closing2/Closing2'),
    3: () => import('../Closing/Closing3/Closing3'),
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
      : ['cover', 'hero', 'intro', 'countdown', 'gallery', 'wishes', 'closing'];
  return Promise.all(
    groups.map((group) => {
      const fallback = ['intro', 'closing'].includes(group)
        ? 1
        : group === 'gallery' && kind === 'celebration'
          ? 0
          : 2;
      return loaders[group][components[group] ?? fallback]?.();
    }),
  );
}
