import { useInvitation } from './InvitationContext';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DecorationLayer from '../Ornament/DecorationLayer';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import GuestGuide from './GuestGuide';
import GuestPhotoUpload from './GuestPhotoUpload';
import InvitationMusic from './InvitationMusic';
import Cover1 from '../Cover/Cover1/Cover1';
import Cover2 from '../Cover/Cover2/Cover2';
import Hero1 from '../Hero/Hero1/Hero1';
import Hero2 from '../Hero/Hero2/Hero2';
import PlatinumCover1 from '../Cover/PlatinumCover1/PlatinumCover1';
import PlatinumHero1 from '../Hero/PlatinumHero1/PlatinumHero1';
import PlatinumNavbar from '../Navbar/PlatinumNavbar/PlatinumNavbar';
import PlatinumMotion from '../Animation/PlatinumMotion/PlatinumMotion';
import PlatinumChapter from '../Animation/PlatinumChapter/PlatinumChapter';
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
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to')?.trim();
  const displayTitle = invitation?.title || title;
  const [opened, setOpened] = useState(false);
  const [coverOpening, setCoverOpening] = useState(false);
  const contentRef = useRef(null);
  const musicRef = useRef(null);
  const coverTimerRef = useRef(null);
  const musicEnabled = invitation?.data.musicEnabled !== false;
  const defaultMusic = /birthday/.test(theme)
    ? '/audio/celebration.wav'
    : /celestial|moon|aurora/.test(theme)
      ? '/audio/starlight.wav'
      : '/audio/romance.wav';
  const musicUrl = invitation?.data.musicUrl || defaultMusic;
  const Cover =
    variants.cover === 3
      ? PlatinumCover1
      : variants.cover === 1
        ? Cover1
        : Cover2;
  const Hero =
    variants.hero === 3 ? PlatinumHero1 : variants.hero === 1 ? Hero1 : Hero2;
  const decorations = ornamentPresets[theme] || {};
  const templateTheme = invitation?.data.theme || {};
  const fontStyles =
    {
      classic: {
        '--font-heading': "'Times New Roman', Georgia, serif",
        '--font-body': 'Georgia, serif',
      },
      modern: {
        '--font-heading': "'Segoe UI', Arial, sans-serif",
        '--font-body': "'Segoe UI', Arial, sans-serif",
      },
    }[templateTheme.font] || {};
  const heroBottom = decorations.hero?.find((item) =>
    item.asset.endsWith('-bottom-garland'),
  );

  function openInvitation() {
    if (opened) return;
    setOpened(true);
    setCoverOpening(true);
    window.clearTimeout(coverTimerRef.current);
    coverTimerRef.current = window.setTimeout(
      () => {
        setCoverOpening(false);
        coverTimerRef.current = null;
      },
      variants.cover === 3 ? 2500 : 950,
    );
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
        guestName={guestName}
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
        guestName={guestName}
        monogram={monogram}
        image={image}
        onOpen={openInvitation}
        isOpening={coverOpening}
        envelopeArt={
          decorations.envelope && ornamentAssets[decorations.envelope]
        }
        flapArt={
          decorations.envelopeFlap && ornamentAssets[decorations.envelopeFlap]
        }
      >
        <DecorationLayer items={decorations.cover} />
      </Cover>
    );

  return (
    <div
      className={`celebration-template ${theme}${variants.experience === 'platinum' ? ' platinum-template' : ''}${variants.adat ? ' platinum-adat' : ''}`}
      style={{
        ...(templateTheme.background && {
          '--color-bg': templateTheme.background,
        }),
        ...(templateTheme.accent && {
          '--color-accent': templateTheme.accent,
        }),
        ...fontStyles,
        '--template-paper-art': decorations.paperTexture
          ? `url("${ornamentAssets[decorations.paperTexture].src}")`
          : 'none',
        '--template-seal-art': decorations.waxSeal
          ? `url("${ornamentAssets[decorations.waxSeal].src}")`
          : 'none',
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
          className={`invitation-content animate-fade-in${variants.experience === 'platinum' ? ' platinum-living' : ''}`}
          ref={contentRef}
          tabIndex={-1}
        >
          {variants.experience === 'platinum' && <PlatinumMotion />}
          {variants.hero === 1 ? (
            <Hero
              bgImage={image}
              images={images}
              sunlightEnabled={sunlightEnabled}
              subtitle={subtitle}
              title={displayTitle}
              quote={date}
            >
              <DecorationLayer
                items={decorations.hero}
                className="hero-decoration"
              />
            </Hero>
          ) : (
            <Hero
              image={image}
              images={images}
              sunlightEnabled={sunlightEnabled}
              subtitle={subtitle}
              title={displayTitle}
              date={date}
              theme={theme}
              ready={!coverOpening}
              bottomOrnament={
                heroBottom && ornamentAssets[heroBottom.asset].src
              }
            >
              <DecorationLayer
                items={decorations.hero?.filter(
                  (item) => !item.asset.endsWith('-bottom-garland'),
                )}
                className="hero-decoration"
              />
            </Hero>
          )}
          {variants.experience === 'platinum' ? (
            <PlatinumNavbar />
          ) : (
            <nav
              className="invitation-section-nav"
              aria-label="Bagian undangan"
            >
              <a href="#invitation-intro">Pembuka</a>
              <a href="#invitation-events">Acara</a>
              <a href="#invitation-gallery">Galeri</a>
              <a href="#invitation-wishes">Ucapan</a>
            </nav>
          )}
          {children}
          <GuestPhotoUpload
            platinum={
              invitation?.packageId
                ? invitation.packageId === 'platinum'
                : variants.experience === 'platinum'
            }
          />
          <PlatinumChapter
            enabled={variants.experience === 'platinum'}
            theme={theme}
            chapter="guide"
          >
            <GuestGuide />
          </PlatinumChapter>
          <PlatinumChapter
            enabled={variants.experience === 'platinum'}
            theme={theme}
            chapter="closing"
          >
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
          </PlatinumChapter>
        </main>
      )}
      {(!opened || coverOpening) && (
        <div
          className={`invitation-cover-exit${variants.cover === 3 ? ' invitation-cover-exit--platinum' : ''}${coverOpening ? ' is-opening' : ''}`}
          aria-hidden={coverOpening || undefined}
          onAnimationEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              [
                'coverDismiss',
                'platinumEnvelopeDismiss',
                'platinumAddressFade',
              ].includes(event.animationName)
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
