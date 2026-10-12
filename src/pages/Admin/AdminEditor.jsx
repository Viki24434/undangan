import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { templateRegistry } from '../../config/templateRegistry';
import useTemplates from '../../hooks/useTemplates';
import { templateDefaults } from '../../config/templateDefaults';
import InvitationForm from '../../components/Admin/InvitationForm';
import GuestManagement from '../../components/Admin/GuestManagement';
import { getVideoSource } from '../../components/Invitation/videoUrl';

function localDate(value) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(new Date(value))
    .replace(' ', 'T');
}

export default function AdminEditor() {
  const { templates: availableTemplates } = useTemplates();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [confirmTemplate, setConfirmTemplate] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    const load = id
      ? adminService.find(id, controller.signal).then(({ data }) => ({
          ...data,
          eventDate: localDate(data.eventDate),
        }))
      : templateDefaults(templateRegistry[0].id).then((data) => ({
          title: '',
          slug: '',
          templateId: templateRegistry[0].id,
          eventDate: localDate(data.targetDate),
          status: 'draft',
          data,
        }));
    load
      .then((value) => {
        if (!controller.signal.aborted) {
          setForm(value);
          setError('');
        }
      })
      .catch((error) => {
        if (error.status === 401) navigate('/admin/login');
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, [id, navigate]);
  async function changeTemplate() {
    setBusy(true);
    try {
      const data = await templateDefaults(confirmTemplate);
      setForm((current) => ({ ...current, templateId: confirmTemplate, data }));
      setConfirmTemplate('');
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setStatus('');
    try {
      const date = `${form.eventDate}:00+07:00`;
      const formatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
      }).format(new Date(date));
      const photos = (form.data.photos || [])
        .map((value) => value.trim())
        .filter(Boolean);
      if (
        photos.some(
          (value) =>
            !/^https?:\/\//i.test(value) &&
            !/^\/api\/media\/[a-f0-9-]+\.(jpg|png|webp)$/.test(value),
        )
      )
        throw new Error('URL galeri harus diawali http:// atau https://.');
      if (form.data.videoUrl && !getVideoSource(form.data.videoUrl))
        throw new Error(
          'Video harus berupa tautan YouTube, Vimeo, atau file MP4/WebM/OGG dengan HTTPS.',
        );
      if (!form.data.events?.length)
        throw new Error('Tambahkan minimal satu jadwal acara.');
      const body = {
        title: form.title,
        slug: form.slug,
        templateId: form.templateId,
        status: form.status,
        eventDate: date,
        data: {
          ...form.data,
          photos,
          agenda: (form.data.agenda || []).filter(
            (item) =>
              item.time?.trim() ||
              item.title?.trim() ||
              item.description?.trim(),
          ),
          prayers: (form.data.prayers || []).filter(
            (item) =>
              item.title?.trim() ||
              item.text?.trim() ||
              item.arabic?.trim() ||
              item.source?.trim(),
          ),
          videoUrl: form.data.videoUrl?.trim() || '',
          events: form.data.events.map((item) => ({
            ...item,
            date: formatted,
          })),
        },
      };
      const { data } = await adminService.save(body, id);
      setForm({ ...data, eventDate: localDate(data.eventDate) });
      setStatus('Undangan berhasil disimpan.');
      if (!id) navigate(`/admin/undangan/${data.id}`, { replace: true });
    } catch (error) {
      if (error.status === 401) navigate('/admin/login');
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  if (!form)
    return (
      <div className="admin-panel">
        <p role="status">{error || 'Memuat data undangan…'}</p>
        <Link to="/admin">Kembali ke dashboard</Link>
      </div>
    );
  return (
    <>
      <header className="admin-page-heading">
        <div>
          <Link className="admin-back" to="/admin">
            ← Semua undangan
          </Link>
          <h1>{id ? 'Detail ceritamu.' : 'Buat cerita baru.'}</h1>
          <p>Isi detail, preview desain, lalu terbitkan saat sudah siap.</p>
        </div>
        {id && (
          <div className="admin-actions">
            <Link
              className="admin-button secondary"
              to={`/admin/undangan/${id}/preview`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview ↗
            </Link>
            {form.status === 'published' && (
              <Link
                className="admin-button"
                to={`/u/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka undangan ↗
              </Link>
            )}
          </div>
        )}
      </header>
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      {status && (
        <p role="status" className="admin-success">
          {status}
        </p>
      )}
      {confirmTemplate && (
        <div className="admin-panel">
          <p>
            Mengganti template akan mengisi ulang foto, profil, dan detail
            acara. Judul, tautan, serta tanggal tetap dipertahankan.
          </p>
          <div className="admin-actions">
            <button
              className="admin-button"
              disabled={busy}
              onClick={changeTemplate}
            >
              Ganti template
            </button>
            <button
              className="admin-button secondary"
              onClick={() => setConfirmTemplate('')}
            >
              Batal
            </button>
          </div>
        </div>
      )}
      <section className="admin-panel">
        <InvitationForm
          form={form}
          templates={availableTemplates}
          onChange={setForm}
          onTemplateChange={setConfirmTemplate}
          onSubmit={save}
          busy={busy}
        />
      </section>
      {id && <GuestManagement invitationId={id} />}
    </>
  );
}
