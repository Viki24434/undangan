import './Couple1.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import PortraitDecoration from '../PortraitDecoration';

function PersonCard({ person, role, relationship, decorations }) {
  return (
    <>
      <div className="couple-1-portrait">
        <img src={person.photo} alt={person.name} loading="lazy" />
        <PortraitDecoration items={decorations} />
      </div>
      <div className="couple-1-details">
        <span className="invitation-kicker">{role}</span>
        <h3>{person.name}</h3>
        <span className="couple-1-detail-line" aria-hidden="true" />
        <p>
          {relationship} dari Bapak {person.father} &amp; Ibu {person.mother}
        </p>
      </div>
    </>
  );
}

export default function Couple1({ groom, bride, decorations }) {
  return (
    <section className="couple-1-container invitation-section">
      <span className="invitation-kicker animate-fade-in-down">
        THE BRIDE &amp; THE GROOM
      </span>
      <h2 className="animate-soft-rise delay-100">Pasangan berbahagia</h2>
      <p className="animate-fade-in delay-200">
        Dengan penuh cinta, kami memulai perjalanan baru bersama.
      </p>
      <div className="couple-1-grid">
        <ScrollReveal
          as="article"
          className="couple-1-card couple-1-groom"
          animationClass="animate-slide-left"
        >
          <PersonCard
            person={groom}
            role="Mempelai pria"
            relationship="Putra"
            decorations={decorations?.groom}
          />
        </ScrollReveal>
        <span className="couple-1-ampersand" aria-hidden="true">
          &amp;
        </span>
        <ScrollReveal
          as="article"
          className="couple-1-card couple-1-bride"
          animationClass="animate-soft-rise"
          delay="delay-200"
        >
          <PersonCard
            person={bride}
            role="Mempelai wanita"
            relationship="Putri"
            decorations={decorations?.bride}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
