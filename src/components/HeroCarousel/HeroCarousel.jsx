import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';
import Button from '../Button/Button';

export default function HeroCarousel() {
  const images = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=800&q=80',
    'https://images.unsplash.com/photo-1544425501-799b66236316?w=800&q=80',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-container" id="beranda">
      <div className="hero-text">
        <h1>
          Buat Undangan Digital <span>Lebih Berkesan</span>
        </h1>
        <p>
          Ribuan template premium untuk pernikahan, khitanan, ulang tahun, dan
          berbagai momen spesial Anda lainnya. Bagikan kebahagiaan dalam
          hitungan menit.
        </p>
        <Button variant="primary">Buat Undangan Sekarang</Button>
      </div>
      <div className="hero-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`carousel-img ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
