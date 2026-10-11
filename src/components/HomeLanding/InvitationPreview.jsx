import { Link } from 'react-router-dom';

export default function InvitationPreview() {
  return (
    <div className="invite-preview-scene">
      <div className="invite-orbit" />
      <span className="invite-scene-note">
        a little love, beautifully shared
      </span>
      <div className="invite-floating invite-floating-top">
        <span>✦</span>
        <div>
          Detail yang personal<small>Untuk cerita yang hanya milikmu</small>
        </div>
      </div>
      <Link
        to="/t/elegant-gold-01"
        className="invite-phone"
        aria-label="Buka demo undangan Elegant Gold"
      >
        <div className="invite-phone-bar" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85"
          alt="Suasana pernikahan dengan dekorasi bunga dan cahaya hangat"
          fetchPriority="high"
        />
        <div className="invite-phone-content">
          <span>THE WEDDING OF</span>
          <h2>
            Alya <em>&</em> Raka
          </h2>
          <p>MINGGU, 24 JANUARI 2027</p>
          <div className="invite-phone-rule">✧</div>
          <small>Kepada Bapak/Ibu/Saudara/i</small>
          <strong>Tamu Undangan</strong>
          <span className="invite-preview-button">Buka undangan ↗</span>
        </div>
      </Link>
      <div className="invite-floating invite-floating-bottom">
        <span>♡</span>
        <div>
          Satu tautan, banyak kebahagiaan
          <small>Mudah dibagikan ke orang tersayang</small>
        </div>
      </div>
      <span className="invite-preview-label">CONTOH TAMPILAN UNDANGAN</span>
    </div>
  );
}
