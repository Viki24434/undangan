import { useRef } from 'react';

export default function GuestImportPanel({
  busy,
  preview,
  onSelect,
  onApply,
  onCancel,
}) {
  const input = useRef(null);
  return (
    <section className="admin-panel guest-import">
      <div className="admin-panel-heading">
        <div>
          <h2>Punya daftar di Excel?</h2>
          <p>Isi file contoh, lalu impor. Nama yang sudah ada akan dilewati.</p>
        </div>
        <div className="admin-actions">
          <a
            className="admin-button secondary"
            href="/downloads/contoh-daftar-tamu.xlsx"
            download
          >
            Unduh contoh Excel
          </a>
          <button
            className="admin-button secondary"
            disabled={busy}
            onClick={() => input.current.click()}
          >
            {busy ? 'Memproses…' : 'Impor Excel'}
          </button>
          <input
            ref={input}
            type="file"
            accept=".xlsx"
            aria-label="Pilih Excel daftar tamu"
            className="guest-file-input"
            onChange={(event) => {
              const file = event.target.files[0];
              event.target.value = '';
              if (file) onSelect(file);
            }}
          />
        </div>
      </div>
      <p>
        Format .xlsx, maksimal 2 MB dan 5.000 nama. Nomor WhatsApp gunakan
        format Text agar angka 0 tetap ada.
      </p>
      {preview && (
        <div
          className="guest-import-preview"
          role="region"
          aria-label="Pratinjau impor"
        >
          <h3>Periksa sebelum menambahkan</h3>
          <p>
            {preview.guests.length} nama valid · {preview.duplicates} duplikat
            dalam file · {preview.invalid} baris perlu diperbaiki.
          </p>
          <p>
            {preview.guests
              .slice(0, 5)
              .map((guest) => guest.name)
              .join(', ')}
            {preview.guests.length > 5 ? ', …' : ''}
          </p>
          {preview.issues.length > 0 && (
            <details open>
              <summary>Baris yang tidak akan diimpor</summary>
              <ul>
                {preview.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
              {preview.invalid > preview.issues.length && (
                <p>Menampilkan 20 masalah pertama.</p>
              )}
            </details>
          )}
          <div className="admin-actions">
            <button
              className="admin-button"
              disabled={busy || !preview.guests.length}
              onClick={onApply}
            >
              Tambahkan nama valid
            </button>
            <button
              className="admin-button secondary"
              onClick={onCancel}
              disabled={busy}
            >
              Batal impor
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
