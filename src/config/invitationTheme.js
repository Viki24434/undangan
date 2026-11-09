import { GRADIENT_KEYS, gradientCss } from './themeGradients';

export const THEME_COLORS = [
  {
    key: 'background',
    label: 'Warna latar',
    variable: '--color-bg',
    fallback: '#f6f1e7',
    group: 'Latar & panel',
  },
  {
    key: 'surface',
    label: 'Warna kartu & panel',
    variable: '--invitation-panel',
    fallback: '#e8e1d4',
    group: 'Latar & panel',
  },
  {
    key: 'paper',
    label: 'Warna kertas & bingkai hero',
    variable: '--platinum-paper',
    fallback: '#fff8e8',
    group: 'Latar & panel',
  },
  {
    key: 'text',
    label: 'Warna teks',
    variable: '--color-text',
    fallback: '#463b31',
    group: 'Teks & aksen',
  },
  {
    key: 'heading',
    label: 'Warna judul & nama',
    variable: '--custom-heading',
    fallbackVariable: '--color-text',
    fallback: '#463b31',
    group: 'Teks & aksen',
  },
  {
    key: 'muted',
    label: 'Warna teks sekunder',
    variable: '--invitation-muted',
    fallback: '#7e7164',
    group: 'Teks & aksen',
  },
  {
    key: 'accent',
    label: 'Warna aksen',
    variable: '--color-accent',
    fallback: '#bda168',
    group: 'Teks & aksen',
  },
  {
    key: 'border',
    label: 'Warna garis & bingkai',
    variable: '--invitation-line',
    fallback: '#bda168',
    group: 'Teks & aksen',
  },
  {
    key: 'buttonBackground',
    label: 'Warna latar tombol',
    variable: '--custom-button-background',
    fallbackVariable: '--color-accent',
    fallback: '#bda168',
    group: 'Tombol & formulir',
  },
  {
    key: 'buttonText',
    label: 'Warna teks tombol',
    variable: '--invitation-on-accent',
    fallback: '#fffaf0',
    group: 'Tombol & formulir',
  },
  {
    key: 'inputBackground',
    label: 'Warna latar input',
    variable: '--custom-input-background',
    fallbackVariable: '--invitation-panel',
    fallback: '#fffaf0',
    group: 'Tombol & formulir',
  },
  {
    key: 'inputText',
    label: 'Warna teks input',
    variable: '--custom-input-text',
    fallbackVariable: '--color-text',
    fallback: '#463b31',
    group: 'Tombol & formulir',
  },
  {
    key: 'navigation',
    label: 'Warna latar navigasi',
    variable: '--custom-navigation',
    fallbackVariable: '--color-bg',
    fallback: '#f6f1e7',
    group: 'Navigasi & lapisan foto',
  },
  {
    key: 'navigationText',
    label: 'Warna teks navigasi',
    variable: '--custom-navigation-text',
    fallbackVariable: '--color-text',
    fallback: '#463b31',
    group: 'Navigasi & lapisan foto',
  },
  {
    key: 'overlay',
    label: 'Warna lapisan foto',
    variable: '--custom-overlay-color',
    fallback: '#182019',
    group: 'Navigasi & lapisan foto',
  },
];

const kebab = (key) =>
  key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export function themeAttributes(theme = {}) {
  return {
    ...Object.fromEntries(
      THEME_COLORS.filter(
        ({ key }) =>
          theme[key] !== undefined ||
          theme.gradients?.[key] ||
          (key === 'overlay' && theme.overlayOpacity !== undefined),
      ).map(({ key }) => [`data-theme-${kebab(key)}`, 'true']),
    ),
    ...Object.fromEntries(
      Object.keys(theme.gradients || {})
        .filter((key) => GRADIENT_KEYS.includes(key))
        .map((key) => [`data-theme-gradient-${kebab(key)}`, 'true']),
    ),
  };
}

export function themeStyles(theme = {}) {
  const style = {};
  for (const field of THEME_COLORS) {
    if (!/^#[\da-f]{6}$/i.test(theme[field.key] || '')) continue;
    style[field.variable] = theme[field.key];
    style[`--custom-${kebab(field.key)}`] = theme[field.key];
    if (GRADIENT_KEYS.includes(field.key))
      style[`--custom-${kebab(field.key)}-gradient`] =
        `linear-gradient(${theme[field.key]}, ${theme[field.key]})`;
  }
  if (theme.text) style.color = theme.text;
  if (theme.background) style.backgroundColor = theme.background;
  if (theme.surface) {
    style['--adat-panel-start'] = theme.surface;
    style['--adat-panel-end'] = theme.surface;
  }
  if (theme.overlay || theme.overlayOpacity !== undefined) {
    const color = theme.overlay || '#182019';
    const opacity = Math.max(0, Math.min(1, theme.overlayOpacity ?? 0.55));
    const channels = [1, 3, 5].map((offset) =>
      parseInt(color.slice(offset, offset + 2), 16),
    );
    style['--custom-overlay'] = `rgba(${channels.join(', ')}, ${opacity})`;
    style['--color-overlay'] = style['--custom-overlay'];
  }
  for (const key of GRADIENT_KEYS) {
    const gradient = theme.gradients?.[key];
    if (!gradient) continue;
    style[`--custom-${kebab(key)}-gradient`] = gradientCss(
      gradient,
      key === 'overlay' ? (theme.overlayOpacity ?? 0.55) : 1,
    );
    if (key === 'background')
      style.backgroundImage = style['--custom-background-gradient'];
    if (key === 'overlay')
      style['--custom-overlay'] = style['--custom-overlay-gradient'];
  }
  return style;
}

export function themePalette(node) {
  const computed = getComputedStyle(node);
  const context = document.createElement('canvas').getContext('2d');
  const palette = {};
  for (const field of THEME_COLORS) {
    const source =
      computed.getPropertyValue(field.variable).trim() ||
      (field.fallbackVariable &&
        computed.getPropertyValue(field.fallbackVariable).trim()) ||
      field.fallback;
    context.fillStyle = field.fallback;
    context.fillStyle = source;
    const color = context.fillStyle;
    if (/^#[\da-f]{6,8}$/i.test(color)) palette[field.key] = color.slice(0, 7);
    else if (/^#[\da-f]{3}$/i.test(color))
      palette[field.key] =
        `#${[...color.slice(1)].map((part) => part + part).join('')}`;
    else
      palette[field.key] = `#${(color.match(/[\d.]+/g) || [0, 0, 0])
        .slice(0, 3)
        .map((part) => Math.round(Number(part)).toString(16).padStart(2, '0'))
        .join('')}`;
  }
  return palette;
}
