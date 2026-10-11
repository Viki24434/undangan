import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTemplates from '../../hooks/useTemplates';
import Arrow from './Arrow';
import TemplateCard from '../TemplateCard/TemplateCard';

export default function TemplateCollection() {
  const { templates: availableTemplates, categories, error } = useTemplates();
  const [category, setCategory] = useState('Semua');
  const templates = availableTemplates.filter(
    (t) => category === 'Semua' || t.category === category,
  );
  return (
    <section className="invite-section" id="koleksi">
      <div className="invite-section-heading">
        <div>
          <span className="invite-eyebrow">PILIH YANG PALING KAMU</span>
          <h2>
            Setiap cerita punya <em>gayanya.</em>
          </h2>
        </div>
        <Link className="invite-text-link" to="/katalog">
          Lihat katalog <Arrow />
        </Link>
      </div>
      <div
        className="invite-filters"
        role="group"
        aria-label="Filter kategori template"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={category === item ? 'selected' : ''}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p role="status">
        {error
          ? 'Koneksi backend belum tersedia. Koleksi demo ditampilkan.'
          : ''}
      </p>
      {templates.length ? (
        <div className="invite-collection-grid">
          {templates.slice(0, 6).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
          <aside className="invite-collection-note">
            <span className="invite-flower">✳</span>
            <span className="invite-eyebrow">BUKAN SEKADAR UNDANGAN</span>
            <h3>Awal yang indah untuk hari istimewa.</h3>
            <p>
              Lihat demo, jelajahi setiap detail, dan temukan inspirasi untuk
              merayakan ceritamu.
            </p>
            <Link className="invite-text-link" to="/katalog">
              Temukan desainmu <Arrow />
            </Link>
          </aside>
        </div>
      ) : (
        <div className="invite-empty">
          <span>✧</span>
          <h3>Koleksi ini sedang dipersiapkan</h3>
          <p>
            Sambil menunggu, temukan inspirasi dari koleksi pernikahan kami.
          </p>
          <button
            className="invite-button"
            onClick={() => setCategory('Pernikahan')}
          >
            Lihat koleksi pernikahan <Arrow />
          </button>
        </div>
      )}
    </section>
  );
}
