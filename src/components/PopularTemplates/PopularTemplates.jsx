import React from 'react';
import { Link } from 'react-router-dom';
import './PopularTemplates.css';
import Button from '../Button/Button';

export default function PopularTemplates() {
  const templates = [
    {
      id: 'elegant-gold-01',
      title: 'Elegant Gold',
      category: 'Pernikahan',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
    },
    {
      id: 'aqiqah-khitan-01',
      title: 'Modern Aqiqah',
      category: 'Aqiqah',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80',
    },
  ];

  return (
    <div className="popular-section" id="template">
      <h2>Template Terpopuler</h2>
      <p>Pilih desain favorit yang paling sesuai dengan tema acara Anda.</p>

      <div className="template-grid">
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <img src={tpl.img} alt={tpl.title} className="template-img" />
            <div className="template-info">
              <span className="template-badge">{tpl.category}</span>
              <h3>{tpl.title}</h3>

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
