export default function InvitationGallery({ photos }) {
  return (
    <section className="invitation-section" id="invitation-gallery">
      <span className="invitation-kicker">LITTLE MOMENTS, BIG MEMORIES</span>
      <h2>Dalam bingkai cerita</h2>
      <p>Potongan kebahagiaan yang ingin kami bagikan.</p>
      <div className="invitation-gallery">
        {photos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`Momen istimewa ${index + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
