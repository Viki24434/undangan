import { useRef, useState } from 'react';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import OrnamentArtwork from '../Ornament/OrnamentArtwork';
import { adminService } from '../../services/adminService';

export default function DesignAssetLibrary({ onAdd, disabled, onBusy }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const fileInput = useRef(null);
  const assets = Object.entries(ornamentAssets);
  const groups = [
    ...new Set(assets.map(([, asset]) => asset.src.split('/')[3])),
  ]
    .filter(Boolean)
    .sort();
  const filtered = assets.filter(
    ([key, asset]) =>
      `${key} ${asset.src}`.toLowerCase().includes(query.toLowerCase()) &&
      (!group || asset.src.split('/')[3] === group),
  );
  async function upload(file) {
    setError('');
    if (
      !['image/png', 'image/webp', 'image/jpeg'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError('Gunakan PNG, WebP, atau JPG maksimal 5 MB.');
      return;
    }
    onBusy(true);
    try {
      onAdd(null, await adminService.uploadImage(file));
    } catch (error) {
      setError(error.message);
    } finally {
      onBusy(false);
    }
  }
  return (
    <div className="designer-assets">
      <div className="admin-form">
        <label>
          Cari aset
          <input
            type="search"
            placeholder="Daun, bunga, sunda…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
          />
        </label>
        <label>
          Folder aset
          <select
            aria-label="Folder aset"
            value={group}
            onChange={(event) => {
              setGroup(event.target.value);
              setPage(0);
            }}
          >
            <option value="">Semua folder</option>
            {groups.map((name) => (
              <option key={name} value={name}>
                {name.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="button"
        className="admin-button secondary"
        disabled={disabled}
        onClick={() => fileInput.current.click()}
      >
        + Unggah ornamen
      </button>
      <input
        ref={fileInput}
        type="file"
        className="designer-file"
        aria-label="Unggah ornamen custom"
        accept="image/png,image/webp,image/jpeg"
        onChange={(event) => {
          const file = event.target.files[0];
          event.target.value = '';
          if (file) upload(file);
        }}
      />
      <p>
        PNG dan WebP diunggah dengan transparansi asli. Maksimal 5 MB per
        gambar. Tarik aset atau file gambar langsung ke preview, atau klik aset
        untuk menambahkannya.
      </p>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      <div className="designer-asset-grid">
        {filtered.slice(page * 30, (page + 1) * 30).map(([key, asset]) => (
          <button
            key={key}
            type="button"
            title={key}
            aria-label={`Tambahkan ${key}`}
            disabled={disabled}
            draggable={!disabled}
            onDragStart={(event) => {
              event.dataTransfer.setData(
                'application/x-undangan-ornament',
                key,
              );
              event.dataTransfer.effectAllowed = 'copy';
            }}
            onClick={() => onAdd(key)}
          >
            <OrnamentArtwork
              asset={asset.viewBox ? { ...asset, cropped: true } : asset}
            />
            <span>{key.replaceAll('-', ' ')}</span>
          </button>
        ))}
      </div>
      <div className="designer-asset-pages">
        <button
          type="button"
          disabled={!page}
          onClick={() => setPage(page - 1)}
        >
          ←
        </button>
        <span>
          {filtered.length} aset · {page + 1}/
          {Math.max(1, Math.ceil(filtered.length / 30))}
        </span>
        <button
          type="button"
          disabled={(page + 1) * 30 >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
