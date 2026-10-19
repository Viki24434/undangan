import { ornamentAssets } from './ornamentAssets';

export default function AtelierArtwork({
  name,
  fill = false,
  align = 'center',
  family = 'champagne',
}) {
  const asset = ornamentAssets[`${family}-${name}`];
  const botanical =
    asset.wind !== false && /^(pohon|daun|atas|bawah)-/.test(name);
  const artwork = (
    <image
      href={asset.src}
      width="800"
      height="800"
      transform={asset.flipX ? 'translate(800 0) scale(-1 1)' : undefined}
    />
  );

  return (
    <svg
      className={botanical ? 'champagne-artwork--botanical' : undefined}
      viewBox={asset.viewBox.join(' ')}
      preserveAspectRatio={
        fill && asset.fit !== 'contain'
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
        <g className="champagne-artwork__foliage">{artwork}</g>
      ) : (
        artwork
      )}
    </svg>
  );
}
