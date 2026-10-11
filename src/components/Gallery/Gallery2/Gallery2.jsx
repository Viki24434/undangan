import './Gallery2.css';

export default function Gallery2({ photos }) {
  return (
    <section className="invitation-section gallery-2" id="invitation-gallery">
      <span className="invitation-kicker">LITTLE MOMENTS, BIG MEMORIES</span>
      <h2>Dalam bingkai cerita</h2>
      <p>Potongan kebahagiaan yang ingin kami bagikan.</p>
      <div className="gallery-2__grid">
        {photos.map((photo, index) => (
          <figure className="gallery-2__item" key={`${photo}-${index}`}>
            <img
              src={photo}
              alt={`Momen istimewa ${index + 1}`}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
