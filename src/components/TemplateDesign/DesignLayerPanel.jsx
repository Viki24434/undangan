import { useState } from 'react';
import OrnamentArtwork from '../Ornament/OrnamentArtwork';
import { ornamentAssets } from '../Ornament/ornamentAssets';

export default function DesignLayerPanel({
  natives,
  items,
  design,
  selected,
  disabled,
  onSelect,
  onToggle,
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const layers = [
    ...natives.map((record, index) => ({
      selection: { type: 'native', key: record.key },
      key: record.key,
      label: record.displayLabel || record.label || `Bawaan ${index + 1}`,
      value:
        design.native[record.key] ||
        design.native[record.legacyKey] ||
        record.defaults,
      thumbnail: record.thumbnail,
      kind: 'Bawaan',
    })),
    ...items.map((item) => ({
      selection: { type: 'added', id: item.id },
      key: item.id,
      label: item.label || 'Ornamen tambahan',
      value: item,
      kind: 'Tambahan',
    })),
  ];
  const visible = layers.filter(
    (layer) =>
      layer.label
        .toLocaleLowerCase('id')
        .includes(query.trim().toLocaleLowerCase('id')) &&
      (filter === 'all' ||
        Boolean(layer.value?.hidden) === (filter === 'hidden')),
  );
  return (
    <section className="designer-layers">
      <h3>
        Lapisan ornamen <small>{layers.length}</small>
      </h3>
      <div className="admin-form">
        <label>
          Cari lapisan
          <input
            type="search"
            value={query}
            placeholder="Nama ornamen…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Tampilkan lapisan
          <select
            aria-label="Tampilkan lapisan"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">Semua lapisan</option>
            <option value="visible">Terlihat</option>
            <option value="hidden">Tersembunyi</option>
          </select>
        </label>
      </div>
      <div className="designer-layer-browser">
        {visible.map((layer) => {
          const active =
            layer.selection.type === selected?.type &&
            (layer.selection.key || layer.selection.id) ===
              (selected?.key || selected?.id);
          const asset = ornamentAssets[layer.value?.asset];
          const src = layer.value?.src || layer.thumbnail;
          return (
            <div
              className="designer-layer-row"
              key={layer.key}
              data-selected={active}
            >
              <button
                type="button"
                className="designer-layer-select"
                aria-pressed={active}
                disabled={disabled}
                onClick={() => onSelect(layer.selection)}
              >
                <span className="designer-layer-thumbnail" aria-hidden="true">
                  {src ? (
                    <img src={src} alt="" loading="lazy" />
                  ) : asset ? (
                    <OrnamentArtwork asset={layer.value.asset} />
                  ) : (
                    '◇'
                  )}
                </span>
                <span>
                  <strong>{layer.label}</strong>
                  <small>
                    {layer.kind}
                    {layer.value?.hidden ? ' · Tersembunyi' : ''}
                  </small>
                </span>
              </button>
              <button
                type="button"
                className="designer-layer-visibility"
                aria-label={`${layer.value?.hidden ? 'Tampilkan' : 'Sembunyikan'} ${layer.label}`}
                disabled={disabled || !layer.value}
                onClick={() => onToggle(layer.selection, layer.value)}
              >
                {layer.value?.hidden ? 'Tampilkan' : 'Sembunyikan'}
              </button>
            </div>
          );
        })}
        {!visible.length && (
          <p role="status">
            {layers.length
              ? 'Tidak ada lapisan yang cocok.'
              : 'Belum ada ornamen pada bagian ini.'}
          </p>
        )}
      </div>
    </section>
  );
}
