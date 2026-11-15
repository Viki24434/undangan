import { useState } from 'react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import GalleryLightbox from './GalleryLightbox';
import './GalleryCollection.css';

const captions = {
  masonry: ['MOMENTS, BEAUTIFULLY COLLECTED', 'Setiap sudut punya cerita.'],
  polaroid: ['LITTLE PRINTS OF HAPPINESS', 'Kenangan yang kami simpan.'],
  editorial: ['THE MEMORY JOURNAL', 'Satu cerita, banyak bingkai.'],
  deck: ['A COLLECTION OF OUR DAYS', 'Lembar demi lembar bahagia.'],
  spotlight: ['IN THE SPOTLIGHT', 'Momen yang berarti.'],
  contact: ['THE MOMENT ARCHIVE', 'Arsip kebahagiaan.'],
};

export default function GalleryCollection({ photos = [], layout }) {
  const images = photos.filter(
    (photo) => typeof photo === 'string' && photo.trim(),
  );
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(null);
  const current = Math.min(active, Math.max(0, images.length - 1));
  const staged = ['deck', 'spotlight'].includes(layout);
  const [kicker, title] = captions[layout];
  function frame(photo, index, className = '') {
    return (
      <button
        type="button"
        className={`gallery-set__frame invitation-surface ${className}`}
        onClick={() => setViewer(index)}
        aria-label={`Perbesar foto ${index + 1}`}
      >
        <img
          src={photo}
          alt={`Kenangan ${index + 1}`}
          loading="lazy"
          decoding="async"
        />
        <span className="gallery-set__caption">
          <small>
            {layout === 'contact' ? 'MEMORY ARCHIVE' : 'A MOMENT TO REMEMBER'}
          </small>
          <b>{String(index + 1).padStart(2, '0')}</b>
          <i aria-hidden="true">↗</i>
        </span>
      </button>
    );
  }
  return (
    <section
      className={`invitation-section gallery-set gallery-set--${layout}`}
      id="invitation-gallery"
    >
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>Sentuh foto untuk melihat cerita lebih dekat.</p>
      </ScrollReveal>
      {!images.length ? (
        <p className="gallery-set__empty">Foto kenangan akan hadir di sini.</p>
      ) : staged ? (
        <>
          <div className="gallery-set__stage">
            {layout === 'deck' && (
              <>
                <span
                  className="gallery-set__sheet gallery-set__sheet--back"
                  aria-hidden="true"
                />
                <span className="gallery-set__sheet" aria-hidden="true" />
              </>
            )}
            {frame(images[current], current, 'gallery-set__featured')}
          </div>
          <div className="gallery-set__navigation">
            <button
              type="button"
              aria-label="Foto sebelumnya"
              disabled={images.length < 2}
              onClick={() =>
                setActive((current + images.length - 1) % images.length)
              }
            >
              ←
            </button>
            <span aria-live="polite">
              {current + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Foto berikutnya"
              disabled={images.length < 2}
              onClick={() => setActive((current + 1) % images.length)}
            >
              →
            </button>
          </div>
          {layout === 'spotlight' && (
            <div
              className="gallery-set__thumbnails"
              role="group"
              aria-label="Pilih foto utama"
            >
              {images.map((photo, index) => (
                <button
                  type="button"
                  key={`${photo}-${index}`}
                  aria-label={`Tampilkan foto ${index + 1}`}
                  aria-pressed={current === index}
                  onClick={() => setActive(index)}
                >
                  <img src={photo} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="gallery-set__grid">
          {images.map((photo, index) => (
            <ScrollReveal
              className="gallery-set__item"
              animationClass={
                index % 2 ? 'animate-slide-right' : 'animate-soft-rise'
              }
              key={`${photo}-${index}`}
            >
              {frame(photo, index)}
            </ScrollReveal>
          ))}
        </div>
      )}
      {viewer !== null && images.length > 0 && (
        <GalleryLightbox
          photos={images}
          initialIndex={Math.min(viewer, images.length - 1)}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
