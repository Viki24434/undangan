import { ornamentAssets } from './ornamentAssets';

export default function AtelierArtwork({
  name,
  fill = false,
  align = 'center',
  family = 'champagne',
}) {
  const asset = ornamentAssets[`${family}-${name}`];
  const botanical = /^(pohon|daun|atas|bawah)-/.test(name);

  return (
    <svg
      className={botanical ? 'champagne-artwork--botanical' : undefined}
      viewBox={asset.viewBox.join(' ')}
      preserveAspectRatio={
        fill
          ? 'xMidYMid slice'
          : align === 'bottom'
            ? 'xMidYMax meet'
            : align === 'top'
              ? 'xMidYMin meet'
              : 'xMidYMid meet'
      }
      aria-hidden="true"
      focusable="false"
    >
      {botanical ? (
        <g className="champagne-artwork__foliage">
          <image href={asset.src} width="800" height="800" />
        </g>
      ) : (
        <image href={asset.src} width="800" height="800" />
      )}
    </svg>
  );
}
