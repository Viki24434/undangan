import { Link, useLocation } from 'react-router-dom';

export default function LandingFooter() {
  const { pathname } = useLocation();
  const homePath = pathname === '/' ? '' : '/';
  return (
    <footer className="invite-footer">
      <div>
        <Link className="invite-brand" to="/">
          ciptain<span>✳</span>
        </Link>
        <p>Merayakan cerita. Menghubungkan hati.</p>
      </div>
      <nav aria-label="Navigasi footer">
        <Link to="/katalog">Katalog</Link>
        <Link to="/panduan">Panduan & FAQ</Link>
        <a href={`${homePath}#cara-kerja`}>Cara kerja</a>
        <a href={`${homePath}#faq`}>FAQ</a>
        <a href="#beranda">Kembali ke atas ↑</a>
      </nav>
      <small>
        © {new Date().getFullYear()} Ciptain. Dibuat untuk momen berarti.
      </small>
    </footer>
  );
}
