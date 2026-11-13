import { Link } from 'react-router-dom';

export default function Closing1({ title, monogram, children }) {
  return (
    <footer className="invitation-closing">
      {children}
      <span className="invitation-monogram">{monogram}</span>
      <span className="invitation-kicker">WITH LOVE &amp; GRATITUDE</span>
      <h2>Terima kasih</h2>
      <p>
        Kehadiran dan doa baikmu menjadi bagian terindah dari hari istimewa ini.
      </p>
      <h3>{title}</h3>
      <Link to="/katalog">Temukan undanganmu di Ciptain ↗</Link>
    </footer>
  );
}
