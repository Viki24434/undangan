import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function GalleryLightbox({ photos, initialIndex, onClose }) {
  const dialog = useRef(null);
  const start = useRef(null);
  const [active, setActive] = useState(initialIndex);
  const current = Math.min(active, photos.length - 1);
  function move(direction) {
    setActive((value) => (value + direction + photos.length) % photos.length);
  }
  useEffect(() => {
    const element = dialog.current;
    const focus = document.activeElement;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      focus?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className="gallery-viewer"
      aria-label="Galeri foto layar penuh"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div className="gallery-viewer__body">
        <button
          type="button"
          className="gallery-viewer__close"
          onClick={onClose}
        >
          Tutup ×
        </button>
        <img
          src={photos[current]}
          alt={`Kenangan ${current + 1}`}
          onPointerDown={(event) => {
            start.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            const point = start.current;
            start.current = null;
            if (
              point &&
              Math.abs(event.clientX - point.x) > 50 &&
              Math.abs(event.clientY - point.y) < 70
            )
              move(event.clientX < point.x ? 1 : -1);
          }}
          onPointerCancel={() => {
            start.current = null;
          }}
          draggable={false}
        />
        <div className="gallery-viewer__controls">
          <button
            type="button"
            aria-label="Foto sebelumnya"
            disabled={photos.length < 2}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <span aria-live="polite">
            {current + 1} / {photos.length}
          </span>
          <button
            type="button"
            aria-label="Foto berikutnya"
            disabled={photos.length < 2}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
        <p>Geser foto atau gunakan tombol panah untuk menjelajah.</p>
      </div>
    </dialog>,
    document.body,
  );
}
