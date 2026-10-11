import { useState } from 'react';
import useTemplates from '../../hooks/useTemplates';
import Arrow from '../HomeLanding/Arrow';
import TemplateCard from '../TemplateCard/TemplateCard';
import CatalogHeader from './CatalogHeader';
import CatalogFilters from './CatalogFilters';

export default function CatalogContent() {
  const {
    templates: availableTemplates,
    categories,
    loading,
    error,
  } = useTemplates();
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const search = query.trim().toLocaleLowerCase('id');
  const templates = availableTemplates.filter((template) => {
    const matchesCategory =
      category === 'Semua' || template.category === category;
    const matchesSearch = `${template.name} ${template.category}`
      .toLocaleLowerCase('id')
      .includes(search);
    return matchesCategory && matchesSearch;
  });

  if (sort !== 'default') {
    templates.sort((first, second) => {
      const order = first.name.localeCompare(second.name, 'id');
      return sort === 'asc' ? order : -order;
    });
  }

  function resetFilters() {
    setCategory('Semua');
    setQuery('');
    setSort('default');
  }

  return (
    <main id="konten" className="catalog-content">
      <CatalogHeader />
      <section
        className="catalog-collection"
        id="koleksi"
        aria-labelledby="catalog-title"
      >
        <div className="invite-section-heading">
          <div>
            <span className="invite-eyebrow">TEMUKAN FAVORITMU</span>
            <h2 id="catalog-title">
              Koleksi <em>undangan.</em>
            </h2>
          </div>
          <p>Buka demo untuk melihat setiap detail.</p>
        </div>
        <p role="status">
          {loading
            ? 'Memuat koleksi dari server…'
            : error
              ? `${error} Koleksi demo ditampilkan.`
              : ''}
        </p>
        <CatalogFilters
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
        />
        <div className="catalog-result-row">
          <p role="status">{templates.length} template ditemukan</p>
          {(query || category !== 'Semua' || sort !== 'default') && (
            <button type="button" onClick={resetFilters}>
              Reset filter
            </button>
          )}
        </div>
        {templates.length > 0 ? (
          <div className="catalog-grid">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="invite-empty">
            <span aria-hidden="true">✧</span>
            <h3>
              {search
                ? 'Belum menemukan yang sesuai?'
                : 'Koleksi ini sedang dipersiapkan'}
            </h3>
            <p>
              {search
                ? 'Coba kata kunci lain atau reset filter untuk melihat semua template.'
                : 'Jelajahi template yang tersedia sambil menunggu koleksi baru.'}
            </p>
            <button
              type="button"
              className="invite-button"
              onClick={resetFilters}
            >
              Lihat semua template <Arrow />
            </button>
          </div>
        )}
      </section>
      <aside className="catalog-help">
        <span className="catalog-help-icon" aria-hidden="true">
          ♡
        </span>
        <div>
          <h3>Mulai dari cerita, temukan gayamu.</h3>
          <p>Kenali fitur undangan dan siapkan detail momen spesialmu.</p>
        </div>
        <a className="invite-text-link" href="/#faq">
          Baca panduan & FAQ <Arrow />
        </a>
      </aside>
    </main>
  );
}
