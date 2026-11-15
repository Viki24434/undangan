export const TYPOGRAPHY_ROLES = [
  ['name', 'Nama utama'],
  ['heading', 'Judul bagian'],
  ['body', 'Isi paragraf'],
  ['label', 'Label kecil'],
  ['button', 'Tombol'],
];
export const TYPOGRAPHY_FONTS = {
  georgia: ['Georgia', 'Georgia, serif'],
  times: ['Times New Roman', '"Times New Roman", serif'],
  palatino: ['Palatino', '"Palatino Linotype", Palatino, serif'],
  garamond: ['Garamond', 'Garamond, Georgia, serif'],
  arial: ['Arial', 'Arial, sans-serif'],
  verdana: ['Verdana', 'Verdana, sans-serif'],
  trebuchet: ['Trebuchet', '"Trebuchet MS", sans-serif'],
  script: ['Tulisan tangan', '"Segoe Script", "Brush Script MT", cursive'],
  mono: ['Monospace', 'Consolas, monospace'],
};

export function typographyStyles(typography = {}) {
  const style = {};
  for (const [role] of TYPOGRAPHY_ROLES) {
    const value = typography[role];
    if (!value) continue;
    if (TYPOGRAPHY_FONTS[value.family])
      style[`--type-${role}-family`] = TYPOGRAPHY_FONTS[value.family][1];
    for (const [key, unit] of [
      ['size', 'px'],
      ['weight', ''],
      ['lineHeight', ''],
      ['spacing', 'px'],
    ]) {
      if (Number.isFinite(value[key]))
        style[`--type-${role}-${key}`] = `${value[key]}${unit}`;
    }
  }
  return style;
}

export function typographyAttributes(typography = {}) {
  const attributes = {};
  for (const [role] of TYPOGRAPHY_ROLES) {
    for (const key of ['family', 'size', 'weight', 'lineHeight', 'spacing']) {
      if (typography[role]?.[key] !== undefined)
        attributes[`data-type-${role}-${key.toLowerCase()}`] = 'true';
    }
  }
  return attributes;
}
