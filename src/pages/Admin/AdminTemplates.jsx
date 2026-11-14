import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { invitationService } from '../../services/api';
import { adminService } from '../../services/adminService';
import ThemeBackup from '../../components/Admin/ThemeBackup/ThemeBackup';
import {
  invitationPackages,
  packageName,
} from '../../config/invitationPackages';

export default function AdminTemplates() {
  const [templates, setTemplates] = useState(null);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [backupBusy, setBackupBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .templates(controller.signal)
      .then(({ data }) => setTemplates(data))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, []);

  async function changePackage(template, packageId) {
    setBusy(template.id);
    setError('');
    setMessage('');
    try {
      const { data } = await adminService.updateTemplatePackage(
        template.id,
        packageId,
      );
      setTemplates((items) =>
        items.map((item) => (item.id === data.id ? data : item)),
      );
      setMessage(
        `${template.name} dipindahkan ke paket ${packageName(data.packageId)}.`,
      );
    } catch (error) {
      if (error.status === 401) navigate('/admin/login');
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  return (
    <>
      <header className="admin-page-heading">
        <Link className="admin-button" to="/admin/template/baru">
          + Buat template custom
        </Link>
        <div>
          <span className="admin-eyebrow">KOLEKSI & PAKET</span>
          <h1>Paket template</h1>
          <p>
            Ubah paket tiap template. Perubahan langsung berlaku di katalog.
          </p>
          <p>
            Memindahkan paket mengubah kategorinya; animasi dan fitur desain
            tetap mengikuti template.
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
      {templates && (
        <ThemeBackup
          templates={templates}
          selectedIds={selectedIds}
          disabled={!!busy}
          onBusyChange={setBackupBusy}
          onImported={async () => {
            const { data } = await invitationService.templates();
            setTemplates(data);
            setSelectedIds([]);
          }}
        />
      )}
      {!templates ? (
        <p role="status">Memuat template…</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table theme-template-table">
            <thead>
              <tr>
                <th>
                  <label className="theme-select-all">
                    <input
                      type="checkbox"
                      aria-label="Pilih semua tema"
                      disabled={backupBusy}
                      checked={
                        templates.length > 0 &&
                        selectedIds.length === templates.length
                      }
                      ref={(node) => {
                        if (node)
                          node.indeterminate =
                            selectedIds.length > 0 &&
                            selectedIds.length < templates.length;
                      }}
                      onChange={(event) =>
                        setSelectedIds(
                          event.target.checked
                            ? templates.map((item) => item.id)
                            : [],
                        )
                      }
                    />
                    Pilih
                  </label>
                </th>
                <th>Template</th>
                <th>Tema acara</th>
                <th>Paket</th>
                <th>Kelola</th>
                <th>Demo</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="theme-row-checkbox"
                      aria-label={`Pilih tema ${template.name}`}
                      checked={selectedIds.includes(template.id)}
                      disabled={backupBusy}
                      onChange={(event) =>
                        setSelectedIds((items) =>
                          event.target.checked
                            ? [...items, template.id]
                            : items.filter((id) => id !== template.id),
                        )
                      }
                    />
                  </td>
                  <td>
                    {template.name}
                    {template.isCustom && <small>Template custom</small>}
                  </td>
                  <td>{template.category}</td>
                  <td>
                    <select
                      aria-label={`Paket ${template.name}`}
                      value={template.packageId}
                      disabled={!!busy || backupBusy}
                      onChange={(event) =>
                        changePackage(template, event.target.value)
                      }
                    >
                      {invitationPackages.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Link to={`/admin/template/${template.id}`}>Edit isi</Link>
                    {' · '}
                    <Link to={`/admin/template/${template.id}/desain`}>
                      Edit desain
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/t/${template.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Preview ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
