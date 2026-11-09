import OrnamentArtwork from '../Ornament/OrnamentArtwork';
import { ornamentAssets } from '../Ornament/ornamentAssets';

export default function DesignNativeArtwork({ asset: assetKey, src }) {
  const source = assetKey ? ornamentAssets[assetKey] : { src };
  if (!source) return null;
  const asset = source.viewBox ? { ...source, cropped: true } : source;
  return (
    <span className="template-design-native-replacement" aria-hidden="true">
      <OrnamentArtwork asset={asset} fill />
    </span>
  );
}
