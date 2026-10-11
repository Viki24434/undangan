import { Link } from 'react-router-dom';

export default function CatalogHeader() {
  return (
    <section className="catalog-header">
      <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Katalog</span>
      </nav>
      <span className="invite-eyebrow">KOLEKSI UNTUK CERITA ISTIMEWA</span>
      <h1>
        Temukan desain yang
        <br />
        terasa <em>seperti kamu.</em>
      </h1>
      <p>
        Dari detail yang elegan hingga nuansa yang hangat. Jelajahi koleksi
        undangan dan pilih awal yang indah untuk hari bahagiamu.
      </p>
      <span className="catalog-header-flower" aria-hidden="true">
        ✳
      </span>
    </section>
  );
}
