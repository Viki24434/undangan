import { useEffect, useRef, useState } from 'react';
import { prepareImage, imageDataURL } from '../../services/imageFiles';
import { adminService } from '../../services/adminService';
import './ImageField.css';

export default function ImageField({
  label,
  value = '',
  onChange,
  localOnly,
  onPending,
  required = true,
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controllerRef = useRef(null);
  useEffect(() => () => controllerRef.current?.abort(), []);
  const uploaded =
    value.startsWith('data:image/') || value.startsWith('/api/media/');

  async function select(event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    const controller = new AbortController();
    controllerRef.current = controller;
    setBusy(true);
    setError('');
    onPending(1);
    try {
      const blob = await prepareImage(file);
      if (controller.signal.aborted) return;
      const result = localOnly
        ? await imageDataURL(blob)
        : await adminService.uploadImage(blob, controller.signal);
      if (!controller.signal.aborted) onChange(result);
    } catch (error) {
      if (!controller.signal.aborted) setError(error.message);
    } finally {
      if (!controller.signal.aborted) setBusy(false);
      onPending(-1);
    }
  }

  return (
    <div className="image-field">
      <label>
        {label}
        <input
          type="url"
          required={required && !uploaded}
          value={uploaded ? '' : value}
          placeholder={
            uploaded
              ? 'Gambar sudah dipilih. Isi URL untuk mengganti.'
              : 'https://contoh.com/foto.jpg'
          }
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <label className="image-file-label">
        {localOnly ? 'Pilih gambar dari perangkat' : 'Upload gambar'}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={select}
        />
      </label>
      {value && (
        <img
          className="image-field-preview"
          src={value}
          alt={`Preview ${label}`}
        />
      )}
      {busy && (
        <p role="status">
          {localOnly ? 'Memproses gambar…' : 'Mengunggah gambar…'}
        </p>
      )}
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      <small>
        {localOnly
          ? 'Gambar disimpan di browser perangkat ini.'
          : 'File diunggah sekarang. Menyimpan undangan hanya menyimpan URL.'}{' '}
        JPG, PNG, WebP; maksimal 10 MB.
      </small>
    </div>
  );
}
