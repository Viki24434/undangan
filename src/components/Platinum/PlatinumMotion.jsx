import { useEffect, useRef } from 'react';
import PlatinumAtmosphere from './PlatinumAtmosphere';
import './PlatinumMotion.css';

export default function PlatinumMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const content = ref.current?.closest('main');
    if (!content || !('IntersectionObserver' in window)) return undefined;
    const sections = content.querySelectorAll(
      '.cinematic-hero, .invitation-section, .invitation-closing, .ornament-divider',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.dataset.platinumVisible = String(entry.isIntersecting);
        });
      },
      { root: content.closest('.mw-device'), threshold: 0 },
    );
    sections.forEach((section) => {
      section.dataset.platinumVisible = 'false';
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
      sections.forEach((section) => delete section.dataset.platinumVisible);
    };
  }, []);

  return (
    <div ref={ref} className="platinum-motion-layer">
      <PlatinumAtmosphere />
    </div>
  );
}
