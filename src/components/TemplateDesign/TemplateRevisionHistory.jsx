import { useEffect, useRef, useState } from 'react';
import { adminService } from '../../services/adminService';
import './TemplateHistory.css';

export default function TemplateRevisionHistory({
  templateId,
  revision,
  disabled,
  onRestore,
}) {
  const [state, setState] = useState({ rows: [], error: '', loading: true });
  const [selected, setSelected] = useState('');
  const [restoring, setRestoring] = useState(false);
  const pending = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    pending.current = controller;
    adminService
      .templateRevisions(templateId, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted)
          setState({ rows: data, error: '', loading: false });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({ rows: [], error: error.message, loading: false });
      });
    return () => controller.abort();
  }, [templateId, revision]);

  async function restore() {
    setRestoring(true);
    const controller = pending.current;
    try {
      const { data } = await adminService.templateRevision(
        templateId,
        selected,
        controller.signal,
      );
      if (!controller.signal.aborted) onRestore(data.data, data.revision);
    } catch (error) {
      if (!controller.signal.aborted)
        setState((current) => ({ ...current, error: error.message }));
    } finally {
      setRestoring(false);
    }
  }

  return (
    <details className="template-revision-history">
      <summary>Riwayat revisi</summary>
      <div className="admin-form">
        <p>
          Maksimal 10 versi sebelumnya. Pemulihan diterapkan ke editor untuk
          diperiksa sebelum disimpan.
        </p>
        {state.error && (
          <p role="alert" className="admin-error">
            {state.error}
          </p>
        )}
        {state.loading ? (
          <p role="status">Memuat riwayat...</p>
        ) : state.rows.length ? (
          <>
            <label>
              Versi sebelumnya
              <select
                aria-label="Versi sebelumnya"
                value={selected}
                disabled={disabled || restoring}
                onChange={(event) => setSelected(event.target.value)}
              >
                <option value="">Pilih revisi</option>
                {state.rows.map((row) => (
                  <option key={row.id} value={row.id}>
                    Versi {row.revision} ·{' '}
                    {new Date(row.createdAt).toLocaleString('id-ID')} ·{' '}
                    {row.reason === 'import'
                      ? 'Sebelum impor'
                      : 'Sebelum penyimpanan'}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="admin-button secondary"
              type="button"
              disabled={
                disabled ||
                restoring ||
                !state.rows.some((row) => row.id === selected)
              }
              onClick={restore}
            >
              {restoring ? 'Memuat revisi...' : 'Pulihkan ke editor'}
            </button>
          </>
        ) : (
          <p>Riwayat tersedia setelah perubahan pertama disimpan.</p>
        )}
      </div>
    </details>
  );
}
