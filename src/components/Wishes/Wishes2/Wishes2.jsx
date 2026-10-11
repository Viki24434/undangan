import './Wishes2.css';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';

export default function Wishes2({ children }) {
  return (
    <section
      className="invitation-section invitation-guestbook wishes-2"
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
