import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { resolveTemplate } from '../../config/templateRenderer';
import '../../components/Admin/Submissions.css';

function Submission({ id }) {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState('');
  const [note, setNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .submission(id, controller.signal)
      .then(({ data }) => {
        setItem(data);
        setSlug(
          data.form.title
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 80)
            .replace(/-$/, ''),
        );
        setNote(data.reviewNote);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, [id]);

  async function accept(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data } = await adminService.acceptSubmission(id, slug);
      navigate(`/admin/undangan/${data.invitationId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function action(type) {
    setBusy(true);
    setError('');
    try {
      if (type === 'delete') {
        await adminService.removeSubmission(id);
        navigate('/admin/kiriman');
      } else {
        await adminService.rejectSubmission(id, note);
        setItem((current) => ({
          ...current,
          status: 'rejected',
          reviewNote: note,
        }));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  if (!item)
    return (
      <section className="admin-panel">
        <p role="status">{error || 'Memuat kiriman…'}</p>
        <Link to="/admin/kiriman">Kembali ke kiriman</Link>
      </section>
    );
  const guests = item.guestList.guests;
  const template = resolveTemplate(item.form);
  return (
    <div className="admin-submission-detail">
      <header className="admin-page-heading">
        <div>
          <Link className="admin-back" to="/admin/kiriman">
            ← Semua kiriman
          </Link>
          <h1>{item.form.title}</h1>
          <p>
            {template?.name} ·{' '}
            {new Date(item.createdAt).toLocaleString('id-ID')}
          </p>
        </div>
        <div className="admin-actions">
          <Link
            className="admin-button secondary"
            to={
              item.invitationId
                ? `/admin/undangan/${item.invitationId}/preview`
                : `/admin/kiriman/${id}/preview`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview kiriman ↗
          </Link>
          {item.invitationId && (
            <Link
              className="admin-button"
              to={`/admin/undangan/${item.invitationId}`}
            >
              Buka draft undangan
            </Link>
          )}
        </div>
      </header>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      <section className="admin-panel">
        <h2>Pengirim</h2>
        <dl className="submission-contact">
          <div>
            <dt>Nama</dt>
            <dd>{item.contact.name}</dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd>{item.contact.phone}</dd>
          </div>
          <div>
            <dt>Catatan customer</dt>
            <dd>{item.contact.note || 'Tidak ada catatan.'}</dd>
          </div>
          {item.guestList.invitationUrl && (
            <div>
              <dt>Link yang diisi customer</dt>
              <dd>{item.guestList.invitationUrl}</dd>
            </div>
          )}
          <div>
            <dt>Nomor kiriman</dt>
            <dd>{item.reference}</dd>
          </div>
        </dl>
      </section>
      {item.status === 'pending' && (
        <section className="admin-panel">
          <h2>Jadikan draft undangan</h2>
          <p>
            Isi undangan, gambar, daftar tamu, dan pesan customer akan disalin
            ke draft baru. Anda dapat mengedit dan menerbitkannya setelah
            diperiksa.
          </p>
          <form className="admin-form submission-review-form" onSubmit={accept}>
            <label>
              Tautan undangan
              <input
                required
                aria-label="Tautan undangan"
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={80}
                value={slug}
                disabled={busy}
                onChange={(event) => setSlug(event.target.value)}
              />
              <small>/u/{slug || 'nama-undangan'}</small>
            </label>
            <div className="admin-actions">
              <button className="admin-button" disabled={busy}>
                {busy ? 'Memproses…' : 'Terima & buat draft'}
              </button>
            </div>
          </form>
          <details className="submission-reject">
            <summary>Belum dapat disetujui?</summary>
            <div className="admin-form">
              <label>
                Catatan admin
                <textarea
                  maxLength={1000}
                  rows={3}
                  value={note}
                  aria-label="Catatan admin"
                  disabled={busy}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>
              <div>
                <button
                  type="button"
                  className="admin-button secondary"
                  disabled={busy}
                  onClick={() => action('reject')}
                >
                  Tandai belum disetujui
                </button>
              </div>
            </div>
          </details>
        </section>
      )}
      {item.status === 'rejected' && (
        <p className="admin-error">
          Kiriman belum disetujui. {item.reviewNote}
        </p>
      )}
      {item.status === 'accepted' && (
        <p className="admin-success">
          Kiriman telah diproses menjadi draft. Pengubahan selanjutnya dilakukan
          melalui detail undangan.
        </p>
      )}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>{guests.length.toLocaleString('id-ID')} nama tamu</h2>
          <span>{item.assets.length} gambar lokal</span>
        </div>
        {guests.length ? (
          <>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>WhatsApp / kelompok</th>
                    <th>Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.slice(page * 25, (page + 1) * 25).map((guest) => (
                    <tr key={guest.id}>
                      <td>{guest.name}</td>
                      <td>
                        {guest.phone || '—'}
                        <small>{guest.group}</small>
                      </td>
                      <td>{guest.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-pagination">
              <button
                className="admin-button secondary"
                disabled={!page}
                onClick={() => setPage(page - 1)}
              >
                Sebelumnya
              </button>
              <span>Halaman {page + 1}</span>
              <button
                className="admin-button secondary"
                disabled={(page + 1) * 25 >= guests.length}
                onClick={() => setPage(page + 1)}
              >
                Berikutnya
              </button>
            </div>
          </>
        ) : (
          <p>Customer belum menambahkan tamu.</p>
        )}
      </section>
      <section className="admin-panel">
        <h2>Pesan WhatsApp customer</h2>
        <pre className="submission-message">
          {item.guestList.messageTemplate}
        </pre>
      </section>
      <section className="admin-panel">
        <p>Menghapus kiriman tidak menghapus undangan yang sudah dibuat.</p>
        {confirmDelete ? (
          <div className="admin-actions submission-review-form">
            <button
              className="admin-button danger"
              disabled={busy}
              onClick={() => action('delete')}
            >
              Ya, hapus kiriman
            </button>
            <button
              className="admin-button secondary"
              disabled={busy}
              onClick={() => setConfirmDelete(false)}
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            className="admin-button secondary submission-review-form"
            disabled={busy}
            onClick={() => setConfirmDelete(true)}
          >
            Hapus kiriman
          </button>
        )}
      </section>
    </div>
  );
}

export default function AdminSubmission() {
  const { id } = useParams();
  return <Submission key={id} id={id} />;
}
