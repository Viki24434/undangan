import { useRef, useState } from 'react';
import GuestEntryForm from '../Admin/GuestList/GuestEntryForm';
import GuestImportPanel from '../Admin/GuestList/GuestImportPanel';
import GuestListTable from '../Admin/GuestList/GuestListTable';
import GuestMessageEditor from '../Admin/GuestList/GuestMessageEditor';
import {
  GUEST_LIMIT,
  guestNameKey,
  invitationGuestUrl,
  mergeGuests,
  normalizeInvitationUrl,
} from '../../services/guestList';
import {
  downloadGuestSpreadsheet,
  processGuestSpreadsheet,
} from '../../services/guestSpreadsheet';
import '../Admin/GuestList/GuestList.css';

const PAGE_SIZE = 25;

export default function ConsumerGuestManager({
  value,
  title,
  templateId,
  onChange,
  onPreview,
  onBusyChange,
}) {
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const formAnchor = useRef(null);
  const { guests } = value;
  let url = '';
  let urlError = '';
  try {
    url = normalizeInvitationUrl(value.invitationUrl);
  } catch (error) {
    urlError = error.message;
  }
  const invitation = { title, url, status: url ? 'published' : 'draft' };
  const sent = guests.filter((guest) => guest.sent).length;
  const filtered = guests.filter(
    (guest) =>
      `${guest.name} ${guest.phone} ${guest.group}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (filter === 'all' || (filter === 'sent' ? guest.sent : !guest.sent)),
  );
  const lastPage = Math.max(0, Math.ceil(filtered.length / PAGE_SIZE) - 1);
  const currentPage = Math.min(page, lastPage);

  function change(patch) {
    onChange({ ...value, ...patch });
    setError('');
    setNotice('');
  }

  function saveGuest(guest) {
    if (
      guests.some(
        (item) =>
          item.id !== guest.id &&
          guestNameKey(item.name) === guestNameKey(guest.name),
      )
    )
      throw new Error(
        'Nama sudah ada. Tambahkan pembeda jika tamunya berbeda.',
      );
    if (!editing && guests.length >= GUEST_LIMIT)
      throw new Error('Daftar tamu maksimal 5.000 nama.');
    change({
      guests: editing
        ? guests.map((item) => (item.id === guest.id ? guest : item))
        : [...guests, guest],
    });
    setEditing(null);
  }

  async function spreadsheet(type, file) {
    setBusy(type);
    onBusyChange(true);
    setError('');
    try {
      if (type === 'import') {
        setPreview(null);
        setPreview(await processGuestSpreadsheet('import', file));
      } else {
        const links = Object.fromEntries(
          guests.map((guest) => [
            guest.id,
            invitationGuestUrl(undefined, guest.name, url),
          ]),
        );
        const buffer = await processGuestSpreadsheet('export', {
          guests,
          links,
        });
        downloadGuestSpreadsheet(buffer, `daftar-tamu-${templateId}.xlsx`);
        setNotice('Daftar tamu berhasil diekspor ke Excel.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy('');
      onBusyChange(false);
    }
  }

  function applyImport() {
    try {
      const result = mergeGuests(guests, preview.guests);
      change({ guests: result.guests });
      setPreview(null);
      setPage(0);
      setNotice(
        `${result.added} nama ditambahkan, ${result.duplicates} nama yang sudah ada dilewati.`,
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function copy(guest) {
    try {
      await navigator.clipboard.writeText(
        invitationGuestUrl(undefined, guest.name, url),
      );
      setNotice(`Link untuk ${guest.name} berhasil disalin.`);
    } catch {
      setError(
        'Link belum dapat disalin. Gunakan ekspor Excel untuk menyalinnya.',
      );
    }
  }

  return (
    <div className="guest-list-page consumer-guests">
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Daftar tamu & pesan</h2>
            <p>
              Kelola nama, kelompok, catatan, dan pesan WhatsApp dari perangkat
              ini.
            </p>
          </div>
          <button
            type="button"
            className="admin-button secondary"
            disabled={!!busy}
            onClick={() => spreadsheet('export')}
          >
            {busy === 'export' ? 'Mengekspor…' : 'Ekspor Excel'}
          </button>
        </div>
        <div className="admin-form">
          <label>
            Link undangan yang sudah terbit
            <input
              type="text"
              inputMode="url"
              placeholder="https://domain-anda.com/u/nama-undangan"
              value={value.invitationUrl}
              maxLength={2000}
              disabled={!!busy}
              aria-invalid={!!urlError}
              aria-describedby="consumer-guest-url-help"
              onChange={(event) =>
                change({ invitationUrl: event.target.value })
              }
            />
          </label>
          <p id="consumer-guest-url-help">
            Isi dengan link dari admin setelah undangan diterbitkan untuk
            menyalin link pribadi dan membuka WhatsApp. Sebelum terbit, Anda
            tetap dapat menyiapkan daftar dan mencoba preview dengan nama tamu.
          </p>
        </div>
        {urlError && (
          <p className="admin-error" role="alert">
            {urlError}
          </p>
        )}
      </section>
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
        onSelect={(file) => spreadsheet('import', file)}
        onApply={applyImport}
        onCancel={() => setPreview(null)}
      />
      <GuestMessageEditor
        value={value.messageTemplate}
        invitation={invitation}
        sampleName={guests[0]?.name}
        disabled={!!busy}
        saveHint="Perubahan disimpan otomatis di browser perangkat ini."
        onChange={(messageTemplate) => change({ messageTemplate })}
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
              Gunakan Preview untuk mencoba nama pada cover. Status kirim
              ditandai manual setelah pesan dikirim.
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
        {filtered.length ? (
          <GuestListTable
            guests={filtered.slice(
              currentPage * PAGE_SIZE,
              (currentPage + 1) * PAGE_SIZE,
            )}
            invitation={invitation}
            messageTemplate={value.messageTemplate}
            busy={!!busy}
            onPreview={onPreview}
            onCopy={copy}
            onEdit={(guest) => {
              setEditing(guest);
              formAnchor.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            onRemove={(id) => {
              change({ guests: guests.filter((guest) => guest.id !== id) });
              if (editing?.id === id) setEditing(null);
            }}
            onToggle={(id) =>
              change({
                guests: guests.map((guest) =>
                  guest.id === id ? { ...guest, sent: !guest.sent } : guest,
                ),
              })
            }
          />
        ) : (
          <div className="admin-empty">
            <h3>
              {guests.length ? 'Nama belum ditemukan.' : 'Belum ada tamu.'}
            </h3>
            <p>Tambahkan nama secara manual atau impor daftar dari Excel.</p>
          </div>
        )}
        <div className="admin-pagination">
          <button
            type="button"
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
            type="button"
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
