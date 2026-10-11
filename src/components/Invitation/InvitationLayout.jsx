import { useInvitation } from './InvitationContext';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FloralDecoration from './FloralDecoration';
import GuestGuide from './GuestGuide';
import InvitationMusic from './InvitationMusic';
import './Invitation.css';

export default function InvitationLayout({
  theme,
  title,
  subtitle,
  image,
  date,
  monogram,
  children,
}) {
  const invitation = useInvitation();
  const displayTitle = invitation?.title || title;
  const [opened, setOpened] = useState(false);
  const contentRef = useRef(null);
  const musicRef = useRef(null);
  const musicEnabled = invitation?.data.musicEnabled !== false;
  const defaultMusic = /birthday/.test(theme)
    ? '/audio/celebration.wav'
    : /celestial|moon/.test(theme)
      ? '/audio/starlight.wav'
      : '/audio/romance.wav';
  const musicUrl = invitation?.data.musicUrl || defaultMusic;

  function openInvitation() {
    setOpened(true);
    if (musicEnabled) musicRef.current?.play();
    requestAnimationFrame(() => contentRef.current?.focus());
  }

  return (
    <div className={`celebration-template ${theme}`}>
      {musicEnabled && (
        <InvitationMusic ref={musicRef} src={musicUrl} visible={opened} />
      )}
      {!opened ? (
        <section
          className="invitation-cover"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="invitation-cover-shade" />
          <FloralDecoration />
          <div className="invitation-cover-frame">
            <span className="invitation-monogram">{monogram}</span>
            <span className="invitation-kicker">{subtitle}</span>
            <h1>{displayTitle}</h1>
            <p className="invitation-date">{date}</p>
            <span className="invitation-divider" aria-hidden="true">
              ✧
            </span>
            <p>Kepada orang-orang tersayang</p>
            <h2>Tamu Undangan</h2>
            <button className="invitation-button" onClick={openInvitation}>
              Buka undangan <span aria-hidden="true">↗</span>
            </button>
            <Link className="invitation-back" to="/katalog">
              Kembali ke katalog
            </Link>
          </div>
        </section>
      ) : (
        <main className="invitation-content" ref={contentRef} tabIndex={-1}>
          <section
            className="invitation-hero"
            style={{ backgroundImage: `url(${image})` }}
          >
            <FloralDecoration />
            <div className="invitation-hero-copy">
              <span className="invitation-kicker">{subtitle}</span>
              <h1>{displayTitle}</h1>
              <span className="invitation-divider" aria-hidden="true">
                ✧
              </span>
              <p>{date}</p>
              <a className="invitation-scroll" href="#invitation-intro">
                Jelajahi cerita kami ↓
              </a>
            </div>
          </section>
          <nav className="invitation-section-nav" aria-label="Bagian undangan">
            <a href="#invitation-intro">Pembuka</a>
            <a href="#invitation-events">Acara</a>
            <a href="#invitation-gallery">Galeri</a>
            <a href="#invitation-wishes">Ucapan</a>
          </nav>
          {children}
          <GuestGuide />
          <footer className="invitation-closing">
            <FloralDecoration variant="bouquet" />
            <span className="invitation-monogram">{monogram}</span>
            <span className="invitation-kicker">WITH LOVE & GRATITUDE</span>
            <h2>Terima kasih</h2>
            <p>
              Kehadiran dan doa baikmu menjadi bagian terindah dari hari
              istimewa ini.
            </p>
            <h3>{displayTitle}</h3>
            <Link to="/katalog">Temukan undanganmu di InviteKu ↗</Link>
          </footer>
        </main>
      )}
    </div>
  );
}
