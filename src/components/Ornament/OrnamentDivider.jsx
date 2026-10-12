import { ornamentAssets } from './ornamentAssets';
import { ornamentPresets } from './ornamentPresets';
import './OrnamentDivider.css';

export default function OrnamentDivider({ theme, section }) {
  const preset = ornamentPresets[theme];
  const item = preset?.dividers?.[section]?.[0];
  const asset = item && ornamentAssets[item.asset];
  if (!asset) return null;

  return (
    <div className="ornament-divider" aria-hidden="true">
      <span className="ornament-divider__line" />
      <div className="ornament-divider__art">
        <img src={asset.src} alt="" loading="lazy" draggable="false" />
      </div>
      <span className="ornament-divider__line" />
    </div>
  );
}
