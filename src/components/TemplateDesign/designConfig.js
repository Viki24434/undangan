export const DESIGN_SECTIONS = [
  {
    id: 'cover',
    label: 'Cover',
    selector: '.invitation-cover, .cover-1-wrapper',
  },
  {
    id: 'hero',
    label: 'Hero',
    selector: '.invitation-hero, .hero-1-container',
  },
  {
    id: 'intro',
    label: 'Pembuka',
    selector: '.platinum-chapter--intro, #invitation-intro',
  },
  {
    id: 'couple',
    label: 'Mempelai',
    selector:
      '.platinum-chapter--couple, .couple-1-container, .couple-1, .couple-2, .couple-3, .couple-4',
  },
  {
    id: 'story',
    label: 'Cerita',
    selector:
      '.platinum-chapter--story, .story-1-container, .story-2, .story-3',
  },
  {
    id: 'events',
    label: 'Acara & countdown',
    selector: '.platinum-chapter--events, #invitation-events',
  },
  {
    id: 'gallery',
    label: 'Galeri',
    selector: '.platinum-chapter--gallery, #invitation-gallery',
  },
  {
    id: 'wishes',
    label: 'Ucapan',
    selector: '.platinum-chapter--wishes, #invitation-wishes',
  },
  {
    id: 'gift',
    label: 'Hadiah',
    selector: '.platinum-chapter--gift, .gift-1-container, .gift-2, .gift-3',
  },
  {
    id: 'closing',
    label: 'Penutup',
    selector: '.platinum-chapter--closing, .invitation-closing',
  },
  {
    id: 'photos',
    label: 'Foto pembuka',
    selector: '.platinum-chapter--photos, #invitation-portraits',
  },
  {
    id: 'agenda',
    label: 'Susunan acara',
    selector: '.platinum-chapter--agenda, .invitation-agenda',
  },
  {
    id: 'video',
    label: 'Video',
    selector: '.platinum-chapter--video, .invitation-video',
  },
  {
    id: 'prayers',
    label: 'Doa',
    selector: '.platinum-chapter--prayers, .invitation-prayers',
  },
  {
    id: 'guide',
    label: 'Panduan tamu',
    selector: '.platinum-chapter--guide, .invitation-guide',
  },
];

export const DESIGN_ENTRIES = [
  ['inherit', 'Bawaan template'],
  ['none', 'Tanpa animasi'],
  ['fade', 'Muncul perlahan'],
  ['left', 'Masuk dari kiri'],
  ['right', 'Masuk dari kanan'],
  ['rise', 'Tumbuh dari bawah'],
  ['zoom', 'Membesar lembut'],
  ['type', 'Terbuka bertahap'],
];
export const DESIGN_MOTIONS = [
  ['inherit', 'Bawaan template'],
  ['none', 'Diam'],
  ['sway', 'Ayunan daun'],
  ['float', 'Melayang lembut'],
  ['pulse', 'Bernapas'],
  ['spin', 'Berputar'],
  ['flutter', 'Daun tertiup angin'],
];

export const createDesign = () => ({ version: 1, sections: {}, native: {} });
export const NATIVE_SELECTOR =
  '.decoration-layer__item, .champagne-scenery__layer, .platinum-chapter__art, .hero-2__bottom-ornament, [data-design-ornament]';

export function newDesignLayer(asset, src) {
  return {
    id: crypto.randomUUID(),
    ...(asset ? { asset } : { src }),
    label: asset || 'Ornamen unggahan',
    x: 0,
    y: 0,
    width: 35,
    rotate: 0,
    opacity: 1,
    zIndex: 5,
    flipX: false,
    flipY: false,
    hidden: false,
    entry: 'fade',
    motion: 'none',
    duration: 6,
    delay: 0,
    entryDuration: 1,
  };
}

export function entryFrames(effect, opacity = 1) {
  const final = {
    opacity,
    translate: '0 0',
    scale: '1',
    clipPath: 'inset(0 0 0 0)',
  };
  const first = {
    fade: { opacity: 0 },
    left: { opacity: 0, translate: '-45px 0' },
    right: { opacity: 0, translate: '45px 0' },
    rise: { opacity: 0, translate: '0 45px' },
    zoom: { opacity: 0, scale: '0.75' },
    type: { clipPath: 'inset(0 100% 0 0)' },
  }[effect];
  return first ? [first, final] : null;
}
