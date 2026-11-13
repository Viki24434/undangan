import { useRef, useState } from 'react';
import './Gallery5.css';

export default function Gallery5({ photos = [] }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const images = photos.filter(Boolean);
  const current = Math.min(active, Math.max(0, images.length - 1));

  function move(index) {
    const host = track.current;
    const next = Math.max(0, Math.min(index, images.length - 1));
    const card = host?.children[next];
    if (!card) return;
    host.scrollTo({
      left: card.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }

  function onScroll() {
    const host = track.current;
    let nearest = 0;
    let distance = Infinity;
    [...host.children].forEach((card, index) => {
      const gap = Math.abs(card.offsetLeft - host.scrollLeft);
      if (gap < distance) {
        nearest = index;
        distance = gap;
      }
    });
    setActive(nearest);
  }

  return (
    <section className="invitation-section gallery-5" id="invitation-gallery">
      <span className="invitation-kicker">COLLECTING OUR FAVORITE DAYS</span>
      <h2>Album kenangan</h2>
      <p>Potongan kecil dari cerita yang ingin kami kenang.</p>
      {images.length > 0 && (
        <>
          <div
            className="gallery-5__track"
            ref={track}
            onScroll={onScroll}
            tabIndex={0}
            role="region"
            aria-label="Album foto, geser untuk menjelajah"
          >
            {images.map((photo, index) => (
              <figure
                className="gallery-5__print invitation-surface"
                key={`${photo}-${index}`}
              >
                <img
                  src={photo}
                  alt={`Kenangan ${index + 1}`}
                  width="240"
                  height="300"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>OUR LITTLE MOMENTS</span>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="gallery-5__navigation">
            <button
              type="button"
              onClick={() => move(current - 1)}
              disabled={current === 0}
              aria-label="Foto sebelumnya"
            >
              ←
            </button>
            <span aria-live="polite">
              {String(current + 1).padStart(2, '0')} /{' '}
              {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => move(current + 1)}
              disabled={current === images.length - 1}
              aria-label="Foto berikutnya"
            >
              →
            </button>
          </div>
        </>
      )}
    </section>
  );
}
