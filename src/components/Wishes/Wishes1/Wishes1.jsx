import Button from '../../Button/Button';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Wishes1.css';

export default function Wishes1({ wishes = [], children }) {
  if (children) {
    return (
      <section
        className="wishes-1-container invitation-section invitation-guestbook"
        id="invitation-wishes"
      >
        <ScrollReveal animationClass="animate-soft-rise">
          <span className="invitation-kicker">SEND A LITTLE LOVE</span>
          <h2>Ucapan &amp; doa</h2>
          <p>Satu pesan kecil, begitu banyak arti.</p>
        </ScrollReveal>
        {children}
      </section>
    );
  }

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
