import { Link } from 'react-router-dom';
import './Closing2.css';

export default function Closing2({ title, image, date, children }) {
  return (
    <footer className="invitation-closing closing-2">
      {children}
      {image && (
        <img
          className="closing-2__portrait"
          src={image}
          alt={title}
          width="120"
          height="145"
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="invitation-kicker">UNTIL WE CELEBRATE TOGETHER</span>
      <h2>Sampai berjumpa.</h2>
      <p>Terima kasih telah menjadi bagian dari cerita bahagia kami.</p>
      <h3>{title}</h3>
      <span className="closing-2__date">{date}</span>
      <Link to="/katalog">Dibuat dengan Ciptain ↗</Link>
    </footer>
  );
}
