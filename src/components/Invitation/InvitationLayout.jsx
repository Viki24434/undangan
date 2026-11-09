import { useInvitation } from './InvitationContext';
import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DecorationLayer from '../Ornament/DecorationLayer';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import { platinumScenes } from '../../config/platinumScenes';
import GuestGuide from './GuestGuide';
import GuestPhotoUpload from './GuestPhotoUpload';
import InvitationMusic from './InvitationMusic';
import { invitationVariants } from './invitationVariants';
import PlatinumNavbar from '../Navbar/PlatinumNavbar/PlatinumNavbar';
import PlatinumMotion from '../Animation/PlatinumMotion/PlatinumMotion';
import PlatinumChapter from '../Animation/PlatinumChapter/PlatinumChapter';
import './Invitation.css';
import { DesignEditorContext } from '../TemplateDesign/DesignEditorContext';
import { themeAttributes, themeStyles } from '../../config/invitationTheme';
import './InvitationTheme.css';
import './InvitationGradients.css';

const TemplateDesignRuntime = lazy(
  () => import('../TemplateDesign/TemplateDesignRuntime'),
);

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
  const designEditor = useContext(DesignEditorContext);
  const designRoot = useRef(null);
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to')?.trim();
  const displayTitle = invitation?.title || title;
  const [openedState, setOpened] = useState(false);
  const opened = designEditor ? designEditor.section !== 'cover' : openedState;
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
    invitationVariants.cover[variants.cover] || invitationVariants.cover[2];
  const Hero =
    invitationVariants.hero[variants.hero] || invitationVariants.hero[2];
  const decorations = ornamentPresets[theme] || {};
  const scene = platinumScenes[theme];
  const backgroundLeaf =
    scene && ornamentAssets[scene.chapterAssets['leaf-left']];
  const edgeLeaf = scene && ornamentAssets[scene.chapterAssets['leaf-right']];
  const templateTheme = invitation?.data.theme || {};
  const design = invitation?.data.design;
  const runtimeEnabled = Boolean(
    designEditor ||
    Object.keys(design?.native || {}).length ||
    Object.keys(design?.sections || {}).length ||
    Object.keys(templateTheme.sections || {}).length,
  );
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
    if (designEditor) {
      designEditor.onOpen();
      return;
    }
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
        paperArt={
          decorations.paperTexture && ornamentAssets[decorations.paperTexture]
        }
      >
        <DecorationLayer items={decorations.cover} />
      </Cover>
    );

  return (
    <div
      ref={designRoot}
      data-template-theme="true"
      {...themeAttributes(templateTheme)}
      className={`celebration-template ${theme}${variants.experience === 'platinum' ? ' platinum-template' : ''}${variants.adat ? ' platinum-adat' : ''}`}
      style={{
        ...themeStyles(templateTheme),
        ...fontStyles,
        '--template-seal-art': decorations.waxSeal
          ? `url("${ornamentAssets[decorations.waxSeal].src}")`
          : 'none',
        '--template-background-art': decorations.background
          ? `url("${ornamentAssets[decorations.background.main].src}")`
          : 'none',
        '--template-edge-art': decorations.background
          ? `url("${ornamentAssets[decorations.background.edge].src}")`
          : 'none',
        '--template-background-foliage': backgroundLeaf
          ? `url("${backgroundLeaf.src}")`
          : 'none',
        '--template-edge-foliage': edgeLeaf ? `url("${edgeLeaf.src}")` : 'none',
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
      {runtimeEnabled && (
        <Suspense fallback={null}>
          <TemplateDesignRuntime root={designRoot} />
        </Suspense>
      )}
    </div>
  );
}
