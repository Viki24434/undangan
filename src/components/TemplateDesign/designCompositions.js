import { availableComponents } from './componentVariants';

export const DESIGN_COMPOSITIONS = [
  {
    id: 'editorial',
    name: 'Surat editorial',
    description: 'Kartu pos, foto besar, dan profil ringkas.',
    components: {
      cover: 4,
      hero: 4,
      intro: 2,
      couple: 4,
      story: 3,
      countdown: 4,
      gallery: 5,
      gift: 3,
      wishes: 3,
      closing: 3,
    },
  },
  {
    id: 'album',
    name: 'Album kenangan',
    description: 'Foto pembuka, galeri geser, dan penutup personal.',
    components: {
      cover: 1,
      hero: 4,
      intro: 3,
      couple: 2,
      story: 3,
      countdown: 4,
      gallery: 5,
      gift: 3,
      wishes: 3,
      closing: 2,
    },
  },
  {
    id: 'classic',
    name: 'Klasik romantis',
    description: 'Bingkai lengkung, cerita bertahap, dan galeri rapi.',
    components: {
      cover: 2,
      hero: 2,
      intro: 1,
      couple: 3,
      story: 2,
      countdown: 2,
      gallery: 2,
      gift: 2,
      wishes: 2,
      closing: 1,
    },
  },
  {
    id: 'celebration',
    name: 'Perayaan ceria',
    description: 'Kartu foto, hitung mundur tiket, dan pesan hangat.',
    components: {
      cover: 4,
      hero: 1,
      intro: 3,
      couple: 1,
      story: 1,
      countdown: 4,
      gallery: 5,
      gift: 3,
      wishes: 3,
      closing: 2,
    },
  },
];

export function compositionValues(preset, metadata) {
  const fields = availableComponents(metadata);
  return Object.fromEntries(
    fields.flatMap((field) => {
      const value = preset.components[field.key];
      return field.options.some(([option]) => option === value)
        ? [[field.key, value]]
        : [];
    }),
  );
}
