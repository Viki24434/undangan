import { useState } from 'react';
import HeroSlideshow from '../Hero/HeroSlideshow';
import CinematicScene from './CinematicScene';
import './PlatinumHero.css';

export default function PlatinumHero({
  image,
  images,
  sunlightEnabled,
  subtitle,
  title,
  date,
  theme,
  ready = true,
}) {
  const [replay, setReplay] = useState(0);
  const names = String(title).split(/\s*&\s*/);
  const hasPhotos = Boolean(
    image || (Array.isArray(images) && images.some(Boolean)),
  );
  return (
    <section
      className={`invitation-hero platinum-hero cinematic-hero${['invitation-platinum-champagne', 'invitation-platinum-aurora'].includes(theme) ? ' cinematic-hero--atelier' : ''}${ready ? ' is-ready' : ''}`}
    >
      <div className="cinematic-hero__stage" key={replay}>
        <div
          className="cinematic-hero__backdrop cinematic-hero__entrance"
          aria-hidden="true"
        >
          <HeroSlideshow
            image={image}
            images={images}
            sunlightEnabled={sunlightEnabled}
          />
        </div>
        <div
          className="cinematic-hero__archway cinematic-hero__entrance"
          aria-hidden="true"
        />
        <div
          className="cinematic-hero__horizon cinematic-hero__entrance"
          aria-hidden="true"
        />
        <CinematicScene theme={theme} />
        <div
          className="cinematic-hero__panel cinematic-hero__entrance"
          aria-hidden="true"
        />
        <div className="cinematic-hero__copy">
          <span className="invitation-kicker cinematic-hero__subtitle cinematic-hero__entrance">
            {subtitle}
          </span>
          <h1 aria-label={title}>
            {names.map((name, index) => (
              <span
                className="cinematic-hero__name-group"
                key={index}
                aria-hidden="true"
              >
                {index > 0 && (
                  <span className="cinematic-hero__ampersand cinematic-hero__entrance">
                    &amp;
                  </span>
                )}
                <span
                  className="cinematic-hero__name cinematic-hero__entrance"
                  style={{ '--name-delay': `${1.65 + index * 0.3}s` }}
                >
                  {name}
                </span>
              </span>
            ))}
          </h1>
          <div className="cinematic-hero__date cinematic-hero__entrance">
            <span aria-hidden="true">✦</span>
            <p className="invitation-date">{date}</p>
            <span aria-hidden="true">✦</span>
          </div>
        </div>
      </div>
      <div className="cinematic-hero__actions">
        <a
          className="invitation-scroll"
          href={hasPhotos ? '#invitation-portraits' : '#invitation-intro'}
        >
          Jelajahi cerita kami <span aria-hidden="true">↓</span>
        </a>
        <button
          className="cinematic-hero__replay"
          type="button"
          onClick={() => setReplay((value) => value + 1)}
        >
          <span aria-hidden="true">↻</span> Ulangi pembuka
        </button>
      </div>
    </section>
  );
}
