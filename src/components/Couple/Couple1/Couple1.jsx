import React from 'react';
import './Couple1.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Couple1({ groom, bride }) {
  return (
    <section className="couple-1-container" style={{ position: 'relative' }}>
      <div
        className="animate-float"
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '2rem',
        }}
      >
        ✨
      </div>
      <div
        className="animate-float has-delay delay-500"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          fontSize: '2rem',
        }}
      >
        🕊️
      </div>

      <ScrollReveal animationClass="animate-fade-in-down">
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent)',
            fontSize: '2.5rem',
          }}
        >
          Mempelai
        </h2>
      </ScrollReveal>

      <div className="couple-1-grid">
        <ScrollReveal animationClass="animate-fade-in-up">
          <div className="couple-1-card">
            <img src={groom.photo} alt={groom.name} className="couple-1-img" />
            <h3 className="couple-1-name">{groom.name}</h3>
            <p>
              Putra dari Bapak {groom.father} & Ibu {groom.mother}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animationClass="animate-zoom-in" delay="delay-200">
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-accent)',
              fontSize: '3rem',
            }}
          >
            &
          </h1>
        </ScrollReveal>

        <ScrollReveal animationClass="animate-fade-in-up" delay="delay-300">
          <div className="couple-1-card">
            <img src={bride.photo} alt={bride.name} className="couple-1-img" />
            <h3 className="couple-1-name">{bride.name}</h3>
            <p>
              Putri dari Bapak {bride.father} & Ibu {bride.mother}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
