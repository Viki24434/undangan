import React from 'react';
import './Gallery1.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Gallery1({ photos }) {
  return (
    <section className="gallery-1-container">
      <ScrollReveal animationClass="animate-fade-in-down">
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent)',
            fontSize: '2.5rem',
          }}
        >
          Our Moments
        </h2>
        <p>Momen bahagia yang kami abadikan bersama.</p>
      </ScrollReveal>

      <div className="gallery-1-grid">
        {photos.map((photo, index) => (
          <ScrollReveal
            key={index}
            animationClass="animate-zoom-in"
            delay={index % 2 === 0 ? 'delay-100' : 'delay-300'}
          >
            <img
              src={photo}
              alt={`Galeri ${index + 1}`}
              className="gallery-1-img"
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
