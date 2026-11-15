import { useState } from 'react';
import { adminService } from '../../services/adminService';

export default function CustomerPreviewShare({ invitationId, title }) {
  const [link, setLink] = useState('');
  const [expires, setExpires] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  async function change(revoke = false) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (revoke) {
        await adminService.revokeCustomerPreview(invitationId);
        setLink('');
        setNotice('Link preview sebelumnya sudah dinonaktifkan.');
      } else {
        const { data } = await adminService.createCustomerPreview(invitationId);
        setLink(new URL(data.path, window.location.origin).href);
        setExpires(new Date(data.expiresAt).toLocaleString('id-ID'));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setNotice('Link preview berhasil disalin.');
    } catch {
      setNotice('Salin alamat dari kolom link preview di bawah.');
    }
  }
  const message = `Halo, berikut preview undangan ${title || ''} untuk diperiksa:\n\n${link}\n\nSilakan cek nama, foto, jadwal, lokasi, dan detail lainnya. Jika ada revisi, balas pesan ini. Setelah hasilnya disetujui, kami akan menerbitkan dan mengirimkan link undangan final.\n\nTerima kasih.`;
  return (
    <section className="admin-panel">
      <h2>Preview untuk customer</h2>
      <p>
        Simpan perubahan undangan terlebih dahulu. Link menampilkan versi
        terakhir yang tersimpan, berlaku 7 hari, dan dapat dibuka tanpa login
        admin.
      </p>
      <div className="admin-actions" style={{ marginTop: 18 }}>
        <button
          type="button"
          className="admin-button secondary"
          disabled={busy}
          onClick={() => change()}
        >
          {link ? 'Ganti link preview' : 'Buat link preview customer'}
        </button>
        <button
          type="button"
          className="admin-button secondary"
          disabled={busy}
          onClick={() => change(true)}
        >
          Nonaktifkan link preview
        </button>
      </div>
      <p>
        Link baru menggantikan link sebelumnya. Preview tidak menerbitkan
        undangan.
      </p>
      {link && (
        <div className="admin-form" style={{ marginTop: 18 }}>
          <label>
            Link preview customer
            <input
              aria-label="Link preview customer"
              readOnly
              value={link}
              onFocus={(event) => event.target.select()}
            />
          </label>
          <small>Berlaku sampai {expires}</small>
          <div className="admin-actions">
            <button type="button" className="admin-button" onClick={copy}>
              Salin link preview
            </button>
            <a
              className="admin-button secondary"
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bagikan lewat WhatsApp ↗
            </a>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Buka preview ↗
            </a>
          </div>
        </div>
      )}
      {notice && (
        <p className="admin-success" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
