import './Gallery2.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Gallery2({ photos }) {
  return (
    <section className="invitation-section gallery-2" id="invitation-gallery">
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">LITTLE MOMENTS, BIG MEMORIES</span>
        <h2>Dalam bingkai cerita</h2>
        <p>Potongan kebahagiaan yang ingin kami bagikan.</p>
      </ScrollReveal>
      <div className="gallery-2__grid">
        {photos.map((photo, index) => (
          <ScrollReveal
            as="figure"
            className="gallery-2__item"
            animationClass="animate-blur-reveal"
            delay={`delay-${Math.min((index % 5) * 100, 900)}`}
            key={`${photo}-${index}`}
          >
            <img
              src={photo}
              alt={`Momen istimewa ${index + 1}`}
              loading="lazy"
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
