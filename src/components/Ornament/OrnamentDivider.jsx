import { ornamentAssets } from './ornamentAssets';
import OrnamentArtwork from './OrnamentArtwork';
import { ornamentPresets } from './ornamentPresets';
import './OrnamentDivider.css';

export default function OrnamentDivider({ theme, section }) {
  const preset = ornamentPresets[theme];
  const item = preset?.dividers?.[section]?.[0];
  const asset = item && ornamentAssets[item.asset];
  if (!asset) return null;

  return (
    <div
      className="ornament-divider"
      data-divider-section={section}
      aria-hidden="true"
    >
      <span className="ornament-divider__line" />
      <div className="ornament-divider__art">
        <span
          className="ornament-divider__picture"
          data-ornament={item.asset}
          data-design-ornament="Gambar divider"
          data-design-key="divider"
          data-design-extra="true"
        >
          <OrnamentArtwork asset={asset} />
        </span>
      </div>
      <span className="ornament-divider__line" />
    </div>
  );
}
