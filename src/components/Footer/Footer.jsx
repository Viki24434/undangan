import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Ciptain.</h2>
          <p>Platform pembuatan undangan digital premium terlengkap, termudah, dan paling elegan di Indonesia.</p>
        </div>
        <div className="footer-links">
          <h4>Layanan</h4>
          <ul>
            <li><Link to="/katalog">Katalog Template</Link></li>
            <li><a href="#fitur">Fitur Kami</a></li>
            <li><a href="#">Harga & Paket</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Bantuan</h4>
          <ul>
            <li><a href="#">Cara Pemesanan</a></li>
            <li><a href="#">FAQ (Tanya Jawab)</a></li>
            <li><a href="#">Hubungi Admin</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Ciptain. All rights reserved.</p>
      </div>
    </footer>
  );
}