import { useEffect, useState } from 'react';
import { invitationService } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import { useInvitation } from './InvitationContext';
import Wishes1 from '../Wishes/Wishes1/Wishes1';
import Wishes2 from '../Wishes/Wishes2/Wishes2';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function Guestbook({ initialWishes = [], variant = 2 }) {
  const Wishes = variant === 1 ? Wishes1 : Wishes2;
  const invitation = useInvitation();
  const [searchParams] = useSearchParams();
  const recipientName = searchParams.get('to')?.trim() || '';
  const slug = invitation?.preview ? undefined : invitation?.slug;
  const [busy, setBusy] = useState(false);
  const [total, setTotal] = useState(0);
  const [wishes, setWishes] = useState(slug ? [] : initialWishes);

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    invitationService
      .wishes(slug, controller.signal)
      .then(({ data, meta }) => {
        setWishes(data);
        setTotal(meta.total);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus(error.message);
      });
    return () => controller.abort();
  }, [slug]);
  const [manualName, setName] = useState('');
  const name = recipientName || manualName;
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('Hadir');
  const [guestCount, setGuestCount] = useState(1);
  const normalizeName = (value) =>
    value.trim().normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
  const existingWish = wishes.find(
    (wish) => normalizeName(wish.name) === normalizeName(name),
  );

  async function submitWish(event) {
    event.preventDefault();
    if (busy || !name.trim() || !message.trim()) return;
    setBusy(true);
    setStatus('');
    let attendanceSaved = false;
    try {
      if (slug) {
        await invitationService.rsvp(slug, {
          name: name.trim(),
          attendance,
          guestCount: attendance === 'Tidak hadir' ? 0 : guestCount,
        });
        attendanceSaved = true;
        const { data: savedWish, meta } = await invitationService.sendWish(
          slug,
          {
            name: name.trim(),
            message: message.trim(),
          },
        );
        setWishes((current) => [
          savedWish,
          ...current.filter((wish) => wish.id !== savedWish.id),
        ]);
        setStatus(
          meta?.updated
            ? 'Kehadiran dan ucapan berhasil diperbarui.'
            : 'Kehadiran dan ucapan berhasil disimpan.',
        );
        try {
          const { data, meta } = await invitationService.wishes(slug);
          setWishes(data);
          setTotal(meta.total);
        } catch {
          setStatus(
            'Ucapan sudah tersimpan. Daftar terbaru belum dapat dimuat.',
          );
        }
      } else {
        setWishes([
          { name: name.trim(), message: message.trim(), attendance },
          ...wishes.filter(
            (wish) => normalizeName(wish.name) !== normalizeName(name),
          ),
        ]);
        setStatus(
          existingWish
            ? 'Ucapanmu diperbarui dalam preview ini.'
            : 'Terima kasih! Ucapanmu ditampilkan dalam preview ini.',
        );
      }
    } catch (error) {
      setStatus(
        attendanceSaved
          ? `Kehadiran sudah tersimpan, tetapi ucapan belum berhasil disimpan: ${error.message} Silakan kirim ulang.`
          : error.message,
      );
    } finally {
      setBusy(false);
    }
  }

  async function loadMore() {
    setBusy(true);
    try {
      const { data, meta } = await invitationService.wishes(
        slug,
        undefined,
        wishes.length,
      );
      setWishes((current) => [
        ...current,
        ...data.filter((item) => !current.some((wish) => wish.id === item.id)),
      ]);
      setTotal(meta.total);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Wishes>
      <form className="invitation-form" onSubmit={submitWish}>
        <label>
          Nama
          <input
            required
            maxLength={80}
            value={name}
            readOnly={Boolean(recipientName)}
            disabled={busy}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nama kamu"
          />
        </label>
        <label>
          Kehadiran
          <select
            value={attendance}
            disabled={busy}
            onChange={(event) => setAttendance(event.target.value)}
          >
            <option>Hadir</option>
            <option>Belum pasti</option>
            <option>Tidak hadir</option>
          </select>
        </label>
        {slug && attendance !== 'Tidak hadir' && (
          <label>
            Jumlah tamu
            <input
              type="number"
              required
              min={1}
              max={20}
              value={guestCount}
              onChange={(event) => setGuestCount(Number(event.target.value))}
              disabled={busy}
            />
          </label>
        )}
        <label>
          Ucapan
          <textarea
            required
            rows={4}
            maxLength={600}
            value={message}
            disabled={busy}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tuliskan doa dan harapan baikmu…"
          />
        </label>
        <button className="invitation-button" type="submit" disabled={busy}>
          {busy
            ? 'Memproses…'
            : existingWish
              ? 'Perbarui ucapan ♡'
              : 'Kirim ucapan ♡'}
        </button>
        {!slug && (
          <small>
            Mode demo: ucapan hanya tersimpan selama halaman ini dibuka.
          </small>
        )}
        <p className="invitation-form-status" role="status">
          {status}
        </p>
      </form>
      {slug && <p>{total} ucapan tersimpan</p>}
      <div className="invitation-wishes-list">
        {wishes.map((wish, index) => (
          <ScrollReveal
            as="article"
            animationClass="animate-soft-rise"
            delay={`delay-${Math.min((index % 5) * 100, 900)}`}
            key={`${wish.name}-${index}`}
          >
            <div className="invitation-wish-avatar" aria-hidden="true">
              {wish.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{wish.name}</strong>
              <span>{wish.attendance || 'Doa & harapan'}</span>
              <p>{wish.message}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      {slug && wishes.length < total && (
        <button
          type="button"
          className="invitation-button invitation-button-outline"
          onClick={loadMore}
          disabled={busy}
        >
          Muat ucapan lainnya
        </button>
      )}
    </Wishes>
  );
}
