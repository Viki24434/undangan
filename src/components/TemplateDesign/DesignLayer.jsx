import { useEffect, useRef } from 'react';
import { ornamentAssets } from '../Ornament/ornamentAssets';
import OrnamentArtwork from '../Ornament/OrnamentArtwork';
import { entryFrames } from './designConfig';

export default function DesignLayer({ item, section, playing = true }) {
  const entry = useRef(null);
  const source = item.asset ? ornamentAssets[item.asset] : { src: item.src };
  const asset = source?.viewBox ? { ...source, cropped: true } : source;
  useEffect(() => {
    if (
      !playing ||
      item.hidden ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const frames = entryFrames(item.entry);
    if (!frames || !entry.current) return;
    let animation;
    const observer = new IntersectionObserver(
      ([record]) => {
        if (!record.isIntersecting) return;
        animation = entry.current.animate(frames, {
          duration: item.entryDuration * 1000,
          delay: item.delay * 1000,
          easing:
            item.entry === 'type'
              ? 'steps(24, end)'
              : 'cubic-bezier(.2,.7,.3,1)',
          fill: 'backwards',
        });
        observer.disconnect();
      },
      { threshold: 0.02 },
    );
    observer.observe(entry.current);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [item.entry, item.entryDuration, item.delay, item.hidden, playing]);
  if (!asset || item.hidden) return null;
  return (
    <span
      className={`template-design-item${item.height ? ' template-design-sized' : ''}`}
      data-design-layer={item.id}
      data-design-section={section}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: `${item.width}%`,
        ...(item.height && { height: `${item.height}%` }),
        zIndex: item.zIndex,
        opacity: item.opacity,
        rotate: `${item.rotate}deg`,
        scale: `${item.flipX ? -1 : 1} ${item.flipY ? -1 : 1}`,
      }}
    >
      <span ref={entry} className="template-design-entry">
        <span
          className="template-design-motion"
          data-motion={item.motion}
          style={{
            animationDuration: `${item.duration}s`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        >
          <OrnamentArtwork asset={asset} fill={Boolean(item.height)} />
        </span>
      </span>
    </span>
  );
}
