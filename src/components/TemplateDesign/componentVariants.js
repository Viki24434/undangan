export const COMPONENT_VARIANTS = [
  {
    key: 'cover',
    label: 'Cover',
    section: 'cover',
    fallback: 2,
    options: [
      [1, 'Cover 1'],
      [2, 'Cover 2'],
      [3, 'Cover 3 · surat & amplop'],
    ],
  },
  {
    key: 'hero',
    label: 'Hero',
    section: 'hero',
    fallback: 2,
    options: [
      [1, 'Hero 1'],
      [2, 'Hero 2'],
      [3, 'Hero 3 · sinematik Platinum'],
    ],
  },
  {
    key: 'couple',
    label: 'Couple / mempelai',
    section: 'couple',
    fallback: 2,
    wedding: true,
    options: [
      [1, 'Couple 1'],
      [2, 'Couple 2'],
      [3, 'Couple 3'],
    ],
  },
  {
    key: 'story',
    label: 'Story / cerita',
    section: 'story',
    fallback: 2,
    wedding: true,
    options: [
      [1, 'Story 1'],
      [2, 'Story 2'],
    ],
  },
  {
    key: 'countdown',
    label: 'Countdown',
    section: 'events',
    fallback: 2,
    options: [
      [1, 'Countdown 1'],
      [2, 'Countdown 2'],
      [3, 'Countdown 3'],
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery / galeri',
    section: 'gallery',
    fallback: 0,
    options: [
      [0, 'Galeri standar'],
      [1, 'Gallery 1'],
      [2, 'Gallery 2'],
      [3, 'Gallery 3'],
      [4, 'Gallery 4 · dengan lightbox'],
    ],
  },
  {
    key: 'gift',
    label: 'Gift / hadiah',
    section: 'gift',
    fallback: 2,
    wedding: true,
    options: [
      [1, 'Gift 1'],
      [2, 'Gift 2'],
    ],
  },
  {
    key: 'wishes',
    label: 'Wishes / ucapan',
    section: 'wishes',
    fallback: 2,
    options: [
      [1, 'Wishes 1'],
      [2, 'Wishes 2'],
    ],
  },
];

export function availableComponents({ wedding, cinematicHero }) {
  return COMPONENT_VARIANTS.filter((item) => !item.wedding || wedding).map(
    (item) => ({
      ...item,
      options: item.options.filter(
        ([value]) => item.key !== 'hero' || value !== 3 || cinematicHero,
      ),
    }),
  );
}
