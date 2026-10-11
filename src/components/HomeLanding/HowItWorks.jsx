import { Link } from 'react-router-dom';
import Arrow from './Arrow';

export default function HowItWorks() {
  return (
    <section className="invite-section invite-how" id="cara-kerja">
      <div>
        <span className="invite-eyebrow">MULAI DARI SINI</span>
        <h2>
          Dari inspirasi
          <br />
          ke <em>hari bahagia.</em>
        </h2>
        <p>
          Tiga langkah untuk menemukan
          <br />
          undangan yang sesuai dengan ceritamu.
        </p>
        <Link className="invite-button" to="/katalog">
          Pilih template <Arrow />
        </Link>
      </div>
      <ol>
        {[
          [
            'Temukan gayamu',
            'Jelajahi katalog dan pilih desain yang sesuai dengan suasana acara.',
          ],
          [
            'Lihat setiap detail',
            'Buka demo untuk mencoba tampilan, galeri, dan fitur undangan.',
          ],
          [
            'Siapkan cerita spesialmu',
            'Siapkan nama, tanggal acara, foto, dan cerita sebagai bahan undanganmu.',
          ],
        ].map(([title, desc], i) => (
          <li key={title}>
            <span>0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
