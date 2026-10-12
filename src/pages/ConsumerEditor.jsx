import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { templateRegistry } from '../config/templateRegistry';
import { templateDefaults } from '../config/templateDefaults';
import {
  readLocalDraft,
  writeLocalDraft,
  localPreview,
} from '../services/localDrafts';
import { InvitationContext } from '../components/Invitation/InvitationContext';
import InvitationForm from '../components/Admin/InvitationForm';
import MobileWrapper from '../components/MobileWrapper/MobileWrapper';
import '../components/Admin/Admin.css';
import './ConsumerEditor.css';

function initialForm(template, data) {
  const eventDate = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(new Date(data.targetDate))
    .replace(' ', 'T');
  return {
    templateId: template.id,
    title: data.title || `${data.groom.name} & ${data.bride.name}`,
    eventDate,
    data,
  };
}

export default function ConsumerEditor() {
  const { id } = useParams();
  const template = templateRegistry.find((item) => item.id === id);
  const [form, setForm] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [pendingUploads, setPendingUploads] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!template) return;
      let saved;
      try {
        saved = readLocalDraft(id);
      } catch {
        if (active)
          setNotice(
            'Draft lama tidak dapat dibaca. Data contoh akan dimuat; draft lama tetap ada sampai Anda menyimpan perubahan.',
          );
      }
      try {
        const value =
          saved || initialForm(template, await templateDefaults(id));
        if (active) setForm(value);
      } catch (error) {
        if (active) setError(error.message);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id, template]);

  function saveLocal(value) {
    try {
      writeLocalDraft(value);
      setNotice('Tersimpan di browser perangkat ini.');
      setError('');
    } catch {
      setError(
        'Browser belum dapat menyimpan draft. Unduh salinan agar perubahan tidak hilang saat halaman ditutup.',
      );
    }
  }

  function change(value) {
    setForm(value);
    saveLocal(value);
  }

  function showPreview() {
    if (!editorRef.current?.querySelector('form')?.reportValidity()) return;
    try {
      if (!form.data.events?.length)
        throw new Error('Tambahkan minimal satu jadwal acara.');
      setPreview(localPreview(form));
    } catch (error) {
      setError(error.message);
    }
  }

  function download() {
    const blob = new Blob([JSON.stringify({ version: 1, form }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `draft-${id}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (!template || !form || form.templateId !== id)
    return (
      <div className="admin-app consumer-loading">
        <p role="status">
          {!template ? 'Template tidak ditemukan.' : error || 'Memuat editor…'}
        </p>
        <Link to="/katalog">Kembali ke katalog</Link>
      </div>
    );

  if (preview && preview.templateId === id) {
    const Template = template.component;
    return (
      <InvitationContext.Provider value={preview}>
        <MobileWrapper
          bgImage={form.data.image || template.img}
          onBack={() => setPreview(null)}
        >
          <Suspense fallback={<p role="status">Memuat preview…</p>}>
            <Template />
          </Suspense>
        </MobileWrapper>
      </InvitationContext.Provider>
    );
  }

  return (
    <div className="admin-app consumer-editor" ref={editorRef}>
      <main className="consumer-main">
        <header className="admin-page-heading">
          <div>
            <Link to="/katalog" className="admin-back">
              ← Kembali ke katalog
            </Link>
            <span className="admin-eyebrow">BUAT CERITAMU SENDIRI</span>
            <h1>Edit {template.name}</h1>
            <p>
              Perubahan disimpan otomatis di browser ini dan tidak dikirim ke
              server. Draft hanya tersedia di perangkat dan browser yang sama.
            </p>
          </div>
          <div className="admin-actions">
            <button
              className="admin-button"
              type="button"
              disabled={pendingUploads > 0}
              onClick={showPreview}
            >
              Preview ↗
            </button>
            <button
              className="consumer-download"
              type="button"
              onClick={download}
            >
              Unduh salinan draft
            </button>
          </div>
        </header>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="admin-success" role="status">
            {notice}
          </p>
        )}
        <InvitationForm
          onUploadStatus={(delta) =>
            setPendingUploads((count) => Math.max(0, count + delta))
          }
          form={form}
          templates={[template]}
          onChange={change}
          onTemplateChange={() => {}}
          onSubmit={(event) => {
            event.preventDefault();
            saveLocal(form);
          }}
          busy={false}
          localOnly
        />
      </main>
    </div>
  );
}
