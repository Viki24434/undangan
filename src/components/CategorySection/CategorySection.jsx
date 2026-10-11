import React from 'react';
import './CategorySection.css';

export default function CategorySection() {
  const categories = [
    { name: 'Pernikahan', icon: '💍' },
    { name: 'Khitanan', icon: '🕌' },
    { name: 'Ulang Tahun', icon: '🎂' },
    { name: 'Aqiqah', icon: '👶' },
    { name: 'Natal', icon: '🎄' },
    { name: 'Kelulusan', icon: '🎓' },
  ];

  return (
    <div className="category-section" id="kategori">
      <h2>Pilih Tema Acara Anda</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <span className="category-icon">{cat.icon}</span>
            <span style={{ fontWeight: '600' }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}