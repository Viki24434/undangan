import { Link } from 'react-router-dom';
import './Cover4.css';

export default function Cover4({
  title,
  subtitle,
  date,
  guestName,
  monogram,
  image,
  onOpen,
  children,
}) {
  return (
    <section
      className="invitation-cover cover-4"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="invitation-cover-shade" />
      {children}
      <div className="invitation-cover-frame cover-4__card animate-soft-rise">
        <div className="cover-4__postmark" aria-hidden="true">
          <span>{monogram}</span>
          <i>♡</i>
        </div>
        {image && (
          <img
            className="cover-4__stamp"
            src={image}
            alt=""
            width="72"
            height="88"
            decoding="async"
          />
        )}
        <span className="invitation-kicker">{subtitle}</span>
        <h1>{title}</h1>
        <p className="invitation-date">{date}</p>
        <div className="cover-4__recipient">
          {guestName && (
            <>
              <small>Kepada Yth. Bapak/Ibu/Saudara/i</small>
              <strong>{guestName}</strong>
            </>
          )}
          <button className="invitation-button" type="button" onClick={onOpen}>
            Buka undangan <span aria-hidden="true">↗</span>
          </button>
        </div>
        <Link className="invitation-back" to="/katalog">
          Kembali ke katalog
        </Link>
      </div>
    </section>
  );
}
