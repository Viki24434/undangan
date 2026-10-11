import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';

export default function GuestManagement({ invitationId }) {
  const [type, setType] = useState('rsvps');
  const [page, setPage] = useState(0);
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({ items: [], total: 0, error: '' });
  const [confirmId, setConfirmId] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .guests(invitationId, type, page * 100, controller.signal)
      .then(({ data, meta }) =>
        setState({ items: data, total: meta.total, error: '' }),
      )
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState((current) => ({ ...current, error: error.message }));
      });
    return () => controller.abort();
  }, [invitationId, type, page, version]);
  async function remove(id) {
    setBusy(true);
    try {
      await adminService.removeWish(id);
      setConfirmId('');
      setVersion((value) => value + 1);
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h2>Data tamu</h2>
        <div className="admin-actions">
          {['rsvps', 'wishes'].map((item) => (
            <button
              type="button"
              className={`admin-button ${type === item ? '' : 'secondary'}`}
              key={item}
              onClick={() => {
                setType(item);
                setPage(0);
                setState({ items: [], total: 0, error: '' });
              }}
            >
              {item === 'rsvps' ? 'RSVP' : 'Ucapan'}
            </button>
          ))}
        </div>
      </div>
      <p>
        {state.total} {type === 'rsvps' ? 'konfirmasi' : 'ucapan'} tersimpan
      </p>
      {state.error && (
        <p role="alert" className="admin-error">
          {state.error}
        </p>
      )}
      {state.items.length === 0 ? (
        <p>Belum ada data tamu di halaman ini.</p>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>{type === 'rsvps' ? 'Kehadiran' : 'Ucapan'}</th>
                <th>{type === 'rsvps' ? 'Jumlah tamu' : 'Aksi'}</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>
                      {new Date(item.createdAt).toLocaleString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                      })}
                    </small>
                  </td>
                  <td>
                    {type === 'rsvps' ? (
                      <>
                        {item.attendance}
                        <small>{item.note}</small>
                      </>
                    ) : (
                      item.message
                    )}
                  </td>
                  <td>
                    {type === 'rsvps' ? (
                      item.guestCount
                    ) : confirmId === item.id ? (
                      <div className="admin-actions">
                        <button disabled={busy} onClick={() => remove(item.id)}>
                          Konfirmasi hapus
                        </button>
                        <button onClick={() => setConfirmId('')}>Batal</button>
                      </div>
                    ) : (
                      <button
                        className="admin-text-danger"
                        onClick={() => setConfirmId(item.id)}
                      >
                        Hapus ucapan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="admin-pagination">
        <button
          className="admin-button secondary"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Sebelumnya
        </button>
        <span>Halaman {page + 1}</span>
        <button
          className="admin-button secondary"
          disabled={(page + 1) * 100 >= state.total}
          onClick={() => setPage(page + 1)}
        >
          Berikutnya
        </button>
      </div>
    </section>
  );
}
