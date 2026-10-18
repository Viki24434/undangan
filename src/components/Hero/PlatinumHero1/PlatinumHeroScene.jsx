import AtelierArtwork from '../../Ornament/AtelierArtwork';
import AtelierOutline from '../../Ornament/AtelierOutline';
import Birds from '../../Ornament/Birds/Birds';
import './PlatinumHeroScene.css';

export default function PlatinumHeroScene({ family, layers }) {
  return (
    <div
      className={`champagne-scenery champagne-scenery--${family}`}
      aria-hidden="true"
    >
      <div className="champagne-scenery__ground" />
      {layers.map(([position, name, alignment], index) => (
        <div
          className={`champagne-scenery__layer champagne-scenery__layer--${position}`}
          style={{ '--layer-delay': `${Math.min(index * 0.12, 1.4)}s` }}
          key={position}
        >
          <AtelierArtwork
            family={family}
            name={name}
            fill={name === 'background' || name === 'bukit'}
            align={
              alignment ||
              (/^(lilin|pohon|daun|bawah)-/.test(position)
                ? 'bottom'
                : position.startsWith('atas-')
                  ? 'top'
                  : 'center')
            }
          />
        </div>
      ))}
      <Birds />
      <div className="champagne-scenery__sunlight" />
      <div className="champagne-scenery__mist" />
      <div className="champagne-scenery__name-panel">
        <AtelierOutline />
      </div>
    </div>
  );
}
