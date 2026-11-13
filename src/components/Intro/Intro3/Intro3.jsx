import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Intro3.css';

export default function Intro3({ data, wedding }) {
  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-intro intro-3"
      id="invitation-intro"
      animationClass="animate-soft-rise"
    >
      {data.image && (
        <img
          className="intro-3__photo"
          src={data.image}
          alt={wedding ? 'Momen bersama' : data.honoree}
          width="110"
          height="110"
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="invitation-kicker">
        {wedding ? 'YOU ARE PART OF OUR STORY' : data.eyebrow}
      </span>
      <h2>
        {wedding ? 'Kebahagiaan terasa lengkap bersamamu.' : data.heading}
      </h2>
      <p>
        {data.introduction ||
          'Ada banyak momen yang ingin kami simpan. Hari ini menjadi lebih istimewa saat kami bisa merayakannya bersamamu.'}
      </p>
      <div className="intro-3__occasion invitation-surface">
        <span>{wedding ? 'Dengan penuh kasih' : data.honoreeLabel}</span>
        <strong>
          {wedding ? `${data.groom.name} & ${data.bride.name}` : data.honoree}
        </strong>
        <p>{wedding ? data.date : data.family}</p>
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
