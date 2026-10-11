import './Hero2.css';

export default function Hero2({ image, subtitle, title, date, children }) {
  return (
    <section
      className="invitation-hero hero-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
      <div className="invitation-hero-copy hero-2__copy">
        <span className="invitation-kicker">{subtitle}</span>
        <h1>{title}</h1>
        <span className="invitation-divider" aria-hidden="true">
          ✧
        </span>
        <p>{date}</p>
        <a className="invitation-scroll" href="#invitation-intro">
          Jelajahi cerita kami <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
