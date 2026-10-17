import { useRef, useState } from 'react';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Gallery4.css';

export default function Gallery4({ photos = [] }) {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(0);
  const images = photos.filter(Boolean);

  function move(direction) {
    setActive((index) => (index + direction + images.length) % images.length);
  }

  function open(index) {
    setActive(index);
    dialogRef.current?.showModal();
  }

  return (
    <section className="invitation-section gallery-4" id="invitation-gallery">
      <ScrollReveal animationClass="animate-blur-reveal">
        <span className="invitation-kicker">THE ART OF REMEMBERING</span>
        <h2>Potongan bahagia.</h2>
        <p>Sentuh foto untuk menikmati setiap cerita lebih dekat.</p>
      </ScrollReveal>
      <div className="gallery-4__grid">
        {images.map((photo, index) => (
          <ScrollReveal
            className="gallery-4__frame"
            animationClass={
              index % 2 ? 'animate-slide-right' : 'animate-slide-left'
            }
            key={`${photo}-${index}`}
          >
            <button
              type="button"
              onClick={() => open(index)}
              aria-label={`Perbesar foto ${index + 1}`}
            >
              <img src={photo} alt={`Kenangan ${index + 1}`} loading="lazy" />
              <span aria-hidden="true">
                0{index + 1} <i>↗</i>
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>
      <dialog
        className="gallery-4__dialog"
        ref={dialogRef}
        aria-label="Galeri foto layar penuh"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="gallery-4__viewer">
          <button
            className="gallery-4__close"
            type="button"
            onClick={() => dialogRef.current.close()}
            autoFocus
          >
            Tutup ×
          </button>
          {images.length > 0 && (
            <img
              key={images[active]}
              src={images[active]}
              alt={`Kenangan ${active + 1}`}
            />
          )}
          <div className="gallery-4__controls">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={images.length < 2}
              aria-label="Foto sebelumnya"
            >
              ←
            </button>
            <span aria-live="polite">
              {active + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={images.length < 2}
              aria-label="Foto berikutnya"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
