import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  GUEST_LIMIT,
  guestNameKey,
  invitationGuestUrl,
  mergeGuests,
} from '../../services/guestList';
import {
  downloadGuestSpreadsheet,
  processGuestSpreadsheet,
} from '../../services/guestSpreadsheet';
import GuestEntryForm from '../../components/Admin/GuestList/GuestEntryForm';
import GuestImportPanel from '../../components/Admin/GuestList/GuestImportPanel';
import GuestListTable from '../../components/Admin/GuestList/GuestListTable';
import GuestMessageEditor from '../../components/Admin/GuestList/GuestMessageEditor';
import {
  DEFAULT_GUEST_MESSAGE,
  guestMessageError,
} from '../../services/guestMessage';
import '../../components/Admin/GuestList/GuestList.css';

const PAGE_SIZE = 25;

function guestDocumentSnapshot(document) {
  return JSON.stringify({
    guests: document?.guests || [],
    messageTemplate: document?.messageTemplate ?? DEFAULT_GUEST_MESSAGE,
  });
}

function GuestList({ id }) {
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [saved, setSaved] = useState(() => guestDocumentSnapshot(null));
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState('');
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const formAnchor = useRef(null);
  const snapshot = guestDocumentSnapshot(document);
  const dirty = snapshot !== saved;
  const recoveryKey = `invitation-guests:${id}`;

  useEffect(() => {
    const controller = new AbortController();
    adminService
      .guestList(id, controller.signal)
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        data = {
          ...data,
          messageTemplate: data.messageTemplate || DEFAULT_GUEST_MESSAGE,
        };
        setSaved(guestDocumentSnapshot(data));
        try {
          const recovery = JSON.parse(
            sessionStorage.getItem(recoveryKey) || 'null',
          );
          if (
            recovery?.revision === data.revision &&
            Array.isArray(recovery.guests)
          ) {
            data = {
              ...data,
              guests: recovery.guests,
              messageTemplate:
                typeof recovery.messageTemplate === 'string'
                  ? recovery.messageTemplate
                  : data.messageTemplate,
            };
            setNotice(
              'Perubahan yang belum disimpan telah dipulihkan dari tab ini.',
            );
          }
        } catch {
          setNotice('Daftar tamu berhasil dimuat.');
        }
        setDocument(data);
      })
      .catch((error) => {
        if (error.status === 401) navigate('/admin/login');
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, [id, navigate, recoveryKey]);

  useEffect(() => {
    if (!document) return;
    try {
      if (dirty)
        sessionStorage.setItem(
          recoveryKey,
          JSON.stringify({
            guests: document.guests,
            messageTemplate: document.messageTemplate,
            revision: document.revision,
          }),
        );
      else sessionStorage.removeItem(recoveryKey);
    } catch {
      return;
    }
  }, [document, dirty, recoveryKey]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function replaceGuests(guests) {
    setDocument((current) => ({ ...current, guests }));
    setNotice('Perubahan siap disimpan.');
    setError('');
  }

  function saveGuest(guest) {
    if (
      document.guests.some(
        (item) =>
          item.id !== guest.id &&
          guestNameKey(item.name) === guestNameKey(guest.name),
      )
    )
      throw new Error(
        'Nama sudah ada. Tambahkan pembeda jika tamunya berbeda.',
      );
    if (!editing && document.guests.length >= GUEST_LIMIT)
      throw new Error('Daftar tamu sudah mencapai 5.000 nama.');
    replaceGuests(
      editing
        ? document.guests.map((item) => (item.id === guest.id ? guest : item))
        : [...document.guests, guest],
    );
    setEditing(null);
  }

  async function save() {
    setBusy('save');
    setError('');
    setNotice('');
    try {
      const messageError = guestMessageError(document.messageTemplate);
      if (messageError) throw new Error(messageError);
      if (
        new Blob([
          JSON.stringify({
            guests: document.guests,
            revision: document.revision,
            messageTemplate: document.messageTemplate,
          }),
        ]).size > 2097152
      )
        throw new Error(
          'Daftar terlalu besar untuk disimpan. Persingkat catatan atau kurangi jumlah nama.',
        );
      const { data } = await adminService.saveGuestList(
        id,
        document.guests,
        document.revision,
        document.messageTemplate,
      );
      setDocument((current) => ({ ...current, ...data }));
      setSaved(guestDocumentSnapshot({ ...document, ...data }));
      setNotice('Daftar tamu berhasil disimpan.');
    } catch (error) {
      if (error.status === 401) navigate('/admin/login');
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function importFile(file) {
    setBusy('import');
    setError('');
    setPreview(null);
    try {
      setPreview(await processGuestSpreadsheet('import', file));
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  function applyImport() {
    try {
      const merged = mergeGuests(document.guests, preview.guests);
      replaceGuests(merged.guests);
      setNotice(
        merged.added
          ? `${merged.added} nama ditambahkan, ${merged.duplicates} nama yang sudah ada dilewati. Klik Simpan daftar tamu untuk menyimpan.`
          : `Tidak ada nama baru. ${merged.duplicates} nama yang sudah ada dilewati.`,
      );
      setPreview(null);
      setPage(0);
    } catch (error) {
      setError(error.message);
    }
  }

  async function exportFile() {
    setBusy('export');
    setError('');
    try {
      const links = Object.fromEntries(
        document.guests.map((guest) => [
          guest.id,
          document.invitation.status === 'published'
            ? invitationGuestUrl(document.invitation.slug, guest.name)
            : '',
        ]),
      );
      const result = await processGuestSpreadsheet('export', {
        guests: document.guests,
        links,
      });
      downloadGuestSpreadsheet(
        result,
        `daftar-tamu-${document.invitation.slug}.xlsx`,
      );
      setNotice(
        'Excel berhasil diekspor dengan seluruh nama, termasuk perubahan yang belum disimpan.',
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function copy(guest) {
    try {
      await navigator.clipboard.writeText(
        invitationGuestUrl(document.invitation.slug, guest.name),
      );
      setNotice(`Link untuk ${guest.name} berhasil disalin.`);
    } catch {
      setError(
        'Link belum bisa disalin otomatis. Gunakan ekspor Excel untuk menyalinnya.',
      );
    }
  }

  if (!document)
    return (
      <section className="admin-panel">
        <p role="status">{error || 'Memuat daftar tamu…'}</p>
        <Link to="/admin">Kembali ke dashboard</Link>
      </section>
    );

  const { guests, invitation } = document;
  const sent = guests.filter((guest) => guest.sent).length;
  const filtered = guests.filter(
    (guest) =>
      `${guest.name} ${guest.phone} ${guest.group}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()) &&
      (filter === 'all' || (filter === 'sent' ? guest.sent : !guest.sent)),
  );
  const lastPage = Math.max(0, Math.ceil(filtered.length / PAGE_SIZE) - 1);
  const currentPage = Math.min(page, lastPage);
  const visible = filtered.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  return (
    <div className="guest-list-page">
      <header className="admin-page-heading">
        <div>
          <Link className="admin-back" to={`/admin/undangan/${id}`}>
            ← Detail undangan
          </Link>
          <h1>Daftar tamu.</h1>
          <p>{invitation.title}</p>
        </div>
        <div className="admin-actions">
          <button
            className="admin-button secondary"
            disabled={!!busy}
            onClick={exportFile}
          >
            Ekspor Excel
          </button>
          <button
            className="admin-button"
            disabled={!!busy || !dirty}
            onClick={save}
          >
            {busy === 'save' ? 'Menyimpan…' : 'Simpan daftar tamu'}
          </button>
        </div>
      </header>
      <div className="guest-save-state" role="status">
        <span className={dirty ? 'guest-dirty' : ''}>
          {dirty
            ? '● Ada perubahan belum disimpan'
            : '✓ Semua perubahan tersimpan'}
        </span>
        {document.updatedAt && (
          <small>
            Terakhir disimpan{' '}
            {new Date(document.updatedAt).toLocaleString('id-ID')}
          </small>
        )}
      </div>
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
      {invitation.status !== 'published' && (
        <div className="guest-draft-note">
          <strong>Undangan masih draft.</strong>
          <p>
            Daftar tamu bisa disiapkan sekarang. Terbitkan undangan di halaman
            detail agar link pribadi dapat dibagikan.
          </p>
        </div>
      )}
      <div className="admin-stats">
        <article>
          <span>Total tamu</span>
          <strong>{guests.length.toLocaleString('id-ID')}</strong>
        </article>
        <article>
          <span>Ditandai sudah dikirim</span>
          <strong>{sent.toLocaleString('id-ID')}</strong>
        </article>
        <article>
          <span>Belum dikirim</span>
          <strong>{(guests.length - sent).toLocaleString('id-ID')}</strong>
        </article>
      </div>
      <GuestImportPanel
        busy={!!busy}
        preview={preview}
        onSelect={importFile}
        onApply={applyImport}
        onCancel={() => setPreview(null)}
      />
      <GuestMessageEditor
        value={document.messageTemplate}
        invitation={invitation}
        sampleName={guests[0]?.name}
        disabled={!!busy}
        onChange={(messageTemplate) => {
          setDocument((current) => ({ ...current, messageTemplate }));
          setNotice(
            'Pesan diperbarui. Klik Simpan daftar tamu untuk menyimpan.',
          );
          setError('');
        }}
      />
      <div ref={formAnchor}>
        <GuestEntryForm
          key={editing?.id || 'new'}
          guest={editing}
          onSave={saveGuest}
          onCancel={() => setEditing(null)}
          disabled={!!busy}
        />
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Nama yang ingin kamu undang</h2>
            <p>
              Nama otomatis tampil pada cover melalui link pribadi. Status kirim
              ditandai manual setelah Anda mengirim pesan.
            </p>
          </div>
          <span className="guest-capacity">
            {guests.length.toLocaleString('id-ID')} / 5.000 nama
          </span>
        </div>
        <div className="admin-form guest-filters">
          <label>
            Cari tamu
            <input
              type="search"
              placeholder="Nama, nomor, atau kelompok…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
            />
          </label>
          <label>
            Status kirim
            <select
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
                setPage(0);
              }}
            >
              <option value="all">Semua tamu</option>
              <option value="unsent">Belum dikirim</option>
              <option value="sent">Sudah dikirim</option>
            </select>
          </label>
        </div>
        {visible.length ? (
          <GuestListTable
            guests={visible}
            invitation={invitation}
            messageTemplate={document.messageTemplate}
            busy={!!busy}
            onEdit={(guest) => {
              setEditing(guest);
              formAnchor.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            onRemove={(guestId) => {
              replaceGuests(guests.filter((guest) => guest.id !== guestId));
              if (editing?.id === guestId) setEditing(null);
            }}
            onToggle={(guestId) =>
              replaceGuests(
                guests.map((guest) =>
                  guest.id === guestId
                    ? { ...guest, sent: !guest.sent }
                    : guest,
                ),
              )
            }
            onCopy={copy}
          />
        ) : (
          <div className="admin-empty">
            <h3>
              {guests.length
                ? 'Nama belum ditemukan.'
                : 'Tamu pertama dimulai di sini.'}
            </h3>
            <p>
              {guests.length
                ? 'Coba kata pencarian atau status lainnya.'
                : 'Tambahkan satu per satu atau gunakan impor Excel.'}
            </p>
          </div>
        )}
        <div className="admin-pagination">
          <button
            className="admin-button secondary"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
          >
            Sebelumnya
          </button>
          <span>
            {filtered.length.toLocaleString('id-ID')} nama · Halaman{' '}
            {currentPage + 1} / {lastPage + 1}
          </span>
          <button
            className="admin-button secondary"
            disabled={currentPage >= lastPage}
            onClick={() => setPage(currentPage + 1)}
          >
            Berikutnya
          </button>
        </div>
      </section>
    </div>
  );
}

export default function AdminGuestList() {
  const { id } = useParams();
  return <GuestList key={id} id={id} />;
}
