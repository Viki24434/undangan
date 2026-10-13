import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { invitationService } from '../../services/api';

export default function AdminSocialLinks() {
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .socialLinks(controller.signal)
      .then(({ data }) => setLinks(data))
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const { data } = await adminService.updateSocialLinks(links);
      setLinks(data);
      setMessage('Tautan media sosial berhasil disimpan.');
    } catch (saveError) {
      if (saveError.status === 401) navigate('/admin/login');
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">PENGATURAN WEBSITE</span>
          <h1>Media sosial</h1>
          <p>
            Tautan ini tampil di footer website dan nomor WhatsApp dipakai pada
            tombol pemesanan di halaman template.
          </p>
        </div>
      </header>
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="admin-success">
          {message}
        </p>
      )}
      {loading ? (
        <p role="status">Memuat pengaturan…</p>
      ) : !links ? (
        <div>
          <p role="alert" className="admin-error">
            Pengaturan belum berhasil dimuat; belum ada perubahan yang
            disimpan.
          </p>
          <button
            className="admin-button"
            type="button"
            onClick={() => {
              setLoading(true);
              setError('');
              setAttempt((value) => value + 1);
            }}
          >
            Coba lagi
          </button>
        </div>
      ) : (
        <section className="admin-panel">
          <form className="admin-form" onSubmit={save}>
            <fieldset disabled={busy}>
              <div className="admin-field-grid">
                <label>
                  URL profil Instagram
                  <input
                    type="url"
                    maxLength={500}
                    placeholder="https://www.instagram.com/username"
                    value={links.instagram}
                    onChange={(event) =>
                      setLinks({ ...links, instagram: event.target.value })
                    }
                  />
                </label>
                <label>
                  URL profil TikTok
                  <input
                    type="url"
                    maxLength={500}
                    placeholder="https://www.tiktok.com/@username"
                    value={links.tiktok}
                    onChange={(event) =>
                      setLinks({ ...links, tiktok: event.target.value })
                    }
                  />
                </label>
                <label>
                  Nomor WhatsApp dengan kode negara
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[1-9][0-9]{7,14}"
                    maxLength={15}
                    placeholder="6281234567890"
                    value={links.whatsapp}
                    onChange={(event) =>
                      setLinks({ ...links, whatsapp: event.target.value })
                    }
                  />
                  <small>
                    Gunakan angka saja, tanpa tanda +, spasi, atau tanda hubung.
                    Kosongkan bila belum tersedia.
                  </small>
                </label>
              </div>
              <div className="admin-actions">
                <button className="admin-button" type="submit">
                  {busy ? 'Menyimpan…' : 'Simpan tautan'}
                </button>
                <Link className="admin-button secondary" to="/">
                  Lihat website ↗
                </Link>
              </div>
            </fieldset>
          </form>
        </section>
      )}
    </>
  );
}
