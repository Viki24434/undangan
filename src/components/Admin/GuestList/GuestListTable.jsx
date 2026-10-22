import { useState } from 'react';
import { guestWhatsAppUrl } from '../../../services/guestList';

export default function GuestListTable({
  guests,
  invitation,
  messageTemplate,
  busy,
  onEdit,
  onRemove,
  onToggle,
  onCopy,
}) {
  const [confirmId, setConfirmId] = useState('');
  return (
    <div className="admin-table-wrap guest-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nama tamu</th>
            <th>WhatsApp / kelompok</th>
            <th>Status kirim</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => {
            const whatsapp = guestWhatsAppUrl(
              guest,
              invitation,
              messageTemplate,
            );
            const published = invitation.status === 'published';
            return (
              <tr key={guest.id}>
                <td data-label="Nama tamu">
                  <strong>{guest.name}</strong>
                  <small>{guest.note}</small>
                </td>
                <td data-label="WhatsApp / kelompok">
                  {guest.phone || '—'}
                  <small>{guest.group || 'Tanpa kelompok'}</small>
                </td>
                <td data-label="Status kirim">
                  <label className="guest-sent-toggle">
                    <input
                      type="checkbox"
                      checked={guest.sent}
                      disabled={busy}
                      onChange={() => onToggle(guest.id)}
                    />
                    {guest.sent ? 'Sudah dikirim' : 'Belum dikirim'}
                  </label>
                </td>
                <td data-label="Aksi">
                  <div className="admin-actions guest-row-actions">
                    <button
                      disabled={busy || !published}
                      onClick={() => onCopy(guest)}
                    >
                      Salin link
                    </button>
                    {published && whatsapp && (
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp ↗
                      </a>
                    )}
                    <button disabled={busy} onClick={() => onEdit(guest)}>
                      Edit
                    </button>
                    <button
                      className="admin-text-danger"
                      disabled={busy}
                      onClick={() => setConfirmId(guest.id)}
                    >
                      Hapus
                    </button>
                  </div>
                  {confirmId === guest.id && (
                    <div className="guest-delete-confirm">
                      <span>Hapus {guest.name}?</span>
                      <button
                        className="admin-text-danger"
                        disabled={busy}
                        onClick={() => {
                          onRemove(guest.id);
                          setConfirmId('');
                        }}
                      >
                        Ya, hapus
                      </button>
                      <button disabled={busy} onClick={() => setConfirmId('')}>
                        Batal
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
