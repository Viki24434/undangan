import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: true,
    error: '',
  });
  const [deleting, setDeleting] = useState('');
  const [confirmId, setConfirmId] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .list(page * 20, controller.signal)
      .then(({ data, meta }) =>
        setState({ items: data, total: meta.total, loading: false, error: '' }),
      )
      .catch((error) => {
        if (error.status === 401) navigate('/admin/login');
        if (error.name !== 'AbortError')
          setState((current) => ({
            ...current,
            loading: false,
            error: error.message,
          }));
      });
    return () => controller.abort();
  }, [page, version, navigate]);
  async function remove(id) {
    setDeleting(id);
    try {
      await adminService.remove(id);
      setConfirmId('');
      setVersion((value) => value + 1);
      if (state.items.length === 1 && page > 0) setPage(page - 1);
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setDeleting('');
    }
  }
  return (
    <>
      <header className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">DASHBOARD</span>
          <h1>Kelola momen istimewa.</h1>
          <p>Semua undangan dan cerita bahagia dalam satu tempat.</p>
        </div>
        <Link className="admin-button" to="/admin/undangan/baru">
          + Buat undangan
        </Link>
      </header>
      <div className="admin-stats">
        <article>
          <span>Total undangan</span>
          <strong>{state.total}</strong>
        </article>
        <article>
          <span>Terbit di halaman ini</span>
          <strong>
            {state.items.filter((item) => item.status === 'published').length}
          </strong>
        </article>
        <article>
          <span>Draft di halaman ini</span>
          <strong>
            {state.items.filter((item) => item.status === 'draft').length}
          </strong>
        </article>
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Daftar undangan</h2>
          <button
            className="admin-button secondary"
            onClick={() => setVersion((value) => value + 1)}
          >
            Muat ulang
          </button>
        </div>
        {state.error && (
          <p role="alert" className="admin-error">
            {state.error}
          </p>
        )}
        {state.loading ? (
          <p role="status">Memuat undangan…</p>
        ) : state.items.length === 0 ? (
          <div className="admin-empty">
            <h3>Cerita pertama dimulai di sini.</h3>
            <p>Pilih template dan isi detail undanganmu.</p>
            <Link className="admin-button" to="/admin/undangan/baru">
              Buat undangan pertama
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Undangan</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <small>/u/{item.slug}</small>
                    </td>
                    <td>
                      {new Date(item.eventDate).toLocaleDateString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                      })}
                    </td>
                    <td>
                      <span className={`admin-badge ${item.status}`}>
                        {item.status === 'published' ? 'Terbit' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link to={`/admin/undangan/${item.id}`}>Kelola</Link>
                        {item.status === 'published' && (
                          <Link
                            to={`/u/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buka ↗
                          </Link>
                        )}
                        <button onClick={() => setConfirmId(item.id)}>
                          Hapus
                        </button>
                      </div>
                      {confirmId === item.id && (
                        <div className="admin-delete-confirm">
                          <p>Hapus undangan beserta RSVP dan ucapannya?</p>
                          <button
                            className="admin-button danger"
                            disabled={deleting === item.id}
                            onClick={() => remove(item.id)}
                          >
                            Ya, hapus
                          </button>
                          <button
                            className="admin-button secondary"
                            onClick={() => setConfirmId('')}
                          >
                            Batal
                          </button>
                        </div>
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
            disabled={(page + 1) * 20 >= state.total}
            onClick={() => setPage(page + 1)}
          >
            Berikutnya
          </button>
        </div>
      </section>
    </>
  );
}
