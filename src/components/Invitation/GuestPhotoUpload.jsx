import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInvitation } from './InvitationContext';
import { prepareImage } from '../../services/imageFiles';
import { invitationService } from '../../services/api';
import './GuestPhotoUpload.css';

export default function GuestPhotoUpload({ platinum }) {
  const invitation = useInvitation();
  const [params] = useSearchParams();
  const recipient = params.get('to')?.trim() || '';
  const [manualName, setManualName] = useState('');
  const [now, setNow] = useState(Date.now);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const fileInput = useRef(null);
  const name = recipient || manualName.trim();
  const preview = !invitation?.slug || invitation?.preview;
  const start = Date.parse(invitation?.eventDate);
  const started = Number.isFinite(start) && now >= start;

  useEffect(() => {
    if (!platinum || preview || !Number.isFinite(start) || started)
      return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [platinum, preview, start, started]);

  async function submit(event) {
    event.preventDefault();
    if (busy || preview || !started || !name || !files.length) return;
    setBusy(true);
    setStatus('');
    let sent = 0;
    try {
      for (const file of files) {
        setStatus(`Mengirim foto ${sent + 1} dari ${files.length}…`);
        const blob = await prepareImage(file);
        await invitationService.sendPhoto(invitation.slug, name, blob);
        sent += 1;
      }
      setStatus(
        `${sent} foto berhasil dikirim. Terima kasih sudah berbagi momen!`,
      );
    } catch (error) {
      setStatus(
        `${sent ? `${sent} foto sudah terkirim. ` : ''}${error.message} Foto yang belum terkirim tetap dipilih.`,
      );
    } finally {
      setFiles((current) => current.slice(sent));
      if (fileInput.current) fileInput.current.value = '';
      setBusy(false);
    }
  }

  if (!platinum) return null;

  return (
    <section
      className="invitation-section guest-photo-upload"
      id="invitation-guest-photos"
    >
      <span className="invitation-kicker">CAPTURE OUR DAY</span>
      <h2>Momen dari sudutmu.</h2>
      <p>
        Abadikan kebahagiaan hari ini dan kirimkan foto terbaikmu untuk kami.
      </p>
      {preview ? (
        <p className="guest-photo-upload__notice">
          Kirim foto tersedia pada undangan yang sudah dipublikasikan, setelah
          acara dimulai.
        </p>
      ) : !started ? (
        <p className="guest-photo-upload__notice" role="status">
          Kirim foto akan dibuka saat acara dimulai
          {Number.isFinite(start) &&
            `, ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(start)} WIB`}
          .
        </p>
      ) : (
        <form className="invitation-form" onSubmit={submit}>
          <label>
            Nama pengirim
            <input
              required
              maxLength={80}
              value={recipient || manualName}
              readOnly={Boolean(recipient)}
              disabled={busy}
              onChange={(event) => setManualName(event.target.value)}
              placeholder="Nama kamu"
            />
          </label>
          <label>
            Pilih foto
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={busy}
              onChange={(event) => {
                const selected = Array.from(event.target.files || []);
                if (selected.length > 10) {
                  setStatus('Pilih maksimal 10 foto dalam satu pengiriman.');
                  event.target.value = '';
                  return;
                }
                setFiles(selected);
                setStatus('');
              }}
            />
          </label>
          <small>
            JPG, PNG, atau WebP, maksimal 10 MB per foto. Foto dikirim satu per
            satu dan nama kamu ditambahkan pada nama file.
          </small>
          {files.length > 0 && (
            <ul className="guest-photo-upload__files">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>{file.name}</li>
              ))}
            </ul>
          )}
          <button
            className="invitation-button"
            type="submit"
            disabled={busy || !name || !files.length}
          >
            {busy
              ? 'Mengirim foto…'
              : `Kirim${files.length ? ` ${files.length}` : ''} foto`}
          </button>
          <p
            className="invitation-form-status"
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
          <small>Foto diterima oleh penyelenggara melalui admin.</small>
        </form>
      )}
    </section>
  );
}
