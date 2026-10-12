import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invitationService } from '../../services/api';
import { adminService } from '../../services/adminService';
import '../../components/Admin/PackagePrices.css';

export default function AdminPackages() {
  const [packages, setPackages] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .packages(controller.signal)
      .then(({ data }) => setPackages(data))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, []);

  async function save(event, item) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('price').trim();
    const price = value === '' ? null : Number(value);
    if (
      price !== null &&
      (!Number.isSafeInteger(price) || price < 0 || price > 1000000000000)
    ) {
      setError('Masukkan harga rupiah bulat yang valid.');
      return;
    }
    setBusy(item.id);
    setError('');
    setMessage('');
    try {
      const { data } = await adminService.updatePackagePrice(item.id, price);
      setPackages((items) =>
        items.map((current) => (current.id === data.id ? data : current)),
      );
      setMessage(`Harga ${data.name} berhasil disimpan.`);
    } catch (error) {
      if (error.status === 401) navigate('/admin/login');
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  return (
    <>
      <header className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">PENGATURAN PAKET</span>
          <h1>Harga paket</h1>
          <p>Atur harga dalam rupiah. Harga yang disimpan tampil di katalog.</p>
        </div>
      </header>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="admin-success" role="status">
          {message}
        </p>
      )}
      {!packages ? (
        <p role="status">
          {error ? 'Harga belum dapat dimuat.' : 'Memuat harga paket…'}
        </p>
      ) : (
        <div className="admin-price-grid">
          {packages.map((item) => (
            <section className="admin-price-card" key={item.id}>
              <h2>{item.name}</h2>
              {item.priceMode === 'custom' ? (
                <>
                  <strong className="admin-price-custom">Harga custom</strong>
                  <p>
                    Disesuaikan dengan kebutuhan setiap undangan. Paket ini
                    tidak memakai harga tetap.
                  </p>
                </>
              ) : (
                <form onSubmit={(event) => save(event, item)}>
                  <label htmlFor={`price-${item.id}`}>Harga (Rp)</label>
                  <input
                    id={`price-${item.id}`}
                    name="price"
                    type="number"
                    min="0"
                    max="1000000000000"
                    step="1"
                    defaultValue={item.price ?? ''}
                    placeholder="Belum ditentukan"
                    disabled={!!busy}
                  />
                  <p>Kosongkan untuk tidak menampilkan nominal harga.</p>
                  <button
                    className="admin-button"
                    type="submit"
                    disabled={!!busy}
                  >
                    {busy === item.id ? 'Menyimpan…' : 'Simpan harga'}
                  </button>
                </form>
              )}
            </section>
          ))}
        </div>
      )}
    </>
  );
}
