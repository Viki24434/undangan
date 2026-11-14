import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTemplateFavorites from '../../hooks/useTemplateFavorites';
import CollectionState from '../Catalog/CollectionState';
import Arrow from './Arrow';
import TemplateCard from '../TemplateCard/TemplateCard';

export default function TemplateCollection({ catalog, pricing }) {
  const {
    templates: availableTemplates,
    categories,
    loading,
    error,
    retry,
  } = catalog;
  const { favorites, error: favoriteError } = useTemplateFavorites();
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
      <div className="home-collection-tools">
        <p>
          Suka dengan desainnya? Simpan dengan ikon hati, lalu coba edit
          ceritamu.
        </p>
        <Link to="/katalog?favorites=1#koleksi">
          ♡ Favoritku (
          {
            availableTemplates.filter((item) => favorites.includes(item.id))
              .length
          }
          )
        </Link>
      </div>
      {favoriteError && (
        <p className="catalog-local-notice" role="status">
          {favoriteError}
        </p>
      )}
      {loading || error ? (
        <CollectionState loading={loading} error={error} retry={retry} />
      ) : templates.length ? (
        <div className="invite-collection-grid">
          {templates.slice(0, 6).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              pricing={pricing}
            />
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
      {!loading && !error && templates.length > 6 && (
        <div className="home-collection-more">
          <Link
            className="invite-text-link"
            to={`/katalog${category !== 'Semua' ? `?${new URLSearchParams({ category })}` : ''}#koleksi`}
          >
            Lihat semua {templates.length} desain <Arrow />
          </Link>
        </div>
      )}
    </section>
  );
}
