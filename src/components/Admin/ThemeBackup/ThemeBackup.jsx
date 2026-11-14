import { useEffect, useRef, useState } from 'react';
import {
  exportThemes,
  importThemes,
  readThemeBackup,
} from '../../../services/themeBackup';
import { packageName } from '../../../config/invitationPackages';
import './ThemeBackup.css';

export default function ThemeBackup({
  templates,
  selectedIds,
  disabled,
  onBusyChange,
  onImported,
}) {
  const [scope, setScope] = useState('all');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [prepared, setPrepared] = useState(null);
  const [mode, setMode] = useState('copy');
  const controller = useRef(null);
  const input = useRef(null);

  useEffect(() => () => controller.current?.abort(), []);

  const ids =
    scope === 'selected'
      ? selectedIds
      : templates
          .filter((item) => scope !== 'custom' || item.isCustom)
          .map((item) => item.id);

  async function run(work) {
    const operation = new AbortController();
    controller.current = operation;
    setBusy(true);
    onBusyChange(true);
    setError('');
    setSuccess('');
    try {
      await work(operation.signal);
    } catch (error) {
      if (error.name !== 'AbortError') setError(error.message);
    } finally {
      if (!operation.signal.aborted) {
        setBusy(false);
        onBusyChange(false);
        setProgress('');
      }
    }
  }

  function exportBackup() {
    run(async (signal) => {
      const count = await exportThemes(ids, setProgress, signal);
      setSuccess(`Cadangan ${count} tema berhasil diunduh.`);
    });
  }

  function inspectFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setPrepared(null);
    setMode('copy');
    run(async (signal) => {
      const result = await readThemeBackup(file, setProgress, signal);
      setPrepared({ ...result, filename: file.name });
    });
  }

  function restoreBackup() {
    run(async (signal) => {
      const result = await importThemes(prepared, mode, setProgress, signal);
      setPrepared(null);
      setSuccess(
        `Impor selesai: ${result.created} tema ditambahkan, ${result.updated} diperbarui${result.copied ? `, termasuk ${result.copied} salinan` : ''}.`,
      );
      await onImported();
    });
  }

  return (
    <section
      className="theme-backup"
      aria-labelledby="theme-backup-title"
      aria-busy={busy}
    >
      <div className="theme-backup__heading">
        <div>
          <span className="admin-eyebrow">SIMPAN & PINDAHKAN KOLEKSI</span>
          <h2 id="theme-backup-title">Cadangan tema</h2>
          <p>
            Ekspor desain, warna, animasi, dan gambar unggahan dalam satu ZIP.
            Impor ke admin komputer atau server tujuan.
          </p>
        </div>
        <span className="theme-backup__badge">ZIP · hingga 500 tema</span>
      </div>
      <div className="theme-backup__actions">
        <label>
          Tema yang diekspor
          <select
            aria-label="Tema yang diekspor"
            value={scope}
            disabled={busy || disabled}
            onChange={(event) => setScope(event.target.value)}
          >
            <option value="all">Semua tema ({templates.length})</option>
            <option value="custom">
              Tema custom ({templates.filter((item) => item.isCustom).length})
            </option>
            <option value="selected">
              Tema dicentang ({selectedIds.length})
            </option>
          </select>
        </label>
        <button
          className="admin-button"
          type="button"
          disabled={busy || disabled || !ids.length || ids.length > 500}
          onClick={exportBackup}
        >
          Ekspor tema (ZIP)
        </button>
        <button
          className="admin-button secondary"
          type="button"
          disabled={busy || disabled}
          onClick={() => input.current?.click()}
        >
          Impor tema
        </button>
        <input
          className="theme-backup__file"
          ref={input}
          type="file"
          accept=".zip,application/zip"
          aria-label="File cadangan tema"
          disabled={busy || disabled}
          onChange={inspectFile}
        />
      </div>
      <p className="theme-backup__note">
        Aset bawaan mengikuti versi aplikasi. Gambar atau musik dari tautan luar
        tetap berupa tautan. Maksimal 100 MB gambar per cadangan.
      </p>
      {ids.length > 500 && (
        <p className="admin-error">
          Pilih maksimal 500 tema melalui centang di tabel.
        </p>
      )}
      {busy && (
        <p className="theme-backup__progress" role="status">
          {progress || 'Memproses cadangan…'}
        </p>
      )}
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="admin-success" role="status">
          {success}
        </p>
      )}
      {prepared && (
        <div className="theme-backup__preview">
          <h3>Tinjau cadangan</h3>
          <p>{prepared.filename}</p>
          <p>
            {prepared.preview.templates.length} tema · {prepared.preview.assets}{' '}
            gambar · {prepared.preview.existing} ID sudah ada di sini.
          </p>
          <ul aria-label="Tema dalam cadangan">
            {prepared.preview.templates.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <span>
                  {packageName(item.packageId)} ·{' '}
                  {item.exists ? 'ID sudah ada' : 'Tema baru'}
                </span>
              </li>
            ))}
          </ul>
          <fieldset disabled={busy || disabled}>
            <legend>Jika ID tema sudah ada</legend>
            <label>
              <input
                type="radio"
                name="theme-restore-mode"
                value="copy"
                checked={mode === 'copy'}
                onChange={() => setMode('copy')}
              />
              <span>
                <strong>Buat salinan</strong>
                <small>Tema yang sudah ada tetap tersimpan.</small>
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="theme-restore-mode"
                value="merge"
                checked={mode === 'merge'}
                onChange={() => setMode('merge')}
              />
              <span>
                <strong>Perbarui ID yang sama</strong>
                <small>
                  Isi dan desain tema dengan ID yang sama diganti dari cadangan.
                </small>
              </span>
            </label>
          </fieldset>
          <div className="theme-backup__actions">
            <button
              className="admin-button"
              type="button"
              disabled={busy || disabled}
              onClick={restoreBackup}
            >
              Impor {prepared.preview.templates.length} tema
            </button>
            <button
              className="admin-button secondary"
              type="button"
              disabled={busy || disabled}
              onClick={() => setPrepared(null)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
