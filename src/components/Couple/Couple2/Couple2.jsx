import './Couple2.css';

function PersonCard({ person, role }) {
  return (
    <article className="couple-2__person">
      <div className="couple-2__portrait">
        <img src={person.photo} alt={person.name} loading="lazy" />
        <img
          className="couple-2__flowers"
          src="/assets/couple-floral-spray.svg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <span className="invitation-kicker">{role}</span>
      <h3>{person.name}</h3>
      <p>
        Putra dari Bapak {person.father} &amp; Ibu {person.mother}
      </p>
    </article>
  );
}

export default function Couple2({ groom, bride }) {
  return (
    <section className="couple-2 invitation-section">
      <span className="invitation-kicker">THE BRIDE &amp; THE GROOM</span>
      <h2>Pasangan berbahagia</h2>
      <p>Dengan penuh cinta, kami memulai perjalanan baru bersama.</p>
      <div className="couple-2__pair">
        <PersonCard person={groom} role="Mempelai pria" />
        <span className="couple-2__ampersand" aria-hidden="true">
          &amp;
        </span>
        <PersonCard person={bride} role="Mempelai wanita" />
      </div>
    </section>
  );
}
