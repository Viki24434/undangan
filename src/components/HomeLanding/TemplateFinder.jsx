import { useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { invitationPackages } from '../../config/invitationPackages';
import './TemplateFinder.css';

export default function TemplateFinder({ catalog }) {
  const [category, setCategory] = useState('Semua');
  const [packageId, setPackageId] = useState('all');
  const matches = catalog.templates.filter(
    (item) =>
      (category === 'Semua' || item.category === category) &&
      (packageId === 'all' || item.packageId === packageId),
  );
  const params = new URLSearchParams();
  if (category !== 'Semua') params.set('category', category);
  if (packageId !== 'all') params.set('package', packageId);
  return (
    <section
      className="template-finder"
      id="temukan-gaya"
      aria-labelledby="finder-title"
    >
      <div className="template-finder__intro">
        <span className="invite-eyebrow">SEDIKIT TENTANG MOMENMU</span>
        <h2 id="finder-title">
          Mulai dari <em>ceritamu.</em>
        </h2>
        <p>Dua pilihan kecil untuk menemukan undangan yang pas.</p>
      </div>
      <div className="template-finder__form">
        <label>
          <span>
            <i>01</i> Apa yang akan kamu rayakan?
          </span>
          <select
            aria-label="Momen yang dirayakan"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Semua">Semua momen</option>
            {catalog.categories
              .filter((item) => item !== 'Semua')
              .map((item) => (
                <option key={item}>{item}</option>
              ))}
          </select>
        </label>
        <label>
          <span>
            <i>02</i> Pilih pengalaman undangan
          </span>
          <select
            aria-label="Paket pilihanmu"
            value={packageId}
            onChange={(event) => setPackageId(event.target.value)}
          >
            <option value="all">Bebas, lihat semuanya</option>
            {invitationPackages
              .filter((item) =>
                catalog.templates.some(
                  (template) => template.packageId === item.id,
                ),
              )
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
        <Link
          className="invite-button"
          to={`/katalog${params.size ? `?${params}` : ''}#koleksi`}
        >
          Temukan pilihanmu <Arrow />
        </Link>
        <p role="status">
          {catalog.loading
            ? 'Menyiapkan koleksi…'
            : catalog.error
              ? 'Koleksi akan ditampilkan saat koneksi tersedia.'
              : matches.length
                ? `${matches.length} desain siap kamu jelajahi. Tidak perlu daftar untuk mencoba.`
                : 'Belum ada kombinasi ini. Coba paket atau momen lainnya.'}
        </p>
      </div>
    </section>
  );
}
