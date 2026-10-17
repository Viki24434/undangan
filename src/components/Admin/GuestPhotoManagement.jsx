import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';

export default function GuestPhotoManagement({ invitationId }) {
  const [page, setPage] = useState(0);
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({ items: [], total: 0, error: '' });
  const [busy, setBusy] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    adminService
      .guests(invitationId, 'photos', page * 100, controller.signal)
      .then(({ data, meta }) =>
        setState({ items: data, total: meta.total, error: '' }),
      )
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState((current) => ({ ...current, error: error.message }));
      });
    return () => controller.abort();
  }, [invitationId, page, version]);

  async function download(photo) {
    setBusy(photo.id);
    try {
      await adminService.downloadGuestPhoto(invitationId, photo);
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusy('');
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h2>Foto dari tamu</h2>
        <button
          className="admin-button secondary"
          onClick={() => setVersion((value) => value + 1)}
        >
          Muat ulang
        </button>
      </div>
      <p>
        {state.total} foto tersimpan. Nama pengirim tercantum pada nama file.
      </p>
      {state.error && (
        <p role="alert" className="admin-error">
          {state.error}
        </p>
      )}
      {state.items.length ? (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama file</th>
                <th>Ukuran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((photo) => (
                <tr key={photo.id}>
                  <td>
                    <strong style={{ overflowWrap: 'anywhere' }}>
                      {photo.filename}
                    </strong>
                    <small>
                      {new Date(photo.createdAt).toLocaleString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                      })}
                    </small>
                  </td>
                  <td>{(photo.size / 1024 / 1024).toFixed(2)} MB</td>
                  <td>
                    <button
                      className="admin-button secondary"
                      disabled={Boolean(busy)}
                      onClick={() => download(photo)}
                    >
                      {busy === photo.id ? 'Mengunduh…' : 'Unduh foto'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Belum ada foto dari tamu di halaman ini.</p>
      )}
      <div className="admin-pagination">
        <button
          className="admin-button secondary"
          disabled={page === 0}
          onClick={() => setPage((value) => value - 1)}
        >
          Sebelumnya
        </button>
        <span>Halaman {page + 1}</span>
        <button
          className="admin-button secondary"
          disabled={(page + 1) * 100 >= state.total}
          onClick={() => setPage((value) => value + 1)}
        >
          Berikutnya
        </button>
      </div>
    </section>
  );
}
