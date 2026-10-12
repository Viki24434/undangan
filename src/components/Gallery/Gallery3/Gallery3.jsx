import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Gallery3.css';

export default function Gallery3({ photos }) {
  return (
    <section className="invitation-section gallery-3" id="invitation-gallery">
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">MOMENTS WE CHERISH</span>
        <h2>Galeri kenangan</h2>
        <p>Potret perjalanan yang ingin kami kenang bersama.</p>
      </ScrollReveal>
      <div className="gallery-3__grid">
        {photos.map((photo, index) => (
          <ScrollReveal
            as="figure"
            className="gallery-3__item"
            animationClass="animate-blur-reveal"
            delay={`delay-${Math.min((index % 5) * 100, 900)}`}
            key={`${photo}-${index}`}
          >
            <img
              src={photo}
              alt={`Potret kenangan ${index + 1}`}
              loading="lazy"
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
