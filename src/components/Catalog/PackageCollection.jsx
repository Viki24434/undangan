import usePackages from '../../hooks/usePackages';
import './PackageCollection.css';

export default function PackageCollection({ selected, onSelect, templates }) {
  const { packages, loading, error } = usePackages();
  return (
    <section className="package-collection" aria-labelledby="package-title">
      <div className="invite-section-heading">
        <div>
          <span className="invite-eyebrow">PILIH PAKET MOMENMU</span>
          <h2 id="package-title">
            Setiap cerita, <em>punya pilihan.</em>
          </h2>
        </div>
        <p>
          Mulai dari Silver dan Gold. Koleksi Platinum dan Exclusive menyusul.
        </p>
      </div>
      <div className="package-grid">
        {packages.map((item) => {
          const count = templates.filter(
            (template) => template.packageId === item.id,
          ).length;
          const available = item.available || count > 0;
          return (
            <article
              className={`package-card package-card--${item.id}`}
              key={item.id}
            >
              <div className="package-card-top">
                <span className="package-symbol" aria-hidden="true">
                  {item.symbol}
                </span>
                <span className="package-status">
                  {available ? 'Tersedia' : 'Segera hadir'}
                </span>
              </div>
              <h3>{item.name}</h3>
              <strong className="package-price">
                {item.priceMode === 'custom'
                  ? 'Harga custom'
                  : loading
                    ? 'Memuat harga…'
                    : error
                      ? 'Harga belum tersedia'
                      : item.price === null
                        ? 'Harga belum ditentukan'
                        : new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                          }).format(item.price)}
              </strong>
              <p>{item.description}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {available ? (
                <button
                  type="button"
                  className="package-select"
                  aria-pressed={selected === item.id}
                  onClick={() => {
                    onSelect(selected === item.id ? 'all' : item.id);
                    document.getElementById('koleksi')?.scrollIntoView({
                      behavior: window.matchMedia(
                        '(prefers-reduced-motion: reduce)',
                      ).matches
                        ? 'auto'
                        : 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {selected === item.id
                    ? 'Tampilkan semua paket'
                    : `Lihat ${count} template ${item.name}`}{' '}
                  <span aria-hidden="true">↗</span>
                </button>
              ) : (
                <span className="package-coming">
                  Koleksi sedang dipersiapkan
                </span>
              )}
            </article>
          );
        })}
      </div>
      {error && (
        <p className="package-price-notice" role="status">
          Harga paket belum dapat dimuat. Coba kembali sebentar lagi.
        </p>
      )}
    </section>
  );
}
