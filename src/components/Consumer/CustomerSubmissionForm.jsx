import { useState } from 'react';
import { sendCustomerSubmission } from '../../services/customerSubmissions';

export default function CustomerSubmissionForm({
  form,
  guestList,
  onBusyChange,
}) {
  const [contact, setContact] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem('ciptain:customer-contact') || 'null',
        ) || { name: '', phone: '', note: '' }
      );
    } catch {
      return { name: '', phone: '', note: '' };
    }
  });
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    onBusyChange(true);
    setError('');
    setReceipt(null);
    try {
      try {
        localStorage.setItem(
          'ciptain:customer-contact',
          JSON.stringify(contact),
        );
      } catch {
        setProgress('Menyiapkan pengiriman…');
      }
      setReceipt(
        await sendCustomerSubmission(form, guestList, contact, setProgress),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
      onBusyChange(false);
      setProgress('');
    }
  }

  return (
    <section className="admin-panel consumer-submission">
      <div className="admin-panel-heading">
        <div>
          <h2>Kirim hasil edit ke admin</h2>
          <p>
            Admin akan menerima isi undangan, gambar pilihan, daftar tamu, dan
            pesan WhatsApp untuk ditinjau.
          </p>
        </div>
      </div>
      <div className="consumer-submission-summary">
        <strong>{form.title}</strong>
        <span>{guestList.guests.length.toLocaleString('id-ID')} nama tamu</span>
        <span>Undangan diterbitkan setelah diproses admin.</span>
      </div>
      <form className="admin-form" onSubmit={submit}>
        <fieldset disabled={busy}>
          <div className="admin-field-grid">
            <label>
              Nama pengirim
              <input
                required
                maxLength={80}
                value={contact.name}
                autoComplete="name"
                onChange={(event) =>
                  setContact({ ...contact, name: event.target.value })
                }
              />
            </label>
            <label>
              WhatsApp pengirim
              <input
                required
                type="tel"
                maxLength={30}
                value={contact.phone}
                autoComplete="tel"
                placeholder="081234567890"
                onChange={(event) =>
                  setContact({ ...contact, phone: event.target.value })
                }
              />
            </label>
          </div>
          <label>
            Catatan untuk admin
            <textarea
              rows={4}
              maxLength={1000}
              value={contact.note}
              aria-label="Catatan untuk admin"
              placeholder="Tuliskan permintaan atau detail yang perlu diperhatikan."
              onChange={(event) =>
                setContact({ ...contact, note: event.target.value })
              }
            />
          </label>
        </fieldset>
        <p>
          Dengan menekan tombol kirim, data yang tercantum di atas dikirim ke
          admin. Salinan di browser tetap tersedia.
        </p>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        {progress && <p role="status">{progress}</p>}
        {receipt && (
          <div className="admin-success" role="status">
            <strong>
              {receipt.status === 'accepted'
                ? 'Kiriman sudah diproses menjadi draft oleh admin.'
                : receipt.status === 'rejected'
                  ? 'Kiriman ini belum disetujui admin. Hubungi admin untuk tindak lanjut.'
                  : 'Berhasil dikirim. Menunggu tinjauan admin.'}
            </strong>
            <p>Nomor kiriman: {receipt.reference}</p>
          </div>
        )}
        <div className="admin-actions">
          <button type="submit" className="admin-button" disabled={busy}>
            {busy ? 'Mengirim…' : 'Kirim ke admin'}
          </button>
        </div>
      </form>
    </section>
  );
}
