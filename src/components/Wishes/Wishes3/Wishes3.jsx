import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Wishes3.css';

export default function Wishes3({ children }) {
  return (
    <section
      className="invitation-section invitation-guestbook wishes-3"
      id="invitation-wishes"
    >
      <ScrollReveal
        className="wishes-3__heading"
        animationClass="animate-soft-rise"
      >
        <span className="wishes-3__seal" aria-hidden="true">
          ♡
        </span>
        <span className="invitation-kicker">
          LETTERS FROM OUR FAVORITE PEOPLE
        </span>
        <h2>Sepucuk doa baik</h2>
        <p>Tinggalkan pesan yang bisa kami baca dan kenang kembali.</p>
      </ScrollReveal>
      <div className="wishes-3__letters">{children}</div>
    </section>
  );
}
