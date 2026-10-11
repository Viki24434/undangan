import { useState } from 'react';

const guideItems = [
  {
    title: 'Kapan sebaiknya saya tiba?',
    description:
      'Usahakan hadir 15 menit sebelum jadwal dimulai agar kamu punya waktu untuk bersiap dan menikmati suasana acara.',
  },
  {
    title: 'Bagaimana menemukan lokasi acara?',
    description:
      'Gunakan tombol Lihat lokasi pada kartu acara untuk membuka pencarian lokasi di Google Maps. Periksa kembali alamat dan rute sebelum berangkat.',
  },
  {
    title: 'Apakah ada ketentuan pakaian?',
    description:
      'Ikuti dress code jika tercantum dalam undangan. Jika tidak ada ketentuan khusus, pilih pakaian yang rapi dan nyaman sesuai suasana acara.',
  },
];

export default function GuestGuide() {
  const [status, setStatus] = useState('');

  async function copyInvitation() {
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      await navigator.clipboard.writeText(url.href);
      setStatus('Tautan undangan berhasil disalin.');
    } catch {
      setStatus(
        'Salin tautan dari bilah alamat browser untuk membagikan undangan.',
      );
    }
  }

  return (
    <section className="invitation-section invitation-guide">
      <span className="invitation-kicker">A FEW THINGS BEFORE YOU COME</span>
      <h2>Untuk tamu tersayang</h2>
      <p>Detail kecil agar harimu terasa lebih nyaman.</p>
      <div className="invitation-guide-list">
        {guideItems.map((item) => (
          <details key={item.title}>
            <summary>
              {item.title}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.description}</p>
          </details>
        ))}
      </div>
      <button
        type="button"
        className="invitation-button invitation-button-outline"
        onClick={copyInvitation}
      >
        Salin tautan undangan ↗
      </button>
      <p role="status" className="invitation-share-status">
        {status}
      </p>
    </section>
  );
}
