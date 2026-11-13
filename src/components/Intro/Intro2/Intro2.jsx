import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Intro2.css';

export default function Intro2({ data, wedding }) {
  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-intro intro-2"
      id="invitation-intro"
      animationClass="animate-soft-rise"
    >
      <div className="intro-2__letter">
        <span className="invitation-kicker">
          {wedding ? 'A LETTER FROM OUR HEARTS' : data.eyebrow}
        </span>
        <span className="intro-2__symbol" aria-hidden="true">
          {wedding ? '❦' : data.symbol || '♡'}
        </span>
        <h2>{wedding ? 'Untuk orang-orang tersayang' : data.heading}</h2>
        <p>
          {data.introduction ||
            'Dengan penuh rasa syukur, kami ingin berbagi hari istimewa ini bersama orang-orang yang berarti dalam hidup kami. Kehadiran dan doa baikmu akan melengkapi kebahagiaan kami.'}
        </p>
        <span className="intro-2__signature">
          {wedding ? `${data.groom.name} & ${data.bride.name}` : data.honoree}
        </span>
        {!wedding && <p className="intro-2__family">{data.family}</p>}
      </div>
      {!wedding && (
        <div className="celebration-notes">
          {(data.notes || []).map((note) => (
            <article key={note.title}>
              <span>{note.title}</span>
              <strong>{note.description}</strong>
            </article>
          ))}
        </div>
      )}
    </ScrollReveal>
  );
}
