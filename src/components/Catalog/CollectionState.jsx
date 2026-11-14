import './CollectionState.css';

export default function CollectionState({ loading, error, retry }) {
  if (loading) {
    return (
      <div
        className="collection-loading"
        role="status"
        aria-label="Memuat koleksi template"
      >
        <p>Menyiapkan pilihan untuk momenmu…</p>
        <div className="collection-skeletons" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div className="collection-skeleton" key={item}>
              <span />
              <i />
              <i />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!error) return null;
  return (
    <div className="collection-error">
      <span aria-hidden="true">↻</span>
      <h3>Koleksi belum dapat dimuat</h3>
      <p role="alert">Periksa koneksimu lalu coba lagi.</p>
      <button className="invite-button small" type="button" onClick={retry}>
        Muat ulang koleksi
      </button>
    </div>
  );
}
