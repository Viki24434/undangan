import { useInvitation } from './InvitationContext';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FloralDecoration from './FloralDecoration';
import GuestGuide from './GuestGuide';
import InvitationMusic from './InvitationMusic';
import Cover1 from '../Cover/Cover1/Cover1';
import Cover2 from '../Cover/Cover2/Cover2';
import Hero1 from '../Hero/Hero1/Hero1';
import Hero2 from '../Hero/Hero2/Hero2';
import './Invitation.css';

export default function InvitationLayout({
  theme,
  title,
  subtitle,
  image,
  date,
  monogram,
  variants = {},
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
  const Cover = variants.cover === 1 ? Cover1 : Cover2;
  const Hero = variants.hero === 1 ? Hero1 : Hero2;

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
        variants.cover === 1 ? (
          <Cover
            title={displayTitle}
            subtitle={subtitle}
            guestName={invitation?.guestName}
            onOpen={openInvitation}
            isOpened={false}
            bgImage={image}
          />
        ) : (
          <Cover
            title={displayTitle}
            subtitle={subtitle}
            date={date}
            monogram={monogram}
            image={image}
            onOpen={openInvitation}
          >
            <FloralDecoration />
          </Cover>
        )
      ) : (
        <main className="invitation-content" ref={contentRef} tabIndex={-1}>
          {variants.hero === 1 ? (
            <Hero
              bgImage={image}
              subtitle={subtitle}
              title={displayTitle}
              quote={date}
            >
              <FloralDecoration />
            </Hero>
          ) : (
            <Hero
              image={image}
              subtitle={subtitle}
              title={displayTitle}
              date={date}
            >
              <FloralDecoration />
            </Hero>
          )}
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
