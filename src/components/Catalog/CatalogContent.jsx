import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useTemplates from '../../hooks/useTemplates';
import usePackages from '../../hooks/usePackages';
import Arrow from '../HomeLanding/Arrow';
import TemplateCard from '../TemplateCard/TemplateCard';
import CatalogHeader from './CatalogHeader';
import CatalogFilters from './CatalogFilters';
import PackageCollection from './PackageCollection';
import { invitationPackages } from '../../config/invitationPackages';
import useTemplateFavorites from '../../hooks/useTemplateFavorites';
import useCatalogFilters from './useCatalogFilters';
import ComparisonTray from './ComparisonTray';
import CollectionState from './CollectionState';

const TemplateComparison = lazy(() => import('./TemplateComparison'));

export default function CatalogContent() {
  const pricing = usePackages();
  const {
    templates: availableTemplates,
    categories,
    loading,
    error,
    retry,
  } = useTemplates();
  const { category, packageId, query, sort, favoritesOnly, change, reset } =
    useCatalogFilters();
  const { favorites, error: favoriteError } = useTemplateFavorites();
  const [comparedIds, setComparedIds] = useState([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== '#koleksi' || loading) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById('koleksi')?.scrollIntoView({ block: 'start' }),
    );
    return () => cancelAnimationFrame(frame);
  }, [hash, loading]);
  const search = query.trim().toLocaleLowerCase('id');
  const templates = availableTemplates.filter((template) => {
    const matchesCategory =
      category === 'Semua' || template.category === category;
    const matchesSearch = `${template.name} ${template.category}`
      .toLocaleLowerCase('id')
      .includes(search);
    const matchesPackage =
      packageId === 'all' || template.packageId === packageId;
    return (
      matchesCategory &&
      matchesSearch &&
      matchesPackage &&
      (!favoritesOnly || favorites.includes(template.id))
    );
  });

  if (sort !== 'default') {
    templates.sort((first, second) => {
      if (sort.startsWith('price-')) {
        const firstPrice = pricing.packages.find(
          (item) => item.id === first.packageId,
        )?.price;
        const secondPrice = pricing.packages.find(
          (item) => item.id === second.packageId,
        )?.price;
        if (firstPrice == null && secondPrice != null) return 1;
        if (secondPrice == null && firstPrice != null) return -1;
        if (
          firstPrice != null &&
          secondPrice != null &&
          firstPrice !== secondPrice
        )
          return sort === 'price-asc'
            ? firstPrice - secondPrice
            : secondPrice - firstPrice;
      }
      const order = first.name.localeCompare(second.name, 'id');
      return sort === 'desc' ? -order : order;
    });
  }

  function toggleCompare(id) {
    setComparedIds((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : items.length < 3
          ? [...items, id]
          : items,
    );
  }
  const compared = comparedIds.flatMap((id) =>
    availableTemplates.filter((item) => item.id === id),
  );
  const favoriteCount = availableTemplates.filter((item) =>
    favorites.includes(item.id),
  ).length;

  return (
    <main id="konten" className="catalog-content">
      <CatalogHeader />
      <PackageCollection
        pricing={pricing}
        selected={packageId}
        onSelect={(value) => change('package', value)}
        templates={availableTemplates}
      />
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
          <p>Simpan yang kamu suka. Bandingkan hingga tiga pilihan.</p>
        </div>
        <CatalogFilters
          categories={categories}
          category={category}
          onCategoryChange={(value) => change('category', value)}
          query={query}
          onQueryChange={(value) => change('q', value)}
          sort={sort}
          onSortChange={(value) => change('sort', value)}
        />
        <div className="catalog-refinements">
          <label className="package-filter">
            Paket undangan
            <select
              aria-label="Paket undangan"
              value={packageId}
              onChange={(event) => change('package', event.target.value)}
            >
              <option value="all">Semua paket</option>
              {invitationPackages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="catalog-favorite-filter"
            aria-pressed={favoritesOnly}
            onClick={() => change('favorites', favoritesOnly ? '' : '1')}
          >
            <span aria-hidden="true">♡</span> Favoritku <b>{favoriteCount}</b>
          </button>
        </div>
        {favoriteError && (
          <p className="catalog-local-notice" role="status">
            {favoriteError}
          </p>
        )}
        {favoritesOnly && (
          <p className="catalog-local-notice">
            Favorit tersimpan di browser perangkat ini.
          </p>
        )}
        <div className="catalog-active-filters" aria-label="Filter aktif">
          {category !== 'Semua' && (
            <button type="button" onClick={() => change('category', 'Semua')}>
              {category} <span aria-hidden="true">×</span>
              <span className="catalog-sr-only">Hapus filter kategori</span>
            </button>
          )}
          {packageId !== 'all' && (
            <button type="button" onClick={() => change('package', 'all')}>
              {invitationPackages.find((item) => item.id === packageId)?.name}{' '}
              <span aria-hidden="true">×</span>
              <span className="catalog-sr-only">Hapus filter paket</span>
            </button>
          )}
          {query && (
            <button type="button" onClick={() => change('q', '')}>
              “{query}” <span aria-hidden="true">×</span>
              <span className="catalog-sr-only">Hapus pencarian</span>
            </button>
          )}
        </div>
        <div className="catalog-result-row">
          <p role="status" aria-live="polite">
            {loading
              ? 'Memuat pilihan…'
              : `${templates.length} template ditemukan`}
          </p>
          {(query ||
            category !== 'Semua' ||
            sort !== 'default' ||
            packageId !== 'all' ||
            favoritesOnly) && (
            <button type="button" onClick={reset}>
              Reset filter
            </button>
          )}
        </div>
        {loading || error ? (
          <CollectionState loading={loading} error={error} retry={retry} />
        ) : templates.length > 0 ? (
          <div className="catalog-grid">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                pricing={pricing}
                onCompare={toggleCompare}
                compared={comparedIds.includes(template.id)}
                compareDisabled={
                  comparedIds.length >= 3 && !comparedIds.includes(template.id)
                }
              />
            ))}
          </div>
        ) : (
          <div className="invite-empty">
            <span aria-hidden="true">✧</span>
            <h3>
              {favoritesOnly
                ? 'Pilihan favoritmu menunggu di sini'
                : search
                  ? 'Belum menemukan yang sesuai?'
                  : 'Koleksi ini sedang dipersiapkan'}
            </h3>
            <p>
              {favoritesOnly
                ? 'Tekan ikon hati pada template yang kamu suka. Kamu bisa menemukannya lagi di perangkat ini.'
                : search
                  ? 'Coba kata kunci lain atau reset filter untuk melihat semua template.'
                  : 'Jelajahi template yang tersedia sambil menunggu koleksi baru.'}
            </p>
            <button type="button" className="invite-button" onClick={reset}>
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
      <ComparisonTray
        templates={compared}
        onRemove={toggleCompare}
        onClear={() => setComparedIds([])}
        onOpen={() => setComparisonOpen(true)}
      />
      {comparisonOpen && compared.length >= 2 && (
        <Suspense
          fallback={
            <p className="catalog-dialog-loading" role="status">
              Menyiapkan perbandingan…
            </p>
          }
        >
          <TemplateComparison
            templates={compared}
            pricing={pricing}
            onClose={() => setComparisonOpen(false)}
          />
        </Suspense>
      )}
    </main>
  );
}
