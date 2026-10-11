import { Link } from 'react-router-dom';
import './Cover2.css';

export default function Cover2({
  title,
  subtitle,
  date,
  monogram,
  image,
  onOpen,
  children,
}) {
  return (
    <section
      className="invitation-cover cover-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="invitation-cover-shade" />
      {children}
      <div className="invitation-cover-frame cover-2__frame animate-blur-reveal">
        <span className="invitation-monogram animate-breathe">{monogram}</span>
        <span className="invitation-kicker animate-fade-in-down delay-100">{subtitle}</span>
        <h1 className="animate-soft-rise delay-200">{title}</h1>
        <p className="invitation-date animate-fade-in delay-300">{date}</p>
        <span className="invitation-divider" aria-hidden="true">
          ✧
        </span>
        <p>Kepada orang-orang tersayang</p>
        <h2>Tamu Undangan</h2>
        <button className="invitation-button" onClick={onOpen}>
          Buka undangan <span aria-hidden="true">↗</span>
        </button>
        <Link className="invitation-back" to="/katalog">
          Kembali ke katalog
        </Link>
      </div>
    </section>
  );
}
