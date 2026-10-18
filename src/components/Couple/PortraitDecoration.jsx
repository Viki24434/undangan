import DecorationLayer from '../Ornament/DecorationLayer';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import './PortraitDecoration.css';

export default function PortraitDecoration({ items = [] }) {
  const garland =
    Object.keys(ornamentAssets).find(
      (key) =>
        key.endsWith('-bottom-garland') &&
        items.some((item) =>
          item.asset.startsWith(key.replace('bottom-garland', '')),
        ),
    ) || 'blush-bottom-garland';
  const decorations = items
    .filter((item) => item.asset !== garland)
    .map((item) => ({
      ...item,
      position: {
        ...(item.position?.right !== undefined
          ? { right: item.position.right }
          : { left: item.position?.left || '-12%' }),
        top: item.frameTop ?? '-8%',
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
