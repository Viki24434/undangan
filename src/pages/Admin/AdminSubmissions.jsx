import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import useTemplates from '../../hooks/useTemplates';

const labels = {
  pending: 'Menunggu tinjauan',
  accepted: 'Sudah jadi draft',
  rejected: 'Belum disetujui',
};

export default function AdminSubmissions() {
  const { templates: templateRegistry } = useTemplates();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: true,
    error: '',
  });
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .submissions(page * 20, filter, controller.signal)
      .then(({ data, meta }) => {
        setState({ items: data, total: meta.total, loading: false, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState((current) => ({
            ...current,
            loading: false,
            error: error.message,
          }));
      });
    return () => controller.abort();
  }, [page, filter, version]);

  return (
    <>
      <header className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">KIRIMAN CUSTOMER</span>
          <h1>Hasil edit, siap ditinjau.</h1>
          <p>
            Periksa kiriman customer, lalu buat draft undangan untuk diproses.
          </p>
        </div>
        <button
          className="admin-button secondary"
          onClick={() => {
            setState((current) => ({ ...current, loading: true }));
            setVersion(version + 1);
          }}
        >
          Muat ulang
        </button>
      </header>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>{state.total.toLocaleString('id-ID')} kiriman</h2>
          <div className="admin-form">
            <label>
              Status kiriman
              <select
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                  setPage(0);
                  setState((current) => ({ ...current, loading: true }));
                }}
              >
                <option value="">Semua status</option>
                {Object.entries(labels).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {state.error && (
          <p className="admin-error" role="alert">
            {state.error}
          </p>
        )}
        {state.loading ? (
          <p role="status">Memuat kiriman…</p>
        ) : !state.items.length ? (
          <div className="admin-empty">
            <h3>Belum ada kiriman.</h3>
            <p>Hasil edit customer akan tampil di sini setelah dikirim.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer / undangan</th>
                  <th>Template / tamu</th>
                  <th>Dikirim</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.customer_name}</strong>
                      <small>{item.title}</small>
                    </td>
                    <td>
                      {templateRegistry.find(
                        (template) => template.id === item.template_id,
                      )?.name || item.template_id}
                      <small>{item.guest_count} tamu</small>
                    </td>
                    <td>{new Date(item.created_at).toLocaleString('id-ID')}</td>
                    <td>
                      <span
                        className={`admin-badge ${item.status === 'accepted' ? 'published' : ''}`}
                      >
                        {labels[item.status]}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="admin-button secondary"
                        to={`/admin/kiriman/${item.id}`}
                      >
                        Tinjau kiriman
                      </Link>
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
            disabled={!page || state.loading}
            onClick={() => {
              setPage(page - 1);
              setState((current) => ({ ...current, loading: true }));
            }}
          >
            Sebelumnya
          </button>
          <span>Halaman {page + 1}</span>
          <button
            className="admin-button secondary"
            disabled={(page + 1) * 20 >= state.total || state.loading}
            onClick={() => {
              setPage(page + 1);
              setState((current) => ({ ...current, loading: true }));
            }}
          >
            Berikutnya
          </button>
        </div>
      </section>
    </>
  );
}
