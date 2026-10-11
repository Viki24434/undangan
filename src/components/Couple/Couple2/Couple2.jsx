import './Couple2.css';
import DecorationLayer from '../../Ornament/DecorationLayer';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

function PersonCard({ person, role, decorations }) {
  return (
    <>
      <div className="couple-2__portrait">
        <img src={person.photo} alt={person.name} loading="lazy" />
        <DecorationLayer items={decorations} />
      </div>
      <span className="invitation-kicker">{role}</span>
      <h3>{person.name}</h3>
      <p>
        Putra dari Bapak {person.father} &amp; Ibu {person.mother}
      </p>
    </>
  );
}

export default function Couple2({ groom, bride, decorations }) {
  return (
    <section className="couple-2 invitation-section">
      <span className="invitation-kicker animate-fade-in-down">THE BRIDE &amp; THE GROOM</span>
      <h2 className="animate-soft-rise delay-100">Pasangan berbahagia</h2>
      <p className="animate-fade-in delay-200">Dengan penuh cinta, kami memulai perjalanan baru bersama.</p>
      <div className="couple-2__pair">
        <ScrollReveal
          as="article"
          className="couple-2__person"
          animationClass="animate-soft-rise"
        >
          <PersonCard
            person={groom}
            role="Mempelai pria"
            decorations={decorations?.groom}
          />
        </ScrollReveal>
        <span className="couple-2__ampersand" aria-hidden="true">
          &amp;
        </span>
        <ScrollReveal
          as="article"
          className="couple-2__person"
          animationClass="animate-soft-rise"
          delay="delay-200"
        >
          <PersonCard
            person={bride}
            role="Mempelai wanita"
            decorations={decorations?.bride}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
