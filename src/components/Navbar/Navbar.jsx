import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Arrow from '../HomeLanding/Arrow';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const homePath = pathname === '/' ? '' : '/';
  return (
    <header className="invite-nav">
      <Link className="invite-brand" to="/">
        ciptain<span>✳</span>
      </Link>
      <button
        className="invite-menu"
        type="button"
        aria-expanded={open}
        aria-controls="landing-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Tutup ×' : 'Menu ☰'}
      </button>
      <nav
        id="landing-navigation"
        className={open ? 'is-open' : ''}
        aria-label="Navigasi utama"
      >
        <a href={`${homePath}#koleksi`} onClick={() => setOpen(false)}>
          Koleksi template
        </a>
        <a href={`${homePath}#fitur`} onClick={() => setOpen(false)}>
          Fitur
        </a>
        <a href={`${homePath}#cara-kerja`} onClick={() => setOpen(false)}>
          Cara kerja
        </a>
        <a href={`${homePath}#faq`} onClick={() => setOpen(false)}>
          FAQ
        </a>
        <Link to="/admin">Admin center</Link>
        <Link to="/panduan" onClick={() => setOpen(false)}>
          Panduan
        </Link>
        <Link className="invite-button small" to="/katalog">
          Jelajahi template <Arrow />
        </Link>
      </nav>
    </header>
  );
}
