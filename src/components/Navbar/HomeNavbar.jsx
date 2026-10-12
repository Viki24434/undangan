import './HomeNavbar.css';
import Button from '../Button/Button';

export default function HomeNavbar() {
  return (
    <nav className="home-navbar">
      <a href="/" className="nav-brand">
        Ciptain.
      </a>
      <div className="nav-links">
        <a href="#beranda">Beranda</a>
        <a href="#kategori">Kategori</a>
        <a href="#fitur">Fitur</a>
      </div>
      <div className="nav-actions">
        <Button variant="outline">Masuk</Button>
        <Button variant="primary">Daftar</Button>
      </div>
    </nav>
  );
}
