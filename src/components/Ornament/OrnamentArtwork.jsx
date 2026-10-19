export default function OrnamentArtwork({
  asset,
  style,
  className,
  fill = false,
}) {
  if (asset.cropped) {
    return (
      <svg
        className={className}
        style={style}
        viewBox={asset.viewBox.join(' ')}
        preserveAspectRatio={fill ? 'none' : 'xMidYMid meet'}
        aria-hidden="true"
        focusable="false"
      >
        <image
          href={asset.src}
          width="800"
          height="800"
          transform={asset.flipX ? 'translate(800 0) scale(-1 1)' : undefined}
        />
      </svg>
    );
  }
  return (
    <img
      className={className}
      style={style}
      src={asset.src}
      alt=""
      loading="lazy"
      draggable="false"
    />
  );
}
