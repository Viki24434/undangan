import PortraitDecoration from '../PortraitDecoration';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Couple3.css';

function Person({ person, role, decorations, delay }) {
  return (
    <ScrollReveal
      as="article"
      className="couple-3__person"
      animationClass="animate-soft-rise"
      delay={delay}
    >
      <div className="couple-3__portrait">
        <img src={person.photo} alt={person.name} loading="lazy" />
        <PortraitDecoration items={decorations} />
      </div>
      <span className="invitation-kicker">{role}</span>
      <h3>{person.name}</h3>
      <p>
        {role === 'Mempelai pria' ? 'Putra' : 'Putri'} dari Bapak{' '}
        {person.father} &amp; Ibu {person.mother}
      </p>
    </ScrollReveal>
  );
}

export default function Couple3({ groom, bride, decorations }) {
  return (
    <section className="couple-3 invitation-section">
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">THE BRIDE &amp; THE GROOM</span>
        <h2>Pasangan berbahagia</h2>
        <p>Dengan penuh cinta, kami memulai perjalanan baru bersama.</p>
      </ScrollReveal>
      <div className="couple-3__stack">
        <Person
          person={groom}
          role="Mempelai pria"
          decorations={decorations?.groom}
          delay="delay-100"
        />
        <span className="couple-3__ampersand" aria-hidden="true">
          &amp;
        </span>
        <Person
          person={bride}
          role="Mempelai wanita"
          decorations={decorations?.bride}
          delay="delay-200"
        />
      </div>
    </section>
  );
}
