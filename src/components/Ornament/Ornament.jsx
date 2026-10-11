import './Ornament.css';

export default function Ornament({
  src,
  position = '',
  width = '150px',
  animation = '',
  delay = '',
  rotate = 0,
  flipX = false,
  flipY = false,
  customStyle = {},
  opacity = 1,
}) {
  const positionClass = position ? `pos-${position}` : '';

  let transformString = `rotate(${rotate}deg)`;
  if (flipX) transformString += ` scaleX(-1)`;
  if (flipY) transformString += ` scaleY(-1)`;

  return (
    <div
      className={`ornament-wrapper ${positionClass}`}
      aria-hidden="true"
      style={{
        ...customStyle,
        transform: transformString,
        width: width,
        opacity: opacity,
      }}
    >
      <img
        src={src}
        alt=""
        className={`${animation} ${delay}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
