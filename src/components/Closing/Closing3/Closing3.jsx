import { Link } from 'react-router-dom';
import './Closing3.css';

export default function Closing3({ title, monogram, date, children }) {
  return (
    <footer className="invitation-closing closing-3">
      {children}
      <div className="closing-3__note invitation-surface">
        <span className="invitation-kicker">A BEAUTIFUL DAY TO REMEMBER</span>
        <span className="closing-3__monogram" aria-hidden="true">
          {monogram}
        </span>
        <h2>
          Dengan sepenuh hati,
          <br />
          <em>terima kasih.</em>
        </h2>
        <p>
          Untuk setiap senyum, doa, dan waktu yang kamu luangkan bersama kami.
        </p>
        <h3>{title}</h3>
        <span className="closing-3__date">{date}</span>
      </div>
      <Link to="/katalog">Temukan undanganmu di Ciptain ↗</Link>
    </footer>
  );
}
