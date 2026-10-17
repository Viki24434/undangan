import { useEffect, useMemo, useRef, useState } from 'react';
import PlatinumChapter from '../../Animation/PlatinumChapter/PlatinumChapter';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './PlatinumGallery1.css';

const slideDuration = 3000;

export default function PlatinumGallery1({ image, images = [], title, theme }) {
  const ref = useRef(null);
  const touchRef = useRef(null);
  const slides = useMemo(() => {
    const seen = new Set();
    return [image, ...(Array.isArray(images) ? images : [])].filter((src) => {
      if (!src) return false;
      const key = src.split(/[?#]/, 1)[0];
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [image, images]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const current = slides.length ? index % slides.length : 0;
  const playing =
    slides.length > 1 &&
    visible &&
    pageVisible &&
    !paused &&
    !hovered &&
    !reducedMotion;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changeMotion = () => setReducedMotion(motion.matches);
    const changeVisibility = () => setPageVisible(!document.hidden);
    motion.addEventListener('change', changeMotion);
    document.addEventListener('visibilitychange', changeVisibility);
    return () => {
      motion.removeEventListener('change', changeMotion);
      document.removeEventListener('visibilitychange', changeVisibility);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { root: element.closest('.mw-device'), threshold: [0, 0.25] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % slides.length),
      slideDuration,
    );
    return () => window.clearInterval(timer);
  }, [playing, slides.length, current]);

  function move(direction) {
    if (slides.length < 2) return;
    setIndex((value) => (value + direction + slides.length) % slides.length);
  }

  function swipeEnd(event) {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || start.id !== event.pointerId) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3)
      move(deltaX < 0 ? 1 : -1);
  }

  if (!slides.length) return null;

  return (
    <PlatinumChapter enabled theme={theme} chapter="photos">
      <section
        className="invitation-section platinum-photo-story"
        id="invitation-portraits"
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label="Potret pasangan"
        data-playing={playing}
        style={{ '--photo-duration': `${slideDuration}ms` }}
      >
        <ScrollReveal animationClass="animate-blur-reveal">
          <span className="invitation-kicker">A FEW FRAMES OF US</span>
          <h2>Kita, dalam kenangan.</h2>
          <p>Beberapa potret, satu cerita yang ingin kami kenang.</p>
        </ScrollReveal>
        <div
          className="platinum-photo-story__stack"
          onPointerDown={(event) => {
            if (!event.isPrimary) return;
            touchRef.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={swipeEnd}
          onPointerCancel={() => {
            touchRef.current = null;
          }}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          {slides.length > 1 &&
            [2, 1].map((offset) => (
              <div
                className={`platinum-photo-story__back platinum-photo-story__back--${offset}`}
                key={offset}
                aria-hidden="true"
              >
                <img
                  src={slides[(current + offset) % slides.length]}
                  alt=""
                  loading="lazy"
                  draggable="false"
                />
              </div>
            ))}
          <figure
            className="platinum-photo-story__card"
            key={current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} dari ${slides.length}`}
          >
            <div className="platinum-photo-story__image">
              <img
                src={slides[current]}
                alt={`Potret ${title}, foto ${current + 1}`}
                loading="lazy"
                draggable="false"
              />
            </div>
            <figcaption>
              <span>{title}</span>
              <span>{String(current + 1).padStart(2, '0')}</span>
            </figcaption>
          </figure>
        </div>
        <div className="platinum-photo-story__controls">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={slides.length < 2}
            aria-label="Potret sebelumnya"
          >
            ←
          </button>
          <span
            className="platinum-photo-story__counter"
            aria-live={paused ? 'polite' : 'off'}
          >
            {String(current + 1).padStart(2, '0')} <i>/</i>{' '}
            {String(slides.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={slides.length < 2}
            aria-label="Potret berikutnya"
          >
            →
          </button>
        </div>
        {slides.length > 1 && (
          <>
            <div
              className="platinum-photo-story__dots"
              aria-label="Pilih potret"
            >
              {slides.map((src, position) => (
                <button
                  type="button"
                  key={src}
                  aria-label={`Tampilkan potret ${position + 1}`}
                  aria-current={position === current ? 'true' : undefined}
                  onClick={() => setIndex(position)}
                >
                  <span />
                </button>
              ))}
            </div>
            {!reducedMotion && (
              <button
                className="platinum-photo-story__playback"
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{' '}
                {paused ? 'Putar slideshow' : 'Jeda slideshow'}
              </button>
            )}
            <div className="platinum-photo-story__progress" aria-hidden="true">
              {playing && <span key={current} />}
            </div>
            <p className="platinum-photo-story__hint">
              Geser foto untuk melihat potret berikutnya.
            </p>
          </>
        )}
      </section>
    </PlatinumChapter>
  );
}
