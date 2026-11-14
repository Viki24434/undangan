import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const { pathname } = useLocation();
  const homePath = pathname === '/' ? '' : '/';
  useEffect(() => {
    if (!open) return;
    function close(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      } else if (
        event.type === 'pointerdown' &&
        !root.current?.contains(event.target)
      )
        setOpen(false);
    }
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, [open]);
  return (
    <header className="invite-nav" ref={root}>
      <Link className="invite-brand" to="/">
        ciptain<span>✳</span>
      </Link>
      <button
        className="invite-menu"
        type="button"
        ref={toggle}
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
        <NavLink to="/katalog" onClick={() => setOpen(false)}>
          Koleksi template
        </NavLink>
        <a href={`${homePath}#fitur`} onClick={() => setOpen(false)}>
          Fitur
        </a>
        <a href={`${homePath}#cara-kerja`} onClick={() => setOpen(false)}>
          Cara kerja
        </a>
        <a href={`${homePath}#faq`} onClick={() => setOpen(false)}>
          FAQ
        </a>
        <NavLink to="/panduan" onClick={() => setOpen(false)}>
          Panduan
        </NavLink>
        <Link
          className="invite-button small"
          to="/katalog?favorites=1#koleksi"
          onClick={() => setOpen(false)}
        >
          Favoritku <span aria-hidden="true">♡</span>
        </Link>
      </nav>
    </header>
  );
}
