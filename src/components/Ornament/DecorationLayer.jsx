import { ornamentAssets } from './ornamentAssets';
import './DecorationLayer.css';

export default function DecorationLayer({ items = [], className = '' }) {
  if (items.length === 0) return null;

  return (
    <div className={`decoration-layer ${className}`} aria-hidden="true">
      {items.map((item, index) => {
        const asset = ornamentAssets[item.asset];
        if (!asset) {
          throw new Error(`Ornamen tidak terdaftar: ${item.asset}`);
        }

        const transform = [
          `rotate(${item.rotate || 0}deg)`,
          item.flipX ? 'scaleX(-1)' : '',
          item.flipY ? 'scaleY(-1)' : '',
        ]
          .filter(Boolean)
          .join(' ');
        const motionClass =
          item.animation ||
          (asset.role === 'corner'
            ? 'animate-corner-sway'
            : asset.role === 'flower'
              ? 'animate-flower-sway'
              : asset.role === 'branch' || asset.role === 'side'
                ? 'animate-branch-flutter'
                : 'animate-arrangement-sway');

        return (
          <span
            key={`${item.asset}-${index}`}
            className={`decoration-layer__item ${motionClass}`}
            data-ornament={item.asset}
            data-ornament-role={asset.role}
            style={{
              ...item.position,
              width: item.width,
              opacity: item.opacity ?? 1,
              zIndex: item.zIndex ?? 1,
              transformOrigin:
                item.transformOrigin ||
                (asset.role === 'bouquet'
                  ? '90% 92%'
                  : asset.role === 'branch' || asset.role === 'side'
                    ? '50% 72%'
                    : asset.role === 'flower'
                      ? '50% 85%'
                      : '50% 50%'),
              animationDelay: `${-(index % 6) * 1.15}s`,
            }}
          >
            <img
              src={asset.src}
              alt=""
              draggable="false"
              style={{
                transform,
                transformOrigin: item.transformOrigin || 'center',
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
