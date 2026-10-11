import { useEffect, useState } from 'react';
import './HeroSlideshow.css';

export default function HeroSlideshow({
  image,
  images = [],
  sunlightEnabled = true,
}) {
  const seenImages = new Set();
  const slides = [image, ...(Array.isArray(images) ? images : [])].filter((src) => {
    if (!src) return false;
    const imagePath = src.split(/[?#]/, 1)[0];
    if (seenImages.has(imagePath)) return false;
    seenImages.add(imagePath);
    return true;
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {slides.map((src, index) => (
        <img
          key={src}
          className={`hero-slideshow__image${index === activeIndex ? ' is-active' : ''}`}
          src={src}
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
      {sunlightEnabled && <div className="hero-slideshow__light" />}
      <div className="hero-slideshow__bottom-fade" />
    </div>
  );
}
