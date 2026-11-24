import { Link } from 'react-router-dom';
import './Closing4.css';

export default function Closing4({ title, image, date, monogram, children }) {
  return (
    <footer className="invitation-closing closing-4">
      {children}
      <div className="closing-4__card invitation-surface">
        {image && (
          <img
            src={image}
            alt={`Kenangan ${title}`}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="closing-4__message">
          <span className="invitation-kicker">A NOTE TO REMEMBER</span>
          <span className="closing-4__seal" aria-hidden="true">
            {monogram}
          </span>
          <h2>
            Sampai bertemu
            <br />
            <em>di hari bahagia.</em>
          </h2>
          <p>
            Terima kasih untuk setiap doa dan kehangatan yang kamu bawa dalam
            cerita kami.
          </p>
          <h3>{title}</h3>
          <small>{date}</small>
        </div>
      </div>
      <Link to="/katalog">Dibuat dengan Ciptala ↗</Link>
    </footer>
  );
}
