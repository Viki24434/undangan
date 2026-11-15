import { ornamentAssets } from '../Ornament/ornamentAssets';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import { platinumScenes } from '../../config/platinumScenes';

export function openingImages(
  { theme, image, images = [], variants = {} },
  design,
) {
  const sources = new Set();
  function collect(value) {
    if (typeof value === 'string') {
      const source = ornamentAssets[value]?.src || value;
      if (/^(https?:\/\/|\/|blob:|data:image\/)/.test(source))
        sources.add(source);
    } else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object' && !value.hidden)
      Object.values(value).forEach(collect);
  }
  collect([image, images]);
  const preset = ornamentPresets[theme] || {};
  for (const key of [
    'cover',
    'hero',
    'envelope',
    'envelopeFlap',
    'paperTexture',
    'waxSeal',
    'background',
  ])
    collect(preset[key]);
  const scene =
    platinumScenes[theme] ||
    (variants.hero === 3
      ? platinumScenes['invitation-platinum-champagne']
      : null);
  if (scene && (variants.hero === 3 || variants.experience === 'platinum')) {
    for (const [, name] of scene.layers) collect(`${scene.family}-${name}`);
    collect(scene.chapterAssets);
  }
  for (const section of ['cover', 'hero']) {
    for (const item of design?.sections?.[section]?.items || []) {
      if (!item.hidden) collect([item.asset, item.src]);
    }
  }
  for (const [key, value] of Object.entries(design?.native || {})) {
    if (/^(cover|hero):/.test(key) && !value.hidden)
      collect([value.asset, value.src]);
  }
  return [...sources].sort();
}

export function loadOpeningImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    let finished = false;
    const timeout = window.setTimeout(
      () => finish(new Error('Gambar belum selesai dimuat.')),
      20000,
    );
    function finish(error) {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      if (error) reject(error);
      else resolve();
    }
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        if (!image.naturalWidth) throw new Error('Gambar tidak valid.');
        finish();
      } catch (error) {
        finish(error);
      }
    };
    image.onerror = () => finish(new Error('Gambar belum dapat dimuat.'));
    image.src = source;
  });
}
