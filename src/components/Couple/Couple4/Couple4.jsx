import PortraitDecoration from '../PortraitDecoration';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Couple4.css';

export default function Couple4({ groom, bride, decorations }) {
  return (
    <section className="invitation-section couple-4" id="invitation-couple">
      <span className="invitation-kicker">TOGETHER, A NEW CHAPTER</span>
      <h2>Pasangan berbahagia</h2>
      <p>Dua hati, satu perjalanan yang indah.</p>
      <div className="couple-4__cards">
        {[
          [groom, 'Mempelai pria', 'Putra', decorations?.groom],
          [bride, 'Mempelai wanita', 'Putri', decorations?.bride],
        ].map(([person, role, relation, ornaments], index) => (
          <ScrollReveal
            as="article"
            className="couple-4__card"
            animationClass={
              index ? 'animate-slide-right' : 'animate-slide-left'
            }
            key={role}
          >
            <div className="couple-4__portrait">
              <img
                src={person.photo}
                alt={person.name}
                width="150"
                height="185"
                loading="lazy"
                decoding="async"
              />
              <PortraitDecoration items={ornaments} />
            </div>
            <div className="couple-4__identity">
              <span className="invitation-kicker">{role}</span>
              <h3>{person.name}</h3>
              <p>
                {relation} dari Bapak {person.father} &amp; Ibu {person.mother}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
