import AtelierArtwork from '../../Ornament/AtelierArtwork';
import AtelierOutline from '../../Ornament/AtelierOutline';
import Birds from '../../Ornament/Birds/Birds';
import './PlatinumHeroScene.css';

const layers = [
  ['langit', 'background'],
  ['bukit', 'bukit'],
  ['pohon-kiri', 'pohon-kiri'],
  ['pohon-kanan', 'pohon-kanan'],
  ['lantai', 'tangga-lantai'],
  ['kubah', 'kubah'],
  ['mahkota', 'mahkota'],
  ['daun-kiri', 'daun-kiri'],
  ['daun-kanan', 'daun-kanan'],
  ['atas-kiri', 'atas-kiri'],
  ['atas-kanan', 'atas-kanan'],
  ['bawah-kiri', 'bawah-kiri'],
  ['bawah-kanan', 'bawah-kanan'],
  ['lilin-kiri', 'dua-lilin'],
  ['lilin-kanan', 'lilin'],
  ['pagar', 'pagar-bunga'],
];

export default function PlatinumHeroScene({ family = 'champagne' }) {
  const sceneLayers =
    family === 'aurora'
      ? [
          ...layers,
          ['bulan', 'bulan'],
          ['balustrade', 'pagar'],
          ['lentera', 'lentera'],
        ]
      : layers;
  return (
    <div
      className={`champagne-scenery champagne-scenery--${family}`}
      aria-hidden="true"
    >
      <div className="champagne-scenery__ground" />
      {sceneLayers.map(([position, name], index) => (
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
              /^(lilin|pohon|daun|bawah)-/.test(position)
                ? 'bottom'
                : position.startsWith('atas-')
                  ? 'top'
                  : 'center'
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
