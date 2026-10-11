export default function CatalogFilters({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="catalog-filters">
      <div className="catalog-search-row">
        <label className="catalog-search">
          <span>Cari template</span>
          <input
            type="search"
            placeholder="Cari nama atau kategori…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>
        <label className="catalog-sort">
          <span>Urutkan berdasarkan</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="default">Pilihan koleksi</option>
            <option value="asc">Nama A–Z</option>
            <option value="desc">Nama Z–A</option>
          </select>
        </label>
      </div>
      <div
        className="invite-filters"
        role="group"
        aria-label="Kategori template"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? 'selected' : ''}
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
