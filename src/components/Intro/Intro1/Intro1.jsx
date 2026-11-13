import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import AnimatedText from '../../AnimatedText/AnimatedText';

export default function Intro1({ data, wedding }) {
  return (
    <ScrollReveal
      as="section"
      className="invitation-section invitation-intro"
      id="invitation-intro"
      animationClass="animate-blur-reveal"
    >
      {wedding ? (
        <>
          <span className="invitation-kicker">
            TWO HEARTS, ONE BEAUTIFUL JOURNEY
          </span>
          <h2>
            Berawal dari cinta,
            <br />
            <em>bertumbuh bersama.</em>
          </h2>
          <span className="invitation-divider" aria-hidden="true">
            ✧
          </span>
          <p>
            Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
            Bapak/Ibu/Saudara/i untuk menjadi bagian dari awal perjalanan kami.
          </p>
        </>
      ) : (
        <>
          <span className="celebration-symbol" aria-hidden="true">
            {data.symbol}
          </span>
          <span className="invitation-kicker">{data.eyebrow}</span>
          <h2>
            <AnimatedText text={data.heading} effect="type" />
          </h2>
          <p>{data.introduction}</p>
          <div className="celebration-honoree">
            <span>{data.honoreeLabel}</span>
            <h3>{data.honoree}</h3>
            <p>{data.family}</p>
          </div>
          <div className="celebration-notes">
            {(data.notes || []).map((note) => (
              <article key={note.title}>
                <span>{note.title}</span>
                <strong>{note.description}</strong>
              </article>
            ))}
          </div>
        </>
      )}
    </ScrollReveal>
  );
}
