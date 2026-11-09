export const GRADIENT_KEYS = [
  'background',
  'surface',
  'paper',
  'heading',
  'accent',
  'buttonBackground',
  'inputBackground',
  'navigation',
  'overlay',
];

export function gradientCss(gradient, opacity = 1) {
  const stops = [...gradient.stops].sort((a, b) => a.position - b.position);
  return `linear-gradient(${gradient.angle}deg, ${stops
    .map((stop) => {
      const channels = [1, 3, 5].map((index) =>
        parseInt(stop.color.slice(index, index + 2), 16),
      );
      return `rgba(${channels.join(', ')}, ${(stop.opacity ?? 1) * opacity}) ${stop.position}%`;
    })
    .join(', ')})`;
}

export function createGradient(color = '#bda168') {
  return {
    angle: 135,
    stops: [
      { color, position: 0, opacity: 1 },
      { color: '#fff4de', position: 100, opacity: 1 },
    ],
  };
}
