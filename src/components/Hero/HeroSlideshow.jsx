import { useEffect, useRef, useState } from 'react';
import './HeroSlideshow.css';

export default function HeroSlideshow({
  image,
  images = [],
  sunlightEnabled = true,
}) {
  const seenImages = new Set();
  const slides = [image, ...(Array.isArray(images) ? images : [])].filter(
    (src) => {
      if (!src) return false;
      const imagePath = src.split(/[?#]/, 1)[0];
      if (seenImages.has(imagePath)) return false;
      seenImages.add(imagePath);
      return true;
    },
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const host = useRef(null);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = !('IntersectionObserver' in window);
    let interval;
    function refresh() {
      window.clearInterval(interval);
      interval = undefined;
      if (!visible || document.hidden || reducedMotion.matches) return;
      interval = window.setInterval(() => {
        setActiveIndex((index) => (index + 1) % slides.length);
      }, 5000);
    }
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            refresh();
          })
        : null;
    if (host.current) observer?.observe(host.current);
    document.addEventListener('visibilitychange', refresh);
    reducedMotion.addEventListener('change', refresh);
    refresh();
    return () => {
      window.clearInterval(interval);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', refresh);
      reducedMotion.removeEventListener('change', refresh);
    };
  }, [slides.length]);

  return (
    <div className="hero-slideshow" ref={host} aria-hidden="true">
      {slides.map((src, index) => (
        <img
          key={src}
          className={`hero-slideshow__image${index === activeIndex % slides.length ? ' is-active' : ''}`}
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
