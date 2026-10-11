export default function FAQ() {
  return (
    <section className="invite-section invite-faq" id="faq">
      <div>
        <span className="invite-eyebrow">SEBELUM MEMULAI</span>
        <h2>
          Ada yang ingin
          <br />
          <em>kamu tahu?</em>
        </h2>
        <p>Kenali dulu undangan digitalmu.</p>
      </div>
      <div className="invite-faq-list">
        {[
          [
            'Bagaimana cara melihat contoh undangan?',
            'Pilih template pada bagian koleksi atau buka katalog, lalu klik Lihat Template. Demo undangan akan terbuka dan bisa kamu jelajahi.',
          ],
          [
            'Apakah undangan bisa dibuka melalui ponsel?',
            'Ya. Tampilan undangan dirancang untuk dibuka melalui ponsel. Kamu juga dapat melihatnya dari browser di laptop atau desktop.',
          ],
          [
            'Jenis acara apa yang tersedia saat ini?',
            'Tersedia koleksi pernikahan, ulang tahun, aqiqah, dan khitan dengan berbagai tema, mulai dari botanical, rose, dan ivory hingga celestial. Buka katalog untuk mencoba masing-masing demo.',
          ],
          [
            'Apa yang perlu disiapkan untuk membuat undangan?',
            'Siapkan nama, tanggal dan lokasi acara, foto pilihan, serta cerita atau informasi tambahan yang ingin kamu bagikan.',
          ],
          [
            'Apakah saya bisa langsung mengedit dari halaman ini?',
            'Halaman ini menyediakan katalog dan demo template. Editor dan pemesanan belum tersedia; kamu bisa mengeksplorasi desain terlebih dahulu.',
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
