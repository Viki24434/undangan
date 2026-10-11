import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { getVideoSource } from './videoUrl';

function AgendaSection({ items }) {
  if (!items.length) return null;

  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-agenda"
      animationClass="animate-soft-rise"
    >
      <span className="invitation-kicker">RANGKAIAN ACARA</span>
      <h2>Susunan acara</h2>
      <ol className="invitation-agenda-list">
        {items.map((item, index) => (
          <li key={`${item.time}-${item.title}-${index}`}>
            <time>{item.time}</time>
            <div>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}

function VideoSection({ value }) {
  const video = getVideoSource(value);
  if (!video) return null;

  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-video"
      animationClass="animate-blur-reveal"
    >
      <span className="invitation-kicker">MOMEN KAMI</span>
      <h2>Video</h2>
      <div className="invitation-video-frame">
        {video.type === 'embed' ? (
          <iframe
            src={video.src}
            title="Video undangan"
            loading="lazy"
            allow="picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <video controls preload="metadata" playsInline>
            <source src={video.src} />
            Browser Anda tidak mendukung pemutaran video.
          </video>
        )}
      </div>
    </ScrollReveal>
  );
}

function PrayerSection({ items }) {
  if (!items.length) return null;

  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-prayers"
      animationClass="animate-soft-rise"
    >
      <span className="invitation-kicker">DOA & HARAPAN</span>
      <h2>Doa-doa</h2>
      <div className="invitation-prayer-list">
        {items.map((prayer, index) => (
          <article key={`${prayer.title}-${index}`}>
            <h3>{prayer.title}</h3>
            {prayer.arabic && (
              <p className="invitation-prayer-arabic" lang="ar" dir="rtl">
                {prayer.arabic}
              </p>
            )}
            <p>{prayer.text}</p>
            {prayer.source && <cite>{prayer.source}</cite>}
          </article>
        ))}
      </div>
    </ScrollReveal>
  );
}

export default function OptionalSections({
  agenda = [],
  videoUrl = '',
  prayers = [],
}) {
  const visibleAgenda = agenda.filter((item) => item.time && item.title);
  const visiblePrayers = prayers.filter((item) => item.title && item.text);

  return (
    <>
      <AgendaSection items={visibleAgenda} />
      <VideoSection value={videoUrl} />
      <PrayerSection items={visiblePrayers} />
    </>
  );
}
