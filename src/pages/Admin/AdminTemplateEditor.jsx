import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { templateRegistry } from '../../config/templateRegistry';
import { adminService } from '../../services/adminService';
import { invitationService } from '../../services/api';
import { InvitationContext } from '../../components/Invitation/InvitationContext';
import InvitationForm from '../../components/Admin/InvitationForm';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';

function previewTitle(data, template) {
  return (
    data.title ||
    (data.groom && data.bride
      ? `${data.groom.name} & ${data.bride.name}`
      : data.honoree || template.name)
  );
}

export default function AdminTemplateEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const templateInfo = templateRegistry.find((item) => item.id === id);
  const [template, setTemplate] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .template(id, controller.signal)
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        setTemplate(data);
        setForm({
          templateId: id,
          title: data.data.title || '',
          slug: '',
          eventDate: '',
          status: 'draft',
          data: {
            ...data.data,
            agenda: data.data.agenda || [],
            prayers: data.data.prayers || [],
            photos: data.data.photos || [],
            theme: data.data.theme || {},
          },
        });
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          if (loadError.status === 401) navigate('/admin/login');
          setError(loadError.message);
        }
      });
    return () => controller.abort();
  }, [id, navigate]);

  function change(value) {
    setForm(value);
    setMessage('');
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const { data } = await adminService.updateTemplate(id, form.data);
      setTemplate(data);
      setForm((current) => ({
        ...current,
        data: {
          ...data.data,
          agenda: data.data.agenda || [],
          prayers: data.data.prayers || [],
          photos: data.data.photos || [],
          theme: data.data.theme || {},
        },
      }));
      setMessage('Perubahan template berhasil disimpan.');
    } catch (saveError) {
      if (saveError.status === 401) navigate('/admin/login');
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  }

  if (!template || !form || !templateInfo) {
    return (
      <div className="admin-panel">
        <p role="status">
          {!templateInfo
            ? 'Template tidak ditemukan.'
            : error || 'Memuat template…'}
        </p>
        <Link to="/admin/template">Kembali ke daftar template</Link>
      </div>
    );
  }

  if (preview) {
    const Template = templateInfo.component;
    const invitation = {
      id: template.id,
      templateId: template.id,
      title: previewTitle(form.data, template),
      eventDate: form.data.targetDate,
      data: form.data,
      preview: true,
    };
    return (
      <InvitationContext.Provider value={invitation}>
        <MobileWrapper
          bgImage={form.data.image || template.img}
          backTo="/admin/template"
          onBack={() => setPreview(false)}
        >
          <Suspense fallback={<p role="status">Memuat preview…</p>}>
            <Template key={id} />
          </Suspense>
        </MobileWrapper>
      </InvitationContext.Provider>
    );
  }

  const palette = templateInfo.palette || ['#ffffff', '#243e35'];

  return (
    <div ref={editorRef}>
      <header className="admin-page-heading">
        <div>
          <Link className="admin-back" to="/admin/template">
            ← Daftar template
          </Link>
          <span className="admin-eyebrow">EDITOR TEMPLATE</span>
          <h1>Edit {template.name}</h1>
          <p>
            Perubahan konten dan tema menjadi default untuk undangan baru.
            Undangan yang sudah disimpan tidak ikut berubah.
          </p>
        </div>
        <div className="admin-actions">
          <button
            className="admin-button secondary"
            type="button"
            onClick={() => {
              if (editorRef.current?.querySelector('form')?.reportValidity())
                setPreview(true);
            }}
          >
            Preview ↗
          </button>
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
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Pengaturan tampilan</h2>
            <p>Reset mengembalikan warna dan font ke desain bawaan template.</p>
          </div>
          <button
            className="admin-button secondary"
            type="button"
            onClick={() =>
              setForm((current) => ({
                ...current,
                data: { ...current.data, theme: {} },
              }))
            }
          >
            Reset tema
          </button>
        </div>
        <InvitationForm
          form={form}
          templates={[template]}
          onChange={change}
          onTemplateChange={() => {}}
          onSubmit={save}
          busy={busy}
          templateMode
          themeDefaults={{
            background: palette[0],
            accent: palette[1],
          }}
        />
      </section>
    </div>
  );
}
