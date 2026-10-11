import React from 'react';
import Button from '../../Button/Button';
import './Wishes1.css';

export default function Wishes1({ wishes }) {
  return (
    <section className="wishes-1-container">
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-accent)',
          fontSize: '2.5rem',
        }}
      >
        Ucapan & Doa
      </h2>

      <div className="wishes-1-form">
        <input type="text" placeholder="Nama Anda" />
        <textarea
          rows="4"
          placeholder="Berikan ucapan atau doa restu..."
        ></textarea>
        <Button
          variant="primary"
          style={{
            width: '100%',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
          }}
        >
          Kirim Ucapan
        </Button>
      </div>

      <div className="wishes-list">
        {wishes.map((w, index) => (
          <div key={index} className="wish-item">
            <strong>{w.name}</strong>{' '}
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>• {w.time}</span>
            <p style={{ marginTop: '5px' }}>{w.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
