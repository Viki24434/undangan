import './Couple1.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import DecorationLayer from '../../Ornament/DecorationLayer';

function PersonCard({ person, decorations, name }) {
  return (
    <div className="couple-1-card">
      <div className="couple-1-portrait">
        <img src={person.photo} alt={person.name} className="couple-1-img" />
        <DecorationLayer items={decorations} />
      </div>
      <h3 className="couple-1-name">{person.name}</h3>
      <p>
        {name} dari Bapak {person.father} &amp; Ibu {person.mother}
      </p>
    </div>
  );
}

export default function Couple1({ groom, bride, decorations }) {
  const [groomDecorations = [], brideDecorations = []] = [
    decorations?.groom,
    decorations?.bride,
  ];

  return (
    <section className="couple-1-container" style={{ position: 'relative' }}>
      <div
        className="animate-float"
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '2rem',
        }}
      >
        ✨
      </div>
      <div
        className="animate-float delay-500"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          fontSize: '2rem',
        }}
      >
        🕊️
      </div>

      <ScrollReveal animationClass="animate-fade-in-down">
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent)',
            fontSize: '2.5rem',
          }}
        >
          Mempelai
        </h2>
      </ScrollReveal>

      <div className="couple-1-grid">
        <ScrollReveal animationClass="animate-fade-in-up">
          <PersonCard
            person={groom}
            decorations={groomDecorations}
            name="Putra"
          />
        </ScrollReveal>

        <ScrollReveal animationClass="animate-zoom-in" delay="delay-200">
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-accent)',
              fontSize: '3rem',
            }}
          >
            &
          </h1>
        </ScrollReveal>

        <ScrollReveal animationClass="animate-fade-in-up" delay="delay-300">
          <PersonCard
            person={bride}
            decorations={brideDecorations}
            name="Putri"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
