import { useEffect, useRef, useState } from 'react';
import './PlatinumNavbar.css';

const chapters = [
  ['invitation-intro', 'Cerita'],
  ['invitation-events', 'Acara'],
  ['invitation-gallery', 'Galeri'],
  ['invitation-wishes', 'Ucapan'],
];

export default function PlatinumNavbar() {
  const ref = useRef(null);
  const [active, setActive] = useState('invitation-intro');

  useEffect(() => {
    const root = ref.current?.closest('.mw-device');
    const content = ref.current?.closest('main');
    if (!content) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { root, rootMargin: '-12% 0px -50% 0px', threshold: 0 },
    );
    chapters.forEach(([id]) => {
      const section = content.querySelector(`#${id}`);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="platinum-navigation" aria-label="Bab undangan" ref={ref}>
      {chapters.map(([id, label], index) => (
        <a
          href={`#${id}`}
          key={id}
          aria-current={active === id ? 'location' : undefined}
          onClick={() => setActive(id)}
        >
          <span aria-hidden="true">0{index + 1}</span>
          {label}
        </a>
      ))}
    </nav>
  );
}
