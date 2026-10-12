import { useInvitation } from './InvitationContext';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DecorationLayer from '../Ornament/DecorationLayer';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import { ornamentAssets } from '../Ornament/ornamentAssets';
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
  images = [],
  sunlightEnabled = true,
  date,
  monogram,
  variants = {},
  children,
}) {
  const invitation = useInvitation();
  const displayTitle = invitation?.title || title;
  const [opened, setOpened] = useState(false);
  const [coverOpening, setCoverOpening] = useState(false);
  const contentRef = useRef(null);
  const musicRef = useRef(null);
  const coverTimerRef = useRef(null);
  const musicEnabled = invitation?.data.musicEnabled !== false;
  const defaultMusic = /birthday/.test(theme)
    ? '/audio/celebration.wav'
    : /celestial|moon/.test(theme)
      ? '/audio/starlight.wav'
      : '/audio/romance.wav';
  const musicUrl = invitation?.data.musicUrl || defaultMusic;
  const Cover = variants.cover === 1 ? Cover1 : Cover2;
  const Hero = variants.hero === 1 ? Hero1 : Hero2;
  const decorations = ornamentPresets[theme] || {};

  function openInvitation() {
    setOpened(true);
    setCoverOpening(true);
    window.clearTimeout(coverTimerRef.current);
    coverTimerRef.current = window.setTimeout(() => {
      setCoverOpening(false);
      coverTimerRef.current = null;
    }, 950);
    if (musicEnabled) musicRef.current?.play();
    requestAnimationFrame(() => contentRef.current?.focus());
  }

  useEffect(
    () => () => {
      window.clearTimeout(coverTimerRef.current);
    },
    [],
  );

  const cover =
    variants.cover === 1 ? (
      <Cover
        title={displayTitle}
        subtitle={subtitle}
        guestName={invitation?.guestName}
        onOpen={openInvitation}
        isOpened={false}
        bgImage={image}
      >
        <DecorationLayer items={decorations.cover} />
      </Cover>
    ) : (
      <Cover
        title={displayTitle}
        subtitle={subtitle}
        date={date}
        monogram={monogram}
        image={image}
        onOpen={openInvitation}
      >
        <DecorationLayer items={decorations.cover} />
      </Cover>
    );

  return (
    <div
      className={`celebration-template ${theme}`}
      style={{
        '--template-background-art': decorations.background
          ? `url("${ornamentAssets[decorations.background.main].src}")`
          : 'none',
        '--template-edge-art': decorations.background
          ? `url("${ornamentAssets[decorations.background.edge].src}")`
          : 'none',
      }}
    >
      {musicEnabled && (
        <InvitationMusic ref={musicRef} src={musicUrl} visible={opened} />
      )}
      {opened && (
        <main
          className="invitation-content animate-fade-in"
          ref={contentRef}
          tabIndex={-1}
        >
          {variants.hero === 1 ? (
            <Hero
              bgImage={image}
              images={images}
              sunlightEnabled={sunlightEnabled}
              subtitle={subtitle}
              title={displayTitle}
              quote={date}
            >
              <DecorationLayer items={decorations.hero} />
            </Hero>
          ) : (
            <Hero
              image={image}
              images={images}
              sunlightEnabled={sunlightEnabled}
              subtitle={subtitle}
              title={displayTitle}
              date={date}
            >
              <DecorationLayer items={decorations.hero} />
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
            <DecorationLayer items={decorations.closing} />
            <span className="invitation-monogram">{monogram}</span>
            <span className="invitation-kicker">WITH LOVE & GRATITUDE</span>
            <h2>Terima kasih</h2>
            <p>
              Kehadiran dan doa baikmu menjadi bagian terindah dari hari
              istimewa ini.
            </p>
            <h3>{displayTitle}</h3>
            <Link to="/katalog">Temukan undanganmu di Ciptain ↗</Link>
          </footer>
        </main>
      )}
      {(!opened || coverOpening) && (
        <div
          className={`invitation-cover-exit${coverOpening ? ' is-opening' : ''}`}
          onAnimationEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              event.animationName === 'coverDismiss'
            ) {
              window.clearTimeout(coverTimerRef.current);
              coverTimerRef.current = null;
              setCoverOpening(false);
            }
          }}
        >
          {cover}
        </div>
      )}
    </div>
  );
}
