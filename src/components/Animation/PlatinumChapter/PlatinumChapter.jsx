import { useEffect, useRef } from 'react';
import { ornamentAssets } from '../../Ornament/ornamentAssets';
import './PlatinumChapter.css';
import { platinumScenes } from '../../../config/platinumScenes';

const compositions = {
  photos: ['branch-left', 'leaf-right', 'flower-right'],
  intro: ['leaf-left', 'leaf-right'],
  couple: ['leaf-left', 'leaf-right', 'flower-left'],
  story: ['branch-left', 'leaf-right'],
  events: ['leaf-left', 'flower-right'],
  gallery: ['branch-left', 'leaf-right', 'flower-right'],
  wishes: ['leaf-left', 'flower-right'],
  agenda: ['branch-left', 'leaf-right'],
  prayers: ['leaf-left', 'flower-right'],
  video: ['leaf-left', 'leaf-right'],
  gift: ['branch-left', 'flower-right'],
  guide: ['leaf-left', 'leaf-right'],
  closing: ['branch-left', 'leaf-right'],
};

function AnimatedChapter({ theme, chapter, children }) {
  const ref = useRef(null);
  const artRefs = useRef([]);
  const scene = platinumScenes[theme];
  const composition = [
    ...(compositions[chapter] || compositions.intro).map((position) => ({
      position,
      asset: scene.chapterAssets[position],
    })),
    ...(scene.chapterExtras?.[chapter] || []),
  ];

  useEffect(() => {
    const elements = artRefs.current.filter(Boolean);
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.dataset.entered = 'true';
        element.dataset.visible = 'true';
      });
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.dataset.visible = String(entry.isIntersecting);
          if (entry.isIntersecting) entry.target.dataset.entered = 'true';
        });
      },
      { root: ref.current?.closest('.mw-device'), threshold: 0.05 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [theme, chapter]);

  return (
    <div className={`platinum-chapter platinum-chapter--${chapter}`} ref={ref}>
      {children}
      <div className="platinum-chapter__ornaments" aria-hidden="true">
        {composition.map(({ position, asset: assetKey, motion }, index) => {
          const asset = ornamentAssets[assetKey];
          const right = position.endsWith('right');
          return (
            <span
              className={`platinum-chapter__art platinum-chapter__art--${position}`}
              key={position}
              data-motion={motion}
              ref={(element) => {
                artRefs.current[index] = element;
              }}
              style={{
                '--chapter-direction': right ? -1 : 1,
                '--chapter-origin': right ? '70% 100%' : '30% 100%',
                '--chapter-delay': `${index * 0.16}s`,
                '--chapter-duration': `${10.8 + index * 1.7}s`,
                '--chapter-force': position.startsWith('flower') ? 0.6 : 1,
              }}
            >
              <span className="platinum-chapter__entry">
                <span className="platinum-chapter__wind">
                  <span className="platinum-chapter__tip">
                    {asset.viewBox ? (
                      <svg
                        viewBox={asset.viewBox.join(' ')}
                        focusable="false"
                        style={{
                          aspectRatio: `${asset.viewBox[2]} / ${asset.viewBox[3]}`,
                        }}
                      >
                        <image href={asset.src} width="800" height="800" />
                      </svg>
                    ) : (
                      <img
                        src={asset.src}
                        alt=""
                        loading="lazy"
                        draggable="false"
                      />
                    )}
                  </span>
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function PlatinumChapter({
  enabled = false,
  theme,
  chapter,
  children,
}) {
  if (!enabled || !platinumScenes[theme]) return children;
  return (
    <AnimatedChapter theme={theme} chapter={chapter}>
      {children}
    </AnimatedChapter>
  );
}
