import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import './InvitationShareCard.css';

export default function InvitationShareCard({ invitation }) {
  const [state, setState] = useState({ key: '', data: null, error: '' });
  const [copied, setCopied] = useState('');
  const key = `${invitation.id}:${invitation.updatedAt}`;
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .shareMetadata(invitation.id, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted) setState({ key, data, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ key, data: null, error: error.message });
      });
    return () => controller.abort();
  }, [invitation.id, key]);
  const data = state.key === key ? state.data : null;
  async function copy() {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(data.url);
    } catch {
      setCopied('');
    }
  }
  return (
    <section className="admin-panel invitation-share-card">
      <h2>Preview tautan WhatsApp</h2>
      <p>Informasi diambil dari versi undangan yang sudah disimpan.</p>
      {state.key === key && state.error && (
        <p role="alert" className="admin-error">
          {state.error}
        </p>
      )}
      {!data && (state.key !== key || !state.error) && (
        <p role="status">Menyiapkan preview tautan…</p>
      )}
      {data && (
        <>
          <article className="invitation-share-card__example">
            {(data.published ? data.image : data.previewImage) && (
              <img
                src={data.published ? data.image : data.previewImage}
                alt={`Foto cover ${data.title}`}
                loading="lazy"
                decoding="async"
              />
            )}
            <div>
              <small>{new URL(data.url).host}</small>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </div>
          </article>
          {data.published ? (
            <div className="admin-actions">
              <button
                type="button"
                className="admin-button secondary"
                onClick={copy}
              >
                {copied === data.url ? 'Link disalin' : 'Salin link undangan'}
              </button>
              <a
                className="admin-button"
                href={`https://wa.me/?text=${encodeURIComponent(data.url)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coba bagikan lewat WhatsApp ↗
              </a>
            </div>
          ) : (
            <p>
              Undangan masih draf. Kartu ini bisa dibagikan melalui tautan
              publik setelah diterbitkan.
            </p>
          )}
          <label className="invitation-share-card__url">
            Tautan publik
            <input
              readOnly
              value={data.url}
              onFocus={(event) => event.target.select()}
            />
          </label>
          {new URL(data.url).hostname.match(
            /^(localhost|127\.|0\.0\.0\.0)/,
          ) && (
            <p>
              Pengujian langsung di WhatsApp memerlukan alamat website yang
              dapat diakses dari internet. Atur PUBLIC_SITE_URL di .env backend
              saat memasang ke server.
            </p>
          )}
        </>
      )}
    </section>
  );
}
