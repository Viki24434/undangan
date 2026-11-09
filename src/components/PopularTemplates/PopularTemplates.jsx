import { Link } from 'react-router-dom';
import useTemplates from '../../hooks/useTemplates';
import './PopularTemplates.css';
import Button from '../Button/Button';

export default function PopularTemplates() {
  const { templates: collection, loading, error } = useTemplates();
  const templates = collection.slice(0, 2);

  return (
    <div className="popular-section" id="template">
      <h2>Template Terpopuler</h2>
      <p>Pilih desain favorit yang paling sesuai dengan tema acara Anda.</p>
      {(loading || error) && (
        <p role="status">
          {loading ? 'Memuat koleksi…' : 'Koleksi belum dapat dimuat.'}
        </p>
      )}

      <div className="template-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <img src={tpl.img} alt={tpl.name} className="template-img" />
            <div className="template-info">
              <span className="template-badge">{tpl.category}</span>
              <h3>{tpl.name}</h3>

              <Link to={`/t/${tpl.id}`}>
                <Button variant="outline" style={{ width: '100%' }}>
                  Lihat Detail
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <Link to="/katalog">
          <Button variant="primary">Lihat Semua Template ➔</Button>
        </Link>
      </div>
    </div>
  );
}
