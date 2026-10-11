import { useState } from 'react';
import { invitationService } from '../../services/api';

export default function RsvpForm({ slug }) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('Hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [saved, setSaved] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy || saved || !name.trim()) return;
    setBusy(true);
    setStatus('');
    try {
      await invitationService.rsvp(slug, {
        name: name.trim(),
        attendance,
        guestCount: attendance === 'Tidak hadir' ? 0 : guestCount,
        note: note.trim(),
      });
      setSaved(true);
      setStatus('Terima kasih! Konfirmasi kehadiranmu sudah tersimpan.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="invitation-rsvp">
      <h3>Konfirmasi kehadiran</h3>
      <form className="invitation-form" onSubmit={submit}>
        <label>
          Nama
          <input
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={busy || saved}
          />
        </label>
        <label>
          Kehadiran
          <select
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
            disabled={busy || saved}
          >
            <option>Hadir</option>
            <option>Belum pasti</option>
            <option>Tidak hadir</option>
          </select>
        </label>
        {attendance !== 'Tidak hadir' && (
          <label>
            Jumlah tamu
            <input
              type="number"
              min={1}
              max={20}
              required
              value={guestCount}
              onChange={(event) => setGuestCount(Number(event.target.value))}
              disabled={busy || saved}
            />
          </label>
        )}
        <label>
          Catatan
          <textarea
            rows={2}
            maxLength={600}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            disabled={busy || saved}
          />
        </label>
        <button
          className="invitation-button"
          type="submit"
          disabled={busy || saved}
        >
          {busy
            ? 'Menyimpan…'
            : saved
              ? 'Konfirmasi tersimpan'
              : 'Simpan kehadiran'}
        </button>
        <p role="status">{status}</p>
      </form>
    </div>
  );
}
