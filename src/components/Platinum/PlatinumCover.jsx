import { Link } from 'react-router-dom';
import PlatinumAtmosphere from './PlatinumAtmosphere';
import OrnamentArtwork from '../Ornament/OrnamentArtwork';
import './PlatinumCover.css';

export default function PlatinumCover({
  title,
  subtitle,
  date,
  guestName,
  monogram,
  image,
  onOpen,
  isOpening = false,
  children,
  envelopeArt,
  flapArt,
}) {
  return (
    <section
      className={`invitation-cover platinum-cover${isOpening ? ' is-unsealing' : ''}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="invitation-cover-shade" />
      <PlatinumAtmosphere />
      {children}
      <div className="platinum-cover__composition">
        <header className="platinum-cover__heading">
          <span className="platinum-edition">A LETTER TO REMEMBER</span>
          <span className="invitation-kicker">{subtitle}</span>
          <h1>{title}</h1>
          <p className="invitation-date">{date}</p>
        </header>
        <div className="platinum-envelope">
          <div className="platinum-envelope__back" aria-hidden="true" />
          <div className="platinum-envelope__letter" aria-hidden="true">
            <span className="platinum-envelope__letter-monogram">
              {monogram}
            </span>
            <span>Sepucuk cerita bahagia</span>
            <strong>{title}</strong>
            <span>Untuk dikenang bersama.</span>
          </div>
          <div className="platinum-envelope__flap" aria-hidden="true">
            {flapArt && <OrnamentArtwork asset={flapArt} fill />}
          </div>
          <div
            className="platinum-envelope__fold platinum-envelope__fold--left"
            aria-hidden="true"
          />
          <div
            className="platinum-envelope__fold platinum-envelope__fold--right"
            aria-hidden="true"
          />
          <div className="platinum-envelope__front" aria-hidden="true">
            {envelopeArt && <OrnamentArtwork asset={envelopeArt} fill />}
          </div>
          <span className="platinum-cover__seal" aria-hidden="true">
            {monogram}
          </span>
          {guestName && (
            <div className="platinum-cover__recipient">
              <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <h2>{guestName}</h2>
            </div>
          )}
        </div>
        <button
          className="invitation-button platinum-cover__open"
          onClick={onOpen}
          disabled={isOpening}
        >
          {isOpening ? 'Membuka surat…' : 'Buka undangan'}{' '}
          <span aria-hidden="true">↗</span>
        </button>
        <Link className="invitation-back" to="/katalog">
          Kembali ke katalog
        </Link>
      </div>
    </section>
  );
}
