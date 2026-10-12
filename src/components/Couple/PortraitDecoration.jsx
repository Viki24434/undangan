import DecorationLayer from '../Ornament/DecorationLayer';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import './PortraitDecoration.css';

export default function PortraitDecoration({ items = [] }) {
  const family = items[0]?.asset.split('-')[0] || 'blush';
  const bottomAsset = `${family}-bottom-garland`;
  const garland = ornamentAssets[bottomAsset]
    ? bottomAsset
    : 'blush-bottom-garland';
  const decorations = items
    .filter((item) => item.asset !== garland)
    .map((item) => ({
      ...item,
      position: {
        ...(item.position?.right !== undefined
          ? { right: item.position.right }
          : { left: item.position?.left || '-12%' }),
        top: '-8%',
      },
      zIndex: 1,
    }));

  return (
    <DecorationLayer
      className="portrait-decoration"
      items={[
        ...decorations,
        {
          asset: garland,
          position: { top: '100%', left: '-14%' },
          width: '128%',
          zIndex: 2,
          transformOrigin: '50% 50%',
          animation: false,
        },
      ]}
    />
  );
}
