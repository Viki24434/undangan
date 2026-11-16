import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invitationService } from '../../services/api';
import { invitationChecklist } from '../../services/invitationChecklist';
import './InvitationChecklist.css';

export default function InvitationChecklist({
  form,
  saved,
  invitationId,
  disabled,
}) {
  const [baseline, setBaseline] = useState({
    id: '',
    data: null,
    status: 'loading',
  });
  const [attempt, setAttempt] = useState(0);
  const [checked, setChecked] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .template(form.templateId, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted)
          setBaseline({
            id: form.templateId,
            data: data.data,
            status: 'ready',
          });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setBaseline({ id: form.templateId, data: null, status: 'error' });
      });
    return () => controller.abort();
  }, [form.templateId, attempt]);
  const baselineStatus =
    baseline.id === form.templateId ? baseline.status : 'loading';
  const rows = invitationChecklist(
    form,
    baseline.id === form.templateId ? baseline.data : null,
    { saved, baselineStatus },
  );
  const missing = rows.filter((row) => row.status === 'missing').length;
  const reviewed = (row) => row.review && checked[row.id] === row.evidence;
  const pending = rows.filter(
    (row) =>
      row.status !== 'missing' &&
      row.status !== 'optional' &&
      (row.review ? !reviewed(row) : row.status === 'warning'),
  ).length;
  function jump(section) {
    const heading = [
      ...document.querySelectorAll('.admin-form-section h2'),
    ].find((node) => node.textContent.trim() === section);
    if (!heading) return;
    const host = heading.closest('.admin-form-section');
    host.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
    host
      .querySelector('input, textarea, select')
      ?.focus({ preventScroll: true });
  }
  return (
    <section
      className="admin-panel invitation-checklist"
      aria-labelledby="checklist-title"
    >
      <div className="admin-panel-heading">
        <div>
          <h2 id="checklist-title">Checklist sebelum terbit</h2>
          <p>Periksa sebelum mengirim preview dan menerbitkan undangan.</p>
        </div>
        <span
          className={`checklist-summary ${missing ? 'has-missing' : ''}`}
          role="status"
        >
          {missing
            ? `${missing} belum lengkap`
            : pending
              ? `${pending} perlu diperiksa`
              : 'Pemeriksaan selesai'}
        </span>
      </div>
      <p>
        Data yang sama dengan template adalah petunjuk untuk diperiksa, bukan
        kepastian salah. Ketersediaan URL dan titik peta perlu diperiksa melalui
        preview.
      </p>
      <details open>
        <summary>Lihat {rows.length} pemeriksaan</summary>
        <ul>
          {rows.map((row) => (
            <li
              key={row.id}
              data-checklist-item={row.id}
              data-status={row.status}
            >
              <div>
                <strong>{row.title}</strong>
                <span className="checklist-state">
                  {row.status === 'missing'
                    ? 'Belum lengkap'
                    : row.status === 'optional'
                      ? 'Opsional'
                      : reviewed(row)
                        ? 'Sudah diperiksa'
                        : row.status === 'warning'
                          ? 'Perlu perhatian'
                          : 'Data terisi'}
                </span>
              </div>
              {row.messages.map((message) => (
                <p key={message}>{message}</p>
              ))}
              <div className="checklist-actions">
                {row.section && (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => jump(row.section)}
                  >
                    Periksa isian
                  </button>
                )}
                {row.id === 'preview' && invitationId && (
                  <Link
                    to={`/admin/undangan/${invitationId}/preview`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka preview tersimpan ↗
                  </Link>
                )}
                {row.id === 'baseline' && baselineStatus === 'error' && (
                  <button
                    type="button"
                    onClick={() => setAttempt((value) => value + 1)}
                  >
                    Muat ulang pembanding
                  </button>
                )}
                {row.review && row.status !== 'missing' && (
                  <label>
                    <input
                      type="checkbox"
                      disabled={disabled}
                      checked={Boolean(reviewed(row))}
                      onChange={(event) =>
                        setChecked((current) => ({
                          ...current,
                          [row.id]: event.target.checked ? row.evidence : '',
                        }))
                      }
                    />
                    Sudah saya periksa: {row.title.toLowerCase()}
                  </label>
                )}
              </div>
            </li>
          ))}
        </ul>
      </details>
      <p className="checklist-note">
        Tanda pemeriksaan berlaku selama halaman terbuka dan perlu diperiksa
        ulang jika data terkait berubah. Checklist membantu pemeriksaan; status
        terbit tetap ditentukan admin.
      </p>
    </section>
  );
}
