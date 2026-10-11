import { useEffect, useState } from 'react';
import { invitationService } from '../../services/api';
import { useInvitation } from './InvitationContext';
import RsvpForm from './RsvpForm';
import Wishes1 from '../Wishes/Wishes1/Wishes1';
import Wishes2 from '../Wishes/Wishes2/Wishes2';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function Guestbook({ initialWishes = [], variant = 2 }) {
  const Wishes = variant === 1 ? Wishes1 : Wishes2;
  const invitation = useInvitation();
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
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('Hadir');

  async function submitWish(event) {
    event.preventDefault();
    if (busy || !name.trim() || !message.trim()) return;
    setBusy(true);
    setStatus('');
    try {
      if (slug) {
        await invitationService.sendWish(slug, {
          name: name.trim(),
          message: message.trim(),
        });
        setName('');
        setMessage('');
        setStatus('Ucapan berhasil disimpan.');
        try {
          const { data, meta } = await invitationService.wishes(slug);
          setWishes(data);
          setTotal(meta.total);
        } catch {
          setStatus(
            'Ucapan sudah tersimpan. Muat ulang halaman untuk melihat daftar terbaru.',
          );
        }
      } else {
        setWishes([
          { name: name.trim(), message: message.trim(), attendance },
          ...wishes,
        ]);
        setName('');
        setMessage('');
        setStatus('Terima kasih! Ucapanmu ditampilkan dalam preview ini.');
      }
    } catch (error) {
      setStatus(error.message);
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
      {slug && (
        <ScrollReveal animationClass="animate-soft-rise">
          <RsvpForm slug={slug} />
        </ScrollReveal>
      )}
      <form className="invitation-form" onSubmit={submitWish}>
        <label>
          Nama
          <input
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nama kamu"
          />
        </label>
        {!slug && (
          <label>
            Kehadiran
            <select
              value={attendance}
              onChange={(event) => setAttendance(event.target.value)}
            >
              <option>Hadir</option>
              <option>Belum pasti</option>
              <option>Tidak hadir</option>
            </select>
          </label>
        )}
        <label>
          Ucapan
          <textarea
            required
            rows={4}
            maxLength={600}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tuliskan doa dan harapan baikmu…"
          />
        </label>
        <button className="invitation-button" type="submit" disabled={busy}>
          {busy ? 'Memproses…' : 'Kirim ucapan ♡'}
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
