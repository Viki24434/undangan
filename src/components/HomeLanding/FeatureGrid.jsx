const features = [
  [
    '01',
    'Cerita & galeri',
    'Rangkai perjalanan cinta dan foto-foto favorit dalam satu halaman yang berkesan.',
  ],
  [
    '02',
    'Hitung mundur acara',
    'Bangun antusiasme menuju hari istimewa dengan penghitung waktu acara.',
  ],
  [
    '03',
    'Ucapan & doa',
    'Sediakan ruang untuk pesan hangat dari keluarga dan sahabat.',
  ],
  [
    '04',
    'Hadiah digital',
    'Tampilkan informasi hadiah agar tamu bisa berbagi tanda kasih.',
  ],
];
export default function FeatureGrid() {
  return (
    <section className="invite-features" id="fitur">
      <div className="invite-section-heading">
        <div>
          <span className="invite-eyebrow">DETAIL KECIL, KESAN BESAR</span>
          <h2>
            Semua momen indah,
            <br />
            dalam <em>satu undangan.</em>
          </h2>
        </div>
        <p>
          Lebih dari tanggal dan tempat.
          <br />
          Berikan pengalaman yang terasa personal
          <br />
          sejak undangan pertama dibuka.
        </p>
      </div>
      <div className="invite-feature-grid">
        {features.map(([number, title, description]) => (
          <article key={number}>
            <span className="invite-feature-number">
              {number} <span>✧</span>
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="invite-feature-footnote">
        Ketersediaan fitur mengikuti template yang dipilih. Jelajahi demo untuk
        melihat detailnya.
      </p>
    </section>
  );
}
